import React from "react";
import type { Metadata } from "next";
import { defaultOgImages, SITE_URL } from "@/lib/seo";
import {
  AboutHeroSection,
  AcademicCredentialsSection,
  CertificationsGallery,
  AiWorkflowSection,
  BeyondCodeSection,
} from "@/components/about";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "نبذة مهنية — فلسفة الهندسة والمؤهلات"
      : "About — Engineering Philosophy & Credentials",
    description: isAr
      ? "تعرف على خلفية نبيل داود في هندسة أنظمة الحاسوب (جامعة الأزهر، 91.44% امتياز مع مرتبة الشرف)، وشهاداته المعتمدة، وفلسفته الهندسية."
      : "Learn about Nabil Dawud's background in Computer Systems Engineering (Al-Azhar University, 91.44% Honors), verified certifications, disciplined workflow, and engineering philosophy.",
    alternates: {
      canonical: isAr ? "/ar/about" : "/about",
      languages: {
        en: "/about",
        ar: "/ar/about",
        "x-default": "/about",
      },
    },
    openGraph: {
      title: isAr
        ? "نبذة عن المهندس نبيل داود | هندسة أنظمة الحاسوب"
        : "About Nabil Dawud | Computer Systems Engineer",
      description: isAr
        ? "خلفية نبيل داود في هندسة أنظمة الحاسوب والأنظمة الموزعة."
        : "Nabil Dawud's engineering philosophy, academic credentials, and background.",
      url: isAr
        ? `${SITE_URL}/ar/about`
        : `${SITE_URL}/about`,
      images: defaultOgImages,
    },
  };
}

export default function AboutPage() {
  return (
    <main className="flex-1 flex flex-col w-full">
      {/* 1. Hero & Engineering Philosophy */}
      <AboutHeroSection />

      {/* 2. University Degree & Tawjihi Academic Highlight */}
      <AcademicCredentialsSection />

      {/* 3. Verified Certifications Gallery with Lightbox Modal */}
      <CertificationsGallery />

      {/* 4. Disciplined AI-Assisted Engineering Practice */}
      <AiWorkflowSection />

      {/* 5. Beyond the Code: Operational Resilience Context */}
      <BeyondCodeSection />
    </main>
  );
}
