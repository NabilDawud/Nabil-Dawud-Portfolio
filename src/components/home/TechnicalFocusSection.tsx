"use client";

import React from "react";
import {
  Server,
  KeyRound,
  Database,
  WifiOff,
  Layers,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "@/i18n";
import { Badge } from "../ui/Badge";

interface CapabilityCard {
  id: string;
  icon: React.ElementType;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  demonstratedIn: {
    en: Array<{ label: string; project?: string }>;
    ar: Array<{ label: string; project?: string }>;
  };
  technologies: string[];
}

const capabilities: CapabilityCard[] = [
  {
    id: "backend-apis",
    icon: Server,
    title: {
      en: "Backend Architecture & REST APIs",
      ar: "هندسة الأنظمة الخلفية والواجهات البرمجية",
    },
    description: {
      en: "Structured API design, request validation, service-layer decoupling, and high-throughput controllers in modern Laravel.",
      ar: "بناء واجهات برمجية مهيكلة، فصل طبقات الخدمات، وتطوير متحكمات سريعة وقابلة للصيانة في بيئة Laravel الحديثة.",
    },
    demonstratedIn: {
      en: [
        { label: "Mishwar (Route services & driver quoting)", project: "Mishwar" },
        { label: "Orbit (Stateless REST endpoints)", project: "Orbit" },
      ],
      ar: [
        { label: "مشوار (خدمات الملاحة والتسعير)", project: "مشوار" },
        { label: "أوربت (واجهات REST لاحالة)", project: "أوربت" },
      ],
    },
    technologies: ["Laravel 13", "PHP 8.4", "REST APIs", "Service Layer"],
  },
  {
    id: "auth-systems",
    icon: KeyRound,
    title: {
      en: "Authentication & Access Systems",
      ar: "أنظمة المصادقة والتحكم بالوصول",
    },
    description: {
      en: "Verified token security, social sign-in, organization access controls, and multi-role user workflows without generic assumptions.",
      ar: "مصادقة الرموز المشفرة، الدخول الاجتماعي، صلاحيات المؤسسات، وتدفقات مستخدمين متعددة الأدوار وفق ضوابط أمنية دقيقة.",
    },
    demonstratedIn: {
      en: [
        { label: "JWT Stateless Auth (Orbit)" },
        { label: "OAuth & Session Gating (Mishwar)" },
        { label: "Organization Access Control (Masar)" },
        { label: "Multi-Role Workflows (Apartment Maintenance)" },
        { label: "Standalone Capability (Laravel Sanctum)" },
      ],
      ar: [
        { label: "مصادقة JWT اللاحالة (أوربت)" },
        { label: "تسجيل OAuth وحماية الجلسات (مشوار)" },
        { label: "إدارة وصول المؤسسات (مسار)" },
        { label: "مسارات عمل متعددة الأدوار (سوق الصيانة)" },
        { label: "كفاءة برمجية قائمة بذاتها (Laravel Sanctum)" },
      ],
    },
    technologies: ["JWT", "OAuth 2.0", "Better Auth", "Multi-Role Views", "Sanctum"],
  },
  {
    id: "databases-modeling",
    icon: Database,
    title: {
      en: "Relational Databases & Schema Modeling",
      ar: "قواعد البيانات والنمذجة العلائقية",
    },
    description: {
      en: "Normalized relational schemas, index strategies, automated test suites with SQLite, and schema migrations across enterprise RDBMS.",
      ar: "مخططات علائقية معيارية، فهرسة موجهة، اختبارات آلية عبر SQLite، وترحيل منظم للبيانات عبر قواعد البيانات الحديثة.",
    },
    demonstratedIn: {
      en: [
        { label: "Mishwar (MySQL & SQLite test pipeline)" },
        { label: "Masar (Relational operations schema)" },
        { label: "Apartment Maintenance (PostgreSQL & Prisma)" },
      ],
      ar: [
        { label: "مشوار (خط اختبار MySQL وSQLite)" },
        { label: "مسار (مخطط العمليات العلائقي)" },
        { label: "سوق الصيانة (PostgreSQL وPrisma)" },
      ],
    },
    technologies: ["MySQL", "PostgreSQL", "SQLite (Testing)", "Prisma ORM"],
  },
  {
    id: "resilient-systems",
    icon: WifiOff,
    title: {
      en: "Offline-First & Resilient Systems",
      ar: "الأنظمة التي تعمل بلا اتصال والحلول المرنة",
    },
    description: {
      en: "Client-side cached route graph navigation without active internet connectivity, coupled with GPS Data Freshness Indicators.",
      ar: "ملاحة عبر شبكة مسارات مخزنة محلياً للعمل عند انقطاع الإنترنت، مع مؤشرات حداثة بيانات الـ GPS لضمان الموثوقية.",
    },
    demonstratedIn: {
      en: [
        { label: "Mishwar (Offline multi-leg transit & GPS Data Freshness Indicators)" },
      ],
      ar: [
        { label: "مشوار (توجيه مسارات بدون اتصال ومؤشرات حداثة بيانات GPS)" },
      ],
    },
    technologies: [
      "Cached Route Graphs",
      "GPS Data Freshness Indicators",
      "Offline Resiliency",
      "FrankenPHP",
    ],
  },
  {
    id: "fullstack-tooling",
    icon: Layers,
    title: {
      en: "Modern Full-Stack & Tooling",
      ar: "التطوير المتكامل وخطوط النشر والتشغيل",
    },
    description: {
      en: "SSR architectures, Arabic RTL styling, automated CI/CD pipelines via GitHub Actions, and containerized deployment with Dokku.",
      ar: "معماريات الرندر من السيرفر، واجهات عربية متوافقة مع RTL، أتمتة النشر عبر GitHub Actions، والاستضافة عبر Dokku.",
    },
    demonstratedIn: {
      en: [
        { label: "Mishwar (Dokku, GitHub Actions CI/CD, Blade, Alpine)" },
        { label: "Apartment Maintenance (Next.js 16, Tailwind, Vercel)" },
      ],
      ar: [
        { label: "مشوار (نشر Dokku، أتمتة CI/CD، قوالب Blade، Alpine)" },
        { label: "سوق الصيانة (Next.js 16، Tailwind، Vercel)" },
      ],
    },
    technologies: [
      "Next.js 16",
      "Tailwind CSS",
      "GitHub Actions",
      "Dokku",
      "Alpine.js",
    ],
  },
  {
    id: "ai-workflow",
    icon: Sparkles,
    title: {
      en: "Responsible AI-Assisted Engineering",
      ar: "هندسة البرمجيات المعززة بالذكاء الاصطناعي",
    },
    description: {
      en: "Disciplined engineering acceleration using CLI tools and AI agents for architecture decomposition, TDD test generation, and code review.",
      ar: "تسريع العمل الهندسي بانضباط عبر أدوات الطرفية ووكلاء الذكاء الاصطناعي لتخطيط المعماريات، توليد الاختبارات، وتدقيق الجودة.",
    },
    demonstratedIn: {
      en: [
        { label: "Claude Code & Codex (Decomposition & testing)" },
        { label: "Antigravity & Copilot (Pair engineering & audit)" },
      ],
      ar: [
        { label: "Claude Code وCodex (تخطيط المعمارية والاختبارات)" },
        { label: "Antigravity وCopilot (البرمجة الزوجية والتدقيق)" },
      ],
    },
    technologies: [
      "Claude Code",
      "OpenAI Codex",
      "Antigravity",
      "TDD Test Suites",
    ],
  },
];

export function TechnicalFocusSection() {
  const { t, l } = useLanguage();

  return (
    <section
      id="focus"
      aria-labelledby="focus-heading"
      className="py-20 md:py-28 relative scroll-mt-24 border-t border-border-subtle/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 text-start">
          <Badge variant="champagne" size="sm">
            {t.focus.sectionBadge}
          </Badge>
          <h2
            id="focus-heading"
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight"
          >
            {t.focus.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-sand font-normal leading-relaxed">
            {t.focus.sectionSubtitle}
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            const demonstrated = l(cap.demonstratedIn);

            return (
              <div
                key={cap.id}
                className="group relative rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-champagne/40 hover:shadow-xl hover:shadow-black/60"
              >
                <div className="space-y-5">
                  {/* Icon & Anchor Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-graphite-elevated border border-border-subtle flex items-center justify-center text-champagne group-hover:scale-105 group-hover:border-champagne/40 transition-all duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-sand/40 group-hover:text-champagne transition-colors" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2.5">
                    <h3 className="font-display font-semibold text-lg text-ivory group-hover:text-champagne-bright transition-colors">
                      {l(cap.title)}
                    </h3>
                    <p className="text-sm text-sand leading-relaxed">
                      {l(cap.description)}
                    </p>
                  </div>

                  {/* Demonstrated In Evidence */}
                  <div className="space-y-2 pt-2 border-t border-border-subtle/50">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-sand/60">
                      {t.focus.verifiedIn}
                    </div>
                    <ul className="space-y-1.5">
                      {demonstrated.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-ivory/90 flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-1.5" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Technology Tags */}
                <div className="pt-6 mt-6 border-t border-border-subtle/40 flex flex-wrap gap-1.5">
                  {cap.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-graphite-elevated/70 text-sand border border-border-subtle/60 group-hover:border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
