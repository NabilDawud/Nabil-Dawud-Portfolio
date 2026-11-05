import test from "node:test";
import assert from "node:assert";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
  filterProjectsByCategory,
  isValidCategory,
  getCategoryCount,
  getSafeBackUrl,
  ALLOWED_CATEGORIES,
  isTeamProject,
} from "@/data/projects-helpers";

test("Task 2 (Step 1): Data helpers and canonical category contracts", () => {
  // 1. getAllProjects
  const all = getAllProjects();
  assert.strictEqual(all.length, 5);

  // 2. getProjectBySlug
  const meshwar = getProjectBySlug("meshwar");
  assert.ok(meshwar);
  assert.strictEqual(meshwar.slug, "meshwar");

  const nonExistent = getProjectBySlug("non-existent");
  assert.strictEqual(nonExistent, undefined);

  // 3. getAdjacentProjects (circular adjacent navigation)
  const adjacentMeshwar = getAdjacentProjects("meshwar");
  assert.ok(adjacentMeshwar);
  assert.strictEqual(adjacentMeshwar.prev.slug, "university-issues");
  assert.strictEqual(adjacentMeshwar.next.slug, "masar");

  const adjacentLast = getAdjacentProjects("university-issues");
  assert.ok(adjacentLast);
  assert.strictEqual(adjacentLast.prev.slug, "orbit");
  assert.strictEqual(adjacentLast.next.slug, "meshwar");

  // Unknown slug adjacent returns undefined
  assert.strictEqual(getAdjacentProjects("unknown-slug"), undefined);

  // 4. Canonical categories & isValidCategory
  assert.deepStrictEqual(ALLOWED_CATEGORIES, [
    "flagship",
    "backend-api",
    "fullstack",
    "academic",
  ]);

  assert.strictEqual(isValidCategory("all"), true);
  assert.strictEqual(isValidCategory("flagship"), true);
  assert.strictEqual(isValidCategory("backend-api"), true);
  assert.strictEqual(isValidCategory("fullstack"), true);
  assert.strictEqual(isValidCategory("academic"), true);
  assert.strictEqual(isValidCategory("invalid-cat"), false);
  assert.strictEqual(isValidCategory(null), false);
  assert.strictEqual(isValidCategory(undefined), false);

  // 5. filterProjectsByCategory
  assert.strictEqual(filterProjectsByCategory("all").length, 5);
  assert.strictEqual(filterProjectsByCategory("flagship").length, 2);
  assert.strictEqual(filterProjectsByCategory("backend-api").length, 1);
  assert.strictEqual(filterProjectsByCategory("fullstack").length, 1);
  assert.strictEqual(filterProjectsByCategory("academic").length, 1);
  assert.strictEqual(filterProjectsByCategory("invalid-cat").length, 5); // fallback to all

  // 6. getCategoryCount
  assert.strictEqual(getCategoryCount("all"), 5);
  assert.strictEqual(getCategoryCount("flagship"), 2);
  assert.strictEqual(getCategoryCount("backend-api"), 1);
  assert.strictEqual(getCategoryCount("fullstack"), 1);
  assert.strictEqual(getCategoryCount("academic"), 1);

  // 7. getSafeBackUrl allowlisting security
  assert.strictEqual(getSafeBackUrl("flagship"), "/projects?category=flagship");
  assert.strictEqual(getSafeBackUrl("backend-api"), "/projects?category=backend-api");
  assert.strictEqual(getSafeBackUrl("fullstack"), "/projects?category=fullstack");
  assert.strictEqual(getSafeBackUrl("academic"), "/projects?category=academic");
  assert.strictEqual(getSafeBackUrl("all"), "/projects");
  assert.strictEqual(getSafeBackUrl(null), "/projects");
  assert.strictEqual(getSafeBackUrl(""), "/projects");
  assert.strictEqual(getSafeBackUrl("https://evil.com"), "/projects");
  assert.strictEqual(getSafeBackUrl("/etc/passwd"), "/projects");

  // 8. isTeamProject ownership helper
  assert.strictEqual(isTeamProject(meshwar!), false);
  const masar = getProjectBySlug("masar");
  assert.strictEqual(isTeamProject(masar!), true);
  const orbit = getProjectBySlug("orbit");
  assert.strictEqual(isTeamProject(orbit!), true);
});
