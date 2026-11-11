import test from "node:test";
import assert from "node:assert";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CustomCursor } from "@/components/ui";

test("Task 1: CustomCursor Component Contract", () => {
  assert.strictEqual(typeof CustomCursor, "function", "CustomCursor must be exported as a React function component");
});

test("Task 1: CustomCursor SSR & Hydration Safety Contract", () => {
  // During server-side rendering, CustomCursor must evaluate safely to empty output (null)
  const ssrHtml = renderToStaticMarkup(React.createElement(CustomCursor));
  assert.strictEqual(ssrHtml, "", "CustomCursor must render empty markup during SSR to prevent hydration mismatches");
});
