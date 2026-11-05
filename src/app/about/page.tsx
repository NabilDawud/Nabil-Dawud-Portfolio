import React from "react";
import type { Metadata } from "next";
import {
  AboutHeroSection,
  AcademicCredentialsSection,
  CertificationsGallery,
  AiWorkflowSection,
  BeyondCodeSection,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About Nabil Dawud | Computer Systems Engineer",
  description:
    "Learn about Nabil Dawud's background in Computer Systems Engineering (Al-Azhar University, 91.44%), verified technical certifications, disciplined AI workflow, and engineering philosophy.",
  alternates: {
    canonical: "/about",
  },
};

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
