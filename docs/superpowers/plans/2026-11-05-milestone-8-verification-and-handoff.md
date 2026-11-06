# Milestone 8 — End-to-End Verification, Accessibility/RTL Audit & Final Handoff Plan (Revised)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the comprehensive, evidence-based final quality gate for Nabil Dawud's portfolio: verifying 9 public page routes and 1 deliberate 404 scenario across 3 viewports in English (LTR) and Arabic (RTL) (60 total scenarios), auditing WCAG 2.2 AA accessibility criteria, measuring Core Web Vitals lab readiness, validating zero-leak deployment readiness, and compiling the final production handoff documentation.

**Architecture:**
- **Cross-Route Contract Suite:** `tests/milestone-8/e2e-routes.contract.test.ts` verifying slug parity, dictionary key alignment, metadata integrity, and data model truth constraints.
- **Automated Multi-Viewport Browser QA:** `tests/browser-qa-milestone-8.mjs` orchestrating Puppeteer to test all 9 public routes + deliberate 404 probe across 3 responsive viewports in both LTR and RTL (60 total scenarios), verifying zero horizontal overflow (`scrollWidth <= clientWidth`), interactive state management, filter query params, modal focus traps, and mock contact form submissions.
- **Automated & Manual Accessibility Auditing:** Evaluating WCAG 2.2 AA criteria (SC 2.5.8 Target Size $\ge 24\times 24\text{px}$ vs $48\times 48\text{px}$ ergonomic guideline; SC 1.4.3 Contrast $\ge 4.5:1$ / $3:1$; SC 1.4.10 320px Reflow; SC 1.4.12 Text Spacing; SC 4.1.2 Accessible Names; SC 3.3.1/3.3.2/4.1.3 Form Errors & Announcements; SC 3.1.1 Lang/Dir; SC 2.3.3 Reduced Motion; and appropriate semantic landmarks).
- **Production Build & Lab Diagnostics:** Turbopack compilation verification, bundle size profiling, client-side JS analysis, and Core Web Vitals lab readiness checks (LCP $\le 2.5\text{s}$, INP $\le 200\text{ms}$, CLS $\le 0.1$ as reference targets).
- **Security & Deployment Readiness:** Verifying `.env.example` documentation of all 6 required environment variables, zero secrets in client bundles or Git history, production fail-closed rate limiting, trusted proxy configuration, and assembling the production deployment checklist.
- **Evidence Matrix & Final Handoff Report:** Generating the 60-point verification matrix (`docs/superpowers/evidence-matrix-milestone-8.md`) and executive portfolio handoff summary (`docs/milestone-8-handoff-report.md`).

**Tech Stack:** Next.js 16.4.5 (App Router, Turbopack), React 19.3.1, TypeScript 5, Tailwind CSS v4, Lucide React 1.69.0, Motion 14.9.1, Node.js built-in test runner (`tsx --test`), Puppeteer Core. Zero new npm dependencies.

**Spec:** `nabil-dawud-portfolio-master-plan.md` (Consolidated Portfolio Specification Final v4, Section 3, Section 4, Section 8, and Section 9.8).

---

## Global Constraints

1. **Strictly Read-Only Verification & Zero Unsolicited Refactoring:**
   - Milestone 8 is a rigorous audit and quality gate, NOT a redesign or feature expansion.
   - Do NOT refactor working code for stylistic preferences.
   - If an actual defect is discovered, isolate it with a failing contract test (TDD RED) before proposing or applying a minimal fix.
2. **Zero Plaintext Emails or `mailto:` Links:**
   - Verify that personal email addresses remain unexposed across all routes. All communication routes through `/api/contact`.
3. **Zero Real Emails Dispatched:**
   - All contact form testing in browser automation must intercept requests and respond with mock payloads.
4. **Zero Production Deployments or Remote Pushes:**
   - Milestone 8 validates deployment readiness locally; no actual Git pushes, DNS changes, or remote deployments will occur without separate user authorization.
