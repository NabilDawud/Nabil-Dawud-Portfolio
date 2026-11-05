import { Locale, Direction } from "../data/types";

export const defaultLocale: Locale = "en";
export const supportedLocales: Locale[] = ["en", "ar"];

export const localeDirections: Record<Locale, Direction> = {
  en: "ltr",
  ar: "rtl",
};

export const localeNames: Record<Locale, { name: string; nativeName: string; short: string }> = {
  en: {
    name: "English",
    nativeName: "English",
    short: "EN",
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية",
    short: "عربي",
  },
};

export function getDirection(locale: Locale): Direction {
  return localeDirections[locale] ?? "ltr";
}

export function isRTL(locale: Locale): boolean {
  return getDirection(locale) === "rtl";
}
