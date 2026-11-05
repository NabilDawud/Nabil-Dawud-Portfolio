"use client";

import React from "react";
import { Mail, Clock, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Badge } from "@/components/ui/Badge";

export function ContactHero() {
  const { t, locale } = useLanguage();

  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative pt-12 pb-12 md:pt-16 md:pb-16 border-b border-border-subtle/40 bg-gradient-to-b from-obsidian via-graphite/20 to-obsidian"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-start space-y-6">
        {/* Badge */}
        <div className="flex items-center gap-3">
          <Badge variant="champagne" size="md" dot>
            {t.contact.sectionBadge}
          </Badge>
          <span className="text-xs font-mono text-sand/60 tracking-wider uppercase">
            {locale === "en" ? "Direct Communication" : "قناة تواصل مباشرة"}
          </span>
        </div>

        {/* Title */}
        <h1
          id="contact-hero-heading"
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ivory tracking-tight leading-[1.15]"
        >
          {t.contact.sectionTitle}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-sand font-normal leading-relaxed max-w-3xl">
          {t.contact.sectionSubtitle}
        </p>

        {/* Highlights Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle/50">
          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle/60 bg-graphite/40">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 mt-0.5">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-ivory">
                {locale === "en" ? "Private Transmission" : "تسليم مباشر مشفر"}
              </div>
              <p className="text-xs text-sand/70 leading-normal">
                {locale === "en"
                  ? "Transmitted directly to Nabil's private inbox without intermediary logging."
                  : "تصل رسالتك مباشرة لصندوق البريد الخاص دون تخزين وسيط."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle/60 bg-graphite/40">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-ivory">
                {locale === "en" ? "24–48h Response" : "رد خلال 24–48 ساعة"}
              </div>
              <p className="text-xs text-sand/70 leading-normal">
                {locale === "en"
                  ? "Prompt replies to project inquiries and engineering opportunities."
                  : "استجابة سريعة لفرص العمل الهندسية ومقترحات المشاريع."}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl border border-border-subtle/60 bg-graphite/40">
            <div className="w-10 h-10 rounded-lg bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-semibold text-ivory">
                {locale === "en" ? "Spam Protected" : "حماية متقدمة"}
              </div>
              <p className="text-xs text-sand/70 leading-normal">
                {locale === "en"
                  ? "Zero plaintext emails exposed; honeypot & atomic rate limiting enabled."
                  : "حماية ضد الرسائل العشوائية والحد من تكرار الطلبات تلقائياً."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
