"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, CheckCircle2, AlertCircle, Loader2, FileText } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Button } from "@/components/ui/Button";

interface CVRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  email: string;
  organization: string;
  purpose: string;
  _hp_website: string;
}

export function CVRequestModal({ isOpen, onClose }: CVRequestModalProps) {
  const { t, locale, isRTL } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    organization: "",
    purpose: "",
    _hp_website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  // Manage body scroll lock and focus restoration
  useEffect(() => {
    if (!isOpen) {
      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
      return;
    }

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    // Focus first interactive element in modal
    const timer = setTimeout(() => {
      const firstInput = modalRef.current?.querySelector<HTMLElement>(
        'input:not([type="hidden"]):not([tabindex="-1"]), button'
      );
      firstInput?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error on edit
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (submitStatus === "error") {
      setSubmitStatus("idle");
      setServerErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerErrorMessage("");
    setErrors({});

    try {
      const response = await fetch(`/api/cv-request?locale=${locale}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          organization: "",
          purpose: "",
          _hp_website: "",
        });
      } else {
        setSubmitStatus("error");
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          setServerErrorMessage(data?.error || t.cvRequest.errorGeneric);
        }
      }
    } catch {
      setSubmitStatus("error");
      setServerErrorMessage(t.cvRequest.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Reset status on close if finished
    if (submitStatus === "success") {
      setSubmitStatus("idle");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-graphite border border-border-subtle rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 focus:outline-none"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-5 end-5 p-2 rounded-xl text-sand hover:text-ivory hover:bg-graphite-elevated border border-transparent hover:border-border-subtle transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne"
          aria-label={t.cvRequest.closeButton}
        >
          <X className="w-5 h-5" />
        </button>

        {submitStatus === "success" ? (
          /* Success Confirmation View */
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-ivory">
              {t.cvRequest.successTitle}
            </h3>
            <p className="text-sand text-sm leading-relaxed max-w-md mx-auto">
              {t.cvRequest.successMessage}
            </p>
            <div className="pt-4">
              <Button onClick={handleClose} variant="primary" size="md" className="w-full sm:w-auto">
                {t.cvRequest.closeButton}
              </Button>
            </div>
          </div>
        ) : (
          /* Request Form */
          <div>
            <div className="flex items-center gap-2.5 text-champagne mb-2">
              <FileText className="w-5 h-5 shrink-0" />
              <span className="text-xs uppercase tracking-wider font-semibold">
                {t.cvRequest.modalTitle}
              </span>
            </div>

            <h3
              id="cv-modal-title"
              className="text-xl sm:text-2xl font-bold text-ivory tracking-tight mb-2"
            >
              {t.cvRequest.modalTitle}
            </h3>
            <p className="text-sand text-xs sm:text-sm leading-relaxed mb-6">
              {t.cvRequest.modalSubtitle}
            </p>

            {serverErrorMessage && (
              <div
                className="mb-5 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs sm:text-sm flex items-start gap-2.5"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{serverErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Honeypot field (hidden) */}
              <input
                type="text"
                name="_hp_website"
                value={formData._hp_website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Full Name */}
              <div>
                <label
                  htmlFor="cv-fullName"
                  className="block text-xs font-medium text-ivory mb-1.5"
                >
                  {t.cvRequest.fullNameLabel}{" "}
                  <span className="text-champagne">*</span>
                </label>
                <input
                  id="cv-fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t.cvRequest.fullNamePlaceholder}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "cv-fullName-err" : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian/60 border text-ivory text-sm placeholder:text-sand/50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne/60 ${
                    errors.fullName ? "border-red-500/80" : "border-border-subtle hover:border-sand/40"
                  }`}
                />
                {errors.fullName && (
                  <p id="cv-fullName-err" className="text-red-400 text-xs mt-1 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="cv-email"
                  className="block text-xs font-medium text-ivory mb-1.5"
                >
                  {t.cvRequest.emailLabel}{" "}
                  <span className="text-champagne">*</span>
                </label>
                <input
                  id="cv-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.cvRequest.emailPlaceholder}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "cv-email-err" : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian/60 border text-ivory text-sm placeholder:text-sand/50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne/60 ${
                    errors.email ? "border-red-500/80" : "border-border-subtle hover:border-sand/40"
                  }`}
                />
                {errors.email && (
                  <p id="cv-email-err" className="text-red-400 text-xs mt-1 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Organization (Optional) */}
              <div>
                <label
                  htmlFor="cv-org"
                  className="block text-xs font-medium text-ivory mb-1.5"
                >
                  {t.cvRequest.organizationLabel}{" "}
                  <span className="text-sand text-[11px] font-normal">
                    {t.cvRequest.organizationOptional}
                  </span>
                </label>
                <input
                  id="cv-org"
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder={t.cvRequest.organizationPlaceholder}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.organization}
                  aria-describedby={errors.organization ? "cv-org-err" : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian/60 border text-ivory text-sm placeholder:text-sand/50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne/60 ${
                    errors.organization ? "border-red-500/80" : "border-border-subtle hover:border-sand/40"
                  }`}
                />
                {errors.organization && (
                  <p id="cv-org-err" className="text-red-400 text-xs mt-1 font-medium">
                    {errors.organization}
                  </p>
                )}
              </div>

              {/* Purpose of Request */}
              <div>
                <label
                  htmlFor="cv-purpose"
                  className="block text-xs font-medium text-ivory mb-1.5"
                >
                  {t.cvRequest.purposeLabel}{" "}
                  <span className="text-champagne">*</span>
                </label>
                <textarea
                  id="cv-purpose"
                  name="purpose"
                  rows={3}
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder={t.cvRequest.purposePlaceholder}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.purpose}
                  aria-describedby={errors.purpose ? "cv-purpose-err" : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-obsidian/60 border text-ivory text-sm placeholder:text-sand/50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne/60 resize-none ${
                    errors.purpose ? "border-red-500/80" : "border-border-subtle hover:border-sand/40"
                  }`}
                />
                {errors.purpose && (
                  <p id="cv-purpose-err" className="text-red-400 text-xs mt-1 font-medium">
                    {errors.purpose}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  {t.cvRequest.closeButton}
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="gap-2 min-w-[130px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-obsidian" />
                      <span>{t.cvRequest.submittingButton}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-obsidian" />
                      <span>{t.cvRequest.submitButton}</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
