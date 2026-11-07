import type { MetadataRoute } from "next";
import { getAllProjects } from "@/data/projects-helpers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nabil-dawud.vercel.app";

  // Static verified milestone dates reflecting actual content updates
  const coreMilestoneDate = new Date("2026-11-07");

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: coreMilestoneDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        en: `${baseUrl}${page.path}`,
        ar: `${baseUrl}/ar${page.path}`,
        "x-default": `${baseUrl}${page.path}`,
      },
    },
  }));

  const projectReleaseDates: Record<string, string> = {
    meshwar: "2026-11-01",
    masar: "2026-10-15",
    "apartment-marketplace": "2026-09-20",
    orbit: "2026-08-10",
    "university-issues": "2026-07-01",
  };

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((project) => {
    const enUrl = `${baseUrl}/projects/${project.slug}`;
    const arUrl = `${baseUrl}/ar/projects/${project.slug}`;
    const modDate = new Date(projectReleaseDates[project.slug] || "2026-11-01");

    return {
      url: enUrl,
      lastModified: modDate,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      alternates: {
        languages: {
          en: enUrl,
          ar: arUrl,
          "x-default": enUrl,
        },
      },
    };
  });

  return [...staticEntries, ...projectEntries];
}
