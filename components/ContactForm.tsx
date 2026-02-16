"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

type Prefill = {
  message: string;
};

export default function ContactForm({ prefill }: { prefill?: Prefill }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (prefill?.message) setMessage(prefill.message);
  }, [prefill?.message]);

  const mailtoHref = (() => {
    const to = siteConfig.email; // <- zmień później
    const subject = encodeURIComponent("Forespørsel – parkettlegging");
    const body = encodeURIComponent(
      `Navn: ${name}\nTelefon: ${phone}\nSted: ${place}\n\n${message}`
    );
    return `mailto:${to}?subject=${subject}&body=${body}`;
  })();

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h3 className="text-xl font-semibold">Kontakt</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Skriv kort hva du trenger, så tar vi kontakt.
        </p>

        <div className="mt-6 space-y-4">
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Område (Oslo, Bærum, Asker...)"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          <textarea
            className="w-full min-h-[160px] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-gray-400"
            placeholder="Melding"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center bg-[#C69C6D] hover:bg-[#B68655] text-white px-5 py-3 rounded-xl transition text-sm w-full"
          >
            Send e-post
          </a>

          <p className="text-xs text-gray-500">
            Dette åpner e-postprogrammet ditt med ferdig utfylt melding.
          </p>
        </div>
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
