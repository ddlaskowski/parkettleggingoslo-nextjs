"use client";

import { useMemo, useState } from "react";
import { estimatePrice, pricingConfig } from "@/lib/pricingConfig";
import { siteConfig } from "@/lib/siteConfig";
import { track } from "@/lib/track";


type PriceCalculatorProps = {
  onSendInquiry?: (payload: {
    areaM2: number;
    floorTypeLabel: string;
    addOns: string[];
    estimateTotal: number;
    estimatePerM2: number;
    tierLabel: string;
    minimumApplied: boolean;
    includeVat: boolean;   
  }) => void;
};


export default function PriceCalculator({ onSendInquiry }: PriceCalculatorProps) {

  const cfg = pricingConfig;
  
  const [area, setArea] = useState<number>(cfg.meta.defaultArea);
  const [floorTypeId, setFloorTypeId] = useState<string>(cfg.floorTypes[0].id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [includeVat, setIncludeVat] = useState<boolean>(true);
  
    const vatMultiplier =
    cfg.meta.vat.enabled && cfg.meta.vat.rate > 0 ? 1 + cfg.meta.vat.rate : 1;
  
    const displayPrice = (net: number) =>
    Math.round(includeVat ? net * vatMultiplier : net);
  
  
  const result = useMemo(() => {

    return estimatePrice({
      areaM2: area,
      floorTypeId,
      selectedAddOnIds: selectedAddOns,
      includeVat,
    });
  }, [area, floorTypeId, selectedAddOns, includeVat]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }
    const selectedAddOnLabels = cfg.addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .map((a) => a.labelNO);

  return (
    <section className="bg-[#F5F3EF] border border-gray-200 rounded-3xl p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h2 className="text-3xl font-semibold">{cfg.uiTextNO.title}</h2>
          <p className="mt-3 text-gray-600 max-w-2xl">{cfg.uiTextNO.subtitle}</p>
        </div>

        <div className="text-sm text-gray-600">
          <span className="font-medium text-[#1E1E1E]">
            {cfg.meta.minimumJob.labelNO}:
          </span>{" "}
          {displayPrice(cfg.meta.minimumJob.amount).toLocaleString()} kr
        </div>
      </div>

      {/* Floor types */}
      <div className="mt-10">
        <div className="text-sm text-gray-500 mb-3">{cfg.uiTextNO.floorTypeLabel}</div>
        <div className="grid md:grid-cols-3 gap-4">
          {cfg.floorTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFloorTypeId(t.id)}
              className={`text-left rounded-2xl border p-4 transition bg-white
              ${
                floorTypeId === t.id
                  ? "border-[#C69C6D] shadow-sm"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="font-medium">{t.labelNO}</div>
              <div className="text-sm text-gray-500 mt-1">
                {displayPrice(t.typicalRange.min)}–{displayPrice(t.typicalRange.max)} kr/m²
              </div>
              {t.notesNO && (
                <div className="text-xs text-gray-500 mt-2">{t.notesNO}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Area slider */}
      <div className="mt-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">{cfg.uiTextNO.areaLabel}</div>
            <div className="text-2xl font-semibold">{area} m²</div>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-[#1E1E1E]">{result.tierLabelNO}</span>
            <div className="text-xs text-gray-500">Automatisk mengderabatt</div>
          </div>
        </div>

        <input
          type="range"
          min={cfg.meta.minArea}
          max={cfg.meta.maxArea}
          step={cfg.meta.step}
          value={area}
          onChange={(e) => setArea(Number(e.target.value))}
          className="w-full mt-5 accent-[#C69C6D]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{cfg.meta.minArea} m²</span>
          <span>{cfg.meta.maxArea} m²</span>
        </div>
      </div>

      {/* Add-ons */}
      <div className="mt-10">
        <div className="text-sm text-gray-500 mb-3">{cfg.uiTextNO.addOnsLabel}</div>
        <div className="grid md:grid-cols-2 gap-3">
          {cfg.addOns.map((a) => (
            <label
              key={a.id}
              className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(a.id)}
                  onChange={() => toggleAddOn(a.id)}
                  className="accent-[#C69C6D]"
                />
                <div>
                  <div className="text-sm font-medium">{a.labelNO}</div>
                  {a.noteNO && <div className="text-xs text-gray-500">{a.noteNO}</div>}
                </div>
              </div>

              <div className="text-sm text-gray-500 whitespace-nowrap">
                {a.type === "per_m2"
                ? `+${displayPrice(a.price)} kr/m²`
                : `+${displayPrice(a.price)} kr`}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* VAT toggle */}
      {cfg.meta.vat.enabled && (
        <div className="mt-8">
          <label className="flex items-center gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={includeVat}
              onChange={() => setIncludeVat((v) => !v)}
              className="accent-[#C69C6D]"
            />
            {includeVat ? "Inkl. MVA" : "Ekskl. MVA"}
          </label>
        </div>
      )}

      {/* Result */}
      <div className="mt-10 bg-white border border-gray-200 rounded-3xl p-6 md:p-8">
        <div className="text-sm text-gray-500">{cfg.uiTextNO.estimatedLabel}</div>

        <div className="mt-2 text-4xl font-semibold">
          {(includeVat ? result.totalGross : result.totalNet).toLocaleString()} kr
        </div>

        <div className="mt-3 text-sm text-gray-600">
          {(includeVat ? result.effectivePricePerM2Gross : result.effectivePricePerM2Net)} kr/m²
          <span className="text-gray-400">•</span>{" "}
          {result.tierLabelNO}
        </div>

        {result.minimumApplied && (
          <div className="mt-2 text-xs text-amber-700">
            Minimumsjobb ({displayPrice(cfg.meta.minimumJob.amount).toLocaleString()} kr) er brukt.
          </div>
        )}

        <p className="mt-4 text-xs text-gray-500">{cfg.uiTextNO.disclaimer}</p>

        <div className="mt-6 flex flex-wrap gap-3">
        <button
            type="button"
            onClick={() => {
                track("calculator_inquiry_click");
                onSendInquiry?.({
                areaM2: area,
                floorTypeLabel: result.floorTypeLabelNO,
                addOns: selectedAddOnLabels,
                includeVat,
                estimateTotal: includeVat ? result.totalGross : result.totalNet,
                estimatePerM2: includeVat ? result.effectivePricePerM2Gross : result.effectivePricePerM2Net,
                tierLabel: result.tierLabelNO,
                minimumApplied: result.minimumApplied,
                });
                document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#C69C6D] hover:bg-[#B68655] text-white px-5 py-3 rounded-xl transition text-sm"
        >
        Send forespørsel
        </button>
          <a
            href={`tel:${siteConfig.phoneE164}`}
            onClick={() => track("phone_click")}
            className="border border-gray-300 hover:border-gray-500 px-5 py-3 rounded-xl transition text-sm"
          >
            Ring nå
          </a>
        </div>
      </div>
    </section>
  );
}
