// app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const mobile = String(body.mobile ?? "").trim();
    const message = String(body.message ?? "").trim();
    const accept = Boolean(body.accept);

      if (!accept) {
      return NextResponse.json({ ok: false, error: "Consent required" }, { status: 400 });
    }
    if (!name || !mobile || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
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
      email: "",     // no email in this case
      mobile,        // string
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