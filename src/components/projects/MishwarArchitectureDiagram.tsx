"use client";

import React from "react";
import {
  WifiOff,
  Radio,
  Server,
  AlertTriangle,
  Clock,
  Compass,
  Database,
  Cpu,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/i18n";

export function MishwarArchitectureDiagram() {
  const { t, isRTL } = useLanguage();

  return (
    <div
      className="rounded-2xl border border-champagne/30 bg-graphite/60 p-6 sm:p-8 lg:p-10 space-y-8 shadow-2xl shadow-black/60"
      aria-label="Mishwar Architecture Diagram"
    >
      {/* Diagram Header */}
      <div className="space-y-3 text-start border-b border-border-subtle/50 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-champagne bg-champagne/10 border border-champagne/20">
          <Layers className="w-3.5 h-3.5 text-champagne" />
          <span>Mishwar System Architecture</span>
        </div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-ivory">
          {t.projects.caseStudy.architectureDiagramTitle}
        </h3>
        <p className="text-sm sm:text-base text-sand leading-relaxed max-w-3xl">
          {t.projects.caseStudy.architectureDiagramSubtitle}
        </p>
      </div>

      {/* 3 Engineering Concerns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Concern 1: Offline Route Graph Planning */}
        <div className="rounded-xl border border-border-subtle/80 bg-graphite-elevated/40 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-champagne">
              <div className="p-2 rounded-lg bg-champagne/10 border border-champagne/20">
                <WifiOff className="w-5 h-5 text-champagne" />
              </div>
              <h4 className="font-display font-semibold text-base sm:text-lg text-ivory">
                {t.projects.caseStudy.concernOffline}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-sand leading-relaxed">
              {isRTL
                ? "تخطيط مسارات الرحلات محلياً عبر ذاكرة المتصفح دون الحاجة للاتصال بالخادم، مصمم خصيصاً لظروف انقطاع شبكات الاتصال."
                : "Local multi-leg route planning executed entirely in client JavaScript using pre-cached transit graphs, tailored for intermittent connectivity."}
            </p>

            <div className="space-y-2 pt-2 border-t border-border-subtle/40 text-xs">
              <div className="p-2.5 rounded-lg bg-graphite/70 border border-border-subtle/60 space-y-1">
                <span className="font-mono text-[11px] text-champagne block">
                  Client Cache Graph
                </span>
                <span className="text-sand/80 text-[11px] leading-normal block">
                  {isRTL
                    ? "تخزين مسبق لعقد ومحطات محاور غزة الرئيسية (صلاح الدين، شارع الرشيد الساحلي)."
                    : "Pre-cached route corridor graph for Gaza arterial routes (Salah al-Din, Al-Rasheed coastal road)."}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-graphite/70 border border-border-subtle/60 space-y-1">
                <span className="font-mono text-[11px] text-champagne block">
                  In-Memory Path Search
                </span>
                <span className="text-sand/80 text-[11px] leading-normal block">
                  {isRTL
                    ? "خوارزمية حساب المسار ومحطات التبديل تعمل كلياً في الواجهة الأمامية."
                    : "Multi-leg transfer calculations computed in client-side memory without roundtrips."}
                </span>
              </div>
            </div>
          </div>

          {/* Strict Operational Boundary Note */}
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2 leading-relaxed">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{t.projects.caseStudy.offlineNotice}</span>
          </div>
        </div>

        {/* Concern 2: Live Location Data Flow & Freshness Indicators */}
        <div className="rounded-xl border border-border-subtle/80 bg-graphite-elevated/40 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-teal">
              <div className="p-2 rounded-lg bg-teal/10 border border-teal/20">
                <Radio className="w-5 h-5 text-teal" />
              </div>
              <h4 className="font-display font-semibold text-base sm:text-lg text-ivory">
                {t.projects.caseStudy.concernLive}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-sand leading-relaxed">
              {isRTL
                ? "مزامنة إحداثيات المركبات عند توفر شبكة الخلوي مع عرض واضح للزمن المنقضي منذ آخر إشارة وتنبيه عند حيود المسار."
                : "Real-time vehicle GPS synchronization over available cellular links with explicit elapsed-age indicators and route deviation alerts."}
            </p>

            <div className="space-y-2 pt-2 border-t border-border-subtle/40 text-xs">
              <div className="p-2.5 rounded-lg bg-graphite/70 border border-border-subtle/60 space-y-1">
                <div className="flex items-center gap-1.5 text-teal font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>GPS Freshness Indicator</span>
                </div>
                <span className="text-sand/80 text-[11px] leading-normal block">
                  {isRTL
                    ? "عرض حداثة الموقع كزمن منقضي بدلاً من افتراض اللحظية (مثال: 'منذ دقيقتين')."
                    : "Explicit human-readable elapsed-age display (e.g. 'Last seen 2 mins ago') instead of assuming zero latency."}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-graphite/70 border border-border-subtle/60 space-y-1">
                <div className="flex items-center gap-1.5 text-teal font-mono text-[11px]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Route Drift Alert</span>
                </div>
                <span className="text-sand/80 text-[11px] leading-normal block">
                  {isRTL
                    ? "مقارنة موقع المركبة بالمسار المحدد وتنبيه الراكب مع زر اتصال مباشر بالسائق في حال الانحراف."
                    : "Detects vehicle deviation from scheduled corridor stops and surfaces a direct dialer action."}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-teal/10 border border-teal/20 text-[11px] text-teal-200/90 leading-relaxed font-mono">
            {isRTL
              ? "مزامنة لحظية مشروطة بتوفر التغطية الخلوية"
              : "Live telemetry conditional on cellular carrier coverage"}
          </div>
        </div>

        {/* Concern 3: Deployment & Testing Infrastructure */}
        <div className="rounded-xl border border-border-subtle/80 bg-graphite-elevated/40 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-purple-400">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <Server className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-display font-semibold text-base sm:text-lg text-ivory">
                {t.projects.caseStudy.concernInfra}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-sand leading-relaxed">
              {isRTL
                ? "بيئة تشغيل معتمدة على FrankenPHP وCaddy على PHP 8.4 مع اختبارات آلية معزولة في GitHub Actions ونشر مستمر عبر Dokku."
                : "Runtime environment powered by FrankenPHP / Caddy on PHP 8.4, isolated SQLite CI suite on GitHub Actions, and continuous deployment via Dokku."}
            </p>

            <div className="space-y-2 pt-2 border-t border-border-subtle/40 text-xs">
              <div className="p-2.5 rounded-lg bg-graphite/70 border border-border-subtle/60 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-300 font-mono text-[11px]">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>FrankenPHP / Caddy</span>
                </div>
                <span className="text-sand/80 text-[11px] leading-normal block">
                  {isRTL
                    ? "خادم تطبيقات مدمج في عملية واحدة مع إدارة آمنة للـ TLS وذاكرة العمال على PHP 8.4."
                    : "Single-binary application server with Caddy TLS and persistent worker processes."}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-graphite/70 border border-border-subtle/60 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-300 font-mono text-[11px]">
                  <Database className="w-3.5 h-3.5" />
                  <span>Isolated SQLite CI</span>
                </div>
                <span className="text-sand/80 text-[11px] leading-normal block">
                  {isRTL
                    ? "حزمة اختبارات في الذاكرة تحاكي قيود قاعدة بيانات الإنتاج في GitHub Actions."
                    : "In-memory test harness replicating production constraints in automated CI."}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200/90 leading-relaxed font-mono">
            {isRTL
              ? "نشر مستمر ومراقب عبر Dokku Platform"
              : "Continuous deployment managed via Dokku platform"}
          </div>
        </div>
      </div>
    </div>
  );
}
