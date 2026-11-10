"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mqlFine = window.matchMedia("(pointer: fine)");
  const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  mqlFine.addEventListener("change", callback);
  mqlMotion.addEventListener("change", callback);

  return () => {
    mqlFine.removeEventListener("change", callback);
    mqlMotion.removeEventListener("change", callback);
  };
}

export function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  const pointerFine = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return pointerFine && !prefersReducedMotion;
}

export function getServerSnapshot(): boolean {
  return false;
}

/**
 * React hook that returns true only when the client device has a fine pointer (mouse/trackpad)
 * and the user has NOT requested reduced motion.
 * Uses useSyncExternalStore to avoid hydration mismatches and cascading effect renders.
 */
export function useInteractiveMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
