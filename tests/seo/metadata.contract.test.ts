import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { generateMetadata as generateHomeMetadata } from "@/app/[locale]/page";
import { generateMetadata as generateAboutMetadata } from "@/app/[locale]/about/page";
import { generateMetadata as generateProjectsMetadata } from "@/app/[locale]/projects/page";
import { generateMetadata as generateContactMetadata } from "@/app/[locale]/contact/page";
import { generateMetadata as generateCaseStudyMetadata } from "@/app/[locale]/projects/[slug]/page";
import { proxy } from "@/proxy";
import { NextRequest } from "next/server";
import sharp from "sharp";

test("SEO Contract Gate 1 & 2: Self-referencing canonicals across English and Arabic", async () => {
  const routes = [
    { name: "Home", fn: generateHomeMetadata, enCanonical: "/", arCanonical: "/ar" },
    { name: "About", fn: generateAboutMetadata, enCanonical: "/about", arCanonical: "/ar/about" },
    { name: "Projects", fn: generateProjectsMetadata, enCanonical: "/projects", arCanonical: "/ar/projects" },
    { name: "Contact", fn: generateContactMetadata, enCanonical: "/contact", arCanonical: "/ar/contact" },
  ];

  for (const route of routes) {
    const enMeta = await route.fn({ params: Promise.resolve({ locale: "en" }) });
    const arMeta = await route.fn({ params: Promise.resolve({ locale: "ar" }) });

    assert.strictEqual(
      enMeta.alternates?.canonical,
      route.enCanonical,
      `${route.name} English canonical must be self-referencing (${route.enCanonical})`
    );
    assert.strictEqual(
      arMeta.alternates?.canonical,
      route.arCanonical,
      `${route.name} Arabic canonical must be self-referencing (${route.arCanonical})`
    );
  }

  // Case study
  const enCaseMeta = await generateCaseStudyMetadata({
    params: Promise.resolve({ slug: "meshwar", locale: "en" }),
  });
  const arCaseMeta = await generateCaseStudyMetadata({
    params: Promise.resolve({ slug: "meshwar", locale: "ar" }),
  });

  assert.strictEqual(enCaseMeta.alternates?.canonical, "/projects/meshwar");
  assert.strictEqual(arCaseMeta.alternates?.canonical, "/ar/projects/meshwar");
});

test("SEO Contract Gate 3: Reciprocal hreflang references on every localized page", async () => {
  const meta = await generateAboutMetadata({ params: Promise.resolve({ locale: "en" }) });
  const arMeta = await generateAboutMetadata({ params: Promise.resolve({ locale: "ar" }) });

  const enLangs = meta.alternates?.languages as Record<string, string>;
  const arLangs = arMeta.alternates?.languages as Record<string, string>;

  assert.ok(enLangs && arLangs, "Both English and Arabic metadata must export alternates.languages");
  assert.strictEqual(enLangs.en, "/about");
  assert.strictEqual(enLangs.ar, "/ar/about");
  assert.strictEqual(enLangs["x-default"], "/about");

  assert.strictEqual(arLangs.en, "/about");
  assert.strictEqual(arLangs.ar, "/ar/about");
  assert.strictEqual(arLangs["x-default"], "/about");
});

test("SEO Contract Gate 5: Inner page titles do not duplicate brand template", async () => {
  const aboutMeta = await generateAboutMetadata({ params: Promise.resolve({ locale: "en" }) });
  const projectsMeta = await generateProjectsMetadata({ params: Promise.resolve({ locale: "en" }) });
  const contactMeta = await generateContactMetadata({ params: Promise.resolve({ locale: "en" }) });

  // Title strings should not end with "| Nabil Dawud" because layout template already appends it
  assert.strictEqual(String(aboutMeta.title).includes("| Nabil Dawud"), false);
  assert.strictEqual(String(projectsMeta.title).includes("| Nabil Dawud"), false);
  assert.strictEqual(String(contactMeta.title).includes("| Nabil Dawud"), false);
});

