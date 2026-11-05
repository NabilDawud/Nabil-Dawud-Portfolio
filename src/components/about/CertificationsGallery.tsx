"use client";

import React, { useState, useCallback } from "react";
import { Award, Clock, Calendar, Building, ExternalLink, CheckCircle } from "lucide-react";
import { getAllCertifications, getAdjacentCertification } from "@/data/certifications-helpers";
import { Certification } from "@/data/types";
import { useLanguage } from "@/i18n";
import { Badge } from "@/components/ui/Badge";
import { CertificateLightbox } from "./CertificateLightbox";

export function CertificationsGallery() {
  const { l, t, isRTL } = useLanguage();
  const certifications = getAllCertifications();

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenLightbox = useCallback((cert: Certification) => {
    setSelectedCert(cert);
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedCert((prev) => {
      if (!prev) return null;
      const adj = getAdjacentCertification(prev.id);
      return adj ? adj.prev : prev;
    });
  }, []);

  const handleNext = useCallback(() => {
    setSelectedCert((prev) => {
      if (!prev) return null;
      const adj = getAdjacentCertification(prev.id);
      return adj ? adj.next : prev;
    });
  }, []);

  return (
    <section
      aria-labelledby="certifications-heading"
      className="py-16 md:py-24 border-b border-border-subtle/40 bg-graphite/20 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-start">
        {/* Section Header */}
        <div className="space-y-3">
          <Badge variant="champagne" size="sm">
            {t.about.certificationsTitle}
          </Badge>
          <h2
            id="certifications-heading"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-ivory tracking-tight"
          >
            {t.about.certificationsTitle}
          </h2>
          <p className="text-sand text-base sm:text-lg max-w-2xl leading-relaxed">
            {t.about.certificationsSubtitle}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl border border-border-subtle/80 bg-graphite/40 hover:bg-graphite/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-champagne/40 space-y-6 group"
            >
              <div className="space-y-4">
                {/* Header row with icon & badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-champagne shrink-0 group-hover:border-champagne/40 transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  {cert.verified && (
                    <Badge variant="champagne" size="sm">
                      <CheckCircle className="w-3 h-3 me-1" />
                      {isRTL ? "معتمد" : "Verified"}
                    </Badge>
                  )}
                </div>

                {/* Title & Issuer */}
                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-xl text-ivory group-hover:text-champagne transition-colors">
                    {l(cert.title)}
                  </h3>
                  <div className="text-sm font-medium text-sand/80 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-champagne shrink-0" />
                    <span>{l(cert.issuer)}</span>
                  </div>
                  {cert.trainingCenter && (
                    <p className="text-xs text-sand/60">
                      {isRTL ? "الجهة المنفذة: " : "Training Center: "}
                      {l(cert.trainingCenter)}
                    </p>
                  )}
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap gap-3 pt-2 text-xs text-sand/70 font-mono">
                  {cert.hours && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian/60 border border-border-subtle/50">
                      <Clock className="w-3.5 h-3.5 text-champagne" />
                      {cert.hours} {isRTL ? "ساعة" : "Hours"}
                    </span>
                  )}
                  {cert.grade && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian/60 border border-border-subtle/50 text-champagne font-semibold">
                      {l(cert.grade)}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian/60 border border-border-subtle/50">
                    <Calendar className="w-3.5 h-3.5 text-sand/60" />
                    {l(cert.dateRange)}
                  </span>
                </div>
              </div>

              {/* View Certificate trigger button */}
              <div className="pt-2 border-t border-border-subtle/40">
                <button
                  type="button"
                  id={`btn-cert-${cert.id}`}
                  onClick={() => handleOpenLightbox(cert)}
                  aria-haspopup="dialog"
                  aria-expanded={isLightboxOpen && selectedCert?.id === cert.id}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-ivory bg-graphite-elevated border border-border-subtle hover:border-champagne/50 hover:bg-graphite hover:text-champagne transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
                >
                  <span>{t.about.viewCertificate}</span>
                  <ExternalLink className="w-4 h-4 text-champagne/80" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Certificate Lightbox Modal */}
      <CertificateLightbox
        certification={selectedCert}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
