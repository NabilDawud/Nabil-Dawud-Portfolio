import React, { useContext } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LanguageContext } from "@/i18n";
import { localizePath } from "@/lib/navigation";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "teal";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  download?: boolean | string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external = false,
      download,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-champagne text-obsidian font-semibold hover:bg-champagne-bright shadow-[0_0_20px_rgba(183,164,119,0.22)] hover:shadow-[0_0_28px_rgba(183,164,119,0.35)] border border-champagne/40",
      secondary:
        "bg-graphite text-ivory border border-border-subtle hover:border-champagne/40 hover:bg-graphite-elevated hover:text-champagne-bright",
      outline:
        "bg-transparent text-ivory border border-border-subtle hover:border-champagne/50 hover:bg-graphite/40 hover:text-champagne",
      ghost:
        "bg-transparent text-sand hover:text-ivory hover:bg-graphite/50",
      teal:
        "bg-teal/15 text-teal border border-teal/30 hover:bg-teal/25 hover:border-teal/50",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-10 px-4 text-sm rounded-lg gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5",
    };

    const langContext = useContext(LanguageContext);
    const locale = langContext?.locale ?? "en";
    const finalHref = href ? localizePath(href, locale) : undefined;

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (finalHref) {
      if (external || download) {
        return (
          <a
            href={finalHref}
            download={download}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className={combinedClassName}
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={finalHref}
          className={combinedClassName}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={combinedClassName}
        disabled={disabled}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
