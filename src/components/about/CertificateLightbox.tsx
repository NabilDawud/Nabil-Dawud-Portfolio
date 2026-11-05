"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Award, Clock, Calendar, Building, FileCheck } from "lucide-react";
import { Certification } from "@/data/types";
import { useLanguage } from "@/i18n";
import { Badge } from "@/components/ui/Badge";

export interface CertificateLightboxProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function CertificateLightbox({
  certification,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: CertificateLightboxProps) {
  const { l, t, isRTL } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const [erroredCertIds, setErroredCertIds] = useState<Record<string, boolean>>({});

  // Handle focus trapping and keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (isRTL) {
          onNext?.();
        } else {
          onPrev?.();
        }
        return;
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isRTL) {
          onPrev?.();
        } else {
          onNext?.();
        }
        return;
      }

      if (e.key === "Tab") {
        if (!modalRef.current) return;
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!modalRef.current.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus();
          return;
        }

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
      }
    },
    [isOpen, onClose, onPrev, onNext, isRTL]
  );

  // 1. Modal open/close lifecycle effect (strictly depends on [isOpen])
  useEffect(() => {
    if (!isOpen) return;

    // Save triggering element
    if (document.activeElement instanceof HTMLElement) {
      previouslyFocusedElementRef.current = document.activeElement;
    }

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Initial focus into modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector<HTMLElement>(
          'button[data-autofocus="true"]'
        );
        if (closeBtn) {
          closeBtn.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;

      // Restore focus to original element
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen]);

  // 2. Keyboard listener effect (updates freely without triggering modal lifecycle cleanup)
  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !certification) {
    return null;
  }

  const cert = certification;
  const showFallback = erroredCertIds[cert.id] || !cert.imagePlaceholder;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-obsidian/85 backdrop-blur-md transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] bg-graphite border border-champagne/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden focus:outline-none"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle/80 bg-graphite-elevated/80">
          <div className="flex items-center gap-3">
            <Badge variant="champagne" size="sm">
              <FileCheck className="w-3.5 h-3.5 me-1" />
              {t.about.sectionBadge}
            </Badge>
            <span className="text-xs font-mono text-sand/60 uppercase">
              {cert.verified ? (isRTL ? "معتمد" : "Verified Credential") : ""}
            </span>
          </div>

          <button
            type="button"
            data-autofocus="true"
            onClick={onClose}
            aria-label={t.about.closeLightbox}
            className="p-2 rounded-lg text-sand hover:text-ivory hover:bg-graphite/70 border border-transparent hover:border-border-subtle transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Preview Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-start">
          <div className="space-y-2">
            <h3
              id="lightbox-title"
              className="font-display font-bold text-xl sm:text-2xl text-ivory tracking-tight"
            >
              {l(cert.title)}
            </h3>
            <p className="text-sm font-medium text-sand/80 flex items-center gap-2">
              <Building className="w-4 h-4 text-champagne shrink-0" />
              <span>{l(cert.issuer)}</span>
              {cert.trainingCenter && (
                <>
                  <span className="text-sand/40">•</span>
                  <span>{l(cert.trainingCenter)}</span>
                </>
              )}
            </p>
          </div>

          {/* Document Display: Scan or Illustrative Fallback */}
          <div className="relative min-h-[260px] sm:min-h-[320px] rounded-xl border border-border-subtle/80 bg-obsidian/70 p-6 flex flex-col items-center justify-center text-center overflow-hidden">
            {!showFallback ? (
              <div className="relative w-full h-[320px] sm:h-[400px]">
                <Image
                  src={cert.imagePlaceholder!}
                  alt={l(cert.title)}
                  fill
                  className="object-contain rounded-lg"
                  onError={() =>
                    setErroredCertIds((prev) => ({ ...prev, [cert.id]: true }))
                  }
                  unoptimized
                />
              </div>
            ) : (
              /* Honest Illustrative UI Fallback Card */
              <div className="w-full max-w-xl mx-auto space-y-6 py-4">
                {/* Fallback Notice Banner */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-champagne/10 border border-champagne/30 text-champagne text-xs font-medium">
                  <Award className="w-4 h-4 shrink-0" />
                  <span>{t.about.illustrativeFallbackNotice}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-semibold text-lg sm:text-xl text-ivory">
                    {l(cert.title)}
                  </h4>
                  <p className="text-xs text-sand/70 max-w-md mx-auto leading-relaxed">
                    {t.about.pendingScanNotice}
                  </p>
                </div>

                {/* Verified Metadata Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-start pt-2">
                  <div className="p-3 rounded-lg bg-graphite/60 border border-border-subtle/50">
                    <span className="text-[11px] font-mono text-sand/60 block">
                      {t.about.issuerLabel}
                    </span>
                    <span className="text-xs font-semibold text-ivory line-clamp-2 mt-0.5">
                      {l(cert.issuer)}
                    </span>
                  </div>

                  {cert.hours && (
                    <div className="p-3 rounded-lg bg-graphite/60 border border-border-subtle/50">
                      <span className="text-[11px] font-mono text-sand/60 block">
                        {t.about.hoursLabel}
                      </span>
                      <span className="text-xs font-semibold text-ivory flex items-center gap-1 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-champagne" />
                        {cert.hours} {isRTL ? "ساعة تدريبية" : "Hours"}
                      </span>
                    </div>
                  )}

                  {cert.grade && (
                    <div className="p-3 rounded-lg bg-graphite/60 border border-border-subtle/50">
                      <span className="text-[11px] font-mono text-sand/60 block">
                        {isRTL ? "التقدير" : "Grade"}
                      </span>
                      <span className="text-xs font-semibold text-champagne mt-0.5 block">
                        {l(cert.grade)}
                      </span>
                    </div>
                  )}

                  <div className="p-3 rounded-lg bg-graphite/60 border border-border-subtle/50 col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-mono text-sand/60 block">
                      {t.about.dateLabel}
                    </span>
                    <span className="text-xs font-semibold text-ivory flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-champagne shrink-0" />
                      <span className="truncate">{l(cert.dateRange)}</span>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with Circular Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border-subtle/80 bg-graphite-elevated/50">
          <button
            type="button"
            onClick={onPrev}
            aria-label={t.about.prevCertificate}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-sand hover:text-ivory hover:bg-graphite/70 border border-border-subtle transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            <span>{t.about.prevCertificate}</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label={t.about.nextCertificate}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-sand hover:text-ivory hover:bg-graphite/70 border border-border-subtle transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          >
            <span>{t.about.nextCertificate}</span>
            {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
