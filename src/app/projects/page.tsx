import React, { Suspense } from "react";
import type { Metadata } from "next";
import {
  ProjectsDirectoryContent,
  ProjectsDirectorySkeleton,
} from "@/components/projects";

export const metadata: Metadata = {
  title: "Engineering Projects Catalog",
  description:
    "Explore verified production systems, backend architectures, full-stack applications, and academic engineering projects built by Nabil Dawud.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Suspense fallback={<ProjectsDirectorySkeleton />}>
        <ProjectsDirectoryContent />
      </Suspense>
    </main>
  );
}
