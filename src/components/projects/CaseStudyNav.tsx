"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Project } from "@/data/types";
import { useLanguage } from "@/i18n";

interface CaseStudyNavProps {
  prevProject: Project | null;
  nextProject: Project | null;
  fromParam: string | null;
}

export function CaseStudyNav({
  prevProject,
  nextProject,
  fromParam,
}: CaseStudyNavProps) {
  const { t, l, isRTL } = useLanguage();

  const buildUrl = (slug: string) => {
    return fromParam && fromParam !== "all"
      ? `/projects/${slug}?from=${encodeURIComponent(fromParam)}`
      : `/projects/${slug}`;
  };

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-12 border-t border-border-subtle/60"
      aria-label="Case Study Navigation"
    >
      {/* Previous Project */}
      {prevProject ? (
        <Link
          href={buildUrl(prevProject.slug)}
          className="group p-5 rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 hover:border-champagne/40 transition-all flex flex-col justify-between text-start space-y-2"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-sand/70 group-hover:text-champagne transition-colors">
            <ArrowLeft className={isRTL ? "w-3.5 h-3.5 rotate-180" : "w-3.5 h-3.5"} />
            <span>{t.projects.prevProject}</span>
          </div>
          <span className="font-display font-bold text-lg text-ivory group-hover:text-champagne-bright transition-colors">
            {l(prevProject.title)}
          </span>
          <span className="text-xs text-sand/80 line-clamp-1">
            {l(prevProject.tagline)}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {/* Next Project */}
      {nextProject ? (
        <Link
          href={buildUrl(nextProject.slug)}
          className="group p-5 rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 hover:border-champagne/40 transition-all flex flex-col justify-between text-end space-y-2 sm:ms-auto w-full"
        >
          <div className="flex items-center justify-end gap-2 text-xs font-mono text-sand/70 group-hover:text-champagne transition-colors">
            <span>{t.projects.nextProject}</span>
            <ArrowRight className={isRTL ? "w-3.5 h-3.5 rotate-180" : "w-3.5 h-3.5"} />
          </div>
          <span className="font-display font-bold text-lg text-ivory group-hover:text-champagne-bright transition-colors">
            {l(nextProject.title)}
          </span>
          <span className="text-xs text-sand/80 line-clamp-1">
            {l(nextProject.tagline)}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
