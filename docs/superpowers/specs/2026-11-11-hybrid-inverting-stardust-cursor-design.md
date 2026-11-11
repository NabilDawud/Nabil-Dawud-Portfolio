# Design: Hybrid Inverting Lens & Noticeable Stardust Cursor

## 1. Intent & Why
Add an interactive, creative custom cursor experience to the portfolio that elevates the high-craft creative frontend and systems engineering aesthetic. The user selected the **Combined Hybrid Mode** (Awwwards-style Inverting Lens + boosted Champagne Gold and Cyber Teal Stardust Embers) to deliver a memorable, tactile browsing experience across the portfolio.

---

## 2. Goals, Non-Goals, & Anti-Goals

### Goals
- Implement a client-only custom cursor component (`<CustomCursor />`) mounted at root layout or home view.
- Provide a smooth, spring-physics trailing inverting lens (`mix-blend-mode: difference` with `rgba(255, 255, 255, 0.95)` and Champagne Gold border `#F0CD5F`) that expands when hovering interactive elements (`a`, `button`, `[data-hover-target]`, Spotlight cards).
- Emit a vivid, noticeably dense stream of glowing Champagne Gold (`#F0CD5F`) and Cyber Teal (`#58D7CD`) stardust particles that follow rapid mouse movement.
- Trigger a radiant 18–24 particle cosmic burst on mouse click.
- Maintain a strict 60fps frame rate via an efficient `requestAnimationFrame` render loop and particle pooling (max 90 active particles).

### Non-Goals
- Custom cursors on mobile or touchscreens (touch screens do not have cursors).
- Replacing standard text-selection or drag behaviors.

### Anti-Goals
- **Zero Input Lag:** Never block or delay native click handlers or hardware events.
- **No Battery Drain / Fan Noise:** Do not run particle calculations when the mouse is stationary or when the page is backgrounded (`document.hidden`).
- **No Layout Shift:** Purely fixed, GPU-accelerated overlay with `pointer-events-none`.

---

## 3. Constraints
- **Device & Accessibility Guardrails:** Must leverage `useInteractiveMotion` hook (`@media (pointer: fine)` and `!prefers-reduced-motion: reduce`). On touch devices or reduced motion mode, the custom cursor and canvas are completely unmounted.
- **Viewport Boundaries:** Cursor hides smoothly (`opacity: 0`) when the mouse leaves the browser window (`mouseleave`).
- **Bilingual & RTL Parity:** Inversion and particle emissions must work identically on English (`/`) and Arabic (`/ar`) layouts.
- **Next.js App Router Clean SSR:** Must use `"use client"` with hydration-safe mounting (`mounted` state check) to avoid SSR hydration mismatches.

---

## 4. Approaches Considered

1. **Combined Hybrid Mode (Selected):**
   - *Details:* Smooth inverting lens for interactive element focus + boosted stardust particles trailing behind motion and bursting on clicks.
   - *Tradeoff:* Highest creative impact. Requires strict particle pooling and canvas lifecycle cleanup to ensure 60fps locked performance.
   - *User Decision:* User enthusiastically selected this option with boosted particle density for strong noticeability.

2. **Inverting Lens Solo:**
   - *Details:* Minimalist geometric lens with `mix-blend-mode: difference` only.
   - *Tradeoff:* Extremely clean, zero canvas particles, but lacked the dynamic kinetic spark the user loved.

3. **Stardust Trail Solo:**
   - *Details:* Default OS cursor with trailing canvas sparkles only.
   - *Tradeoff:* Playful, but missed out on the tactile hover expansion and text inversion over Bento cards and CTAs.

---

## 5. Architecture & Implementation Details

### Component: `src/components/ui/CustomCursor.tsx`
- **Core Elements:**
  - `<div className="fixed ... pointer-events-none z-[9999]" id="cursor-dot" />`: Central 6px cyber teal anchor dot.
  - `<div className="fixed ... pointer-events-none z-[9998] mix-blend-difference" id="cursor-lens" />`: 42px outer circle with subtle champagne border, lerping at `0.22` factor.
  - `<canvas className="fixed inset-0 pointer-events-none z-[9997]" />`: Fullscreen HTML5 canvas managing the lightweight particle pool.
- **Hover Targets:**
  - Automatically queries or delegates hover on `a`, `button`, `[role="button"]`, and elements with `data-cursor="hover"`.
  - On hover: outer lens smoothly expands from `42px` to `76px`.
- **Particle System:**
  - Fine micro-stardust particles: Small, delicate glowing embers (radii ~1.2px – 2.8px shrinking smoothly to 0.2px) for an elegant, cinematic feel rather than chunky circles.
  - High emission count: 2–3 micro-particles per gesture step when moving fast, providing noticeable density with refined delicacy.
  - Max pool cap: 90 particles.
  - Colors: Champagne Gold (`#F0CD5F`) and Cyber Teal (`#58D7CD`) with concentrated luminescent glow (`shadowBlur: 8`).
  - Click burst: Spawns 20–22 fine radiant embers with radial velocity.
- **Global CSS Integration:**
  - When active on fine pointer devices, apply `html.custom-cursor-active, html.custom-cursor-active * { cursor: none !important; }`.

---

## 6. What's Left to the Builder
- Create `src/components/ui/CustomCursor.tsx`.
- Mount `<CustomCursor />` inside `src/components/layout/RootShell.tsx` or layout so it covers the entire portfolio.
- Add unit/contract tests verifying hydration safety, unmounting on touch devices, and clean event teardown.
- Verify production build and linting.
