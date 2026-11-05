"use client";

import React from "react";
import {
  Users,
  Award,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { journeyEntries } from "@/data/journey";
import { useLanguage } from "@/i18n";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export function JourneyPreviewSection() {
  const { t, l, isRTL } = useLanguage();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "experience":
        return Users;
      case "program":
        return Award;
      case "education":
        return GraduationCap;
      default:
        return Award;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "experience":
        return t.journey.types.experience;
      case "program":
        return t.journey.types.program;
      case "education":
        return t.journey.types.education;
      default:
        return type;
    }
  };

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-20 md:py-28 relative scroll-mt-24 border-t border-border-subtle/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 text-start">
          <Badge variant="champagne" size="sm">
            {t.journey.sectionBadge}
          </Badge>
          <h2
            id="journey-heading"
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight"
          >
            {t.journey.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-sand font-normal leading-relaxed">
            {t.journey.sectionSubtitle}
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-s border-border-subtle/80 ms-4 sm:ms-6 space-y-10">
          {journeyEntries.map((entry) => {
            const Icon = getTypeIcon(entry.type);

            return (
              <div key={entry.id} className="relative ps-6 sm:ps-8 group">
                {/* Timeline node icon */}
                <div className="absolute -start-4 top-1.5 w-8 h-8 rounded-full bg-graphite-elevated border border-border-subtle flex items-center justify-center text-champagne group-hover:border-champagne/60 group-hover:scale-110 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Entry Card */}
                <div className="rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 p-6 sm:p-7 transition-all duration-300 hover:border-champagne/40 text-start space-y-4">
                  {/* Badges & Period */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-sand/80 bg-graphite-elevated/70 px-3 py-1 rounded-full border border-border-subtle/60">
                        {getTypeLabel(entry.type)}
                      </span>
                      {entry.verified && (
                        <Badge variant="teal" size="sm">
                          {t.journey.verifiedBadge}
                        </Badge>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-sand/70">
                      <Calendar className="w-3.5 h-3.5 text-champagne/70" />
                      <span>{l(entry.period)}</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-ivory group-hover:text-champagne-bright transition-colors">
                      {l(entry.title)}
                    </h3>
                    <div className="text-sm font-medium text-champagne/90">
                      {l(entry.organization)}
                    </div>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-sm text-sand leading-relaxed">
                    {l(entry.description)}
                  </p>

                  {/* Highlights */}
                  {entry.highlights && (
                    <ul className="space-y-2 pt-2 border-t border-border-subtle/40">
                      {l(entry.highlights).map((highlight, idx) => (
                        <li
                          key={idx}
                          className="text-xs sm:text-sm text-ivory/90 flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Journey CTA */}
        <div className="mt-12 text-center sm:text-start ps-4 sm:ps-6">
          <Button href="/about" variant="outline" size="md" className="gap-2">
            <span>{t.journey.viewFullStory}</span>
            <ArrowRight className={isRTL ? "w-4 h-4 rotate-180" : "w-4 h-4"} />
          </Button>
        </div>
      </div>
    </section>
  );
}
