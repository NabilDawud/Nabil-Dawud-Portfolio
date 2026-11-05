"use client";

import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data";
import { NDMonogram } from "@/components/brand/NDMonogram";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FileDown, ArrowRight } from "lucide-react";

export default function Home() {
  const { locale, direction, isRTL, t, l } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Monogram Hero Motif */}
        <div className="flex justify-center">
          <div className="p-3 rounded-3xl bg-graphite/40 border border-border-subtle/80 shadow-2xl shadow-black/60 relative">
            <NDMonogram size="lg" glow />
            <div className="absolute -bottom-1 -end-1">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal" />
              </span>
            </div>
          </div>
        </div>

        {/* Milestone 3 Verified Badge */}
        <div>
          <Badge variant="teal" dot size="md">
            {locale === "en"
              ? "Milestone 3 Complete — Shell & Navigation Active"
              : "المرحلة 3 جاهزة — شريط التنقل والهيكل الأساسي فعال"}
          </Badge>
        </div>

        {/* Core Headline & Supporting Statement */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-ivory">
            {l(personalBrand.headline.lead)}{" "}
            <span className="text-champagne font-extrabold">
              {l(personalBrand.headline.accent)}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-sand max-w-2xl mx-auto font-normal leading-relaxed">
            {l(personalBrand.supportingStatement)}
          </p>

          <p className="text-xs sm:text-sm text-sand/80 max-w-xl mx-auto font-mono">
            {t.hero.academicNote}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button href="/projects" variant="primary" size="md">
            <span>{t.hero.exploreWork}</span>
            <ArrowRight className={isRTL ? "w-4 h-4 rotate-180" : "w-4 h-4"} />
          </Button>

          <Button
            href="/assets/cv/nabil-dawud-cv.pdf"
            variant="secondary"
            size="md"
          >
            <FileDown className="w-4 h-4 text-champagne" />
            <span>{t.hero.downloadCv}</span>
          </Button>

          <Button href="/contact" variant="outline" size="md">
            <span>{t.hero.letsConnect}</span>
          </Button>
        </div>

        {/* Telemetry Bar */}
        <div className="pt-6 border-t border-border-subtle/60 flex flex-wrap items-center justify-center gap-6 text-xs text-sand">
          <span>
            Locale: <code className="text-champagne font-mono font-semibold">{locale.toUpperCase()}</code>
          </span>
          <span className="text-border-subtle">&bull;</span>
          <span>
            Direction: <code className="text-champagne font-mono font-semibold">{direction.toUpperCase()}</code>
          </span>
          <span className="text-border-subtle">&bull;</span>
          <span>
            RTL Status: <code className="text-champagne font-mono font-semibold">{String(isRTL)}</code>
          </span>
        </div>
      </div>
    </div>
  );
}
