"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Locale, Direction, Localized } from "../data/types";
import { defaultLocale, getDirection, isRTL } from "./config";
import { enDictionary } from "./dictionaries/en";
import { arDictionary } from "./dictionaries/ar";
import { Dictionary } from "./types";

interface LanguageContextType {
  locale: Locale;
  direction: Direction;
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
  l: <T>(item: Localized<T>) => T;
}

const dictionaries: Record<Locale, Dictionary> = {
  en: enDictionary,
  ar: arDictionary,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "nabildawud_portfolio_locale";

interface LanguageProviderProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function LanguageProvider({
  children,
  initialLocale = defaultLocale,
}: LanguageProviderProps) {
  // Initialize with server-provided initialLocale to match SSR exactly
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [mounted, setMounted] = useState(false);

  // Synchronize with client-side localStorage preference after initial hydration
  useEffect(() => {
    setMounted(true);
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (savedLocale === "en" || savedLocale === "ar") {
        if (savedLocale !== locale) {
          setLocaleState(savedLocale);
        }
      } else {
        // Fallback to browser language if Arabic on first visit with no existing cookie
        const browserLang = navigator.language?.toLowerCase() ?? "";
        if (browserLang.startsWith("ar") && locale !== "ar") {
          setLocaleState("ar");
        }
      }
    } catch {
      // LocalStorage access might fail in restricted or private browsing
    }
  }, []); // Run once on mount

  const direction = useMemo(() => getDirection(locale), [locale]);
  const rtl = useMemo(() => isRTL(locale), [locale]);
  const dictionary = useMemo(() => dictionaries[locale], [locale]);

  // Synchronize document attributes, localStorage, and cookie on state changes
  useEffect(() => {
    if (!mounted) return;

    try {
      document.documentElement.lang = locale;
      document.documentElement.dir = direction;
      localStorage.setItem(STORAGE_KEY, locale);
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage/cookie restriction errors
    }
  }, [locale, direction, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === "en" || newLocale === "ar") {
      setLocaleState(newLocale);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "en" ? "ar" : "en"));
  }, []);

  // Helper function to resolve Localized<T> data fields based on current locale
  const l = useCallback(
    <T,>(item: Localized<T>): T => {
      if (!item) return ("" as unknown) as T;
      return item[locale] ?? item.en;
    },
    [locale]
  );

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      locale,
      direction,
      isRTL: rtl,
      setLocale,
      toggleLocale,
      t: dictionary,
      l,
    }),
    [locale, direction, rtl, setLocale, toggleLocale, dictionary, l]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
