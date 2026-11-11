# Hybrid Inverting Lens & Delicate Stardust Cursor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an interactive custom cursor combining an Awwwards-style inverting lens with delicate, glowing Champagne Gold and Cyber Teal stardust micro-embers across the portfolio.

**Architecture:** Client-only React component (`<CustomCursor />`) using the existing `useInteractiveMotion` hook (`(pointer: fine)` & `!prefers-reduced-motion`) to guarantee zero interference on mobile/touch screens. It coordinates a smooth spring-physics inverting circle (`mix-blend-mode: difference`), an anchor tracking dot, and an efficient HTML5 `<canvas>` particle loop with strict pooling (max 90 particles) that sleeps when idle.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, HTML5 2D Canvas API.

**Spec:** `docs/superpowers/specs/2026-11-11-hybrid-inverting-stardust-cursor-design.md`

---

## Global Constraints
- **Hydration Safety:** Must evaluate cleanly in SSR/Node without errors (returns `null` until client mount).
- **Mobile & Reduced Motion Guardrails:** Must unmount completely when `useInteractiveMotion()` is `false`.
- **Performance Ceiling:** Strict 60fps frame rate; max 90 active particles; animation loop pauses when no active particles and mouse is still.
- **Particle Sizing:** Delicate micro-embers (radii 1.2px – 2.8px, shrinking to 0.2px) with sharp `shadowBlur: 8` in `#F0CD5F` and `#58D7CD`.
- **Viewport Bounds:** Cursor hides gracefully (`opacity: 0`) and native cursor is restored when the pointer leaves the browser window.
- **Bilingual & Layout Parity:** Works identically on English (`/`) and Arabic (`/ar`) layouts.

---

## Review Focus
1. **Touch / Mobile devices:** Visiting on touch screen must render native touch behavior with zero DOM/canvas overhead.
2. **Tab backgrounding / Mouse idle:** When the mouse is stationary, the particle update loop must cleanly idle and not peg CPU/GPU.
3. **Window blur / mouseleave:** Moving the mouse outside the window or Alt-Tabbing must restore the default cursor.
4. **Interactive element hover:** Hovering links, buttons, and cards must smoothly expand the inverting lens from 42px to 76px.
5. **Click burst:** Mouse clicks must spawn 20–22 radial micro-embers that fade within 500ms without memory leaks.

---

### Task 1: Create `CustomCursor` Component & Contract Tests

**Files:**
- Create: `src/components/ui/CustomCursor.tsx`
- Modify: `src/components/ui/index.ts`
- Create: `tests/ui/custom-cursor.contract.test.ts`

**Steps:**
- [ ] **Step 1.1:** Write the contract test `tests/ui/custom-cursor.contract.test.ts` checking:
  - Export exists and is a valid React function component.
  - Safely renders `null` under SSR (`renderToStaticMarkup`) with zero hydration crash.
  - Unmounts/renders null when `useInteractiveMotion()` is false.
- [ ] **Step 1.2:** Run `npm test tests/ui/custom-cursor.contract.test.ts` to verify the test fails (file not found).
- [ ] **Step 1.3:** Implement `src/components/ui/CustomCursor.tsx`:
  - `"use client"` directive.
  - Mount state check (`isMounted && isInteractive`).
  - Anchor dot (`#cursor-dot`) + spring inverting lens (`#cursor-lens`) with `mix-blend-mode: difference`.
  - HTML5 canvas particle engine with delicate micro-particles (`radius 1.2–2.8px`, colors `#F0CD5F` and `#58D7CD`, `shadowBlur: 8`).
  - Click burst (20–22 particles).
  - Hover detection for `a, button, [role="button"], [data-cursor="hover"]`.
  - Cleanup listeners on unmount.
- [ ] **Step 1.4:** Export `CustomCursor` from `src/components/ui/index.ts`.
- [ ] **Step 1.5:** Run `npm test tests/ui/custom-cursor.contract.test.ts` to confirm 100% pass.
- [ ] **Step 1.6:** Commit: `feat(ui): create CustomCursor component with inverting lens and stardust embers`.

---

### Task 2: Global CSS Integration & Layout Mount

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/layout.tsx`

**Steps:**
- [ ] **Step 2.1:** In `src/app/globals.css`, add the `.custom-cursor-active` styles:
  ```css
  html.custom-cursor-active,
  html.custom-cursor-active * {
    cursor: none !important;
  }
  ```
- [ ] **Step 2.2:** In `src/app/[locale]/layout.tsx`, import `<CustomCursor />` from `@/components/ui` and mount it inside `<LanguageProvider>` adjacent to `<Navbar />`.
- [ ] **Step 2.3:** Run `npm test` across the full test suite to ensure all existing contract tests continue to pass.
- [ ] **Step 2.4:** Commit: `feat(layout): mount CustomCursor in root layout and add global cursor styling`.

---

### Task 3: Interactive Hover Targets & Component Tagging

**Files:**
- Modify: `src/components/ui/SpotlightCard.tsx`
- Modify: `src/components/home/SelectedWorkSection.tsx`

**Steps:**
- [ ] **Step 3.1:** Verify that `SpotlightCard` and project cards have appropriate hover target triggers so the lens smoothly expands when moving over projects.
- [ ] **Step 3.2:** Verify that magnetic buttons expand the lens smoothly.
- [ ] **Step 3.3:** Run `npm run lint` and `npm run build` to confirm static generation and TypeScript types succeed with zero errors.
- [ ] **Step 3.4:** Commit: `feat(ui): ensure seamless hover expansion across spotlight cards and CTAs`.

---

### Task 4: Full Verification & E2E Validation

**Files:**
- Verification only

**Steps:**
- [ ] **Step 4.1:** Run `npm test` (all contract tests must pass).
- [ ] **Step 4.2:** Run `npm run lint` (0 errors, 0 warnings).
- [ ] **Step 4.3:** Run `npm run build` (all 25 static pages compiled successfully in Next.js).
- [ ] **Step 4.4:** Verify Arabic RTL (`/ar`) and English (`/`) parity.
