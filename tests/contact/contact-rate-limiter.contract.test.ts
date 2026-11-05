import test from "node:test";
import assert from "node:assert";
import { getRateLimiter } from "@/lib/rate-limiter";

test("Task 3: Rate Limiter - Development in-memory limiter enforces 5 requests per window", async () => {
  const limiter = getRateLimiter({
    isProduction: false,
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
  });

  const testIp = "192.0.2.10";

  // Requests 1 through 5 should all be allowed
  for (let i = 1; i <= 5; i++) {
    const res = await limiter.check(testIp);
    assert.strictEqual(res.allowed, true, `Request #${i} should be allowed`);
    assert.strictEqual(res.remaining, 5 - i, `Remaining after #${i} should be ${5 - i}`);
    assert.ok(res.resetSeconds > 0, "resetSeconds must be positive");
  }

  // Request 6 must be rejected with rate_limit_exceeded
  const res6 = await limiter.check(testIp);
  assert.strictEqual(res6.allowed, false, "Request #6 must be rejected");
  assert.strictEqual(res6.remaining, 0);
  assert.strictEqual(res6.reason, "rate_limit_exceeded");
  assert.ok(res6.resetSeconds > 0, "resetSeconds must be > 0");

  // Different IP should still have its full quota
  const otherIpRes = await limiter.check("192.0.2.20");
  assert.strictEqual(otherIpRes.allowed, true);
  assert.strictEqual(otherIpRes.remaining, 4);
});

test("Task 3: Rate Limiter - Handles concurrent parallel requests accurately", async () => {
  const limiter = getRateLimiter({
    isProduction: false,
    maxRequests: 5,
    windowMs: 60 * 1000,
  });

  const ip = "198.51.100.99";

  // Fire 10 concurrent requests simultaneously
  const results = await Promise.all(
    Array.from({ length: 10 }, () => limiter.check(ip))
  );

  const allowedCount = results.filter((r) => r.allowed).length;
  const rejectedCount = results.filter((r) => !r.allowed).length;

  assert.strictEqual(allowedCount, 5, "Exactly 5 requests should be allowed");
  assert.strictEqual(rejectedCount, 5, "Exactly 5 requests should be rejected");

  const rejectedReasons = results
    .filter((r) => !r.allowed)
    .map((r) => r.reason);
  assert.ok(
    rejectedReasons.every((reason) => reason === "rate_limit_exceeded"),
    "All rejected requests must have rate_limit_exceeded reason"
  );
});

test("Task 3: Rate Limiter - Production fails closed when Redis credentials are missing", async () => {
  const limiter = getRateLimiter({
    isProduction: true,
    redisUrl: "",
    redisToken: "",
  });

  const res = await limiter.check("203.0.113.50");
  assert.strictEqual(res.allowed, false);
  assert.strictEqual(res.remaining, 0);
  assert.strictEqual(res.reason, "service_unavailable");
  assert.strictEqual(res.resetSeconds, 60);
});

test("Task 3: Rate Limiter - Production fails closed when Redis connection throws", async () => {
  const limiter = getRateLimiter({
    isProduction: true,
    redisUrl: "https://invalid-redis-endpoint.upstash.io",
    redisToken: "fake-token",
  });

  const res = await limiter.check("203.0.113.51");
  assert.strictEqual(res.allowed, false);
  assert.strictEqual(res.remaining, 0);
  assert.strictEqual(res.reason, "service_unavailable");
  assert.strictEqual(res.resetSeconds, 60);
});
