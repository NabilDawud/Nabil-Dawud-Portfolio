import { isIP } from "node:net";

export type ProxyTrustStrategy = "vercel" | "cloudflare" | "standard" | "development";

export interface ClientIpResult {
  ip: string | null;
  source: string;
  isValid: boolean;
  reason?:
    | "unconfigured_proxy_strategy"
    | "missing_canonical_header"
    | "invalid_ip"
    | "conflicting_trusted_headers";
}

const STRATEGY_CANONICAL_HEADERS: Record<
  Exclude<ProxyTrustStrategy, "development">,
  string
> = {
  vercel: "x-real-ip",
  cloudflare: "cf-connecting-ip",
  standard: "x-real-ip",
};

/**
 * Resolves the trusted client IP from incoming request headers based on an
 * explicitly configured proxy trust strategy.
 *
 * In production (NODE_ENV === "production" or options.isProduction === true),
 * TRUSTED_PROXY_STRATEGY must be explicitly defined and supported. If unconfigured
 * or if the canonical header is missing/invalid, the resolver fails closed (returns ip: null)
 * without falling back to loopback or alternative headers.
 */
export function extractClientIp(
  headers: Headers,
  options?: {
    strategy?: ProxyTrustStrategy;
    isProduction?: boolean;
  }
): ClientIpResult {
  const isProd =
    options?.isProduction ?? process.env.NODE_ENV === "production";

  const strategy =
    options?.strategy ||
    (process.env.TRUSTED_PROXY_STRATEGY as ProxyTrustStrategy | undefined);

  if (isProd) {
    if (!strategy || !["vercel", "cloudflare", "standard"].includes(strategy)) {
      return {
        ip: null,
        source: "none",
        isValid: false,
        reason: "unconfigured_proxy_strategy",
      };
    }
  } else if (!strategy) {
    // In local development or testing, default to isolated development strategy
    return {
      ip: "127.0.0.1",
      source: "development_fallback",
      isValid: true,
    };
  }

  if (strategy === "development") {
    const candidate =
      headers.get("x-real-ip") ||
      headers.get("cf-connecting-ip") ||
      headers.get("x-forwarded-for")?.split(",")[0]?.trim();

    if (candidate && isIP(candidate) !== 0) {
      return {
        ip: candidate,
        source: "development_header",
        isValid: true,
      };
    }

    return {
      ip: "127.0.0.1",
      source: "development_fallback",
      isValid: true,
    };
  }

  const canonicalHeader =
    STRATEGY_CANONICAL_HEADERS[
      strategy as Exclude<ProxyTrustStrategy, "development">
    ];

  if (!canonicalHeader) {
    return {
      ip: null,
      source: "none",
      isValid: false,
      reason: "unconfigured_proxy_strategy",
    };
  }

  if (!headers.has(canonicalHeader)) {
    return {
      ip: null,
      source: canonicalHeader,
      isValid: false,
      reason: "missing_canonical_header",
    };
  }

  const rawIp = headers.get(canonicalHeader)?.trim();

  if (!rawIp || isIP(rawIp) === 0) {
    return {
      ip: null,
      source: canonicalHeader,
      isValid: false,
      reason: "invalid_ip",
    };
  }

  return {
    ip: rawIp,
    source: canonicalHeader,
    isValid: true,
  };
}
