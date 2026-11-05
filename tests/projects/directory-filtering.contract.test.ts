import test from "node:test";
import assert from "node:assert";
import {
  ProjectsDirectoryContent,
  ProjectsDirectorySkeleton,
  ProjectsDirectoryCard,
} from "@/components/projects";
import {
  ALLOWED_CATEGORIES,
  filterProjectsByCategory,
  getCategoryCount,
  getProjectBySlug,
  getSafeBackUrl,
  isValidCategory,
} from "@/data/projects-helpers";

test("Task 2 (Step 2): Projects Directory contract and component exports", () => {
  // 1. Component exports exist
  assert.strictEqual(typeof ProjectsDirectoryContent, "function");
  assert.strictEqual(typeof ProjectsDirectorySkeleton, "function");
  assert.strictEqual(typeof ProjectsDirectoryCard, "function");

  // 2. Canonical categories mapping
  assert.strictEqual(ALLOWED_CATEGORIES.length, 4);
  const categories = ["all", ...ALLOWED_CATEGORIES];

  categories.forEach((cat) => {
    assert.strictEqual(isValidCategory(cat), true);
    const filtered = filterProjectsByCategory(cat);
    assert.ok(filtered.length > 0, `Category ${cat} must return at least 1 project`);
  });

  // 3. Fallback on invalid category
  const fallback = filterProjectsByCategory("invalid-category-xyz");
  assert.strictEqual(fallback.length, 5);

  // 4. Exact project counts per category
  assert.strictEqual(getCategoryCount("all"), 5);
  assert.strictEqual(getCategoryCount("flagship"), 2);
  assert.strictEqual(getCategoryCount("backend-api"), 1);
  assert.strictEqual(getCategoryCount("fullstack"), 1);
  assert.strictEqual(getCategoryCount("academic"), 1);

  // 5. Mishwar flagship prominence
  const mishwar = getProjectBySlug("meshwar");
  assert.ok(mishwar, "Mishwar must exist");
  assert.strictEqual(mishwar.featured, true, "Mishwar must be flagged as featured/flagship");
  assert.strictEqual(mishwar.category, "flagship");

  // 6. Return context security
  assert.strictEqual(getSafeBackUrl("flagship"), "/projects?category=flagship");
  assert.strictEqual(getSafeBackUrl("backend-api"), "/projects?category=backend-api");
  assert.strictEqual(getSafeBackUrl("fullstack"), "/projects?category=fullstack");
  assert.strictEqual(getSafeBackUrl("academic"), "/projects?category=academic");
  assert.strictEqual(getSafeBackUrl("all"), "/projects");
  assert.strictEqual(getSafeBackUrl("malicious-value"), "/projects");
  assert.strictEqual(getSafeBackUrl(null), "/projects");
});
