import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

test("Task 1 (Reduced Motion Contract): globals.css respects prefers-reduced-motion: reduce", () => {
  const cssPath = path.resolve(process.cwd(), "src/app/globals.css");
  const cssContent = fs.readFileSync(cssPath, "utf-8");

  // 1. Must include prefers-reduced-motion media query
  const hasReducedMotionMedia = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(cssContent);
  assert.strictEqual(
    hasReducedMotionMedia,
    true,
    "globals.css must contain a '@media (prefers-reduced-motion: reduce)' block"
  );

  // 2. Must override smooth scroll with scroll-behavior: auto
  const hasScrollBehaviorAuto = /scroll-behavior\s*:\s*auto/.test(cssContent);
  assert.strictEqual(
    hasScrollBehaviorAuto,
    true,
    "globals.css must set 'scroll-behavior: auto' under prefers-reduced-motion: reduce"
  );

  // 3. Must minimize or eliminate non-essential animations and transitions
  const hasReducedDurations =
    /animation-duration\s*:\s*0\.01ms/.test(cssContent) ||
    /transition-duration\s*:\s*0\.01ms/.test(cssContent) ||
    /transition\s*:\s*none/.test(cssContent);
  assert.strictEqual(
    hasReducedDurations,
    true,
    "globals.css must minimize animation and transition durations under prefers-reduced-motion: reduce"
  );
});

test("Task 2 (Reduced Motion Browser QA): In-browser verification across EN/LTR and AR/RTL", async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();

    // 1. NORMAL MOTION PREFERENCES (prefers-reduced-motion: no-preference)
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

    const normalScrollBehavior = await page.evaluate(() => {
      return window.getComputedStyle(document.documentElement).scrollBehavior;
    });
    assert.strictEqual(
      normalScrollBehavior,
      "smooth",
      "Normal motion preference must preserve smooth scrolling"
    );

    // 2. REDUCED MOTION PREFERENCES (English LTR)
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

    const enReducedMetrics = await page.evaluate(() => {
      const htmlStyle = window.getComputedStyle(document.documentElement);
      const bodyStyle = window.getComputedStyle(document.body);
      return {
        scrollBehavior: htmlStyle.scrollBehavior,
        transitionDuration: bodyStyle.transitionDuration,
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
      };
    });

    assert.strictEqual(
      enReducedMetrics.scrollBehavior,
      "auto",
      "EN Reduced motion must set scrollBehavior to 'auto'"
    );
    assert.strictEqual(enReducedMetrics.lang, "en");
    assert.strictEqual(enReducedMetrics.dir, "ltr");

    // 3. REDUCED MOTION PREFERENCES (Arabic RTL)
    await page.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      try { localStorage.setItem("nabildawud_portfolio_locale", "ar"); } catch {}
    });
    await page.reload({ waitUntil: "domcontentloaded" });

    const arReducedMetrics = await page.evaluate(() => {
      const htmlStyle = window.getComputedStyle(document.documentElement);
      return {
        scrollBehavior: htmlStyle.scrollBehavior,
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
      };
    });

    assert.strictEqual(
      arReducedMetrics.scrollBehavior,
      "auto",
      "AR Reduced motion must set scrollBehavior to 'auto'"
    );
    assert.strictEqual(arReducedMetrics.lang, "ar");
    assert.strictEqual(arReducedMetrics.dir, "rtl");

    await browser.close();
  } catch (err) {
    await browser.close();
    throw err;
  }
});
