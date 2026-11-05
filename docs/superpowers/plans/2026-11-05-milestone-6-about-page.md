# Milestone 6 — About Page & Certificate Lightbox Implementation Plan (Revised)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete bilingual About page (`/about`) featuring Nabil Dawud's professional narrative, prominent Al-Azhar University engineering degree in Computer Systems Engineering (91.44% — Excellent), modest secondary Tawjihi academic highlight (99.1%), disciplined AI-assisted engineering practice, *Beyond the Code*, and an accessible, keyboard-trapped Certificate Lightbox modal for verified credentials with an honest illustrative UI fallback.

**Architecture:** 
- Next.js App Router dynamic on-demand route at `/about` with localized SEO metadata and canonical `/about`.
- Modular UI components in `src/components/about/` rendering verified biographical, academic, and credential data directly from `src/data/education.ts`, `src/data/certifications.ts`, and dictionaries.
- Accessible client-side modal dialog (`role="dialog"`, `aria-modal="true"`) for Certificate Lightbox with runtime focus trap, `Escape` key dismiss, backdrop click dismiss, arrow navigation, body scroll lock, and honest illustrative UI fallback when physical certificate scans are pending.
- Full bilingual Arabic RTL parity (`Alexandria`, `IBM Plex Sans Arabic`, reversed navigation arrows, LTR monospace technical identifiers).

**Tech Stack:** Next.js 16.4.5 (App Router, Turbopack), React 19.3.1, TypeScript 5, Tailwind CSS v4, Lucide React 1.69.0, Node.js built-in test runner (`tsx --test`), Puppeteer Core.

**Spec:** `nabil-dawud-portfolio-master-plan.md` (Consolidated Portfolio Specification Final v4, Section 5, Section 6, and Section 9.6).

---

## Global Constraints

1. **Academic Hierarchy & Verified Phrasing:** 
   - Degree Title: Use the verified degree title **"Computer Systems Engineering"** (do not add "Bachelor of Science" unless official documentation confirms that phrasing).
   - Institution: Al-Azhar University (College of Engineering and Information Technology).
   - Grade: Display **"91.44%"** and **"Excellent"** without adding unsupported honors terminology.
   - Secondary Highlight: General Secondary Certificate (Tawjihi) **99.1%** (Scientific Stream) is displayed as a secondary academic achievement, without inventing claims about its psychological or causal influence on the user's engineering journey.
2. **Zero Fabricated Biography or Images:** All biographical narrative, credentials, grades, training hours, and institutions must strictly match existing verified data in `src/data/education.ts`, `src/data/certifications.ts`, and `src/data/journey.ts`. Zero unverified external employment or credentials.
3. **Certificate Fallback Integrity:** 
   - Physical certificate scans/images (`/assets/certificates/*.webp`) will be supplied later.
   - The temporary SVG/card preview must be clearly presented as an **illustrative UI fallback**, not as a scan or replica of the actual certificate.
   - Do NOT fabricate issuer seals, signatures, stamps, logos, or visual authentication elements.
   - Display strictly verified factual data: Title, Issuer, Training Center (where applicable), Duration (hours), Grade, and Date.
4. **Disciplined AI Methodology Description:** Describe AI tools as part of an AI-assisted engineering workflow with human ownership, planning, and review. Do not imply every tool was used in every project or for every listed activity.
5. **Testing Separation:**
   - Node contract tests verify structural and accessibility implementation contracts only (DOM attributes, exported props, types).
   - Puppeteer browser QA verifies actual runtime interaction behavior: focus trap, focus return, Escape dismissal, body scroll lock/restore, arrow key navigation, and RTL keyboard handling.
6. **Strict Bilingual Parity:** English and Arabic dictionaries must achieve 100% key parity with authentic RTL typography, reversed directional controls, and zero horizontal scroll overflow.

---

## Review Focus

1. **Runtime Focus Trap & Return:** Opening the lightbox in a real browser must trap `Tab`/`Shift+Tab` focus inside the dialog and return focus to the specific certificate card button when closed.
2. **Body Scroll Lock Cleanup:** Closing the lightbox via `Escape`, backdrop click, or close button must reliably restore `document.body.style.overflow = ""`.
3. **Illustrative Fallback Honesty:** When `/assets/certificates/*.webp` is absent on disk, the lightbox displays a clean metadata card with verified details, explicitly labeled as a credential summary preview pending physical scan upload.
4. **Keyboard Arrow Switching:** In the lightbox, `ArrowRight` and `ArrowLeft` keys cycle through certificates in order, respecting RTL direction inversion.
5. **Mobile Viewport Overflow:** Dialog and credential cards must scale dynamically (`max-w-[90vw] max-h-[85vh] object-contain`) with zero horizontal overflow on 390px mobile viewports.

---

## 1. Page Content Architecture & Sections

The `/about` page is partitioned into 6 structured, accessible sections:

