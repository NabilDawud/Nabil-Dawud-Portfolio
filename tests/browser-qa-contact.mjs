import puppeteer from "puppeteer-core";
import fs from "node:fs";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR =
  "C:\\Users\\NabilDawud\\.gemini\\antigravity-cli\\brain\\618aa22c-1e10-423b-81ed-064543920f42\\screenshots\\contact";

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
    await page.setCookie({
      name: "NEXT_LOCALE",
      value: "en",
      domain: "localhost",
    });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));

    // Verify Title & Hero
    const heroTitle = await page.$eval(
      "#contact-hero-heading",
      (el) => el.textContent.trim()
    );
    console.log(`Hero Title: "${heroTitle}"`);
    assert(
      heroTitle.includes("Build Something Resilient"),
      "Hero heading must match English copy"
    );

    // Verify Form Inputs
    assert(await page.$("#contact-name"), "Name input must exist");
    assert(await page.$("#contact-email"), "Email input must exist");
    assert(await page.$("#contact-subject"), "Subject input must exist");
    assert(await page.$("#contact-message"), "Message textarea must exist");

    // Verify Verified Profiles in Sidebar
    const githubLink = await page.$eval(
      'a[href*="github.com"]',
      (el) => el.href
    );
    assert(
      githubLink === "https://github.com/NabilDawud",
      `GitHub link must point to verified profile, got ${githubLink}`
    );

    const linkedinLink = await page.$eval(
      'a[href*="linkedin.com"]',
      (el) => el.href
    );
    assert(
      linkedinLink === "https://linkedin.com/in/nabil-dawud",
      `LinkedIn link must point to verified profile, got ${linkedinLink}`
    );

    // Privacy verification: Zero mailto links on the page
    const mailtoLinks = await page.$$('a[href^="mailto:"]');
    assert(
      mailtoLinks.length === 0,
      `Expected 0 mailto links, found ${mailtoLinks.length}`
    );

    const shot1 = `${OUTPUT_DIR}\\contact_01_en_desktop.png`;
    await page.screenshot({ path: shot1, fullPage: true });
    summary.screenshots.push(shot1);
    summary.scenariosPassed++;
    console.log("Scenario 1 passed. Screenshot saved.");

    // -------------------------------------------------------------
    // SCENARIO 2: English Mobile (390px)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 2: English Mobile (390px) ---");
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 600));

    const enOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    assert(!enOverflow, "English mobile must have zero horizontal overflow");

    const shot2 = `${OUTPUT_DIR}\\contact_02_en_mobile.png`;
    await page.screenshot({ path: shot2, fullPage: true });
    summary.screenshots.push(shot2);
    summary.scenariosPassed++;
    console.log("Scenario 2 passed. Screenshot saved.");

    // -------------------------------------------------------------
    // SCENARIO 3: Arabic Desktop (1440px RTL)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 3: Arabic Desktop (1440px RTL) ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({
      name: "NEXT_LOCALE",
      value: "ar",
      domain: "localhost",
    });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 1000));

    const arDir = await page.evaluate(() =>
      document.documentElement.getAttribute("dir")
    );
    assert(arDir === "rtl", `Expected dir="rtl", got "${arDir}"`);

    const arHeroTitle = await page.$eval(
      "#contact-hero-heading",
      (el) => el.textContent.trim()
    );
    console.log(`Arabic Hero Title: "${arHeroTitle}"`);
    assert(
      arHeroTitle.includes("فلنبنِ معاً"),
      "Arabic hero title must match dictionary"
    );

    const shot3 = `${OUTPUT_DIR}\\contact_03_ar_desktop.png`;
    await page.screenshot({ path: shot3, fullPage: true });
    summary.screenshots.push(shot3);
    summary.scenariosPassed++;
    console.log("Scenario 3 passed. Screenshot saved.");

    // -------------------------------------------------------------
    // SCENARIO 4: Arabic Mobile (390px RTL)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 4: Arabic Mobile (390px RTL) ---");
    await page.setViewport({ width: 390, height: 844 });
    await new Promise((r) => setTimeout(r, 600));

    const arOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    assert(!arOverflow, "Arabic mobile must have zero horizontal overflow");

    const shot4 = `${OUTPUT_DIR}\\contact_04_ar_mobile.png`;
    await page.screenshot({ path: shot4, fullPage: true });
    summary.screenshots.push(shot4);
    summary.scenariosPassed++;
    console.log("Scenario 4 passed. Screenshot saved.");

    // -------------------------------------------------------------
    // SCENARIO 5: Honeypot Accessibility Contract Verification
    // -------------------------------------------------------------
    console.log("\n--- Scenario 5: Honeypot Accessibility Contract ---");
    const hpDetails = await page.evaluate(() => {
      const input = document.getElementById("_hp_website");
      if (!input) return null;
      const parent = input.parentElement;
      const style = parent ? window.getComputedStyle(parent) : null;
      return {
        tabIndex: input.tabIndex,
        ariaHidden: parent ? parent.getAttribute("aria-hidden") : null,
        parentLeft: style ? style.left : null,
        parentWidth: style ? style.width : null,
        parentHeight: style ? style.height : null,
        parentOpacity: style ? style.opacity : null,
        hasSrOnly: parent ? parent.classList.contains("sr-only") : false,
        hasHidden: parent ? parent.classList.contains("hidden") : false,
      };
    });

    assert(hpDetails !== null, "Honeypot input #_hp_website must exist in DOM");
    assert(
      hpDetails.tabIndex === -1,
      `Honeypot tabIndex must be -1, got ${hpDetails.tabIndex}`
    );
    assert(
      hpDetails.ariaHidden === "true",
      `Honeypot container must have aria-hidden="true", got ${hpDetails.ariaHidden}`
    );
    assert(
      hpDetails.parentLeft === "-9999px",
      `Honeypot must be positioned off-screen (-9999px), got ${hpDetails.parentLeft}`
    );
    assert(
      !hpDetails.hasSrOnly && !hpDetails.hasHidden,
      "Honeypot must not use contradictory sr-only or hidden classes"
    );
    summary.scenariosPassed++;
    console.log("Scenario 5 passed. Honeypot accessibility contract verified.");

    // -------------------------------------------------------------
    // SCENARIO 6: Interactive Mock Submission (Success Flow)
    // -------------------------------------------------------------
    console.log("\n--- Scenario 6: Mock Submission Success Flow ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({
      name: "NEXT_LOCALE",
      value: "en",
      domain: "localhost",
    });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 800));

    // Enable request interception to mock API response (ZERO real emails)
    await page.setRequestInterception(true);
    let mockMode = "success";

    page.on("request", (interceptedReq) => {
      if (
        interceptedReq.url().includes("/api/contact") &&
        interceptedReq.method() === "POST"
      ) {
        if (mockMode === "success") {
          interceptedReq.respond({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ success: true }),
          });
        } else {
          interceptedReq.respond({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({
              error: "Failed to send message. Please try again later.",
            }),
          });
        }
      } else {
        interceptedReq.continue();
      }
    });

    // Fill out form
    await page.type("#contact-name", "Jane Engineer");
    await page.type("#contact-email", "jane@example.com");
    await page.type("#contact-subject", "Backend Engineering Collaboration");
    await page.type(
      "#contact-message",
      "Hello Nabil, we are very impressed with your distributed systems work."
    );

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for success alert to appear
    await page.waitForSelector('div[role="alert"]', { timeout: 4000 });
    const alertText = await page.$eval(
      'div[role="alert"]',
      (el) => el.textContent
    );
    console.log(`Success alert text: "${alertText.trim()}"`);
    assert(
      alertText.includes("Inquiry Delivered Successfully") ||
        alertText.includes("routed to Nabil's private inbox"),
      "Success alert must confirm delivery"
    );

    // Verify form fields were reset
    const resetName = await page.$eval("#contact-name", (el) => el.value);
    const resetEmail = await page.$eval("#contact-email", (el) => el.value);
    assert(
      resetName === "" && resetEmail === "",
      "Form fields must be reset upon successful submission"
    );

    const shot5 = `${OUTPUT_DIR}\\contact_05_submission_success.png`;
    await page.screenshot({ path: shot5, fullPage: true });
    summary.screenshots.push(shot5);
    summary.scenariosPassed++;
    console.log("Scenario 6 passed. Screenshot saved.");

    // -------------------------------------------------------------
    // SCENARIO 7: Error Recovery & Draft Preservation Flow
    // -------------------------------------------------------------
    console.log("\n--- Scenario 7: Error Recovery & Draft Preservation ---");
    mockMode = "error";

    // Fill form with draft content
    await page.type("#contact-name", "Important Draft Client");
    await page.type("#contact-email", "client@important-project.org");
    await page.type("#contact-subject", "Mission Critical Infrastructure");
    await page.type(
      "#contact-message",
      "This is a critical architectural proposal that must NOT be erased if network errors occur."
    );

    // Submit form
    await page.click('button[type="submit"]');

    // Wait for error alert to appear
    await page.waitForSelector('div[role="alert"]', { timeout: 4000 });
    const errorAlertText = await page.$eval(
      'div[role="alert"]',
      (el) => el.textContent
    );
    console.log(`Error alert text: "${errorAlertText.trim()}"`);
    assert(
      errorAlertText.includes("Failed") ||
        errorAlertText.includes("unable to deliver"),
      "Error banner must appear on failure"
    );

    // Verify draft was preserved
    const preservedName = await page.$eval("#contact-name", (el) => el.value);
    const preservedEmail = await page.$eval("#contact-email", (el) => el.value);
    const preservedSubject = await page.$eval(
      "#contact-subject",
      (el) => el.value
    );
    const preservedMessage = await page.$eval(
      "#contact-message",
      (el) => el.value
    );

    assert(
      preservedName === "Important Draft Client",
      "Draft name must be preserved"
    );
    assert(
      preservedEmail === "client@important-project.org",
      "Draft email must be preserved"
    );
    assert(
      preservedSubject === "Mission Critical Infrastructure",
      "Draft subject must be preserved"
    );
    assert(
      preservedMessage.includes("critical architectural proposal"),
      "Draft message must be preserved"
    );

    const shot6 = `${OUTPUT_DIR}\\contact_06_error_draft_preserved.png`;
    await page.screenshot({ path: shot6, fullPage: true });
    summary.screenshots.push(shot6);
    summary.scenariosPassed++;
    console.log(
      "Scenario 7 passed. Draft preserved on failure. Screenshot saved."
    );
  } catch (err) {
    summary.scenariosFailed++;
    summary.failures.push(err.message);
    console.error("Browser QA Error:", err);
  } finally {
    await browser.close();
  }

  console.log("\n==========================================");
  console.log(
    `BROWSER QA SUMMARY: ${summary.scenariosPassed} passed, ${summary.scenariosFailed} failed`
  );
  console.log("==========================================");

  if (summary.scenariosFailed > 0) {
    process.exit(1);
  }
}

runBrowserQA();