5. **Accurate Performance & Lab Reporting:**
   - Clearly distinguish between local lab diagnostics (LCP candidate element identification, DOMContentLoaded, layout box stability, zero-shift font preloading) and real-world field data (which requires live production traffic via CrUX).
   - Never invent or fabricate Lighthouse scores, field telemetry, or compliance claims.
6. **Bilingual RTL Layout Fidelity:**
   - Complete layout mirroring: zero horizontal overflow (`scrollWidth <= clientWidth`) on every route in both LTR and RTL at 1440px, 768px, and 390px, and reflow at 320px.
7. **Zero New Dependencies:**
   - Reuse existing project dependencies (`puppeteer-core`, `tsx`, `next`, `react`, etc.). Do not add packages to `package.json`.

---

## Review Focus

1. **Horizontal Overflow Across All Routes & Viewports:** Ensure that no section, card, code block, or table bleeds outside the viewport width at 390px, 768px, or 1440px in either English or Arabic.
2. **Dynamic Route & Back/Forward History Resilience:** Ensure that navigating between catalog filters, project case studies, and back/forward browser history maintains state without hydration mismatches or broken navigation.
3. **Modal & Focus Trap Lifecycle:** Verify that opening the certificate lightbox locks background scrolling, restricts `Tab` / `Shift+Tab` cycling to modal controls, restores focus to the triggering element upon `Escape` or close, and correctly reverses navigation keys (`ArrowRight` / `ArrowLeft`) in Arabic RTL.
4. **Honeypot Bot Invisibility & Tab Exclusion:** Verify that `#_hp_website` is completely excluded from keyboard tab sequences (`tabIndex={-1}`) and screen reader accessibility trees (`aria-hidden="true"`) across all viewport sizes.
5. **Client-Side Bundle Secrets Protection:** Verify that production bundles contain zero references to `RESEND_API_KEY`, `CONTACT_RECEIVING_EMAIL`, `UPSTASH_REDIS_REST_URL`, or `UPSTASH_REDIS_REST_TOKEN`.

---

## Route & Viewport Coverage Matrix (60 Total Scenarios)

The audit matrix consists of **54 public page combinations** (9 actual public routes $\times$ 3 viewports $\times$ 2 locales) plus **6 deliberate 404 error scenarios** (1 deliberate nonexistent probe path $\times$ 3 viewports $\times$ 2 locales):

| Route Key | URL Path | Type | Viewports Tested | Locales Tested | Scenarios |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **R-01** | `/` | Home Page | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-02** | `/projects` | Project Catalog | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-03** | `/projects/meshwar` | Case Study: Mishwar | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-04** | `/projects/masar` | Case Study: Masar | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-05** | `/projects/apartment-maintenance-marketplace` | Case Study: Apartment Maint. | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-06** | `/projects/orbit` | Case Study: Orbit | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-07** | `/projects/university-issues` | Case Study: University Issues | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-08** | `/about` | About & Lightbox | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **R-09** | `/contact` | Contact & Form | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **Subtotal** | **9 Public Routes** | **Actual Pages** | | | **54 Scenarios** |
| **R-10** | `/non-existent-probe-page` | Deliberate 404 Probe | 1440px, 768px, 390px | EN (LTR), AR (RTL) | 6 |
| **Total** | **Audit Surface Area** | | | | **60 Scenarios** |

### 404 Verification Requirements:
- Do not treat `/_not-found` as a public URL route.
- Navigate to a deliberately nonexistent probe URL (`/non-existent-probe-page`).
- Verify HTTP 404 status header on direct request.
- Verify rendered custom 404 component UI in both English and Arabic.
- Verify functional "Back to Home" navigation button.
- Verify zero horizontal overflow at 1440px, 768px, and 390px.

---

## Step-by-Step Implementation Tasks

### Task 1: Cross-Route Integrity, Slug Parity & Data Contract Suite
**Files:**
- Create: `tests/milestone-8/e2e-routes.contract.test.ts`

