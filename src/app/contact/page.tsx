import React from "react";
import type { Metadata } from "next";
import { ContactHero, ContactForm, ContactSidebar } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Nabil Dawud | Backend & Systems Engineer",
  description:
    "Get in touch with Nabil Dawud for backend software engineering roles, team collaboration, and scalable distributed system design. Direct and secure communication channel.",
  alternates: {
    canonical: "/contact",
  },
};

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
