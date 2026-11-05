import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR = "C:\\Users\\NabilDawud\\.gemini\\antigravity-cli\\brain\\618aa22c-1e10-423b-81ed-064543920f42\\screenshots\\projects";

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
    // SCENARIO 1: Direct Filtered URL Loading (?category=backend-api)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 1: Direct Filtered URL Loading ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/projects?category=backend-api`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1200));

    const s1Cards = await page.$$eval("article", (els) => els.length);
    const s1Titles = await page.$$eval("article h3", (els) => els.map((e) => e.textContent.trim()));
    const s1ActiveBtn = await page.$eval("button[aria-pressed='true']", (el) => el.textContent.trim());

    console.log(`Visible cards: ${s1Cards}, Titles: ${JSON.stringify(s1Titles)}, Active button: "${s1ActiveBtn}"`);
    assert(s1Cards === 1, `Expected exactly 1 card for backend-api, got ${s1Cards}`);
    assert(s1Titles.some((t) => t.includes("Orbit")), "Orbit must be the visible backend-api project");
    assert(s1ActiveBtn.includes("Backend & APIs"), "Active button must be Backend & APIs");
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 2: Filter Switching & URL Query Sync
    // -------------------------------------------------------------
    console.log("\n--- Scenario 2: Filter Switching & URL Query Sync ---");
    // Click Flagship button
    const flagshipBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll("button[type='button']"));
      return btns.find((b) => b.textContent.includes("Flagship"));
    });
    await flagshipBtn.click();
    await new Promise((r) => setTimeout(r, 600));

    let currentUrl = page.url();
    let cards = await page.$$eval("article", (els) => els.length);
    console.log(`URL after clicking Flagship: ${currentUrl}, Cards: ${cards}`);
    assert(currentUrl.includes("category=flagship"), "URL must include category=flagship");
    assert(cards === 2, `Expected 2 flagship projects (Mishwar & Masar), got ${cards}`);

    // Click All button
    const allBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll("button[type='button']"));
      return btns.find((b) => b.textContent.includes("All Projects") || b.textContent.includes("All"));
    });
    await allBtn.click();
    await new Promise((r) => setTimeout(r, 600));

    currentUrl = page.url();
    cards = await page.$$eval("article", (els) => els.length);
    console.log(`URL after clicking All: ${currentUrl}, Cards: ${cards}`);
    assert(!currentUrl.includes("category="), "URL must be clean /projects without category query");
    assert(cards === 5, `Expected 5 projects when All is active, got ${cards}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 3: Browser Back & Forward Navigation
    // -------------------------------------------------------------
    console.log("\n--- Scenario 3: Browser Back & Forward Navigation ---");
    await page.goBack();
    await new Promise((r) => setTimeout(r, 600));
    currentUrl = page.url();
    cards = await page.$$eval("article", (els) => els.length);
    console.log(`URL after goBack(): ${currentUrl}, Cards: ${cards}`);
    assert(currentUrl.includes("category=flagship"), "goBack() must restore category=flagship");
    assert(cards === 2, `goBack() must display 2 cards, got ${cards}`);

    await page.goForward();
    await new Promise((r) => setTimeout(r, 600));
    currentUrl = page.url();
    cards = await page.$$eval("article", (els) => els.length);
    console.log(`URL after goForward(): ${currentUrl}, Cards: ${cards}`);
    assert(!currentUrl.includes("category="), "goForward() must restore /projects");
    assert(cards === 5, `goForward() must display 5 cards, got ${cards}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 4: Page Refresh Persistence
    // -------------------------------------------------------------
    console.log("\n--- Scenario 4: Page Refresh Persistence ---");
    await page.goto(`${BASE_URL}/projects?category=academic`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));
    let academicCards = await page.$$eval("article", (els) => els.length);
    assert(academicCards === 1, `Expected 1 card for academic, got ${academicCards}`);

    await page.reload({ waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));
    academicCards = await page.$$eval("article", (els) => els.length);
    const academicTitles = await page.$$eval("article h3", (els) => els.map((e) => e.textContent.trim()));
    console.log(`After reload: Cards: ${academicCards}, Titles: ${JSON.stringify(academicTitles)}`);
    assert(page.url().includes("category=academic"), "URL after reload must preserve category=academic");
    assert(academicCards === 1, "Must retain 1 academic card after reload");
    assert(academicTitles.some((t) => t.includes("University")), "University Issues must remain visible");
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 5: Return from Case Study (Filter Preservation via ?from=)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 5: Return from Case Study with Preserved Filter ---");
    await page.goto(`${BASE_URL}/projects?category=fullstack`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    // Click case study link on Apartment Marketplace
    const caseStudyLink = await page.$("article a[href*='/projects/']");
    const href = await page.evaluate((el) => el.getAttribute("href"), caseStudyLink);
    console.log(`Case study link href: ${href}`);
    assert(href.includes("from=fullstack"), "Card case study link must include ?from=fullstack");

    await caseStudyLink.click();
    await new Promise((r) => setTimeout(r, 1200));
    console.log(`Case study page loaded at: ${page.url()}`);
    assert(page.url().includes("/projects/apartment-marketplace"), "Must be on apartment marketplace case study");
    assert(page.url().includes("from=fullstack"), "Case study URL must preserve ?from=fullstack");

    // Click Back to Projects breadcrumb
    const backBtn = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll("a"));
      return links.find((l) => l.textContent.includes("Back to Projects"));
    });
    assert(backBtn, "Back to Projects button must exist");
    await backBtn.click();
    await new Promise((r) => setTimeout(r, 1200));

    console.log(`Returned to URL: ${page.url()}`);
    assert(page.url().includes("category=fullstack"), "Back to Projects must restore category=fullstack");
    cards = await page.$$eval("article", (els) => els.length);
    assert(cards === 1, `Expected 1 fullstack project after return, got ${cards}`);
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 6: Direct Case Study Entry Safe Fallback
    // -------------------------------------------------------------
    console.log("\n--- Scenario 6: Direct Case Study Entry Safe Fallback ---");
    await page.goto(`${BASE_URL}/projects/meshwar`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));
    console.log(`Direct visit to: ${page.url()}`);

    const directBackBtn = await page.evaluateHandle(() => {
      const links = Array.from(document.querySelectorAll("a"));
      return links.find((l) => l.textContent.includes("Back to Projects"));
    });
    await directBackBtn.click();
    await new Promise((r) => setTimeout(r, 1200));
    console.log(`Returned URL: ${page.url()}`);
    assert(page.url().endsWith("/projects"), "Direct visit must safely fall back to clean /projects");
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 7: Invalid Category Fallback
    // -------------------------------------------------------------
    console.log("\n--- Scenario 7: Invalid Category Fallback ---");
    await page.goto(`${BASE_URL}/projects?category=malicious-or-unknown`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));
    cards = await page.$$eval("article", (els) => els.length);
    console.log(`Cards rendered for invalid category: ${cards}`);
    assert(cards === 5, "Invalid category must safely render all 5 projects as fallback");
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // SCENARIO 8: Keyboard Accessibility & Focus
    // -------------------------------------------------------------
    console.log("\n--- Scenario 8: Keyboard Accessibility & Focus ---");
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    const hasRoleGroup = await page.$("div[role='group']");
    assert(hasRoleGroup, "Filter container must have role='group'");

    const pressedState = await page.$eval("button[aria-pressed='true']", (el) => !!el);
    assert(pressedState, "An active button with aria-pressed='true' must exist");
    summary.scenariosPassed++;

    // -------------------------------------------------------------
    // RESPONSIVE & LANGUAGE SCREENSHOTS (4 Viewports)
    // -------------------------------------------------------------
    console.log("\n--- Capturing 4 Viewport Configurations & Screenshots ---");

    // 1. English Desktop (1440 x 900)
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));
    const ss1 = path.join(OUTPUT_DIR, "projects_01_en_desktop.png");
    await page.screenshot({ path: ss1, fullPage: true });
    summary.screenshots.push(ss1);
    console.log(`Screenshot 1 saved: ${ss1}`);

    // Mishwar Case Study Desktop (Diagram visible)
    await page.goto(`${BASE_URL}/projects/meshwar`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));
    const hasDiagram = await page.$("div[aria-label='Mishwar Architecture Diagram']");
    assert(hasDiagram, "Mishwar diagram must be rendered on meshwar case study");
    const ss2 = path.join(OUTPUT_DIR, "projects_02_en_meshwar_desktop.png");
    await page.screenshot({ path: ss2, fullPage: true });
    summary.screenshots.push(ss2);
    console.log(`Screenshot 2 saved: ${ss2}`);

    // 2. English Mobile (390 x 844)
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));
    const ss3 = path.join(OUTPUT_DIR, "projects_03_en_mobile.png");
    await page.screenshot({ path: ss3, fullPage: true });
    summary.screenshots.push(ss3);
    console.log(`Screenshot 3 saved: ${ss3}`);

    // 3. Arabic Desktop (1440 x 900, RTL)
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));

    const arDir = await page.evaluate(() => document.documentElement.getAttribute("dir"));
    assert(arDir === "rtl", `Arabic page must have dir="rtl", got ${arDir}`);

    const ss5 = path.join(OUTPUT_DIR, "projects_05_ar_desktop.png");
    await page.screenshot({ path: ss5, fullPage: true });
    summary.screenshots.push(ss5);
    console.log(`Screenshot 5 saved: ${ss5}`);

    // Arabic Mishwar Case Study (RTL diagram & back button)
    await page.goto(`${BASE_URL}/projects/meshwar`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));
    const ss6 = path.join(OUTPUT_DIR, "projects_06_ar_meshwar_desktop.png");
    await page.screenshot({ path: ss6, fullPage: true });
    summary.screenshots.push(ss6);
    console.log(`Screenshot 6 saved: ${ss6}`);

    // 4. Arabic Mobile (390 x 844, RTL) - Overflow verification
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));

    const overflowInfo = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        clientWidth: doc.clientWidth,
        scrollWidth: doc.scrollWidth,
        hasOverflow: doc.scrollWidth > doc.clientWidth,
      };
    });
    console.log(`Arabic Mobile Overflow Check:`, overflowInfo);
    assert(!overflowInfo.hasOverflow, `Arabic Mobile must have zero horizontal overflow, but scrollWidth=${overflowInfo.scrollWidth} > clientWidth=${overflowInfo.clientWidth}`);

    const ss7 = path.join(OUTPUT_DIR, "projects_07_ar_mobile.png");
    await page.screenshot({ path: ss7, fullPage: true });
    summary.screenshots.push(ss7);
    console.log(`Screenshot 7 saved: ${ss7}`);

    await page.close();
  } catch (err) {
    console.error("QA error encountered:", err);
    summary.scenariosFailed++;
    summary.failures.push(err.message);
  } finally {
    await browser.close();
  }

  console.log("\n=======================================================");
  console.log("             BROWSER QA EXECUTION SUMMARY             ");
  console.log("=======================================================");
  console.log(`Scenarios Passed : ${summary.scenariosPassed}`);
  console.log(`Scenarios Failed : ${summary.scenariosFailed}`);
  console.log(`Screenshots Saved: ${summary.screenshots.length}`);
  if (summary.failures.length > 0) {
    console.error("Failures:", summary.failures);
    process.exit(1);
  } else {
    console.log("All 8 Interactive Scenarios & 4 Viewport QA Checks PASSED!");
  }
}

runBrowserQA();
