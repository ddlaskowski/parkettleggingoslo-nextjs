// app/api/handshake/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const uid = process.env.CONTACT_UID;
    const endpoint = process.env.HANDSHAKE_ENDPOINT;

    if (!uid || !endpoint) {
      return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "Upstream error", details: text.slice(0, 300) },
        { status: 502 }
      );
    }

    const data = await res.json().catch(() => null);

    // zwracamy co da serwer; typowo { handshake: true/false } albo podobne
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
