import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const PLACES_URL = "https://places.googleapis.com/v1/places";

// Simple in-memory cache — good enough for a single-instance deployment.
// Replace with Upstash KV if you move to a multi-instance host.
let cache: { body: unknown; at: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET() {
  if (!API_KEY || !PLACE_ID) {
    return NextResponse.json(
      { error: "Google Places API is not configured." },
      { status: 503 }
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
    });
  } catch {
    return NextResponse.json({ error: "Network error reaching Places API." }, { status: 502 });
  }

  if (!res.ok) {
    const text = await res.text();
    console.error("[reviews] Google Places API error:", res.status, text);
    return NextResponse.json({ error: "Upstream API error.", status: res.status, detail: text }, { status: 502 });
  }

  const body = await res.json();
  console.info("[reviews] Places API response — reviews:", (body as { reviews?: unknown[] }).reviews?.length ?? "none", "rating:", (body as { rating?: number }).rating);
  cache = { body, at: Date.now() };
  return NextResponse.json(body);
}
