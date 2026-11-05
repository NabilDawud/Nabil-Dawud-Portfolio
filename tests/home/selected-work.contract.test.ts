import test from "node:test";
import assert from "node:assert";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/home/ProjectCard";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";

test("Task 3: Selected Work contract and flagship showcases", () => {
  // 1. Component exports exist
  assert.strictEqual(typeof ProjectCard, "function");
  assert.strictEqual(typeof SelectedWorkSection, "function");

  // 2. Verified 3 featured projects
  const featuredIds = ["meshwar", "masar", "apartment-marketplace"];
  featuredIds.forEach((id) => {
    const proj = projects.find((p) => p.id === id);
    assert.ok(proj, `Project ${id} must exist in projects array`);
    assert.ok(proj.links.liveDemo, `Project ${id} must have a live demo URL`);
  });

  // 3. Masar strict constraints
  const masar = projects.find((p) => p.id === "masar");
  assert.ok(masar);
  assert.match(
    masar.tagline.en,
    /ERP Platform for Humanitarian and Development Organizations/i
  );
  assert.doesNotMatch(masar.tagline.en, /Enterprise SaaS/i);
  assert.match(masar.ownership.en, /Backend Developer within a project team/i);
  assert.strictEqual(masar.links.github, undefined); // Pending

  // 4. Mishwar & Apartment Marketplace public repos
  const mishwar = projects.find((p) => p.id === "meshwar");
  assert.ok(mishwar?.links.github?.startsWith("https://github.com/"));
  const apartment = projects.find((p) => p.id === "apartment-marketplace");
  assert.ok(apartment?.links.github?.startsWith("https://github.com/"));
});
