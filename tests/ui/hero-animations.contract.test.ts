import test from "node:test";
import assert from "node:assert";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroOrbitalRing, HeroFloatingBadges } from "@/components/home";
import { LanguageProvider } from "@/i18n";
import { enDictionary } from "@/i18n/dictionaries/en";
import { arDictionary } from "@/i18n/dictionaries/ar";

test("Task 4: Hero Animations Components Contract", () => {
  assert.strictEqual(typeof HeroOrbitalRing, "function", "HeroOrbitalRing must be a React component function");
  assert.strictEqual(typeof HeroFloatingBadges, "function", "HeroFloatingBadges must be a React component function");
});

test("Task 4: Hero Floating Badges Bilingual Parity Contract", () => {
  assert.ok(enDictionary.hero.floatingBadges, "EN dictionary must include hero.floatingBadges");
  assert.ok(arDictionary.hero.floatingBadges, "AR dictionary must include hero.floatingBadges");

  const expectedKeys = ["latency", "security", "sync"] as const;
  for (const key of expectedKeys) {
    assert.ok(enDictionary.hero.floatingBadges[key], `EN dictionary must define hero.floatingBadges.${key}`);
    assert.ok(arDictionary.hero.floatingBadges[key], `AR dictionary must define hero.floatingBadges.${key}`);
  }
});

test("Task 4: Hero Animations SSR Safety Contract", () => {
  const enChildren = React.createElement("div", null, [
    React.createElement(HeroOrbitalRing, { key: "ring" }),
    React.createElement(HeroFloatingBadges, { key: "badges" }),
  ]);

  const enMarkup = renderToStaticMarkup(
    React.createElement(LanguageProvider, { initialLocale: "en" } as never, enChildren)
  );

  assert.ok(
    enMarkup.includes("120ms p95 API"),
    "EN SSR markup must include latency badge text"
  );

  const arChildren = React.createElement("div", null, [
    React.createElement(HeroOrbitalRing, { key: "ring" }),
    React.createElement(HeroFloatingBadges, { key: "badges" }),
  ]);

  const arMarkup = renderToStaticMarkup(
    React.createElement(LanguageProvider, { initialLocale: "ar" } as never, arChildren)
  );

  assert.ok(
    arMarkup.includes("120ms"),
    "AR SSR markup must include Arabic latency badge text"
  );
});
