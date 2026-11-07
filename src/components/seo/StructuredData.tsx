import React from "react";
import { Locale } from "@/data/types";
import { personalBrand } from "@/data/personal";

interface StructuredDataProps {
  locale: Locale;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const isAr = locale === "ar";
  const baseUrl = "https://nabil-dawud.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Nabil Dawud",
    alternateName: [
      "Nabil Husam Dawud",
      "نبيل داود",
      "نبيل حسام داود",
    ],
    givenName: "Nabil",
    familyName: "Dawud",
    jobTitle: isAr ? "مهندس برمجيات" : "Software Engineer",
    description: isAr
      ? personalBrand.bioPreview.ar
      : personalBrand.bioPreview.en,
    url: baseUrl,
    image: `${baseUrl}/assets/images/nabil-dawud-portrait.webp`,
    sameAs: [
      personalBrand.socials.github,
      personalBrand.socials.linkedin,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gaza",
      addressCountry: "Palestine",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Al-Azhar University - Gaza",
      url: "http://www.alazhar.edu.ps",
    },
    knowsAbout: [
      "Laravel",
      "PHP",
      "RESTful APIs",
      "Database Architecture",
      "MySQL",
      "PostgreSQL",
      "Next.js",
      "TypeScript",
      "Offline-First Systems",
      "Distributed Systems",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Nabil Dawud Portfolio",
    description: isAr
      ? "الموقع التعريفي والملف المهني للمهندس نبيل داود، مهندس أنظمة وبرمجيات خلفية."
      : "Personal portfolio of Nabil Dawud, Software Engineer focused on Laravel, APIs, and scalable systems.",
    inLanguage: ["en", "ar"],
    publisher: {
      "@id": `${baseUrl}/#person`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
