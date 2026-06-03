"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scissors, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/i18n";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.team,     href: "#team"     },
    { label: t.nav.gallery,  href: "#gallery"  },
    { label: t.nav.reviews,  href: "#reviews"  },
    { label: t.nav.contact,  href: "#contact"  },
  ];

  const otherLang: Lang = lang === "cs" ? "en" : "cs";

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
          aria-label="Hlavní navigace"
        >
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-lg"
            aria-label="Linda Beauty Studio — zpět nahoru"
          >
            <Scissors className="w-5 h-5 text-rose-700" aria-hidden="true" strokeWidth={1.5} />
            <span
              className="text-lg font-bold text-gray-900"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Linda Beauty
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(otherLang)}
              className="text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-2.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 uppercase tracking-wide"
              aria-label={`Přepnout jazyk na ${otherLang === "en" ? "angličtinu" : "češtinu"}`}
            >
              {otherLang.toUpperCase()}
            </button>
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 active:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer"
            >
              {t.nav.book}
            </a>
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setLang(otherLang)}
              className="text-xs font-semibold text-gray-500 border border-gray-200 px-2.5 py-1.5 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 uppercase tracking-wide"
              aria-label={`Switch language to ${otherLang}`}
            >
              {otherLang.toUpperCase()}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              aria-label={open ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open
                ? <X    className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Full-screen mobile menu ─────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigační menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* White background */}
        <div className="absolute inset-0 bg-white" />

        <div className="relative flex flex-col h-full pt-20 px-6 pb-10">
          {/* Nav links */}
          <nav className="flex-1" aria-label="Mobilní navigace">
            <ul className="flex flex-col" role="list">
              {links.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className={`flex items-center justify-between py-5 border-b border-gray-100 group transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded ${
                      open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
                    }`}
                    style={{ transitionDelay: open ? `${i * 55 + 60}ms` : "0ms" }}
                  >
                    <span
                      className="text-2xl font-bold text-gray-900 group-hover:text-rose-700 transition-colors duration-200"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {link.label}
                    </span>
                    <ChevronRight
                      className="w-5 h-5 text-gray-300 group-hover:text-rose-400 transition-colors duration-200 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Book CTA at bottom of menu */}
          <div
            className={`transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: open ? "360ms" : "0ms" }}
          >
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="flex items-center justify-center w-full py-4 bg-gray-900 text-white text-lg font-semibold rounded-2xl hover:bg-gray-700 active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            >
              {t.nav.book}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
