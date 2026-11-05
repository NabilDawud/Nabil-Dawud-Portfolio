import test from "node:test";
import assert from "node:assert";
import { projects } from "@/data/projects";

test("Project Data Integrity Contract: Audit and Truth Constraints", () => {
  // 1. All 5 verified projects present with exact canonical slugs
  const expectedSlugs = [
    "meshwar",
    "masar",
    "apartment-marketplace",
    "orbit",
    "university-issues",
  ];
  assert.strictEqual(projects.length, 5);
  expectedSlugs.forEach((slug) => {
    const proj = projects.find((p) => p.slug === slug);
    assert.ok(proj, `Project with slug '${slug}' must exist`);
    assert.strictEqual(proj.id, slug);
    // Ensure slug is pure lowercase ASCII with standard hyphens
    assert.match(slug, /^[a-z0-9-]+$/);
  });

  // 2. Mishwar verified boundaries
  const mishwar = projects.find((p) => p.slug === "meshwar")!;
  assert.ok(mishwar.links.liveDemo);
  assert.ok(mishwar.links.github);
  assert.ok(mishwar.links.cicd);
  // Offline capability scoped to route planning
  assert.match(
    mishwar.overview.en,
    /client-cached route graphs?|route graph/i
  );
  // Connectivity boundary for live tracking/bidding/messaging
  const allMishwarText = JSON.stringify(mishwar);
  assert.match(
    allMishwarText,
    /require|connectivity|when connected|network/i
  );
  // Human-readable elapsed-age indicators
  assert.match(allMishwarText, /elapsed|age|منذ/i);
  // No fabricated numerical freshness thresholds
  assert.doesNotMatch(allMishwarText, /<30s|30s[–-]2m|>2m/i);

  // 3. Masar verified team role and module scope
  const masar = projects.find((p) => p.slug === "masar")!;
  assert.match(masar.ownership.en, /Backend Developer within a Project Team/i);
  assert.match(
    masar.tagline.en,
    /ERP Platform for Humanitarian and Development Organizations/i
  );
  assert.doesNotMatch(masar.tagline.en, /Enterprise SaaS/i);
  assert.strictEqual(masar.links.github, undefined);
  assert.ok(masar.links.liveDemo?.includes("masar-v1.apps.taqat.academy"));
  // Verifies TaskWorkflow and ModuleManagement contributions
  const masarHighlights = JSON.stringify(masar.verifiedHighlights);
  assert.match(masarHighlights, /TaskWorkflow|task|module/i);

  // 4. Apartment Maintenance Marketplace: Multi-role without unverified RBAC
  const apartment = projects.find((p) => p.slug === "apartment-marketplace")!;
  assert.match(apartment.ownership.en, /Full Stack/i);
  const apartmentText = JSON.stringify(apartment);
  assert.match(apartmentText, /Better Auth/i);
  assert.match(apartmentText, /role-specific views|multi-role/i);
  assert.doesNotMatch(apartmentText, /fine-grained RBAC|enterprise RBAC/i);

  // 5. Orbit: Decoupled demo (unavailable) and org repo
  const orbit = projects.find((p) => p.slug === "orbit")!;
  assert.strictEqual(orbit.links.liveDemo, undefined);
  assert.strictEqual(orbit.links.github, undefined);
  const orbitText = JSON.stringify(orbit);
  assert.match(orbitText, /JWT/i);
  assert.match(orbitText, /Gemini|AI milestone/i);
  assert.match(orbitText, /BBD Select/i);
  // No private SSH link exposed
  assert.doesNotMatch(orbitText, /git@github\.com/i);

  // 6. University Issues Management: Verified Laravel implementation
  const issues = projects.find((p) => p.slug === "university-issues")!;
  assert.strictEqual(issues.links.liveDemo, undefined);
  assert.strictEqual(
    issues.links.github,
    "https://github.com/NabilDawud/University-Issues"
  );
  assert.strictEqual(issues.status, "verified-code");
  const issuesText = JSON.stringify(issues);
  assert.match(issuesText, /Laravel/i);
  assert.match(issuesText, /Hierarchical Issue Routing & Status Workflow/i);
  assert.doesNotMatch(issuesText, /Hierarchical State Machine/i);
  assert.match(issuesText, /Spatie/i);
});
