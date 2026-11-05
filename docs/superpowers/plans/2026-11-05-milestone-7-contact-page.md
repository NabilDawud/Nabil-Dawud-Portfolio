# Milestone 7 — Contact Page & Form Handling (Resend / API Routes) Implementation Plan (Final Revision)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production-ready bilingual Contact page (`/contact`) and server-side submission route (`/api/contact`) featuring atomic multi-instance rate limiting (Upstash Redis with memory fallback for development only), verified client IP extraction via Node.js `node:net` `isIP()`, accessible bot honeypot protection, server-side payload validation, verified Resend sender identity, and graceful client-side error recovery in English and Arabic.

**Architecture:**
- **Serverless API Route Handler:** `src/app/api/contact/route.ts` running in Next.js 16 App Router.
- **Trusted Client IP Resolver:** `src/lib/client-ip.ts` resolving real client IPs based on documented hosting proxy topology, validated using Node.js `node:net` `isIP()`, without trusting spoofed headers or defaulting to shared IPs in production. Requires explicit `TRUSTED_PROXY_STRATEGY` in production.
- **Dedicated IP Resolution Contract Suite:** `tests/contact/contact-client-ip.contract.test.ts` verifying canonical header selection, ignoring untrusted alternative headers, IPv4/IPv6 validation, conflicting independently-trusted header rejection, and production 503 Service Unavailable when IP identity cannot be established.
- **Distributed Atomic Rate Limiter:** `src/lib/rate-limiter.ts` using persistent distributed storage (Upstash Redis / `@upstash/ratelimit`) in production, with isolated in-memory sliding-window fallback strictly confined to local development (`NODE_ENV === "development"`). Fails closed in production if rate limiting is unconfigured or unreachable.
- **Payload Validation & Sanitization:** `src/lib/contact-validator.ts` performing strict zero-dependency input boundaries, regex matching, and control-character stripping.
- **Resend Email Service:** Dispatches verified transactional emails using `RESEND_FROM_EMAIL` as the authenticated sender and `replyTo: payload.email`, delivering to `CONTACT_RECEIVING_EMAIL`.
- **Accessible UI & Honeypot:** `src/components/contact/ContactForm.tsx` featuring an accessible honeypot (`tabIndex={-1}`, `aria-hidden="true"`, styled off-screen without contradictory `hidden sr-only` classes), localized inline error states, and submission banners.
- **Context Sidebar:** `src/components/contact/ContactSidebar.tsx` presenting verified professional links (GitHub, LinkedIn) and Gaza operational context with zero plaintext email addresses or `mailto:` links.

**Tech Stack:** Next.js 16.4.5 (App Router, Route Handlers), React 19.3.1, TypeScript 5, Tailwind CSS v4, Lucide React 1.69.0, Resend SDK (`^6.0.0`), Upstash Redis / Ratelimit, Node.js `node:net` (`isIP`), Node.js built-in test runner (`tsx --test`), Puppeteer Core.

**Spec:** `nabil-dawud-portfolio-master-plan.md` (Consolidated Portfolio Specification Final v4, Section 3, Section 7, Section 8, and Section 9.7).

---

## Global Constraints

