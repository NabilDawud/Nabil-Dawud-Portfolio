import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { journeyEntries } from "@/data/journey";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { JourneyPreviewSection } from "@/components/home/JourneyPreviewSection";
import { EducationPreviewSection } from "@/components/home/EducationPreviewSection";

test("Task 4: Journey & Education contract and role integrity", () => {
  // 1. Component exports exist
  assert.strictEqual(typeof JourneyPreviewSection, "function");
  assert.strictEqual(typeof EducationPreviewSection, "function");

  // 2. Journey must separate team builds from training, no corporate employment claims
  assert.ok(journeyEntries.length >= 4);
  journeyEntries.forEach((entry) => {
    assert.ok(["experience", "program", "education"].includes(entry.type));
    // Must NOT claim formal corporate employment
    const desc = JSON.stringify(entry);
    assert.doesNotMatch(desc, /full-time employee/i);
    assert.doesNotMatch(desc, /permanent position/i);
  });

  // 3. Education data integrity: Al-Azhar University 91.44%
  assert.match(education.degree.en, /Computer Systems Engineering/i);
  assert.match(education.grade.en, /91\.44%/);
  assert.match(education.institution.en, /Al-Azhar University/i);
  assert.strictEqual(education.percentage, 91.44);
  assert.strictEqual(education.tawjihiHighlight?.score, 99.1);

  // 4. Certifications: 230-hour Ministry of Education diploma and BBD training
  assert.ok(certifications.length >= 2);
  const diploma = certifications.find((c) => c.id === "web-dev-diploma");
  assert.ok(diploma);
  assert.strictEqual(diploma.hours, 230);

  // 5. Home Education Preview must NOT display Tawjihi 99.1% (reserved strictly for About page)
  const educationPreviewSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/home/EducationPreviewSection.tsx"),
    "utf-8"
  );
  assert.doesNotMatch(
    educationPreviewSource,
    /99\.1%/,
    "Home EducationPreviewSection must NOT display Tawjihi 99.1%"
  );
  assert.doesNotMatch(
    educationPreviewSource,
    /tawjihi/i,
    "Home EducationPreviewSection must NOT display Tawjihi"
  );
});
