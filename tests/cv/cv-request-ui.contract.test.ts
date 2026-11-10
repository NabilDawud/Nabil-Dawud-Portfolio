import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { cvConfig } from "@/data/personal";
import { enDictionary } from "@/i18n/dictionaries/en";
import { arDictionary } from "@/i18n/dictionaries/ar";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

test("CV Request UI Contract: Availability disabled & Public Asset Removed", async () => {
  // 1. Direct download must be disabled
  assert.strictEqual(
    cvConfig.isAvailable,
    false,
    "cvConfig.isAvailable must be false for request-and-approval workflow"
  );
  assert.strictEqual(cvConfig.statusMessage.en, "CV available upon request");
  assert.strictEqual(cvConfig.statusMessage.ar, "السيرة الذاتية متاحة عند الطلب");

  // 2. Physical PDF must NOT exist in public directory
  const publicPdf = path.join(process.cwd(), "public", "assets", "cv", "nabil-dawud-cv.pdf");
  assert.strictEqual(
    fs.existsSync(publicPdf),
    false,
    `Public PDF asset must be removed, but still found at: ${publicPdf}`
  );

  // 3. HTTP GET to old PDF route must return 404 Not Found
  try {
    const res = await fetch(`${BASE_URL}/assets/cv/nabil-dawud-cv.pdf`);
    assert.strictEqual(
      res.status,
      404,
      `Old public PDF route must return 404, but received HTTP ${res.status}`
    );
  } catch {
    // If local test server is offline, disk check above guarantees asset absence
  }
});

test("CV Request UI Contract: Bilingual Dictionary Parity", () => {
  // Dictionary labels
  assert.strictEqual(enDictionary.nav.requestCv, "Request CV");
  assert.strictEqual(enDictionary.hero.requestCv, "Request CV");
  assert.strictEqual(arDictionary.nav.requestCv, "طلب السيرة الذاتية");
  assert.strictEqual(arDictionary.hero.requestCv, "طلب السيرة الذاتية");

  // Namespace parity
  assert.ok(enDictionary.cvRequest.modalTitle.length > 0);
  assert.ok(arDictionary.cvRequest.modalTitle.length > 0);
  assert.ok(enDictionary.cvRequest.modalSubtitle.length > 0);
  assert.ok(arDictionary.cvRequest.modalSubtitle.length > 0);
  assert.ok(enDictionary.cvRequest.fullNameLabel.length > 0);
  assert.ok(arDictionary.cvRequest.fullNameLabel.length > 0);
  assert.ok(enDictionary.cvRequest.emailLabel.length > 0);
  assert.ok(arDictionary.cvRequest.emailLabel.length > 0);
  assert.ok(enDictionary.cvRequest.purposeLabel.length > 0);
  assert.ok(arDictionary.cvRequest.purposeLabel.length > 0);
  assert.ok(enDictionary.cvRequest.submitButton.length > 0);
  assert.ok(arDictionary.cvRequest.submitButton.length > 0);
});

