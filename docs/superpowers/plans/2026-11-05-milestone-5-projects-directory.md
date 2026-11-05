# Milestone 5 — Projects Directory & Case Study Pages Implementation Plan (Revised)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete bilingual Projects Directory (`/projects`) with URL-synced category filtering and dynamic Case Study pages (`/projects/[slug]`) featuring structured editorial technical cards, verified links, and a grounded, 3-layer architecture diagram for Mishwar.

**Architecture:** 
- Next.js App Router static pre-rendering via `generateStaticParams()` for all 5 verified project slugs (`meshwar`, `masar`, `apartment-marketplace`, `orbit`, `university-issues`).
- Dynamic SEO metadata generation via `generateMetadata()` with localized titles, descriptions, and canonical links.
- Client-side category filtering synchronized bidirectionally with URL search parameters (`?category=...`), wrapped in `<Suspense>` to preserve Next.js static generation.
- Structured editorial technical cards presentation for case studies, strictly separating independent builds from team projects, actual contributions from team responsibilities, and verified features from provisional scopes.
- Selective, strictly grounded visual diagram for Mishwar separated into 3 clear engineering concerns: (1) Offline Routing Architecture, (2) Live Location Data Flow with explicit elapsed age indicators, and (3) Deployment & Testing Environment.

**Tech Stack:** Next.js 16.4.5 (App Router, Turbopack), React 19.3.1, TypeScript 5, Tailwind CSS v4, Lucide React 1.69.0, Node.js built-in test runner (`tsx --test`), Puppeteer.

**Spec:** `nabil-dawud-portfolio-master-plan.md` (Consolidated Portfolio Specification Final v4, Section 4 & Section 9.5).

---

## Global Constraints & Verified Principles

- **Zero Speculative Content:** Do not invent metrics, user counts, performance percentages, architecture components, or technical capabilities not in verified data.
- **Classification & Role Integrity:**
  - **Mishwar:** Independent build (AI-assisted), flagship prominence, "GPS Data Freshness Indicators" (explicit elapsed age, e.g. "منذ 3 دقائق"), live demo + public GitHub + CI/CD. Do not claim every feature works offline (only route planning works offline).
  - **Masar:** "ERP Platform for Humanitarian and Development Organizations", role is "Backend Developer within a Project Team", GitHub repository marked as pending/unavailable with lock indicator.
  - **Apartment Maintenance Marketplace:** "Multi-role application architecture with role-specific views", Better Auth, zero unverified RBAC claims.
  - **Orbit:** Backend Developer within a team, JWT authentication, habit & focus tracking, live demo & repo marked unavailable/pending.
  - **University Issues Management:** Academic system developer, status "provisional" with explicit review disclaimer.
- **Bilingual & RTL First:** Identical visual hierarchy, semantic structure, and layout polish in English LTR and Arabic RTL. Directional icons (arrows, chevrons) must properly flip in RTL.
- **Privacy & Security:** Zero private email addresses or credentials exposed in client-side code.
- **Performance & Accessibility:** Semantic HTML5 landmarks (`main`, `article`, `nav`, `section`), WCAG AA color contrast, full keyboard navigation, zero layout shift (CLS = 0), and zero horizontal overflow across mobile (390px) and desktop (1440px).

---

## Project Evidence & Verification Audit Matrix

