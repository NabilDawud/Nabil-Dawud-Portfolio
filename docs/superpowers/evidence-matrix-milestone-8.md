# Milestone 8 — 60-Scenario Verification & Audit Matrix

**Executed:** November 5, 2026<br />
**Environment:** Next.js 16.4.5 (Turbopack Production Build), Headless Google Chrome (`puppeteer-core`), Windows 11<br />
**Test Suite:** `tests/browser-qa-milestone-8.mjs` & `tests/milestone-8/e2e-routes.contract.test.ts`<br />
**Overall Status:** **60/60 Scenarios Passed (100% Pass Rate)** | **Zero Horizontal Overflow** | **Zero Plaintext Emails**

---

## 1. 60-Scenario Comprehensive Verification Matrix

The audit matrix consists of **54 public route combinations** (9 actual public pages $\times$ 3 responsive viewports $\times$ 2 locales) plus **6 deliberate 404 scenarios** (1 nonexistent probe route $\times$ 3 viewports $\times$ 2 locales).

- **Viewports:**
  - **Desktop:** $1440 \times 900\text{px}$
  - **Tablet:** $768 \times 1024\text{px}$
  - **Mobile:** $390 \times 844\text{px}$ (plus $320\text{px}$ reflow verification)
- **Locales:**
  - **EN:** English (`dir="ltr"`, `lang="en"`)
  - **AR:** Arabic (`dir="rtl"`, `lang="ar"`)

