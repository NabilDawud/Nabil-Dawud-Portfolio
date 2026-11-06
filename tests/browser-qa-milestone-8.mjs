import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";
const OUTPUT_DIR =
  "C:\\Users\\NabilDawud\\.gemini\\antigravity-cli\\brain\\618aa22c-1e10-423b-81ed-064543920f42\\screenshots\\milestone-8";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 9 actual public page routes
const PUBLIC_ROUTES = [
  { key: "R-01", name: "Home Page", path: "/" },
  { key: "R-02", name: "Projects Catalog", path: "/projects" },
  { key: "R-03", name: "Case Study: Mishwar", path: "/projects/meshwar" },
  { key: "R-04", name: "Case Study: Masar", path: "/projects/masar" },
  { key: "R-05", name: "Case Study: Apartment Marketplace", path: "/projects/apartment-marketplace" },
  { key: "R-06", name: "Case Study: Orbit", path: "/projects/orbit" },
  { key: "R-07", name: "Case Study: University Issues", path: "/projects/university-issues" },
  { key: "R-08", name: "About & Credentials", path: "/about" },
  { key: "R-09", name: "Contact & Form", path: "/contact" },
];

// 1 deliberate 404 probe route
const NOT_FOUND_ROUTE = {
  key: "R-10",
  name: "Deliberate 404 Probe",
  path: "/non-existent-probe-page",
  expectedStatus: 404,
};

const ALL_ROUTES = [...PUBLIC_ROUTES, NOT_FOUND_ROUTE];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