| Project | Ownership / Role | Implemented & Verified | Planned / Unverified | Repository & Demo Status |
| :--- | :--- | :--- | :--- | :--- |
| **Mishwar (مشوار)** | Independent build (AI-assisted) / Product & Backend Architecture | Offline route graph planner; live corridor vehicle tracking; explicit GPS elapsed age indicators; private charter bidding; privacy-gated messaging; FrankenPHP Caddy runtime; SQLite test harness on CI. | Non-routing features during total blackout (messaging/bidding require network). | **Active Demo:** `meshwar.apps.taqat.academy`<br>**Public GitHub:** `github.com/NabilDawud/meshwar`<br>**CI/CD:** GitHub Actions |
| **Masar** | Backend Developer within a Project Team / Backend Architecture & Data Modeling | Relational schema modeling; organization access control; volunteer & field task APIs; live demo on Taqat cluster. | Full SaaS feature parity; public code repository. | **Active Demo:** `masar-v1.apps.taqat.academy`<br>**GitHub:** Pending confirmation (Locked badge) |
| **Apartment Maintenance** | Full Stack Developer (AI-assisted) / Full Stack Development | Multi-role application with role-specific views (owner, tenant, worker, admin); Next.js 16; Better Auth; Prisma; PostgreSQL; Vercel deployment. | Fine-grained unverified RBAC policies (only role-specific views verified). | **Active Demo:** `apartment-maintenance-marketplace.vercel.app`<br>**Public GitHub:** `github.com/NabilDawud/apartment-maintenance-marketplace` |
| **Orbit** | Backend Developer within a Project Team / Backend APIs & JWT Auth | Laravel REST APIs; stateless JWT auth; database design for habit & focus tracking; AI milestone breakdown integration. | Public live deployment; public source code repository. | **Demo:** Unavailable<br>**GitHub:** Pending confirmation |
| **University Issues** | System Developer / System Development | PHP web architecture; student grievance submission; issue lifecycle tracking; public repository. | Complete feature verification (details marked provisional). | **Demo:** Unavailable<br>**Public GitHub:** `github.com/NabilDawud/University-Issues` |

---

## Mishwar Architecture Diagram Specification

The diagram in `src/components/projects/MishwarArchitectureDiagram.tsx` separates concerns cleanly without conflating infrastructure with offline routing:

1. **Concern 1: Offline Routing Architecture (المخطط بدون إنترنت)**
   - Client-side in-memory route graph of Gaza landmarks and arterial transit corridors (Salah al-Din, Al-Rashid Coastal Road).
   - Local multi-leg itinerary search computed entirely in client JavaScript.
   - Zero server requests required once cached; works during complete internet outages.
   - *Clear scope boundary:* Clarifies that offline execution applies specifically to route search, not to live bidding or messaging.

2. **Concern 2: Live Location Data Flow (تتبع المواقع ومؤشرات الحداثة)**
   - Active vehicle corridor updates sent to client when network connectivity is available.
   - **GPS Data Freshness Indicators:** Displays last-known GPS coordinates with explicit elapsed age indicators (e.g. *"Last location: Kuwait Roundabout, 3 mins ago"* / *"آخر موقع: دوار الكويت، منذ 3 دقائق"*).
   - Eliminates speculative algorithmic arrival times under unstable cellular conditions.
   - Privacy-gated messaging and dialer integration for direct coordination.

3. **Concern 3: Deployment & Testing Environment (بيئة التشغيل والنشر)**
   - Application Server: **FrankenPHP / Caddy** worker runtime for PHP 8.4 / Laravel 13.
   - Isolated Test Harness: In-memory SQLite suite replicating MySQL production constraints in automated GitHub Actions CI.
   - Deployment: Continuous delivery pipeline deploying verified builds to **Dokku**.

---

## Review Focus & Edge Cases

1. **URL Parameter Sync Edge Case:** When an invalid or unrecognized `?category=invalid` parameter is passed in the URL, the directory must gracefully fall back to "all" without crashing or showing a broken blank screen.
2. **Dynamic Route 404 Handling:** Navigating to an unrecognized slug like `/projects/unknown-slug` must trigger Next.js `notFound()` rather than throwing a runtime error or rendering an empty template.
3. **Mishwar Architecture Diagram Accuracy:** Every node and label in the diagram must represent verified functionality without inventing numerical freshness thresholds or speculative cloud services.
4. **Adjacent Case Study Navigation:** The next/previous navigation at the bottom of `/projects/[slug]` must properly cycle or clamp across the 5 projects without index-out-of-bounds errors or broken links.
5. **RTL Directional Flipping:** In Arabic mode (`dir="rtl"`), back arrows, case study progression chevrons, and timeline ribbons must point in the correct reading direction.
6. **Next.js Async Params Contract:** In Next.js 16 App Router, `params` in dynamic page routes and `generateMetadata` is an async Promise (`await params`). Must be awaited properly to avoid runtime type errors.

---

## Out of Scope

