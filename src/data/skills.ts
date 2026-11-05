import { SkillGroup, AIWorkflowTool } from "./types";

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: {
      en: "Backend Architecture & APIs",
      ar: "هندسة الأنظمة الخلفية والواجهات البرمجية",
    },
    description: {
      en: "Core specialization in structured API development, authentication, and backend services.",
      ar: "تخصص أساسي في بناء الـ APIs، أنظمة المصادقة، والخدمات البرمجية الخلفية المتماسكة.",
    },
    skills: [
      { name: "PHP", level: "core", verifiedInProjects: ["meshwar", "masar", "orbit"] },
      { name: "Laravel", level: "core", verifiedInProjects: ["meshwar", "masar", "orbit"] },
      { name: "REST APIs", level: "core", verifiedInProjects: ["meshwar", "masar", "orbit"] },
      { name: "JWT Authentication", level: "core", verifiedInProjects: ["orbit"] },
      { name: "Google OAuth / Socialite", level: "core", verifiedInProjects: ["meshwar"] },
      { name: "Organization Access Control", level: "core", verifiedInProjects: ["masar"] },
      { name: "Multi-Role Workflows", level: "core", verifiedInProjects: ["apartment-marketplace"] },
      { name: "Laravel Sanctum", level: "familiar" },
    ],
  },
  {
    id: "databases",
    title: {
      en: "Databases & Data Modeling",
      ar: "قواعد البيانات والنمذجة العلائقية",
    },
    description: {
      en: "Relational schema architecture, migrations, and test database constraints.",
      ar: "تصميم المخططات العلائقية، ترحيل البيانات (Migrations)، وهيكلة بيئات الاختبار.",
    },
    skills: [
      { name: "Relational Database Design", level: "core", verifiedInProjects: ["meshwar", "masar", "orbit", "apartment-marketplace"] },
      { name: "MySQL", level: "core", verifiedInProjects: ["meshwar", "masar"] },
      { name: "PostgreSQL", level: "familiar", verifiedInProjects: ["apartment-marketplace"] },
      { name: "SQLite (Automated Test Suites)", level: "core", verifiedInProjects: ["meshwar"] },
      { name: "Prisma ORM", level: "familiar", verifiedInProjects: ["apartment-marketplace"] },
    ],
  },
  {
    id: "frontend",
    title: {
      en: "Frontend & Full-Stack Integration",
      ar: "تطوير الواجهات والتكامل الشامل",
    },
    description: {
      en: "Modern interfaces, Arabic RTL design, and interactive client integrations.",
      ar: "بناء واجهات حديثة متوافقة بالكامل مع الاتجاه من اليمين إلى اليسار (RTL) وتكامل السيرفر مع العميل.",
    },
    skills: [
      { name: "JavaScript (ES6+)", level: "core", verifiedInProjects: ["meshwar", "apartment-marketplace"] },
      { name: "Tailwind CSS", level: "core", verifiedInProjects: ["meshwar", "apartment-marketplace"] },
      { name: "Alpine.js", level: "core", verifiedInProjects: ["meshwar"] },
      { name: "Laravel Blade", level: "core", verifiedInProjects: ["meshwar"] },
      { name: "Next.js", level: "familiar", verifiedInProjects: ["apartment-marketplace"] },
      { name: "HTML5 & CSS3", level: "core" },
      { name: "Bootstrap", level: "familiar" },
    ],
  },
  {
    id: "tools",
    title: {
      en: "Tools, DevOps & Workflow",
      ar: "الأدوات وبيئة العمل والنشر",
    },
    description: {
      en: "Version control, automated pipelines, deployment, and testing tools.",
      ar: "إدارة الإصدارات، خطوط النشر الآلية (CI/CD)، وأدوات اختبار وتحليل الأنظمة.",
    },
    skills: [
      { name: "Git & GitHub", level: "workflow", verifiedInProjects: ["meshwar", "apartment-marketplace", "university-issues"] },
      { name: "GitHub Actions (CI/CD)", level: "workflow", verifiedInProjects: ["meshwar"] },
      { name: "Dokku & Caddy / FrankenPHP", level: "workflow", verifiedInProjects: ["meshwar"] },
      { name: "Postman", level: "workflow" },
      { name: "Composer", level: "workflow" },
      { name: "Jira", level: "workflow" },
    ],
  },
];

