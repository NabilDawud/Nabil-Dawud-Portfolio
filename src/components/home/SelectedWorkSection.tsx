"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";
import { projects } from "@/data/projects";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MagneticButton } from "../ui";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/utils";

export function SelectedWorkSection() {
  const { t, locale, isRTL } = useLanguage();

  // Selected work on the Home page showcases the 3 audited primary projects
  const featuredProjects = [
    projects.find((p) => p.id === "meshwar"),
    projects.find((p) => p.id === "masar"),
    projects.find((p) => p.id === "apartment-marketplace"),
  ].filter(Boolean) as typeof projects;

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="py-20 md:py-28 relative scroll-mt-24 border-t border-border-subtle/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-14 text-start">
          <Badge variant="champagne" size="sm">
            {t.projects.sectionBadge}
          </Badge>
          <h2
            id="selected-work-heading"
            className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight"
          >
            {t.projects.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-sand font-normal leading-relaxed">
            {t.projects.sectionSubtitle}
          </p>
        </div>

        {/* 3 Featured Projects Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {featuredProjects.map((project) => {
            const isMeshwar = project.id === "meshwar";
            const isMasar = project.id === "masar";
            const colSpan = isMeshwar
              ? "lg:col-span-8"
              : isMasar
              ? "lg:col-span-4"
              : "lg:col-span-12";

            return (
              <div key={project.id} className={cn(colSpan, "h-full")}>
                <ProjectCard project={project} isHero={isMeshwar} />
              </div>
            );
          })}
        </div>

        {/* View All Projects CTA Banner */}
        <div className="mt-14 pt-10 border-t border-border-subtle/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start bg-graphite/30 rounded-2xl p-6 sm:p-8 border border-border-subtle/60">
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-lg sm:text-xl text-ivory">
              {locale === "en"
                ? "Looking for full case studies and architecture documentation?"
                : "هل تبحث عن دراسات حالة متعمقة وتوثيق المعمارية البرمجية؟"}
            </h3>
            <p className="text-xs sm:text-sm text-sand">
              {locale === "en"
                ? "Explore the complete project catalog with category filters, database schemas, and API design specifications."
                : "استعرض فهرس المشاريع الكامل مع خيارات التصفية، مخططات قواعد البيانات، وتوثيق الواجهات البرمجية."}
            </p>
          </div>

          <MagneticButton>
            <Button href="/projects" variant="outline" size="md" className="shrink-0 gap-2">
              <span>{t.projects.viewAll}</span>
              <ArrowRight className={isRTL ? "w-4 h-4 rotate-180" : "w-4 h-4"} />
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
