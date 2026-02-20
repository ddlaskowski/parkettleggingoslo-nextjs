"use client";

import { useState, useEffect } from "react";
import PriceCalculator from "@/components/PriceCalculator";
import ContactForm from "@/components/ContactForm";



export default function HomeClient() {
  const [prefillMessage, setPrefillMessage] = useState<string>("");
  
  useEffect(() => {
    fetch("/api/handshake", { method: "POST" }).catch(() => {});
  }, []);
  return (
    <>
      <section id="pris" className="max-w-6xl mx-auto px-6 py-20">
        <PriceCalculator
          onSendInquiry={(p) => {
            const addOnsLine = p.addOns.length ? p.addOns.join(", ") : "Ingen";
            const minLine = p.minimumApplied ? "Minimumsjobb er brukt." : "";

            setPrefillMessage(
              `Type gulv: ${p.floorTypeLabel}\n` +
                `Areal: ${p.areaM2} m² \n` +
                `Mønster: ${p.patternLabel}\n` +
                (p.patternExtras.length ? `Ramme/tillegg: ${p.patternExtras.join(", ")}\n` : "") +
                `Tilvalg: ${addOnsLine}\n` +
                `Estimert pris: ${p.estimateTotal.toLocaleString()} kr ${
                  p.includeVat ? "(inkl. MVA)" : "(eks. MVA)"
                }\n` +
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
