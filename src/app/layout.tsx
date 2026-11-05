import type { Metadata } from "next";
import { cookies } from "next/headers";
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
import "./globals.css";

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
  title: {
    template: "%s | Nabil Dawud",
    default: "Nabil Dawud — Software Engineer | Backend & Scalable Systems",
  },
  description:
    "Personal portfolio of Nabil Dawud, Software Engineer focused on Laravel, APIs, and scalable systems. Gaza, Palestine.",
  metadataBase: new URL("https://nabildawud.dev"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read persistent cookie on the server
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("NEXT_LOCALE")?.value;
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
        <LanguageProvider initialLocale={initialLocale}>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
