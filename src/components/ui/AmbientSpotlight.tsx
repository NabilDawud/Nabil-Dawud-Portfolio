"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface AmbientSpotlightProps {
  className?: string;
  size?: number;
  variant?: "hero" | "bento" | "section";
  showGrid?: boolean;
}

export function AmbientSpotlight({
  className,
  size = 500,
  variant = "hero",
  showGrid = true,
}: AmbientSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canTrack = useInteractiveMotion();
  const [hasMoved, setHasMoved] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ultra-responsive spring physics: zero lag, snappy cursor tracking
  const springConfig = { damping: 24, stiffness: 480, mass: 0.08 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!canTrack) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Only track when cursor is within vertical vicinity of this section
      if (e.clientY < rect.top - 250 || e.clientY > rect.bottom + 250) return;

      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      mouseX.set(x);
      mouseY.set(y);

      // Set CSS custom properties for the cyber grid radial mask
      const gridX = e.clientX - rect.left;
      const gridY = e.clientY - rect.top;
      containerRef.current.style.setProperty("--mouse-x", `${gridX}px`);
      containerRef.current.style.setProperty("--mouse-y", `${gridY}px`);

      if (!hasMoved) {
        setHasMoved(true);
      }
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [canTrack, size, mouseX, mouseY, hasMoved]);

  const isHero = variant === "hero";

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. Subtle Illuminated Cyber-Grid Layer                         */}
      {/* ------------------------------------------------------------- */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-55 transition-opacity duration-500"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px)
            `,
            backgroundSize: "36px 36px",
            maskImage:
              canTrack && hasMoved
                ? "radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), black 0%, transparent 80%)"
                : "radial-gradient(550px circle at 50% 35%, black 0%, transparent 75%)",
            WebkitMaskImage:
              canTrack && hasMoved
                ? "radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 40%), black 0%, transparent 80%)"
                : "radial-gradient(550px circle at 50% 35%, black 0%, transparent 75%)",
          }}
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Autonomous Living Aurora Orbs (Active on Desktop & Mobile)  */}
      {/* ------------------------------------------------------------- */}
      {/* Orb 1: Rich Champagne Gold Luminous Flow */}
      <motion.div
        animate={{
          x: isHero ? [0, 95, -75, 40, 0] : [0, 55, -45, 25, 0],
          y: isHero ? [0, -65, 55, -35, 0] : [0, -40, 35, -20, 0],
          scale: [1, 1.18, 0.92, 1.1, 1],
        }}
        transition={{
          duration: isHero ? 16 : 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: isHero ? "650px" : "480px",
          height: isHero ? "650px" : "480px",
          background:
            "radial-gradient(circle at center, rgba(240, 205, 95, 0.42) 0%, rgba(212, 175, 55, 0.25) 38%, rgba(183, 164, 119, 0.12) 58%, transparent 75%)",
        }}
        className={cn(
          "absolute rounded-full blur-2xl mix-blend-screen will-change-transform",
          isHero ? "top-1/4 start-1/6" : "top-1/6 start-1/4"
        )}
      />

      {/* Orb 2: Cyber Teal / Emerald Counter-Balance */}
      <motion.div
        animate={{
          x: isHero ? [0, -85, 65, -45, 0] : [0, -50, 40, -25, 0],
          y: isHero ? [0, 75, -55, 40, 0] : [0, 45, -35, 25, 0],
          scale: [0.94, 1.2, 0.96, 1.14, 0.94],
        }}
        transition={{
          duration: isHero ? 20 : 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: isHero ? "580px" : "440px",
          height: isHero ? "580px" : "440px",
          background:
            "radial-gradient(circle at center, rgba(88, 215, 205, 0.36) 0%, rgba(45, 212, 191, 0.22) 42%, rgba(20, 184, 166, 0.08) 60%, transparent 75%)",
        }}
        className={cn(
          "absolute rounded-full blur-2xl mix-blend-screen will-change-transform",
          isHero ? "top-1/3 end-1/6" : "top-1/2 end-1/4"
        )}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. Interactive Cursor Spotlight (Fine-Pointer Desktop Only)   */}
      {/* ------------------------------------------------------------- */}
      {canTrack && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            width: `${size}px`,
            height: `${size}px`,
            opacity: hasMoved ? 1 : 0,
            background:
              "radial-gradient(circle at center, rgba(255, 240, 180, 0.52) 0%, rgba(212, 175, 55, 0.3) 32%, rgba(88, 215, 205, 0.15) 58%, transparent 76%)",
          }}
          transition={{ opacity: { duration: 0.3 } }}
          className="absolute top-0 left-0 rounded-full blur-xl mix-blend-screen will-change-transform"
        />
      )}
    </div>
  );
}