1. **Strict Server-Side Secrets:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_RECEIVING_EMAIL`, `UPSTASH_REDIS_REST_URL`, and `UPSTASH_REDIS_REST_TOKEN` must NEVER be prefixed with `NEXT_PUBLIC_` or bundled into client code.
2. **Zero Plaintext Email or `mailto:`:** Respect the established privacy decision. Do NOT display Nabil's raw email address or use `mailto:` links anywhere on the website. All communication routes through `/api/contact`.
3. **Resend Sender Identity & DMARC/SPF Integrity:**
   - The sender is strictly an address on a verified domain configured via `RESEND_FROM_EMAIL`.
   - `.env.example` must use an unmistakable non-working placeholder: `RESEND_FROM_EMAIL="Nabil Dawud <contact@your-verified-domain.com>"`.
   - The visitor's email is placed exclusively in `replyTo: payload.email`.
   - NEVER use the visitor's email as the `from` sender.
   - The user must verify the sender domain in Resend and configure the actual inbox before production use.
4. **No Real Email Dispatch in Tests:** Automated contract tests and browser QA scripts must NEVER dispatch real emails to external mailboxes. Resend calls must be isolated via dependency injection or mocked in test files.
5. **No Production Mock-Success Mode:** The route handler must never fake successful delivery when unconfigured in production. If Resend fails or keys are missing in production, it must return an honest sanitized error (`500` or `503`), not simulated success.
6. **Production Fail-Closed Rate Limiting:**
   - In production (`NODE_ENV === "production"`), rate limiting must be backed by persistent distributed storage (Upstash Redis) to prevent multi-instance bypass.
   - If the rate limiting service fails or is unconfigured in production, the system fails closed (rejects submission with 503) rather than silently claiming protection.
   - In-memory rate limiting is allowed ONLY in local development (`NODE_ENV === "development"`) or testing (`NODE_ENV === "test"`).
7. **Explicit Production Proxy Strategy & 503 on Unverifiable Identity:**
   - In production (`NODE_ENV === "production"`), `TRUSTED_PROXY_STRATEGY` must be explicitly configured (`"vercel"`, `"cloudflare"`, or `"standard"`). No silent production default exists.
   - If `TRUSTED_PROXY_STRATEGY` is missing, unsupported, or the canonical trusted header is absent/malformed in production, the API returns **`503 Service Unavailable`** with `{ error: "Service temporarily unavailable. Please try again shortly." }` and `Retry-After: 60`.
   - The application **NEVER falls back to `127.0.0.1`** in production.
   - Choosing a strategy is an application hint and does not prove the underlying infrastructure boundary is configured.
8. **Honeypot Accessibility Contract:**
   - Positioned off-screen via CSS (`position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; pointer-events: none;`).
   - Omitted from tab order (`tabIndex={-1}`).
   - Hidden from assistive technology (`aria-hidden="true"`).
   - Must NOT use conflicting `hidden sr-only` classes.
   - Populated honeypot results in silent rejection (`200 OK` simulated response) to confuse automated bots.

---

## Review Focus

1. **Trusted IP Extraction & Anti-Spoofing:** Verify that arbitrary client-injected headers cannot spoof client identity or poison rate limiting. Validated using `node:net` `isIP()`.
2. **Infrastructure Failure Reporting:** When trusted IP cannot be established in production or `TRUSTED_PROXY_STRATEGY` is unconfigured, verify API returns 503 Service Unavailable without exposing internal header details.
3. **Client-Side Secrets Leakage:** Verify that neither client bundles nor API error responses expose `RESEND_API_KEY`, `CONTACT_RECEIVING_EMAIL`, or Redis tokens.
4. **Rate Limit Concurrency & Retry-After:** Verify atomic increment behavior across concurrent requests and assert exact `Retry-After` header values (in seconds) on `429 Too Many Requests`.
5. **Form Error Recovery & Draft Preservation:** Verify that server validation failures (400) or server delivery failures (500/503) display localized error banners while preserving user inputs in the form.
6. **Honeypot Bot Invisibility:** Verify via browser automation that the honeypot cannot be focused via keyboard navigation, is ignored by accessibility trees, and silently drops submissions when filled.

---

## 1. Hosting Environment & Trusted Client IP Architecture

### A. Hosting Investigation & Official Documentation Findings
1. **Intended Hosting Environment:**
   - Codebase evidence (`README.md`, Next.js 16 defaults) establishes a standard Next.js App Router application deployment targeting **Vercel** as the primary edge platform.
   - Target domain: `na-bil.app`.
   - **Explicitly Unresolved Infrastructure Assumption:** While architected for Vercel, whether `na-bil.app` DNS points directly to Vercel's edge nodes or passes through an upstream Cloudflare proxy/CDN is an external DNS infrastructure decision that must be verified and configured before production deployment. The application cannot establish proxy authenticity merely by reading an environment variable.
2. **Vercel Request Header Behavior (per official Vercel Docs https://vercel.com/docs/headers/request-headers):**
   - Vercel sets `x-forwarded-for`, `x-real-ip`, and `x-vercel-forwarded-for`.
   - Official documentation explicitly notes:
     - `x-real-ip` is identical to `x-forwarded-for`.
     - `x-vercel-forwarded-for` is identical to `x-forwarded-for`.
   - Therefore, `x-real-ip` and `x-vercel-forwarded-for` are **not** independent sources of truth; they reflect the same underlying proxy forwarding data.
   - When a proxy is placed in front of Vercel, Vercel appends incoming addresses unless Vercel Trusted Proxies are explicitly configured.
3. **Canonical Header Selection per Topology:**
   - For each deployment strategy, the application selects **one single canonical trusted header**:
     - **Strategy `"vercel"` (Direct Vercel Edge):**
       - Canonical source: `x-real-ip`.
       - Rationale: On direct Vercel edge deployments, Vercel overwrites `x-real-ip` with the connecting client IP.
       - No silent fallback: If `x-real-ip` is missing or fails `isIP()`, the application does NOT try alternative headers; it fails closed.
     - **Strategy `"cloudflare"` (Cloudflare Edge Proxy):**
       - Canonical source: `CF-Connecting-IP`.
       - Rationale: Cloudflare edge nodes attach `CF-Connecting-IP` on traffic routed to the origin.
       - **Mandatory Origin Bypass Precondition:** Direct origin access MUST be blocked (via Cloudflare Authenticated Origin Pulls, edge firewall rules, or a verified origin secret header). If an attacker can reach the origin directly without going through Cloudflare, they can spoof `CF-Connecting-IP`. The plan explicitly documents that bypass protection is a required deployment prerequisite.
     - **Strategy `"standard"` (Authenticated Internal Reverse Proxy):**
       - Canonical source: `x-real-ip`.
       - Rationale: Upstream Nginx / Caddy is explicitly configured to overwrite `X-Real-IP` with the client socket IP and block external direct connections.
4. **Clarified Conflicting Header Behavior:**
   - **Ignore Untrusted Alternative Headers:** The application evaluates only the canonical trusted source and **ignores** untrusted client-supplied headers (e.g. an attacker injecting `X-Forwarded-For: 1.2.3.4`). It does NOT reject a request merely because an untrusted client-supplied header differs from the canonical trusted source, as doing so would allow trivial DoS attacks where attackers block requests by injecting arbitrary headers.
   - **Reject Conflicting Values Only Under Multi-Trust:** Conflicting values are rejected only when both sources have independently established trust in the verified topology.
   - **Never Use Fallbacks:** If the canonical header is missing or invalid, alternative headers are never used as a fallback.
5. **No Production Default Strategy:**
   - In production (`NODE_ENV === "production"`), `TRUSTED_PROXY_STRATEGY` must be explicitly configured.
   - If `TRUSTED_PROXY_STRATEGY` is missing, empty, or unsupported in production, the resolver returns `ip: null` (`reason: "unconfigured_proxy_strategy"`).
   - In local development (`NODE_ENV === "development"` or `test`), an isolated default (`"development"`) may be used to allow local testing.
   - Setting `TRUSTED_PROXY_STRATEGY` is an application-level configuration and does **not** prove the infrastructure trust boundary is correctly configured.
6. **Safe Production Behavior (503 Service Unavailable):**
   - In production (`NODE_ENV === "production"`), if `TRUSTED_PROXY_STRATEGY` is unconfigured, or if the canonical trusted header is absent or fails `isIP()`:
     - `src/lib/client-ip.ts` returns `{ ip: null, isValid: false }`.
     - The API route handler immediately returns **`503 Service Unavailable`** with `{ error: "Service temporarily unavailable. Please try again shortly." }` and `Retry-After: 60`.
     - This correctly reflects an infrastructure / deployment configuration failure without exposing internal header details.
     - The application **NEVER falls back to `127.0.0.1`** in production.

---

## 2. API Architecture & Security Pipeline (`/api/contact`)

```
                                  Client Request
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │   Next.js 16 POST /api/contact           │
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │ 1. Trusted Client IP Resolution          │
                   │    (src/lib/client-ip.ts)                │
                   │    • Requires explicit TRUSTED_PROXY_    │
                   │      STRATEGY in production              │
                   │    • Evaluates single canonical header   │
                   │    • Ignores untrusted alt headers       │
                   │    • Validated with node:net isIP()      │
                   │    • Missing/Unconfigured in prod ──► 503│
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │ 2. Atomic Distributed Rate Limiter       │
                   │    (src/lib/rate-limiter.ts)             │
                   │    • Production: Upstash Redis (Sliding) │
                   │    • Dev: In-memory Map fallback         │
                   │    • Exceeded: 429 + Retry-After         │
                   │    • Service Down: Fail-closed (503)     │
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │ 3. Honeypot Filter                       │
                   │    • Field `_hp_website` filled?         │
                   │    • YES ──► Return 200 OK (Silent Drop) │
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │ 4. Payload Validation & Sanitization     │
                   │    (src/lib/contact-validator.ts)        │
                   │    • Name (2-100), Email (strict regex)  │
                   │    • Subject (3-200), Message (10-5000)  │
                   │    • Invalid? ──► Return 400 + Field Errs│
                   └────────────────────┬─────────────────────┘
                                        │
                                        ▼
                   ┌──────────────────────────────────────────┐
                   │ 5. Resend Dispatch Handler               │
                   │    • From: RESEND_FROM_EMAIL (Verified)  │
                   │    • To: CONTACT_RECEIVING_EMAIL         │
                   │    • Reply-To: visitor email             │
                   │    • Missing Config: 500 (Sanitized)     │
                   │    • Provider Error: 500 (Sanitized)     │
                   │    • Success: 200 { success: true }      │
                   └──────────────────────────────────────────┘