- Remote Git pushing (`git push`) or remote cloud deployments.
- Committing code without explicit user instruction.
- Milestone 6 deliverables: About page, university degree deep-dive, Tawjihi 99.1% highlight, certificate gallery, and image lightbox.
- Milestone 7 deliverables: Contact form page (`/contact`), Resend API integration, spam protection, and rate limiting.
- Inventing new project categories beyond `"flagship"`, `"backend-api"`, `"fullstack"`, and `"academic"`.
- Speculative architectural diagrams for projects other than Mishwar.
- Unverified RBAC claims for Apartment Maintenance Marketplace.
- Fabricated numerical GPS staleness thresholds (e.g. `<30s`, `>2m`).

---

## File Structure Plan

```text
src/
├── data/
│   ├── projects.ts             # Audited project data (5 verified projects)
│   ├── projects-helpers.ts     # Pure helper functions: getProjectBySlug, getAdjacentProjects, filterProjects
│   └── types.ts                # Project, ProjectCategory, ProjectVerificationStatus interfaces
├── i18n/
│   └── dictionaries/
│       ├── en.ts               # Added helper dictionary keys for navigation & diagram
│       └── ar.ts               # Added Arabic dictionary keys for navigation & diagram
├── components/
│   └── projects/
│       ├── ProjectsDirectoryContent.tsx  # Interactive catalog with filter tabs & project grid
│       ├── MishwarArchitectureDiagram.tsx # Grounded 3-concern diagram (offline, live, infra)
│       ├── CaseStudyView.tsx             # Structured editorial technical cards template
│       ├── CaseStudyHeader.tsx           # Title, badges, role pill & verified action ribbon
│       ├── CaseStudyNav.tsx              # Next / Previous project switcher
│       └── index.ts                      # Barrel export
└── app/
    └── projects/
        ├── page.tsx                      # /projects route with Suspense & metadata
        └── [slug]/
            └── page.tsx                  # /projects/[slug] route with generateStaticParams & generateMetadata

tests/
└── projects/
    ├── data-helpers.contract.test.ts     # Tests slug resolution, filtering, and boundary handling
    ├── directory-page.contract.test.ts   # Tests directory rendering, filter matching, and URL sync
    ├── case-study-route.contract.test.ts # Tests dynamic route resolution, static params, and 404
    └── browser-qa-projects.mjs          # Puppeteer visual QA across 4 scenarios (EN/AR x Desktop/Mobile)
```

---

## Sequential Implementation Tasks (Native Sequential Execution)

### Task 1: Project Data Audit & Pure Helper Functions

**Files:**
- Create: `src/data/projects-helpers.ts`
- Modify: `src/i18n/dictionaries/en.ts`
- Modify: `src/i18n/dictionaries/ar.ts`
- Test: `tests/projects/data-helpers.contract.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export function getAllProjects(): Project[];
  export function getProjectBySlug(slug: string): Project | undefined;
  export function getAdjacentProjects(currentSlug: string): { prev: Project; next: Project } | undefined;
  export function filterProjectsByCategory(category: string): Project[];
  export function isValidCategory(category: string): category is ProjectCategory | "all";
  ```

