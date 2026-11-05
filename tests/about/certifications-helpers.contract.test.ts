import test from "node:test";
import assert from "node:assert";
import {
  getAllCertifications,
  getCertificationById,
  getAdjacentCertification,
} from "@/data/certifications-helpers";
import { enDictionary } from "@/i18n/dictionaries/en";
import { arDictionary } from "@/i18n/dictionaries/ar";

test("Task 1: Certifications data helpers and dictionary contracts", () => {
  // 1. getAllCertifications returns exactly 2 verified certifications
  const all = getAllCertifications();
  assert.strictEqual(all.length, 2);
  assert.strictEqual(all[0].id, "web-dev-diploma");
  assert.strictEqual(all[1].id, "bbd-backend-training");

  // 2. getCertificationById
  const webDev = getCertificationById("web-dev-diploma");
  assert.ok(webDev, "web-dev-diploma must exist");
  assert.strictEqual(webDev.id, "web-dev-diploma");
  assert.strictEqual(webDev.hours, 230);
  assert.strictEqual(webDev.verified, true);

  const bbd = getCertificationById("bbd-backend-training");
  assert.ok(bbd, "bbd-backend-training must exist");
  assert.strictEqual(bbd.id, "bbd-backend-training");
  assert.strictEqual(bbd.verified, true);

  const nonExistent = getCertificationById("non-existent-id");
  assert.strictEqual(nonExistent, undefined);

  // 3. getAdjacentCertification circular navigation
  const adjWebDev = getAdjacentCertification("web-dev-diploma");
  assert.ok(adjWebDev, "Adjacent for web-dev-diploma must exist");
  assert.strictEqual(adjWebDev.prev.id, "bbd-backend-training");
  assert.strictEqual(adjWebDev.next.id, "bbd-backend-training");

  const adjBbd = getAdjacentCertification("bbd-backend-training");
  assert.ok(adjBbd, "Adjacent for bbd-backend-training must exist");
  assert.strictEqual(adjBbd.prev.id, "web-dev-diploma");
  assert.strictEqual(adjBbd.next.id, "web-dev-diploma");

  assert.strictEqual(getAdjacentCertification("invalid-id"), undefined);

  // 4. Bilingual dictionary parity for About page
  const requiredAboutKeys = [
    "sectionBadge",
    "sectionTitle",
    "sectionSubtitle",
    "degreeTitle",
    "universityName",
    "facultyName",
    "gradeLabel",
    "gradeValue",
    "curriculumTitle",
    "curriculumDescription",
    "tawjihiTitle",
    "tawjihiScore",
    "tawjihiContext",
    "certificationsTitle",
    "certificationsSubtitle",
    "viewCertificate",
    "closeLightbox",
    "illustrativeFallbackNotice",
    "pendingScanNotice",
    "aiWorkflowTitle",
    "aiWorkflowSubtitle",
    "aiWorkflowDescription",
    "beyondCodeTitle",
    "beyondCodeText",
  ];

  for (const key of requiredAboutKeys) {
    assert.ok(
      (enDictionary.about as Record<string, unknown>)[key],
      `English dictionary missing about key: ${key}`
    );
    assert.ok(
      (arDictionary.about as Record<string, unknown>)[key],
      `Arabic dictionary missing about key: ${key}`
    );
  }

  // 5. Degree title strictly "Computer Systems Engineering" (no unverified Bachelor of Science)
  assert.strictEqual(enDictionary.about.degreeTitle, "Computer Systems Engineering");
  assert.strictEqual(arDictionary.about.degreeTitle, "هندسة أنظمة الحاسوب");

  // 6. Grade strictly 91.44% and Excellent (no unsupported honors wording)
  assert.strictEqual(enDictionary.about.gradeValue, "91.44% — Excellent");
  assert.strictEqual(arDictionary.about.gradeValue, "91.44% — ممتاز");

  // 7. Tawjihi score 99.1%
  assert.strictEqual(enDictionary.about.tawjihiScore, "99.1%");
  assert.strictEqual(arDictionary.about.tawjihiScore, "99.1%");
});
