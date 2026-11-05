"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n";
import { Button } from "@/components/ui/Button";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp_website: string;
}

export function ContactForm() {
  const { t, locale } = useLanguage();

  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    _hp_website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Non-intrusive error clearing upon user input correction
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
      const response = await fetch(`/api/contact?locale=${locale}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setSubmitStatus("success");
        // Reset form inputs only upon confirmed success
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _hp_website: "",
        });
      } else if (response.status === 400 && data?.errors) {
        setErrors(data.errors);
        setSubmitStatus("error");
        setServerErrorMessage(t.contact.validationFailed);
      } else if (response.status === 429) {
        setSubmitStatus("error");
        setServerErrorMessage(
          data?.error || t.contact.errorMessage
        );
      } else {
        setSubmitStatus("error");
        setServerErrorMessage(
          data?.error || t.contact.errorMessage
        );
      }
    } catch {
      setSubmitStatus("error");
      setServerErrorMessage(t.contact.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border-subtle/80 bg-graphite/40 p-6 sm:p-8 space-y-6 text-start">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-ivory tracking-tight">
          {t.contact.formTitle}
        </h2>
        <p className="text-xs sm:text-sm text-sand/70 mt-1">
          {t.contact.rateLimitNotice}
        </p>
      </div>

      {/* Submission Status Alerts */}
      {submitStatus === "success" && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 rounded-xl border border-teal/40 bg-teal/10 text-ivory flex items-start gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-ivory">
              {t.contact.successTitle}
            </h3>
            <p className="text-xs text-sand/90 leading-relaxed">
              {t.contact.successMessage}
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 rounded-xl border border-coral/40 bg-coral/10 text-ivory flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-ivory">
              {t.contact.errorTitle}
            </h3>
            <p className="text-xs text-sand/90 leading-relaxed">
              {serverErrorMessage || t.contact.errorMessage}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5 relative overflow-hidden">
        {/* Honeypot field: invisible to sighted visitors, excluded from tab order, ignored by screen readers */}
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <label htmlFor="_hp_website">{t.contact.honeypotLabel}</label>
          <input
            id="_hp_website"
            type="text"
            name="_hp_website"
            tabIndex={-1}
            autoComplete="off"
            value={formData._hp_website}
            onChange={handleChange}
          />
        </div>

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="contact-name"
              className="block text-xs font-medium text-sand uppercase tracking-wider"
            >
              {t.contact.nameLabel} <span className="text-coral">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder={t.contact.namePlaceholder}
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border bg-obsidian/60 text-ivory placeholder:text-sand/40 text-sm focus:outline-none transition-colors ${
                errors.name
                  ? "border-coral focus:border-coral"
                  : "border-border-subtle focus:border-champagne"
              }`}
            />
            {errors.name && (
              <p
                id="contact-name-error"
                role="alert"
                className="text-xs text-coral mt-1"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="contact-email"
              className="block text-xs font-medium text-sand uppercase tracking-wider"
            >
              {t.contact.emailLabel} <span className="text-coral">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={t.contact.emailPlaceholder}
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-xl border bg-obsidian/60 text-ivory placeholder:text-sand/40 text-sm focus:outline-none transition-colors ${
                errors.email
                  ? "border-coral focus:border-coral"
                  : "border-border-subtle focus:border-champagne"
              }`}
            />
            {errors.email && (
              <p
                id="contact-email-error"
                role="alert"
                className="text-xs text-coral mt-1"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="contact-subject"
            className="block text-xs font-medium text-sand uppercase tracking-wider"
          >
            {t.contact.subjectLabel} <span className="text-coral">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            required
            placeholder={t.contact.subjectPlaceholder}
            value={formData.subject}
            onChange={handleChange}
            aria-invalid={!!errors.subject}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-xl border bg-obsidian/60 text-ivory placeholder:text-sand/40 text-sm focus:outline-none transition-colors ${
              errors.subject
                ? "border-coral focus:border-coral"
                : "border-border-subtle focus:border-champagne"
            }`}
          />
          {errors.subject && (
            <p
              id="contact-subject-error"
              role="alert"
              className="text-xs text-coral mt-1"
            >
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label
            htmlFor="contact-message"
            className="block text-xs font-medium text-sand uppercase tracking-wider"
          >
            {t.contact.messageLabel} <span className="text-coral">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder={t.contact.messagePlaceholder}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            disabled={isSubmitting}
            className={`w-full px-4 py-3 rounded-xl border bg-obsidian/60 text-ivory placeholder:text-sand/40 text-sm focus:outline-none transition-colors resize-y min-h-[120px] ${
              errors.message
                ? "border-coral focus:border-coral"
                : "border-border-subtle focus:border-champagne"
            }`}
          />
          {errors.message && (
            <p
              id="contact-message-error"
              role="alert"
              className="text-xs text-coral mt-1"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-w-[200px] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.contact.sendingButton}</span>
              </>
            ) : (
              <>
                <span>{t.contact.sendButton}</span>
                <Send className="w-4 h-4 rtl:rotate-180" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