test("SEO Contract Gate 6: Valid, indexable sitemap with 9 routes and localized alternates", () => {
  const entries = sitemap();
  assert.strictEqual(entries.length, 9, "Sitemap must contain exactly 9 verified public routes");

  const expectedPaths = [
    "https://nabil-dawud.vercel.app",
    "https://nabil-dawud.vercel.app/about",
    "https://nabil-dawud.vercel.app/projects",
    "https://nabil-dawud.vercel.app/contact",
    "https://nabil-dawud.vercel.app/projects/meshwar",
    "https://nabil-dawud.vercel.app/projects/masar",
    "https://nabil-dawud.vercel.app/projects/apartment-marketplace",
    "https://nabil-dawud.vercel.app/projects/orbit",
    "https://nabil-dawud.vercel.app/projects/university-issues",
  ];

  for (const expectedUrl of expectedPaths) {
    const entry = entries.find((e) => e.url === expectedUrl);
    assert.ok(entry, `Sitemap must contain entry for ${expectedUrl}`);
    assert.ok(entry.lastModified instanceof Date, "lastModified must be a valid Date object");
    assert.ok(
      (entry.alternates?.languages as Record<string, string>)?.ar,
      `Sitemap entry for ${expectedUrl} must contain Arabic alternate`
    );
  }
});

test("SEO Contract Gate 7: Robots exclusion standard and crawl directives", () => {
  const robotsData = robots();
  assert.ok(robotsData, "Robots handler must return valid configuration");
  assert.strictEqual(robotsData.sitemap, "https://nabil-dawud.vercel.app/sitemap.xml");

  const rules = Array.isArray(robotsData.rules) ? robotsData.rules[0] : robotsData.rules;
  assert.ok(rules);
  assert.strictEqual(rules.userAgent, "*");
  assert.strictEqual(rules.allow, "/");

  const disallows = Array.isArray(rules.disallow) ? rules.disallow : [rules.disallow];
  assert.ok(disallows.includes("/api/"), "Robots must disallow /api/");
});

test("SEO Contract Gate 8 & 9: Social sharing image dimensions, format, and size", async () => {
  const ogPath = path.resolve(process.cwd(), "public/assets/images/og-image.png");
  assert.strictEqual(fs.existsSync(ogPath), true, "og-image.png must exist in public/assets/images/");

  const stats = fs.statSync(ogPath);
  assert.ok(stats.size > 10000, "OG image must not be empty");
  assert.ok(stats.size < 250000, `OG image size (${stats.size} bytes) should be under 250 KB target`);

  const metadata = await sharp(ogPath).metadata();
  assert.strictEqual(metadata.format, "png", "OG image must be PNG format");
  assert.strictEqual(metadata.width, 1200, "OG image width must be exactly 1200 px");
  assert.strictEqual(metadata.height, 630, "OG image height must be exactly 630 px");
});

test("SEO Contract Gate 10: Next.js 16 proxy rewrite, redirect, and header sanitization", () => {
  // 1. Root / rewrites to /en
  const rootReq = new NextRequest("https://nabil-dawud.vercel.app/");
  const rootRes = proxy(rootReq);
  assert.strictEqual(rootRes?.headers.get("x-middleware-rewrite"), "https://nabil-dawud.vercel.app/en");

  // 2. /about rewrites to /en/about
  const aboutReq = new NextRequest("https://nabil-dawud.vercel.app/about");
  const aboutRes = proxy(aboutReq);
  assert.strictEqual(aboutRes?.headers.get("x-middleware-rewrite"), "https://nabil-dawud.vercel.app/en/about");

  // 3. Explicit /en redirects 308 to /
  const enReq = new NextRequest("https://nabil-dawud.vercel.app/en");
  const enRes = proxy(enReq);
  assert.strictEqual(enRes?.status, 308);
  assert.strictEqual(enRes?.headers.get("location"), "https://nabil-dawud.vercel.app/");

  // 4. /ar allows pass-through with x-locale=ar
  const arReq = new NextRequest("https://nabil-dawud.vercel.app/ar/about");
  const arRes = proxy(arReq);
  assert.strictEqual(arRes?.headers.get("x-middleware-rewrite"), null, "Arabic requests should not rewrite internally");

  // 5. Clean URL with NEXT_LOCALE=ar cookie still rewrites to English (English default enforced)
  const cookieReq = new NextRequest("https://nabil-dawud.vercel.app/", {
    headers: { cookie: "NEXT_LOCALE=ar" },
  });
  const cookieRes = proxy(cookieReq);
  assert.strictEqual(
    cookieRes?.headers.get("x-middleware-rewrite"),
    "https://nabil-dawud.vercel.app/en",
    "Clean root / must rewrite to /en regardless of NEXT_LOCALE cookie"
  );
});
