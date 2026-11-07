import test from "node:test";
import assert from "node:assert";
import { validateCVRequestPayload } from "@/lib/cv-request-validator";

test("CV Request Validator: Valid payloads pass with sanitization", () => {
  const result = validateCVRequestPayload({
    fullName: "  Sarah Jenkins  ",
    email: "  sarah.jenkins@example.com  ",
    purpose: "  Looking for a Senior Backend engineer for our fintech platform.  ",
    organization: "  Acme Corp  ",
  });

  assert.strictEqual(result.isValid, true);
  assert.deepStrictEqual(result.errors, {});
  assert.ok(result.sanitized);
  assert.strictEqual(result.sanitized.fullName, "Sarah Jenkins");
  assert.strictEqual(result.sanitized.email, "sarah.jenkins@example.com");
  assert.strictEqual(
    result.sanitized.purpose,
    "Looking for a Senior Backend engineer for our fintech platform."
  );
  assert.strictEqual(result.sanitized.organization, "Acme Corp");
});

test("CV Request Validator: Optional organization can be omitted", () => {
  const result = validateCVRequestPayload({
    fullName: "Alex Rivera",
    email: "alex@example.org",
    purpose: "Evaluating backend architectural experience for freelance contract.",
  });

  assert.strictEqual(result.isValid, true);
  assert.strictEqual(result.sanitized?.organization, undefined);
});

test("CV Request Validator: Rejects missing or invalid fields in English", () => {
  const result = validateCVRequestPayload(
    {
      fullName: "",
      email: "invalid-email",
      purpose: "hi",
    },
    "en"
  );

  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.fullName, "Full name is required");
  assert.strictEqual(result.errors.email, "Please enter a valid email address");
  assert.strictEqual(result.errors.purpose, "Purpose must be at least 5 characters");
});

test("CV Request Validator: Rejects missing or invalid fields in Arabic", () => {
  const result = validateCVRequestPayload(
    {
      fullName: "",
      email: "invalid-email",
      purpose: "قصير",
    },
    "ar"
  );

  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.fullName, "الاسم الكامل مطلوب");
  assert.strictEqual(result.errors.email, "يرجى إدخال عنوان بريد إلكتروني صالح");
  assert.strictEqual(result.errors.purpose, "يجب أن يتكون سبب الطلب من 5 أحرف على الأقل");
});

test("CV Request Validator: Strips dangerous ASCII control characters and enforces length limits", () => {
  const dangerousName = "Nabil\x00\x08Dawud\x1F";
  const result = validateCVRequestPayload({
    fullName: dangerousName,
    email: "nabil@example.com",
    purpose: "Legitimate purpose of request exceeding 5 chars.",
    organization: "A".repeat(105),
  });

  assert.strictEqual(result.isValid, false);
  assert.strictEqual(result.errors.organization, "Organization must be at most 100 characters");
});
