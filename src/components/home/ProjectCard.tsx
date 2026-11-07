"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Users,
  UserCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { GithubIcon } from "../brand/SocialIcons";
import { Project } from "@/data/types";
import { useLanguage } from "@/i18n";
import { Badge } from "../ui/Badge";
import { localizePath } from "@/lib/navigation";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t, l, isRTL, locale } = useLanguage();
  const isTeamProject =
    project.ownership.en.toLowerCase().includes("team") ||
    project.id === "masar" ||
    project.id === "orbit";

  return (
    <article
      className="group relative rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-champagne/40 hover:shadow-2xl hover:shadow-black/70"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="space-y-6">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-sand/80 bg-graphite-elevated/70 px-3 py-1 rounded-full border border-border-subtle/60">
            {project.category}
          </span>

          <div className="flex items-center gap-2">
            {project.featured && (
              <Badge variant="champagne" size="sm">
                Flagship
              </Badge>
            )}
            <Badge
              variant={isTeamProject ? "default" : "teal"}
              size="sm"
              className="gap-1.5"
            >
              {isTeamProject ? (
                <Users className="w-3 h-3 text-sand" />
              ) : (
                <UserCheck className="w-3 h-3 text-teal" />
              )}
              <span>{l(project.ownership)}</span>
            </Badge>
          </div>
        </div>

        {/* Project Title & Tagline */}
        <div className="space-y-2 text-start">
          <h3
            id={`project-${project.id}-title`}
            className="font-display font-bold text-2xl sm:text-3xl text-ivory group-hover:text-champagne-bright transition-colors"
          >
            {l(project.title)}
          </h3>
          <p className="text-sm sm:text-base text-champagne/90 font-medium leading-relaxed">
            {l(project.tagline)}
          </p>
        </div>

        {/* Narrative Overview / Role */}
        <div className="text-start space-y-2">
          <div className="text-xs font-mono text-sand/70">
            <span className="text-champagne/80 font-medium">Role:</span>{" "}
            {l(project.role)}
          </div>
          <p className="text-sm text-sand leading-relaxed line-clamp-3">
            {l(project.overview)}
          </p>
        </div>

        {/* Architectural Highlights / Key Features */}
        <div className="space-y-2 pt-2 border-t border-border-subtle/40 text-start">
          <div className="text-[11px] font-mono uppercase tracking-wider text-sand/60">
            Key Architecture & Features
          </div>
          <ul className="space-y-2">
            {l(project.keyFeatures).slice(0, 3).map((feature, idx) => (
              <li
                key={idx}
                className="text-xs sm:text-sm text-ivory/90 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer: Technologies & Verified Actions */}
      <div className="pt-6 mt-6 border-t border-border-subtle/50 space-y-5">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-graphite-elevated/70 text-sand border border-border-subtle/60"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-graphite-elevated/40 text-sand/60 border border-border-subtle/40">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            {/* Live Demo Link */}
            {project.links.liveDemo && (
              <a
                href={project.links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-champagne hover:text-champagne-bright hover:underline transition-colors"
              >
                <span>{t.projects.liveDemo}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* GitHub Repository Link / Pending Status */}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sand hover:text-ivory transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-1 text-[11px] font-mono text-sand/60 bg-graphite-elevated/40 px-2.5 py-1 rounded-md border border-border-subtle/40 select-none"
                title={t.projects.repoPrivate}
              >
                <Lock className="w-3 h-3 text-sand/50" />
                <span>{t.projects.repoPrivate}</span>
              </span>
            )}
          </div>

          {/* Deep Case Study Link */}
          <Link
            href={localizePath(`/projects/${project.slug}`, locale)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-ivory hover:text-champagne transition-colors"
          >
            <span>{t.projects.viewCaseStudy}</span>
            <ArrowRight
              className={isRTL ? "w-3.5 h-3.5 rotate-180" : "w-3.5 h-3.5"}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
