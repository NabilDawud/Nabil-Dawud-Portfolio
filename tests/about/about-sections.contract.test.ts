import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import {
  AboutHeroSection,
  AcademicCredentialsSection,
  CertificationsGallery,
  CertificateLightbox,
  AiWorkflowSection,
  BeyondCodeSection,
} from "@/components/about";

test("Task 2: About Page Modular Components contracts and truth constraints", () => {
  // 1. Component exports exist
  assert.strictEqual(typeof AboutHeroSection, "function");
  assert.strictEqual(typeof AcademicCredentialsSection, "function");
  assert.strictEqual(typeof CertificationsGallery, "function");
  assert.strictEqual(typeof CertificateLightbox, "function");
  assert.strictEqual(typeof AiWorkflowSection, "function");
  assert.strictEqual(typeof BeyondCodeSection, "function");

  // 2. AcademicCredentialsSection contract & hierarchy
  const academicSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/about/AcademicCredentialsSection.tsx"),
    "utf-8"
  );
  assert.match(
    academicSource,
    /degreeTitle/,
    "Must reference verified degreeTitle dictionary token"
  );
  assert.match(
    academicSource,
    /gradeValue/,
    "Must reference verified gradeValue dictionary token (91.44% — Excellent)"
  );
  assert.match(
    academicSource,
    /tawjihiScore/,
    "Must reference secondary Tawjihi score (99.1%)"
  );
  assert.match(
    academicSource,
    /tawjihiContext/,
    "Must reference secondary Tawjihi context"
  );
  assert.doesNotMatch(
    academicSource,
    /Bachelor of Science/,
    "Must NOT hardcode or include unverified 'Bachelor of Science' prefix"
  );
  assert.doesNotMatch(
    academicSource,
    /Graduated with Distinction/,
    "Must NOT include unverified 'Graduated with Distinction' honor terminology"
  );

  // 3. CertificationsGallery and Lightbox integration
  const gallerySource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/about/CertificationsGallery.tsx"),
    "utf-8"
  );
  assert.match(
    gallerySource,
    /getAllCertifications/,
    "Gallery must fetch data via getAllCertifications"
  );
  assert.match(
    gallerySource,
    /CertificateLightbox/,
    "Gallery must integrate CertificateLightbox modal"
  );

  // 4. CertificateLightbox accessibility and fallback integrity
  const lightboxSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/about/CertificateLightbox.tsx"),
    "utf-8"
  );
  assert.match(
    lightboxSource,
    /role="dialog"/,
    "Lightbox must specify role='dialog'"
  );
  assert.match(
    lightboxSource,
    /aria-modal="true"/,
    "Lightbox must specify aria-modal='true'"
  );
  assert.match(
    lightboxSource,
    /aria-labelledby/,
    "Lightbox must specify aria-labelledby"
  );
  assert.match(
    lightboxSource,
    /illustrativeFallbackNotice|pendingScanNotice/,
    "Lightbox must display honest illustrative preview notice"
  );
  assert.doesNotMatch(
    lightboxSource,
    /seal|stamp|signature-svg|golden-crest/i,
    "Lightbox must NOT fabricate seals, stamps, or signatures"
  );

  // 5. AiWorkflowSection human responsibility and ownership
  const aiWorkflowSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/about/AiWorkflowSection.tsx"),
    "utf-8"
  );
  assert.match(
    aiWorkflowSource,
    /aiWorkflowTitle/,
    "Must use dictionary token for AI workflow title"
  );
  assert.match(
    aiWorkflowSource,
    /aiWorkflowDescription/,
    "Must use dictionary token for AI workflow description"
  );

  // 6. BeyondCodeSection truth constraints
  const beyondCodeSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/components/about/BeyondCodeSection.tsx"),
    "utf-8"
  );
  assert.match(
    beyondCodeSource,
    /beyondCodeTitle/,
    "Must use dictionary token for Beyond the Code title"
  );
  assert.match(
    beyondCodeSource,
    /beyondCodeText/,
    "Must use dictionary token for Beyond the Code text"
  );
});
