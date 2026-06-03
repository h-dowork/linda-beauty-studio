"use client";

import {
  Scissors,
  Sparkles,
  Heart,
  Star,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const serviceIcons = [Scissors, Sparkles, Heart, Star] as const;

const team = [
  { name: "Linda Nguyen", role: "Founder & Senior Stylist", specialty: "Hair Color & Cuts", phone: "+84 xxx xxx xxx", initials: "LN" },
  { name: "Specialist 2", role: "Nail Technician", specialty: "Nail Art & Gel", phone: "+84 xxx xxx xxx", initials: "S2" },
  { name: "Specialist 3", role: "Makeup Artist", specialty: "Lashes & Brows", phone: "+84 xxx xxx xxx", initials: "S3" },
  { name: "Specialist 4", role: "Skin Care Therapist", specialty: "Facials & Treatments", phone: "+84 xxx xxx xxx", initials: "S4" },
];

const galleryGradients = [
  "from-gray-100 to-gray-200",
  "from-rose-50 to-gray-200",
  "from-gray-200 to-gray-100",
  "from-gray-100 to-rose-50",
  "from-gray-50 to-gray-200",
  "from-rose-50 to-gray-100",
] as const;

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-white"
          aria-label="Hero"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-rose-50/30" aria-hidden="true" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose-100/30 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-gray-100/60 rounded-full blur-3xl" aria-hidden="true" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <p className="text-rose-700 text-sm font-semibold uppercase tracking-widest mb-4">
              {t.hero.welcome}
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Linda Beauty
              <br />
              <span className="text-rose-700">Studio</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t.hero.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 active:bg-gray-800 transition-colors duration-200 shadow-lg shadow-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                {t.hero.cta}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-colors duration-200 border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                {t.hero.viewServices}
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-10 max-w-md mx-auto">
              {t.hero.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────────────────── */}
        <section id="services" className="py-20 sm:py-28 bg-gray-50" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-rose-700 text-sm font-semibold uppercase tracking-widest mb-3">
                {t.services.sectionLabel}
              </p>
              <h2
                id="services-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.services.heading}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">{t.services.subheading}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.services.items.map((service, i) => {
                const Icon = serviceIcons[i];
                return (
                  <div
                    key={service.title}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors duration-200">
                      <Icon className="w-6 h-6 text-gray-700" aria-hidden="true" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3" role="list">
                      {service.items.map((item) => (
                        <li key={item.name} className="flex items-center justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <span className="text-gray-700">{item.name}</span>
                          <span className="font-semibold text-gray-400">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-gray-400 mt-8">{t.services.priceNote}</p>
          </div>
        </section>

        {/* ── Team ──────────────────────────────────────────────────────────── */}
        <section id="team" className="py-20 sm:py-28 bg-white" aria-labelledby="team-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-rose-700 text-sm font-semibold uppercase tracking-widest mb-3">
                {t.team.sectionLabel}
              </p>
              <h2
                id="team-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.team.heading}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">{t.team.subheading}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300"
                >
                  <div
                    className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-4xl font-bold text-gray-400" style={{ fontFamily: "var(--font-playfair)" }}>
                      {member.initials}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-playfair)" }}>
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-rose-700 mb-1">{member.role}</p>
                    <p className="text-xs text-gray-400 mb-4">{member.specialty}</p>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                      {member.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ───────────────────────────────────────────────────────── */}
        <section id="gallery" className="py-20 sm:py-28 bg-gray-50" aria-labelledby="gallery-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-rose-700 text-sm font-semibold uppercase tracking-widest mb-3">
                {t.gallery.sectionLabel}
              </p>
              <h2
                id="gallery-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.gallery.heading}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">{t.gallery.subheading}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list" aria-label={t.gallery.heading}>
              {galleryGradients.map((gradient, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${gradient} overflow-hidden group cursor-pointer border border-gray-100`}
                  role="listitem"
                >
                  <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/10 transition-colors duration-300" />
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
              >
                <FacebookIcon className="w-4 h-4" />
                {t.gallery.followUs}
              </a>
            </div>
          </div>
        </section>

        {/* ── Reviews ───────────────────────────────────────────────────────── */}
        <section id="reviews" className="py-20 sm:py-28 bg-white" aria-labelledby="reviews-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-rose-700 text-sm font-semibold uppercase tracking-widest mb-3">
                {t.reviews.sectionLabel}
              </p>
              <h2
                id="reviews-heading"
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {t.reviews.heading}
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {t.reviews.items.map((review) => (
                <figure key={review.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex gap-1 mb-4" aria-label="5 hvězd z 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-gray-600 text-sm leading-relaxed mb-5">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.service}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 sm:py-28 bg-gray-50" aria-labelledby="contact-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-rose-700 text-sm font-semibold uppercase tracking-widest mb-3">
                  {t.contact.sectionLabel}
                </p>
                <h2
                  id="contact-heading"
                  className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t.contact.heading}
                </h2>
                <p className="text-gray-600 mb-10 leading-relaxed">{t.contact.subheading}</p>

                <ul className="space-y-6" role="list">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Phone className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{t.contact.phone}</p>
                      <a
                        href="tel:+84xxxxxxxxx"
                        className="text-gray-600 hover:text-gray-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
                      >
                        +84 xxx xxx xxx
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <MapPin className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{t.contact.address}</p>
                      <p className="text-gray-600">
                        [Adresa studia]
                        <br />
                        Ho Chi Minh City, Vietnam
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Clock className="w-5 h-5 text-gray-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{t.contact.hours}</p>
                      <dl className="text-gray-600 text-sm space-y-1">
                        {t.contact.hoursData.map((h) => (
                          <div key={h.day} className="flex gap-4">
                            <dt className="font-medium text-gray-800 min-w-24">{h.day}</dt>
                            <dd>{h.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </li>
                </ul>

                <div className="mt-10">
                  <a
                    href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 cursor-pointer"
                    aria-label={t.contact.messageBtn}
                  >
                    <FacebookIcon className="w-4 h-4" />
                    {t.contact.messageBtn}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {t.contact.formHeading}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{t.contact.formSub}</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Scissors className="w-5 h-5 text-gray-300" aria-hidden="true" strokeWidth={1.5} />
                <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  Linda Beauty Studio
                </span>
              </div>
              <p className="text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>

            <nav aria-label="Footer navigation">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                {t.footer.quickLinks}
              </h4>
              <ul className="space-y-2" role="list">
                {[
                  { label: t.nav.services, href: "#services" },
                  { label: t.nav.team, href: "#team" },
                  { label: t.nav.gallery, href: "#gallery" },
                  { label: t.nav.reviews, href: "#reviews" },
                  { label: t.nav.contact, href: "#contact" },
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

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                {t.footer.followUs}
              </h4>
              <div className="flex gap-3 mb-4">
                <a
                  href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 cursor-pointer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-gray-400" />
                </a>
              </div>
              <a
                href="tel:+84xxxxxxxxx"
                className="text-sm hover:text-gray-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded"
              >
                +84 xxx xxx xxx
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Linda Beauty Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
