"use client";

import React from "react";
import {
  HeroSection,
  TechnicalFocusSection,
  SelectedWorkSection,
  JourneyPreviewSection,
  EducationPreviewSection,
  ContactCtaSection,
} from "@/components/home";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full">
      {/* 1. Hero Section with Live Status & Modular Portrait Slot */}
      <HeroSection />

      {/* 2. Technical Focus Section (#focus) */}
      <TechnicalFocusSection />

      {/* 3. Selected Work Showcase (#selected-work) */}
      <SelectedWorkSection />

      {/* 4. Professional Journey Stream (#journey) */}
      <JourneyPreviewSection />

      {/* 5. Academic & Accredited Education Preview */}
      <EducationPreviewSection />

      {/* 6. Privacy-Compliant Conversion CTA Section */}
      <ContactCtaSection />
    </main>
  );
}
