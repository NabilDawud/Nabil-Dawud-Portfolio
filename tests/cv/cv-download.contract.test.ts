import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { cvConfig } from "@/data/personal";
import { enDictionary } from "@/i18n/dictionaries/en";
import { arDictionary } from "@/i18n/dictionaries/ar";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

test("CV Download Contract: Availability and Asset Integrity", () => {
  // 1. Availability flag
  assert.strictEqual(
    cvConfig.isAvailable,
    true,
    "cvConfig.isAvailable must be true when CV download is enabled"
  );

  // 2. Exact filename and public path
  assert.strictEqual(
    cvConfig.fileName,
    "Nabil-Dawud-CV.pdf",
    "cvConfig.fileName must be 'Nabil-Dawud-CV.pdf'"
  );
  assert.strictEqual(
    cvConfig.filePath,
    "/assets/cv/nabil-dawud-cv.pdf",
    "cvConfig.filePath must be '/assets/cv/nabil-dawud-cv.pdf'"
  );

  // 3. Status messages defined
  assert.ok(cvConfig.statusMessage.en.length > 0, "statusMessage.en must be non-empty");
  assert.ok(cvConfig.statusMessage.ar.length > 0, "statusMessage.ar must be non-empty");

  // 4. Physical PDF file existence and integrity
  const absolutePdfPath = path.join(process.cwd(), "public", "assets", "cv", "nabil-dawud-cv.pdf");
  assert.strictEqual(
    fs.existsSync(absolutePdfPath),
    true,
    `Production CV PDF must physically exist at '${absolutePdfPath}'`
  );

  const stats = fs.statSync(absolutePdfPath);
  assert.ok(stats.size > 100_000, `PDF size must be substantial (>100KB), got ${stats.size} bytes`);

  // Verify valid PDF magic header bytes %PDF-
  const fd = fs.openSync(absolutePdfPath, "r");
  const buffer = Buffer.alloc(5);
  fs.readSync(fd, buffer, 0, 5, 0);
  fs.closeSync(fd);
  assert.strictEqual(buffer.toString("utf-8"), "%PDF-", "File must have valid %PDF- magic bytes");
});

test("CV Download Contract: Bilingual Dictionary Parity", () => {
  assert.strictEqual(enDictionary.nav.downloadCv, "Download CV");
  assert.strictEqual(enDictionary.hero.downloadCv, "Download CV");
  assert.strictEqual(arDictionary.nav.downloadCv, "تحميل السيرة الذاتية");
  assert.strictEqual(arDictionary.hero.downloadCv, "تحميل السيرة الذاتية");
});

test("CV Download Contract: UI Component Code Wiring", () => {
  // Read components directly to ensure they bind cvConfig correctly
  const heroCode = fs.readFileSync(path.join(process.cwd(), "src/components/home/HeroSection.tsx"), "utf-8");
  assert.ok(heroCode.includes("cvConfig.isAvailable"), "HeroSection must check cvConfig.isAvailable");
  assert.ok(heroCode.includes("download={cvConfig.fileName}"), "HeroSection must pass download={cvConfig.fileName}");
  assert.ok(heroCode.includes("href={cvConfig.filePath}"), "HeroSection must pass href={cvConfig.filePath}");

  const navbarCode = fs.readFileSync(path.join(process.cwd(), "src/components/layout/Navbar.tsx"), "utf-8");
  assert.ok(navbarCode.includes("cvConfig.isAvailable"), "Navbar must check cvConfig.isAvailable");
  assert.ok(navbarCode.includes("download={cvConfig.fileName}"), "Navbar must pass download={cvConfig.fileName}");
  assert.ok(navbarCode.includes("href={cvConfig.filePath}"), "Navbar must pass href={cvConfig.filePath}");

  const mobileNavCode = fs.readFileSync(path.join(process.cwd(), "src/components/layout/MobileNav.tsx"), "utf-8");
  assert.ok(mobileNavCode.includes("cvConfig.isAvailable"), "MobileNav must check cvConfig.isAvailable");
  assert.ok(mobileNavCode.includes("download={cvConfig.fileName}"), "MobileNav must pass download={cvConfig.fileName}");
  assert.ok(mobileNavCode.includes("href={cvConfig.filePath}"), "MobileNav must pass href={cvConfig.filePath}");
});

