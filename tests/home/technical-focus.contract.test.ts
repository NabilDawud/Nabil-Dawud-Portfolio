import test from "node:test";
import assert from "node:assert";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import { TechnicalFocusSection } from "@/components/home/TechnicalFocusSection";

test("Task 2: Technical Focus contract and verified competencies", () => {
  // 1. Component export exists
  assert.strictEqual(typeof TechnicalFocusSection, "function");

  // 2. Skill groups integrity
  assert.ok(skillGroups.length >= 4);

  // 3. Sanctum must NOT have unverified project assignments
  const backendGroup = skillGroups.find((g) => g.id === "backend");
  assert.ok(backendGroup);
  const sanctumSkill = backendGroup.skills.find((s) => s.name === "Laravel Sanctum");
  assert.ok(sanctumSkill);
  assert.strictEqual(sanctumSkill.level, "familiar");
  assert.strictEqual(sanctumSkill.verifiedInProjects, undefined);

  // 4. Apartment Maintenance must NOT claim RBAC
  const apartmentProject = projects.find((p) => p.id === "apartment-marketplace");
  assert.ok(apartmentProject);
  const apartmentContent = JSON.stringify(apartmentProject);
  assert.doesNotMatch(apartmentContent, /\bRBAC\b/i);
  assert.doesNotMatch(apartmentContent, /role-based access control/i);

  // 5. Mishwar must use "GPS Data Freshness Indicators", NOT "Staleness Telemetry"
  const mishwarProject = projects.find((p) => p.id === "meshwar");
  assert.ok(mishwarProject);
  const mishwarContent = JSON.stringify(mishwarProject);
  assert.match(mishwarContent, /GPS Data Freshness Indicators/i);
  assert.doesNotMatch(mishwarContent, /Staleness Telemetry/i);
});
