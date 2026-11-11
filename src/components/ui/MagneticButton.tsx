"use client";

import React, { useRef } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Strength multiplier (default: 0.3)
  maxOffset?: number; // Max pixel offset (default: 12)
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  maxOffset = 12,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canAnimate = useInteractiveMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canAnimate || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    // Constrain to maxOffset
    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    if (!canAnimate) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      data-cursor="hover"
      data-magnetic="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={canAnimate ? { x: springX, y: springY } : undefined}
      className={cn("inline-block", canAnimate && "will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
