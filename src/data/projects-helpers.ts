import { Project } from "./types";
import { projects } from "./projects";

export const ALLOWED_CATEGORIES = [
  "flagship",
  "backend-api",
  "fullstack",
  "academic",
] as const;

export type FilterCategory = (typeof ALLOWED_CATEGORIES)[number] | "all";

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(
  currentSlug: string
): { prev: Project; next: Project } | undefined {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return undefined;

  const total = projects.length;
  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
}

export function isValidCategory(category: unknown): category is FilterCategory {
  if (typeof category !== "string") return false;
  return (
    category === "all" ||
    (ALLOWED_CATEGORIES as readonly string[]).includes(category)
  );
}

export function isTeamProject(project: Project): boolean {
  return (
    project.ownership.en.toLowerCase().includes("team") ||
    project.id === "masar" ||
    project.id === "orbit"
  );
}

export function filterProjectsByCategory(category: string): Project[] {
  if (!isValidCategory(category) || category === "all") {
    return projects;
  }
  return projects.filter((p) => p.category === category);
}

export function getCategoryCount(category: FilterCategory): number {
  if (category === "all") {
    return projects.length;
  }
  return projects.filter((p) => p.category === category).length;
}

export function getSafeBackUrl(fromParam: string | null): string {
  if (
    fromParam &&
    (ALLOWED_CATEGORIES as readonly string[]).includes(fromParam)
  ) {
    return `/projects?category=${fromParam}`;
  }
  return "/projects";
}