```

---

## 3. Core Specifications & Contracts

### A. Trusted Client IP Extraction (`src/lib/client-ip.ts`)
```typescript
import { isIP } from "node:net";

export type ProxyTrustStrategy = "vercel" | "cloudflare" | "standard" | "development";

export interface ClientIpResult {
  ip: string | null;
  source: string;
  isValid: boolean;
  reason?: "unconfigured_proxy_strategy" | "missing_canonical_header" | "invalid_ip" | "conflicting_trusted_headers";
}

export function extractClientIp(
  headers: Headers,
  options?: {
    strategy?: ProxyTrustStrategy;
    isProduction?: boolean;
  }
): ClientIpResult;
```
- In production (`isProduction === true`), `strategy` must be explicitly provided or configured via `process.env.TRUSTED_PROXY_STRATEGY`. If missing or unsupported, returns `{ ip: null, isValid: false, reason: "unconfigured_proxy_strategy" }`.
- Selects exactly one canonical header based on `strategy`:
  - `"vercel"` $\rightarrow$ `x-real-ip`
  - `"cloudflare"` $\rightarrow$ `cf-connecting-ip`
  - `"standard"` $\rightarrow$ `x-real-ip`
- Validates the candidate IP with `node:net` `isIP(raw)`. Returns `ip: null` if `isIP() === 0`.
- Ignores untrusted alternative headers (e.g. client-supplied `X-Forwarded-For`).
- Does NOT parse arbitrary `x-forwarded-for` multi-IP chains.

### B. Distributed & Dev Rate Limiting (`src/lib/rate-limiter.ts`)
```typescript
export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
  reason?: "rate_limit_exceeded" | "service_unavailable";
}

