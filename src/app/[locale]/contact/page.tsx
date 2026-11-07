import React from "react";
import type { Metadata } from "next";
import { defaultOgImages, SITE_URL } from "@/lib/seo";
import { ContactHero, ContactForm, ContactSidebar } from "@/components/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "تواصل معي — هندسة الأنظمة والبرمجيات الخلفية"
      : "Contact — Backend & Systems Engineering",
    description: isAr
      ? "تواصل مع نبيل داود بخصوص أدوار هندسة البرمجيات الخلفية، وبناء الأنظمة الموزعة القابلة للتوسع. قناة تواصل مباشرة ومحمية."
      : "Get in touch with Nabil Dawud for backend software engineering roles, team collaboration, and scalable distributed system design. Direct and secure communication channel.",
    alternates: {
      canonical: isAr ? "/ar/contact" : "/contact",
      languages: {
        en: "/contact",
        ar: "/ar/contact",
        "x-default": "/contact",
      },
    },
    openGraph: {
      title: isAr
        ? "تواصل مع المهندس نبيل داود"
        : "Contact Nabil Dawud | Backend & Systems Engineer",
      description: isAr
        ? "قناة تواصل آمنة ومباشرة للتعاون الهندسي."
        : "Direct communication channel for engineering roles and systems collaboration.",
      url: isAr
        ? `${SITE_URL}/ar/contact`
        : `${SITE_URL}/contact`,
      images: defaultOgImages,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="flex-1 flex flex-col w-full">
      {/* 1. Contact Hero */}
      <ContactHero />

      {/* 2. Form & Verified Context Grid */}
      <section
        aria-label="Contact Details and Submission Form"
        className="w-full py-12 md:py-16"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Form: 7 columns on desktop */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Sidebar with verified channels and context: 5 columns on desktop */}
            <div className="lg:col-span-5">
              <ContactSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
