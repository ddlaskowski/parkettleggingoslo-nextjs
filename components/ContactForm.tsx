"use client";

import { useId, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { track } from "@/lib/track";

type Prefill = { message: string };

type FormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success" }
  | { type: "error"; message: string };

export default function ContactForm({ prefill }: { prefill?: Prefill }) {
  const formId = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState(prefill?.message ?? "");
  const [accept, setAccept] = useState(true);
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const incomingMessage = prefill?.message ?? "";
  const [previousPrefill, setPreviousPrefill] = useState(incomingMessage);

  // Adjust only when a new calculator message arrives; ordinary edits stay local.
  if (incomingMessage !== previousPrefill) {
    setPreviousPrefill(incomingMessage);
    if (incomingMessage) setMessage(incomingMessage);
  }

  
  function normalizePhone(input: string) {
    return input.replace(/[^\d+()\- \t]/g, "").trim();
  }

  function digitsOnly(input: string) {
    return input.replace(/\D/g, "");
  }

  function isValidPhone(input: string) {
    const cleaned = normalizePhone(input);
    const digits = digitsOnly(cleaned);

    // min 8 cyfr (Norwegia), max 15 (E.164)
    if (digits.length < 8 || digits.length > 15) return false;

    // jeżeli jest plus, to tylko na początku
    if (cleaned.includes("+") && !cleaned.startsWith("+")) return false;

    return true;
  }

  const canSubmit = (
      accept &&
      name.trim().length > 1 &&
      isValidPhone(phone) &&
      message.trim().length > 5
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setStatus({ type: "error", message: "Ugyldig telefonnummer (min. 8 sifre)." });
      return;
    }
    if (!canSubmit) return;

    setStatus({ type: "loading" });

    // "Område" in message
    const messageWithPlace = [
      message.trim(),
      place.trim() ? `Område: ${place.trim()}` : null,
      "",
    ]
      .filter(Boolean)
      .join("\n");
    const phoneClean = normalizePhone(phone);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          mobile: phoneClean,
          email: "",            // no email
          message: messageWithPlace,
          accept,
          honeypot: hp,
        }),
      });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.messageId || data.messageId === "ignored")  {
      setStatus({
        type: "error",
        message: data?.error ?? "Noe gikk galt. Prøv igjen.",
      });
      return;
    }

    setStatus({ type: "success" });
    track("contact_submit_success");

    setName(""); setPhone(""); setPlace(""); setMessage("");
    } catch {
      setStatus({ type: "error", message: "Nettverksfeil. Prøv igjen." });
    }
  }



  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Kontakt</h2>
        <p id={`${formId}-guidance`} className="mt-2 text-gray-600 text-sm">
          Oppgi gulvtype, omtrent areal, hvilke rom det gjelder og hvor boligen ligger. Fortell også om gammelt gulv skal fjernes og om du ønsker nye gulvlister.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor={`${formId}-name`} className="block text-sm font-medium">Navn (påkrevd)</label>
          <input
            id={`${formId}-name`}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <label htmlFor={`${formId}-phone`} className="block text-sm font-medium">Telefon (påkrevd)</label>
          <input
            id={`${formId}-phone`}
            type="tel"
            required
            aria-invalid={phone.length > 0 && !isValidPhone(phone)}
            aria-describedby={phone.length > 0 && !isValidPhone(phone) ? `${formId}-phone-error` : undefined}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Telefon (påkrevd)"
            value={phone}
            onChange={(e) => setPhone(normalizePhone(e.target.value))}
            autoComplete="tel"
          />
          {phone.length > 0 && !isValidPhone(phone) && (
            <p id={`${formId}-phone-error`} className="text-xs text-red-700">
              Skriv inn et gyldig telefonnummer (min. 8 sifre).
            </p>
          )}
          <label htmlFor={`${formId}-place`} className="block text-sm font-medium">Område (valgfritt)</label>
          <input
            id={`${formId}-place`}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Område (Oslo, Bærum, Asker...)"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            autoComplete="address-level2"
          />
          <label htmlFor={`${formId}-message`} className="block text-sm font-medium">Melding (påkrevd)</label>
          <textarea
            id={`${formId}-message`}
            required
            className="w-full min-h-[160px] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            aria-describedby={`${formId}-guidance`}
            placeholder="Gulvtype, omtrent areal, rom og område"
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
          <div className="hidden" aria-hidden="true">
            <label>
              Company
              <input
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={!canSubmit || status.type === "loading"}
            className="inline-flex items-center justify-center bg-[#C69C6D] hover:bg-[#B68655] disabled:opacity-60 disabled:hover:bg-[#C69C6D] text-white px-5 py-3 rounded-xl transition text-sm w-full"
          >
            {status.type === "loading" ? "Sender..." : "Send forespørsel"}
          </button>

          {status.type === "success" && (
            <p role="status" className="text-sm text-green-700">
              Takk! Vi tar kontakt så snart som mulig.
            </p>
          )}

          {status.type === "error" && (
            <p role="alert" className="text-sm text-red-700">{status.message}</p>
          )}
        </form>
      </div>

      <div className="text-sm text-gray-700">
        <div className="font-semibold">Telefon</div>
        <a href={`tel:${siteConfig.phoneE164}`} className="inline-block mt-1 text-gray-600 underline underline-offset-4">{siteConfig.phoneDisplay}</a>

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
