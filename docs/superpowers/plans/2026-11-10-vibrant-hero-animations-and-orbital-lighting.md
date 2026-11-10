# Vibrant Hero Animations & Orbital Lighting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

---

## Overview

Elevate the portfolio's visual atmosphere and interactivity based on user feedback:
1. **Eliminate Cursor Light Delay**: Replace sluggish spring physics with high-frequency responsive tracking (`stiffness: 450, damping: 28, mass: 0.08`) so the spotlight under the mouse reacts instantly with zero perceptible lag.
2. **Vibrant, High-Contrast Atmospheric Lighting**: Boost autonomous aurora orbs from low-opacity wash to vivid 35–45% core opacities with tighter blurs (`blur-2xl` instead of washed-out `blur-3xl`) and rich multi-stop gold/teal gradients that are unmistakable against the `#090B0A` obsidian background.
3. **Circular Orbiting Satellite Animation**: Add an animated 360° circular orbital path with a glowing satellite node revolving continuously around the portrait/monogram slot, providing a hypnotic "live systems architecture" visual anchor.
4. **Floating Architectural Proof Badges in Hero**: Add 3 micro-levitating glassmorphic badges (`⚡ <120ms p95`, `🛡️ Multi-Tenant RBAC`, `🔄 Offline-First Sync`) with organic staggered floating motion to captivate the watcher and highlight engineering specialization immediately.
5. **Bilingual Parity & Accessibility**: Ensure full English (LTR) and Arabic (RTL) mirror support and 100% compliance with `prefers-reduced-motion`.

---

## File Structure & Responsibility

- `src/components/ui/AmbientSpotlight.tsx`:
  - Snappy, zero-delay cursor spotlight tracking.
  - Vivid 35–45% core gradient aurora orbs with tightened blurs (`blur-2xl`).
  - Synchronous cyber-grid radial mask illumination.
- `src/components/home/HeroOrbitalRing.tsx` *(New)*:
  - 360° circular orbiting path with a revolving luminous satellite beacon and soft comet glow.
- `src/components/home/HeroFloatingBadges.tsx` *(New)*:
  - 3 glassmorphic floating tech badges with staggered spring levitation and bilingual translations.
- `src/components/home/HeroPortraitSlot.tsx`:
  - Integrate `HeroOrbitalRing` and `HeroFloatingBadges` around the portrait card.
- `src/i18n/dictionaries/en.ts` & `src/i18n/dictionaries/ar.ts`:
  - Add bilingual strings for the floating tech badges.
- `tests/ui/hero-animations.contract.test.ts` *(New)*:
  - Contract assertions verifying exports, bilingual keys, and SSR safety.

---

## Tasks

### Task 1: Eliminate Cursor Light Delay & Intensify Ambient Aurora
- [ ] In `src/components/ui/AmbientSpotlight.tsx`, update spring configuration to `stiffness: 450, damping: 28, mass: 0.08` for instant zero-lag cursor response.
- [ ] Boost color stop opacities on the Champagne Gold orb (38% core) and Cyber Teal orb (32% core) with `blur-2xl` so they are vivid and clearly visible against the dark background.
- [ ] Increase cursor spotlight core to `rgba(255, 235, 170, 0.45)` with tighter `blur-xl` and synchronous CSS variable updates.

### Task 2: Build Circular Orbiting Satellite Animation (`HeroOrbitalRing.tsx`)
- [ ] Create `src/components/home/HeroOrbitalRing.tsx` with a circular trajectory ring and a revolving glowing node (`rotate: 360` over 12s, linear, infinite).
- [ ] Ensure smooth GPU acceleration via `transform: rotate3d` and respect `prefers-reduced-motion` via `useInteractiveMotion`.

### Task 3: Build Floating Architectural Proof Badges (`HeroFloatingBadges.tsx`)
- [ ] Add bilingual dictionary entries in `en.ts` and `ar.ts` under `hero.floatingBadges`:
  - `latency`: `"<120ms p95 API"` / `"<120ms زمن الاستجابة"`
  - `security`: `"Multi-Tenant RBAC"` / `"عزل أمني للبيانات"`
  - `sync`: `"Offline-First Sync"` / `"مزامنة بلا اتصال"`
- [ ] Create `src/components/home/HeroFloatingBadges.tsx` rendering 3 micro-levitating glassmorphic badges anchored around the portrait slot.
- [ ] Integrate both `HeroOrbitalRing` and `HeroFloatingBadges` into `src/components/home/HeroPortraitSlot.tsx`.

### Task 4: Contract Testing & Quality Gates
- [ ] Create `tests/ui/hero-animations.contract.test.ts` verifying component exports, bilingual dictionary parity, and SSR safety.
- [ ] Run full test suite (`npm test`) — verify all contract tests pass 100%.
- [ ] Run `npm run lint` — verify 0 errors, 0 warnings.
- [ ] Run `npm run build` — verify production compilation across all 25 static pages.

### Task 5: Verification & Code Review
- [ ] Inspect live pages at `http://localhost:3000` (EN) and `http://localhost:3000/ar` (AR).
- [ ] Verify instant cursor responsiveness with zero lag.
- [ ] Verify circular orbiting motion and floating badges.
- [ ] Stage, commit, and prepare report.
