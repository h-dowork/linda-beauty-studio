import { NextRequest, NextResponse } from "next/server";

// ── Rate limiting ──────────────────────────────────────────────────────────────
// In-memory store — single-instance only.
// Safe on Vercel because Vercel's edge sets X-Forwarded-For to the real client
// IP, preventing header spoofing. On other deployments, ensure a trusted reverse
// proxy strips/overwrites X-Forwarded-For before requests reach this middleware.
// For multi-instance deployments replace with Upstash Redis (see .env.example).
const rateStore = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_CONTACT = 10;
const MAX_REQUESTS_DEFAULT = 20;

let lastPruneAt = 0;

function pruneStore() {
  const now = Date.now();
  if (now - lastPruneAt < 5 * 60 * 1000) return;
  lastPruneAt = now;
  for (const [key, val] of rateStore.entries()) {
    if (now > val.resetAt) rateStore.delete(key);
  }
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function checkLimit(
  key: string,
  max: number,
): { limited: boolean; remaining: number; resetAt: number } {
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

// ── CSP nonce ──────────────────────────────────────────────────────────────────
function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";
  return [
    "default-src 'self'",
    // 'unsafe-eval' is needed by React in dev mode (callstack reconstruction)
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com",
    "font-src 'self'",
    "connect-src 'self' https://va.vercel-scripts.com",
    "frame-src https://www.google.com https://maps.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// ── Middleware ─────────────────────────────────────────────────────────────────
export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  // Forward nonce to Server Components so they can pass it to <Script> / <Analytics>
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);

  // ── API rate limiting ──────────────────────────────────────────────────────
  if (pathname.startsWith("/api/")) {
    pruneStore();

    const ip = getIp(req);
    const isContact = pathname.startsWith("/api/contact");
    const max = isContact ? MAX_REQUESTS_CONTACT : MAX_REQUESTS_DEFAULT;
    const key = `${isContact ? "contact" : "api"}:${ip}`;
    const { limited, remaining, resetAt } = checkLimit(key, max);

    if (limited) {
      const now = Date.now();
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Content-Security-Policy": csp,
            "Retry-After": String(Math.ceil((resetAt - now) / 1000)),
            "X-RateLimit-Limit": String(max),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
          },
        },
      );
    }

    const res = NextResponse.next({ request: { headers: requestHeaders } });
    res.headers.set("Content-Security-Policy", csp);
    res.headers.set("X-RateLimit-Limit", String(max));
    res.headers.set("X-RateLimit-Remaining", String(remaining));
    res.headers.set("X-RateLimit-Reset", String(Math.ceil(resetAt / 1000)));
    return res;
  }

  // ── All other routes: attach nonce and CSP ─────────────────────────────────
  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", csp);
  return res;
}

export const config = {
  matcher: [
    // All routes except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
