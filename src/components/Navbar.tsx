"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scissors } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pink-50/95 backdrop-blur-md shadow-sm border-b border-pink-100"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Linda Beauty Studio — back to top"
        >
          <Scissors
            className="w-5 h-5 text-pink-500"
            aria-hidden="true"
            strokeWidth={1.5}
          />
          <span
            className="text-xl font-bold text-pink-900"
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
                className="text-sm font-medium text-pink-800 hover:text-pink-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Book CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2.5 bg-pink-500 text-white text-sm font-semibold rounded-full hover:bg-pink-600 active:bg-pink-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 cursor-pointer"
        >
          Book Now
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-pink-800 hover:bg-pink-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-pink-50/98 backdrop-blur-md border-t border-pink-100 px-4 pb-4"
        >
          <ul className="flex flex-col gap-1 pt-2" role="list">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-2 text-base font-medium text-pink-800 hover:text-pink-500 hover:bg-pink-100 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                Book Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
