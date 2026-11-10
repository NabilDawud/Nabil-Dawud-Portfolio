"use client";

import React from "react";
import { ArrowDown, FileText } from "lucide-react";
import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data/personal";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { AmbientSpotlight, MagneticButton } from "../ui";
import { GithubIcon, LinkedinIcon } from "../brand/SocialIcons";
import { HeroPortraitSlot } from "./HeroPortraitSlot";

export function HeroSection() {
  const { t, l } = useLanguage();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden"
    >
      {/* Interactive Cursor-Responsive Ambient Lighting */}
      <AmbientSpotlight />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text content column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-8 text-start">
            {/* Live Status Pill */}
            <div className="inline-flex items-center">
              <Badge variant="teal" dot size="md">
                {t.hero.availableBadge}
              </Badge>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <h1
                id="hero-heading"
                className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ivory leading-[1.12]"
              >
                <span className="block text-ivory">{t.hero.headlineLead}</span>
                <span className="block py-1 bg-gradient-to-r from-champagne-bright via-[#FFF5DC] to-champagne bg-clip-text text-transparent animate-text-shimmer select-none will-change-[background-position] leading-[1.2]">
                  {t.hero.headlineAccent}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-sand font-normal max-w-2xl leading-relaxed pt-2">
                {t.hero.supportingText}
              </p>
            </div>

            {/* Subtle Narrative Academic Mention */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-sand/80 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-champagne/60 shrink-0" />
              <span>{t.hero.academicNote}</span>
            </div>

            {/* Action Buttons & CV State with Magnetic Micro-Interactions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary CTA linking to #selected-work */}
              <MagneticButton>
                <Button href="#selected-work" variant="primary" size="lg">
                  <span>{t.hero.exploreWork}</span>
                  <ArrowDown className="w-4 h-4 text-obsidian" />
                </Button>
              </MagneticButton>

              {/* Centralized CV Action */}
              <MagneticButton>
                <Button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("open-cv-request"));
                  }}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <FileText className="w-4 h-4 text-champagne" />
                  <span>{t.hero.requestCv || t.hero.downloadCv}</span>
                </Button>
              </MagneticButton>
            </div>

            {/* Social Connectivity Bar */}
            <div className="flex items-center gap-6 pt-4 border-t border-border-subtle/50 text-xs sm:text-sm text-sand">
              <a
                href={personalBrand.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-champagne transition-colors duration-200"
              >
                <GithubIcon className="w-4 h-4 text-champagne" />
                <span className="font-mono">GitHub</span>
              </a>
              <span className="text-border-subtle" aria-hidden="true">&bull;</span>
              <a
                href={personalBrand.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-champagne transition-colors duration-200"
              >
                <LinkedinIcon className="w-4 h-4 text-champagne" />
                <span className="font-mono">LinkedIn</span>
              </a>
              <span className="text-border-subtle" aria-hidden="true">&bull;</span>
              <span className="font-mono text-sand/60">
                {l(personalBrand.location)}
              </span>
            </div>
          </div>

          {/* Modular Portrait / Identity Monogram Slot (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroPortraitSlot />
          </div>
        </div>
      </div>
    </section>
  );
}
