"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface AmbientSpotlightProps {
  className?: string;
  size?: number;
}

export function AmbientSpotlight({
  className,
  size = 650,
}: AmbientSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canTrack = useInteractiveMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth, relaxed spring physics for liquid ambient motion
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 80, mass: 0.8 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 80, mass: 0.8 });

  useEffect(() => {
    if (!canTrack) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Relative coordinates inside the ambient container
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleWindowMouseMove);
  }, [canTrack, size, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {canTrack ? (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            width: `${size}px`,
            height: `${size}px`,
          }}
          className="absolute top-0 left-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12),_rgba(45,212,191,0.06)_40%,_transparent_75%)] blur-3xl will-change-transform"
        />
      ) : (
        /* Static fallback for mobile and reduced motion */
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.1),_rgba(22,24,31,0.2)_50%,_transparent_80%)] blur-3xl"
        />
      )}
    </div>
  );
}
