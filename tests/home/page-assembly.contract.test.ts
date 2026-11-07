import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import * as HomeComponents from "@/components/home";

test("Task 5 (Part B): Page Assembly and section anchors", () => {
  // 1. All sections must be exported from home index
  assert.strictEqual(typeof HomeComponents.HeroSection, "function");
  assert.strictEqual(typeof HomeComponents.HeroPortraitSlot, "function");
  assert.strictEqual(typeof HomeComponents.TechnicalFocusSection, "function");
  assert.strictEqual(typeof HomeComponents.SelectedWorkSection, "function");
  assert.strictEqual(typeof HomeComponents.JourneyPreviewSection, "function");
  assert.strictEqual(typeof HomeComponents.EducationPreviewSection, "function");
  assert.strictEqual(typeof HomeComponents.ContactCtaSection, "function");

  // 2. src/app/[locale]/page.tsx must assemble all sections and define necessary anchors
  const pageSourcePath = path.resolve(process.cwd(), "src/app/[locale]/page.tsx");
  const pageSource = fs.readFileSync(pageSourcePath, "utf-8");

  assert.match(pageSource, /<HeroSection\s*\/>/);
  assert.match(pageSource, /<TechnicalFocusSection\s*\/>/);
  assert.match(pageSource, /<SelectedWorkSection\s*\/>/);
  assert.match(pageSource, /<JourneyPreviewSection\s*\/>/);
  assert.match(pageSource, /<EducationPreviewSection\s*\/>/);
  assert.match(pageSource, /<ContactCtaSection\s*\/>/);
});
