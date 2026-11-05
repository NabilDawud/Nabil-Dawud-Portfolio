"use client";

import React from "react";
import { GraduationCap, Award, BookOpen, Layers } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Badge } from "@/components/ui/Badge";

export function AcademicCredentialsSection() {
  const { t, locale } = useLanguage();

  return (
    <section
      aria-labelledby="academic-credentials-heading"
      className="py-16 md:py-24 border-b border-border-subtle/40 bg-obsidian relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-start">
        {/* Section Header */}
        <div className="space-y-3">
          <Badge variant="champagne" size="sm">
            {t.about.academicSection}
          </Badge>
          <h2
            id="academic-credentials-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ivory tracking-tight"
          >
            {locale === "en"
              ? "University Engineering Degree & Academic Standing"
              : "الدرجة الهندسية الجامعية والتفوق الأكاديمي"}
          </h2>
          <p className="text-sand text-base sm:text-lg max-w-2xl leading-relaxed">
            {locale === "en"
              ? "Formal engineering education grounded in rigorous computer systems architecture and verified academic excellence."
              : "تعليم هندسي أكاديمي راسخ في معمارية أنظمة الحاسوب وتفوق علمي موثق."}
          </p>
        </div>

        {/* Primary Academic Card: Al-Azhar University */}
        <div className="rounded-2xl border-2 border-champagne/40 bg-graphite/40 p-6 sm:p-8 md:p-10 space-y-8 relative overflow-hidden transition-all duration-300 hover:border-champagne/60 hover:bg-graphite/60 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
          {/* Subtle background glow */}
          <div
            className="absolute top-0 end-0 -mt-8 -me-8 w-64 h-64 bg-champagne/5 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Top header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle/60 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne shrink-0 shadow-[0_0_20px_rgba(183,164,119,0.15)]">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-sand/70">
                  {t.about.facultyName}
                </div>
                <div className="font-display font-bold text-xl sm:text-2xl text-ivory">
                  {t.about.universityName}
                </div>
              </div>
            </div>

            {/* Prominent Grade Badge */}
            <div className="self-start sm:self-center">
              <Badge variant="champagne" size="md" className="text-sm font-semibold px-4 py-1.5 shadow-[0_0_15px_rgba(183,164,119,0.18)]">
                <Award className="w-4 h-4 me-1.5" />
                {t.about.gradeValue}
              </Badge>
            </div>
          </div>

          {/* Degree Title & Core Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-champagne">
                {locale === "en" ? "Academic Degree" : "الدرجة العلمية"}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-ivory">
                {t.about.degreeTitle}
              </h3>
            </div>

            {/* Curriculum description */}
            <div className="rounded-xl bg-obsidian/60 border border-border-subtle/50 p-5 space-y-3">
              <div className="flex items-center gap-2 text-ivory font-semibold text-sm">
                <Layers className="w-4 h-4 text-champagne shrink-0" />
                <span>{t.about.curriculumTitle}</span>
              </div>
              <p className="text-sand/90 text-sm leading-relaxed">
                {t.about.curriculumDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Academic Highlight: Tawjihi 99.1% */}
        <div className="rounded-xl border border-border-subtle/70 bg-graphite/20 p-5 sm:p-6 space-y-4 transition-all duration-300 hover:border-border-subtle hover:bg-graphite/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sand/10 border border-border-subtle flex items-center justify-center text-sand shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-sand/60 block">
                  {t.about.academicHighlightsTitle}
                </span>
                <h4 className="font-semibold text-base sm:text-lg text-ivory">
                  {t.about.tawjihiTitle}
                </h4>
              </div>
            </div>

            <Badge variant="outline" size="sm" className="self-start sm:self-center font-mono text-sm text-ivory font-bold border-border-subtle">
              {t.about.tawjihiScore}
            </Badge>
          </div>

          <p className="text-xs sm:text-sm text-sand/80 leading-relaxed ps-0 sm:ps-[3.25rem]">
            {t.about.tawjihiContext}
          </p>
        </div>
      </div>
    </section>
  );
}
