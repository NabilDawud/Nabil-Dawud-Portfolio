import test from "node:test";
import assert from "node:assert";
import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

test("Language Switcher Stability Regression: Toggling with pre-existing localStorage does not trigger infinite oscillation or hang", async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(25000);

    // -------------------------------------------------------------
    // Step 1: Initialize with localStorage='en' and cookie='en'
    // -------------------------------------------------------------
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      localStorage.setItem("nabildawud_portfolio_locale", "en");
    });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.reload({ waitUntil: "networkidle0" });

    const initialLang = await page.evaluate(() => document.documentElement.lang);
    const initialDir = await page.evaluate(() => document.documentElement.dir);
    assert.strictEqual(initialLang, "en", "Initial lang should be 'en'");
    assert.strictEqual(initialDir, "ltr", "Initial dir should be 'ltr'");

    // -------------------------------------------------------------
    // Step 2: Click the actual language switcher once (en -> ar)
    // -------------------------------------------------------------
    const switchedToAr = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("button")).find((b) => {
        const label = b.getAttribute("aria-label");
        return label === "عربي" || label === "English";
      });
      if (!btn) return false;
      btn.click();
      return true;
    });
    assert.strictEqual(switchedToAr, true, "Language switcher button must exist and be clicked");
    await page.waitForFunction(() => window.location.pathname.startsWith("/ar"), { timeout: 10000 });

    // -------------------------------------------------------------
    // Step 3: Observe over 1200ms to detect oscillation / flip-flop
    // -------------------------------------------------------------
    const samplesEnToAr: Array<{ t: number; lang: string; dir: string; storage: string | null }> = [];
    for (const delay of [150, 300, 500, 800, 1200]) {
      await new Promise((r) => setTimeout(r, delay === 150 ? 150 : delay - samplesEnToAr[samplesEnToAr.length - 1].t));
      const sample = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        storage: localStorage.getItem("nabildawud_portfolio_locale"),
      }));
      samplesEnToAr.push({ t: delay, ...sample });
    }

    // Verify all samples during observation period are consistently 'ar' / 'rtl'
    for (const sample of samplesEnToAr) {
      assert.strictEqual(
        sample.lang,
        "ar",
        `Oscillation detected at ${sample.t}ms: document.documentElement.lang became '${sample.lang}' instead of 'ar'`
      );
      assert.strictEqual(
        sample.dir,
        "rtl",
        `Oscillation detected at ${sample.t}ms: document.documentElement.dir became '${sample.dir}' instead of 'rtl'`
      );
      assert.strictEqual(
        sample.storage,
        "ar",
        `Oscillation detected at ${sample.t}ms: localStorage was '${sample.storage}' instead of 'ar'`
      );
    }

    // -------------------------------------------------------------
    // Step 4: Reload and verify 'ar' persists
    // -------------------------------------------------------------
    await page.reload({ waitUntil: "networkidle0" });
    const reloadedArLang = await page.evaluate(() => document.documentElement.lang);
    const reloadedArDir = await page.evaluate(() => document.documentElement.dir);
    const reloadedArStorage = await page.evaluate(() => localStorage.getItem("nabildawud_portfolio_locale"));
    assert.strictEqual(reloadedArLang, "ar", "Persisted lang after reload must be 'ar'");
    assert.strictEqual(reloadedArDir, "rtl", "Persisted dir after reload must be 'rtl'");
    assert.strictEqual(reloadedArStorage, "ar", "Persisted storage after reload must be 'ar'");

    // -------------------------------------------------------------
    // Step 5: Reverse direction — click once (ar -> en)
    // -------------------------------------------------------------
    const switchedToEn = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll("button")).find((b) => {
        const label = b.getAttribute("aria-label");
        return label === "عربي" || label === "English";
      });
      if (!btn) return false;
      btn.click();
      return true;
    });
    assert.strictEqual(switchedToEn, true, "Language switcher button must exist and be clicked for reverse switch");
    await page.waitForFunction(() => !window.location.pathname.startsWith("/ar"), { timeout: 10000 });

    // -------------------------------------------------------------
    // Step 6: Observe over 1200ms to detect reverse oscillation
    // -------------------------------------------------------------
    const samplesArToEn: Array<{ t: number; lang: string; dir: string; storage: string | null }> = [];
    for (const delay of [150, 300, 500, 800, 1200]) {
      await new Promise((r) => setTimeout(r, delay === 150 ? 150 : delay - samplesArToEn[samplesArToEn.length - 1].t));
      const sample = await page.evaluate(() => ({
        lang: document.documentElement.lang,
        dir: document.documentElement.dir,
        storage: localStorage.getItem("nabildawud_portfolio_locale"),
      }));
      samplesArToEn.push({ t: delay, ...sample });
    }

    for (const sample of samplesArToEn) {
      assert.strictEqual(
        sample.lang,
        "en",
        `Oscillation detected at ${sample.t}ms: document.documentElement.lang became '${sample.lang}' instead of 'en'`
      );
      assert.strictEqual(
        sample.dir,
        "ltr",
        `Oscillation detected at ${sample.t}ms: document.documentElement.dir became '${sample.dir}' instead of 'ltr'`
      );
      assert.strictEqual(
        sample.storage,
        "en",
        `Oscillation detected at ${sample.t}ms: localStorage was '${sample.storage}' instead of 'en'`
      );
    }

    // -------------------------------------------------------------
    // Step 7: Reload and verify 'en' persists
    // -------------------------------------------------------------
    await page.reload({ waitUntil: "networkidle0" });
    const reloadedEnLang = await page.evaluate(() => document.documentElement.lang);
    const reloadedEnDir = await page.evaluate(() => document.documentElement.dir);
    const reloadedEnStorage = await page.evaluate(() => localStorage.getItem("nabildawud_portfolio_locale"));
    assert.strictEqual(reloadedEnLang, "en", "Persisted lang after reload must be 'en'");
    assert.strictEqual(reloadedEnDir, "ltr", "Persisted dir after reload must be 'ltr'");
    assert.strictEqual(reloadedEnStorage, "en", "Persisted storage after reload must be 'en'");

    await browser.close();
  } catch (err) {
    await browser.close();
    throw err;
  }
});
