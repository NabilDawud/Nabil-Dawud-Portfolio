"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data/personal";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";
import { HeroOrbitalRing } from "./HeroOrbitalRing";
import { HeroFloatingBadges } from "./HeroFloatingBadges";

interface HeroPortraitSlotProps {
  className?: string;
}

/**
 * Editorial portrait showcase slot for the hero section.
 * Renders the verified personal portrait of Nabil Dawud with an elevated
 * ambient champagne/teal glow, subtle brand framing, and responsive sharpness.
 */
export function HeroPortraitSlot({ className = "" }: HeroPortraitSlotProps) {
  const { t, l, locale } = useLanguage();
  const canAnimate = useInteractiveMotion();

  return (
    <div className="relative group/portrait">
      {/* 360° Circular Orbiting Satellite Telemetry */}
      <HeroOrbitalRing />

      {/* Dynamic ambient rim glow */}
      <div
        className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-r from-champagne/30 via-teal/25 to-champagne/30 blur-xl opacity-65 group-hover/portrait:opacity-100 transition-opacity duration-700 pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Architectural Proof Badges */}
      <HeroFloatingBadges />

      <motion.div
        animate={canAnimate ? { y: [-5, 5] } : undefined}
        transition={
          canAnimate
            ? {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : undefined
        }
        className={`relative w-full max-w-sm sm:max-w-md mx-auto aspect-square rounded-3xl border border-border-subtle/80 bg-gradient-to-b from-graphite/60 via-graphite/30 to-obsidian p-6 sm:p-8 flex flex-col items-center justify-between shadow-2xl shadow-black/80 backdrop-blur-sm overflow-hidden select-none will-change-transform group ${className}`}
        aria-label={t.hero.portraitAlt}
      >
      {/* Background portrait image with responsive fill */}
      <Image
        src="/assets/images/nabil-dawud-portrait.webp"
        alt={t.hero.portraitAlt}
        fill
        priority
        sizes="(max-width: 640px) 384px, 448px"
        className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Subtle darkening scrim for superior text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian/80 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Ambient background glow */}
      <div
        className="absolute -top-24 -end-24 w-64 h-64 bg-champagne/15 rounded-full blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -start-24 w-64 h-64 bg-teal/15 rounded-full blur-3xl pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Decorative brand header */}
      <div className="relative z-20 w-full flex items-center justify-between text-[11px] font-mono text-sand/90 tracking-wider uppercase border-b border-border-subtle/40 pb-3">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne shrink-0" aria-hidden="true" />
          <span className="text-sand/95 font-medium">
            {locale === "en" ? "Software Engineering" : "هندسة البرمجيات"}
          </span>
        </span>
        <span className="text-sand/80">{l(personalBrand.location)}</span>
      </div>

      {/* Spacer to preserve flex justify-between vertical balance */}
      <div className="relative z-20 my-auto pointer-events-none" aria-hidden="true" />

      {/* Bottom metadata footnote */}
      <div className="relative z-20 w-full text-center pt-3 border-t border-border-subtle/40">
        <div className="text-xs font-semibold text-ivory tracking-wide">
          {l(personalBrand.name)}
        </div>
        <div className="text-[11px] text-sand/80 font-mono mt-0.5">
          {l(personalBrand.title)}
        </div>
      </div>
    </motion.div>
  </div>
  );
}