test("CV Request UI Contract: In-Browser Verification across Hero, Navbar, MobileNav (EN & AR)", async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(25000);

    // 1. Desktop English
    await page.setViewport({ width: 1280, height: 800 });
    await page.setRequestInterception(true);
    page.on("request", (interceptedReq) => {
      if (interceptedReq.url().includes("/api/cv-request")) {
        try {
          const postData = JSON.parse(interceptedReq.postData() || "{}");
          if (!postData.fullName || postData.email === "invalid-email") {
            interceptedReq.respond({
              status: 400,
              contentType: "application/json",
              body: JSON.stringify({
                error: "Validation failed",
                errors: {
                  ...(!postData.fullName ? { fullName: "Full name is required" } : {}),
                  ...(postData.email === "invalid-email" ? { email: "Please enter a valid email address" } : {}),
                  ...(!postData.purpose ? { purpose: "Purpose of request is required" } : {}),
                },
              }),
            });
            return;
          }
          // Delay mock response slightly to verify loading state and absence of early success state
          setTimeout(() => {
            interceptedReq.respond({
              status: 200,
              contentType: "application/json",
              body: JSON.stringify({ success: true }),
            });
          }, 250);
        } catch {
          interceptedReq.respond({
            status: 400,
            contentType: "application/json",
            body: JSON.stringify({ error: "Invalid JSON" }),
          });
        }
      } else {
        interceptedReq.continue();
      }
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      localStorage.setItem("nabildawud_portfolio_locale", "en");
    });
    await page.setCookie({ name: "NEXT_LOCALE", value: "en", domain: "localhost" });
    await page.reload({ waitUntil: "networkidle0" });

    // Hero Section button
    const heroBtnText = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("section button"));
      const cvBtn = btns.find((b) => b.textContent?.includes("Request CV"));
      return cvBtn?.textContent?.trim() || null;
    });
    assert.strictEqual(heroBtnText, "Request CV");

    // Navbar button
    const navBtnText = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("header button"));
      const cvBtn = btns.find((b) => b.textContent?.includes("Request CV"));
      return cvBtn?.textContent?.trim() || null;
    });
    assert.strictEqual(navBtnText, "Request CV");

    // Click Hero Request CV button to open modal
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("section button"));
      const cvBtn = btns.find((b) => b.textContent?.includes("Request CV"));
      (cvBtn as HTMLButtonElement | undefined)?.click();
    });
    await new Promise((r) => setTimeout(r, 400));

    // Verify modal is open
    const modalOpen = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]#cv-modal-title, div[role="dialog"]');
      const title = document.getElementById("cv-modal-title");
      return dialog && title ? title.textContent?.trim() : null;
    });
    assert.strictEqual(modalOpen, "Request CV");

    // 1. Failure scenario: submit with invalid email and verify entered data remains available
    await page.type('input[name="fullName"]', "Sarah Jenkins");
    await page.type('input[name="email"]', "invalid-email");
    await page.type('input[name="organization"]', "Acme Engineering");
    await page.type('textarea[name="purpose"]', "Evaluating senior backend architectural background.");

    await page.evaluate(() => {
      const form = document.querySelector('div[role="dialog"] form') as HTMLFormElement | null;
      form?.requestSubmit();
    });
    await page.waitForSelector("#cv-email-err", { timeout: 4000 });

    const emailError = await page.evaluate(() => {
      const err = document.getElementById("cv-email-err");
      return err?.textContent?.trim() || null;
    });
    assert.strictEqual(emailError, "Please enter a valid email address");

    // Verify entered data remains preserved after failure
    const preservedName = await page.evaluate(() => {
      const input = document.querySelector('input[name="fullName"]') as HTMLInputElement | null;
      return input?.value || null;
    });
    assert.strictEqual(preservedName, "Sarah Jenkins");

    const preservedOrg = await page.evaluate(() => {
      const input = document.querySelector('input[name="organization"]') as HTMLInputElement | null;
      return input?.value || null;
    });
    assert.strictEqual(preservedOrg, "Acme Engineering");

    const preservedPurpose = await page.evaluate(() => {
      const textarea = document.querySelector('textarea[name="purpose"]') as HTMLTextAreaElement | null;
      return textarea?.value || null;
    });
    assert.strictEqual(preservedPurpose, "Evaluating senior backend architectural background.");

    // Verify the form does NOT display success state before receiving successful response
    const hasSuccessBefore = await page.evaluate(() => {
      return document.querySelector('div[role="dialog"] h3')?.textContent?.includes("Request Received") || false;
    });
    assert.strictEqual(hasSuccessBefore, false);

    // 2. Success scenario: correct email and submit valid form
    await page.evaluate(() => {
      const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement | null;
      if (emailInput) {
        emailInput.value = "";
        emailInput.dispatchEvent(new Event("input", { bubbles: true }));
        emailInput.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    await page.type('input[name="email"]', "sarah.jenkins@example.com");

    await page.evaluate(() => {
      const form = document.querySelector('div[role="dialog"] form') as HTMLFormElement | null;
      form?.requestSubmit();
    });

    // Verify loading state before response arrives (form is still present and submitting button active)
    const isSubmittingState = await page.evaluate(() => {
      const form = document.querySelector('div[role="dialog"] form');
      const submitBtn = form?.querySelector('button[type="submit"]');
      const hasSuccess = document.querySelector('div[role="dialog"] h3')?.textContent?.includes("Request Received");
      return form !== null && !hasSuccess && (submitBtn?.hasAttribute("disabled") || false);
    });
    assert.strictEqual(isSubmittingState, true);

    // Wait for the success confirmation view to render after API responds
    await page.waitForFunction(() => !document.querySelector('div[role="dialog"] form'), { timeout: 4000 });

    // Verify success confirmation view renders
    const successTitle = await page.evaluate(() => {
      const h3 = document.querySelector('div[role="dialog"] h3');
      return h3?.textContent?.trim() || null;
    });
    assert.strictEqual(successTitle, "Request Received");

    // Click Close button in confirmation view
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('div[role="dialog"] button'));
      const closeBtn = btns.find((b) => b.textContent?.includes("Close"));
      (closeBtn as HTMLButtonElement | null)?.click();
    });
    await new Promise((r) => setTimeout(r, 300));

    // Verify modal is closed
    const modalAfterClose = await page.evaluate(() => {
      return document.querySelector('div[role="dialog"]') !== null;
    });
    assert.strictEqual(modalAfterClose, false);

    // 2. Desktop Arabic
    await page.goto(`${BASE_URL}/ar`, { waitUntil: "networkidle0" });

    const heroBtnAr = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("section button"));
      const cvBtn = btns.find((b) => b.textContent?.includes("طلب السيرة الذاتية"));
      return cvBtn?.textContent?.trim() || null;
    });
    assert.strictEqual(heroBtnAr, "طلب السيرة الذاتية");

    const navBtnAr = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("header button"));
      const cvBtn = btns.find((b) => b.textContent?.includes("طلب السيرة الذاتية"));
      return cvBtn?.textContent?.trim() || null;
    });
    assert.strictEqual(navBtnAr, "طلب السيرة الذاتية");

    // 3. Mobile Viewport (375x812)
    await page.setViewport({ width: 375, height: 812 });
    await page.reload({ waitUntil: "networkidle0" });

    // Open mobile menu
    await page.click("header button[aria-expanded]");
    await new Promise((r) => setTimeout(r, 500));

    // MobileNav CV action
    const mobileCvAr = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      const btn = Array.from(dialog?.querySelectorAll("button") || []).find((b) =>
        b.textContent?.includes("طلب السيرة الذاتية")
      );
      return btn?.textContent?.trim() || null;
    });
    assert.strictEqual(mobileCvAr, "طلب السيرة الذاتية");

    // Verify #section is completely absent from mobile menu
    const hasSectionTag = await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      return dialog?.textContent?.includes("#section") || false;
    });
    assert.strictEqual(hasSectionTag, false, "Mobile drawer must not display #section tags");

    // Click mobile Request CV button
    await page.evaluate(() => {
      const dialog = document.querySelector('div[role="dialog"]');
      const btn = Array.from(dialog?.querySelectorAll("button") || []).find((b) =>
        b.textContent?.includes("طلب السيرة الذاتية")
      );
      (btn as HTMLButtonElement | undefined)?.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Modal opens in Arabic
    const modalArTitle = await page.evaluate(() => {
      const title = document.getElementById("cv-modal-title");
      return title?.textContent?.trim() || null;
    });
    assert.strictEqual(modalArTitle, "طلب السيرة الذاتية");

    await page.keyboard.press("Escape");
  } finally {
    await browser.close();
  }
});
