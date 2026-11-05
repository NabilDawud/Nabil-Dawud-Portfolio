import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { ContactCtaSection } from "@/components/home/ContactCtaSection";

test("Task 5 (Part A): Contact CTA Privacy and Scope Integrity", () => {
  // 1. Component export exists
  assert.strictEqual(typeof ContactCtaSection, "function");

  // 2. Strict Privacy Verification: NO mailto: and NO email addresses in source
  const ctaSourcePath = path.resolve(
    process.cwd(),
    "src/components/home/ContactCtaSection.tsx"
  );
  const sourceCode = fs.readFileSync(ctaSourcePath, "utf-8");

  assert.doesNotMatch(sourceCode, /mailto:/i, "Contact CTA must NOT contain any mailto: links");
  assert.doesNotMatch(
    sourceCode,
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    "Contact CTA must NOT display any email address"
  );
  assert.match(
    sourceCode,
    /href=["']\/contact["']/,
    "Contact CTA must link directly to /contact"
  );
});
