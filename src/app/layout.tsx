import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lindahairsalon.cz";

const title = "Linda's Hair Salon | Kadeřnictví · Nehty · Make-up · Péče o pleť";
const description =
  "Profesionální kadeřnický salon v Teplicích nabízející střihy pro ženy i muže, péči o nehty, make-up, prodloužení řas a ošetření pleti. Rezervujte si termín ještě dnes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Linda's Hair Salon",
    title,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Linda's Hair Salon — Teplice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: "Linda's Hair Salon",
  url: siteUrl,
  telephone: "+420774109009",
  address: {
    "@type": "PostalAddress",
    streetAddress: "28. října 857/20",
    addressLocality: "Teplice",
    postalCode: "415 01",
    addressCountry: "CZ",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/",
    "https://www.instagram.com/linda_beauty_studio.28",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="cs" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh font-sans antialiased bg-[#111] text-gray-100">
        {/* Adds "js" class to <html> immediately — scopes .reveal animation so content
            is visible when JS is unavailable or slow */}
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }}
        />

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

        <Analytics nonce={nonce} />

        <script
          nonce={nonce}
          suppressHydrationWarning
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
