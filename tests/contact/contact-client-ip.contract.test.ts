import test from "node:test";
import assert from "node:assert";
import { extractClientIp } from "@/lib/client-ip";

test("Task 1: extractClientIp - Canonical header selection for Vercel strategy", () => {
  const headers = new Headers();
  headers.set("x-real-ip", "203.0.113.195");
  // Attacker-controlled untrusted header should be ignored
  headers.set("x-forwarded-for", "198.51.100.1, 10.0.0.1");

  const result = extractClientIp(headers, {
    strategy: "vercel",
    isProduction: true,
  });

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.ip, "203.0.113.195");
  assert.strictEqual(result.source, "x-real-ip");
  assert.strictEqual(result.reason, undefined);
});

test("Task 1: extractClientIp - Canonical header selection for Cloudflare strategy", () => {
  const headers = new Headers();
  headers.set("cf-connecting-ip", "198.51.100.42");
  // Other headers ignored
  headers.set("x-real-ip", "203.0.113.1");

  const result = extractClientIp(headers, {
    strategy: "cloudflare",
    isProduction: true,
  });

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.ip, "198.51.100.42");
  assert.strictEqual(result.source, "cf-connecting-ip");
  assert.strictEqual(result.reason, undefined);
});

test("Task 1: extractClientIp - Canonical header selection for Standard strategy", () => {
  const headers = new Headers();
  headers.set("x-real-ip", "192.0.2.1");

  const result = extractClientIp(headers, {
    strategy: "standard",
    isProduction: true,
  });

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.ip, "192.0.2.1");
  assert.strictEqual(result.source, "x-real-ip");
});

test("Task 1: extractClientIp - Valid IPv6 handling", () => {
  const headers = new Headers();
  headers.set("x-real-ip", "2001:0db8:85a3:0000:0000:8a2e:0370:7334");

  const result = extractClientIp(headers, {
    strategy: "vercel",
    isProduction: true,
  });

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.ip, "2001:0db8:85a3:0000:0000:8a2e:0370:7334");
});

test("Task 1: extractClientIp - Production fails closed when strategy is unconfigured", () => {
  const headers = new Headers();
  headers.set("x-real-ip", "203.0.113.195");

  const oldEnv = process.env.TRUSTED_PROXY_STRATEGY;
  delete process.env.TRUSTED_PROXY_STRATEGY;

  try {
    const result = extractClientIp(headers, {
      isProduction: true,
    });

    assert.strictEqual(result.isValid, false);
    assert.strictEqual(result.ip, null);
    assert.strictEqual(result.reason, "unconfigured_proxy_strategy");
  } finally {
    if (oldEnv) process.env.TRUSTED_PROXY_STRATEGY = oldEnv;
  }
});

test("Task 1: extractClientIp - Production fails closed when canonical header is missing", () => {
  const headers = new Headers();
  // Canonical for vercel is x-real-ip; only provide untrusted x-forwarded-for
  headers.set("x-forwarded-for", "203.0.113.195");

  const result = extractClientIp(headers, {
    strategy: "vercel",
    isProduction: true,
  });

  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.ip, null);
  assert.strictEqual(result.reason, "missing_canonical_header");
});

test("Task 1: extractClientIp - Rejects malformed and invalid IPs via isIP()", () => {
  const invalidIps = [
    "999.999.999.999",
    "invalid-ip",
    ":::1",
    "127.0.0.1; DROP TABLE users",
    "192.168.1.1/24",
    "",
  ];

  for (const invalid of invalidIps) {
    const headers = new Headers();
    headers.set("x-real-ip", invalid);

    const result = extractClientIp(headers, {
      strategy: "vercel",
      isProduction: true,
    });

    assert.strictEqual(
      result.isValid,
      false,
      `Should reject invalid IP: ${invalid}`
    );
    assert.strictEqual(result.ip, null);
    assert.strictEqual(result.reason, "invalid_ip");
  }
});

test("Task 1: extractClientIp - Development fallback behavior", () => {
  const headers = new Headers();
  // In development without headers, safely returns loopback
  const result = extractClientIp(headers, {
    strategy: "development",
    isProduction: false,
  });

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.ip, "127.0.0.1");
  assert.strictEqual(result.source, "development_fallback");
});
