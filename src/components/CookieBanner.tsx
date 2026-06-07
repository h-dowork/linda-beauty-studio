"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const STORAGE_KEY = "linda_cookie_accepted";

export default function CookieBanner() {
  const { t } = useLanguage();
  const c = t.cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Private browsing may block localStorage
    }
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={c.notice}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe-bottom"
    >
      <div className="max-w-3xl mx-auto mb-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl shadow-xl shadow-black/60 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
        <p className="text-xs text-gray-400 leading-relaxed flex-1">
          {c.notice}{" "}
          <a
            href="/ochrana-soukromi"
            className="underline underline-offset-2 hover:text-white transition-colors"
          >
            {c.learnMore}
          </a>
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-5 py-2.5 bg-[#E8933A] text-white text-xs font-semibold rounded-xl hover:bg-[#d4832a] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] cursor-pointer whitespace-nowrap"
        >
          {c.accept}
        </button>
      </div>
    </div>
  );
}