- [ ] **Step 1: Write the failing contract test**
  In `tests/projects/data-helpers.contract.test.ts`:
  - `getAllProjects()` returns all 5 projects.
  - `getProjectBySlug("meshwar")` returns Mishwar with status `"verified-production"`.
  - `getProjectBySlug("masar")` returns Masar with `links.github === undefined` and disclaimer.
  - `getProjectBySlug("apartment-marketplace")` contains no unverified RBAC claims.
  - `getProjectBySlug("orbit")` returns Orbit with `status: "verified-code"`.
  - `getProjectBySlug("university-issues")` returns project with `status: "provisional"`.
  - `getProjectBySlug("unknown-slug")` returns `undefined`.
  - `getAdjacentProjects("meshwar")` returns valid adjacent prev/next project objects.
  - `filterProjectsByCategory("flagship")` returns 2 projects.
  - `filterProjectsByCategory("backend-api")` returns 1 project.
  - `filterProjectsByCategory("fullstack")` returns 1 project.
  - `filterProjectsByCategory("academic")` returns 1 project.
  - `filterProjectsByCategory("all")` or invalid category returns all 5 projects.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx tsx --test tests/projects/data-helpers.contract.test.ts`
  Expected: FAIL with "Cannot find module '@/data/projects-helpers'"

- [ ] **Step 3: Implement `src/data/projects-helpers.ts` and update dictionary keys**
  - Implement pure helper functions using `projects` from `@/data/projects`.
  - In `src/i18n/dictionaries/en.ts` and `ar.ts`, add helper keys:
    - `projects.nextProject`: "Next Project" / "المشروع التالي"
    - `projects.prevProject`: "Previous Project" / "المشروع السابق"
    - `projects.allCount`: "All" / "الكل"
    - `projects.caseStudy.architectureDiagramTitle`: "Offline Routing & State Telemetry Architecture" / "معمارية التوجيه دون اتصال وتتبع حداثة الحالة"
    - `projects.caseStudy.architectureDiagramSubtitle`: "Grounded 3-concern model: offline route planning, live location indicators, and runtime environment." / "نموذج ثلاثي موثق: تخطيط المسارات دون إنترنت، مؤشرات حداثة الموقع الحي، وبيئة التشغيل."
    - `projects.caseStudy.concernOfflineTitle`: "1. Offline Route Graph Planning" / "1. تخطيط شبكة المسارات دون إنترنت"
    - `projects.caseStudy.concernLiveTitle`: "2. Live Location & Freshness Indicators" / "2. تتبع المواقع الحية ومؤشرات الحداثة"
    - `projects.caseStudy.concernInfraTitle`: "3. Deployment & Testing Environment" / "3. بيئة التشغيل والاختبار والنشر"

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx tsx --test tests/projects/data-helpers.contract.test.ts`
  Expected: PASS

---

### Task 2: Projects Directory Component & Filter URL Synchronization

**Files:**
- Create: `src/components/projects/ProjectsDirectoryContent.tsx`
- Create: `src/components/projects/index.ts`
- Test: `tests/projects/directory-page.contract.test.ts`

**Interfaces:**
- Consumes: `useLanguage()`, `filterProjectsByCategory`, `isValidCategory`, `projects`
- Produces: `<ProjectsDirectoryContent />` client component

- [ ] **Step 1: Write the failing contract test**
  In `tests/projects/directory-page.contract.test.ts`, test that:
  - Component exports cleanly.
  - Filter category tabs match the 5 allowed categories (`all`, `flagship`, `backend-api`, `fullstack`, `academic`).
  - Flagship card layout applies subtle prominence styling for Mishwar without obscuring other projects.
  - Masar card renders pending repository lock badge and no broken link.
  - Each project card links to `/projects/[slug]`.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx tsx --test tests/projects/directory-page.contract.test.ts`
  Expected: FAIL with "Cannot find module '@/components/projects'"

- [ ] **Step 3: Implement `ProjectsDirectoryContent.tsx`**
  - Read initial category from `useSearchParams()`.
  - Synchronize active filter tab with `window.history.pushState` or `router.replace` without page reload.
  - Accessible tablist with `role="tablist"` / `role="tab"`, `aria-selected`, and keyboard focus styling.
  - Render project count badge inside each tab (e.g. `All (5)`, `Flagship (2)`).
  - Subtle flagship prominence for Mishwar (champagne gold hairline border, flagship badge, active link ribbon).
  - Balanced responsive grid for all projects (`grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8`).
  - Fall back to `"all"` gracefully if URL has unknown category.
  - Export via `src/components/projects/index.ts`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx tsx --test tests/projects/directory-page.contract.test.ts`
  Expected: PASS

---

### Task 3: Projects Directory Page & App Router Integration

**Files:**
- Create: `src/app/projects/page.tsx`
- Test: `tests/projects/directory-page.contract.test.ts`

**Interfaces:**
- Produces: `export const metadata: Metadata`, `export default function ProjectsPage()`

