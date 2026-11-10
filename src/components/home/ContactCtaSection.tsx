"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Button } from "../ui/Button";
import { MagneticButton, AmbientSpotlight } from "../ui";

export function ContactCtaSection() {
  const { locale, isRTL } = useLanguage();

  return (
    <section
      aria-labelledby="cta-heading"
      className="py-20 md:py-28 relative border-t border-border-subtle/40 overflow-hidden"
    >
      {/* Living Aurora & Interactive Cyber-Grid Atmosphere */}
      <AmbientSpotlight variant="hero" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group/contact">
          {/* Radiant breathing rim glow */}
          <div
            className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-champagne/35 via-teal/25 to-champagne/35 blur-2xl opacity-70 group-hover/contact:opacity-100 transition-opacity duration-700 pointer-events-none animate-pulse"
            aria-hidden="true"
          />

          <div className="relative rounded-3xl border border-champagne/40 bg-gradient-to-b from-graphite/90 via-graphite/50 to-obsidian p-8 sm:p-14 md:p-16 text-center space-y-8 shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden">
            {/* Subtle top indicator with live pulse */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-champagne/35 bg-champagne/15 text-champagne text-xs font-mono font-medium shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <span className="relative flex items-center justify-center w-3.5 h-3.5">
                <span className="absolute w-full h-full rounded-full bg-champagne opacity-60 animate-ping" />
                <Sparkles className="relative w-3.5 h-3.5 text-champagne" />
              </span>
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
                    <span className="inline-block py-1 bg-gradient-to-r from-champagne-bright via-[#FFF4D9] to-champagne bg-clip-text text-transparent animate-text-shimmer select-none will-change-[background-position]">
                      scalable together.
                    </span>
                  </>
                ) : (
                  <>
                    لنقم ببناء أنظمة{" "}
                    <span className="inline-block py-1 bg-gradient-to-r from-champagne-bright via-[#FFF4D9] to-champagne bg-clip-text text-transparent animate-text-shimmer select-none will-change-[background-position]">
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
      </div>
    </section>
  );
}
