import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = "C:\\Users\\NabilDawud\\.gemini\\antigravity-cli\\brain\\618aa22c-1e10-423b-81ed-064543920f42\\screenshots\\about";

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

  const summary = {
    scenariosPassed: 0,
    scenariosFailed: 0,
    failures: [],
    screenshots: [],
  };

  function assert(condition, message) {
    if (!condition) {
      throw new Error(`Assertion failed: ${message}`);
    }
  }

  try {
    const page = await browser.newPage();

    // -------------------------------------------------------------
    // SCENARIO 1: English Desktop (1440px)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 1: English Desktop (1440px) ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));

    // Verify degree card
    const enDegree = await page.$eval("h3", (el) => el.textContent.trim());
    console.log(`First h3 text: "${enDegree}"`);

    const pageText = await page.evaluate(() => document.body.innerText);
    assert(pageText.includes("Computer Systems Engineering"), "Must contain degree 'Computer Systems Engineering'");
    assert(pageText.includes("Al-Azhar University"), "Must contain 'Al-Azhar University'");
    assert(pageText.includes("91.44% — Excellent"), "Must contain '91.44% — Excellent'");
    assert(pageText.includes("99.1%"), "Must contain Tawjihi score 99.1%");
    assert(!pageText.includes("Bachelor of Science"), "Must NOT include unverified 'Bachelor of Science'");
    assert(!pageText.includes("Graduated with Distinction"), "Must NOT include unverified 'Graduated with Distinction'");

    // Verify 2 certifications exist
    const certButtons = await page.$$("button[id^='btn-cert-']");
    assert(certButtons.length === 2, `Expected 2 certificate buttons, got ${certButtons.length}`);

    const shot1 = `${OUTPUT_DIR}\\about_01_en_desktop.png`;
    await page.screenshot({ path: shot1, fullPage: true });
    summary.screenshots.push(shot1);
    console.log(`Saved screenshot: ${shot1}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 2: English Mobile (390px)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 2: English Mobile (390px) ---");
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    const enOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`English Mobile overflow detected: ${enOverflow}`);
    assert(!enOverflow, "English Mobile must have zero horizontal overflow");

    const shot2 = `${OUTPUT_DIR}\\about_02_en_mobile.png`;
    await page.screenshot({ path: shot2, fullPage: true });
    summary.screenshots.push(shot2);
    console.log(`Saved screenshot: ${shot2}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 3: Arabic Desktop (1440px RTL)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 3: Arabic Desktop (1440px RTL) ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));

    const htmlDir = await page.$eval("html", (el) => el.getAttribute("dir"));
    console.log(`HTML dir attribute: "${htmlDir}"`);
    assert(htmlDir === "rtl", "Arabic locale must set dir='rtl'");

    const arPageText = await page.evaluate(() => document.body.innerText);
    assert(arPageText.includes("هندسة أنظمة الحاسوب"), "Must contain Arabic degree title");
    assert(arPageText.includes("جامعة الأزهر"), "Must contain Arabic university name");
    assert(arPageText.includes("91.44% — ممتاز"), "Must contain Arabic grade '91.44% — ممتاز'");
    assert(arPageText.includes("99.1%"), "Must contain Arabic Tawjihi score 99.1%");

    const shot3 = `${OUTPUT_DIR}\\about_03_ar_desktop.png`;
    await page.screenshot({ path: shot3, fullPage: true });
    summary.screenshots.push(shot3);
    console.log(`Saved screenshot: ${shot3}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 4: Arabic Mobile (390px RTL) Zero Overflow
    // -------------------------------------------------------------
    console.log("\n--- Scenario 4: Arabic Mobile (390px RTL) Zero Overflow ---");
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    const arOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`Arabic Mobile overflow detected: ${arOverflow}`);
    assert(!arOverflow, "Arabic Mobile must have zero horizontal overflow");

    const shot4 = `${OUTPUT_DIR}\\about_04_ar_mobile.png`;
    await page.screenshot({ path: shot4, fullPage: true });
    summary.screenshots.push(shot4);
    console.log(`Saved screenshot: ${shot4}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 5: Lightbox Open, Body Scroll Lock, Illustrative Fallback & Escape Dismiss
    // -------------------------------------------------------------
    console.log("\n--- Scenario 5: Lightbox Open, Scroll Lock, Fallback & Escape ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    // Focus and click the Web Development Diploma button
    await page.focus("#btn-cert-web-dev-diploma");
    await page.click("#btn-cert-web-dev-diploma");
    await new Promise((r) => setTimeout(r, 500));

    // Check dialog exists
    const dialog = await page.$("div[role='dialog'][aria-modal='true']");
    assert(dialog !== null, "Dialog with role='dialog' and aria-modal='true' must be rendered");

    // Check body scroll lock
    const bodyOverflowLocked = await page.evaluate(() => document.body.style.overflow);
    console.log(`Body overflow when modal is open: "${bodyOverflowLocked}"`);
    assert(bodyOverflowLocked === "hidden", "body.style.overflow must be 'hidden'");

    // Check honest illustrative fallback notice
    const modalText = await page.$eval("div[role='dialog']", (el) => el.innerText);
    assert(
      modalText.includes("Illustrative UI Preview") || modalText.includes("pendingScanNotice") || modalText.includes("Official physical certificate scan"),
      "Must show honest illustrative preview disclaimer"
    );
    assert(modalText.includes("230"), "Must show verified 230 hours");
    assert(modalText.includes("Palestinian Ministry of Education"), "Must show verified issuer");

    const shot5 = `${OUTPUT_DIR}\\about_05_lightbox_open.png`;
    await page.screenshot({ path: shot5 });
    summary.screenshots.push(shot5);
    console.log(`Saved screenshot: ${shot5}`);

    // Press Escape to dismiss
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 400));

    const dialogAfterEscape = await page.$("div[role='dialog']");
    assert(dialogAfterEscape === null, "Dialog must be unmounted/closed after Escape");

    const bodyOverflowRestored = await page.evaluate(() => document.body.style.overflow);
    console.log(`Body overflow after closing modal: "${bodyOverflowRestored}"`);
    assert(bodyOverflowRestored === "", "body.style.overflow must be restored to empty string");

    // Check focus restoration
    const activeId = await page.evaluate(() => document.activeElement?.id);
    console.log(`Active element ID after closing: "${activeId}"`);
    assert(
      activeId === "btn-cert-web-dev-diploma",
      `Focus must be restored to '#btn-cert-web-dev-diploma', got '${activeId}'`
    );
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 6: Focus Trap (Tab and Shift+Tab cycling)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 6: Focus Trap (Tab and Shift+Tab) ---");
    // Open modal again
    await page.click("#btn-cert-web-dev-diploma");
    await new Promise((r) => setTimeout(r, 400));

    // Gather focusable elements in dialog
    const focusableCount = await page.evaluate(() => {
      const dialog = document.querySelector("div[role='dialog']");
      if (!dialog) return 0;
      const elements = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      return elements.length;
    });
    console.log(`Focusable elements inside dialog: ${focusableCount}`);
    assert(focusableCount >= 3, "Dialog must have at least 3 focusable elements (close, prev, next)");

    // Press Tab multiple times and ensure active element remains inside dialog
    for (let i = 0; i < focusableCount + 2; i++) {
      await page.keyboard.press("Tab");
      await new Promise((r) => setTimeout(r, 100));
      const isInside = await page.evaluate(() => {
        const dialog = document.querySelector("div[role='dialog']");
        return dialog?.contains(document.activeElement) ?? false;
      });
      assert(isInside, `Focus escaped dialog on Tab step ${i}`);
    }
    console.log("Tab forward cycling trapped successfully.");

    // Press Shift+Tab and ensure it also remains trapped
    for (let i = 0; i < 3; i++) {
      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await new Promise((r) => setTimeout(r, 100));
      const isInside = await page.evaluate(() => {
        const dialog = document.querySelector("div[role='dialog']");
        return dialog?.contains(document.activeElement) ?? false;
      });
      assert(isInside, `Focus escaped dialog on Shift+Tab step ${i}`);
    }
    console.log("Shift+Tab reverse cycling trapped successfully.");
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 7: Keyboard Arrow Navigation (Circular Cycling)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 7: Keyboard Arrow Navigation ---");
    // Currently on web-dev-diploma
    let currentTitle = await page.$eval("#lightbox-title", (el) => el.textContent.trim());
    console.log(`Current modal title before arrow: "${currentTitle}"`);
    assert(currentTitle.includes("Web Development"), "Initial certificate must be Web Development");

    // Press ArrowRight to navigate to next
    await page.keyboard.press("ArrowRight");
    await new Promise((r) => setTimeout(r, 300));
    currentTitle = await page.$eval("#lightbox-title", (el) => el.textContent.trim());
    console.log(`Title after ArrowRight: "${currentTitle}"`);
    assert(currentTitle.includes("Back-End"), "ArrowRight must cycle to Back-End Development training");

    // Verify modal lifecycle was not interrupted during slide navigation:
    // 1. Body overflow must remain "hidden" (not reset to "")
    const overflowDuringNav = await page.evaluate(() => document.body.style.overflow);
    assert(overflowDuringNav === "hidden", `Body overflow must remain hidden during slide navigation, got '${overflowDuringNav}'`);
    // 2. Active element must remain inside dialog
    const focusInsideDialog = await page.evaluate(() => {
      const dialog = document.querySelector("div[role='dialog']");
      return dialog?.contains(document.activeElement) ?? false;
    });
    assert(focusInsideDialog, "Focus must remain inside dialog during slide navigation");

    // Press ArrowRight again to verify circular cycling
    await page.keyboard.press("ArrowRight");
    await new Promise((r) => setTimeout(r, 300));
    currentTitle = await page.$eval("#lightbox-title", (el) => el.textContent.trim());
    console.log(`Title after circular ArrowRight: "${currentTitle}"`);
    assert(currentTitle.includes("Web Development"), "ArrowRight must cycle back to Web Development training");

    // Press ArrowLeft to cycle backward
    await page.keyboard.press("ArrowLeft");
    await new Promise((r) => setTimeout(r, 300));
    currentTitle = await page.$eval("#lightbox-title", (el) => el.textContent.trim());
    console.log(`Title after ArrowLeft: "${currentTitle}"`);
    assert(currentTitle.includes("Back-End"), "ArrowLeft must cycle to Back-End Development training");

    // Close modal via close button
    const closeBtn = await page.$("button[data-autofocus='true']");
    await closeBtn.click();
    await new Promise((r) => setTimeout(r, 400));

    const finalModalCheck = await page.$("div[role='dialog']");
    assert(finalModalCheck === null, "Dialog must be closed after clicking close button");
    summary.scenariosPassed++;

    console.log("\n=======================================================");
    console.log("ALL 7 BROWSER QA SCENARIOS PASSED WITH FULL INTEGRITY!");
    console.log(`Scenarios Passed: ${summary.scenariosPassed} / 7`);
    console.log(`Screenshots Captured: ${summary.screenshots.length}`);
    console.log("=======================================================\n");

    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Browser QA Scenario Failed:", err);
    await browser.close();
    process.exit(1);
  }
}

runBrowserQA();
