import test from "node:test";
import assert from "node:assert";
import { personalBrand, cvConfig } from "@/data/personal";
import { enDictionary } from "@/i18n/dictionaries/en";
import { arDictionary } from "@/i18n/dictionaries/ar";
import { HeroPortraitSlot } from "@/components/home/HeroPortraitSlot";
import { HeroSection } from "@/components/home/HeroSection";

test("Task 1: Hero contract and component exports", () => {
  // 1. Data model integrity
  assert.ok(personalBrand.name.en.length > 0);
  assert.ok(personalBrand.name.ar.length > 0);
  assert.ok(personalBrand.socials.github.startsWith("https://github.com/"));
  assert.ok(personalBrand.socials.linkedin.startsWith("https://linkedin.com/"));

  // 2. CV configuration integrity
  assert.strictEqual(cvConfig.isAvailable, true);
  assert.strictEqual(cvConfig.fileName, "Nabil-Dawud-CV.pdf");
  assert.strictEqual(cvConfig.filePath, "/assets/cv/nabil-dawud-cv.pdf");
  assert.ok(cvConfig.statusMessage.en.length > 0);
  assert.ok(cvConfig.statusMessage.ar.length > 0);

  // 3. Subtle academic hierarchy in hero dictionary
  assert.match(enDictionary.hero.academicNote, /Al-Azhar University/i);
  assert.doesNotMatch(enDictionary.hero.academicNote, /91\.44%/);
  assert.match(arDictionary.hero.academicNote, /جامعة الأزهر/);
  assert.doesNotMatch(arDictionary.hero.academicNote, /91\.44%/);

  // 4. Components must be functions
  assert.strictEqual(typeof HeroPortraitSlot, "function");
  assert.strictEqual(typeof HeroSection, "function");
});
