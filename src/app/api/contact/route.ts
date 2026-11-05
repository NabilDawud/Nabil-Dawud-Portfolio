import { NextResponse } from "next/server";
import { Resend } from "resend";
import { extractClientIp, type ProxyTrustStrategy } from "@/lib/client-ip";
import { validateContactPayload } from "@/lib/contact-validator";
import { checkRateLimit, type IRateLimiter } from "@/lib/rate-limiter";

export interface ResendSendPayload {
  from: string;
  to: string | string[];
  replyTo: string;
  subject: string;
  text: string;
  html?: string;
}

export interface ResendClientLike {
  emails: {
    send(payload: ResendSendPayload): Promise<{
      data?: { id: string } | null;
      error?: { message: string } | null;
    }>;
  };
}

export interface ContactRouteOptions {
  resendClient?: ResendClientLike;
  rateLimiter?: IRateLimiter;
  env?: Record<string, string | undefined>;
  strategy?: ProxyTrustStrategy;
  isProduction?: boolean;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function handleContactPost(
  req: Request,
  options?: ContactRouteOptions
): Promise<Response> {
  const isProd =
    options?.isProduction ?? process.env.NODE_ENV === "production";
  const env = options?.env ?? process.env;
  const strategy =
    options?.strategy ||
    (env.TRUSTED_PROXY_STRATEGY as ProxyTrustStrategy | undefined);

  // 1. Resolve and verify Client IP
  const ipResult = extractClientIp(req.headers, {
    strategy,
    isProduction: isProd,
  });

  if (isProd && (!ipResult.isValid || !ipResult.ip)) {
    return NextResponse.json(
      {
        error:
          "Service temporarily unavailable. Please try again shortly.",
      },
      {
        status: 503,
        headers: {
          "Retry-After": "60",
        },
      }
    );
  }

  const clientIp = ipResult.ip || "127.0.0.1";

  // 2. Multi-instance / persistent Rate Limiting
  const rateLimitRes = options?.rateLimiter
    ? await options.rateLimiter.check(clientIp)
    : await checkRateLimit(clientIp, { isProduction: isProd });

  if (!rateLimitRes.allowed) {
    if (rateLimitRes.reason === "service_unavailable") {
      return NextResponse.json(
        {
          error:
            "Service temporarily unavailable. Please try again shortly.",
        },
        {
          status: 503,
          headers: {
            "Retry-After": String(rateLimitRes.resetSeconds || 60),
          },
        }
      );
    }

    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitRes.resetSeconds || 60),
        },
      }
    );
  }

  // 3. Pre-flight Content-Length Check & Parse JSON Body
  const contentLength = parseInt(
    req.headers.get("content-length") || "0",
    10
  );
  if (contentLength > 100 * 1024) {
    return NextResponse.json(
      { error: "Payload too large. Maximum size is 100KB." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload" },
      { status: 400 }
    );
  }

  const rawBody =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {};

  // 4. Honeypot check (Silent drop: return 200 without sending email)
  if (
    typeof rawBody._hp_website === "string" &&
    rawBody._hp_website.trim().length > 0
  ) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // 5. Input Validation
  const url = new URL(req.url);
  const locale =
    (url.searchParams.get("locale") ||
      (typeof rawBody.locale === "string" ? rawBody.locale : null) ||
      "en") === "ar"
      ? "ar"
      : "en";

  const validation = validateContactPayload(body, locale);
  if (!validation.isValid || !validation.sanitized) {
    return NextResponse.json(
      {
        error: "Validation failed",
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  // 6. Resend Dispatch
  const apiKey = env.RESEND_API_KEY;
  const fromEmail = env.RESEND_FROM_EMAIL;
  const toEmail = env.CONTACT_RECEIVING_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    console.error("Missing Resend server configuration");
    return NextResponse.json(
      { error: "Email service temporarily unconfigured." },
      { status: 500 }
    );
  }

  const resend: ResendClientLike =
    options?.resendClient || new Resend(apiKey);
  const { sanitized } = validation;

  const textContent = `New Contact Form Submission:
Name: ${sanitized.name}
Email: ${sanitized.email}
Subject: ${sanitized.subject}

Message:
${sanitized.message}

---
IP: ${clientIp}
Timestamp: ${new Date().toISOString()}
`;

  const htmlContent = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6; color: #1e293b;">
  <h2 style="color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${escapeHtml(sanitized.name)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(sanitized.email)}">${escapeHtml(sanitized.email)}</a></p>
  <p><strong>Subject:</strong> ${escapeHtml(sanitized.subject)}</p>
  <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #0284c7; margin-top: 16px;">
    <strong>Message:</strong>
    <p style="white-space: pre-wrap; margin-top: 8px;">${escapeHtml(sanitized.message)}</p>
  </div>
  <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Sent from portfolio contact form • IP: ${escapeHtml(clientIp)}</p>
</div>
`;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: sanitized.email,
      subject: `[Portfolio Contact] ${sanitized.subject}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend delivery failed:", error.message || error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("Resend execution error:", errorMsg);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request): Promise<Response> {
  return handleContactPost(req);
}
