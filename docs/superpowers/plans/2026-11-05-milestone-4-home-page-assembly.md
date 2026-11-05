# Home Page Assembly (Milestone 4) Implementation Plan (Revised)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Assemble the production-grade, bilingual (EN/AR RTL), accessible, and responsive Home page for Nabil Dawud's portfolio containing the Hero section with modular portrait slot placeholder, verified Technical Focus section (`#focus`), Selected Work showcase cards (`#selected-work`), Professional Journey preview (`#journey`), Education preview, and Conversion CTA.

**Architecture:** A modular client component structure situated under `src/components/home/` where each visual section is a focused, self-contained component consuming strongly typed centralized models (`src/data/`) and localized strings (`src/i18n/`). The page layout (`src/app/page.tsx`) orchestrates the sections in logical narrative order, supporting smooth anchor navigation (`#focus`, `#journey`, `#selected-work`), hardware-accelerated restrained entry animations via Motion respecting `prefers-reduced-motion`, and complete layout direction reversal (`dir="ltr"` / `dir="rtl"`).

**Tech Stack:** Next.js 16.4.5 (App Router, Turbopack), React 19.3.1, TypeScript 5, Tailwind CSS v4.3.4, Motion 14.9.1, Lucide React 1.69.0.

**Spec:** `C:\Users\NabilDawud\.gemini\antigravity-cli\brain\618aa22c-1e10-423b-81ed-064543920f42\nabil-dawud-portfolio-master-plan.md`

---

## Global Constraints & Clarifications

1. **Contact CTA Scope & Privacy:**
   - The primary CTA button links strictly to `/contact` (`<Button href="/contact">...`).
   - **NO `mailto:` link.**
   - **NO public email address displayed anywhere on the page.**
   - The actual contact form and Resend API handler are NOT implemented in Milestone 4 (they belong strictly to Milestone 7).
2. **Hero Portrait Slot Placeholder:**
   - `<HeroPortraitSlot />` remains an architectural, geometric ND monogram placeholder card with subtle champagne ambient glow and border framing.
   - Do NOT generate, embed, or use any fabricated personal portrait image.
3. **Skill-to-Project Associations:**
   - Every skill association is strictly tied to verified project evidence in `src/data/skills.ts` and `src/data/projects.ts`.
   - **Laravel Sanctum** is presented as a backend competency without assigning it to unconfirmed projects.
   - **Apartment Maintenance Marketplace** is presented strictly as a multi-role maintenance platform (with Better Auth); do NOT claim RBAC.
   - **Mishwar (مشوار)** strictly uses the exact phrase *"GPS Data Freshness Indicators"*; do NOT use "Staleness Telemetry".
4. **Professional Journey Representation:**
   - Clearly presents team development (e.g. Masar, Orbit), technical training programs (e.g. NetLoopers, Ministry of Education 230h diploma), and academic distinction (Al-Azhar University) as distinct milestones.
   - Does NOT claim or imply formal employment where project-based collaboration or training occurred.
   - Clearly identifies individual backend contributions within collaborative teams (especially Masar).
5. **Academic Hierarchy on Home Page:**
   - Subtle narrative reference in the Hero (*"Computer Systems Engineering graduate from Al-Azhar University"*).
   - No dominant percentage badge in the Hero (the 91.44% — Excellent distinction and 99.1% Tawjihi are featured in Education preview / About page).
6. **CV Action State:**
   - Uses centralized `cvConfig` from `src/data/personal.ts` with `isAvailable: false`. Displays the accessible status pill *"CV available upon request"* / *"السيرة الذاتية متاحة عند الطلب"* without broken links or premature redirects.
7. **Motion Restraint & Reduced Motion:**
   - Uses subtle, restrained transitions (subtle fade and slight Y-axis offset) via Motion.
   - Explicitly respects `prefers-reduced-motion` to disable transforms for users with motion sensitivity.
8. **Arabic RTL Layout Fidelity:**
   - Complete layout mirroring: flex orders, text alignment (`text-start`), icon chevrons (`rotate-180`), timeline margins, and card grids flip naturally without horizontal layout shifts or scrollbar leaks.
9. **Visual Design System:**
   - Adheres strictly to the 60-30-10 Dark Luxury tokens: Deep Obsidian (`#090B0A`), Graphite (`#191A17`), Champagne Gold (`#B7A477`), Muted Teal (`#58B8B0`), Warm Ivory (`#F4F1E9`), and Muted Sand (`#A39E93`).

---

## Review Focus

