"use client";

import React from "react";
import { Terminal, ShieldCheck, Cpu } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Badge } from "@/components/ui/Badge";

export function AboutHeroSection() {
  const { t, locale } = useLanguage();

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border-subtle/40 bg-gradient-to-b from-obsidian via-graphite/20 to-obsidian"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-8">
        {/* Badge */}
        <div className="flex items-center gap-3">
          <Badge variant="champagne" size="md" dot>
            {t.about.sectionBadge}
          </Badge>
          <span className="text-xs font-mono text-sand/60 tracking-wider uppercase">
            {locale === "en" ? "Profile & Background" : "الملف والمسار الهندسي"}
          </span>
        </div>

        {/* Title */}
        <h1
          id="about-hero-heading"
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory tracking-tight leading-[1.15]"
        >
          {t.about.sectionTitle}
        </h1>

        {/* Subtitle / Lead Paragraph */}
        <p className="text-lg sm:text-xl text-sand font-normal leading-relaxed max-w-3xl">
          {t.about.sectionSubtitle}
        </p>

        {/* Pillar Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle/50">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle/60 bg-graphite/40">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 mt-0.5">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-ivory">
                {locale === "en" ? "Systems Engineering" : "هندسة الأنظمة"}
              </div>
              <p className="text-xs text-sand/70 leading-normal">
                {locale === "en"
                  ? "Rigorous engineering foundation from Al-Azhar University (91.44%)."
                  : "أساس هندسي متين من جامعة الأزهر بتقدير ممتاز (91.44%)."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle/60 bg-graphite/40">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 mt-0.5">
              <Terminal className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-ivory">
                {locale === "en" ? "Resilient Backends" : "بنى خلفية صامدة"}
              </div>
              <p className="text-xs text-sand/70 leading-normal">
                {locale === "en"
                  ? "Architected for high concurrency, low latency, and partial connectivity."
                  : "تصميم متين للأحمال العالية، الاستجابة السريعة، وظروف الاتصال المتقطع."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle/60 bg-graphite/40">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-ivory">
                {locale === "en" ? "Human-Led AI" : "قيادة بشرية للذكاء الاصطناعي"}
              </div>
              <p className="text-xs text-sand/70 leading-normal">
                {locale === "en"
                  ? "Disciplined AI tooling guided by human responsibility and test verification."
                  : "تسخير منضبط لأدوات الذكاء الاصطناعي بمسؤولية هندسية وتدقيق اختباري شامل."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