| Section | Component | Source Data | Description & Design Notes |
| :--- | :--- | :--- | :--- |
| **1. Hero & Philosophy** | `AboutHeroSection.tsx` | Dictionaries (`about.sectionBadge`, `sectionTitle`, `sectionSubtitle`) | Executive introduction, engineering philosophy, and Gaza resilient systems context. |
| **2. University Degree** | `AcademicCredentialsSection.tsx` (Primary) | `src/data/education.ts` | Prominent card: Al-Azhar University, Computer Systems Engineering, 91.44% — Excellent, 5-year engineering curriculum. |
| **3. Secondary Academic Highlight** | `AcademicCredentialsSection.tsx` (Secondary) | `src/data/education.ts` (`tawjihiHighlight`) | Secondary academic highlight: General Secondary Certificate (Tawjihi) 99.1% Scientific Stream. |
| **4. Verified Certifications Gallery** | `CertificationsGallery.tsx`<br>`CertificateLightbox.tsx` | `src/data/certifications.ts` | 2 verified credentials (Ministry of Education Web Dev 230h, BBD Select Backend). Interactive card triggers accessible Lightbox modal. |
| **5. AI-Assisted Engineering Practice** | `AiWorkflowSection.tsx` | Dictionaries & Master Spec Section 5.6 | Grounded AI-assisted engineering methodology: planning, testing, and review amplification under strict human ownership. |
| **6. Beyond the Code** | `BeyondCodeSection.tsx` | Dictionaries (`about.beyondCodeText`) | Personal values: analytical problem-solving, structured learning, and building resilient community infrastructure. |

---

## 2. Component & Interface Specifications

### A. Data Helper & Types (`src/data/certifications-helpers.ts`)
```typescript
import { certifications } from "./certifications";
import { Certification } from "./types";

export function getAllCertifications(): Certification[] {
  return certifications;
}

export function getCertificationById(id: string): Certification | undefined {
  return certifications.find((c) => c.id === id);
}

export function getAdjacentCertification(
  currentId: string
): { prev: Certification; next: Certification } | undefined {
  const index = certifications.findIndex((c) => c.id === currentId);
  if (index === -1) return undefined;
  const total = certifications.length;
  return {
    prev: certifications[(index - 1 + total) % total],
    next: certifications[(index + 1) % total],
  };
}
```

### B. Certificate Lightbox Modal (`src/components/about/CertificateLightbox.tsx`)
```typescript
interface CertificateLightboxProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}
```
- Implements `role="dialog"`, `aria-modal="true"`, `aria-labelledby="lightbox-title"`.
- Focus trap inside `ref={modalRef}` using `keydown` listener for `Tab` and `Shift+Tab`.
- Global `keydown` handler for `Escape`, `ArrowLeft`, and `ArrowRight`.
- Locks `document.body.style.overflow = "hidden"` while open, restores on close/unmount.
- Restores focus to the triggering button upon close via `triggerRef`.
- **Illustrative UI Fallback:** If the image fails to load or is not yet supplied, renders a clean illustrative card with verified title, issuer, dates, duration, and grade, labeled clearly as an illustrative credential preview. Zero fabricated seals or signatures.

---

## 3. Step-by-Step Implementation Tasks

### Task 1: Milestone 6 Data Helpers & Dictionary Expansions
**Files:**
- Create: `src/data/certifications-helpers.ts`
- Modify: `src/i18n/dictionaries/en.ts`
- Modify: `src/i18n/dictionaries/ar.ts`
- Test: `tests/about/certifications-helpers.contract.test.ts`

- [ ] **Step 1.1: Write failing contract test**
  - Verify `getAllCertifications()` returns 2 verified certificates.
  - Verify `getCertificationById()` retrieves by ID and returns `undefined` for invalid IDs.
  - Verify `getAdjacentCertification()` returns circular navigation.
  - Verify bilingual dictionary keys for all 6 About sections exist and match.
- [ ] **Step 1.2: Run test to verify RED**
  - Command: `npx tsx --test tests/about/certifications-helpers.contract.test.ts`
- [ ] **Step 1.3: Implement `src/data/certifications-helpers.ts` and expand dictionaries**
- [ ] **Step 1.4: Run test to verify GREEN**
  - Command: `npx tsx --test tests/about/certifications-helpers.contract.test.ts`

---

### Task 2: About Page Modular Components Implementation
**Files:**
- Create: `src/components/about/AboutHeroSection.tsx`
- Create: `src/components/about/AcademicCredentialsSection.tsx`
- Create: `src/components/about/CertificationsGallery.tsx`
- Create: `src/components/about/CertificateLightbox.tsx`
- Create: `src/components/about/AiWorkflowSection.tsx`
- Create: `src/components/about/BeyondCodeSection.tsx`
- Create: `src/components/about/index.ts`
- Test: `tests/about/about-sections.contract.test.ts`

