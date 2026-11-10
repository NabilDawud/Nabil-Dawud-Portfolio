import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "champagne" | "teal" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full select-none transition-colors";

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
  };

  const variantStyles = {
    default: "bg-graphite text-sand border border-border-subtle",
    champagne:
      "bg-champagne/10 text-champagne border border-champagne/30",
    teal: "bg-teal/10 text-teal border border-teal/25",
    outline: "bg-transparent text-sand border border-border-subtle/80",
  };

  const dotColors = {
    default: "bg-sand",
    champagne: "bg-champagne",
    teal: "bg-teal animate-pulse",
    outline: "bg-sand",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {dot && (
        <span className="relative flex items-center justify-center w-2 h-2 shrink-0" aria-hidden="true">
          {variant === "teal" && (
            <span className="absolute w-full h-full rounded-full bg-teal opacity-75 animate-ping" />
          )}
          <span
            className={cn(
              "relative w-1.5 h-1.5 rounded-full",
              variant === "teal" ? "bg-teal shadow-[0_0_8px_rgba(88,184,176,0.9)]" : dotColors[variant]
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
