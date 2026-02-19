"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { track } from "@/lib/track";

type StickyMobileCTAProps = {
  contactId?: string;
};

export default function StickyMobileCTA({ contactId = "kontakt" }: StickyMobileCTAProps) {
  const [hiddenBySection, setHiddenBySection] = useState(false);
  const [showAfterScroll, setShowAfterScroll] = useState(false);
  const [responseLine, setResponseLine] = useState(() => getNorwegianResponseLine());

useEffect(() => {
  // odśwież co 5 min (tanie i wystarczy)
  const id = window.setInterval(() => {
    setResponseLine(getNorwegianResponseLine());
  }, 5 * 60 * 1000);

  return () => window.clearInterval(id);
}, []);


  function getNorwegianResponseLine(date = new Date()) {
  const day = date.getDay(); // 0=Sun ... 6=Sat
  const hour = date.getHours();

  const isWeekend = day === 0 || day === 6;
  const isBusinessHours = hour >= 8 && hour < 17; // 08:00–16:59

  if (!isWeekend && isBusinessHours) return "Rask svar i dag";
  return "Svar neste arbeidsdag";
}

  // Krótszy numer na przycisk (bez +47), jeśli chcesz:
  const phoneShort = useMemo(() => {
    // np. "+47 968 61 689" -> "968 61 689"
    const digits = siteConfig.phoneDisplay.replace(/[^\d ]/g, "").trim();
    // jeśli masz "47 " na początku, zetnij
    return digits.startsWith("47 ") ? digits.slice(3) : siteConfig.phoneDisplay;
  }, []);

  useEffect(() => {
    // Pokaż dopiero po lekkim scrollu (mniej nachalnie na hero)
    const onScroll = () => {
      setShowAfterScroll(window.scrollY > 120);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById(contactId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHiddenBySection(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [contactId]);

  const isHidden = hiddenBySection || !showAfterScroll;

  function scrollToContact() {
    document.getElementById(contactId)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Spacer, żeby nie zasłaniać treści */}
      <div className="md:hidden h-20" />

      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
          isHidden ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-lg p-2">
            {/* Układ 60/40: telefon większy */}
            <div className="grid grid-cols-5 gap-2">
              <a
                href={`tel:${siteConfig.phoneE164}`}
                onClick={() => track("phone_click")}
                className="col-span-3 inline-flex items-center justify-center rounded-xl bg-[#C69C6D] px-4 py-3 text-sm font-semibold text-white"
              >
                Ring {phoneShort}
              </a>

              <button
                type="button"
                onClick={() => {
                  track("sticky_cta_click");
                  scrollToContact();
                }}
                className="col-span-2 inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900"
              >
                Gratis befaring
              </button>
            </div>

            <div className="mt-1 px-1 text-[11px] text-gray-500 text-center">
                {responseLine} • Oslo / Bærum / Asker
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
