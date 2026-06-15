"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// ── Types (Places API New response shape) ─────────────────────────────────────

interface GoogleReview {
  rating: number;
  text: { text: string };
  originalText?: { text: string };
  authorAttribution: {
    displayName: string;
    photoUri?: string;
    uri?: string;
  };
  publishTime?: string;
  relativePublishTimeDescription?: string;
}

interface PlaceData {
  reviews: GoogleReview[];
  rating: number;
  userRatingCount: number;
  googleMapsUri?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(isoDate: string, lang: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime();
    const days = Math.floor(diffMs / 86_400_000);
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    if (days < 7)  return rtf.format(-days,                 "day");
    if (days < 30) return rtf.format(-Math.floor(days / 7), "week");
    if (days < 365) return rtf.format(-Math.floor(days / 30), "month");
    return rtf.format(-Math.floor(days / 365), "year");
  } catch {
    return "";
  }
}

function StarsRow({ rating, size = "sm", lang = "cs" }: { rating: number; size?: "sm" | "md"; lang?: string }) {
  const cls = size === "md" ? "w-5 h-5" : "w-4 h-4";
  const label = lang === "cs" ? `${rating} hvězd z 5` : `${rating} out of 5 stars`;
  return (
    <div className="flex gap-0.5" aria-label={label}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${cls} ${n <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-[#333] fill-[#333]"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 border border-[#2a2a2a] animate-pulse">
      <div className="flex gap-1 mb-3">
        {[1,2,3,4,5].map((n) => (
          <div key={n} className="w-4 h-4 bg-[#2a2a2a] rounded-full" />
        ))}
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-[#2a2a2a] rounded w-full" />
        <div className="h-3 bg-[#2a2a2a] rounded w-5/6" />
        <div className="h-3 bg-[#2a2a2a] rounded w-4/6" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex-shrink-0" />
        <div className="space-y-1.5">
          <div className="h-3 bg-[#2a2a2a] rounded w-24" />
          <div className="h-2.5 bg-[#2a2a2a] rounded w-16" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const { t, lang } = useLanguage();

  const [status, setStatus] = useState<"loading" | "live" | "fallback">("loading");
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((raw: unknown) => {
        if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
          setStatus("fallback");
          return;
        }
        const d = raw as Record<string, unknown>;
        if (!Array.isArray(d.reviews)) { setStatus("fallback"); return; }

        const validated: PlaceData = {
          reviews: d.reviews as GoogleReview[],
          rating: typeof d.rating === "number" ? d.rating : 0,
          userRatingCount: typeof d.userRatingCount === "number" ? d.userRatingCount : 0,
          googleMapsUri: typeof d.googleMapsUri === "string" ? d.googleMapsUri : undefined,
        };

        const withText = validated.reviews.filter((r) => (r.originalText ?? r.text)?.text);
        if (withText.length > 0) {
          setPlaceData({ ...validated, reviews: withText });
          setStatus("live");
        } else {
          setStatus("fallback");
        }
      })
      .catch(() => setStatus("fallback"));
  }, []);

  // The global scroll-reveal observer in page.tsx runs before this async data
  // lands, so the dynamically-rendered cards never get observed. Re-observe
  // the section's .reveal elements after status settles.
  useEffect(() => {
    if (status === "loading") return;
    const section = document.getElementById("reviews");
    if (!section) return;
    const els = section.querySelectorAll<Element>(".reveal:not(.is-visible)");
    if (els.length === 0) return;
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
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [status]);

  const live = placeData?.reviews?.slice(0, 3) ?? [];

  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 bg-[#111]"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="reveal text-[#E8933A] text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-3">
            {t.reviews.sectionLabel}
          </p>
          <h2
            id="reviews-heading"
            className="reveal reveal-d1 text-3xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t.reviews.heading}
          </h2>

          {/* Live aggregate rating */}
          {status === "live" && placeData?.rating != null && (
            <div className="reveal reveal-d2 mt-4 flex items-center justify-center gap-2.5">
              <span
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {placeData.rating.toFixed(1)}
              </span>
              <StarsRow rating={placeData.rating} size="md" lang={lang} />
              <span className="text-sm text-gray-400">
                ({placeData.userRatingCount}{" "}
                {lang === "cs" ? "hodnocení" : "reviews"})
              </span>
            </div>
          )}
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          {status === "loading" && (
            <>{[0,1,2].map((n) => <SkeletonCard key={n} />)}</>
          )}

          {status === "live" && live.map((review, i) => {
            const reviewText = (review.originalText ?? review.text)?.text ?? "";
            const initials = review.authorAttribution.displayName
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            const when = review.publishTime
              ? timeAgo(review.publishTime, lang)
              : (review.relativePublishTimeDescription ?? "");

            return (
              <figure
                key={`${review.authorAttribution.displayName}-${review.publishTime ?? i}`}
                className={`reveal reveal-d${i + 1} bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 border border-[#2a2a2a]`}
              >
                <div className="mb-3">
                  <StarsRow rating={review.rating} lang={lang} />
                </div>
                <blockquote className="text-gray-400 text-sm leading-relaxed mb-4">
                  &ldquo;{reviewText}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {review.authorAttribution.photoUri ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.authorAttribution.photoUri}
                      alt=""
                      aria-hidden="true"
                      className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#333] flex items-center justify-center text-gray-400 text-xs font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {review.authorAttribution.displayName}
                    </p>
                    {when && (
                      <p className="text-xs text-gray-400">{when}</p>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}

          {status === "fallback" && (
            <>
              <div className="sm:col-span-3 flex items-center justify-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                  {lang === "cs" ? "Ukázkové recenze — budou nahrazeny skutečnými hodnoceními zákazníků" : "Sample reviews — will be replaced with real customer ratings"}
                </span>
              </div>
            </>
          )}
          {status === "fallback" && t.reviews.items.map((review, i) => (
            <figure
              key={review.name}
              className={`reveal reveal-d${i + 1} bg-[#1a1a1a] rounded-2xl p-5 sm:p-6 border border-[#2a2a2a]`}
            >
              <div className="mb-3">
                <StarsRow rating={5} lang={lang} />
              </div>
              <blockquote className="text-gray-400 text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#333] flex items-center justify-center text-gray-400 text-xs font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  {review.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.service}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Google attribution (required by Google's Terms of Service) */}
        {status === "live" && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <a
              href={placeData?.googleMapsUri ?? "https://maps.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8933A] rounded"
            >
              <GoogleLogo />
              {lang === "cs"
                ? "Zobrazit všechny recenze na Google"
                : "View all reviews on Google"}
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
