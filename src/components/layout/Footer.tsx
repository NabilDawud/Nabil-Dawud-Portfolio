"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/i18n";
import { personalBrand, education } from "@/data";
import { BrandMark, GithubIcon, LinkedinIcon } from "../brand";

export function Footer() {
  const { t, l } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-graphite/40 border-t border-border-subtle mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand & Positioning */}
          <div className="md:col-span-2 space-y-4">
            <BrandMark size="md" />
            <p className="text-sm text-sand max-w-md leading-relaxed">
              {l(personalBrand.supportingStatement)}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle bg-graphite-card text-xs text-sand">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" />
              <span>
                {l(education.institution)} &bull; {l(education.grade)}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne">
              {t.footer.quickNavigation}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-sand hover:text-ivory transition-colors"
                >
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href="/#focus"
                  className="text-sand hover:text-ivory transition-colors"
                >
                  {t.nav.focus}
                </Link>
              </li>
              <li>
                <Link
                  href="/#journey"
                  className="text-sand hover:text-ivory transition-colors"
                >
                  {t.nav.journey}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sand hover:text-ivory transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sand hover:text-ivory transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Profiles & Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-champagne">
              {t.footer.socialLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={personalBrand.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sand hover:text-champagne transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-champagne/80" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={personalBrand.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sand hover:text-champagne transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-champagne/80" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                type="button"
                className="inline-flex items-center gap-2 text-xs text-sand hover:text-champagne border border-border-subtle bg-graphite/60 hover:bg-graphite-elevated px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                aria-label={t.footer.backToTop}
              >
                <ArrowUp className="w-3.5 h-3.5 text-champagne" />
                <span>{t.footer.backToTop}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="mt-12 pt-6 border-t border-border-subtle/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            &copy; {currentYear} {l(personalBrand.name)}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-3">
            <span>{t.footer.location}</span>
            <span className="text-border-subtle">&bull;</span>
            <span className="text-sand/80">Next.js &bull; TypeScript &bull; Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
