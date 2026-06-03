import { NextRequest, NextResponse } from "next/server";

// In-memory rate store — single-instance only.
// For multi-instance / production deployments replace with Upstash Redis.
const rateStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_CONTACT = 10;  // contact form: 10 per 15 min per IP
const MAX_REQUESTS_DEFAULT = 60;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkLimit(key: string, max: number): { limited: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remaining: max - 1, resetAt: now + WINDOW_MS };
  }

  entry.count += 1;
  return {
    limited: entry.count > max,
    remaining: Math.max(0, max - entry.count),
    resetAt: entry.resetAt,
  };
}

let lastPrune = Date.now();

function pruneStore() {
  const now = Date.now();
  for (const [key, val] of rateStore.entries()) {
    if (now > val.resetAt) rateStore.delete(key);
  }
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/")) return NextResponse.next();

  const now = Date.now();
  if (now - lastPrune > 5 * 60 * 1000) {
    pruneStore();
    lastPrune = now;
  }

  const ip = getIp(req);
  const isContact = pathname.startsWith("/api/contact");
  const max = isContact ? MAX_REQUESTS_CONTACT : MAX_REQUESTS_DEFAULT;
  const key = `${isContact ? "contact" : "api"}:${ip}`;

  const { limited, remaining, resetAt } = checkLimit(key, max);

  if (limited) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((resetAt - now) / 1000)),
          "X-RateLimit-Limit": String(max),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
        },
      }
    );
  }

  const res = NextResponse.next();
  res.headers.set("X-RateLimit-Limit", String(max));
  res.headers.set("X-RateLimit-Remaining", String(remaining));
  res.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