export interface IRateLimiter {
  check(identifier: string): Promise<RateLimitCheckResult>;
}
```
- **Production Implementation:** Backed by Upstash Redis REST API (`@upstash/ratelimit` with `Ratelimit.slidingWindow(5, "15 m")`).
- **Development Implementation:** In-memory sliding-window map enabled only when `process.env.NODE_ENV !== "production"`.
- **Fail-Closed Behavior:** In production, if Redis credentials are unset or the network fails, returns `allowed: false` with `reason: "service_unavailable"`.

### C. Input Validation Contract (`src/lib/contact-validator.ts`)
```typescript
export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp_website?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export function validateContactPayload(
  body: unknown,
  locale: "en" | "ar" = "en"
): ValidationResult;
```
- Strips ASCII control characters (`[\x00-\x1F\x7F]`) and trims whitespace.
- Name: 2 to 100 characters.
- Email: 5 to 254 characters, matching strict RFC-compliant regex.
- Subject: 3 to 200 characters.
- Message: 10 to 5000 characters.
- Returns localized validation error messages corresponding to current locale.

### D. Accessible Honeypot Component Contract (`ContactForm.tsx`)
```tsx
{/* Honeypot field: invisible to sighted visitors, excluded from tab order, ignored by screen readers */}
<div
  style={{
    position: "absolute",
    left: "-9999px",
    width: "1px",
    height: "1px",
    opacity: 0,
    pointerEvents: "none",
  }}
  aria-hidden="true"
