"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Project } from "@/data/types";
import { useLanguage } from "@/i18n";
import {
  FileText,
  Target,
  Sparkles,
  UserCheck,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Code2,
  ShieldAlert,
} from "lucide-react";
import { CaseStudyHeader } from "./CaseStudyHeader";
import { CaseStudyNav } from "./CaseStudyNav";
import { MishwarArchitectureDiagram } from "./MishwarArchitectureDiagram";

interface CaseStudyViewProps {
  project: Project;
  adjacent: {
    prev: Project | null;
    next: Project | null;
  };
  fromParam?: string | null;
}

export function CaseStudyView({
  project,
  adjacent,
  fromParam: propFromParam,
}: CaseStudyViewProps) {
  const { t, l } = useLanguage();
  const searchParams = useSearchParams();
  const fromParam =
    propFromParam ?? (searchParams ? searchParams.get("from") : null);

  return (
    <article className="space-y-16 max-w-5xl mx-auto text-start">
      {/* 1. Header & Quick Meta */}
      <CaseStudyHeader project={project} fromParam={fromParam} />

      {/* 2. Overview & Context */}
      <section className="space-y-4" aria-labelledby="section-overview">
        <div className="flex items-center gap-2.5 text-champagne">
          <FileText className="w-5 h-5 text-champagne" />
          <h2
            id="section-overview"
            className="font-display font-bold text-2xl sm:text-3xl text-ivory"
          >
            {t.projects.caseStudy.overviewTitle}
          </h2>
        </div>
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40">
          <p className="text-base sm:text-lg text-sand leading-relaxed whitespace-pre-line">
            {l(project.overview)}
          </p>
        </div>
      </section>

      {/* 3. Problem & Objectives vs Engineering Solution */}
      <section className="space-y-6" aria-labelledby="section-problem-solution">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="font-display font-bold text-xl text-ivory">
                {t.projects.caseStudy.problemTitle}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-sand leading-relaxed">
              {l(project.problem)}
            </p>
          </div>

          {/* Solution */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-4">
            <div className="flex items-center gap-2 text-teal">
              <Sparkles className="w-5 h-5 text-teal" />
              <h3 className="font-display font-bold text-xl text-ivory">
                {t.projects.caseStudy.solutionTitle}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-sand leading-relaxed">
              {l(project.solution)}
            </p>
          </div>
        </div>
      </section>

      {/* 4. My Role & Personal Contributions */}
      <section className="space-y-6" aria-labelledby="section-role">
        <div className="flex items-center gap-2.5 text-champagne">
          <UserCheck className="w-5 h-5 text-champagne" />
          <h2
            id="section-role"
            className="font-display font-bold text-2xl sm:text-3xl text-ivory"
          >
            {t.projects.caseStudy.myRoleTitle}
          </h2>
        </div>
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-mono text-champagne font-semibold">
              {l(project.role)} &bull; {l(project.ownership)}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border-subtle/40">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sand/70">
              {t.projects.caseStudy.verifiedContributionsTitle}
            </h4>
            <ul className="space-y-3">
              {l(project.verifiedHighlights).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-ivory/90">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Architecture & Engineering Decisions (+ Mishwar Selective Diagram) */}
      <section className="space-y-6" aria-labelledby="section-architecture">
        <div className="flex items-center gap-2.5 text-champagne">
          <Cpu className="w-5 h-5 text-champagne" />
          <h2
            id="section-architecture"
            className="font-display font-bold text-2xl sm:text-3xl text-ivory"
          >
            {t.projects.caseStudy.architectureTitle}
          </h2>
        </div>

        {/* Bulleted Architecture Decisions */}
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-4">
          <ul className="space-y-3">
            {l(project.architectureHighlights).map((decision, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-ivory/90">
                <span className="w-2 h-2 rounded-full bg-champagne shrink-0 mt-2" />
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Embedded Selective Mishwar Diagram (Mishwar Only) */}
        {project.id === "meshwar" && <MishwarArchitectureDiagram />}
      </section>

      {/* 6. Key Verified Features Scope */}
      <section className="space-y-6" aria-labelledby="section-features">
        <div className="flex items-center gap-2.5 text-teal">
          <CheckCircle2 className="w-5 h-5 text-teal" />
          <h2
            id="section-features"
            className="font-display font-bold text-2xl sm:text-3xl text-ivory"
          >
            {t.projects.caseStudy.verifiedFeaturesTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {l(project.keyFeatures).map((feature, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-border-subtle/70 bg-graphite-elevated/30 flex items-start gap-3"
            >
              <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base text-ivory/95">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Key Technical Challenges & Lessons Learned */}
      <section className="space-y-6" aria-labelledby="section-challenges-lessons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Challenges */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-4">
            <div className="flex items-center gap-2 text-amber-400">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-display font-bold text-xl text-ivory">
                {t.projects.caseStudy.challengesTitle}
              </h3>
            </div>
            <ul className="space-y-3">
              {l(project.challenges).map((item, idx) => (
                <li key={idx} className="text-sm sm:text-base text-sand flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons Learned */}
          <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-4">
            <div className="flex items-center gap-2 text-teal">
              <Lightbulb className="w-5 h-5 text-teal" />
              <h3 className="font-display font-bold text-xl text-ivory">
                {t.projects.caseStudy.lessonsTitle}
              </h3>
            </div>
            <ul className="space-y-3">
              {l(project.lessonsLearned).map((item, idx) => (
                <li key={idx} className="text-sm sm:text-base text-sand flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Technology Stack */}
      <section className="space-y-6" aria-labelledby="section-tech-stack">
        <div className="flex items-center gap-2.5 text-champagne">
          <Code2 className="w-5 h-5 text-champagne" />
          <h2
            id="section-tech-stack"
            className="font-display font-bold text-2xl sm:text-3xl text-ivory"
          >
            {t.projects.caseStudy.techStackTitle}
          </h2>
        </div>
        <div className="p-6 sm:p-8 rounded-2xl border border-border-subtle/80 bg-graphite/40 space-y-4">
          <div className="flex flex-wrap gap-2.5" dir="ltr">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono bg-graphite-elevated text-sand border border-border-subtle/80 hover:border-champagne/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Verification Boundaries & Transparency Disclaimers */}
      {project.disclaimers && l(project.disclaimers).length > 0 && (
        <section className="space-y-4" aria-labelledby="section-disclaimers">
          <div className="p-6 sm:p-8 rounded-2xl border border-sand/20 bg-graphite-elevated/20 space-y-4">
            <div className="flex items-center gap-2 text-sand/80">
              <ShieldAlert className="w-5 h-5 text-champagne" />
              <h3
                id="section-disclaimers"
                className="font-display font-semibold text-lg text-ivory"
              >
                {t.projects.caseStudy.disclaimerNotice}
              </h3>
            </div>
            <ul className="space-y-2">
              {l(project.disclaimers).map((note, idx) => (
                <li
                  key={idx}
                  className="text-xs sm:text-sm text-sand/80 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne/60 shrink-0 mt-2" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 10. Previous / Next Project Switcher */}
      <CaseStudyNav
        prevProject={adjacent.prev}
        nextProject={adjacent.next}
        fromParam={fromParam}
      />
    </article>
  );
}
