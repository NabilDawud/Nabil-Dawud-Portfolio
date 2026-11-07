import React from "react";
import type { Metadata } from "next";
import { defaultOgImages, SITE_URL } from "@/lib/seo";
import {
  HeroSection,
  TechnicalFocusSection,
  SelectedWorkSection,
  JourneyPreviewSection,
  EducationPreviewSection,
  ContactCtaSection,
} from "@/components/home";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    alternates: {
      canonical: isAr ? "/ar" : "/",
      languages: {
        en: "/",
        ar: "/ar",
        "x-default": "/",
      },
    },
    openGraph: {
      url: isAr ? `${SITE_URL}/ar` : SITE_URL,
      images: defaultOgImages,
    },
  };
}

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
