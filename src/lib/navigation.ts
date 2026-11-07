import { Locale } from "@/data/types";

/**
 * Localizes an internal path based on the active locale.
 * English routes stay clean (e.g. "/", "/about", "/projects").
 * Arabic routes receive the "/ar" prefix (e.g. "/ar", "/ar/about", "/ar/projects").
 */
export function localizePath(href: string, locale: Locale): string {
  if (!href) return href;

  // External, mailto, tel, and pure hash links remain untouched
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  // If viewing in English, clean any accidental /ar or /en prefix
  if (locale === "en") {
    if (href === "/ar" || href === "/en") return "/";
    if (href.startsWith("/ar/")) return href.replace(/^\/ar/, "");
    if (href.startsWith("/en/")) return href.replace(/^\/en/, "");
    return href;
  }

  // If viewing in Arabic, ensure /ar prefix is present
  if (href === "/ar" || href.startsWith("/ar/")) {
    return href;
  }

  // Clean /en prefix before adding /ar if present
  const cleaned = href.startsWith("/en/") ? href.replace(/^\/en/, "") : href === "/en" ? "/" : href;

  if (cleaned === "/") {
    return "/ar";
  }

  if (cleaned.startsWith("/#")) {
    return `/ar#${cleaned.slice(2)}`;
  }

  return `/ar${cleaned}`;
}

/**
 * Computes the equivalent route when switching languages.
 * /about <-> /ar/about
 * / <-> /ar
 * /projects/meshwar <-> /ar/projects/meshwar
 */
export function getEquivalentPath(currentPath: string, targetLocale: Locale): string {
  const path = currentPath || "/";

  if (targetLocale === "en") {
    if (path === "/ar" || path === "/en") return "/";
    if (path.startsWith("/ar/")) return path.replace(/^\/ar/, "");
    if (path.startsWith("/en/")) return path.replace(/^\/en/, "");
    return path;
  }

  // Target locale is Arabic
  return localizePath(path, "ar");
}
