import { NextRequest, NextResponse } from "next/server";

// In-memory store for rate limiting (single-instance only).
// For multi-instance / production: replace with Upstash Redis.
const rateStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_DEFAULT = 100;  // general API requests per window
const MAX_REQUESTS_AUTH = 5;       // auth routes per window

const AUTH_PATTERNS = ["/api/auth", "/api/login", "/api/register", "/api/reset-password"];

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(key: string, max: number): { limited: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remaining: max - 1, resetAt: now + WINDOW_MS };
  }

  entry.count += 1;
  const remaining = Math.max(0, max - entry.count);
  return { limited: entry.count > max, remaining, resetAt: entry.resetAt };
}

// Prune stale entries periodically to prevent memory growth.
function pruneStore() {
  const now = Date.now();
  for (const [key, val] of rateStore.entries()) {
    if (now > val.resetAt) rateStore.delete(key);
  }
}

let lastPrune = Date.now();

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only rate-limit API routes.
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (Date.now() - lastPrune > 5 * 60 * 1000) {
    pruneStore();
    lastPrune = Date.now();
  }

  const ip = getIp(req);
  const isAuth = AUTH_PATTERNS.some((p) => pathname.startsWith(p));
  const max = isAuth ? MAX_REQUESTS_AUTH : MAX_REQUESTS_DEFAULT;
  const storeKey = `${isAuth ? "auth" : "api"}:${ip}`;

  const { limited, remaining, resetAt } = isRateLimited(storeKey, max);

  if (limited) {
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(Math.ceil((resetAt - Date.now()) / 1000)),
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