1. **Contact CTA Privacy:** Confirm that no `mailto:` links exist in the CTA section or rendered page, that the personal email is not exposed, and that the button directs strictly to `/contact`.
2. **Modular Portrait Integrity:** Confirm that `<HeroPortraitSlot />` renders the geometric ND Monogram without any placeholder stock images or fabricated photos.
3. **Verified Skill Claims:** Confirm that the Technical Focus section displays exactly 6 capabilities, that Sanctum is not tied to an unverified project, that Apartment Maintenance claims only multi-role workflows, and that Mishwar uses "GPS Data Freshness Indicators".
4. **Team vs. Individual Role Clarity:** Confirm that Masar and Orbit explicitly display team badges and backend contribution roles.
5. **RTL & Motion Compliance:** Confirm that layout directions mirror properly in Arabic without horizontal overflow and that reduced-motion preferences disable transforms.

---

## Exact Files to Create and Modify

```
Create:
  src/components/home/HeroPortraitSlot.tsx
  src/components/home/HeroSection.tsx
  src/components/home/TechnicalFocusSection.tsx
  src/components/home/ProjectCard.tsx
  src/components/home/SelectedWorkSection.tsx
  src/components/home/JourneyPreviewSection.tsx
  src/components/home/EducationPreviewSection.tsx
  src/components/home/ContactCtaSection.tsx
  src/components/home/index.ts
  tests/home/hero.contract.test.ts
  tests/home/technical-focus.contract.test.ts
  tests/home/selected-work.contract.test.ts
  tests/home/journey-education.contract.test.ts
  tests/home/contact-cta.contract.test.ts
  tests/home/page-assembly.contract.test.ts

Modify:
  src/app/page.tsx
  src/i18n/dictionaries/en.ts
  src/i18n/dictionaries/ar.ts
```

---

## Task Decomposition & Execution Order

### Task 1: Modular Hero Section & Portrait Slot Placeholder

**Files:**
- Create: `src/components/home/HeroPortraitSlot.tsx`
- Create: `src/components/home/HeroSection.tsx`
- Modify: `src/i18n/dictionaries/en.ts`
- Modify: `src/i18n/dictionaries/ar.ts`
- Create: `tests/home/hero.contract.test.ts`

**Interfaces:**
- Consumes:
  - `personalBrand`, `cvConfig` from `@/data`
  - `useLanguage` from `@/i18n`
  - `Button`, `Badge` from `@/components/ui`
  - `NDMonogram`, `GithubIcon`, `LinkedinIcon` from `@/components/brand`
- Produces:
  - `HeroPortraitSlot`: Modular architectural placeholder card featuring the geometric ND Monogram framing graphic, status beacon, subtle champagne glow, and hairline border. **Zero fabricated images.**
  - `HeroSection`: Full Hero component with live Muted Teal availability badge (`● Open to Work & Collaboration`), display headline (*"Thoughtful Engineering. Powerful Backends."*), localized supporting copy, subtle Al-Azhar University mention, primary CTA ("Explore My Work" &rarr; `#selected-work`), CV status button (`cvConfig`), and social icons.

- [ ] **Step 1: Write contract test in `tests/home/hero.contract.test.ts`**
  Verify:
  - `personalBrand.headline` and `personalBrand.subheadline` are localized and defined.
  - `cvConfig.isAvailable` is `false` and `cvConfig.statusMessage` has EN and AR text.
  - Academic mention is present in dictionary keys (`t.hero.academicMention` / `t.hero.academicInstitution`).
  - Social profile URLs for GitHub and LinkedIn are valid.
- [ ] **Step 2: Run contract test to verify it executes**
  Run: `node --experimental-strip-types --test tests/home/hero.contract.test.ts`
- [ ] **Step 3: Implement `src/components/home/HeroPortraitSlot.tsx`**
  Construct the modular geometric monogram card container with ambient radial glow, corner accents, and drop-in ready structural sizing.
- [ ] **Step 4: Implement `src/components/home/HeroSection.tsx`**
  Construct the responsive two-column hero layout with Motion entrance animation, live availability badge, and primary action buttons.
- [ ] **Step 5: Run contract test and lint check**
  Run: `node --experimental-strip-types --test tests/home/hero.contract.test.ts` && `npm run lint`

---

### Task 2: Technical Focus Section (`#focus`) with Verified Evidence

**Files:**
- Create: `src/components/home/TechnicalFocusSection.tsx`
- Create: `tests/home/technical-focus.contract.test.ts`

**Interfaces:**
- Consumes:
  - `skillGroups`, `projects` from `@/data`
  - `useLanguage` from `@/i18n`
  - `Badge` from `@/components/ui`
