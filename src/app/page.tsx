"use client";

import { useLanguage } from "@/i18n";
import { personalBrand, projects, skillGroups, education, certifications } from "@/data";

export default function Home() {
  const { locale, direction, isRTL, toggleLocale, t, l } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 bg-obsidian text-ivory">
      <div className="w-full max-w-3xl rounded-2xl border border-border-subtle bg-graphite p-6 md:p-8 space-y-8 shadow-2xl">
        {/* Header with Language Switcher */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-graphite-elevated text-xs text-teal">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>
              {locale === "en" ? "Milestone 2 Verified — Data & i18n Engine" : "المرحلة 2 جاهزة — نماذج البيانات ومحرك اللغات"}
            </span>
          </div>

          <button
            onClick={toggleLocale}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-champagne/30 bg-champagne/10 text-champagne hover:bg-champagne/20 transition-colors text-sm font-medium cursor-pointer"
          >
            <span>{t.nav.switchLanguage}</span>
            <span className="text-xs uppercase tracking-wider text-muted opacity-75">
              ({locale} &rarr; {locale === "en" ? "ar" : "en"})
            </span>
          </button>
        </div>

        {/* Brand & Identity Preview */}
        <div className="space-y-3">
          <div className="text-xs tracking-wider uppercase text-sand">
            {t.nav.brandRole} &bull; {l(personalBrand.location)} &bull; {direction.toUpperCase()}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ivory font-display">
            {l(personalBrand.headline.lead)}{" "}
            <span className="text-champagne">{l(personalBrand.headline.accent)}</span>
          </h1>
          <p className="text-sand text-base md:text-lg">
            {l(personalBrand.supportingStatement)}
          </p>
          <div className="text-xs text-teal/90 font-mono">
            {t.hero.academicNote}
          </div>
        </div>

        {/* Structured Data Models Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle text-sm">
          <div className="p-4 rounded-xl border border-border-subtle bg-obsidian space-y-2">
            <div className="font-semibold text-champagne text-xs uppercase tracking-wider">
              {t.projects.sectionBadge} ({projects.length} {locale === "en" ? "Projects" : "مشاريع"})
            </div>
            <ul className="space-y-1.5 text-xs text-sand">
              {projects.map((p) => (
                <li key={p.id} className="flex items-center justify-between">
                  <span className="text-ivory font-medium">{l(p.title)}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-graphite">
                    {p.category}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-obsidian space-y-2">
            <div className="font-semibold text-champagne text-xs uppercase tracking-wider">
              {t.focus.sectionBadge} ({skillGroups.length} {locale === "en" ? "Categories" : "فئات"})
            </div>
            <ul className="space-y-1.5 text-xs text-sand">
              {skillGroups.map((group) => (
                <li key={group.id} className="flex items-center justify-between">
                  <span className="text-ivory font-medium">{l(group.title)}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-border-subtle bg-graphite">
                    {group.skills.length} {locale === "en" ? "skills" : "مهارات"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-obsidian space-y-2">
            <div className="font-semibold text-champagne text-xs uppercase tracking-wider">
              {t.about.academicSection}
            </div>
            <p className="text-xs text-ivory font-medium">{l(education.degree)}</p>
            <p className="text-xs text-sand">{l(education.institution)} — {l(education.grade)}</p>
            {education.tawjihiHighlight && (
              <p className="text-[11px] text-teal">
                {l(education.tawjihiHighlight.title)}: {education.tawjihiHighlight.score}%
              </p>
            )}
          </div>

          <div className="p-4 rounded-xl border border-border-subtle bg-obsidian space-y-2">
            <div className="font-semibold text-champagne text-xs uppercase tracking-wider">
              {t.about.certificationsTitle} ({certifications.length})
            </div>
            <ul className="space-y-1.5 text-xs text-sand">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-xs">
                  <div className="text-ivory font-medium">{l(cert.title)}</div>
                  <div className="text-[10px] text-sand">{l(cert.issuer)} &bull; {l(cert.dateRange)}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* State Telemetry Footer */}
        <div className="pt-2 text-center text-xs text-muted flex items-center justify-between">
          <span>Active Direction: <code className="text-champagne font-mono">{direction}</code></span>
          <span>RTL Active: <code className="text-champagne font-mono">{String(isRTL)}</code></span>
          <span>Locale: <code className="text-champagne font-mono">{locale}</code></span>
        </div>
      </div>
    </main>
  );
}
