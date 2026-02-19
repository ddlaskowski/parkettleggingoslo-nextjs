"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

type Prefill = { message: string };

type FormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; message: string };

export default function ContactForm({ prefill }: { prefill?: Prefill }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");
  const [accept, setAccept] = useState(true);

  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  useEffect(() => {
    if (prefill?.message) setMessage(prefill.message);
  }, [prefill?.message]);

  const canSubmit = useMemo(() => {
    return (
      accept &&
      name.trim().length > 1 &&
      phone.trim().length > 5 &&
      message.trim().length > 5
    );
  }, [accept, name, phone, message]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus({ type: "loading" });

    // "Område" wplecione do message (bez zmian na serwerze)
    const messageWithPlace = [
      place.trim() ? `Område: ${place.trim()}` : null,
      "",
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: phone.trim(), // serwer dostaje string
          email: "",            // brak emaila
          message: messageWithPlace,
          accept,
        }),
      });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.messageId) {
      setStatus({
        type: "error",
        message: data?.error ?? "Noe gikk galt. Prøv igjen.",
      });
      return;
    }

    setStatus({ type: "success" });

    setName(""); setPhone(""); setPlace(""); setMessage("");
    } catch {
      setStatus({ type: "error", message: "Nettverksfeil. Prøv igjen." });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-xl font-semibold">Kontakt</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Skriv kort hva du trenger, så tar vi kontakt.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Telefon (påkrevd)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Område (Oslo, Bærum, Asker...)"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            autoComplete="address-level2"
          />
          <textarea
            className="w-full min-h-[160px] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Melding"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <label className="flex items-start gap-3 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={accept}
              onChange={() => setAccept((v) => !v)}
              className="mt-1 accent-[#C69C6D]"
            />
            Jeg godtar at dere kan kontakte meg angående forespørselen min.
          </label>

          <button
            type="submit"
            disabled={!canSubmit || status.type === "loading"}
            className="inline-flex items-center justify-center bg-[#C69C6D] hover:bg-[#B68655] disabled:opacity-60 disabled:hover:bg-[#C69C6D] text-white px-5 py-3 rounded-xl transition text-sm w-full"
          >
            {status.type === "loading" ? "Sender..." : "Send forespørsel"}
          </button>

          {status.type === "success" && (
            <p className="text-sm text-green-700">
              Takk! Vi tar kontakt så snart som mulig.
            </p>
          )}

          {status.type === "error" && (
            <p className="text-sm text-red-700">{status.message}</p>
          )}
        </form>
      </div>

      <div className="text-sm text-gray-700">
        <div className="font-semibold">Telefon</div>
        <div className="mt-1 text-gray-600">{siteConfig.phoneDisplay}</div>

        <div className="mt-6 font-semibold">Område</div>
        <div className="mt-1 text-gray-600">{siteConfig.area}</div>

        <div className="mt-6 font-semibold">Firma</div>
        <div className="mt-1 text-gray-600">
          En spesialisert tjeneste levert av Laskowski Bygg.
        </div>
      </div>
    </div>
  );
}
