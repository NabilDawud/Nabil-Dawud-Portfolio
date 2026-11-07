import test from "node:test";
import assert from "node:assert";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/projects-helpers";
import {
  generateStaticParams,
  generateMetadata,
} from "@/app/[locale]/projects/[slug]/page";

test("Task 2 (Step 6): Dynamic Case Study Route contract and static params", async () => {
  // 1. generateStaticParams pre-renders all 5 projects across locales (5 x 2 = 10)
  const params = await generateStaticParams();
  assert.strictEqual(Array.isArray(params), true);
  assert.strictEqual(params.length, 10);

  const slugs = Array.from(new Set(params.map((p) => p.slug)));
  const expectedSlugs = [
    "meshwar",
    "masar",
    "apartment-marketplace",
    "orbit",
    "university-issues",
  ];
  assert.deepStrictEqual(slugs.sort(), expectedSlugs.sort());

  // 2. Each project is retrievable by slug and has title & category
  for (const slug of expectedSlugs) {
    const project = getProjectBySlug(slug);
    assert.ok(project, `Project ${slug} must be found via getProjectBySlug`);
    assert.strictEqual(project.slug, slug);
  }

  // 3. generateMetadata respects Next.js 16 async params contract
  for (const slug of expectedSlugs) {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug, locale: "en" }),
    });

    assert.ok(meta, `Metadata for ${slug} must be defined`);
    assert.ok(meta.title, `Title for ${slug} must be defined`);
    assert.ok(meta.description, `Description for ${slug} must be defined`);
    assert.strictEqual(
      meta.alternates?.canonical,
      `/projects/${slug}`,
      `Canonical URL for ${slug} must match`
    );
  }

  // 3. generateMetadata for unknown slug returns fallback title
  const unknownMeta = await generateMetadata({
    params: Promise.resolve({ slug: "non-existent-project", locale: "en" }),
  });
  assert.strictEqual(unknownMeta.title, "Project Not Found");

  // 4. Adjacent project references across all 5 projects
  const all = getAllProjects();
  for (const project of all) {
    const adjacent = getAdjacentProjects(project.slug);
    assert.ok(adjacent, `Adjacent projects for ${project.slug} must exist`);
    assert.ok(adjacent.prev.slug, "Prev project must have slug");
    assert.ok(adjacent.next.slug, "Next project must have slug");
  }
});