- Produces:
  - `TechnicalFocusSection`: Section with `id="focus"` displaying 6 distinct engineering capabilities mapped directly to verified project evidence:
    1. Backend Architecture & REST APIs (*verified in Mishwar, Orbit*)
    2. Authentication & Access Systems (*JWT: Orbit | OAuth: Mishwar | Org Access: Masar | Multi-Role: Apartment Maintenance | Standalone capability: Laravel Sanctum*)
    3. Relational Databases & Schema Modeling (*MySQL, PostgreSQL, SQLite: Mishwar, Masar, Apartment Maintenance*)
    4. Offline-First & Resilient Systems (*Route Graph Caching & GPS Data Freshness Indicators: Mishwar*)
    5. Modern Full-Stack & Tooling (*Next.js, Blade, Tailwind, Dokku, GitHub Actions CI/CD*)
    6. Responsible AI-Assisted Workflow (*Claude Code, OpenAI Codex, Antigravity, GitHub Copilot*)

- [ ] **Step 1: Write contract test in `tests/home/technical-focus.contract.test.ts`**
  Verify:
  - `skillGroups` contains all 4 technical groups plus AI workflow tools.
  - Laravel Sanctum has `level: "familiar"` and does **not** claim unverified project associations.
  - Apartment Maintenance Marketplace only claims "Multi-Role Workflows", **no RBAC**.
  - Mishwar description and features contain the exact phrase "GPS Data Freshness Indicators", **no "Staleness Telemetry"**.
- [ ] **Step 2: Run contract test to verify it passes**
  Run: `node --experimental-strip-types --test tests/home/technical-focus.contract.test.ts`
- [ ] **Step 3: Implement `src/components/home/TechnicalFocusSection.tsx`**
  Construct grid of capability cards with hairline borders (`border-border-subtle`), subtle hover illumination, concise capability descriptions, and verified project association pills.
- [ ] **Step 4: Run lint and type validation**
  Run: `npm run lint`

---

### Task 3: Selected Work Showcase Cards (`#selected-work`)

**Files:**
- Create: `src/components/home/ProjectCard.tsx`
- Create: `src/components/home/SelectedWorkSection.tsx`
- Create: `tests/home/selected-work.contract.test.ts`

**Interfaces:**
- Consumes:
  - `projects` from `@/data`
  - `useLanguage` from `@/i18n`
  - `Button`, `Badge` from `@/components/ui`
  - `GithubIcon` from `@/components/brand`
  - Icons (`ExternalLink`, `ArrowRight`, `ShieldCheck`, `Layers`, `WifiOff`) from `lucide-react`
- Produces:
  - `ProjectCard`: Elevated card showcasing flagship details: project title, category, role classification badge (e.g., "Independent Build" vs. "Backend Developer — Project Team"), architectural summary, tech pills, and verified links.
  - `SelectedWorkSection`: Section with `id="selected-work"` presenting Mishwar, Masar, and Apartment Maintenance Marketplace, with bottom link to `/projects`.

- [ ] **Step 1: Write contract test in `tests/home/selected-work.contract.test.ts`**
  Verify:
  - `projects` contains `meshwar`, `masar`, and `apartment-marketplace`.
  - Masar is classified as `"ERP Platform for Humanitarian and Development Organizations"`.
  - Masar role is explicitly `"Backend Developer within a project team"`.
  - Masar GitHub is pending (`githubUrl: undefined`); live demo URL is present.
  - Mishwar and Apartment Marketplace have valid GitHub and live demo URLs.
- [ ] **Step 2: Run contract test to verify it passes**
  Run: `node --experimental-strip-types --test tests/home/selected-work.contract.test.ts`
- [ ] **Step 3: Implement `src/components/home/ProjectCard.tsx`**
  Construct flagship card with role indicator, tech pills, verified feature bullets, and accessible action links.
- [ ] **Step 4: Implement `src/components/home/SelectedWorkSection.tsx`**
  Construct section container with section header, grid of cards, and bottom CTA linking to `/projects`.
- [ ] **Step 5: Run lint check**
  Run: `npm run lint`

---

### Task 4: Professional Journey & Education Preview Sections (`#journey`)

**Files:**
- Create: `src/components/home/JourneyPreviewSection.tsx`
- Create: `src/components/home/EducationPreviewSection.tsx`
- Create: `tests/home/journey-education.contract.test.ts`

**Interfaces:**
- Consumes:
  - `journeyEntries`, `education`, `certifications` from `@/data`
  - `useLanguage` from `@/i18n`
  - `Button`, `Badge` from `@/components/ui`
  - Icons (`GraduationCap`, `Award`, `Briefcase`, `Calendar`, `ArrowRight`, `Users`) from `lucide-react`
- Produces:
  - `JourneyPreviewSection`: Section with `id="journey"` displaying chronological milestones distinguishing team development, technical training, and academic foundations. **No formal employment claimed.**
  - `EducationPreviewSection`: Section presenting Al-Azhar University degree (Computer Systems Engineering, 91.44% — Excellent), Ministry of Education diploma (230h), and BBD back-end training, with CTA linking to `/about`.