test("CV Download Contract: In-Browser Verification across Hero, Navbar, MobileNav (EN & AR)", async () => {
  // 1. HTTP Asset verification
  const response = await fetch(`${BASE_URL}${cvConfig.filePath}`);
  assert.strictEqual(response.status, 200, "PDF endpoint must respond with 200 OK");
  assert.strictEqual(
    response.headers.get("content-type"),
    "application/pdf",
    "Content-Type must be application/pdf"
  );
  const pdfBytes = await response.arrayBuffer();
  assert.ok(pdfBytes.byteLength > 100_000, "Downloaded PDF must be non-empty");

  // 2. In-browser UI verification
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(10000);

    // Desktop English
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      localStorage.setItem("nabildawud_portfolio_locale", "en");
    });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.reload({ waitUntil: "networkidle0" });

    const heroEn = await page.evaluate(() => {
      const el = document.querySelector('section a[download="Nabil-Dawud-CV.pdf"]');
      return el ? { href: el.getAttribute("href"), text: el.textContent?.trim() } : null;
    });
    assert.ok(heroEn, "Hero download link must exist in EN");
    assert.strictEqual(heroEn.href, cvConfig.filePath);
    assert.strictEqual(heroEn.text, enDictionary.hero.downloadCv);

    const navEn = await page.evaluate(() => {
      const el = document.querySelector('header a[download="Nabil-Dawud-CV.pdf"]');
      return el ? { href: el.getAttribute("href"), text: el.textContent?.trim() } : null;
    });
    assert.ok(navEn, "Navbar download link must exist in EN");
    assert.strictEqual(navEn.href, cvConfig.filePath);
    assert.strictEqual(navEn.text, enDictionary.nav.downloadCv);

    // Desktop Arabic
    await page.evaluate(() => {
      localStorage.setItem("nabildawud_portfolio_locale", "ar");
    });
    await page.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page.reload({ waitUntil: "networkidle0" });

    const heroAr = await page.evaluate(() => {
      const el = document.querySelector('section a[download="Nabil-Dawud-CV.pdf"]');
      return el ? { href: el.getAttribute("href"), text: el.textContent?.trim() } : null;
    });
    assert.ok(heroAr, "Hero download link must exist in AR");
    assert.strictEqual(heroAr.href, cvConfig.filePath);
    assert.strictEqual(heroAr.text, arDictionary.hero.downloadCv);

    const navAr = await page.evaluate(() => {
      const el = document.querySelector('header a[download="Nabil-Dawud-CV.pdf"]');
      return el ? { href: el.getAttribute("href"), text: el.textContent?.trim() } : null;
    });
    assert.ok(navAr, "Navbar download link must exist in AR");
    assert.strictEqual(navAr.href, cvConfig.filePath);
    assert.strictEqual(navAr.text, arDictionary.nav.downloadCv);

    // Mobile English
    await page.setViewport({ width: 375, height: 812 });
    await page.evaluate(() => {
      localStorage.setItem("nabildawud_portfolio_locale", "en");
    });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.reload({ waitUntil: "networkidle0" });

    // Click mobile menu hamburger (has aria-expanded)
    await page.click('header button[aria-expanded]');
    await new Promise((r) => setTimeout(r, 600));

    const mobileEn = await page.evaluate(() => {
      const el = document.querySelector('div[role="dialog"] a[download="Nabil-Dawud-CV.pdf"]');
      return el ? { href: el.getAttribute("href"), text: el.textContent?.trim() } : null;
    });
    assert.ok(mobileEn, "MobileNav download link must exist in EN");
    assert.strictEqual(mobileEn.href, cvConfig.filePath);
    assert.strictEqual(mobileEn.text, enDictionary.nav.downloadCv);

    // Mobile Arabic
    await page.evaluate(() => {
      localStorage.setItem("nabildawud_portfolio_locale", "ar");
    });
    await page.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page.reload({ waitUntil: "networkidle0" });

    await page.click('header button[aria-expanded]');
    await new Promise((r) => setTimeout(r, 600));

    const mobileAr = await page.evaluate(() => {
      const el = document.querySelector('div[role="dialog"] a[download="Nabil-Dawud-CV.pdf"]');
      return el ? { href: el.getAttribute("href"), text: el.textContent?.trim() } : null;
    });
    assert.ok(mobileAr, "MobileNav download link must exist in AR");
    assert.strictEqual(mobileAr.href, cvConfig.filePath);
    assert.strictEqual(mobileAr.text, arDictionary.nav.downloadCv);
  } finally {
    await browser.close();
  }
});
