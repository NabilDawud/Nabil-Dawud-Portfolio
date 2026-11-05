"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import {
  ALLOWED_CATEGORIES,
  FilterCategory,
  filterProjectsByCategory,
  getCategoryCount,
  isValidCategory,
} from "@/data/projects-helpers";
import { useLanguage } from "@/i18n";
import { ProjectsDirectoryCard } from "./ProjectsDirectoryCard";
import { Layers } from "lucide-react";

export function ProjectsDirectoryContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  // URL is the SINGLE source of truth for activeCategory
  const rawCategory = searchParams ? searchParams.get("category") : null;
  const activeCategory: FilterCategory = isValidCategory(rawCategory)
    ? rawCategory
    : "all";

  const categories: FilterCategory[] = ["all", ...ALLOWED_CATEGORIES];

  const handleFilterChange = (category: FilterCategory) => {
    const nextUrl =
      category === "all"
        ? "/projects"
        : `/projects?category=${encodeURIComponent(category)}`;
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", nextUrl);
    }
  };

  const filteredProjects = filterProjectsByCategory(activeCategory);

  const getLabel = (cat: FilterCategory) => {
    switch (cat) {
      case "all":
        return t.projects.filters.all;
      case "flagship":
        return t.projects.filters.flagship;
      case "backend-api":
        return t.projects.filters.backend;
      case "fullstack":
        return t.projects.filters.fullstack;
      case "academic":
        return t.projects.filters.academic;
    }
  };

  return (
    <div className="space-y-12">
      {/* Catalog Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-champagne bg-champagne/10 border border-champagne/20">
          <Layers className="w-3.5 h-3.5 text-champagne" />
          <span>{t.projects.catalogBadge}</span>
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
          {t.projects.catalogTitle}
        </h1>
        <p className="text-base sm:text-lg text-sand leading-relaxed">
          {t.projects.catalogSubtitle}
        </p>
      </div>

      {/* Semantic Accessible Filter Group */}
      <div className="flex flex-col items-center gap-3">
        <div
          role="group"
          aria-label={t.projects.catalogBadge}
          className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-graphite-elevated/70 border border-border-subtle/80 backdrop-blur-sm"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleFilterChange(cat)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne ${
                  isSelected
                    ? "bg-champagne text-obsidian font-semibold shadow-md shadow-champagne/20"
                    : "text-sand hover:text-ivory hover:bg-graphite/60"
                }`}
              >
                <span>{getLabel(cat)}</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${
                    isSelected
                      ? "bg-obsidian/20 text-obsidian font-bold"
                      : "bg-graphite/70 text-sand/70 border border-border-subtle/40"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <ProjectsDirectoryCard
              key={project.id}
              project={project}
              fromFilter={activeCategory}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4 rounded-2xl border border-border-subtle/60 bg-graphite/30">
          <p className="text-sand text-base">{t.projects.noProjectsFound}</p>
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-champagne text-obsidian hover:bg-champagne-bright transition-colors"
          >
            {t.projects.showAll}
          </button>
        </div>
      )}
    </div>
  );
}
