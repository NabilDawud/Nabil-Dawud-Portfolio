import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
  reason?: "rate_limit_exceeded" | "service_unavailable";
}

export interface IRateLimiter {
  check(identifier: string): Promise<RateLimitCheckResult>;
}

export interface RateLimiterOptions {
  isProduction?: boolean;
  redisUrl?: string;
  redisToken?: string;
  windowMs?: number;
  maxRequests?: number;
}

class MemoryRateLimiter implements IRateLimiter {
  private requests = new Map<string, number[]>();

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  async check(identifier: string): Promise<RateLimitCheckResult> {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    const history = this.requests.get(identifier) || [];
    const validHistory = history.filter((ts) => ts > windowStart);

    if (validHistory.length >= this.maxRequests) {
      const oldest = validHistory[0];
      const resetSeconds = Math.max(
        1,
        Math.ceil((oldest + this.windowMs - now) / 1000)
      );
      return {
        allowed: false,
        remaining: 0,
        resetSeconds,
        reason: "rate_limit_exceeded",
      };
    }

    validHistory.push(now);
    this.requests.set(identifier, validHistory);
    const oldest = validHistory[0];
    const resetSeconds = Math.max(
      1,
      Math.ceil((oldest + this.windowMs - now) / 1000)
    );

    return {
      allowed: true,
      remaining: this.maxRequests - validHistory.length,
      resetSeconds,
    };
  }
}

class UpstashRateLimiter implements IRateLimiter {
  private ratelimit: Ratelimit | null = null;
  private isUnconfigured = false;

  constructor(
    url?: string,
    token?: string,
    maxRequests = 5,
    windowMs = 15 * 60 * 1000
  ) {
    if (!url || !token) {
      this.isUnconfigured = true;
      return;
    }

    try {
      const redis = new Redis({
        url,
        token,
      });

      const windowDuration = `${Math.ceil(windowMs / 1000)} s` as `${number} s`;

      this.ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(maxRequests, windowDuration),
        analytics: false,
        prefix: "ratelimit:contact",
      });
    } catch {
      this.isUnconfigured = true;
    }
  }

  async check(identifier: string): Promise<RateLimitCheckResult> {
    if (this.isUnconfigured || !this.ratelimit) {
      return {
        allowed: false,
        remaining: 0,
        resetSeconds: 60,
        reason: "service_unavailable",
      };
    }

    try {
      // 3000ms timeout to ensure fast fail-closed behavior under network degradation
      const limitPromise = this.ratelimit.limit(identifier);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Rate limiter timeout")), 3000)
      );

      const res = (await Promise.race([
        limitPromise,
        timeoutPromise,
      ])) as Awaited<ReturnType<Ratelimit["limit"]>>;

      const now = Date.now();
      const resetSeconds = Math.max(1, Math.ceil((res.reset - now) / 1000));

      if (!res.success) {
        return {
          allowed: false,
          remaining: res.remaining,
          resetSeconds,
          reason: "rate_limit_exceeded",
        };
      }

      return {
        allowed: true,
        remaining: res.remaining,
        resetSeconds,
      };
    } catch {
      // Fail closed when Redis service is unreachable, times out, or errors out
      return {
        allowed: false,
        remaining: 0,
        resetSeconds: 60,
        reason: "service_unavailable",
      };
    }
  }
}

export function getRateLimiter(options?: RateLimiterOptions): IRateLimiter {
  const isProd =
    options?.isProduction ?? process.env.NODE_ENV === "production";
  const maxRequests = options?.maxRequests ?? 5;
  const windowMs = options?.windowMs ?? 15 * 60 * 1000;
  const redisUrl = options?.redisUrl ?? process.env.UPSTASH_REDIS_REST_URL;
  const redisToken =
    options?.redisToken ?? process.env.UPSTASH_REDIS_REST_TOKEN;

  if (isProd) {
    return new UpstashRateLimiter(redisUrl, redisToken, maxRequests, windowMs);
  }

  if (redisUrl && redisToken) {
    return new UpstashRateLimiter(redisUrl, redisToken, maxRequests, windowMs);
  }

  return new MemoryRateLimiter(maxRequests, windowMs);
}

let defaultRateLimiter: IRateLimiter | null = null;

export async function checkRateLimit(
  identifier: string,
  options?: RateLimiterOptions
): Promise<RateLimitCheckResult> {
  if (options) {
    return getRateLimiter(options).check(identifier);
  }
  if (!defaultRateLimiter) {
    defaultRateLimiter = getRateLimiter();
  }
  return defaultRateLimiter.check(identifier);
}
