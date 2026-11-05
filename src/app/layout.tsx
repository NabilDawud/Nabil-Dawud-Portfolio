import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Geist,
  Geist_Mono,
  Alexandria,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`
        ${plusJakartaSans.variable} 
        ${geistSans.variable} 
        ${geistMono.variable} 
        ${alexandria.variable} 
        ${ibmPlexArabic.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-ivory">
        {children}
      </body>
    </html>
  );
}
