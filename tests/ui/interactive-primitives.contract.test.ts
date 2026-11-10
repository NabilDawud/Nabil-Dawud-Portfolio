import test from "node:test";
import assert from "node:assert";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SpotlightCard, MagneticButton, AmbientSpotlight } from "@/components/ui";
import { SystemMetricsRibbon } from "@/components/home";
import { useInteractiveMotion, getServerSnapshot, getSnapshot } from "@/hooks/useInteractiveMotion";
import { enDictionary } from "@/i18n/dictionaries/en";
import { arDictionary } from "@/i18n/dictionaries/ar";

test("Task 1: Core Interactive Primitives Contract", () => {
  // Primitives must export valid React component functions
  assert.strictEqual(typeof SpotlightCard, "function", "SpotlightCard must be exported as a React function component");
  assert.strictEqual(typeof MagneticButton, "function", "MagneticButton must be exported as a React function component");
  assert.strictEqual(typeof AmbientSpotlight, "function", "AmbientSpotlight must be exported as a React function component");
  assert.strictEqual(typeof SystemMetricsRibbon, "function", "SystemMetricsRibbon must be exported as a React function component");
  assert.strictEqual(typeof useInteractiveMotion, "function", "useInteractiveMotion must be exported as a React hook");
});

test("Task 1: Interactive Motion Hook SSR Safety Contract", () => {
  // 1. Direct snapshot functions must be safe in Node
  assert.strictEqual(getServerSnapshot(), false, "getServerSnapshot must always return false");
  assert.strictEqual(getSnapshot(), false, "getSnapshot must return false when window is undefined");

  // 2. Verified via React DOM Server SSR rendering without JSX syntax
  function TestConsumer() {
    const isInteractive = useInteractiveMotion();
    return React.createElement("div", { "data-interactive": String(isInteractive) });
  }

  const ssrHtml = renderToStaticMarkup(React.createElement(TestConsumer));
  assert.ok(
    ssrHtml.includes('data-interactive="false"'),
    "useInteractiveMotion must safely evaluate to false during React Server-Side Rendering"
  );
});

test("Task 1: System Metrics Bilingual Parity Contract", () => {
  // Both dictionaries must contain metrics with sectionLabel and the 4 metric IDs
  assert.ok(enDictionary.metrics.sectionLabel, "EN dictionary must have metrics.sectionLabel");
  assert.ok(arDictionary.metrics.sectionLabel, "AR dictionary must have metrics.sectionLabel");
  for (const metric of ["latency", "sync", "isolation", "education"] as const) {
    assert.ok(enDictionary.metrics[metric].value, `EN dictionary must have metrics.${metric}.value`);
    assert.ok(enDictionary.metrics[metric].label, `EN dictionary must have metrics.${metric}.label`);
    assert.ok(enDictionary.metrics[metric].description, `EN dictionary must have metrics.${metric}.description`);
    assert.ok(arDictionary.metrics[metric].value, `AR dictionary must have metrics.${metric}.value`);
    assert.ok(arDictionary.metrics[metric].label, `AR dictionary must have metrics.${metric}.label`);
    assert.ok(arDictionary.metrics[metric].description, `AR dictionary must have metrics.${metric}.description`);
  }
});
