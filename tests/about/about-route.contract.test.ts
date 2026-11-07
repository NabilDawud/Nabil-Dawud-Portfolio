import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import AboutPage, { generateMetadata } from "@/app/[locale]/about/page";

test("Task 3: About page route metadata and section assembly contracts", async () => {
  // 1. Exported component
  assert.strictEqual(typeof AboutPage, "function");

  // 2. Exported metadata contracts
  const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });
  assert.ok(metadata, "Route must export metadata");
  assert.match(
    String(metadata.title),
    /About/i,
    "Metadata title must mention About"
  );
  assert.match(
    String(metadata.description),
    /Computer Systems Engineer/i,
    "Metadata description must mention Computer Systems Engineer"
  );
  assert.strictEqual(
    metadata.alternates?.canonical,
    "/about",
    "Canonical URL must be /about"
  );

  // 3. Page source assembly check
  const pageSource = fs.readFileSync(
    path.resolve(process.cwd(), "src/app/[locale]/about/page.tsx"),
    "utf-8"
  );

  assert.match(
    pageSource,
    /<AboutHeroSection/,
    "About page must render AboutHeroSection"
  );
  assert.match(
    pageSource,
    /<AcademicCredentialsSection/,
    "About page must render AcademicCredentialsSection"
  );
  assert.match(
    pageSource,
    /<CertificationsGallery/,
    "About page must render CertificationsGallery"
  );
  assert.match(
    pageSource,
    /<AiWorkflowSection/,
    "About page must render AiWorkflowSection"
  );
  assert.match(
    pageSource,
    /<BeyondCodeSection/,
    "About page must render BeyondCodeSection"
  );
  assert.match(
    pageSource,
    /<main[^>]*>/,
    "About page must use semantic <main> tag"
  );
});
