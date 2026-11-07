import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Geist,
  Geist_Mono,
  Alexandria,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import {
  LanguageProvider,
  getDirection,
  defaultLocale,
  type Locale,
} from "@/i18n";
import { Navbar, Footer } from "@/components/layout";
import { StructuredData } from "@/components/seo/StructuredData";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const alexandria = Alexandria({
  variable: "--font-display-ar",
  subsets: ["arabic"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-sans-ar",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nabil-dawud.vercel.app"),
  title: {
    template: "%s | Nabil Dawud",
    default: "Nabil Dawud — Software Engineer | Backend & Scalable Systems",
  },
  description:
    "Personal portfolio of Nabil Dawud, Software Engineer focused on Laravel, APIs, and scalable systems. Gaza, Palestine.",
  authors: [{ name: "Nabil Dawud", url: "https://nabil-dawud.vercel.app" }],
  creator: "Nabil Dawud",
  publisher: "Nabil Dawud",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_AR"],
    url: "https://nabil-dawud.vercel.app",
    siteName: "Nabil Dawud Portfolio",
    title: "Nabil Dawud — Software Engineer | Backend & Scalable Systems",
    description:
      "Personal portfolio of Nabil Dawud, Software Engineer focused on Laravel, APIs, and scalable systems. Gaza, Palestine.",
    images: [
      {
        url: "https://nabil-dawud.vercel.app/assets/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nabil Dawud — Software Engineer | Backend & Full-Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Dawud — Software Engineer | Backend & Scalable Systems",
    description:
      "Personal portfolio of Nabil Dawud, Software Engineer focused on Laravel, APIs, and scalable systems. Gaza, Palestine.",
    images: ["https://nabil-dawud.vercel.app/assets/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;
  const initialLocale: Locale = rawLocale === "ar" ? "ar" : defaultLocale;
  const initialDir = getDirection(initialLocale);

  return (
    <html
      lang={initialLocale}
      dir={initialDir}
      className={`
        ${plusJakartaSans.variable} 
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${alexandria.variable} 
        ${ibmPlexArabic.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-ivory selection:bg-champagne/30 selection:text-ivory">
        <StructuredData locale={initialLocale} />
        <LanguageProvider initialLocale={initialLocale}>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
