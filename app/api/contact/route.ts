// app/api/contact/route.ts
import { NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function normalizePhone(input: string) {
  return input.replace(/[^\d+()\- \t]/g, "").trim();
}

function digitsOnly(input: string) {
  return input.replace(/\D/g, "");
}

function isValidPhone(input: string) {
  const cleaned = normalizePhone(input);
  const digits = digitsOnly(cleaned);

  if (digits.length < 8 || digits.length > 15) return false;
  if (cleaned.includes("+") && !cleaned.startsWith("+")) return false;
  if (/^(\d)\1+$/.test(digits)) return false; // same powtórzenia
  if (digits === "00000000") return false;

  return true;
}

function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (b.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: b.resetAt - now };
  }

  b.count += 1;
  buckets.set(key, b);
  return { ok: true, remaining: limit - b.count };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot (bot-trap)
    const honeypot = String(body.honeypot ?? "").trim();
    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true, messageId: "ignored" });
    }

    // Rate limit per IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rl = rateLimit(ip, 5, 10 * 60 * 1000); // 5 / 10min
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "For mange forsøk. Vent litt og prøv igjen." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil((rl.retryAfterMs ?? 0) / 1000)) },
        }
      );
    }

    const name = String(body.name ?? "").trim();
    const mobile = normalizePhone(String(body.mobile ?? ""));
    const message = String(body.message ?? "").trim();
    const accept = Boolean(body.accept);

    // Mobile Required
    if (!accept) {
      return NextResponse.json({ ok: false, error: "Consent required" }, { status: 400 });
    }
    if (!name || !mobile || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (!isValidPhone(mobile)) {
        return NextResponse.json(
            { ok: false, error: "Ugyldig telefonnummer. Bruk minst 8 sifre." },
            { status: 400 }
        );
    }

    const uid = process.env.CONTACT_UID;
    const client_key = process.env.CONTACT_CLIENT_KEY;
    const endpoint = process.env.CONTACT_ENDPOINT;

    if (!uid || !client_key || !endpoint) {
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

    const payload = {
      uid,
      client_key,
      email: "",
      mobile,
      name,
      message,
      accept: true,
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Upstream error", details: data ?? null },
        { status: 502 }
      );
    }

    if (!data?.messageId) {
      return NextResponse.json(
        { ok: false, error: "Invalid upstream response", details: data ?? null },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, messageId: String(data.messageId) });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
