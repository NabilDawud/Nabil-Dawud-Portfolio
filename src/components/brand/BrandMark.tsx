"use client";

import Link from "next/link";
import { NDMonogram } from "./NDMonogram";
import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data";
import { cn } from "@/lib/utils";
import { localizePath } from "@/lib/navigation";

interface BrandMarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export function BrandMark({
  className,
  size = "md",
  showSubtitle = true,
}: BrandMarkProps) {
  const { l, locale } = useLanguage();

  return (
    <Link
      href={localizePath("/", locale)}
      className={cn(
        "group inline-flex items-center gap-3 text-start transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne rounded-lg p-1 -m-1",
        className
      )}
      aria-label={`${l(personalBrand.name)} — ${l(personalBrand.title)}`}
    >
      <NDMonogram size={size === "sm" ? "sm" : "md"} glow />

      <div className="flex flex-col">
        <span className="font-display font-bold tracking-tight text-ivory text-sm sm:text-base leading-snug group-hover:text-champagne transition-colors">
          {l(personalBrand.name)}
        </span>

        {showSubtitle && (
          <span className="text-[11px] text-sand font-medium leading-none flex items-center gap-1.5 mt-0.5">
            <span>{l(personalBrand.title).split("—")[0].trim()}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-champagne/40" />
            <span className="text-sand/80">{l(personalBrand.location)}</span>
          </span>
        )}
      </div>
    </Link>
  );
}
