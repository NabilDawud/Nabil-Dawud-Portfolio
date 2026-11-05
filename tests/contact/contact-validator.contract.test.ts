import test from "node:test";
import assert from "node:assert";
import { validateContactPayload } from "@/lib/contact-validator";

test("Task 2: validateContactPayload - Valid payload passes with sanitized output", () => {
  const body = {
    name: "  Alice Engineer  ",
    email: "alice@example.com",
    subject: "  Collaboration Opportunity  ",
    message: "Hello Nabil,\nI would love to discuss a project with you in detail.\nThanks!",
  };

  const result = validateContactPayload(body, "en");

  assert.strictEqual(result.isValid, true);
  assert.deepStrictEqual(result.errors, {});
  assert.ok(result.sanitized);
  assert.strictEqual(result.sanitized.name, "Alice Engineer");
  assert.strictEqual(result.sanitized.email, "alice@example.com");
  assert.strictEqual(result.sanitized.subject, "Collaboration Opportunity");
  assert.ok(result.sanitized.message.startsWith("Hello Nabil,"));
});

test("Task 2: validateContactPayload - Rejects empty fields with English errors", () => {
  const body = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const result = validateContactPayload(body, "en");

  assert.strictEqual(result.isValid, false);
  assert.ok(result.errors.name, "Name error expected");
  assert.ok(result.errors.email, "Email error expected");
  assert.ok(result.errors.subject, "Subject error expected");
  assert.ok(result.errors.message, "Message error expected");
  assert.strictEqual(result.sanitized, undefined);
});

test("Task 2: validateContactPayload - Rejects empty fields with Arabic errors", () => {
  const body = {};

  const result = validateContactPayload(body, "ar");

  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.name, "الاسم مطلوب");
  assert.strictEqual(result.errors.email, "البريد الإلكتروني مطلوب");
  assert.strictEqual(result.errors.subject, "الموضوع مطلوب");
  assert.strictEqual(result.errors.message, "الرسالة مطلوبة");
});

test("Task 2: validateContactPayload - Rejects invalid emails", () => {
  const invalidEmails = [
    "plainaddress",
    "#@%^%#$@#$@#.com",
    "@example.com",
    "Joe Smith <email@example.com>",
    "email.example.com",
    "email@example@example.com",
    "email@example",
    "a".repeat(255) + "@example.com",
  ];

  for (const email of invalidEmails) {
    const result = validateContactPayload(
      {
        name: "Test User",
        email,
        subject: "Valid Subject",
        message: "This is a valid message of sufficient length.",
      },
      "en"
    );

    assert.strictEqual(result.isValid, false, `Should reject invalid email: ${email}`);
    assert.strictEqual(result.errors.email, "Please enter a valid email address");
  }
});

test("Task 2: validateContactPayload - Length boundary enforcement", () => {
  // Name too short (< 2)
  const shortName = validateContactPayload({
    name: "A",
    email: "test@example.com",
    subject: "Valid Subject",
    message: "Valid message content here.",
  }, "en");
  assert.strictEqual(shortName.isValid, false);
  assert.strictEqual(shortName.errors.name, "Name must be at least 2 characters");

  // Name too long (> 100)
  const longName = validateContactPayload({
    name: "A".repeat(101),
    email: "test@example.com",
    subject: "Valid Subject",
    message: "Valid message content here.",
  }, "en");
  assert.strictEqual(longName.isValid, false);
  assert.strictEqual(longName.errors.name, "Name must be at most 100 characters");

  // Subject too short (< 3)
  const shortSubject = validateContactPayload({
    name: "Valid Name",
    email: "test@example.com",
    subject: "Hi",
    message: "Valid message content here.",
  }, "en");
  assert.strictEqual(shortSubject.isValid, false);
  assert.strictEqual(shortSubject.errors.subject, "Subject must be at least 3 characters");

  // Subject too long (> 200)
  const longSubject = validateContactPayload({
    name: "Valid Name",
    email: "test@example.com",
    subject: "S".repeat(201),
    message: "Valid message content here.",
  }, "en");
  assert.strictEqual(longSubject.isValid, false);
  assert.strictEqual(longSubject.errors.subject, "Subject must be at most 200 characters");

  // Message too short (< 10)
  const shortMsg = validateContactPayload({
    name: "Valid Name",
    email: "test@example.com",
    subject: "Valid Subject",
    message: "Too short",
  }, "en");
  assert.strictEqual(shortMsg.isValid, false);
  assert.strictEqual(shortMsg.errors.message, "Message must be at least 10 characters");

  // Message too long (> 5000)
  const longMsg = validateContactPayload({
    name: "Valid Name",
    email: "test@example.com",
    subject: "Valid Subject",
    message: "M".repeat(5001),
  }, "en");
  assert.strictEqual(longMsg.isValid, false);
  assert.strictEqual(longMsg.errors.message, "Message must be at most 5000 characters");
});

test("Task 2: validateContactPayload - Strips dangerous ASCII control characters", () => {
  const result = validateContactPayload({
    name: "Alice\x00\x08\x1F",
    email: "alice@example.com",
    subject: "Inquiry\x07\x0B",
    message: "Normal message with safe newline\nand tab\tpreserved but \x00 removed.",
  }, "en");

  assert.strictEqual(result.isValid, true);
  assert.ok(result.sanitized);
  assert.strictEqual(result.sanitized.name, "Alice");
  assert.strictEqual(result.sanitized.subject, "Inquiry");
  assert.strictEqual(
    result.sanitized.message,
    "Normal message with safe newline\nand tab\tpreserved but  removed."
  );
});

test("Task 2: validateContactPayload - Preserves honeypot field if present", () => {
  const result = validateContactPayload({
    name: "Bot User",
    email: "bot@example.com",
    subject: "Spam Subject",
    message: "Spam message of sufficient length.",
    _hp_website: "https://spam-link.example.com",
  }, "en");

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.sanitized?._hp_website, "https://spam-link.example.com");
});
