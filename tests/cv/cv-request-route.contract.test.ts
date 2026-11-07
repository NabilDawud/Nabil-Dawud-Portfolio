import test from "node:test";
import assert from "node:assert";
import {
  handleCVRequestPost,
  type ResendClientLike,
  type ResendSendPayload,
} from "@/app/api/cv-request/route";
import type { IRateLimiter, RateLimitCheckResult } from "@/lib/rate-limiter";

class MockResend implements ResendClientLike {
  public lastPayload: ResendSendPayload | null = null;
  public shouldFail = false;

  emails = {
    send: async (payload: ResendSendPayload) => {
      this.lastPayload = payload;
      if (this.shouldFail) {
        return { error: { message: "Internal upstream provider failure" } };
      }
      return { data: { id: "mock_cv_msg_123" } };
    },
  };
}

class MockRateLimiter implements IRateLimiter {
  constructor(
    public allowed = true,
    public reason?: "rate_limit_exceeded" | "service_unavailable"
  ) {}
  async check(): Promise<RateLimitCheckResult> {
    return {
      allowed: this.allowed,
      remaining: this.allowed ? 4 : 0,
      resetSeconds: 60,
      reason: this.reason,
    };
  }
}

const validEnv = {
  RESEND_API_KEY: "re_mock_test_key",
  RESEND_FROM_EMAIL: "onboarding@resend.dev",
  CONTACT_RECEIVING_EMAIL: "nabeeldawud@gmail.com",
};

test("CV Request Route: Valid submission dispatches email with exact subject and privacy guarantees", async () => {
  const mockResend = new MockResend();
  const mockLimiter = new MockRateLimiter(true);

  const req = new Request("http://localhost:3000/api/cv-request?locale=en", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.195",
    },
    body: JSON.stringify({
      fullName: "Marcus Vance",
      email: "marcus.vance@techcorp.com",
      organization: "TechCorp Labs",
      purpose: "Considering candidate for Principal Distributed Systems Engineer position.",
    }),
  });

  const res = await handleCVRequestPost(req, {
    resendClient: mockResend,
    rateLimiter: mockLimiter,
    env: validEnv,
    strategy: "standard",
    isProduction: true,
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);

  // 1. Verify exact email subject
  assert.ok(mockResend.lastPayload, "Resend send must have been called");
  assert.strictEqual(
    mockResend.lastPayload.subject,
    "CV Request",
    "Email subject must be EXACTLY 'CV Request'"
  );

  // 2. Verify replyTo
  assert.strictEqual(mockResend.lastPayload.replyTo, "marcus.vance@techcorp.com");
  assert.strictEqual(mockResend.lastPayload.to, "nabeeldawud@gmail.com");

  // 3. Verify content
  const text = mockResend.lastPayload.text;
  assert.ok(text.includes("Marcus Vance"));
  assert.ok(text.includes("marcus.vance@techcorp.com"));
  assert.ok(text.includes("TechCorp Labs"));
  assert.ok(text.includes("Principal Distributed Systems Engineer"));
  assert.ok(text.includes("Submission Date & Time:"));

  // 4. Strict Privacy: IP address MUST NOT be in the email body
  assert.strictEqual(
    text.includes("203.0.113.195"),
    false,
    "Requester IP address MUST NOT be included in email text"
  );
  assert.strictEqual(
    (mockResend.lastPayload.html || "").includes("203.0.113.195"),
    false,
    "Requester IP address MUST NOT be included in email HTML"
  );

  // 5. Strict Security: No attachments and no download links
  assert.strictEqual(
    (mockResend.lastPayload as unknown as Record<string, unknown>).attachments,
    undefined,
    "Must NOT attach CV or any file"
  );
  assert.strictEqual(
    text.includes(".pdf") || (mockResend.lastPayload.html || "").includes(".pdf"),
    false,
    "Email must NOT contain any PDF links or references"
  );
});

test("CV Request Route: Honeypot triggers silent 200 drop without calling Resend", async () => {
  const mockResend = new MockResend();
  const mockLimiter = new MockRateLimiter(true);

  const req = new Request("http://localhost:3000/api/cv-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Bot User",
      email: "bot@spammer.org",
      purpose: "Spam purpose message exceeding min length.",
      _hp_website: "https://spamlink.com",
    }),
  });

  const res = await handleCVRequestPost(req, {
    resendClient: mockResend,
    rateLimiter: mockLimiter,
    env: validEnv,
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(mockResend.lastPayload, null, "Resend must NOT be called on honeypot");
});

test("CV Request Route: Invalid payload returns 400 with field errors", async () => {
  const mockResend = new MockResend();
  const mockLimiter = new MockRateLimiter(true);

  const req = new Request("http://localhost:3000/api/cv-request?locale=ar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "",
      email: "not-an-email",
      purpose: "",
    }),
  });

  const res = await handleCVRequestPost(req, {
    resendClient: mockResend,
    rateLimiter: mockLimiter,
    env: validEnv,
  });

  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.strictEqual(data.error, "Validation failed");
  assert.strictEqual(data.errors.fullName, "الاسم الكامل مطلوب");
  assert.strictEqual(data.errors.email, "يرجى إدخال عنوان بريد إلكتروني صالح");
  assert.strictEqual(data.errors.purpose, "سبب الطلب مطلوب");
  assert.strictEqual(mockResend.lastPayload, null);
});

test("CV Request Route: Rate limit exceeded returns 429 + Retry-After", async () => {
  const mockResend = new MockResend();
  const mockLimiter = new MockRateLimiter(false);

  const req = new Request("http://localhost:3000/api/cv-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Marcus Vance",
      email: "marcus@techcorp.com",
      purpose: "Legitimate purpose exceeding min characters.",
    }),
  });

  const res = await handleCVRequestPost(req, {
    resendClient: mockResend,
    rateLimiter: mockLimiter,
    env: validEnv,
  });

  assert.strictEqual(res.status, 429);
  assert.strictEqual(res.headers.get("Retry-After"), "60");
  assert.strictEqual(mockResend.lastPayload, null);
});

test("CV Request Route: Resend API failure returns sanitized 500 without leaking secrets", async () => {
  const mockResend = new MockResend();
  mockResend.shouldFail = true;
  const mockLimiter = new MockRateLimiter(true);

  const req = new Request("http://localhost:3000/api/cv-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Marcus Vance",
      email: "marcus@techcorp.com",
      purpose: "Legitimate purpose exceeding min characters.",
    }),
  });

  const res = await handleCVRequestPost(req, {
    resendClient: mockResend,
    rateLimiter: mockLimiter,
    env: validEnv,
  });

  assert.strictEqual(res.status, 500);
  const data = await res.json();
  assert.strictEqual(data.error, "Failed to send request. Please try again later.");
});

test("CV Request Route: Payload exceeding 100KB returns 413", async () => {
  const mockResend = new MockResend();
  const mockLimiter = new MockRateLimiter(true);

  const req = new Request("http://localhost:3000/api/cv-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "content-length": String(105 * 1024),
    },
    body: JSON.stringify({
      fullName: "Marcus Vance",
      email: "marcus@techcorp.com",
      purpose: "Legitimate purpose exceeding min characters.",
    }),
  });

  const res = await handleCVRequestPost(req, {
    resendClient: mockResend,
    rateLimiter: mockLimiter,
    env: validEnv,
  });

  assert.strictEqual(res.status, 413);
  const data = await res.json();
  assert.strictEqual(data.error, "Payload too large. Maximum size is 100KB.");
  assert.strictEqual(mockResend.lastPayload, null);
});
