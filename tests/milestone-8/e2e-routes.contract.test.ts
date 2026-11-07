import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { projects } from "@/data/projects";
import { cvConfig, personalBrand } from "@/data/personal";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { journeyEntries } from "@/data/journey";
import { skillGroups, aiWorkflowTools } from "@/data/skills";
import { enDictionary, arDictionary } from "@/i18n";
import {
  generateStaticParams,
  generateMetadata as generateCaseStudyMetadata,
} from "@/app/projects/[slug]/page";

test("Task 1.1: Static parameter resolution and case-study route parity", async () => {
  const staticParams = await generateStaticParams();
  assert.strictEqual(Array.isArray(staticParams), true);
  assert.strictEqual(staticParams.length, 5, "Must generate exactly 5 static project routes");

  const resolvedSlugs = staticParams.map((p) => p.slug).sort();
  const expectedSlugs = [
    "apartment-marketplace",
    "masar",
    "meshwar",
    "orbit",
    "university-issues",
  ];
  assert.deepStrictEqual(
    resolvedSlugs,
    expectedSlugs,
    "Static slugs must match the 5 canonical projects"
  );

  for (const slug of expectedSlugs) {
    const project = projects.find((p) => p.slug === slug);
    assert.ok(project, `Project with slug '${slug}' must exist in projects data`);

    const meta = await generateCaseStudyMetadata({
      params: Promise.resolve({ slug }),
    });

    assert.ok(meta, `Metadata for '${slug}' must be generated`);
    assert.ok(meta.title, `Metadata title for '${slug}' must exist`);
    assert.ok(meta.description, `Metadata description for '${slug}' must exist`);
    assert.strictEqual(
      meta.alternates?.canonical,
      `/projects/${slug}`,
      `Canonical URL for '${slug}' must be /projects/${slug}`
    );
  }
});

test("Task 1.2: Bilingual dictionary parity across all namespaces", () => {
  const namespaces = [
    "nav",
    "hero",
    "focus",
    "projects",
    "journey",
    "about",
    "contact",
    "footer",
    "common",
  ] as const;

  function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
    let keys: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        Object.keys(value).length > 0
      ) {
        keys = keys.concat(getAllKeys(value as Record<string, unknown>, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys.sort();
  }

  for (const ns of namespaces) {
    assert.ok((enDictionary as Record<string, unknown>)[ns], `English dictionary must contain namespace '${ns}'`);
    assert.ok((arDictionary as Record<string, unknown>)[ns], `Arabic dictionary must contain namespace '${ns}'`);

    const enKeys = getAllKeys((enDictionary as Record<string, unknown>)[ns] as Record<string, unknown>);
    const arKeys = getAllKeys((arDictionary as Record<string, unknown>)[ns] as Record<string, unknown>);

    assert.deepStrictEqual(
      arKeys,
      enKeys,
      `Dictionary namespace '${ns}' must have identical keys between EN and AR`
    );
  }
});

test("Task 1.3: Data model privacy — zero plaintext emails or mailto links in data", () => {
  const dataPayloads = [
    { name: "personalBrand", data: personalBrand },
    { name: "projects", data: projects },
    { name: "education", data: education },
    { name: "certifications", data: certifications },
    { name: "journeyEntries", data: journeyEntries },
    { name: "skillGroups", data: skillGroups },
    { name: "aiWorkflowTools", data: aiWorkflowTools },
  ];

  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const mailtoRegex = /mailto:/i;

  for (const item of dataPayloads) {
    const serialized = JSON.stringify(item.data);
    assert.strictEqual(
      mailtoRegex.test(serialized),
      false,
      `Data payload '${item.name}' must NOT contain any 'mailto:' links`
    );
    assert.strictEqual(
      emailRegex.test(serialized),
      false,
      `Data payload '${item.name}' must NOT contain any plaintext email addresses`
    );
  }

  // Also verify source data files directly on disk
  const dataDir = path.resolve(process.cwd(), "src/data");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".ts"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(dataDir, file), "utf-8");
    assert.strictEqual(
      mailtoRegex.test(content),
      false,
      `File 'src/data/${file}' must NOT contain any 'mailto:' links`
    );
    assert.strictEqual(
      emailRegex.test(content),
      false,
      `File 'src/data/${file}' must NOT contain any plaintext email addresses`
    );
  }
});

test("Task 1.4: CV download gate and availability contract", () => {
  assert.strictEqual(
    cvConfig.isAvailable,
    true,
    "cvConfig.isAvailable must be true when production PDF is verified and placed"
  );
  assert.ok(cvConfig.statusMessage.en, "cvConfig statusMessage.en must be defined");
  assert.ok(cvConfig.statusMessage.ar, "cvConfig statusMessage.ar must be defined");
  assert.strictEqual(typeof cvConfig.fileName, "string");
  assert.strictEqual(cvConfig.fileName, "Nabil-Dawud-CV.pdf");
  assert.strictEqual(typeof cvConfig.filePath, "string");
  assert.strictEqual(cvConfig.filePath, "/assets/cv/nabil-dawud-cv.pdf");

  // Verify the PDF asset exists on disk at the public path
  const expectedPdfPath = path.join(process.cwd(), "public", cvConfig.filePath);
  assert.strictEqual(
    fs.existsSync(expectedPdfPath),
    true,
    `Production CV PDF must exist at '${expectedPdfPath}'`
  );
});
