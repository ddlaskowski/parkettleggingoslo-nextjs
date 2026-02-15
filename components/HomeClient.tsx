"use client";

import { useState } from "react";
import PriceCalculator from "@/components/PriceCalculator";
import ContactForm from "@/components/ContactForm";

export default function HomeClient() {
  const [prefillMessage, setPrefillMessage] = useState<string>("");

  return (
    <>
      <section id="pris" className="max-w-6xl mx-auto px-6 py-20">
        <PriceCalculator
          onSendInquiry={(p) => {
            const addOnsLine = p.addOns.length ? p.addOns.join(", ") : "Ingen";
            const minLine = p.minimumApplied ? "Minimumsjobb er brukt." : "";

            setPrefillMessage(
              `Type gulv: ${p.floorTypeLabel}\n` +
                `Areal: ${p.areaM2} m² (${p.tierLabel})\n` +
                `Tilvalg: ${addOnsLine}\n` +
                `Estimert pris: ${p.estimateTotal.toLocaleString()} kr\n` +
                `Estimert pris per m²: ${p.estimatePerM2.toLocaleString()} kr/m²\n` +
                `${minLine}\n\n` +
                `Adresse/etasje/parkering (valgfritt):`
            );
          }}
        />
      </section>

      <section id="kontakt" className="max-w-6xl mx-auto px-6 py-20">
        <ContactForm prefill={{ message: prefillMessage }} />
      </section>
    </>
  );
}
