import React, { Suspense } from "react";
import type { Metadata } from "next";
import { defaultOgImages, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/projects-helpers";
import { CaseStudyView } from "@/components/projects";

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  const locales = ["en", "ar"];

  return locales.flatMap((locale) =>
    projects.map((p) => ({
      locale,
      slug: p.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const isAr = locale === "ar";
  const projectTitle = isAr ? project.title.ar : project.title.en;
  const projectTagline = isAr ? project.tagline.ar : project.tagline.en;

  const enCanonical = `/projects/${project.slug}`;
  const arCanonical = `/ar/projects/${project.slug}`;
  const activeCanonical = isAr ? arCanonical : enCanonical;

  const caseStudyLabel = isAr ? "دراسة حالة تقنية" : "Technical Case Study";

  return {
    title: `${projectTitle} — ${caseStudyLabel}`,
    description: projectTagline,
    alternates: {
      canonical: activeCanonical,
      languages: {
        en: enCanonical,
        ar: arCanonical,
        "x-default": enCanonical,
      },
    },
    openGraph: {
      title: `${projectTitle} — ${caseStudyLabel} | Nabil Dawud`,
      description: projectTagline,
      url: `${SITE_URL}${activeCanonical}`,
      type: "article",
      images: defaultOgImages,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const adjacent = getAdjacentProjects(slug) || { prev: null, next: null };

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-champagne/40">...</div>}>
        <CaseStudyView project={project} adjacent={adjacent} />
      </Suspense>
    </main>
  );
}
