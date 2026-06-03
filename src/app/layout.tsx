import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linda Beauty Studio | Kadeřnictví · Nehty · Make-up · Péče o pleť",
  description:
    "Profesionální salon nabízející střihy pro ženy i muže, péči o nehty, make-up, prodloužení řas a ošetření pleti. Rezervujte si termín ještě dnes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh font-sans antialiased bg-white text-gray-900">
        {/* Skip to main content — keyboard / screen reader navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gray-900 focus:text-white focus:text-sm focus:font-semibold focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Přeskočit na hlavní obsah / Skip to main content
        </a>
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
