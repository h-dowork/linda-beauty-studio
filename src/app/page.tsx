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

// ─── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Scissors,
    title: "Hair",
    description:
      "Expert cuts, vibrant color, and transformative styling for every hair type.",
    items: [
      { name: "Haircut & Blowdry", price: "—" },
      { name: "Color / Highlights", price: "—" },
      { name: "Keratin Treatment", price: "—" },
      { name: "Hair Treatment", price: "—" },
    ],
  },
  {
    icon: Sparkles,
    title: "Nails",
    description:
      "Luxurious manicures and pedicures with premium polishes and nail art.",
    items: [
      { name: "Classic Manicure", price: "—" },
      { name: "Gel / Shellac", price: "—" },
      { name: "Pedicure", price: "—" },
      { name: "Nail Art & Extensions", price: "—" },
    ],
  },
  {
    icon: Heart,
    title: "Makeup & Lashes",
    description:
      "Professional makeup application, lash extensions, and brow shaping.",
    items: [
      { name: "Full Makeup", price: "—" },
      { name: "Lash Extensions", price: "—" },
      { name: "Brow Shaping & Tint", price: "—" },
      { name: "Lash Lift", price: "—" },
    ],
  },
  {
    icon: Star,
    title: "Skin Care",
    description:
      "Rejuvenating facials and treatments for radiant, healthy-looking skin.",
    items: [
      { name: "Classic Facial", price: "—" },
      { name: "Deep Cleansing Facial", price: "—" },
      { name: "Hydrating Treatment", price: "—" },
      { name: "Anti-Aging Treatment", price: "—" },
    ],
  },
];

const team = [
  {
    name: "Linda Nguyen",
    role: "Founder & Senior Stylist",
    specialty: "Hair Color & Cuts",
    phone: "+84 xxx xxx xxx",
    gradient: "from-pink-300 to-pink-400",
    initials: "LN",
  },
  {
    name: "Specialist 2",
    role: "Nail Technician",
    specialty: "Nail Art & Gel",
    phone: "+84 xxx xxx xxx",
    gradient: "from-purple-300 to-pink-300",
    initials: "S2",
  },
  {
    name: "Specialist 3",
    role: "Makeup Artist",
    specialty: "Lashes & Brows",
    phone: "+84 xxx xxx xxx",
    gradient: "from-pink-200 to-purple-300",
    initials: "S3",
  },
  {
    name: "Specialist 4",
    role: "Skin Care Therapist",
    specialty: "Facials & Treatments",
    phone: "+84 xxx xxx xxx",
    gradient: "from-rose-300 to-pink-300",
    initials: "S4",
  },
];

const testimonials = [
  {
    name: "Minh Anh",
    rating: 5,
    text: "Absolutely love this salon! Linda and her team are so talented. My hair has never looked better — the color came out exactly as I envisioned.",
    service: "Hair Color",
    initials: "MA",
  },
  {
    name: "Thu Hương",
    rating: 5,
    text: "Best nail salon I've been to. The gel manicure lasted over three weeks without chipping. The space is so clean and the staff are so welcoming.",
    service: "Gel Manicure",
    initials: "TH",
  },
  {
    name: "Bảo Châu",
    rating: 5,
    text: "I came in for lash extensions and left feeling completely transformed. Very professional, gentle, and the result is stunning. Will definitely come back!",
    service: "Lash Extensions",
    initials: "BC",
  },
];

