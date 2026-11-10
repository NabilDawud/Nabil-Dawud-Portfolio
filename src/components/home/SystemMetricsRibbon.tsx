"use client";

import React from "react";
import { Zap, RefreshCw, ShieldCheck, GraduationCap } from "lucide-react";
import { useLanguage } from "@/i18n";
import { SpotlightCard } from "../ui";

export function SystemMetricsRibbon() {
  const { t } = useLanguage();

  const metricsList = [
    {
      id: "latency",
      icon: Zap,
      value: t.metrics.latency.value,
      label: t.metrics.latency.label,
      description: t.metrics.latency.description,
      accent: "text-champagne",
    },
    {
      id: "sync",
      icon: RefreshCw,
      value: t.metrics.sync.value,
      label: t.metrics.sync.label,
      description: t.metrics.sync.description,
      accent: "text-teal",
    },
    {
      id: "isolation",
      icon: ShieldCheck,
      value: t.metrics.isolation.value,
      label: t.metrics.isolation.label,
      description: t.metrics.isolation.description,
      accent: "text-champagne-bright",
    },
    {
      id: "education",
      icon: GraduationCap,
      value: t.metrics.education.value,
      label: t.metrics.education.label,
      description: t.metrics.education.description,
      accent: "text-sand",
    },
  ];

  return (
    <section
      aria-label={t.metrics.sectionLabel}
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {metricsList.map((metric) => {
          const Icon = metric.icon;

          return (
            <SpotlightCard
              key={metric.id}
              className="p-5 sm:p-6 bg-graphite/30 hover:bg-graphite/60 border border-border-subtle/70 transition-all duration-300"
              spotlightColor="rgba(212, 175, 55, 0.1)"
              borderColor="rgba(212, 175, 55, 0.3)"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-graphite-elevated flex items-center justify-center border border-border-subtle/60 text-sand/80">
                  <Icon className="w-4 h-4" />
                </span>
                <span className={`font-display font-extrabold text-2xl sm:text-3xl tracking-tight ${metric.accent}`}>
                  {metric.value}
                </span>
              </div>
              <div className="text-start space-y-1">
                <h4 className="text-xs sm:text-sm font-semibold text-ivory">
                  {metric.label}
                </h4>
                <p className="text-[11px] sm:text-xs text-sand/70 font-mono">
                  {metric.description}
                </p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
