"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Button } from "../ui/Button";
import { MagneticButton } from "../ui";

export function ContactCtaSection() {
  const { locale, isRTL } = useLanguage();

  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 md:py-28 relative border-t border-border-subtle/40 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-champagne/15 via-transparent to-transparent blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-champagne/30 bg-gradient-to-b from-graphite/80 via-graphite/40 to-obsidian p-8 sm:p-14 md:p-16 text-center space-y-8 shadow-2xl shadow-black/80 backdrop-blur-sm overflow-hidden">
          {/* Subtle top indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/30 bg-champagne/10 text-champagne text-xs font-mono font-medium">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>
              {locale === "en"
                ? "Open to Work & Engineering Collaboration"
                : "متاح للعمل والشراكات الهندسية"}
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2
              id="cta-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ivory tracking-tight leading-tight"
            >
              {locale === "en" ? (
                <>
                  Let&apos;s build something{" "}
                  <span className="bg-gradient-to-r from-champagne-bright via-champagne to-champagne/70 bg-clip-text text-transparent">
                    scalable together.
                  </span>
                </>
              ) : (
                <>
                  لنقم ببناء أنظمة{" "}
                  <span className="bg-gradient-to-r from-champagne-bright via-champagne to-champagne/70 bg-clip-text text-transparent">
                    قابلة للتوسع معاً.
                  </span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-sand font-normal leading-relaxed">
              {locale === "en"
                ? "Available for backend and full-stack software engineering roles, distributed systems, and collaborative development teams."
                : "مستعد للفرص الوظيفية في تطوير الأنظمة الخلفية والشاملة، تصميم المعماريات البرمجية، والمشاركة في فرق العمل التقنية."}
            </p>
          </div>

          {/* Single Primary Action linking directly to /contact with Magnetic micro-interaction */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <MagneticButton className="w-full sm:w-auto">
              <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                <span>{locale === "en" ? "Initiate Contact" : "ابدأ التواصل"}</span>
                <ArrowRight className={isRTL ? "w-4 h-4 rotate-180" : "w-4 h-4"} />
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