- [ ] **Step 1.1: Write failing cross-route contract test**
  - Verify static parameter resolution for all 5 project slugs (`meshwar`, `masar`, `apartment-maintenance-marketplace`, `orbit`, `university-issues`).
  - Verify that each project slug matches its defined metadata in `src/data/projects.ts`.
  - Verify complete bilingual dictionary parity for every page key (`home`, `projects`, `about`, `contact`, `notFound`, `nav`, `footer`).
  - Verify that no data model exposes plaintext email addresses or `mailto:` links.
  - Verify that `cvConfig.isAvailable === false` and status pill message is defined in EN and AR.
- [ ] **Step 1.2: Run test to verify RED**
  - Command: `npx tsx --test tests/milestone-8/e2e-routes.contract.test.ts`
  - Expected: Fails because file does not exist.
- [ ] **Step 1.3: Implement `tests/milestone-8/e2e-routes.contract.test.ts`**
- [ ] **Step 1.4: Run test to verify GREEN**
  - Command: `npx tsx --test tests/milestone-8/e2e-routes.contract.test.ts`
  - Expected: PASS with all route and dictionary contracts green.

---

### Task 2: Automated Multi-Viewport, Cross-Route & RTL Browser QA Automation
**Files:**
- Create: `tests/browser-qa-milestone-8.mjs`

- [ ] **Step 2.1: Implement Puppeteer automated test covering the 60-scenario matrix:**
  1. **54 Public Route Scenarios:** Iterates through all 9 actual public page routes in Desktop (1440px), Tablet (768px), and Mobile (390px) in EN (LTR) and AR (RTL).
  2. **6 Deliberate 404 Probe Scenarios:** Navigates to `/non-existent-probe-page` across all 3 viewports in EN and AR, verifying 404 response status, localized error copy, and "Back to Home" navigation.
  3. **Horizontal Overflow Assertion:** Tests `scrollWidth <= clientWidth` on all 60 scenarios in both LTR and RTL.
  4. **Interactive Catalog Filtering:** Navigates to `/projects`, applies category filters ("Core Architecture", "High Throughput", "Offline-First"), confirms card count updates, and resets filters.
  5. **Dynamic Case Study Navigation:** Clicks through from `/projects` into `/projects/meshwar`, verifies back/forward browser button navigation restores previous scroll/catalog state.
  6. **Certificate Lightbox Focus Trapping & Keyboard Wraparound:**
     - Opens certificate modal on `/about`.
     - Verifies `body` scroll lock (`overflow: hidden`).
     - Verifies `Tab` and `Shift+Tab` cycle only between Close, Previous, and Next buttons.
     - Verifies `Escape` closes modal and restores focus to triggering card button.
     - In Arabic RTL: verifies `ArrowRight` selects previous certificate and `ArrowLeft` selects next certificate with circular wraparound.
  7. **Contact Form End-to-End Mock Flow:**
     - Tests field submission with request interception (zero real emails).
     - Tests error recovery (500/503) preserving draft inputs.
     - Tests honeypot `#_hp_website` accessibility (`tabIndex === -1`, `aria-hidden === "true"`, off-screen placement).
  8. **Diagnostic Visual Captures:** Captures essential diagnostic full-page screenshots to `<artifactDir>/screenshots/milestone-8/` (prioritizing route diversity and layout coverage; avoiding redundant identical captures).
- [ ] **Step 2.2: Execute `node tests/browser-qa-milestone-8.mjs` against production build server**
  - Expected: All 60 scenarios pass; 0 overflow failures; 0 broken links; 0 missing landmarks.

---

### Task 3: WCAG 2.2 AA Accessibility & Keyboard Navigation Audit
**Files:**
- Output: Dedicated Accessibility Audit section in `docs/superpowers/evidence-matrix-milestone-8.md`

- [ ] **Step 3.1: Target Size Evaluation (SC 2.5.8 Minimum vs Ergonomic Guideline):**
  - Evaluate WCAG 2.2 AA SC 2.5.8 Target Size (Minimum): Verify all standalone interactive pointers meet at least $24 \times 24$ CSS pixels (or satisfy the 24px diameter bounding circle / spacing exceptions).
  - Distinguish from the preferred ergonomic design guideline ($48 \times 48\text{px}$ touch targets on mobile/tablet).
