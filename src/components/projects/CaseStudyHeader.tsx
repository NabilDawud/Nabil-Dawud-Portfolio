"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Users,
  UserCheck,
  Lock,
  GitBranch,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "../brand/SocialIcons";
import { Project } from "@/data/types";
import { useLanguage } from "@/i18n";
import { getSafeBackUrl, isTeamProject } from "@/data/projects-helpers";
import { Badge } from "../ui/Badge";

interface CaseStudyHeaderProps {
  project: Project;
  fromParam: string | null;
}

export function CaseStudyHeader({ project, fromParam }: CaseStudyHeaderProps) {
  const { t, l, isRTL } = useLanguage();
  const backUrl = getSafeBackUrl(fromParam);

  const isTeam = isTeamProject(project);

  const statusLabel =
    project.status === "verified-production"
      ? t.projects.status.verifiedProduction
      : project.status === "verified-demo"
      ? t.projects.status.verifiedDemo
      : project.status === "verified-code"
      ? t.projects.status.verifiedCode
      : t.projects.status.pendingVerification;

  return (
    <header className="space-y-8 border-b border-border-subtle/60 pb-10">
      {/* Top Navigation & Return Breadcrumb */}
      <div>
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-sm font-medium text-sand hover:text-champagne transition-colors focus:outline-none focus:underline"
        >
          <ArrowLeft
            className={isRTL ? "w-4 h-4 rotate-180" : "w-4 h-4"}
          />
          <span>{t.projects.caseStudy.backToProjects}</span>
        </Link>
      </div>

      {/* Badges Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono uppercase tracking-wider text-sand/80 bg-graphite-elevated/70 px-3 py-1 rounded-full border border-border-subtle/60">
          {project.category}
        </span>

        {project.featured && (
          <Badge variant="champagne" size="sm" className="gap-1">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>{t.projects.caseStudy.flagshipBadge}</span>
          </Badge>
        )}

        <Badge
          variant={isTeam ? "default" : "teal"}
          size="sm"
          className="gap-1.5"
        >
          {isTeam ? (
            <Users className="w-3.5 h-3.5 text-sand" />
          ) : (
            <UserCheck className="w-3.5 h-3.5 text-teal" />
          )}
          <span>{l(project.ownership)}</span>
        </Badge>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-sand/70 bg-graphite-elevated/40 px-3 py-1 rounded-full border border-border-subtle/40">
          <span
            className={`w-2 h-2 rounded-full ${
              project.status === "verified-production"
                ? "bg-teal animate-pulse"
                : project.status === "verified-demo"
                ? "bg-champagne"
                : "bg-sand/60"
            }`}
          />
          {statusLabel}
        </span>
      </div>

      {/* Main Title & Tagline */}
      <div className="space-y-3 text-start">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight">
          {l(project.title)}
        </h1>
        <p className="text-lg sm:text-xl text-champagne font-medium leading-relaxed max-w-4xl">
          {l(project.tagline)}
        </p>
      </div>

      {/* Role & Verification Bar */}
      <div className="p-4 rounded-xl bg-graphite-elevated/40 border border-border-subtle/70 flex flex-wrap items-center justify-between gap-4 text-start">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-sand/60 block">
            {t.projects.caseStudy.myRoleTitle}
          </span>
          <span className="text-sm sm:text-base font-semibold text-ivory">
            {l(project.role)}
          </span>
        </div>

        {/* Action Ribbon */}
        <div className="flex flex-wrap items-center gap-3">
          {project.links.liveDemo && (
            <a
              href={project.links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-champagne text-obsidian hover:bg-champagne-bright transition-colors shadow-sm"
            >
              <span>{t.projects.liveDemo}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-graphite-elevated/80 text-ivory hover:text-champagne border border-border-subtle/80 hover:border-champagne/40 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t.projects.sourceCode}</span>
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-sand/60 bg-graphite/40 border border-border-subtle/40 select-none"
              title={t.projects.repoPrivate}
            >
              <Lock className="w-3.5 h-3.5 text-sand/50" />
              <span>{t.projects.repoPrivate}</span>
            </span>
          )}

          {project.links.cicd && (
            <a
              href={project.links.cicd}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-sand/80 hover:text-ivory bg-graphite/40 border border-border-subtle/50 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-teal" />
              <span>{t.projects.cicdPipeline}</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