- [ ] **Step 1: Write the failing integration test**
  Verify `src/app/projects/page.tsx` exports metadata and wraps `ProjectsDirectoryContent` in `<Suspense>` to preserve Next.js static generation.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx tsx --test tests/projects/directory-page.contract.test.ts`
  Expected: FAIL (file does not exist)

- [ ] **Step 3: Implement `src/app/projects/page.tsx`**
  - Export static metadata: `title: "Projects | Nabil Dawud"`, `description: "Explore backend architectures, offline-first systems, and verified software engineering projects by Nabil Dawud."`
  - Canonical URL: `/projects`.
  - Render container with `<Suspense fallback={<DirectorySkeleton />}>`.
  - Embed `<ProjectsDirectoryContent />`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx tsx --test tests/projects/directory-page.contract.test.ts`
  Expected: PASS

---

### Task 4: Technically Grounded Mishwar Diagram Component

**Files:**
- Create: `src/components/projects/MishwarArchitectureDiagram.tsx`
- Modify: `src/components/projects/index.ts`
- Test: `tests/projects/mishwar-diagram.contract.test.ts`

**Interfaces:**
- Produces: `<MishwarArchitectureDiagram />`

- [ ] **Step 1: Write the failing test**
  In `tests/projects/mishwar-diagram.contract.test.ts`, test that:
  - Diagram renders the 3 separate concerns:
    1. Offline Routing Architecture (client route graph cache, zero-network graph search, clear boundary that other features require network).
    2. Live Location Data Flow (explicit GPS elapsed age indicator e.g. "منذ 3 دقائق", corridor tracking, privacy-gated messaging).
    3. Deployment & Testing Environment (FrankenPHP / Caddy application server, automated SQLite CI test harness, Dokku deployment).
  - No invented numerical freshness thresholds (`<30s`, `>2m`).
  - No speculative cloud services (Redis clusters, Kafka, Kubernetes).
  - Fully bilingual (English and Arabic titles/descriptions).

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx tsx --test tests/projects/mishwar-diagram.contract.test.ts`
  Expected: FAIL with "Cannot find module"

- [ ] **Step 3: Implement `MishwarArchitectureDiagram.tsx`**
  - Build clean, responsive SVG + HTML structured technical cards illustrating the 3 verified layers.
  - Visual indicators for offline route search, GPS age indicator, and FrankenPHP runtime.
  - Fully responsive, accessible with `aria-label` and semantic structure.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx tsx --test tests/projects/mishwar-diagram.contract.test.ts`
  Expected: PASS

---

### Task 5: Case Study View Component & Structured Editorial Cards

**Files:**
- Create: `src/components/projects/CaseStudyHeader.tsx`
- Create: `src/components/projects/CaseStudyNav.tsx`
- Create: `src/components/projects/CaseStudyView.tsx`
- Modify: `src/components/projects/index.ts`
- Test: `tests/projects/case-study-view.contract.test.ts`

**Interfaces:**
- Consumes: `Project`, `useLanguage()`, `getAdjacentProjects`
- Produces: `<CaseStudyView project={project} />`

- [ ] **Step 1: Write the failing test**
  In `tests/projects/case-study-view.contract.test.ts`, test that:
  - Header displays title, tagline, category, ownership badge, and verification status.
  - Masar renders unavailable repository notice with locked icon and no broken link.
  - Mishwar conditionally embeds `MishwarArchitectureDiagram`.
  - Non-Mishwar projects render editorial architecture cards without speculative diagrams.
  - All editorial sections render when data is present: Overview, Problem & Objectives, Role & Contributions, Architecture & Decisions, Key Features, Challenges & Lessons Learned, Tech Stack, Disclaimers.
  - Bottom navigation links to valid next and previous projects.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx tsx --test tests/projects/case-study-view.contract.test.ts`
  Expected: FAIL with "Cannot find module"

- [ ] **Step 3: Implement `CaseStudyHeader.tsx`, `CaseStudyNav.tsx`, and `CaseStudyView.tsx`**
  - Implement `CaseStudyHeader.tsx`: Breadcrumb back link, category & status badges, display title, tagline, role pill, action ribbon with live demo, GitHub (or lock badge), and CI/CD link.
  - Implement `CaseStudyView.tsx`: Structured editorial technical cards using graphite container styling (`bg-graphite/40 border-border-subtle/80 hover:border-border-subtle`), champagne gold accents, teal highlights for verified status.
  - Implement `CaseStudyNav.tsx`: Bottom navigation to previous and next projects with title and category preview. RTL-aware chevron icons.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx tsx --test tests/projects/case-study-view.contract.test.ts`
  Expected: PASS