- [ ] **Step 3.2: Color Contrast Audit (SC 1.4.3):**
  - Normal text contrast $\ge 4.5:1$: Warm Ivory (`#F4F1E9`) on Deep Obsidian (`#090B0A`) exceeds 14:1; Muted Sand (`#A39E93`) on Graphite (`#191A17`) exceeds 4.8:1.
  - Large text and UI components contrast $\ge 3:1$: Champagne Gold (`#B7A477`) and Muted Teal (`#58B8B0`) on dark surfaces.
- [ ] **Step 3.3: Reflow & Text Spacing Audit (SC 1.4.10 & SC 1.4.12):**
  - Reflow: Verify page content reflows at 320 CSS pixels width without horizontal scrolling or loss of information.
  - Text Spacing: Verify that applying override text spacing (line-height 1.5, paragraph spacing 2.0, letter-spacing 0.12, word-spacing 0.16) causes no text clipping or overlapping.
- [ ] **Step 3.4: Semantic Landmarks & Heading Structure:**
  - Verify appropriate landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`.
  - Explicit rule: Do NOT require an `<aside>` on every page (aside is reserved for pages with supplementary content like `/contact`).
  - Verify single `<h1>` per page, followed by logical `<h2>` and `<h3>` heading hierarchy.
- [ ] **Step 3.5: Keyboard Navigation & Focus Indicators:**
  - Verify visible focus rings on all interactive controls (without demanding specific implementation class names).
  - Verify logical tab sequence in both LTR and RTL.
  - Verify `prefers-reduced-motion` compliance across Motion transitions.
- [ ] **Step 3.6: Form Errors, Accessible Names & Status Messages:**
  - Verify accessible names on all interactive elements.
  - Verify form input error announcements via `aria-invalid`, `aria-describedby`, and `role="alert"` / `aria-live`.
  - Verify language and direction attributes (`lang` and `dir`) on root `<html>`.
- [ ] **Step 3.7: Automated vs. Manual Reporting Separation:**
  - Clearly separate automated inspection results from manual/human verification.
  - Explicitly avoid claiming full WCAG compliance solely from automated tools.

---

### Task 4: Production Build, Bundle Optimization & Core Web Vitals Lab Diagnostics
**Files:**
- Output: Dedicated Performance section in `docs/superpowers/evidence-matrix-milestone-8.md`

- [ ] **Step 4.1: Production Build & Static Analysis:**
  - Execute `npm run build` with Next.js Turbopack compiler.
  - Record compilation time, total static/dynamic routes generated, and TypeScript check results.
  - Execute `npm run lint` with ESLint. Record error/warning counts.
  - Execute `npm test` across all contract test suites.
- [ ] **Step 4.2: Client Bundle Size & Chunk Analysis:**
  - Inspect `.next/static/chunks` generated by Turbopack.
  - Record shared vendor chunks, route-specific bundle sizes, and verify zero bloated dependencies.
  - Confirm fonts (`Plus Jakarta Sans`, `Geist`, `Alexandria`, `IBM Plex Sans Arabic`) utilize `next/font` with `font-display: swap` and zero external Google Fonts network calls.
- [ ] **Step 4.3: Core Web Vitals Lab Readiness:**
  - Evaluate current Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Note that FID was replaced by INP in March 2024.
  - Use reference target thresholds: LCP $\le 2.5\text{s}$, INP $\le 200\text{ms}$, CLS $\le 0.1$ as quality targets, not unconditional guarantees.
  - Clearly distinguish local lab diagnostics (LCP candidate element identification, DOMContentLoaded, layout box stability, zero-shift font preloading) from real-world field data (which requires live user traffic via CrUX).

---

### Task 5: Security & Deployment Readiness Audit
**Files:**
- Output: Section in `docs/milestone-8-handoff-report.md`

- [ ] **Step 5.1: Secrets Isolation & Environment Review:**
  - Explicitly verify the presence and documentation of all **six required environment variable names** in `.env.example`:
    1. `RESEND_API_KEY`
    2. `RESEND_FROM_EMAIL`
    3. `CONTACT_RECEIVING_EMAIL`
    4. `UPSTASH_REDIS_REST_URL`
    5. `UPSTASH_REDIS_REST_TOKEN`
    6. `TRUSTED_PROXY_STRATEGY`
  - Verify that `.env.example` contains non-working placeholders only.
  - Verify that `.env.local` is git-ignored and untracked.
  - Never print, expose, hash, or disclose secret values in logs, reports, or test output.
- [ ] **Step 5.2: Rate Limiting & Trusted Proxy Configuration:**
  - Verify fail-closed behavior of `TRUSTED_PROXY_STRATEGY` in production.
  - Verify distributed sliding-window rate limiting on Upstash Redis with 3000ms timeout guard.
- [ ] **Step 5.3: Production Deployment Guide & Checklist:**
  - Compile step-by-step instructions for Vercel edge deployment:
    1. Setting environment variables in the hosting dashboard.
    2. Confirming DNS topology (`na-bil.app`) and selecting `"vercel"` or `"cloudflare"`.
    3. Resend sender domain verification (SPF/DKIM/DMARC).

---

### Task 6: Synthesis, Evidence Matrix & Final Handoff Documentation
**Files:**
- Create: `docs/superpowers/evidence-matrix-milestone-8.md`
- Create: `docs/milestone-8-handoff-report.md`

- [ ] **Step 6.1: Compile 60-Scenario Verification Matrix (`docs/superpowers/evidence-matrix-milestone-8.md`):**
  - Complete 54 public route combinations + 6 deliberate 404 scenarios with exact test outcomes.
  - Accessibility audit checklist (automated + manual verification separated).
  - Performance lab diagnostics and bundle size breakdown.
- [ ] **Step 6.2: Compile Executive Portfolio Handoff Report (`docs/milestone-8-handoff-report.md`):**
  - Project summary & architectural highlights.
  - Milestone 1–8 completion ledger.
  - Technical capabilities & verified evidence summary.
  - Production deployment readiness checklist & environment configuration guide.
  - Known limitations, maintenance guidance, and post-launch roadmap.
- [ ] **Step 6.3: Dispatch Senior Code Reviewer subagent for final branch audit**
- [ ] **Step 6.4: Present Milestone 8 completion report to user**

---

## Exact Files to Create (5 New Files)

1. `docs/superpowers/plans/2026-11-05-milestone-8-verification-and-handoff.md` (this plan)
2. `tests/milestone-8/e2e-routes.contract.test.ts` (cross-route contract suite)
3. `tests/browser-qa-milestone-8.mjs` (comprehensive Puppeteer E2E & RTL suite)
4. `docs/superpowers/evidence-matrix-milestone-8.md` (60-scenario verification matrix)
5. `docs/milestone-8-handoff-report.md` (executive final handoff report)

*Note: Existing application code files will NOT be modified unless an actual bug is discovered during the audit, in which case it will be isolated with a failing contract test (TDD RED) and documented in the audit findings.*

---

## Acceptance Criteria

1. **Test Green Gate:** All existing 38 contract tests + new Milestone 8 contract tests pass (`npm test`).
2. **Lint & Build Clean:** `npm run lint` reports 0 errors and 0 warnings; `npm run build` compiles with 0 errors.
3. **Browser QA:** All 60 scenarios in `tests/browser-qa-milestone-8.mjs` pass with 0 horizontal overflow issues (`scrollWidth <= clientWidth`) across Desktop (1440px), Tablet (768px), and Mobile (390px) in both English and Arabic.
4. **404 Verification:** Nonexistent URL probe `/non-existent-probe-page` returns 404 status, localized custom 404 UI, and working home navigation across all 6 scenarios.
5. **Modal & Navigation Fidelity:** Lightbox focus trap, Escape dismissal, and RTL arrow navigation verified in real browser automation.
6. **Security & Privacy Guarantee:** Zero plaintext email addresses or `mailto:` links across all pages; all 6 required environment variable names documented in `.env.example`; zero secret keys in client bundles or Git history.
7. **Documentation Completeness:** Both `docs/superpowers/evidence-matrix-milestone-8.md` and `docs/milestone-8-handoff-report.md` created with verified evidence.
