"use client";

import { FAQ_ITEMS } from "@/lib/faqItems";
import { useId, useState } from "react";


function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={`inline-block transition-transform duration-200 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      aria-hidden="true"
    >
      ▼
    </span>
  );
}

export default function FAQ() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 0 = pierwsze otwarte, możesz dać null

  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold">Ofte stilte spørsmål</h2>
      <p className="mt-3 text-gray-600 max-w-3xl">
        Her er svar på noen vanlige spørsmål om parkettlegging i Oslo, Bærum og Asker.
      </p>

      <div className="mt-10 divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const buttonId = `${baseId}-btn-${idx}`;
          const panelId = `${baseId}-panel-${idx}`;

          return (
            <div key={item.q} className="px-6">
              <button
                id={buttonId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-5 flex items-center justify-between gap-6 text-left"
              >
                <span className="font-medium text-gray-900">{item.q}</span>
                <span className="text-gray-500">
                  <Chevron open={isOpen} />
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <a
          href="#kontakt"
          className="inline-block border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm"
        >
          Send forespørsel →
        </a>
      </div>
    </section>
  );
}
