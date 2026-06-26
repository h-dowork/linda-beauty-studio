"use client";

import { useEffect, useRef, useState } from "react";
import {
  Scissors, Sparkles, Heart, Star,
  Phone, MapPin, Clock, ChevronRight, ChevronDown, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import GalleryTrack from "@/components/GalleryTrack";
import ReviewsSection from "@/components/ReviewsSection";
import { useLanguage } from "@/context/LanguageContext";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}


const serviceIcons = [Scissors, Sparkles, Heart, Star] as const;

const team = [
  { name: "Linda",  role: "Owner & Senior Stylist", specialty: "Hair Color & Cuts",    initials: "L"  },
  { name: "Kim",    role: "Nail Technician",         specialty: "Nail Art & Gel",       initials: "K"  },
  { name: "Hina",   role: "Nail Technician",         specialty: "Nail Art & Gel",       initials: "H"  },
  { name: "David",  role: "Barber",                  specialty: "Men's Cuts & Styling", initials: "D"  },
  { name: "Daniel", role: "Barber",                  specialty: "Men's Cuts & Styling", initials: "Da" },
];

export default function Home() {
  const { t, lang } = useLanguage();

  // ── Scroll reveal ────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Service card modal ───────────────────────────────────────
  const [activeService, setActiveService] = useState<number | null>(null);
  const modalPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeService === null) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveService(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeService]);

  useEffect(() => {
    if (activeService !== null) {
      lockScroll();
      return () => unlockScroll();
    }
  }, [activeService]);

  // Focus trap: keep keyboard focus inside the service modal while it's open
  useEffect(() => {
    if (activeService === null) return;
    const panel = modalPanelRef.current;
    if (!panel) return;
    const sel = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = () => Array.from(panel.querySelectorAll<HTMLElement>(sel));
    focusable()[0]?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = focusable();
      if (els.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === els[0]) { e.preventDefault(); els[els.length - 1].focus(); }
      } else {
        if (document.activeElement === els[els.length - 1]) { e.preventDefault(); els[0].focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [activeService]);

  // ── Floating mobile CTA ───────────────────────────────────────
  const [showFloatCTA, setShowFloatCTA] = useState(false);
  const [mapConsented, setMapConsented] = useState(false);

  useEffect(() => {
    const hero    = document.getElementById("hero");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;

    let heroDone     = false;
    let contactNear  = false;
    const update = () => setShowFloatCTA(heroDone && !contactNear);

    const heroObs = new IntersectionObserver(
      ([e]) => { heroDone = !e.isIntersecting; update(); },
      { threshold: 0.4 }
    );
    const contactObs = new IntersectionObserver(
      ([e]) => { contactNear = e.isIntersecting; update(); },
      { threshold: 0.15 }
    );

    heroObs.observe(hero);
    contactObs.observe(contact);
    return () => { heroObs.disconnect(); contactObs.disconnect(); };
  }, []);

  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* ══════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════ */}
        <section
          id="hero"
          className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#111]"
          aria-label="Hero"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#111] via-[#161616] to-[#1a1208]"
            aria-hidden="true"
          />
          {/* Atmospheric blobs */}
          <div
            className="blob absolute top-1/4 -right-12 sm:right-8 w-56 sm:w-80 h-56 sm:h-80 bg-[#E8933A]/10 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="blob blob-2 absolute bottom-1/4 -left-12 sm:left-8 w-48 sm:w-64 h-48 sm:h-64 bg-[#E8933A]/5 rounded-full blur-3xl"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center pt-20 pb-24">
            <p className="hero-enter hero-enter-1 text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-4">
              {t.hero.welcome}
            </p>

            <h1
              className="hero-enter hero-enter-2 text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Linda's Hair
              <br />
              <span className="text-accent">Salon</span>
            </h1>

            <p className="hero-enter hero-enter-3 text-base sm:text-xl text-gray-400 max-w-xl mx-auto mb-9 leading-relaxed">
              {t.hero.tagline}
            </p>

            {/* CTAs — full-width on mobile, inline on sm+ */}
            <div className="hero-enter hero-enter-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-[#E8933A] text-white font-semibold rounded-2xl hover:bg-[#d4832a] active:scale-95 transition-all duration-150 shadow-lg shadow-[#E8933A]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] cursor-pointer"
              >
                {t.hero.cta}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="flex items-center justify-center gap-2 px-7 py-4 bg-transparent text-gray-300 font-semibold rounded-2xl border border-[#333] hover:border-[#555] hover:text-white active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] cursor-pointer"
              >
                {t.hero.viewServices}
              </a>
            </div>

            {/* Stats */}
            <div className="hero-enter hero-enter-5 mt-12 grid grid-cols-3 gap-4 sm:gap-10 max-w-sm sm:max-w-md mx-auto">
              {t.hero.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{stat.label}</p>

                </div>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="scroll-cue absolute bottom-7 left-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
            aria-hidden="true"
          >
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SERVICES
        ══════════════════════════════════════════════════════════ */}
        <section
          id="services"
          className="py-16 sm:py-24 bg-[#0d0d0d]"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-10 sm:mb-14 px-5 sm:px-6 lg:px-8">
              <p className="reveal text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-3">
                {t.services.sectionLabel}
              </p>
              <h2
                id="services-heading"
                className="reveal reveal-d1 text-3xl sm:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.services.heading}
              </h2>
              <p className="reveal reveal-d2 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                {t.services.subheading}
              </p>
            </div>

            {/* Mobile: horizontal snap scroll  /  sm+: 2-col grid  /  lg: 4-col */}
            <div className="relative">
              {/* Fade hint on right edge — mobile only */}
              <div
                className="absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none sm:hidden"
                aria-hidden="true"
              />
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-5 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-6 sm:pb-0 lg:grid-cols-4 lg:px-8 lg:gap-6">
                {t.services.items.map((service, i) => {
                  const Icon = serviceIcons[i % serviceIcons.length];
                  return (
                    <button
                      key={service.title}
                      type="button"
                      onClick={() => setActiveService(i)}
                      className={`reveal reveal-d${i + 1} snap-start flex-none w-[82vw] sm:w-full group bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 border border-[#2a2a2a] hover:border-[#444] hover:shadow-lg hover:shadow-black/40 active:scale-[0.98] transition-all duration-300 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A]`}
                      aria-label={`Zobrazit detail: ${service.title}`}
                    >
                      <div className="w-11 h-11 bg-[#2a2a2a] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#333] transition-colors duration-200">
                        <Icon className="w-5 h-5 text-[#E8933A]" aria-hidden="true" strokeWidth={1.5} />
                      </div>
                      <h3
                        className="text-lg sm:text-xl font-bold text-white mb-1.5"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2.5" role="list">
                        {service.groups.flatMap((g) => [...g.items] as { name: string; price: string }[]).slice(0, 5).map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center justify-between text-sm border-b border-[#2a2a2a] pb-2 last:border-0 last:pb-0"
                          >
                            <span className="text-gray-300">{item.name}</span>
                            <span className="font-semibold text-gray-500 ml-2 flex-shrink-0">{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="reveal text-center text-xs sm:text-sm text-gray-400 mt-6 px-5 sm:px-6 lg:px-8">
              {t.services.priceNote}
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            TEAM
        ══════════════════════════════════════════════════════════ */}
        <section
          id="team"
          className="py-16 sm:py-24 bg-[#111]"
          aria-labelledby="team-heading"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-14">
              <p className="reveal text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-3">
                {t.team.sectionLabel}
              </p>
              <h2
                id="team-heading"
                className="reveal reveal-d1 text-3xl sm:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.team.heading}
              </h2>
              <p className="reveal reveal-d2 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                {t.team.subheading}
              </p>
            </div>

            {/* 2-col on mobile, 4-col on lg */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {team.map((member, i) => {
                const memberI18n = t.team.members[i];
                if (!memberI18n) return null;
                return (
                  <div
                    key={member.name}
                    className={`reveal reveal-d${i + 1} bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a] hover:border-[#444] hover:shadow-lg hover:shadow-black/40 transition-all duration-300`}
                  >
                    {/* Avatar placeholder */}
                    <div
                      className="h-32 sm:h-48 bg-gradient-to-br from-[#222] to-[#2a2a2a] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span
                        className="text-2xl sm:text-4xl font-bold text-[#444]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {member.initials}
                      </span>
                    </div>
                    <div className="p-3.5 sm:p-5">
                      <h3
                        className="text-sm sm:text-lg font-bold text-white leading-tight"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-accent mt-0.5 mb-0.5">{memberI18n.role}</p>
                      <p className="text-xs text-gray-500 leading-snug">{memberI18n.specialty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            GALLERY  (drag-to-scroll, full-viewport)
        ══════════════════════════════════════════════════════════ */}
        <section
          id="gallery"
          className="relative bg-[#0d0d0d] overflow-hidden"
          style={{ height: "100svh" }}
          aria-labelledby="gallery-heading"
        >
          {/* Overlay heading */}
          <div className="absolute top-0 left-0 right-0 z-10 pt-12 sm:pt-16 pb-6 text-center pointer-events-none">
            <p className="text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-3">
              {t.gallery.sectionLabel}
            </p>
            <h2
              id="gallery-heading"
              className="text-3xl sm:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t.gallery.heading}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xs mx-auto px-4 leading-relaxed">
              {t.gallery.subheading}
            </p>
          </div>

          <GalleryTrack />
        </section>

        <ReviewsSection />

        {/* ══════════════════════════════════════════════════════════
            CONTACT  +  FORM
        ══════════════════════════════════════════════════════════ */}
        <section
          id="contact"
          className="py-16 sm:py-24 bg-[#0d0d0d]"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 items-start">

              {/* ── Info column ─────────────────────────────────── */}
              <div>
                <p className="reveal text-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-3">
                  {t.contact.sectionLabel}
                </p>
                <h2
                  id="contact-heading"
                  className="reveal reveal-d1 text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t.contact.heading}
                </h2>
                <p className="reveal reveal-d2 text-gray-400 mb-8 leading-relaxed text-sm sm:text-base">
                  {t.contact.subheading}
                </p>

                <ul className="space-y-5 reveal reveal-d3" role="list">
                  {/* Phone */}
                  <li className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Phone className="w-4 h-4 text-[#E8933A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-0.5">{t.contact.phone}</p>
                      <div className="flex flex-col gap-0.5">
                        <a
                          href="tel:+420774109009"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] rounded"
                        >
                          +420 774 109 009
                        </a>
                        <a
                          href="tel:+420778020615"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] rounded"
                        >
                          +420 778 020 615
                        </a>
                      </div>
                    </div>
                  </li>
                  {/* Address */}
                  <li className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <MapPin className="w-4 h-4 text-[#E8933A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-0.5">{t.contact.address}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        28. října 857/20
                        <br />
                        Teplice, Česká republika
                      </p>
                    </div>
                  </li>
                  {/* Hours */}
                  <li className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Clock className="w-4 h-4 text-[#E8933A]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1.5">{t.contact.hours}</p>
                      <dl className="text-sm space-y-1">
                        {t.contact.hoursData.map((h) => (
                          <div key={h.day} className="flex gap-4">
                            <dt className="font-medium text-gray-300 min-w-20">{h.day}</dt>
                            <dd className="text-gray-400">{h.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                </ul>

                {/* Facebook follow button */}
                <div className="mt-7">
                  <a
                    href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#1a1a1a] text-gray-300 text-sm font-semibold rounded-full border border-[#333] hover:bg-[#222] hover:border-[#555] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 cursor-pointer shadow-sm"
                  >
                    <FacebookIcon className="w-4 h-4 text-gray-400" />
                    {t.gallery.followUs}
                  </a>
                </div>

              </div>

              {/* ── Form column ─────────────────────────────────── */}
              <div className="reveal reveal-d2 bg-[#1a1a1a] rounded-2xl p-5 sm:p-8 border border-[#2a2a2a] shadow-sm">
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-1.5"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t.contact.formHeading}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{t.contact.formSub}</p>
                <ContactForm />
              </div>
            </div>

            {/* ── Google Maps ──────────────────────────────────── */}
            <div className="reveal mt-12">
              <h3
                className="text-lg font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.contact.findUs}
              </h3>
              <div className="rounded-2xl overflow-hidden border border-[#2a2a2a] h-64 sm:h-80">
                {mapConsented ? (
                  <iframe
                    src="https://www.google.com/maps?q=Linda+Hair+Salon+28.+%C5%99%C3%ADjna+857%2F20+Teplice&hl=cs&z=17&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    title={t.contact.findUs}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setMapConsented(true)}
                    className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#1a1a1a] hover:bg-[#222] transition-colors duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] focus-visible:ring-inset"
                    aria-label={lang === "cs" ? "Načíst mapu Google" : "Load Google Maps"}
                  >
                    <MapPin className="w-8 h-8 text-[#333] group-hover:text-[#444] transition-colors duration-200" aria-hidden="true" />
                    <div className="text-center px-6">
                      <p className="text-sm font-semibold text-gray-300 mb-1">
                        {lang === "cs" ? "Zobrazit polohu na Google Maps" : "View location on Google Maps"}
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                        {lang === "cs"
                          ? "Kliknutím souhlasíte s načtením mapy. Google může ukládat soubory cookie."
                          : "By clicking you consent to loading the map. Google may set cookies."}
                      </p>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0a0a0a] text-gray-400 py-12 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-5 h-5 text-[#E8933A]" aria-hidden="true" strokeWidth={1.5} />
                <span
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Linda's Hair Salon
                </span>
              </div>
              <p className="text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>

            {/* Quick links */}
            <nav aria-label="Footer navigation">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-2" role="list">
                {[
                  { label: t.nav.services, href: "#services" },
                  { label: t.nav.team,     href: "#team"     },
                  { label: t.nav.gallery,  href: "#gallery"  },
                  { label: t.nav.reviews,  href: "#reviews"  },
                  { label: t.nav.contact,  href: "#contact"  },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social + phone */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                {t.footer.followUs}
              </h4>
              <div className="flex gap-3 mb-4">
                <a
                  href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center hover:bg-[#222] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] cursor-pointer"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="https://www.instagram.com/linda_beauty_studio.28?igsh=bzBseHFha2pwNmNn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1a1a1a] rounded-xl flex items-center justify-center hover:bg-[#222] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] cursor-pointer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-gray-400" />
                </a>
              </div>
              <a
                href="tel:+420774109009"
                className="text-sm hover:text-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
              >
                +420 774 109 009
              </a>
            </div>
          </div>

          <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Linda's Hair Salon. All rights reserved.
            </p>
            <a
              href="/ochrana-soukromi"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
            >
              {lang === "cs" ? "Zásady ochrany soukromí" : "Privacy Policy"}
            </a>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════
          SERVICE DETAIL PANEL
          Slide-up sheet on mobile, centered overlay on desktop
      ══════════════════════════════════════════════════════════ */}
      {activeService !== null && (() => {
        const service = t.services.items[activeService];
        const Icon = serviceIcons[activeService % serviceIcons.length];
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            onClick={() => setActiveService(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" aria-hidden="true" />

            {/* Panel — bottom sheet on mobile, card on sm+ */}
            <div
              ref={modalPanelRef}
              className="relative w-full sm:max-w-lg bg-[#1a1a1a] rounded-t-3xl sm:rounded-2xl max-h-[88dvh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile drag handle */}
              <div className="sm:hidden pt-3 pb-1 flex justify-center" aria-hidden="true">
                <div className="w-10 h-1 bg-[#333] rounded-full" />
              </div>

              <div className="px-6 pb-8 pt-4 sm:p-8">
                {/* Close */}
                <button
                  onClick={() => setActiveService(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#333] active:scale-95 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] cursor-pointer"
                  aria-label={lang === "cs" ? "Zavřít" : "Close"}
                >
                  <X className="w-4 h-4 text-gray-300" aria-hidden="true" />
                </button>

                {/* Icon */}
                <div className="w-14 h-14 bg-[#2a2a2a] rounded-2xl flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[#E8933A]" aria-hidden="true" strokeWidth={1.5} />
                </div>

                {/* Title + description */}
                <h3
                  className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed mb-6">{service.description}</p>

                {/* Service items */}
                <div className="space-y-5">
                  {service.groups.map((group, gi) => (
                    <div key={gi}>
                      {group.label && (
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8933A]/60 mb-2.5">
                          {group.label}
                        </p>
                      )}
                      <ul className="space-y-3" role="list">
                        {group.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center justify-between text-base border-b border-[#2a2a2a] pb-3 last:border-0 last:pb-0"
                          >
                            <span className="text-gray-300">{item.name}</span>
                            <span className="font-semibold text-gray-500 ml-4 flex-shrink-0">
                              {item.price === "—" ? t.services.pricePlaceholder : item.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Book CTA */}
                <a
                  href="#contact"
                  onClick={() => setActiveService(null)}
                  className="mt-7 flex items-center justify-center w-full py-4 bg-[#E8933A] text-white font-semibold rounded-xl hover:bg-[#d4832a] active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] cursor-pointer"
                >
                  {t.hero.cta}
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ══════════════════════════════════════════════════════════
          FLOATING MOBILE CTA
          Appears after hero, hides when contact section is visible
      ══════════════════════════════════════════════════════════ */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-30 px-4 pb-5 pt-3 bg-gradient-to-t from-[#111] via-[#111]/95 to-transparent pointer-events-none transition-all duration-300 ${
          showFloatCTA ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <a
          href="#contact"
          aria-hidden={!showFloatCTA}
          tabIndex={showFloatCTA ? 0 : -1}
          className={`pointer-events-auto flex items-center justify-center w-full py-4 bg-[#E8933A] text-white font-semibold rounded-2xl shadow-xl shadow-[#E8933A]/20 hover:bg-[#d4832a] active:scale-95 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] ${
            showFloatCTA ? "" : "pointer-events-none"
          }`}
        >
          {t.nav.book}
        </a>
      </div>
    </>
  );
}
