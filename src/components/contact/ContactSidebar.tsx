"use client";

import React from "react";
import {
  MapPin,
  Clock,
  CheckCircle2,
  Lock,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "@/i18n";
import { personalBrand } from "@/data";
import { GithubIcon, LinkedinIcon } from "@/components/brand";

export function ContactSidebar() {
  const { t, locale } = useLanguage();

  return (
    <aside
      aria-label={t.contact.sidebarTitle}
      className="space-y-6"
    >
      {/* Verified Professional Profiles Card */}
      <div className="rounded-2xl border border-border-subtle/80 bg-graphite/40 p-6 space-y-4">
        <h3 className="text-base font-semibold text-ivory flex items-center gap-2">
          <span>{t.contact.profilesTitle}</span>
        </h3>
        <p className="text-xs text-sand/70 leading-relaxed">
          {locale === "en"
            ? "Connect or review verified open-source contributions and engineering credentials."
            : "يمكنك استعراض المساهمات البرمجية مفتوحة المصدر والحسابات المهنية المعتمدة."}
        </p>

        <div className="space-y-2.5 pt-2">
          <a
            href={personalBrand.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl border border-border-subtle/60 bg-obsidian/40 hover:bg-obsidian/70 hover:border-champagne/40 text-sand hover:text-ivory transition-all group"
          >
            <div className="flex items-center gap-3">
              <GithubIcon className="w-5 h-5 text-champagne/90 group-hover:text-champagne" />
              <div>
                <div className="text-sm font-medium text-ivory">GitHub</div>
                <div className="text-xs text-sand/60">@NabilDawud</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-sand/50 group-hover:text-champagne transition-colors" />
          </a>

          <a
            href={personalBrand.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl border border-border-subtle/60 bg-obsidian/40 hover:bg-obsidian/70 hover:border-champagne/40 text-sand hover:text-ivory transition-all group"
          >
            <div className="flex items-center gap-3">
              <LinkedinIcon className="w-5 h-5 text-champagne/90 group-hover:text-champagne" />
              <div>
                <div className="text-sm font-medium text-ivory">LinkedIn</div>
                <div className="text-xs text-sand/60">in/nabil-dawud</div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-sand/50 group-hover:text-champagne transition-colors" />
          </a>
        </div>
      </div>

      {/* Operational Context & Location */}
      <div className="rounded-2xl border border-border-subtle/80 bg-graphite/40 p-6 space-y-4">
        <h3 className="text-base font-semibold text-ivory flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-teal" />
          <span>{t.contact.gazaTitle}</span>
        </h3>
        <p className="text-xs text-sand leading-relaxed">
          {t.contact.gazaDescription}
        </p>

        <ul className="space-y-3 pt-2 text-xs text-sand/80 border-t border-border-subtle/40">
          <li className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-champagne/80 shrink-0" />
            <span>
              {locale === "en" ? "Gaza, Palestine" : "غزة، فلسطين"}
            </span>
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-champagne/80 shrink-0" />
            <span>
              {locale === "en"
                ? "Timezone: Eastern European Time (UTC+2 / UTC+3)"
                : "المنطقة الزمنية: توقيت القدس (UTC+2 / UTC+3)"}
            </span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
            <span>
              {locale === "en"
                ? "Available for remote software engineering contracts & full-time roles"
                : "متاح لعقود العمل الهندسي عن بعد والوظائف بدوام كامل"}
            </span>
          </li>
        </ul>
      </div>

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl border border-border-subtle/60 bg-graphite/20 flex items-start gap-3 text-xs text-sand/70">
        <Lock className="w-4 h-4 text-sand/50 shrink-0 mt-0.5" />
        <p className="leading-relaxed">{t.contact.privacyNote}</p>
      </div>
    </aside>
  );
}
