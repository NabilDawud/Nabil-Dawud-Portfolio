"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, ArrowLeft, HeartHandshake, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Badge } from "@/components/ui/Badge";

export function BeyondCodeSection() {
  const { t, locale, isRTL } = useLanguage();

  return (
    <section
      aria-labelledby="beyond-code-heading"
      className="py-16 md:py-24 bg-gradient-to-b from-graphite/20 to-obsidian relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-start">
        {/* Section Header */}
        <div className="space-y-3">
          <Badge variant="champagne" size="sm">
            <Compass className="w-3.5 h-3.5 me-1.5" />
            {t.about.beyondCodeTitle}
          </Badge>
          <h2
            id="beyond-code-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ivory tracking-tight"
          >
            {t.about.beyondCodeTitle}
          </h2>
          <p className="text-sand text-base sm:text-lg max-w-2xl leading-relaxed">
            {t.about.beyondCodeSubtitle}
          </p>
        </div>

        {/* Narrative Card */}
        <div className="rounded-2xl border border-border-subtle/80 bg-graphite/40 p-6 sm:p-8 md:p-10 space-y-8 relative overflow-hidden">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl text-ivory">
                {locale === "en" ? "Engineering Grounded in Reality" : "هندسة منبثقة من الواقع العملي"}
              </h3>
            </div>

            <p className="text-sand/90 text-base sm:text-lg leading-relaxed">
              {t.about.beyondCodeText}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-border-subtle/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-sand/60">
              <HeartHandshake className="w-4 h-4 text-champagne shrink-0" />
              <span>
                {locale === "en"
                  ? "Commitment to reliability, high availability, and clean architecture."
                  : "التزام راسخ بالاعتمادية العالية، وتصميم المعماريات البرمجية النظيفة."}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-ivory bg-graphite-elevated border border-border-subtle hover:border-champagne/40 hover:text-champagne transition-colors"
              >
                <span>{locale === "en" ? "Explore Case Studies" : "استعراض دراسات الحالة"}</span>
                {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