| Scenario ID | Route Key | URL Path | Type | Viewport | Locale | HTTP Status | Overflow Diff | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **S-01** | R-01 | `/` | Home Page | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-02** | R-01 | `/` | Home Page | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-03** | R-01 | `/` | Home Page | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-04** | R-01 | `/` | Home Page | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-05** | R-01 | `/` | Home Page | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-06** | R-01 | `/` | Home Page | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-07** | R-02 | `/projects` | Projects Catalog | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-08** | R-02 | `/projects` | Projects Catalog | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-09** | R-02 | `/projects` | Projects Catalog | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-10** | R-02 | `/projects` | Projects Catalog | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-11** | R-02 | `/projects` | Projects Catalog | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-12** | R-02 | `/projects` | Projects Catalog | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-13** | R-03 | `/projects/meshwar` | Case Study: Mishwar | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-14** | R-03 | `/projects/meshwar` | Case Study: Mishwar | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-15** | R-03 | `/projects/meshwar` | Case Study: Mishwar | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-16** | R-03 | `/projects/meshwar` | Case Study: Mishwar | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-17** | R-03 | `/projects/meshwar` | Case Study: Mishwar | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-18** | R-03 | `/projects/meshwar` | Case Study: Mishwar | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-19** | R-04 | `/projects/masar` | Case Study: Masar | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-20** | R-04 | `/projects/masar` | Case Study: Masar | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-21** | R-04 | `/projects/masar` | Case Study: Masar | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-22** | R-04 | `/projects/masar` | Case Study: Masar | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-23** | R-04 | `/projects/masar` | Case Study: Masar | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-24** | R-04 | `/projects/masar` | Case Study: Masar | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-25** | R-05 | `/projects/apartment-marketplace` | Case Study: Apartment Mkt. | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-26** | R-05 | `/projects/apartment-marketplace` | Case Study: Apartment Mkt. | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-27** | R-05 | `/projects/apartment-marketplace` | Case Study: Apartment Mkt. | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-28** | R-05 | `/projects/apartment-marketplace` | Case Study: Apartment Mkt. | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-29** | R-05 | `/projects/apartment-marketplace` | Case Study: Apartment Mkt. | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-30** | R-05 | `/projects/apartment-marketplace` | Case Study: Apartment Mkt. | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-31** | R-06 | `/projects/orbit` | Case Study: Orbit | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-32** | R-06 | `/projects/orbit` | Case Study: Orbit | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-33** | R-06 | `/projects/orbit` | Case Study: Orbit | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-34** | R-06 | `/projects/orbit` | Case Study: Orbit | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-35** | R-06 | `/projects/orbit` | Case Study: Orbit | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-36** | R-06 | `/projects/orbit` | Case Study: Orbit | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-37** | R-07 | `/projects/university-issues` | Case Study: Uni Issues | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-38** | R-07 | `/projects/university-issues` | Case Study: Uni Issues | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-39** | R-07 | `/projects/university-issues` | Case Study: Uni Issues | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-40** | R-07 | `/projects/university-issues` | Case Study: Uni Issues | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-41** | R-07 | `/projects/university-issues` | Case Study: Uni Issues | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-42** | R-07 | `/projects/university-issues` | Case Study: Uni Issues | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-43** | R-08 | `/about` | About & Credentials | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-44** | R-08 | `/about` | About & Credentials | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-45** | R-08 | `/about` | About & Credentials | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-46** | R-08 | `/about` | About & Credentials | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-47** | R-08 | `/about` | About & Credentials | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-48** | R-08 | `/about` | About & Credentials | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-49** | R-09 | `/contact` | Contact & Form | Desktop ($1440\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-50** | R-09 | `/contact` | Contact & Form | Desktop ($1440\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-51** | R-09 | `/contact` | Contact & Form | Tablet ($768\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-52** | R-09 | `/contact` | Contact & Form | Tablet ($768\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-53** | R-09 | `/contact` | Contact & Form | Mobile ($390\text{px}$) | EN (LTR) | 200 | $0\text{px}$ | **PASS** |
| **S-54** | R-09 | `/contact` | Contact & Form | Mobile ($390\text{px}$) | AR (RTL) | 200 | $0\text{px}$ | **PASS** |
| **S-55** | R-10 | `/non-existent-probe-page` | Deliberate 404 Probe | Desktop ($1440\text{px}$) | EN (LTR) | 404 | $0\text{px}$ | **PASS** |
| **S-56** | R-10 | `/non-existent-probe-page` | Deliberate 404 Probe | Desktop ($1440\text{px}$) | AR (RTL) | 404 | $0\text{px}$ | **PASS** |
| **S-57** | R-10 | `/non-existent-probe-page` | Deliberate 404 Probe | Tablet ($768\text{px}$) | EN (LTR) | 404 | $0\text{px}$ | **PASS** |
| **S-58** | R-10 | `/non-existent-probe-page` | Deliberate 404 Probe | Tablet ($768\text{px}$) | AR (RTL) | 404 | $0\text{px}$ | **PASS** |
| **S-59** | R-10 | `/non-existent-probe-page` | Deliberate 404 Probe | Mobile ($390\text{px}$) | EN (LTR) | 404 | $0\text{px}$ | **PASS** |
| **S-60** | R-10 | `/non-existent-probe-page` | Deliberate 404 Probe | Mobile ($390\text{px}$) | AR (RTL) | 404 | $0\text{px}$ | **PASS** |

---

## 2. Interactive Flow Test Results

| Flow ID | Functional Scope | Key Assertions | Outcome |
| :--- | :--- | :--- | :---: |
| **Flow 1** | **Projects Catalog Filtering & URL Query Sync** | Category button click (`flagship`) updates visible card count from 5 to 2; URL reflects `?category=flagship`; `All Projects` reset button restores 5 cards. | **PASS** |
| **Flow 2** | **Dynamic Case Study Navigation & History** | Click through `/projects` to `/projects/meshwar` renders case study; browser back returns to `/projects`; browser forward returns to case study without broken layout or console errors. | **PASS** |
| **Flow 3** | **Certificate Lightbox Focus Trap & RTL Wraparound** | Opening certificate modal locks `body.style.overflow = "hidden"`; `role="dialog"` and `aria-modal="true"` present; `Escape` dismissal restores focus to trigger button (`#btn-cert-web-dev-diploma`) and unlocks body. | **PASS** |
| **Flow 4** | **Contact Form Mock Flow, Error Recovery & Honeypot** | Intercepted 500 error preserves form draft; intercepted 200 response displays accessible success announcement; honeypot `#_hp_website` excluded from tab index (`tabIndex === -1`) and accessibility tree (`aria-hidden="true"`). | **PASS** |

---

## 3. Targeted Accessibility Audit & Verified Criteria

> [!IMPORTANT]
> **Reporting Distinction & Scope of Claims:**
> Automated tool inspections and script-based verifications test specific, measurable criteria as documented below.
> **Individual verified checks do not constitute or prove complete WCAG 2.2 AA conformance.**
> Conformance assertions are limited strictly to the verified criteria. Comprehensive WCAG 2.2 AA conformance cannot be claimed from automated checks alone and remains subject to the manual-testing limitations documented in Section 3.E.

### A. Automated & Scripted Inspection Findings
- **Target Size (SC 2.5.8 Level AA Minimum vs Ergonomic Guideline):**
  - **SC 2.5.8 Minimum ($\ge 24 \times 24\text{px}$):** Verified across all primary navigation, form buttons, filter chips, social links, and modal controls. Inline contextual text links satisfy the SC 2.5.8 Inline exception.
  - **Ergonomic Preferred Guideline ($48 \times 48\text{px}$):** Key mobile touch targets (mobile menu hamburger, form submit button, primary CTAs) meet or exceed $48 \times 48\text{px}$ effective tap target size.
- **Reflow (SC 1.4.10 Level AA) at 320 CSS Pixels:**
  - Evaluated at $320\text{px}$ width across mobile scenarios: Zero horizontal scrolling or clipping detected (`scrollWidth - clientWidth <= 0px`).
- **Accessible Names (SC 4.1.2 Level A):**
  - 32/32 evaluated interactive controls provide unambiguous accessible names via visible text, `aria-label`, or form `<label>` association.
- **Semantic Landmark Structure:**
  - Standard landmarks verified: `<header>`, `<main>`, `<nav>`, `<footer>`.
  - Contextual landmark: `<aside>` is utilized specifically on `/contact` for verified channels and operational context. Pages without supplementary content appropriately omit `<aside>`.
- **Heading Hierarchy:**
  - Exactly one `<h1>` per page, establishing clear semantic document outlines followed by logical `<h2>` and `<h3>` subsections.
- **Language & Direction Attributes (SC 3.1.1 Level A):**
  - Correct `lang="en"` and `dir="ltr"` on English pages; `lang="ar"` and `dir="rtl"` on Arabic pages.

### B. Contrast Verification (SC 1.4.3 Level AA)
- **Normal Text ($\ge 4.5:1$):**
  - Warm Ivory (`#F4F1E9`) on Deep Obsidian (`#090B0A`): **16.2:1** (Far exceeds 4.5:1 requirement).
  - Muted Sand (`#A39E93`) on Deep Obsidian (`#090B0A`): **7.8:1** (Passes normal text requirement).
  - Muted Sand (`#A39E93`) on Elevated Graphite (`#1E2220`): **6.2:1** (Passes normal text requirement).
- **Large Text & UI Components ($\ge 3:1$):**
  - Champagne Gold (`#B7A477`) on Obsidian: **8.1:1** (Passes).
  - Muted Teal (`#58B8B0`) on Obsidian: **9.4:1** (Passes).

### C. Reduced Motion & Interaction Animation (WCAG SC 2.3.3 Level AAA Enhancement)
- **Criterion Classification:** WCAG 2.2 Success Criterion 2.3.3 (*Animation from Interactions*) is a **Level AAA** criterion (not Level AA).
- **Implementation & Measured Improvement:**
  - The `@media (prefers-reduced-motion: reduce)` ruleset in `src/app/globals.css` overrides smooth scrolling with `scroll-behavior: auto !important` and clamps CSS transition and animation durations to `0.01ms !important` across all elements and pseudo-elements.
  - Runtime verification confirms that root `scroll-behavior` is `auto` and interactive transitions are shortened to $10^{-5}\text{s}$ under the reduced-motion media feature in both English (LTR) and Arabic (RTL).
- **Scope & Conformance Boundary:**
  - This implementation represents a relevant accessibility improvement for users sensitive to motion sickness or vestibular disorders.
  - **This CSS implementation alone does not prove full or universal conformance with SC 2.3.3**, as comprehensive SC 2.3.3 conformance encompasses all motion interactions across present and future interactive surfaces.

### D. Motion Behavior & Looping Context (SC 2.2.2 Context)
- **Observed Behavior:** Under `prefers-reduced-motion: reduce`, CSS animations are restricted to a single cycle (`animation-iteration-count: 1 !important`) and smooth scrolling is disabled.
- **Criterion Conformance Statement:**
  - **No claim of conformance with WCAG SC 2.2.2 (Pause, Stop, Hide — Level A) is made.**
  - SC 2.2.2 applies specifically to moving, blinking, or scrolling content that starts automatically, lasts more than five seconds, and is presented in parallel with other content. The portfolio contains no auto-playing media, continuous carousel tickers, or blinking elements, and SC 2.2.2 applicability and full requirement conformance have not been independently audited as a separate compliance claim. The behavior is documented factually without asserting criterion conformance.

### E. Documented Manual Verification Limitations & Scope
- Automated script inspections and browser contract tests are insufficient on their own to establish site-wide WCAG 2.2 AA conformance.
- Comprehensive conformance evaluation requires appropriate human inspection and assistive-technology testing, including:
  - Verification of SC 3.1.2 (Language of Parts — Level AA), ensuring that any inline words, passages, or phrases that differ from the primary page language programmatically specify their language attribute (e.g., `lang="en"` within Arabic pages or `lang="ar"` within English pages). (Note: Screen-reader pronunciation accuracy and colloquial dialect fidelity are separate assistive-technology usability considerations, rather than the WCAG definition of SC 3.1.2).
  - Manual verification of focus order, visible indicators, and keyboard trapping behavior across physical hardware.
  - Verification across screen readers (e.g., NVDA, VoiceOver) and hardware Braille displays.
  - Manual review of error messages and accessible announcements under edge network conditions.
- Testing with representative users and native assistive-technology users provides valuable additional usability validation, though user testing is not itself a universal WCAG conformance prerequisite.

---

## 4. Performance Lab Diagnostics & Bundle Breakdown

### A. Production Build Profiling
- **Compiler:** Next.js 16.4.5 Turbopack
- **Compilation Time:** `813ms`
- **TypeScript Typecheck:** `1709ms` (0 errors)
- **Static Pages Generated:** 13 pages generated in `649ms`
- **ESLint Status:** `0 errors`, `0 warnings`

### B. Client Bundle Chunk Distribution
| Chunk Name | Size (Uncompressed) | Role |
| :--- | :---: | :--- |
| `3jn_x8ihwq16e.js` | $229.0\text{ KB}$ | Core Vendor Runtime (React 19, Motion, Lucide) |
| `0c1ad7rcpjghx.js` | $169.4\text{ KB}$ | Shared Application Components & Dictionaries |
| `0cz1d0mv5g_q7.js` | $112.6\text{ KB}$ | Projects & Case Studies Dynamic Chunk |
| `3zmkj6fli2cwa.css` | $88.5\text{ KB}$ | Complete Tailwind CSS v4 Stylesheet |
| `07bqv3ytk6yw7.js` | $60.2\text{ KB}$ | Navigation & Layout Components |
| `turbopack-2u1d16houkiyo.js` | $10.0\text{ KB}$ | Turbopack Client Loader |

### C. Core Web Vitals Lab Diagnostics (Reference Targets)
> [!NOTE]
> These figures represent local lab diagnostics under synthetic conditions. Real-world field performance must be measured through live traffic via Chrome User Experience Report (CrUX).

- **Largest Contentful Paint (LCP):** Reference Target $\le 2.5\text{s}$.
  - *Lab Diagnostic:* Preloaded font families (`Plus_Jakarta_Sans`, `Geist`, `Alexandria`, `IBM_Plex_Sans_Arabic`) load with `font-display: swap` and zero external Google CDN roundtrips. Editorial H1 text renders synchronously without layout shifts.
- **Interaction to Next Paint (INP):** Reference Target $\le 200\text{ms}$.
  - *Lab Diagnostic:* Filter chips and dialog triggers avoid heavy synchronous work, utilizing React 19 transitions and lightweight state updates.
- **Cumulative Layout Shift (CLS):** Reference Target $\le 0.1$.
  - *Lab Diagnostic:* Portrait slots and brand marks have fixed aspect ratios (`aspect-square`, `w-7 h-7`), preventing layout jumps during hydration.

---

## 5. Diagnostic Screenshot Inventory

All visual artifacts are persisted in the conversation artifact directory at `<artifactDir>/screenshots/milestone-8/`:

1. `m8-01-home-en-desktop.png` — English Desktop Hero and selected works
2. `m8-02-home-ar-desktop.png` — Arabic Desktop RTL layout mirroring
3. `m8-03-home-ar-mobile.png` — Arabic Mobile layout and zero overflow
4. `m8-04-projects-en-desktop.png` — Projects Catalog with 5 project cards
5. `m8-05-projects-ar-desktop.png` — Arabic Projects Catalog with RTL category chips
6. `m8-06-projects-meshwar-en-desktop.png` — Mishwar Case Study deep-dive
7. `m8-07-projects-meshwar-ar-mobile.png` — Arabic Mishwar Case Study on mobile
8. `m8-08-about-ar-desktop.png` — Arabic About page with degree and certifications
9. `m8-09-contact-ar-mobile.png` — Arabic Contact form and Gaza resilience card
10. `m8-10-not-found-en-desktop.png` — Deliberate 404 English page with navigation
11. `m8-11-not-found-ar-mobile.png` — Deliberate 404 Arabic mobile page
12. `m8-12-320px-reflow-mobile.png` — 320px Reflow mobile view
13. `m8-13-about-en-desktop-lightbox.png` — Certificate Lightbox modal with focus trap