export const aiWorkflowTools: AIWorkflowTool[] = [
  {
    name: "Claude Code",
    category: {
      en: "Autonomous CLI Engineering & Architecture",
      ar: "الهندسة البرمجية وتخطيط البنى المعمارية عبر الطرفية",
    },
    description: {
      en: "Deep codebase analysis, test writing, refactoring, and multi-file architecture planning.",
      ar: "تحليل شامل لشفرة المصدر، كتابة الاختبارات، وإعادة الهيكلة المعمارية عبر ملفات متعددة.",
    },
    tasks: {
      en: [
        "Requirements decomposition and architecture planning",
        "Edge case discovery and comprehensive unit test generation",
        "Refactoring backend services for maintainability",
      ],
      ar: [
        "تحليل متطلبات الأنظمة وتخطيط المعماريات البرمجية",
        "اكتشاف الحالات الحدية (Edge Cases) وتوليد اختبارات الوحدة",
        "إعادة هيكلة الخدمات الخلفية لتحسين قابلية الصيانة",
      ],
    },
  },
  {
    name: "Google Antigravity",
    category: {
      en: "Agentic Systems & Multi-Step Execution",
      ar: "الأنظمة الوكيلة وتنفيذ المهام المركبة متعددة المراحل",
    },
    description: {
      en: "Autonomous multi-phase workflows, design system tokenization, and strict environment inspection.",
      ar: "إدارة مسارات العمل متعددة المراحل، بناء منظومات التصميم البرمجية، وتدقيق البيئات التقنية.",
    },
    tasks: {
      en: [
        "Structured system planning and phase verification",
        "Strict localization and design token scaffolding",
        "End-to-end build diagnostics and dependency audits",
      ],
      ar: [
        "التخطيط المنظم للمشاريع والتحقق المرحلي من الإنجاز",
        "هيكلة أنظمة التعريب (i18n) وحزم رموز التصميم",
        "فحص البيئات البرمجية وتدقيق توافقية الحزم",
      ],
    },
  },
  {
    name: "GitHub Copilot",
    category: {
      en: "Inline Development & Autocompletion",
      ar: "المساعدة البرمجية الحية وتوليد الأنماط الروتينية",
    },
    description: {
      en: "Accelerating repetitive code patterns, data transfer objects, and framework boilerplate.",
      ar: "تسريع كتابة الأنماط البرمجية المكررة، كائنات نقل البيانات (DTOs)، ونماذج أطر العمل.",
    },
    tasks: {
      en: [
        "Repetitive migration and schema boilerplate acceleration",
        "Standard request validation rules generation",
        "Inline documentation and typing assistance",
      ],
      ar: [
        "تسريع كتابة ترحيلات قواعد البيانات والنماذج الروتينية",
        "توليد قواعد التحقق من صحة مدخلات الـ APIs",
        "المساعدة في التوثيق الداخلي وتحديد الأنواع (Types)",
      ],
    },
  },
  {
    name: "OpenAI Codex",
    category: {
      en: "Synthesis & API Exploration",
      ar: "استكشاف الواجهات البرمجية وتوليد الخوارزميات",
    },
    description: {
      en: "Algorithmic exploration, logic synthesis, and API payload modeling.",
      ar: "استكشاف الخوارزميات وصياغة المنطق الرياضي ونمذجة البيانات المتبادلة.",
    },
    tasks: {
      en: [
        "Route graph algorithm prototyping",
        "Data conversion logic and payload transformation",
        "Fast documentation lookup and syntax reference",
      ],
      ar: [
        "بناء نماذج أولية لخوارزميات مسارات النقل",
        "تحويل صيغ البيانات وإعادة تشكيل هياكلها",
        "الاستعلام السريع عن الصيغ المرجعية للواجهات البرمجية",
      ],
    },
  },
];