- [ ] **Step 1: Write contract test in `tests/home/journey-education.contract.test.ts`**
  Verify:
  - `journeyEntries` separates `experience` (practical team builds) from `program` (training) and `education`.
  - No entries claim formal corporate employment.
  - Al-Azhar University degree: "Bachelor of Science in Computer Systems Engineering", "91.44% — Excellent".
  - Certifications: 230-hour Ministry of Education diploma and BBD training.
- [ ] **Step 2: Run contract test to verify it passes**
  Run: `node --experimental-strip-types --test tests/home/journey-education.contract.test.ts`
- [ ] **Step 3: Implement `src/components/home/JourneyPreviewSection.tsx`**
  Construct interactive milestone timeline with type badges ("Team Project", "Training Program", "Academic Foundation") and link to `/about`.
- [ ] **Step 4: Implement `src/components/home/EducationPreviewSection.tsx`**
  Construct elegant preview cards for the university degree and technical training credentials.
- [ ] **Step 5: Run lint check**
  Run: `npm run lint`

---

### Task 5: Privacy-Compliant Conversion CTA & Home Page Assembly

**Files:**
- Create: `src/components/home/ContactCtaSection.tsx`
- Create: `src/components/home/index.ts`
- Modify: `src/app/page.tsx`
- Create: `tests/home/contact-cta.contract.test.ts`
- Create: `tests/home/page-assembly.contract.test.ts`

**Interfaces:**
- Consumes:
  - `HeroSection`, `TechnicalFocusSection`, `SelectedWorkSection`, `JourneyPreviewSection`, `EducationPreviewSection`, `ContactCtaSection` from `@/components/home`
  - `useLanguage` from `@/i18n`
- Produces:
  - `ContactCtaSection`: High-conversion closing banner with headline *"Let's build something scalable together."* / *"لنقم ببناء أنظمة قابلة للتوسع معاً"*, supporting narrative copy, and a single primary button linking directly to `/contact`. **Zero `mailto:` links; zero email addresses exposed.**
  - `src/components/home/index.ts`: Barrel export.
  - `src/app/page.tsx`: Fully assembled Home page with semantic landmarks and anchor targets.

- [ ] **Step 1: Write contract test in `tests/home/contact-cta.contract.test.ts`**
  Verify:
  - `ContactCtaSection` source code does **not** contain `mailto:` or email address strings.
  - Primary button points strictly to `/contact`.
- [ ] **Step 2: Write contract test in `tests/home/page-assembly.contract.test.ts`**
  Verify that all 6 sections are exported from `@/components/home` and correctly integrated into `src/app/page.tsx`.
- [ ] **Step 3: Implement `src/components/home/ContactCtaSection.tsx`**
  Construct conversion panel with Champagne Gold accent styling, clear value proposition, and primary button linking to `/contact`.
- [ ] **Step 4: Create `src/components/home/index.ts` and update `src/app/page.tsx`**
  Assemble the sections in narrative order: Hero &rarr; Technical Focus (`#focus`) &rarr; Selected Work (`#selected-work`) &rarr; Journey Preview (`#journey`) &rarr; Education Preview &rarr; Contact CTA.
- [ ] **Step 5: Run contract tests, lint, and build**
  Run: `npm run lint` && `npm run build`

---

### Task 6: Full Verification, Accessibility, RTL & Motion Audit

**Files:**
- All created and modified files across Tasks 1–5

**Interfaces:**
- End-to-end page verification

- [ ] **Step 1: Run all contract test suites**
  Run: `node --experimental-strip-types --test tests/home/*.contract.test.ts`
  Expected: All test suites PASS (100% pass rate).
- [ ] **Step 2: Run ESLint**
  Run: `npm run lint`
  Expected: 0 errors, 0 warnings.
- [ ] **Step 3: Run Next.js Production Build**
  Run: `npm run build`
  Expected: Turbopack and TypeScript compile cleanly with 0 errors.
- [ ] **Step 4: Verify RTL and Accessibility Invariants**
  - Verify layout mirroring when `locale === "ar"` (flex orders, text alignment `text-start`, chevron rotations).
  - Verify `prefers-reduced-motion` compliance across all Motion wrappers.
  - Verify anchor navigation targets (`#focus`, `#journey`, `#selected-work`) resolve with proper scroll offsets.
  - Verify CV button displays *"CV available upon request"* and does not link to a missing file.
  - Verify zero exposure of email addresses or `mailto:` links.
- [ ] **Step 5: Final review via `verification-before-completion`**
  Check git status, confirm working tree changes, and prepare milestone review report.