const galleryItems = [
  { label: "Hair Color", gradient: "from-pink-200 to-rose-300" },
  { label: "Nail Art", gradient: "from-purple-200 to-pink-300" },
  { label: "Makeup", gradient: "from-pink-300 to-purple-300" },
  { label: "Lashes", gradient: "from-rose-200 to-pink-200" },
  { label: "Facial", gradient: "from-purple-100 to-pink-200" },
  { label: "Styling", gradient: "from-pink-200 to-rose-200" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-dvh flex items-center justify-center overflow-hidden"
          aria-label="Hero"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100"
            aria-hidden="true"
          />
          <div
            className="absolute top-20 right-10 w-72 h-72 bg-pink-200/50 rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 left-10 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
            <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Welcome to
            </p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-pink-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Linda Beauty
              <br />
              <span className="text-pink-500">Studio</span>
            </h1>
            <p className="text-lg sm:text-xl text-pink-700 max-w-2xl mx-auto mb-10 leading-relaxed">
              Where beauty meets artistry. Expert hair, nails, makeup, and skin
              care in a warm, welcoming space — tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 active:bg-pink-700 transition-colors duration-200 shadow-lg shadow-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                Book an Appointment
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 text-pink-700 font-semibold rounded-full hover:bg-white transition-colors duration-200 border border-pink-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                View Services
              </a>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-10 max-w-md mx-auto">
              {[
                { value: "5+", label: "Years Experience" },
                { value: "500+", label: "Happy Clients" },
                { value: "4", label: "Expert Stylists" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-3xl font-bold text-pink-500"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-pink-700 mt-1 leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services & Pricing ────────────────────────────────────────── */}
        <section
          id="services"
          className="py-20 sm:py-28 bg-white"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-3">
                What We Offer
              </p>
              <h2
                id="services-heading"
                className="text-4xl sm:text-5xl font-bold text-pink-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Services
              </h2>
              <p className="text-pink-600 max-w-xl mx-auto">
                From a fresh haircut to a full glam transformation — we offer
                everything you need to look and feel your best.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="group bg-pink-50 rounded-2xl p-6 border border-pink-100 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors duration-200">
                      <Icon
                        className="w-6 h-6 text-pink-500"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3
                      className="text-xl font-bold text-pink-900 mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-pink-600 mb-5 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3" role="list">
                      {service.items.map((item) => (
                        <li
                          key={item.name}
                          className="flex items-center justify-between text-sm border-b border-pink-100 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="text-pink-800">{item.name}</span>
                          <span className="font-semibold text-pink-500">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="text-center text-sm text-pink-400 mt-8">
              Prices marked — will be updated. Contact us for a quote.
            </p>
          </div>
        </section>

        {/* ── Team / Specialists ────────────────────────────────────────── */}
        <section
          id="team"
          className="py-20 sm:py-28 bg-gradient-to-b from-pink-50 to-white"
          aria-labelledby="team-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Meet the Team
              </p>
              <h2
                id="team-heading"
                className="text-4xl sm:text-5xl font-bold text-pink-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Specialists
              </h2>
              <p className="text-pink-600 max-w-xl mx-auto">
                A passionate team of skilled beauty professionals dedicated to
                bringing out your unique best.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-2xl overflow-hidden border border-pink-100 hover:border-pink-200 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300"
                >
                  <div
                    className={`h-48 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <span
                      className="text-4xl font-bold text-white/80"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {member.initials}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3
                      className="text-lg font-bold text-pink-900"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-pink-500 mb-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-pink-400 mb-4">
                      Specialty: {member.specialty}
                    </p>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 text-sm text-pink-700 hover:text-pink-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded cursor-pointer"
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

        {/* ── Gallery ───────────────────────────────────────────────────── */}
        <section
          id="gallery"
          className="py-20 sm:py-28 bg-white"
          aria-labelledby="gallery-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Our Work
              </p>
              <h2
                id="gallery-heading"
                className="text-4xl sm:text-5xl font-bold text-pink-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Gallery
              </h2>
              <p className="text-pink-600 max-w-xl mx-auto">
                A glimpse of the transformations we create every day.
              </p>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              role="list"
              aria-label="Gallery of salon work"
            >
              {galleryItems.map((item, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${item.gradient} overflow-hidden group cursor-pointer`}
                  role="listitem"
                >
                  <div className="absolute inset-0 bg-pink-900/0 group-hover:bg-pink-900/20 transition-colors duration-300 flex items-end p-4">
                    <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  </div>
                  <div
                    className="w-full h-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-white/30 text-xs">Add photo</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-50 text-pink-700 font-semibold rounded-full border border-pink-200 hover:bg-pink-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
              >
                <FacebookIcon className="w-4 h-4" />
                Follow on Facebook
              </a>
            </div>
          </div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────── */}
        <section
          id="reviews"
          className="py-20 sm:py-28 bg-gradient-to-b from-pink-50 to-pink-100"
          aria-labelledby="reviews-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-3">
                Client Love
              </p>
              <h2
                id="reviews-heading"
                className="text-4xl sm:text-5xl font-bold text-pink-900 mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                What They Say
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <figure
                  key={t.name}
                  className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm"
                >
                  <div
                    className="flex gap-1 mb-4"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="text-pink-700 text-sm leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-pink-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-pink-400">{t.service}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact / Booking ─────────────────────────────────────────── */}
        <section
          id="contact"
          className="py-20 sm:py-28 bg-white"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-pink-500 text-sm font-semibold uppercase tracking-widest mb-3">
                  Visit Us
                </p>
                <h2
                  id="contact-heading"
                  className="text-4xl sm:text-5xl font-bold text-pink-900 mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Book Your
                  <br />
                  Appointment
                </h2>
                <p className="text-pink-600 mb-10 leading-relaxed">
                  Ready for a transformation? Call us or send a message on
                  Facebook to book your visit. Walk-ins welcome subject to
                  availability.
                </p>

                <ul className="space-y-6" role="list">
                  <li className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Phone className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-pink-900 mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:+84xxxxxxxxx"
                        className="text-pink-600 hover:text-pink-500 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
                      >
                        +84 xxx xxx xxx
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <MapPin className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-pink-900 mb-1">
                        Address
                      </p>
                      <p className="text-pink-600">
                        [Your address here]
                        <br />
                        Ho Chi Minh City, Vietnam
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Clock className="w-5 h-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-pink-900 mb-1">
                        Hours
                      </p>
                      <dl className="text-pink-600 text-sm space-y-1">
                        <div className="flex gap-4">
                          <dt className="font-medium text-pink-800 min-w-24">
                            Mon – Fri
                          </dt>
                          <dd>9:00 AM – 7:00 PM</dd>
                        </div>
                        <div className="flex gap-4">
                          <dt className="font-medium text-pink-800 min-w-24">
                            Saturday
                          </dt>
                          <dd>9:00 AM – 7:00 PM</dd>
                        </div>
                        <div className="flex gap-4">
                          <dt className="font-medium text-pink-800 min-w-24">
                            Sunday
                          </dt>
                          <dd>10:00 AM – 5:00 PM</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                </ul>

                <div className="mt-10">
                  <a
                    href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 cursor-pointer shadow-lg shadow-pink-200"
                    aria-label="Message us on Facebook"
                  >
                    <FacebookIcon className="w-4 h-4" />
                    Message on Facebook
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100">
                <div
                  className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6"
                  aria-hidden="true"
                >
                  <MapPin className="w-6 h-6 text-pink-500" />
                </div>
                <h3
                  className="text-2xl font-bold text-pink-900 mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Find Us
                </h3>
                <p className="text-pink-600 text-sm leading-relaxed mb-6">
                  We are conveniently located in Ho Chi Minh City. Replace the
                  card below with a Google Maps embed.
                </p>
                <div
                  className="h-56 rounded-xl bg-pink-100/50 border-2 border-dashed border-pink-200 flex items-center justify-center"
                  aria-label="Map embed placeholder"
                >
                  <p className="text-pink-300 text-sm text-center px-4">
                    Paste your Google Maps{" "}
                    <code className="text-xs bg-pink-100 px-1 py-0.5 rounded">
                      &lt;iframe&gt;
                    </code>{" "}
                    here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-pink-900 text-pink-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Scissors
                  className="w-5 h-5 text-pink-400"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <span
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Linda Beauty Studio
                </span>
              </div>
              <p className="text-sm leading-relaxed text-pink-300">
                Where beauty meets artistry. Professional hair, nails, makeup,
                and skin care in Ho Chi Minh City.
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2" role="list">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Team", href: "#team" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Reviews", href: "#reviews" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-pink-300 hover:text-pink-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Follow Us
              </h4>
              <div className="flex gap-3 mb-4">
                <a
                  href="https://www.facebook.com/p/Linda-Beauty-Studio-61560198843135/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-pink-800 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 text-pink-300" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-pink-800 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 cursor-pointer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-300" />
                </a>
              </div>
              <a
                href="tel:+84xxxxxxxxx"
                className="text-sm text-pink-300 hover:text-pink-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded"
              >
                +84 xxx xxx xxx
              </a>
            </div>
          </div>

          <div className="border-t border-pink-800 pt-6 text-center">
            <p className="text-xs text-pink-400">
              © {new Date().getFullYear()} Linda Beauty Studio. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
