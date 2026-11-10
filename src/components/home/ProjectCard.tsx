"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  Users,
  UserCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { GithubIcon } from "../brand/SocialIcons";
import { Project } from "@/data/types";
import { useLanguage } from "@/i18n";
import { Badge } from "../ui/Badge";
import { localizePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface ProjectCardProps {
  project: Project;
  className?: string;
  isHero?: boolean;
}

export function ProjectCard({ project, className, isHero = false }: ProjectCardProps) {
  const { t, l, isRTL, locale } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const canTilt = useInteractiveMotion();
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Subtle 3D tilt: max 5 degrees
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.15 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!canTilt) return;
    x.set(0);
    y.set(0);
  };

  const isTeamProject =
    project.ownership.en.toLowerCase().includes("team") ||
    project.id === "masar" ||
    project.id === "orbit";

  const cardContent = (
    <>
      {/* Dynamic Radial Spotlight Glow */}
      {canTilt && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212, 175, 55, 0.12), transparent 80%)`,
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -inset-px z-0 rounded-2xl transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(350px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212, 175, 55, 0.4), transparent 80%)`,
              maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Main Card Content */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div className="space-y-6">
          {/* Top Badges & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-sand/80 bg-graphite-elevated/70 px-3 py-1 rounded-full border border-border-subtle/60">
              {project.category}
            </span>

            <div className="flex items-center gap-2">
              {project.featured && (
                <Badge variant="champagne" size="sm" className="gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-champagne" />
                  <span>Flagship</span>
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
              className={cn(
                "font-display font-bold text-ivory group-hover:text-champagne-bright transition-colors",
                isHero ? "text-2xl sm:text-3xl lg:text-4xl" : "text-2xl sm:text-3xl"
              )}
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
            <ul className={cn("grid gap-2", isHero ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
              {l(project.keyFeatures).slice(0, isHero ? 4 : 3).map((feature, idx) => (
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
            {project.techStack.slice(0, isHero ? 7 : 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-graphite-elevated/70 text-sand border border-border-subtle/60"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (isHero ? 7 : 5) && (
              <span className="px-2 py-1 rounded-md text-[10px] font-mono bg-graphite-elevated/40 text-sand/60 border border-border-subtle/40">
                +{project.techStack.length - (isHero ? 7 : 5)}
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
              className="group/link inline-flex items-center gap-1 text-xs font-semibold text-ivory hover:text-champagne transition-colors"
            >
              <span>{t.projects.viewCaseStudy}</span>
              <ArrowRight
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  isRTL
                    ? "rotate-180 group-hover/link:-translate-x-1"
                    : "group-hover/link:translate-x-1"
                )}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  const baseClassName = cn(
    "group relative rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/70 p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300 hover:border-champagne/40 hover:shadow-2xl hover:shadow-black/70 overflow-hidden h-full",
    className
  );

  if (!canTilt) {
    return (
      <article
        ref={cardRef}
        className={baseClassName}
        aria-labelledby={`project-${project.id}-title`}
      >
        {cardContent}
      </article>
    );
  }

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(baseClassName, "will-change-transform h-full")}
        aria-labelledby={`project-${project.id}-title`}
      >
        {cardContent}
      </motion.article>
    </div>
  );
}
