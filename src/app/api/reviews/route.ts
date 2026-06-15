import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const PLACES_URL = "https://places.googleapis.com/v1/places";

const MAPS_URI_RE = /^https:\/\/(maps|www)\.google\.(com|[a-z]{2,3})\//;

interface PlaceBody {
  reviews?: unknown[];
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
}

let cache: { body: PlaceBody; at: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function GET() {
  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json(
      { error: "Google Places API is not configured." },
      { status: 503 },
    );
  }

  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(cache.body);
  }

  let res: Response;
  try {
    res = await fetch(`${PLACES_URL}/${PLACE_ID}`, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "reviews,rating,userRatingCount,googleMapsUri",
      },
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    return NextResponse.json({ error: "Network error reaching Places API." }, { status: 502 });
  }

  if (!res.ok) {
    const text = await res.text();
    if (process.env.NODE_ENV !== "production") {
      console.error("[reviews] Google Places API error:", res.status, text);
    }
    return NextResponse.json({ error: "Upstream API error." }, { status: 502 });
  }

  const raw = await res.json() as PlaceBody;

  // Validate googleMapsUri before caching to prevent open-redirect via poisoned cache
  if (raw.googleMapsUri && !MAPS_URI_RE.test(raw.googleMapsUri)) {
    raw.googleMapsUri = undefined;
  }

  cache = { body: raw, at: Date.now() };
  return NextResponse.json(raw);
}
