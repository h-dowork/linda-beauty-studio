"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scissors } from "lucide-react";
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

  const links = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.team, href: "#team" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.reviews, href: "#reviews" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const otherLang: Lang = lang === "cs" ? "en" : "cs";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
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
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Linda Beauty Studio — zpět nahoru"
        >
          <Scissors
            className="w-5 h-5 text-rose-700"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <span
            className="text-xl font-bold text-gray-900"
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

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={() => setLang(otherLang)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-400 px-2.5 py-1.5 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 uppercase tracking-wide"
            aria-label={`Přepnout jazyk na ${otherLang === "en" ? "angličtinu" : "češtinu"}`}
          >
            {otherLang.toUpperCase()}
          </button>
          {/* Book CTA */}
          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 active:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer"
          >
            {t.nav.book}
          </a>
        </div>

        {/* Mobile: lang toggle + menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLang(otherLang)}
            className="text-xs font-semibold text-gray-500 border border-gray-200 px-2 py-1 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 uppercase tracking-wide"
            aria-label={`Switch language to ${otherLang}`}
          >
            {otherLang.toUpperCase()}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 cursor-pointer"
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                {t.nav.book}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
