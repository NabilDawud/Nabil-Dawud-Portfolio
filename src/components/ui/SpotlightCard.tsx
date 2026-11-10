"use client";

import React, { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useInteractiveMotion } from "@/hooks/useInteractiveMotion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export function SpotlightCard({
  children,
  className,
  innerClassName,
  spotlightColor = "rgba(212, 175, 55, 0.12)",
  borderColor = "rgba(212, 175, 55, 0.35)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const supportsHover = useInteractiveMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!supportsHover || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    },
    [supportsHover]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-2xl border border-border-subtle/80 bg-graphite/40 transition-colors duration-300 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Dynamic Radial Spotlight Overlay */}
      {supportsHover && (
        <>
          {/* Surface soft illumination */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${spotlightColor}, transparent 80%)`,
            }}
            aria-hidden="true"
          />
          {/* Border highlight illumination */}
          <div
            className="pointer-events-none absolute -inset-px z-0 rounded-2xl transition-opacity duration-500 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(300px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${borderColor}, transparent 80%)`,
              maskImage: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
              maskComposite: "exclude",
              WebkitMaskComposite: "xor",
              padding: "1px",
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Content wrapper with relative positioning and flex distribution */}
      <div className={cn("relative z-10 h-full flex flex-col justify-between", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
