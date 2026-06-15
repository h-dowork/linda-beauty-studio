import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_BYTES = 4096;

function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x1F\x7F-\x9F]/gu, "") // strip C0/C1 control chars + DEL
    .replace(/[<>"'`]/g, "")
    .trim()
    .slice(0, maxLen);
}

function sanitizeEmail(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().toLowerCase().slice(0, 254);
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(trimmed) ? trimmed : "";
}

function sanitizePhone(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[^0-9+\-\s()]/g, "").trim().slice(0, 20);
}

type ParseResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; status: number; error: string };

async function parseJsonBody(req: NextRequest): Promise<ParseResult> {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return { ok: false, status: 413, error: "Payload too large." };

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json"))
    return { ok: false, status: 415, error: "Content-Type must be application/json." };

  let text: string;
  try {
    text = await req.text();
  } catch {
    return { ok: false, status: 400, error: "Failed to read request body." };
  }

  if (text.length > MAX_BODY_BYTES) return { ok: false, status: 413, error: "Payload too large." };

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, status: 400, error: "Invalid JSON." };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed))
    return { ok: false, status: 400, error: "Invalid request body." };

  return { ok: true, body: parsed as Record<string, unknown> };
}

function validateFields(name: string, email: string, message: string): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required (max 100 characters).";
  if (!email) errors.email = "A valid email address is required.";
  if (!message || message.length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

export async function POST(req: NextRequest) {
  const parsed = await parseJsonBody(req);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: parsed.status });

  const { body } = parsed;
  const name    = sanitizeText(body.name, 100);
  const email   = sanitizeEmail(body.email);
  const phone   = sanitizePhone(body.phone);
  const service = sanitizeText(body.service, 60);
  const message = sanitizeText(body.message, 1000);

  const errors = validateFields(name, email, message);
  if (Object.keys(errors).length > 0) return NextResponse.json({ errors }, { status: 422 });

  // Booking is sent via WhatsApp (client-side deep link). This endpoint only validates input.
  // To persist or email: await sendEmail({ name, email, phone, service, message });

  return NextResponse.json(
    { success: true, message: "Your message has been received. We will contact you shortly." },
    { status: 200 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