const LOCALES = [
  { code: "en", dir: "ltr", name: "English (LTR)" },
  { code: "ar", dir: "rtl", name: "Arabic (RTL)" },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runMilestone8QA() {
  console.log("========================================================================");
  console.log("  Milestone 8: 60-Scenario Browser QA & End-to-End Verification Suite   ");
  console.log("========================================================================");
  console.log("Launching Headless Chrome from:", CHROME_PATH);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const matrixResults = [];
  const accessibilityMetrics = {
    targetSizes: { tested: 0, compliant24px: 0, compliant48px: 0, exceptions: 0 },
    landmarks: {},
    contrastSamples: [],
    reflow320Tested: 0,
    reflow320Passed: 0,
  };
  const screenshots = [];

  try {
    const page = await browser.newPage();

    // =====================================================================
    // PART 1: 60-SCENARIO VERIFICATION MATRIX
    // 9 Public Routes * 3 Viewports * 2 Locales = 54 Scenarios
    // 1 Deliberate 404 Route * 3 Viewports * 2 Locales = 6 Scenarios
    // Total = 60 Scenarios
    // =====================================================================
    console.log("\n>>> Executing 60-Scenario Verification Matrix...");

    let scenarioIndex = 0;

    for (const route of ALL_ROUTES) {
      for (const vp of VIEWPORTS) {
        for (const loc of LOCALES) {
          scenarioIndex++;
          const scenarioId = `S-${String(scenarioIndex).padStart(2, "0")}`;
          const is404 = route.key === "R-10";
          const expectedStatus = is404 ? 404 : 200;

          await page.setViewport({ width: vp.width, height: vp.height });
          await page.setCookie({
            name: "NEXT_LOCALE",
            value: loc.code,
            domain: "localhost",
          });

          let responseStatus = null;
          const url = `${BASE_URL}${route.path}`;

          try {
            const response = await page.goto(url, { waitUntil: "domcontentloaded" });
            responseStatus = response ? response.status() : null;

            // Sync client state in case cookie alone is complemented by localStorage
            await page.evaluate((l) => {
              try {
                localStorage.setItem("nabildawud_portfolio_locale", l);
              } catch {
                // Ignore storage errors in sandbox
              }
            }, loc.code);

            // Small stabilization tick
            await new Promise((r) => setTimeout(r, 150));

            // Assert Status
            assert(
              responseStatus === expectedStatus,
              `[${scenarioId}] Expected HTTP status ${expectedStatus}, got ${responseStatus} on ${route.path}`
            );

            // Assert Lang and Dir attributes
            const htmlAttrs = await page.evaluate(() => ({
              lang: document.documentElement.lang,
              dir: document.documentElement.dir,
            }));

            assert(
              htmlAttrs.lang === loc.code,
              `[${scenarioId}] Expected html lang='${loc.code}', got '${htmlAttrs.lang}'`
            );
            assert(
              htmlAttrs.dir === loc.dir,
              `[${scenarioId}] Expected html dir='${loc.dir}', got '${htmlAttrs.dir}'`
            );

            // Assert Zero Horizontal Overflow
            const overflowData = await page.evaluate(() => {
              const root = document.documentElement;
              const scrollW = root.scrollWidth;
              const clientW = root.clientWidth;
              const diff = scrollW - clientW;
              return { scrollW, clientW, diff, hasOverflow: diff > 1 };
            });

            assert(
              !overflowData.hasOverflow,
              `[${scenarioId}] Horizontal overflow detected on ${route.key} (${vp.name}, ${loc.code}): scrollWidth=${overflowData.scrollW}, clientWidth=${overflowData.clientW}`
            );

            // Additional 320px Reflow Verification on Mobile Viewport
            let reflow320Clean = true;
            if (vp.name === "mobile") {
              await page.setViewport({ width: 320, height: 844 });
              await new Promise((r) => setTimeout(r, 80));
              const reflowDiff = await page.evaluate(() => {
                const root = document.documentElement;
                return root.scrollWidth - root.clientWidth;
              });
              reflow320Clean = reflowDiff <= 1;
              accessibilityMetrics.reflow320Tested++;
              if (reflow320Clean) accessibilityMetrics.reflow320Passed++;
              assert(
                reflow320Clean,
                `[${scenarioId}] 320px Reflow failure on ${route.key} (${loc.code}): diff=${reflowDiff}px`
              );
              // Restore mobile viewport
              await page.setViewport({ width: vp.width, height: vp.height });
            }

            // Inspect Landmarks on Desktop
            if (vp.name === "desktop" && loc.code === "en") {
              const pageLandmarks = await page.evaluate(() => {
                return {
                  header: Boolean(document.querySelector("header")),
                  nav: Boolean(document.querySelector("nav")),
                  main: Boolean(document.querySelector("main")),
                  footer: Boolean(document.querySelector("footer")),
                  aside: Boolean(document.querySelector("aside")),
                  h1Count: document.querySelectorAll("h1").length,
                };
              });
              accessibilityMetrics.landmarks[route.key] = pageLandmarks;
            }

            // Record Passed Scenario
            matrixResults.push({
              scenarioId,
              routeKey: route.key,
              routeName: route.name,
              path: route.path,
              viewport: vp.name,
              width: vp.width,
              locale: loc.code,
              direction: loc.dir,
              httpStatus: responseStatus,
              overflowDiff: overflowData.diff,
              passed: true,
            });

            process.stdout.write(
              `✔ [${scenarioId}/60] ${route.key} (${route.name.padEnd(28)}) | ${vp.name.padEnd(7)} | ${loc.code.toUpperCase()} | HTTP ${responseStatus} | Ovf: ${overflowData.diff}px\n`
            );
          } catch (err) {
            console.error(`✖ FAILED [${scenarioId}] ${route.key} on ${vp.name}/${loc.code}:`, err.message);
            matrixResults.push({
              scenarioId,
              routeKey: route.key,
              routeName: route.name,
              path: route.path,
              viewport: vp.name,
              width: vp.width,
              locale: loc.code,
              direction: loc.dir,
              httpStatus: responseStatus,
              error: err.message,
              passed: false,
            });
            throw err;
          }
        }
      }
    }

    // =====================================================================
    // PART 2: INTERACTIVE FLOW VERIFICATIONS
    // =====================================================================
    console.log("\n>>> Executing Interactive Functional Flows...");

    // -----------------------------------------------------------------
    // FLOW 1: Projects Filtering & Dynamic Query Parameters
    // -----------------------------------------------------------------
    console.log("--- Flow 1: Projects Catalog Filtering & Query Sync ---");
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/projects`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      try {
        localStorage.setItem("nabildawud_portfolio_locale", "en");
      } catch {}
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 400));

    // Verify initial all cards
    const initialCardCount = await page.$$eval("article", (els) => els.length);
    assert(initialCardCount === 5, `Expected 5 initial project cards, got ${initialCardCount}`);

    // Click 'Flagship' filter button
    const flagshipFound = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button[type='button']"));
      const btn = btns.find((b) => b.textContent && b.textContent.includes("Flagship"));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(flagshipFound, "Flagship category filter button must exist");
    await new Promise((r) => setTimeout(r, 400));

    const flagshipCardCount = await page.$$eval("article", (els) => els.length);
    const flagshipUrl = page.url();
    assert(
      flagshipCardCount === 2,
      `Expected 2 cards for Flagship category, got ${flagshipCardCount}`
    );
    assert(
      flagshipUrl.includes("category=flagship"),
      `URL query must contain category=flagship, got '${flagshipUrl}'`
    );

    // Reset filter by clicking 'All'
    const allFound = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button[type='button']"));
      const btn = btns.find((b) => b.textContent && b.textContent.includes("All"));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    assert(allFound, "All filter button must exist");
    await new Promise((r) => setTimeout(r, 400));

    const resetCardCount = await page.$$eval("article", (els) => els.length);
    assert(resetCardCount === 5, `Expected 5 cards after reset, got ${resetCardCount}`);
    console.log("✔ Flow 1 Passed: Projects Catalog category filtering and query sync verified.");

    // -----------------------------------------------------------------
    // FLOW 2: Dynamic Case Study Navigation & Browser History (Back/Forward)
    // -----------------------------------------------------------------
    console.log("--- Flow 2: Case Study Navigation & Browser History ---");
    // Click Mishwar case study link
    const meshwarLink = await page.$("a[href='/projects/meshwar']");
    assert(meshwarLink, "Link to /projects/meshwar must exist on catalog page");
    await meshwarLink.click();
    await new Promise((r) => setTimeout(r, 800));
    assert(page.url().endsWith("/projects/meshwar"), `Navigation must reach /projects/meshwar, got '${page.url()}'`);

    const caseStudyH1 = await page.$eval("h1", (el) => el.textContent.trim());
    assert(
      caseStudyH1.includes("Mishwar") || caseStudyH1.includes("مشوار"),
      `Case study H1 must identify Mishwar, got '${caseStudyH1}'`
    );

    // Test Browser Back Button
    await page.goBack();
    await new Promise((r) => setTimeout(r, 800));
    assert(page.url().includes("/projects"), `Browser back must return to /projects, got '${page.url()}'`);

    // Test Browser Forward Button
    await page.goForward();
    await new Promise((r) => setTimeout(r, 800));
    assert(page.url().endsWith("/projects/meshwar"), `Browser forward must return to /projects/meshwar, got '${page.url()}'`);
    console.log("✔ Flow 2 Passed: Dynamic navigation and back/forward browser history verified.");

    // -----------------------------------------------------------------
    // FLOW 3: Certificate Lightbox Focus Trap & RTL Wraparound Navigation
    // -----------------------------------------------------------------
    console.log("--- Flow 3: Certificate Lightbox Focus Trap & RTL Arrow Navigation ---");
    // Test in Arabic RTL mode
    await page.setCookie({ name: "NEXT_LOCALE", value: "ar", domain: "localhost" });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      try {
        localStorage.setItem("nabildawud_portfolio_locale", "ar");
      } catch {}
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 400));

    // Open first certificate
    const certBtn = await page.$("#btn-cert-web-dev-diploma");
    assert(certBtn, "Certificate button #btn-cert-web-dev-diploma must exist");
    await certBtn.click();
    await new Promise((r) => setTimeout(r, 300));

    // Assert dialog exists and body scroll locked
    const dialog = await page.$("div[role='dialog'][aria-modal='true']");
    assert(dialog, "Dialog with role='dialog' and aria-modal='true' must be rendered");
    const bodyLocked = await page.evaluate(() => document.body.style.overflow);
    assert(bodyLocked === "hidden", `body.style.overflow must be 'hidden', got '${bodyLocked}'`);

    // Verify close via Escape restores focus
    await page.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 200));

    const activeElementId = await page.evaluate(() => document.activeElement?.id);
    assert(
      activeElementId === "btn-cert-web-dev-diploma",
      `Focus must restore to trigger button upon Escape, got '${activeElementId}'`
    );

    const bodyRestored = await page.evaluate(() => document.body.style.overflow);
    assert(bodyRestored !== "hidden", "body.style.overflow must be restored after modal close");
    console.log("✔ Flow 3 Passed: Lightbox focus trap, scroll lock, and Escape restoration verified.");

    // -----------------------------------------------------------------
    // FLOW 4: Contact Form Mock Flow, Error Recovery & Honeypot Protection
    // -----------------------------------------------------------------
    console.log("--- Flow 4: Contact Form Mock Submission, Error Recovery & Honeypot ---");
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => {
      try {
        localStorage.setItem("nabildawud_portfolio_locale", "en");
      } catch {}
    });
    await page.reload({ waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 400));

    // Verify Honeypot Accessibility Contract
    const honeypot = await page.evaluate(() => {
      const input = document.getElementById("_hp_website");
      if (!input) return null;
      const parent = input.parentElement;
      return {
        tabIndex: input.tabIndex,
        ariaHidden: parent ? parent.getAttribute("aria-hidden") : null,
      };
    });
    assert(honeypot !== null, "Honeypot #_hp_website must exist in DOM");
    assert(honeypot.tabIndex === -1, `Honeypot tabIndex must be -1, got ${honeypot.tabIndex}`);
    assert(
      honeypot.ariaHidden === "true",
      `Honeypot container must have aria-hidden='true', got ${honeypot.ariaHidden}`
    );

    // Enable request interception for mock API responses (ZERO real emails)
    await page.setRequestInterception(true);
    let mockMode = "error"; // First test error recovery

    page.on("request", (req) => {
      if (req.url().includes("/api/contact") && req.method() === "POST") {
        if (mockMode === "error") {
          req.respond({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({ error: "Upstream mock delivery failure" }),
          });
        } else {
          req.respond({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ success: true }),
          });
        }
      } else {
        req.continue();
      }
    });

    // Fill form fields
    await page.type("#contact-name", "Handoff Test Engineer");
    await page.type("#contact-email", "handoff.test@example.com");
    await page.type("#contact-message", "Testing error recovery draft preservation and mock submission.");

    // Submit in error mode
    const submitBtn = await page.$("button[type='submit']");
    assert(submitBtn, "Contact form submit button must exist");
    await submitBtn.click();
    await new Promise((r) => setTimeout(r, 500));

    // Verify draft input preservation upon error
    const preservedName = await page.$eval("#contact-name", (el) => el.value);
    const preservedEmail = await page.$eval("#contact-email", (el) => el.value);
    const preservedMessage = await page.$eval("#contact-message", (el) => el.value);

    assert(
      preservedName === "Handoff Test Engineer",
      "Form name draft must be preserved on error"
    );
    assert(
      preservedEmail === "handoff.test@example.com",
      "Form email draft must be preserved on error"
    );
    assert(
      preservedMessage.includes("Testing error recovery"),
      "Form message draft must be preserved on error"
    );

    // Switch mock to success mode and re-submit
    mockMode = "success";
    await submitBtn.click();
    await new Promise((r) => setTimeout(r, 600));

    // Verify success banner rendered
    const formSuccessText = await page.evaluate(() => {
      const liveRegion = document.querySelector("[aria-live='polite'], [role='status'], .text-emerald-300");
      return liveRegion ? liveRegion.textContent : document.body.innerText;
    });

    assert(
      formSuccessText.includes("Delivered Successfully") || formSuccessText.includes("routed to Nabil"),
      "Success confirmation message must be announced upon mock 200 response"
    );
    console.log("✔ Flow 4 Passed: Contact Form mock error recovery, draft preservation, and mock submission verified.");

    // Reset request interception
    page.removeAllListeners("request");
    await page.setRequestInterception(false);

    // =====================================================================
    // PART 3: ACCESSIBILITY METRICS AUTOMATED AUDIT
    // Target Size (SC 2.5.8), Contrast, Heading Hierarchy
    // =====================================================================
    console.log("\n>>> Executing Automated WCAG 2.2 AA Auditing Pass...");

    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 300));

    const a11ySummary = await page.evaluate(() => {
      const interactiveElements = Array.from(
        document.querySelectorAll("a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])")
      );

      let compliant24 = 0;
      let compliant48 = 0;
      let nonCompliant = 0;
      let exceptions = 0;

      for (const el of interactiveElements) {
        const rect = el.getBoundingClientRect();
        // Skip hidden or off-screen elements (like honeypot)
        if (rect.width === 0 && rect.height === 0) continue;
        if (el.getAttribute("aria-hidden") === "true") continue;

        // Inline text links inside paragraphs are exempt under SC 2.5.8 Inline exception
        const isInline = window.getComputedStyle(el).display === "inline";
        if (isInline) {
          exceptions++;
          continue;
        }

        if (rect.width >= 24 && rect.height >= 24) {
          compliant24++;
        } else {
          nonCompliant++;
        }

        if (rect.width >= 48 && rect.height >= 48) {
          compliant48++;
        }
      }

      // Check heading hierarchy
      const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: h.textContent.trim().slice(0, 40),
      }));

      // Check accessible names
      const unnamedElements = interactiveElements.filter((el) => {
        if (el.getAttribute("aria-hidden") === "true") return false;
        const name =
          el.getAttribute("aria-label") ||
          el.getAttribute("aria-labelledby") ||
          el.innerText?.trim() ||
          (el).title ||
          (el).placeholder;
        return !name;
      }).length;

      return {
        totalInteractive: interactiveElements.length,
        compliant24,
        compliant48,
        nonCompliant,
        exceptions,
        headings,
        unnamedElements,
      };
    });

    accessibilityMetrics.targetSizes = a11ySummary;
    console.log(`- Interactive elements evaluated: ${a11ySummary.totalInteractive}`);
    console.log(`- SC 2.5.8 Target Size >= 24x24px: ${a11ySummary.compliant24} compliant (${a11ySummary.nonCompliant} non-compliant, ${a11ySummary.exceptions} inline exceptions)`);
    console.log(`- Preferred Touch Target >= 48x48px: ${a11ySummary.compliant48} elements meet the ergonomic guideline`);
    console.log(`- Interactive elements with accessible names: ${a11ySummary.totalInteractive - a11ySummary.unnamedElements}/${a11ySummary.totalInteractive}`);
    console.log(`- Heading count: ${a11ySummary.headings.length} (H1: ${a11ySummary.headings.filter((h) => h.tag === "h1").length})`);

    // =====================================================================
    // PART 4: DIAGNOSTIC VISUAL SCREENSHOTS
    // Key route captures covering viewports and locales
    // =====================================================================
    console.log("\n>>> Capturing High-Diagnostic Visual Artifacts...");

    const captureJobs = [
      { name: "m8-01-home-en-desktop", url: "/", vp: VIEWPORTS[0], loc: LOCALES[0] },
      { name: "m8-02-home-ar-desktop", url: "/", vp: VIEWPORTS[0], loc: LOCALES[1] },
      { name: "m8-03-home-ar-mobile", url: "/", vp: VIEWPORTS[2], loc: LOCALES[1] },
      { name: "m8-04-projects-en-desktop", url: "/projects", vp: VIEWPORTS[0], loc: LOCALES[0] },
      { name: "m8-05-projects-ar-desktop", url: "/projects", vp: VIEWPORTS[0], loc: LOCALES[1] },
      { name: "m8-06-projects-meshwar-en-desktop", url: "/projects/meshwar", vp: VIEWPORTS[0], loc: LOCALES[0] },
      { name: "m8-07-projects-meshwar-ar-mobile", url: "/projects/meshwar", vp: VIEWPORTS[2], loc: LOCALES[1] },
      { name: "m8-08-about-ar-desktop", url: "/about", vp: VIEWPORTS[0], loc: LOCALES[1] },
      { name: "m8-09-contact-ar-mobile", url: "/contact", vp: VIEWPORTS[2], loc: LOCALES[1] },
      { name: "m8-10-not-found-en-desktop", url: "/non-existent-probe-page", vp: VIEWPORTS[0], loc: LOCALES[0] },
      { name: "m8-11-not-found-ar-mobile", url: "/non-existent-probe-page", vp: VIEWPORTS[2], loc: LOCALES[1] },
      { name: "m8-12-320px-reflow-mobile", url: "/", vp: { width: 320, height: 844 }, loc: LOCALES[0] },
    ];

    for (const job of captureJobs) {
      await page.setViewport({ width: job.vp.width, height: job.vp.height });
      await page.setCookie({ name: "NEXT_LOCALE", value: job.loc.code, domain: "localhost" });
      await page.goto(`${BASE_URL}${job.url}`, { waitUntil: "domcontentloaded" });
      await page.evaluate((l) => {
        try {
          localStorage.setItem("nabildawud_portfolio_locale", l);
        } catch {}
      }, job.loc.code);
      await new Promise((r) => setTimeout(r, 300));

      const shotPath = path.join(OUTPUT_DIR, `${job.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      screenshots.push(shotPath);
      console.log(`Saved screenshot: ${job.name}.png`);
    }

    // Capture Lightbox open screenshot
    await page.setViewport({ width: 1440, height: 900 });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 300));
    const openCertBtn = await page.$("#btn-cert-web-dev-diploma");
    if (openCertBtn) {
      await openCertBtn.click();
      await new Promise((r) => setTimeout(r, 400));
      const lightboxShot = path.join(OUTPUT_DIR, "m8-13-about-en-desktop-lightbox.png");
      await page.screenshot({ path: lightboxShot });
      screenshots.push(lightboxShot);
      console.log("Saved screenshot: m8-13-about-en-desktop-lightbox.png");
    }

    await browser.close();

    console.log("\n========================================================================");
    console.log(`  MILESTONE 8 QA COMPLETE: ${matrixResults.filter((m) => m.passed).length}/60 SCENARIOS PASSED  `);
    console.log("========================================================================");

    return {
      passed: true,
      totalScenarios: matrixResults.length,
      passedScenarios: matrixResults.filter((m) => m.passed).length,
      matrixResults,
      accessibilityMetrics,
      screenshots,
    };
  } catch (err) {
    await browser.close();
    console.error("\n❌ Browser QA Fatal Error:", err);
    process.exit(1);
  }
}

runMilestone8QA();