- [ ] **Step 2.1: Write failing contract test for section rendering contracts**
  - Test university degree card asserts "Computer Systems Engineering", Al-Azhar University, 91.44%, and Excellent.
  - Test Tawjihi 99.1% secondary placement.
  - Test 2 certifications rendered with lightbox trigger buttons.
  - Test structural attributes of `CertificateLightbox` (`role="dialog"`, `aria-modal="true"`).
  - Test illustrative fallback mode when physical image is absent.
  - Test AI methodology and Beyond the Code sections.
- [ ] **Step 2.2: Run test to verify RED**
  - Command: `npx tsx --test tests/about/about-sections.contract.test.ts`
- [ ] **Step 2.3: Implement components in `src/components/about/`**
- [ ] **Step 2.4: Run test to verify GREEN**
  - Command: `npx tsx --test tests/about/about-sections.contract.test.ts`

---

### Task 3: App Router Route Integration (`/about`)
**Files:**
- Create: `src/app/about/page.tsx`
- Test: `tests/about/about-route.contract.test.ts`

- [ ] **Step 3.1: Write failing contract test for `/about` route**
  - Verify exported metadata (`title`, `description`, canonical `/about`).
  - Verify page exports default component assembling all 6 sections.
- [ ] **Step 3.2: Run test to verify RED**
  - Command: `npx tsx --test tests/about/about-route.contract.test.ts`
- [ ] **Step 3.3: Implement `src/app/about/page.tsx`**
- [ ] **Step 3.4: Run test to verify GREEN**
  - Command: `npx tsx --test tests/about/about-route.contract.test.ts`

---

### Task 4: Runtime Browser QA & Interaction Verification Script
**Files:**
- Create: `tests/browser-qa-about.mjs`

- [ ] **Step 4.1: Create Puppeteer automation script testing:**
  1. English Desktop (1440px) `/about` rendering and layout.
  2. English Mobile (390px) `/about` rendering and responsive card stacking.
  3. Arabic Desktop (1440px, RTL) typography and directionality.
  4. Arabic Mobile (390px, RTL) zero horizontal overflow check (`scrollWidth <= clientWidth`).
  5. **Runtime Lightbox Interactions:**
     - Clicking certificate card opens lightbox dialog.
     - `Tab` and `Shift+Tab` focus cycles strictly inside the modal dialog (focus trap).
     - Pressing `Escape` closes the lightbox.
     - Focus reliably returns to the originating certificate card trigger button.
     - `document.body.style.overflow` is set to `"hidden"` while open and restored to `""` on close.
     - `ArrowRight` and `ArrowLeft` navigate adjacent certificates in both LTR and RTL.
  6. Degree 91.44% prominent display and Tawjihi 99.1% secondary placement verification.
  7. Verification of illustrative UI fallback when image assets are pending.
  8. Capture screenshots to artifact directory.

---

### Task 5: Full Verification, Lint, Build & Code Review
- [ ] **Step 5.1: Run full contract test suite (`npm test`)**
- [ ] **Step 5.2: Run ESLint (`npm run lint`)**
- [ ] **Step 5.3: Run production build (`npm run build`)**
- [ ] **Step 5.4: Execute `node tests/browser-qa-about.mjs`**
- [ ] **Step 5.5: Dispatch Senior Code Reviewer subagent for independent branch audit**
- [ ] **Step 5.6: Deliver comprehensive Milestone 6 evidence report to user**

---

## 4. Exact File Inventory for Milestone 6

### New Files to Create (14 files):
1. `docs/superpowers/plans/2026-11-05-milestone-6-about-page.md` (this plan)
2. `src/data/certifications-helpers.ts` (pure helpers)
3. `src/components/about/AboutHeroSection.tsx` (hero & philosophy)
4. `src/components/about/AcademicCredentialsSection.tsx` (degree 91.44% + Tawjihi 99.1%)
5. `src/components/about/CertificationsGallery.tsx` (gallery with trigger buttons)
6. `src/components/about/CertificateLightbox.tsx` (accessible modal dialog)
7. `src/components/about/AiWorkflowSection.tsx` (disciplined AI engineering methodology)
8. `src/components/about/BeyondCodeSection.tsx` (values & personal context)
9. `src/components/about/index.ts` (barrel export)
10. `src/app/about/page.tsx` (App Router route with metadata)
11. `tests/about/certifications-helpers.contract.test.ts` (Node contract test)
12. `tests/about/about-sections.contract.test.ts` (Node contract test)
13. `tests/about/about-route.contract.test.ts` (Node contract test)
14. `tests/browser-qa-about.mjs` (Puppeteer browser QA script)

### Existing Files to Modify (2 files — Dictionaries Only):
15. `src/i18n/dictionaries/en.ts`
16. `src/i18n/dictionaries/ar.ts`

**Total Unique Paths in Milestone 6:** Exactly **16 paths** (14 new + 2 modified).
