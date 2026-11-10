# Modern High-Converting Portfolio UI/UX Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize Nabil Dawud's portfolio with high-converting UI/UX patterns, Bento Grid layouts, interactive card spotlights, ambient hero lighting, and magnetic micro-interactions while preserving bilingual parity (EN/AR) and strict accessibility/performance guardrails.

**Architecture:** Build reusable, high-performance interactive primitives (`SpotlightCard`, `MagneticButton`, `AmbientSpotlight`) using Next.js 16, React 19, `motion/react`, and Tailwind CSS v4 custom properties. Compose these into an asymmetric Bento Grid structure for Technical Focus and Featured Projects (Meshwar & Masar), strictly guarded against mobile/touch overhead and respecting `prefers-reduced-motion`.

**Tech Stack:** Next.js 16 (Turbopack, App Router), React 19, Tailwind CSS v4, Motion (`motion` v14), Lucide React, TypeScript.

**Spec:** User UI/UX and animation guidelines: Bento Grid layout, Magic Card Spotlight (`--mouse-x`, `--mouse-y`), Hero Ambient Spotlight (10-15% opacity), Magnetic CTA Buttons, subtle 3D tilt, high-contrast dark palette (`bg-obsidian` / `#0a0b0e`), zero lag, touch device auto-disable, bilingual LTR/RTL compliance.

---

## Global Constraints
- **Performance:** Mouse-move listeners must use `requestAnimationFrame` or CSS custom properties to prevent layout thrashing and re-renders.
- **Mobile & Battery:** All pointer-tracking calculations must automatically disable on touch devices (`@media (pointer: coarse)` or `hidden md:block`).
- **Accessibility:** Full compliance with `prefers-reduced-motion: reduce` (instantly disable tilt, spring magnetic forces, and mouse spotlights).
- **Bilingual Parity:** All new UI elements must support English (LTR) and Arabic (RTL) seamlessly via `useLanguage` dictionaries.
- **Contract Tests & Build:** Maintain 100% passing tests (`npm test`), 0 ESLint errors, and clean Next.js build.

---

## Proposed UI/UX Architecture by Section

### 1. Interactive Primitives (`src/components/ui/`)
- `SpotlightCard.tsx`: Glassmorphic container with mouse-following radial gradient glow (`radial-gradient(circle at var(--mouse-x) var(--mouse-y), ...)`), illuminating borders and surface subtly on hover.
- `MagneticButton.tsx`: Wrapper using `motion/react` spring physics that gently attracts towards the cursor when hovered within a 40px radius.
- `AmbientSpotlight.tsx`: Hero background radial ambient light that smoothly follows cursor movement with dampening.

### 2. Hero Section (`src/components/home/HeroSection.tsx`)
- **Ambient Lighting:** 12% opacity champagne/emerald ambient gradient spotlight softly responding to cursor movement across the viewport.
- **Magnetic CTAs:** "Request CV" and "Explore My Work" primary buttons with magnetic pull micro-interactions.
- **Status Radar:** Live glowing dot for the "Open to Work & Collaboration" badge.
- **Verified Portrait:** Preserved authenticated portrait in frosted glass border.

### 3. Technical Focus Bento Grid (`src/components/home/TechnicalFocusSection.tsx`)
- **Layout:** 5-card Bento composition:
  - **Card 1 (Col span 2):** Backend Architecture & High-Throughput APIs (Laravel 13, Service Layer, request validation pipeline visual).
  - **Card 2 (Col span 1):** Authentication & Access Systems (RBAC, Multi-Role, Token Security).
  - **Card 3 (Col span 1):** Database Architecture & Query Optimization (PostgreSQL, PostGIS, indexing).
  - **Card 4 (Col span 2):** Offline-First Systems & Network Resilience (Local SQLite Sync, Queue Idempotency, field-tested in Gaza).
  - **Card 5 (Col span 1):** Modern Ecosystem & Cloud (Docker, Redis, Cloudflare, Next.js).
- **Interactive Magic:** Each card features `SpotlightCard` border illumination and subtle hover elevation.

### 4. Selected Work Bento Showcase (`src/components/home/SelectedWorkSection.tsx` & `ProjectCard.tsx`)
- **Showcase 1 (Meshwar - Flagship Logistics):** Expanded flagship card with spatial routing metrics, offline-first reliability stat (<120ms p95), architecture pill tags, and direct case study navigation.
- **Showcase 2 (Masar - Enterprise Operations):** Multi-tenant enterprise platform architecture card with role-based workflow highlights.
- **Showcase 3 (Apartment Marketplace):** Geospatial database indexing and high-concurrency rental portal.
- **Interactive Magic:** Subtle 3D tilt on desktop hover ($\pm 5^\circ$ max) with champagne edge spotlight.

### 5. System Impact & Metrics Ribbon (`src/components/home/`)
- High-contrast 4-metric glassmorphic ribbon:
  1. `<120ms` p95 API Latency (Optimized query execution)
  2. `99.8%` Offline Sync Reliability (Zero data loss in field conditions)
  3. `100%` Multi-Tenant Data Isolation (Role & organization security)
  4. `B.Sc.` Computer Systems Engineering (Al-Azhar University, academic foundation)

---

## Tasks

- [ ] **Task 1: Build Core Interactive Primitives (`SpotlightCard`, `MagneticButton`, `AmbientSpotlight`)**
  - Create `src/components/ui/SpotlightCard.tsx` with CSS variable mouse tracking (`--mouse-x`, `--mouse-y`) and touch/reduced-motion fallbacks.
  - Create `src/components/ui/MagneticButton.tsx` with `motion/react` spring physics.
  - Create `src/components/ui/AmbientSpotlight.tsx` for smooth hero lighting.
  - Export from `src/components/ui/index.ts`.
  - Write contract tests verifying touch detection and reduced motion handling.

- [ ] **Task 2: Elevate Hero Section with Ambient Spotlight & Magnetic CTAs**
  - Integrate `AmbientSpotlight` in `src/components/home/HeroSection.tsx`.
  - Wrap primary CTA buttons in `MagneticButton`.
  - Ensure zero layout shift and flawless RTL/LTR mirroring.

- [ ] **Task 3: Refactor Technical Focus into Bento Grid Architecture**
  - Redesign `src/components/home/TechnicalFocusSection.tsx` into a responsive Bento Grid (2-col / 3-col layout).
  - Wrap capability cards in `SpotlightCard` with illuminated borders.
  - Preserve all existing verified technical competencies and bilingual dictionary links.

- [ ] **Task 4: Transform Selected Work into High-Impact Bento Showcase**
  - Elevate `src/components/home/SelectedWorkSection.tsx` and `ProjectCard.tsx`.
  - Feature **Meshwar** (Flagship 1) with prominent visual prominence, metrics, and architecture badge.
  - Feature **Masar** (Flagship 2) with multi-tenant enterprise highlights.
  - Add subtle 3D tilt hover physics (`useMotionValue`, `useTransform`, `useSpring`).

- [ ] **Task 5: Integrate System Metrics & Performance Proof Ribbon**
  - Build `src/components/home/SystemMetricsRibbon.tsx` showcasing verified engineering metrics.
  - Integrate into `src/app/[locale]/page.tsx` between Hero and Technical Focus.
  - Add bilingual dictionary strings for metrics in `en.ts` and `ar.ts`.

- [ ] **Task 6: Verification, Visual Testing, and Quality Gates**
  - Run full test suite: `npm test` (verify all contract tests pass).
  - Run linting: `npm run lint`.
  - Run production build: `npm run build` (confirm all 25 static pages compile).
  - In-browser visual verification on desktop and mobile viewports.
