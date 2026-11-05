"use client";

import React from "react";
import { GraduationCap, Award, ArrowRight } from "lucide-react";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { useLanguage } from "@/i18n";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function EducationPreviewSection() {
  const { l, locale, isRTL } = useLanguage();

  const university = education;

  return (
    <section
      aria-labelledby="education-heading"
      className="py-20 md:py-28 relative border-t border-border-subtle/40 bg-graphite/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 text-start">
          <Badge variant="champagne" size="sm">
            {locale === "en" ? "Education & Credentials" : "التعليم والشهادات"}
          </Badge>
          <h2
            id="education-heading"
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight"
          >
            {locale === "en"
              ? "Academic Distinction & Accredited Training"
              : "التفوق الأكاديمي والتدريب المهني المعتمد"}
          </h2>
          <p className="text-base sm:text-lg text-sand font-normal leading-relaxed">
            {locale === "en"
              ? "Grounded in a comprehensive 5-year Computer Systems Engineering curriculum and verified through accredited professional technical diplomas."
              : "تأسيس هندسي متين عبر منهاج جامعي متخصص في هندسة أنظمة الحاسوب، معزز بشهادات تدريب مهنية معتمدة وتطبيق عملي مكثف."}
          </p>
        </div>

        {/* Dual Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Academic Degree Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-champagne/40 text-start space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-graphite-elevated border border-border-subtle flex items-center justify-center text-champagne">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <Badge variant="champagne" size="md">
                  {l(university.grade)}
                </Badge>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider text-sand/70">
                  {l(university.faculty)}
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-ivory">
                  {l(university.degree)}
                </h3>
                <div className="text-base font-semibold text-champagne">
                  {l(university.institution)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-graphite-elevated/40 border border-border-subtle/50 text-start space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-wider text-sand/60">
                  {locale === "en" ? "Academic Rigor" : "الأسس الأكاديمية"}
                </div>
                <p className="text-xs sm:text-sm text-sand/90 leading-relaxed">
                  {locale === "en"
                    ? "Comprehensive 5-year engineering curriculum covering computer architecture, operating systems, algorithm design, database theory, data communications, and software engineering principles."
                    : "منهاج هندسي متعمق شمل معمارية الحواسيب، نظم التشغيل، تحليل الخوارزميات، نظريات قواعد البيانات، شبكات الاتصال، ومبادئ هندسة البرمجيات المتقدمة."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle/40 text-xs text-sand/60 font-mono">
              {l(university.location)} &bull; {l(university.period)}
            </div>
          </div>

          {/* Column 2: Accredited Diplomas Summary (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-champagne/40 text-start space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-graphite-elevated border border-border-subtle flex items-center justify-center text-teal">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal bg-teal/10 px-3 py-1 rounded-full border border-teal/30">
                  Verified Diplomas
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ivory">
                  {locale === "en" ? "Accredited Certifications" : "الدبلومات الفنية المعتمدة"}
                </h3>
                <p className="text-xs sm:text-sm text-sand">
                  {locale === "en"
                    ? "Government and industry-accredited technical training credentials."
                    : "شهادات تدريب مهنية معتمدة من جهات حكومية ومؤسسات تدريب رائدة."}
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-border-subtle/40">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl bg-graphite-elevated/50 border border-border-subtle/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs text-champagne font-semibold">
                      <span>{l(cert.title)}</span>
                      {cert.hours && (
                        <span className="text-[10px] font-mono text-sand/80 bg-graphite px-2 py-0.5 rounded">
                          {cert.hours} {locale === "en" ? "Hours" : "ساعة"}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-sand">
                      {l(cert.issuer)}
                    </div>
                    <div className="text-[11px] font-mono text-sand/60">
                      {l(cert.dateRange)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle/40">
              <Button href="/about#certificates" variant="outline" size="md" className="w-full gap-2">
                <span>
                  {locale === "en"
                    ? "View Certificates & Verification"
                    : "معاينة وتدقيق الشهادات"}
                </span>
                <ArrowRight className={isRTL ? "w-4 h-4 rotate-180" : "w-4 h-4"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
