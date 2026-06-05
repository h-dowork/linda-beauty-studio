"use client";

import { Star } from "lucide-react";

// TODO: Replace with the salon's real Google review link.
// Find it in Google Maps → Share → Copy link, then append &action=write-review
export const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJobb8G1mPCUcRREWCbpDy6cc";

function NFCWaves() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="1.4" fill="currentColor" stroke="none" />
      <path d="M7 7a4.2 4.2 0 0 0 0 6" />
      <path d="M13 7a4.2 4.2 0 0 1 0 6" />
      <path d="M4 4a8.5 8.5 0 0 0 0 12" />
      <path d="M16 4a8.5 8.5 0 0 1 0 12" />
    </svg>
  );
}

function QRCodePlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 h-28 text-gray-800"
      aria-hidden="true"
    >
      {/* Top-left finder */}
      <rect x="4" y="4" width="28" height="28" rx="3" fill="currentColor" />
      <rect x="8" y="8" width="20" height="20" rx="2" fill="white" />
      <rect x="11" y="11" width="14" height="14" rx="1" fill="currentColor" />
      {/* Top-right finder */}
      <rect x="68" y="4" width="28" height="28" rx="3" fill="currentColor" />
      <rect x="72" y="8" width="20" height="20" rx="2" fill="white" />
      <rect x="75" y="11" width="14" height="14" rx="1" fill="currentColor" />
      {/* Bottom-left finder */}
      <rect x="4" y="68" width="28" height="28" rx="3" fill="currentColor" />
      <rect x="8" y="72" width="20" height="20" rx="2" fill="white" />
      <rect x="11" y="75" width="14" height="14" rx="1" fill="currentColor" />
      {/* Timing / data cells */}
      <rect x="37" y="4" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="45" y="4" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="4" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="4" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="12" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="12" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="20" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="45" y="20" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="20" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="28" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="28" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="4" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="12" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="20" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="28" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="45" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="69" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="77" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="85" y="37" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="4" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="20" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="28" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="45" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="69" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="85" y="45" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="4" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="12" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="28" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="77" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="85" y="53" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="4" y="61" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="20" y="61" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="61" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="45" y="61" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="61" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="69" y="61" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="69" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="69" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="69" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="77" y="69" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="85" y="69" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="77" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="45" y="77" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="77" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="69" y="77" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="37" y="85" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="53" y="85" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="61" y="85" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="77" y="85" width="5" height="5" rx="1" fill="currentColor" />
      <rect x="85" y="85" width="5" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

interface NFCReviewPlateProps {
  lang: "cs" | "en";
}

const copy = {
  cs: { scan: "Naskenujte QR kód", tap: "nebo přiložte telefon (NFC)", cta: "Ohodnotit na Google" },
  en: { scan: "Scan the QR code", tap: "or tap your phone (NFC)", cta: "Rate us on Google" },
} as const;

export default function NFCReviewPlate({ lang }: NFCReviewPlateProps) {
  const t = copy[lang];
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.cta}
      className="group relative flex flex-col items-center gap-3.5 w-56 bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
    >
      {/* Hover background tint */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-rose-50/0 to-rose-50/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        aria-hidden="true"
      />

      {/* NFC badge — appears on hover */}
      <div
        className="absolute top-3 right-3 flex items-center gap-1 bg-rose-100 text-rose-700 rounded-full px-2 py-0.5 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0"
        aria-hidden="true"
      >
        <NFCWaves />
        NFC
      </div>

      {/* Salon name */}
      <div className="relative z-10 text-center pt-1">
        <p
          className="text-xs font-bold text-gray-900 tracking-wide leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Linda Beauty
        </p>
        <p className="text-[9px] text-rose-600 uppercase tracking-[0.18em] mt-0.5">Studio</p>
      </div>

      {/* Stars */}
      <div className="relative z-10 flex gap-0.5" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" aria-hidden="true" />
        ))}
      </div>

      {/* QR code */}
      <div className="relative z-10 rounded-xl overflow-hidden bg-white p-1 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <QRCodePlaceholder />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center">
        <p className="text-[11px] font-semibold text-gray-800 leading-snug">{t.scan}</p>
        <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{t.tap}</p>
      </div>

      {/* Google branding */}
      <div className="relative z-10 flex items-center gap-1.5 bg-gray-50 group-hover:bg-white border border-gray-100 rounded-xl px-3 py-1.5 transition-colors duration-200">
        <GoogleLogo />
        <span className="text-[11px] font-medium text-gray-500">Google</span>
      </div>
    </a>
  );
}
