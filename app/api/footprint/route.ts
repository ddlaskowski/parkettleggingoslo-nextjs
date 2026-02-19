// app/api/handshake/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const uid = process.env.CONTACT_UID;
    const endpoint = process.env.HANDSHAKE_ENDPOINT;

    if (!uid || !endpoint) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // fire & forget – nie blokujemy UX
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid }),
      cache: "no-store",
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}