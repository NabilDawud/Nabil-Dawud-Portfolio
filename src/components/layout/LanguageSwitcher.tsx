"use client";

import { useLanguage } from "@/i18n";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { getEquivalentPath } from "@/lib/navigation";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "minimal";
}

export function LanguageSwitcher({
  className,
  variant = "pill",
}: LanguageSwitcherProps) {
  const { locale, toggleLocale, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggle = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const targetUrl = getEquivalentPath(pathname || "/", nextLocale);
    try {
      localStorage.setItem("nabildawud_portfolio_locale", nextLocale);
      document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
    toggleLocale();
    router.push(targetUrl);
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={handleToggle}
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-semibold text-sand hover:text-champagne transition-colors p-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne cursor-pointer",
          className
        )}
        aria-label={t.nav.switchLanguage}
      >
        <Globe className="w-3.5 h-3.5 text-champagne/80" />
        <span>{locale === "en" ? "العربية" : "English"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      type="button"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-graphite/60 hover:bg-graphite hover:border-champagne/40 text-xs font-medium text-ivory transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne cursor-pointer shadow-sm group",
        className
      )}
      aria-label={t.nav.switchLanguage}
    >
      <Globe className="w-3.5 h-3.5 text-champagne group-hover:rotate-12 transition-transform duration-300" />
      <span className="font-semibold text-champagne-bright">
        {locale === "en" ? "عربي" : "EN"}
      </span>
      <span className="text-[10px] text-sand border-s border-border-subtle ps-1.5 hidden sm:inline">
        {locale === "en" ? "العربية" : "English"}
      </span>
    </button>
  );
}