---

### Task 6: Dynamic Case Study Route (`/projects/[slug]`)

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Test: `tests/projects/case-study-route.contract.test.ts`

**Interfaces:**
- Produces:
  ```typescript
  export function generateStaticParams(): { slug: string }[];
  export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata>;
  export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }): Promise<React.JSX.Element>;
  ```

- [ ] **Step 1: Write the failing test**
  In `tests/projects/case-study-route.contract.test.ts`, test:
  - `generateStaticParams()` returns exactly 5 slugs: `["meshwar", "masar", "apartment-marketplace", "orbit", "university-issues"]`.
  - `generateMetadata()` returns accurate project title and description for valid slugs.
  - `ProjectCaseStudyPage` invokes `notFound()` when given an invalid slug.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npx tsx --test tests/projects/case-study-route.contract.test.ts`
  Expected: FAIL with "Cannot find module"

- [ ] **Step 3: Implement `src/app/projects/[slug]/page.tsx`**
  - Implement `generateStaticParams` iterating over `projects`.
  - Implement `generateMetadata` fetching project via `getProjectBySlug(slug)` and awaiting `params`.
  - Implement default export awaiting `params` (`const { slug } = await params`).
  - If project not found, call `notFound()`.
  - Render `<CaseStudyView project={project} />`.

- [ ] **Step 4: Run test to verify it passes**
  Run: `npx tsx --test tests/projects/case-study-route.contract.test.ts`
  Expected: PASS

---

### Task 7: Comprehensive Verification & Headless Browser QA

**Files:**
- Create: `tests/browser-qa-projects.mjs`
- Test: Entire test suite + Puppeteer visual QA

- [ ] **Step 1: Run complete automated test suite**
  Run: `npm test`
  Expected: All existing home tests + new project contract tests pass (100% green).

- [ ] **Step 2: Run ESLint**
  Run: `npm run lint`
  Expected: 0 errors, 0 warnings.

- [ ] **Step 3: Run Next.js production build**
  Run: `npm run build`
  Expected: Successful production build with static generation for `/projects` and all 5 `/projects/[slug]` routes.

- [ ] **Step 4: Run Puppeteer browser QA across 4 viewports**
  In `tests/browser-qa-projects.mjs`, launch headless Chrome and test:
  1. English Desktop (1440px): `/projects` catalog, filter tab clicking, `/projects/meshwar` case study.
  2. English Mobile (390px): `/projects` catalog, mobile filter pills, `/projects/masar` case study.
  3. Arabic Desktop (1440px): `/projects` RTL layout, Arabic filters, `/projects/meshwar` with Arabic diagram.
  4. Arabic Mobile (390px): `/projects` RTL layout, Arabic case study, verified zero horizontal overflow (`scrollWidth <= clientWidth`).
  Capture screenshots to artifacts directory.

- [ ] **Step 5: Code review check**
  Invoke `requesting-code-review` and `verification-before-completion` to verify that no fabricated metrics, unverified RBAC claims, or broken links were introduced.

---

## Risks & Mitigation Matrix

| Identified Risk | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Next.js 16 `useSearchParams()` static bailout** | Could de-optimize static rendering of `/projects` page | Wrap `ProjectsDirectoryContent` in `<Suspense fallback={<DirectorySkeleton />}>` in `src/app/projects/page.tsx`. |
| **Next.js 16 async `params` in dynamic routes** | Runtime type error if accessed synchronously | Strictly await `params` (`const { slug } = await params`) in both `generateMetadata` and `ProjectCaseStudyPage`. |
| **RTL Arrow/Chevron direction inversions** | Icons pointing backwards in Arabic mode | Use conditional `isRTL ? "rotate-180" : ""` for directional indicators (`ArrowLeft`, `ArrowRight`, `ChevronRight`). |
| **Unverified numerical freshness thresholds** | Overstating accuracy in Mishwar case study | Ground diagram strictly in explicit elapsed age concept (e.g. *"منذ 3 دقائق"*) directly from Mishwar's verified README and implementation. |
