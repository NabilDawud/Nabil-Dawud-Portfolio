# Milestone 5 — Project Evidence & Truth Verification Matrix (Corrected)

**Date:** 2026-11-05  
**Auditor:** Antigravity (Superpowers-first workflow)  
**Methodology:** Direct inspection of local repositories, commit histories, lockfiles, database dumps, routing files, and deployment configurations on disk (`D:\ai-projects\meshwar`, `D:\Projects\masar`, `D:\Projects\os-life-api`, `D:\Projects\university-issues`, `D:\MySQL-Migration-2026-09-30\issues_management.sql`).

---

## 1. Project Evidence Matrix

| Project | Claim | Evidence Source (File / Path) | Verified Status | Safe Portfolio Wording |
| :--- | :--- | :--- | :--- | :--- |
| **Mishwar (مشوار)** | Offline-first route graph trip planning | `D:\ai-projects\meshwar\app\Services\TripPlannerService.php`<br>`D:\ai-projects\meshwar\README.md` (Lines 37-41) | **Verified** | *"Offline-first trip planner computing multi-leg transit itineraries locally using an in-memory graph of verified Gaza landmarks and corridors without requiring active internet connectivity once cached."* |
| **Mishwar (مشوار)** | All features work offline | `D:\ai-projects\meshwar\README.md`<br>`routes/web.php` | **Unverified (Refuted)** | **Boundary rule:** Clarify that offline capability strictly applies to cached route planning. Live vehicle tracking, driver bidding, and messaging require active cellular network connection. |
| **Mishwar (مشوار)** | GPS Data Freshness Indicators with explicit elapsed age | `D:\ai-projects\meshwar\README.md` (Lines 43-46)<br>`D:\ai-projects\meshwar\app\Services\RouteDriftService.php` | **Verified** | *"Displays last-known GPS coordinates with explicit elapsed age indicators (e.g., 'آخر موقع: دوار الكويت، منذ 3 دقائق' / 'Last location: Kuwait Roundabout, 3 mins ago') rather than speculative algorithmic arrival predictions."* |
| **Mishwar (مشوار)** | GPS thresholds of `<30s`, `30s-2m`, `>2m` | Codebase scan of `meshwar` | **Unverified (Removed)** | Describe the freshness indicator concept and elapsed age display honestly without attributing unverified numerical thresholds not in source code. |
| **Mishwar (مشوار)** | FrankenPHP / Caddy web server | `D:\ai-projects\meshwar\Dockerfile` (Line 9)<br>`D:\ai-projects\meshwar\Caddyfile` | **Verified** | *"FrankenPHP application runtime (Caddy-powered, worker mode enabled) on PHP 8.4."* (Avoid speculative concurrency multipliers). |
| **Mishwar (مشوار)** | Automated CI/CD & Testing | `D:\ai-projects\meshwar\.github\workflows\ci-cd.yml` | **Verified** | *"Automated GitHub Actions CI running Laravel Pint and PHPUnit test suite on an in-memory SQLite database, with continuous deployment to Dokku."* |
| **Mishwar (مشوار)** | Active Live Demo & Public GitHub | `https://meshwar.apps.taqat.academy`<br>`https://github.com/NabilDawud/meshwar` | **Verified** | Active production URL and public GitHub repository links. |
| **Masar** | Role: Backend Developer within a Project Team | `D:\Projects\masar` git log (`1f131b3`, `d0f5b52`, `6192398`, `5a53ac7`, `d029379`, `b9a743a`) | **Verified** | *"Backend Developer within a project team, responsible for backend APIs, database design, and core workflow modules."* |
| **Masar** | Individual Contributions | `D:\Projects\masar\app\Modules\TaskWorkflow`<br>`app\Modules\ModuleManagement` | **Verified** | Developed TaskWorkflow module (task delegation, internal orders, polymorphic comments & attachments, activity logs) and ModuleManagement module (screen APIs, employee-module assignment relations). |
| **Masar** | Platform Type | `D:\Projects\masar` git remote `git@github.com:MASAR-V-1/Back-End.git` | **Verified** | *"ERP Platform for Humanitarian and Development Organizations."* (Never use "Enterprise SaaS"). |
| **Masar** | Repository Availability | Git remote is `MASAR-V-1/Back-End` | **Verified (Private/Organization)** | Marked as *"Organization Repository (Pending Public Confirmation)"* with a locked badge. No broken link. |
| **Masar** | Live Demo Availability | `https://masar-v1.apps.taqat.academy` | **Verified (Active Demo)** | *"Active demonstration available on the Taqat application cluster."* |
| **Apartment Maintenance Marketplace** | Role: Full Stack Developer (AI-assisted) | `src/data/projects.ts` | **Verified** | *"Full Stack Developer utilizing an AI-assisted engineering workflow."* |
| **Apartment Maintenance Marketplace** | Multi-Role application with role-specific views | `https://apartment-maintenance-marketplace.vercel.app`<br>`https://github.com/NabilDawud/apartment-maintenance-marketplace` | **Verified** | *"Arabic-first multi-role web platform connecting owners, tenants, maintenance technicians, and administrators with role-specific views and Better Auth authentication."* |
| **Apartment Maintenance Marketplace** | Fine-grained enterprise RBAC | Not evidenced | **Unverified (Guardrail strictly enforced)** | Do NOT claim enterprise RBAC. Wording is strictly *"role-specific views"*. |
| **Apartment Maintenance Marketplace** | Tech Stack & Links | `package.json` on Vercel deployment | **Verified** | Next.js 16, Better Auth, Prisma ORM, PostgreSQL, Tailwind CSS, TypeScript. Live demo and public GitHub active. |
| **Orbit** | Role: Backend Developer within a Project Team | `D:\Projects\os-life-api` git log (`efc1390`, `ec735c7`, `11c6015`, `a423053`, `fbd79dc`, `fc24c09`) | **Verified** | *"Backend Developer within a project team, building Laravel REST APIs, authentication, and productivity data schemas."* |
| **Orbit** | Individual Contributions | `D:\Projects\os-life-api\app\Http\Controllers\Api` | **Verified** | Engineered AI milestone suggestions for goals using Gemini API (`AiGoalController`), stateless JWT auth with `php-open-source-saver/jwt-auth`, dual phone/email login, email verification, Google OAuth endpoint, password reset flow, avatar management, and API documentation. |
| **Orbit** | Live Demo Availability | Independent audit | **Verified (Unavailable)** | *"Live demonstration currently not available."* (Explicitly distinguished from repository status). |
| **Orbit** | Repository Availability | `git@github.com:BBD-Select-Digital-Training/orbit-api.git` | **Verified (Private/Organization)** | *"Organization Repository (Pending Confirmation)"* under BBD Select. Marked with lock badge. |
| **University Issues Management** | Project Slug | `src/data/projects.ts` (Line 484) | **Verified** | Exact canonical slug is `university-issues` (lowercase ASCII, standard hyphen ASCII 45). |
| **University Issues Management** | Student grievance workflow genuinely implemented | `D:\Projects\university-issues\routes\web.php`<br>`D:\Projects\university-issues\app\Http\Controllers\IssueController.php`<br>`D:\Projects\university-issues\app\Models\Issue.php` | **Verified** | Genuine hierarchical issue routing: Department Head / Dean / Admin routing, dynamic category form fields, issue assignment tracking, policies, and transition actions (`approve`, `reject`, `close`, `reassign`). |
| **University Issues Management** | Framework Version & Environment | `D:\Projects\university-issues\composer.json`<br>`composer.lock` | **Verified** | **Composer constraint:** `laravel/framework: ^13.8`, `php: ^8.3`<br>**composer.lock version:** `v13.23.0`<br>**Portfolio display:** `Laravel 13` on `PHP 8.3+`. |
| **University Issues Management** | Git Authorship | `git -C "D:\Projects\university-issues" shortlog -sn --all --email` | **Verified** | All 16 commits shown in the inspected Git history are authored by `NabilDawud <nabeeldawud@gmail.com>`. |
| **University Issues Management** | Live Demo Availability | Independent audit | **Verified (Unavailable)** | *"Live demo not available."* |
| **University Issues Management** | Repository Availability | `git@github.com:NabilDawud/University-Issues.git` | **Verified (Public GitHub)** | Public repository at `https://github.com/NabilDawud/University-Issues`. |

---

## 2. File Status Breakdown

- **Tracked Modified Source Files:**
  - `src/data/projects.ts` — The only modified source file, containing the approved bilingual project data aligned with ground-truth evidence.
- **Untracked Test Files:**
  - `tests/projects/data-integrity.contract.test.ts` — Focused contract test verifying the 6 audit boundaries across all 5 projects.
- **Untracked Documentation Files:**
  - `docs/superpowers/plans/2026-11-05-milestone-5-projects-directory.md` — Milestone 5 implementation plan.
  - `docs/superpowers/evidence-matrix-milestone-5.md` — Ground-truth audit and verification matrix.
