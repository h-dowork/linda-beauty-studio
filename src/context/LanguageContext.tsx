"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Lang, translations } from "@/lib/i18n";

const LANG_KEY = "linda_lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof translations)[Lang];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("cs");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY) as Lang | null;
      if (saved === "cs" || saved === "en") {
        setLang(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);

  function handleSetLang(l: Lang) {
    setLang(l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
    try { localStorage.setItem(LANG_KEY, l); } catch {}
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
