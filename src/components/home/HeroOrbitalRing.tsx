"use client";

import React from "react";
import { motion } from "motion/react";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface HeroOrbitalRingProps {
  className?: string;
}

/**
 * 360° Circular Orbiting Satellite Animation for the Hero Section.
 * Renders subtle orbital tracks with revolving luminous satellite beacons
 * that continuously orbit around the portrait slot, communicating live
 * distributed systems and active architectural telemetry.
 */
export function HeroOrbitalRing({ className = "" }: HeroOrbitalRingProps) {
  const canAnimate = useInteractiveMotion();

  return (
    <div
      className={`absolute inset-[-14%] sm:inset-[-18%] pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ------------------------------------------------------------- */}
      {/* Primary Circular Orbital Track & Revolving Golden Beacon       */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-0 rounded-full border border-champagne/20 shadow-[0_0_25px_rgba(212,175,55,0.06)]" />

      <motion.div
        animate={canAnimate ? { rotate: 360 } : undefined}
        transition={
          canAnimate
            ? {
                duration: 16,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
        className="absolute inset-0 rounded-full will-change-transform"
      >
        {/* Golden Satellite Beacon (top apex of orbit) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          {/* Outer glowing halo */}
          <span className="absolute w-8 h-8 rounded-full bg-champagne/35 blur-md" />
          {/* Inner bright node */}
          <span className="relative w-3.5 h-3.5 rounded-full bg-champagne-bright border border-white/60 shadow-[0_0_16px_rgba(255,235,170,1)]" />
        </div>
      </motion.div>

      {/* ------------------------------------------------------------- */}
      {/* Secondary Counter-Rotating Orbital Track & Cyber Teal Beacon  */}
      {/* ------------------------------------------------------------- */}
      <div className="absolute inset-[8%] rounded-full border border-teal/15 border-dashed" />

      <motion.div
        animate={canAnimate ? { rotate: -360 } : undefined}
        transition={
          canAnimate
            ? {
                duration: 24,
                repeat: Infinity,
                ease: "linear",
              }
            : undefined
        }
        className="absolute inset-[8%] rounded-full will-change-transform"
      >
        {/* Teal Satellite Beacon (bottom apex of orbit) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center">
          {/* Outer glowing halo */}
          <span className="absolute w-7 h-7 rounded-full bg-teal/30 blur-md" />
          {/* Inner bright node */}
          <span className="relative w-2.5 h-2.5 rounded-full bg-teal border border-teal-200/50 shadow-[0_0_12px_rgba(88,215,205,0.9)]" />
        </div>
      </motion.div>
    </div>
  );
}
