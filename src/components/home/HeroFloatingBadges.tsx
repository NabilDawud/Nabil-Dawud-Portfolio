"use client";

import React from "react";
import { Zap, ShieldCheck, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/i18n";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface HeroFloatingBadgesProps {
  className?: string;
}

export function HeroFloatingBadges({ className = "" }: HeroFloatingBadgesProps) {
  const { t } = useLanguage();
  const canAnimate = useInteractiveMotion();

  const badges = t.hero.floatingBadges;

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* 1. Top-Start Floating Badge: Latency Proof Point */}
      <motion.div
        animate={canAnimate ? { y: [-5, 5] } : undefined}
        transition={
          canAnimate
            ? {
                duration: 4.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }
            : undefined
        }
        className="absolute -top-3 -start-3 sm:-start-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-champagne/35 bg-graphite/90 backdrop-blur-md text-champagne-bright font-mono text-[11px] sm:text-xs shadow-xl shadow-black/80 will-change-transform"
      >
        <Zap className="w-3.5 h-3.5 text-champagne shrink-0" />
        <span className="font-semibold tracking-tight">{badges.latency}</span>
      </motion.div>

      {/* 2. Bottom-Start Floating Badge: Multi-Tenant RBAC */}
      <motion.div
        animate={canAnimate ? { y: [4, -4] } : undefined}
        transition={
          canAnimate
            ? {
                duration: 5.1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.8,
              }
            : undefined
        }
        className="absolute -bottom-4 -start-2 sm:-start-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-subtle/90 bg-graphite/90 backdrop-blur-md text-sand font-mono text-[11px] sm:text-xs shadow-xl shadow-black/80 will-change-transform"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-champagne shrink-0" />
        <span className="font-medium tracking-tight">{badges.security}</span>
      </motion.div>

      {/* 3. Bottom-End Floating Badge: Offline-First Sync */}
      <motion.div
        animate={canAnimate ? { y: [-4, 4] } : undefined}
        transition={
          canAnimate
            ? {
                duration: 4.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.4,
              }
            : undefined
        }
        className="absolute -bottom-3 -end-3 sm:-end-6 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal/35 bg-graphite/90 backdrop-blur-md text-teal font-mono text-[11px] sm:text-xs shadow-xl shadow-black/80 will-change-transform"
      >
        <RefreshCw className="w-3.5 h-3.5 text-teal shrink-0" />
        <span className="font-semibold tracking-tight">{badges.sync}</span>
      </motion.div>
    </div>
  );
}