>
  <label htmlFor="_hp_website">Leave this field blank</label>
  <input
    id="_hp_website"
    type="text"
    name="_hp_website"
    tabIndex={-1}
    autoComplete="off"
    value={formData._hp_website || ""}
    onChange={handleChange}
  />
</div>
```

---

## 4. Step-by-Step Implementation Tasks

### Task 1: Security Foundation, Dependencies & Client IP Resolution
**Files:**
- Modify: `package.json` (add `resend`, `@upstash/ratelimit`, `@upstash/redis`)
- Modify: `package-lock.json`
- Create: `.env.example`
- Create: `src/lib/client-ip.ts`
- Test: `tests/contact/contact-client-ip.contract.test.ts`

- [ ] **Step 1.1: Install dependencies and update `.env.example` with non-working placeholders**
- [ ] **Step 1.2: Write failing tests for client IP extraction (`tests/contact/contact-client-ip.contract.test.ts`)**
  - Verify single canonical header selection for each strategy (`x-real-ip` for Vercel, `cf-connecting-ip` for Cloudflare).
  - Verify validation with Node.js `node:net` `isIP()` for valid IPv4 and IPv6 addresses.
  - Verify unconfigured or missing `TRUSTED_PROXY_STRATEGY` in production returns `ip: null` (reason: `unconfigured_proxy_strategy`).
  - Verify missing canonical header returns `ip: null` without fallback.
  - Verify invalid/malformed IP strings (`999.999.999.999`, `invalid-ip`, `:::1`) return `ip: null`.
  - Verify untrusted client-supplied `X-Forwarded-For` is ignored when the canonical header is valid.
  - Verify conflicting independently-trusted headers are rejected.
  - Verify production API behavior returning `503 Service Unavailable` when trustworthy IP cannot be established.
- [ ] **Step 1.3: Run test to verify RED**
- [ ] **Step 1.4: Implement `src/lib/client-ip.ts`**
- [ ] **Step 1.5: Run test to verify GREEN**

---

### Task 2: Payload Validation & Sanitization Engine
**Files:**
- Create: `src/lib/contact-validator.ts`
- Test: `tests/contact/contact-validator.contract.test.ts`

- [ ] **Step 2.1: Write failing tests for payload validation**
  - Test valid payload passes and trims inputs.
  - Test invalid email, short name, short message, oversized message.
  - Test localized error messages for English and Arabic.
- [ ] **Step 2.2: Run test to verify RED**
- [ ] **Step 2.3: Implement `src/lib/contact-validator.ts`**
- [ ] **Step 2.4: Run test to verify GREEN**

---

### Task 3: Multi-Instance Rate Limiting Engine
**Files:**
- Create: `src/lib/rate-limiter.ts`
- Test: `tests/contact/contact-rate-limiter.contract.test.ts`

- [ ] **Step 3.1: Write failing contract test for rate limiter**
  - Test in-memory sliding window allows 5 requests per 15 minutes in development.
  - Test request #6 is rejected with `allowed: false` and exact `resetSeconds`.
  - Test `Retry-After` header calculation.
  - Test production fail-closed behavior when Redis credentials are missing (returns 503).
  - Test atomic concurrency simulation with rapid parallel requests.
- [ ] **Step 3.2: Run test to verify RED**
- [ ] **Step 3.3: Implement `src/lib/rate-limiter.ts` with Upstash Redis + Dev fallback**
- [ ] **Step 3.4: Run test to verify GREEN**

---

### Task 4: Server-Side API Route Handler (`/api/contact`)
**Files:**
- Create: `src/app/api/contact/route.ts`
- Test: `tests/contact/contact-route.contract.test.ts`

- [ ] **Step 4.1: Write failing contract test for `/api/contact`**
  - Test valid submission with injected mock Resend client returns 200 `{ success: true }`.
  - Test sender is `RESEND_FROM_EMAIL` and visitor email is in `replyTo`.
  - Test honeypot populated returns 200 simulated success without calling Resend.
  - Test invalid payload returns 400 with field errors.
  - Test rate limit exceeded returns 429 + `Retry-After` header.
  - Test missing client IP or unconfigured strategy in production returns 503 Service Unavailable.
  - Test Resend API failure returns sanitized 500 without leaking stack or keys.
  - Test that response JSON never contains environment variables.
- [ ] **Step 4.2: Run test to verify RED**
- [ ] **Step 4.3: Implement `src/app/api/contact/route.ts`**
- [ ] **Step 4.4: Run test to verify GREEN**

---

### Task 5: Modular Contact Components & UI Assembly
**Files:**
- Modify: `src/i18n/dictionaries/en.ts`
- Modify: `src/i18n/dictionaries/ar.ts`
- Create: `src/components/contact/ContactHero.tsx`
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/ContactSidebar.tsx`
- Create: `src/components/contact/index.ts`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 5.1: Expand bilingual dictionaries with validation feedback tokens**
- [ ] **Step 5.2: Implement `ContactHero.tsx`**
- [ ] **Step 5.3: Implement `ContactSidebar.tsx` (verified profiles, Gaza context, zero raw emails)**
- [ ] **Step 5.4: Implement `ContactForm.tsx` (accessible honeypot, draft preservation, alert banners)**
- [ ] **Step 5.5: Implement `src/components/contact/index.ts` and `src/app/contact/page.tsx`**

