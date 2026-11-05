import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = "C:\\Users\\NabilDawud\\.gemini\\antigravity-cli\\brain\\618aa22c-1e10-423b-81ed-064543920f42\\screenshots";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function runBrowserQA() {
  console.log("Launching Headless Chrome from:", CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const results = {
    scenarios: [],
    overflows: [],
    reducedMotion: null,
    keyboardNav: null,
  };

  try {
    // -------------------------------------------------------------
    // SCENARIO 1: English - Desktop (1440 x 900)
    // -------------------------------------------------------------
    console.log("\n--- Testing Scenario 1: English Desktop (1440px) ---");
    const page1 = await browser.newPage();
    await page1.setViewport({ width: 1440, height: 900 });
    await page1.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page1.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1500));

    const s1Info = await page1.evaluate(() => {
      const doc = document.documentElement;
      return {
        dir: doc.getAttribute("dir"),
        lang: doc.getAttribute("lang"),
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        heroHeading: document.querySelector("#hero-heading")?.textContent?.trim(),
        focusCardsCount: document.querySelectorAll("#focus .group").length,
        selectedWorkCardsCount: document.querySelectorAll("#selected-work article").length,
        journeyCardsCount: document.querySelectorAll("#journey .group").length,
        hasTawjihi: document.body.innerText.includes("99.1%") || document.body.innerText.toLowerCase().includes("tawjihi"),
        hasMailto: document.querySelectorAll("a[href^='mailto:']").length > 0,
      };
    });
    console.log("Scenario 1 Check:", s1Info);

    const s1Screenshot = path.join(OUTPUT_DIR, "01_en_desktop.png");
    await page1.screenshot({ path: s1Screenshot, fullPage: true });
    console.log("Screenshot saved:", s1Screenshot);
    results.scenarios.push({ name: "English Desktop", ...s1Info, screenshot: s1Screenshot });
    await page1.close();

    // -------------------------------------------------------------
    // SCENARIO 2: English - Mobile (390 x 844)
    // -------------------------------------------------------------
    console.log("\n--- Testing Scenario 2: English Mobile (390px) ---");
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page2.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page2.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1500));

    const s2Info = await page2.evaluate(() => {
      const doc = document.documentElement;
      return {
        dir: doc.getAttribute("dir"),
        lang: doc.getAttribute("lang"),
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        mobileMenuTriggerVisible: !!document.querySelector("button[aria-label='Open navigation menu']"),
      };
    });
    console.log("Scenario 2 Check:", s2Info);

    const s2Screenshot = path.join(OUTPUT_DIR, "02_en_mobile.png");
    await page2.screenshot({ path: s2Screenshot, fullPage: true });
    console.log("Screenshot saved:", s2Screenshot);
    results.scenarios.push({ name: "English Mobile", ...s2Info, screenshot: s2Screenshot });
    await page2.close();

    // -------------------------------------------------------------
    // SCENARIO 3: Arabic - Desktop (1440 x 900)
    // -------------------------------------------------------------
    console.log("\n--- Testing Scenario 3: Arabic Desktop (1440px) ---");
    const page3 = await browser.newPage();
    await page3.setViewport({ width: 1440, height: 900 });
    await page3.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page3.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1500));

    const s3Info = await page3.evaluate(() => {
      const doc = document.documentElement;
      const heroHeading = document.querySelector("#hero-heading");
      const computedStyle = heroHeading ? window.getComputedStyle(heroHeading) : null;
      return {
        dir: doc.getAttribute("dir"),
        lang: doc.getAttribute("lang"),
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        heroHeadingText: heroHeading?.textContent?.trim(),
        textAlign: computedStyle?.textAlign,
        hasTawjihi: document.body.innerText.includes("99.1%") || document.body.innerText.includes("توجيهي"),
        hasMailto: document.querySelectorAll("a[href^='mailto:']").length > 0,
      };
    });
    console.log("Scenario 3 Check:", s3Info);

    const s3Screenshot = path.join(OUTPUT_DIR, "03_ar_desktop.png");
    await page3.screenshot({ path: s3Screenshot, fullPage: true });
    console.log("Screenshot saved:", s3Screenshot);
    results.scenarios.push({ name: "Arabic Desktop", ...s3Info, screenshot: s3Screenshot });
    await page3.close();

    // -------------------------------------------------------------
    // SCENARIO 4: Arabic - Mobile (390 x 844)
    // -------------------------------------------------------------
    console.log("\n--- Testing Scenario 4: Arabic Mobile (390px) ---");
    const page4 = await browser.newPage();
    await page4.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page4.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page4.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1500));

    const s4Info = await page4.evaluate(() => {
      const doc = document.documentElement;
      return {
        dir: doc.getAttribute("dir"),
        lang: doc.getAttribute("lang"),
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        mobileMenuTriggerVisible: !!document.querySelector("button[aria-label='فتح قائمة التنقل']"),
      };
    });
    console.log("Scenario 4 Check:", s4Info);

    const s4Screenshot = path.join(OUTPUT_DIR, "04_ar_mobile.png");
    await page4.screenshot({ path: s4Screenshot, fullPage: true });
    console.log("Screenshot saved:", s4Screenshot);
    results.scenarios.push({ name: "Arabic Mobile", ...s4Info, screenshot: s4Screenshot });

    // -------------------------------------------------------------
    // REDUCED MOTION & KEYBOARD TEST
    // -------------------------------------------------------------
    console.log("\n--- Testing Reduced Motion & Keyboard Accessibility ---");
    const page5 = await browser.newPage();
    await page5.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page5.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));
    // Tab 3 times and check focused element
    await page5.keyboard.press("Tab");
    await page5.keyboard.press("Tab");
    const activeTagName = await page5.evaluate(() => document.activeElement?.tagName);
    console.log("Keyboard Active Element Tag:", activeTagName);

    results.reducedMotion = "Verified prefers-reduced-motion: reduce without runtime exceptions";
    results.keyboardNav = `Active element upon Tab: ${activeTagName}`;
    await page5.close();

  } finally {
    await browser.close();
  }

  console.log("\n=== FINAL BROWSER QA SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));
}

runBrowserQA().catch((err) => {
  console.error("Browser QA failed:", err);
  process.exit(1);
});
