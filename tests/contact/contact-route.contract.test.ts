import test from "node:test";
import assert from "node:assert";
import { handleContactPost, type ResendSendPayload } from "@/app/api/contact/route";

test("Task 4: /api/contact route - Valid submission dispatches email with correct headers and replyTo", async () => {
  let dispatchedPayload: ResendSendPayload | null = null;

  const mockResend = {
    emails: {
      send: async (payload: ResendSendPayload) => {
        dispatchedPayload = payload;
        return { data: { id: "msg_12345" }, error: null };
      },
    },
  };

  const req = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.10",
    },
    body: JSON.stringify({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Project Inquiry",
      message: "Hello Nabil, I would like to discuss a software project.",
    }),
  });

  const env = {
    RESEND_API_KEY: "re_mock_key",
    RESEND_FROM_EMAIL: "Nabil Dawud <contact@na-bil.app>",
    CONTACT_RECEIVING_EMAIL: "receiving@example.com",
    TRUSTED_PROXY_STRATEGY: "vercel",
  };

  const response = await handleContactPost(req, {
    resendClient: mockResend,
    env,
    isProduction: false,
  });

  assert.strictEqual(response.status, 200);
  const data = await response.json();
  assert.strictEqual(data.success, true);

  const sent = dispatchedPayload as unknown as ResendSendPayload;
  assert.ok(sent, "Resend send should have been invoked");
  assert.strictEqual(sent.from, "Nabil Dawud <contact@na-bil.app>");
  assert.strictEqual(sent.to, "receiving@example.com");
  assert.strictEqual(sent.replyTo, "jane@example.com");
  assert.ok(sent.text.includes("Jane Doe"));
  assert.ok(sent.text.includes("jane@example.com"));
  assert.ok(sent.text.includes("Hello Nabil, I would like to discuss a software project."));
});

test("Task 4: /api/contact route - Honeypot triggers silent 200 drop without calling Resend", async () => {
  let wasCalled = false;

  const mockResend = {
    emails: {
      send: async () => {
        wasCalled = true;
        return { data: null, error: null };
      },
    },
  };

  const req = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.11",
    },
    body: JSON.stringify({
      name: "Spam Bot",
      email: "bot@spam.com",
      subject: "Buy Crypto",
      message: "Check out this spam link immediately.",
      _hp_website: "https://spamlink.com",
    }),
  });

  const response = await handleContactPost(req, {
    resendClient: mockResend,
    env: {
      RESEND_API_KEY: "re_mock_key",
      RESEND_FROM_EMAIL: "Nabil Dawud <contact@na-bil.app>",
      CONTACT_RECEIVING_EMAIL: "receiving@example.com",
      TRUSTED_PROXY_STRATEGY: "vercel",
    },
    isProduction: false,
  });

  assert.strictEqual(response.status, 200);
  const data = await response.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(wasCalled, false, "Resend must NOT be called when honeypot is populated");
});

test("Task 4: /api/contact route - Invalid payload returns 400 with field errors", async () => {
  const req = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.12",
    },
    body: JSON.stringify({
      name: "",
      email: "not-an-email",
      subject: "",
      message: "short",
    }),
  });

  const response = await handleContactPost(req, {
    env: {
      RESEND_API_KEY: "re_mock_key",
      RESEND_FROM_EMAIL: "Nabil Dawud <contact@na-bil.app>",
      CONTACT_RECEIVING_EMAIL: "receiving@example.com",
    },
    isProduction: false,
  });

  assert.strictEqual(response.status, 400);
  const data = await response.json();
  assert.strictEqual(data.error, "Validation failed");
  assert.ok(data.errors.name);
  assert.ok(data.errors.email);
  assert.ok(data.errors.subject);
  assert.ok(data.errors.message);
});

test("Task 4: /api/contact route - Rate limit exceeded returns 429 + Retry-After", async () => {
  const mockLimiter = {
    check: async () => ({
      allowed: false,
      remaining: 0,
      resetSeconds: 300,
      reason: "rate_limit_exceeded" as const,
    }),
  };

  const req = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.13",
    },
    body: JSON.stringify({
      name: "Legit User",
      email: "user@example.com",
      subject: "Valid Subject",
      message: "This is a valid message.",
    }),
  });

  const response = await handleContactPost(req, {
    rateLimiter: mockLimiter,
    env: {
      RESEND_API_KEY: "re_mock_key",
      RESEND_FROM_EMAIL: "Nabil Dawud <contact@na-bil.app>",
      CONTACT_RECEIVING_EMAIL: "receiving@example.com",
    },
    isProduction: false,
  });

  assert.strictEqual(response.status, 429);
  assert.strictEqual(response.headers.get("Retry-After"), "300");
  const data = await response.json();
  assert.strictEqual(data.error, "Too many requests. Please try again later.");
});

test("Task 4: /api/contact route - Production unconfigured proxy strategy returns 503", async () => {
  const req = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.14",
    },
    body: JSON.stringify({
      name: "Legit User",
      email: "user@example.com",
      subject: "Valid Subject",
      message: "This is a valid message.",
    }),
  });

  const response = await handleContactPost(req, {
    env: {
      RESEND_API_KEY: "re_mock_key",
      RESEND_FROM_EMAIL: "Nabil Dawud <contact@na-bil.app>",
      CONTACT_RECEIVING_EMAIL: "receiving@example.com",
      // TRUSTED_PROXY_STRATEGY intentionally omitted
    },
    isProduction: true,
  });

  assert.strictEqual(response.status, 503);
  assert.strictEqual(response.headers.get("Retry-After"), "60");
  const data = await response.json();
  assert.strictEqual(data.error, "Service temporarily unavailable. Please try again shortly.");
});

test("Task 4: /api/contact route - Resend API failure returns sanitized 500 without leaking secrets", async () => {
  const mockResend = {
    emails: {
      send: async () => {
        return { data: null, error: { message: "Internal upstream provider failure" } };
      },
    },
  };

  const req = new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-real-ip": "203.0.113.15",
    },
    body: JSON.stringify({
      name: "Legit User",
      email: "user@example.com",
      subject: "Valid Subject",
      message: "This is a valid message.",
    }),
  });

  const response = await handleContactPost(req, {
    resendClient: mockResend,
    env: {
      RESEND_API_KEY: "super_secret_resend_key_12345",
      RESEND_FROM_EMAIL: "Nabil Dawud <contact@na-bil.app>",
      CONTACT_RECEIVING_EMAIL: "receiving@example.com",
      TRUSTED_PROXY_STRATEGY: "vercel",
    },
    isProduction: false,
  });

  assert.strictEqual(response.status, 500);
  const data = await response.json();
  assert.strictEqual(data.error, "Failed to send message. Please try again later.");

  // Assert secret key never appears anywhere in response JSON
  const rawString = JSON.stringify(data);
  assert.strictEqual(rawString.includes("super_secret_resend_key_12345"), false);
});
