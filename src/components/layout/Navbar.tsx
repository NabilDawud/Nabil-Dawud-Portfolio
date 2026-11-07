"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, FileText } from "lucide-react";
import { useLanguage } from "@/i18n";
import { BrandMark } from "../brand/BrandMark";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { CVRequestModal } from "../cv/CVRequestModal";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOpenCV = () => setCvModalOpen(true);
    window.addEventListener("open-cv-request", handleOpenCV);
    return () => window.removeEventListener("open-cv-request", handleOpenCV);
  }, []);

  const navItems = [
    { href: "/projects", label: t.nav.projects, isAnchor: false },
    { href: "/#focus", label: t.nav.focus, isAnchor: true },
    { href: "/#journey", label: t.nav.journey, isAnchor: true },
    { href: "/about", label: t.nav.about, isAnchor: false },
    { href: "/contact", label: t.nav.contact, isAnchor: false },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/" && pathname === "/") return true;
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          scrolled
            ? "bg-obsidian/90 backdrop-blur-md border-border-subtle shadow-lg shadow-black/40 py-2.5"
            : "bg-obsidian/70 backdrop-blur-sm border-transparent py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Start: Brand Identity */}
          <div className="flex items-center gap-6">
            <BrandMark size="sm" />
          </div>

          {/* Center: Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full border border-border-subtle/70 bg-graphite/40 backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne",
                    active
                      ? "bg-champagne/15 text-champagne-bright border border-champagne/30 shadow-[0_0_12px_rgba(183,164,119,0.15)]"
                      : "text-sand hover:text-ivory hover:bg-graphite-elevated/70"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* End: Language Switcher, Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <LanguageSwitcher />

            {/* Centralized CV Action */}
            <Button
              onClick={() => setCvModalOpen(true)}
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex text-xs font-semibold gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-champagne" />
              <span>{t.nav.requestCv || t.nav.downloadCv}</span>
            </Button>

            {/* Mobile Menu Hamburger with Ref for Focus Restoration */}
            <button
              ref={triggerRef}
              onClick={() => setMobileMenuOpen(true)}
              type="button"
              className="inline-flex md:hidden p-2 rounded-lg border border-border-subtle bg-graphite/70 text-sand hover:text-ivory hover:bg-graphite-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne transition-colors"
              aria-label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer with Focus Trap & Restoration */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onRequestCV={() => {
          setMobileMenuOpen(false);
          setCvModalOpen(true);
        }}
        navItems={navItems}
        triggerRef={triggerRef}
      />

      {/* Single Accessible CV Request Modal Instance */}
      <CVRequestModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
      />
    </>
  );
}
