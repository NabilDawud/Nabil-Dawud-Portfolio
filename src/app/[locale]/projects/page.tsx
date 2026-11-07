import React, { Suspense } from "react";
import type { Metadata } from "next";
import { defaultOgImages, SITE_URL } from "@/lib/seo";
import {
  ProjectsDirectoryContent,
  ProjectsDirectorySkeleton,
} from "@/components/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "دليل المشاريع الهندسية — أعمال مختارة"
      : "Projects Catalog — Selected Work",
    description: isAr
      ? "استكشف الأنظمة الإنتاجية المعتمدة، والمعماريات الخلفية، وتطبيقات الويب الشاملة التي بناها نبيل داود."
      : "Explore verified production systems, backend architectures, full-stack applications, and academic engineering projects built by Nabil Dawud.",
    alternates: {
      canonical: isAr ? "/ar/projects" : "/projects",
      languages: {
        en: "/projects",
        ar: "/ar/projects",
        "x-default": "/projects",
      },
    },
    openGraph: {
      title: isAr
        ? "دليل المشاريع الهندسية | نبيل داود"
        : "Engineering Projects Catalog | Nabil Dawud",
      description: isAr
        ? "أنظمة برمجية موثقة ومعماريات خلفية قوية."
        : "Verified production backend systems and architecture case studies.",
      url: isAr
        ? `${SITE_URL}/ar/projects`
        : `${SITE_URL}/projects`,
      images: defaultOgImages,
    },
  };
}

export default function ProjectsPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Suspense fallback={<ProjectsDirectorySkeleton />}>
        <ProjectsDirectoryContent />
      </Suspense>
    </main>
  );
}