---

### Task 6: Automated Browser QA Suite (`tests/browser-qa-contact.mjs`)
**Files:**
- Create: `tests/browser-qa-contact.mjs`

- [ ] **Step 6.1: Create Puppeteer browser QA suite verifying:**
  1. English Desktop (1440px) rendering, layout, labels, and sidebar.
  2. English Mobile (390px) responsive single-column layout and zero horizontal overflow.
  3. Arabic Desktop (1440px RTL) typography, text alignment, and labels.
  4. Arabic Mobile (390px RTL) zero horizontal overflow (`scrollWidth <= clientWidth`).
  5. Honeypot accessibility verification:
     - Off-screen coordinates confirm invisibility to sighted users.
     - `tabIndex === -1` confirms exclusion from keyboard navigation sequence.
     - `aria-hidden === "true"` confirms omission from screen reader trees.
  6. Client-side form submission flow with mock API intercept:
     - Button enters loading state with spinner.
     - Success banner renders with `role="alert"`.
     - Form resets fields cleanly.
  7. Error recovery flow:
     - Server error response preserves user's typed name, email, subject, message.
     - Error banner renders with clear explanation and retry guidance.
  8. Capture screenshots to artifact directory.

---

### Task 7: Full Verification, Security Audit & Code Review
- [ ] **Step 7.1: Run full contract test suite (`npm test`)**
- [ ] **Step 7.2: Run ESLint (`npm run lint`)**
- [ ] **Step 7.3: Run production build (`npm run build`)**
- [ ] **Step 7.4: Execute `node tests/browser-qa-contact.mjs`**
- [ ] **Step 7.5: Dispatch Senior Code Reviewer subagent for independent security & code audit**
- [ ] **Step 7.6: Deliver comprehensive Milestone 7 completion report to user**

---

## 5. Exact 20-Path Inventory for Milestone 7

