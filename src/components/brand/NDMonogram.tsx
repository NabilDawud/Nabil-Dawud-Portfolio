import React from "react";
import { cn } from "@/lib/utils";

interface NDMonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
}

const sizeMap = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-14 h-14",
  xl: "w-24 h-24",
};

/**
 * Custom Geometric ND Monogram
 * Designed on an isometric architectural grid.
 * Combines the diagonal structural beam of the "N"
 * transitioning smoothly into the upright spine and geometric curve of the "D",
 * crowned with a signature Champagne Gold accent apex.
 */
export function NDMonogram({
  className,
  size = "md",
  glow = false,
}: NDMonogramProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 select-none",
        sizeMap[size],
        glow && "drop-shadow-[0_0_12px_rgba(183,164,119,0.35)]",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-300 hover:scale-105"
      >
        {/* Outer subtle geometric framing container */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="22"
          className="stroke-border-subtle/80 fill-graphite/40"
          strokeWidth="1.5"
        />

        {/* Ambient background champagne gradient aura */}
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="18"
          fill="url(#nd-ambient-glow)"
          opacity="0.12"
        />

        {/* --- Letter N Geometry --- */}
        {/* N Left Vertical Pillar */}
        <path
          d="M 28 72 L 28 28"
          stroke="#F4F1E9"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* N Diagonal Traverse Bar transitioning to D */}
        <path
          d="M 28 32 L 54 72"
          stroke="url(#nd-gold-gradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* --- Letter D Geometry --- */}
        {/* D Shared Center Pillar */}
        <path
          d="M 54 72 L 54 28"
          stroke="#F4F1E9"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* D Architectural Arc */}
        <path
          d="M 54 28 C 76 28, 76 72, 54 72"
          stroke="#B7A477"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Precision Engineering Apex Tick Mark (Technical signature) */}
        <circle cx="54" cy="28" r="3.5" fill="#B7A477" />
        <circle cx="28" cy="72" r="2.5" fill="#58B8B0" />

        {/* SVG Gradients */}
        <defs>
          <linearGradient
            id="nd-gold-gradient"
            x1="28"
            y1="32"
            x2="54"
            y2="72"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#F4F1E9" />
            <stop offset="0.6" stopColor="#B7A477" />
            <stop offset="1" stopColor="#C8B991" />
          </linearGradient>

          <radialGradient
            id="nd-ambient-glow"
            cx="50"
            cy="50"
            r="45"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#B7A477" stopOpacity="0.8" />
            <stop offset="1" stopColor="#090B0A" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
