"use client";

import React from "react";
import { NDMonogram } from "../brand/NDMonogram";
import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data/personal";

interface HeroPortraitSlotProps {
  className?: string;
}

/**
 * Modular architectural placeholder slot for the hero section.
 * Renders an elevated ND geometric monogram framing graphic with subtle
 * champagne ambient glow and brand framing.
 * Ready for drop-in personal portrait photography in the future without layout shifts.
 */
export function HeroPortraitSlot({ className = "" }: HeroPortraitSlotProps) {
  const { l, locale } = useLanguage();

  return (
    <div
      className={`relative w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-3xl border border-border-subtle/80 bg-gradient-to-b from-graphite/60 via-graphite/30 to-obsidian p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl shadow-black/80 backdrop-blur-sm overflow-hidden select-none group ${className}`}
      aria-label="Identity Monogram Framing Slot"
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-24 -end-24 w-64 h-64 bg-champagne/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -start-24 w-64 h-64 bg-teal/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative brand header */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-sand/70 tracking-wider uppercase border-b border-border-subtle/40 pb-3">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne/70 shrink-0" aria-hidden="true" />
          <span className="text-sand/80 font-medium">
            {locale === "en" ? "Software Engineering" : "هندسة البرمجيات"}
          </span>
        </span>
        <span className="text-muted">{l(personalBrand.location)}</span>
      </div>

      {/* Central Geometric Monogram with Hover Depth */}
      <div className="relative my-auto flex items-center justify-center p-6 rounded-2xl bg-obsidian/40 border border-border-subtle/40 shadow-inner group-hover:border-champagne/40 transition-colors duration-500">
        <NDMonogram size="lg" glow />
      </div>

      {/* Bottom metadata footnote */}
      <div className="w-full text-center pt-3 border-t border-border-subtle/40">
        <div className="text-xs font-semibold text-ivory tracking-wide">
          {l(personalBrand.name)}
        </div>
        <div className="text-[11px] text-sand/80 font-mono mt-0.5">
          {l(personalBrand.title)}
        </div>
      </div>
    </div>
  );
}