### New Files to Create (16 files):
1. `docs/superpowers/plans/2026-11-05-milestone-7-contact-page.md` (this plan)
2. `.env.example` (environment configuration template)
3. `src/lib/client-ip.ts` (trusted client IP resolution via `node:net` `isIP`)
4. `src/lib/contact-validator.ts` (payload validation & sanitization)
5. `src/lib/rate-limiter.ts` (distributed Upstash Redis + dev fallback)
6. `src/app/api/contact/route.ts` (Next.js App Router POST handler)
7. `src/components/contact/ContactHero.tsx` (hero header section)
8. `src/components/contact/ContactForm.tsx` (accessible interactive form)
9. `src/components/contact/ContactSidebar.tsx` (verified profiles & context)
10. `src/components/contact/index.ts` (barrel export)
11. `src/app/contact/page.tsx` (App Router route with metadata)
12. `tests/contact/contact-client-ip.contract.test.ts` (independent IP resolution contract test)
13. `tests/contact/contact-validator.contract.test.ts` (payload validation contract test)
14. `tests/contact/contact-rate-limiter.contract.test.ts` (rate limiting contract test)
15. `tests/contact/contact-route.contract.test.ts` (route handler contract test)
16. `tests/browser-qa-contact.mjs` (Puppeteer browser QA script)

### Existing Files to Modify (4 files):
17. `package.json` (dependencies: `resend`, `@upstash/ratelimit`, `@upstash/redis`)
18. `package-lock.json` (npm lockfile)
19. `src/i18n/dictionaries/en.ts` (validation error tokens)
20. `src/i18n/dictionaries/ar.ts` (validation error tokens)

**Total Milestone 7 Paths:** Exactly **20 unique paths** (16 new + 4 modified).

---

## 6. Required Environment Variables & Production Readiness Checklist

### Required Variables in `.env.local` (and documented in `.env.example`):
```bash
# ==============================================================================
# RESEND EMAIL SERVICE (Server-Side Only - NEVER expose to client)
# ==============================================================================
# API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# Verified Sender Email
# MUST belong to a domain/address verified in your Resend account.
# Unmistakable non-working placeholder below MUST be replaced with your verified Resend sender before production deployment.
RESEND_FROM_EMAIL="Nabil Dawud <contact@your-verified-domain.com>"

# Destination Inbox where visitor inquiries are received
CONTACT_RECEIVING_EMAIL=your_destination_inbox@example.com

# ==============================================================================
# UPSTASH REDIS RATE LIMITING (Server-Side Only - Production Multi-Instance)
# ==============================================================================
# REST URL from Upstash Console (https://console.upstash.com)
UPSTASH_REDIS_REST_URL=https://your-upstash-redis.upstash.io

# REST Token from Upstash Console
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_here

# ==============================================================================
# PROXY TOPOLOGY TRUST STRATEGY (Server-Side Only - REQUIRED in production)
# Values: "vercel" | "cloudflare" | "standard"
# In production, this variable MUST be set explicitly. There is no silent fallback.
# In local development only, it defaults to isolated local development behavior.
# Note: Setting this value does not configure the infrastructure trust boundary itself.
# ==============================================================================
TRUSTED_PROXY_STRATEGY=
```

### Pre-Implementation & Production Readiness Checklist:
- [ ] Confirm production hosting platform for `na-bil.app` (direct Vercel vs Cloudflare proxy vs Dokku) and explicitly set `TRUSTED_PROXY_STRATEGY`.
- [ ] If Cloudflare is selected, verify that direct origin bypass is blocked (e.g. via Authenticated Origin Pulls).
- [ ] Verify sender domain in Resend dashboard with valid SPF/DKIM/DMARC records.
- [ ] Set `RESEND_FROM_EMAIL` to match verified domain.
- [ ] Set `CONTACT_RECEIVING_EMAIL` to Nabil's private receiving inbox.
- [ ] Provision Upstash Redis database and set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in the production hosting dashboard.
- [ ] Confirmed zero `NEXT_PUBLIC_` prefixes on any contact, Redis, or Resend variables.
- [ ] Verified that client bundle inspection reveals zero secret tokens.
