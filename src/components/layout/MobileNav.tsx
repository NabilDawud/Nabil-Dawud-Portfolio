"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, FileText } from "lucide-react";
import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data";
import { NDMonogram, GithubIcon, LinkedinIcon } from "../brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ href: string; label: string; isAnchor?: boolean }>;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  onRequestCV?: () => void;
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  triggerRef,
  onRequestCV,
}: MobileNavProps) {
  const { t, l } = useLanguage();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // Manage body scroll locking and Escape key dismissal
  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) {
        // Restore focus to trigger when drawer closes
        triggerRef?.current?.focus();
        wasOpenRef.current = false;
      }
      return;
    }

    wasOpenRef.current = true;
    document.body.style.overflow = "hidden";

    // Focus the close button on open
    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  // Keyboard focus trap inside drawer (Tab and Shift+Tab)
  const handleDrawerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.openMenu}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container with Focus Trap */}
      <div
        ref={drawerRef}
        onKeyDown={handleDrawerKeyDown}
        className="fixed inset-y-0 end-0 w-full max-w-xs sm:max-w-sm bg-graphite border-s border-border-subtle p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 focus:outline-none"
        tabIndex={-1}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div className="flex items-center gap-3">
              <NDMonogram size="sm" />
              <div>
                <span className="font-display font-bold text-sm text-ivory">
                  {l(personalBrand.name)}
                </span>
                <p className="text-[10px] text-sand">{l(personalBrand.location)}</p>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              onClick={onClose}
              type="button"
              className="p-2 rounded-lg text-sand hover:text-ivory hover:bg-graphite-elevated border border-transparent hover:border-border-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
              aria-label={t.nav.closeMenu}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium text-ivory hover:text-champagne hover:bg-graphite-elevated border border-transparent hover:border-border-subtle/50 transition-all flex items-center justify-between"
                )}
              >
                <span>{item.label}</span>
                {item.isAnchor && (
                  <span className="text-[10px] uppercase tracking-wider text-muted font-mono opacity-60">
                    #section
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-border-subtle space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-sand">Language</span>
            <LanguageSwitcher />
          </div>

          {/* Centralized CV Action */}
          <button
            onClick={() => {
              onClose();
              if (onRequestCV) {
                onRequestCV();
              } else {
                window.dispatchEvent(new CustomEvent("open-cv-request"));
              }
            }}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-champagne/40 bg-champagne/10 text-champagne text-sm font-semibold hover:bg-champagne/20 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{t.nav.requestCv || t.nav.downloadCv}</span>
          </button>

          {/* Social Profiles */}
          <div className="flex items-center justify-center gap-5 pt-2 text-xs text-sand">
            <a
              href={personalBrand.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-champagne transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-champagne/80" />
              <span>GitHub</span>
            </a>
            <span className="text-border-subtle">&bull;</span>
            <a
              href={personalBrand.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-champagne transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-champagne/80" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
