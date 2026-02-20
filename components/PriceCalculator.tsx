"use client";

import { useMemo, useEffect, useState } from "react";
import { estimatePrice, pricingConfig } from "@/lib/pricingConfig";
import { siteConfig } from "@/lib/siteConfig";
import { track } from "@/lib/track";
import type { FloorTypeId, PatternId, PatternExtraId } from "@/lib/pricingConfig";
import {IconRett, IconDiagonal, IconMosaic, IconChevron, IconFiskeben} from './PatternIcons';


type PriceCalculatorProps = {
  onSendInquiry?: (payload: {
    areaM2: number;
    floorTypeLabel: string;
    patternLabel: string;
    patternExtras: string[];
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

  // ✅ typowane ID
  const [floorTypeId, setFloorTypeId] = useState<FloorTypeId>(cfg.floorTypes[0].id);
  const [patternId, setPatternId] = useState<PatternId>(cfg.patterns[0].id);
  const [selectedPatternExtras, setSelectedPatternExtras] = useState<PatternExtraId[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [includeVat, setIncludeVat] = useState<boolean>(true);

  const allowedPatternIdsForFloor: Partial<Record<FloorTypeId, PatternId[]>> = {
    heltre: ["straight", "diagonal"],
  };

  const allowedPatternsForSelectedFloor: PatternId[] =
    allowedPatternIdsForFloor[floorTypeId] ?? cfg.patterns.map((p) => p.id);

  
useEffect(() => {
  if (!allowedPatternsForSelectedFloor.includes(patternId)) {
    setPatternId("straight");
    setSelectedPatternExtras([]);
  }

  if (floorTypeId !== "parkett_limt" && selectedPatternExtras.length > 0) {
    setSelectedPatternExtras([]);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [floorTypeId]);

  const vatMultiplier =
    cfg.meta.vat.enabled && cfg.meta.vat.rate > 0 ? 1 + cfg.meta.vat.rate : 1;

  const displayPrice = (net: number) => Math.round(includeVat ? net * vatMultiplier : net);

  const result = useMemo(() => {
    return estimatePrice({
      areaM2: area,
      floorTypeId,
      selectedAddOnIds: selectedAddOns,
      patternId,
      selectedPatternExtraIds: selectedPatternExtras,
      includeVat,
    });
  }, [area, floorTypeId, selectedAddOns, patternId, selectedPatternExtras, includeVat]);

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function togglePatternExtra(id: PatternExtraId) {
    setSelectedPatternExtras((prev) =>
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
          <span className="font-medium text-[#1E1E1E]">{cfg.meta.minimumJob.labelNO}:</span>{" "}
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
              {t.notesNO && <div className="text-xs text-gray-500 mt-2">{t.notesNO}</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern */}
      <div className="mt-10">
        <div className="text-sm text-gray-500 mb-3">Mønster</div>
        <div className="grid md:grid-cols-3 gap-4">
          {cfg.patterns
            .filter((p) => allowedPatternsForSelectedFloor.includes(p.id))
            .map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setPatternId(p.id);
                setSelectedPatternExtras([]);
              }}
              className={`text-left rounded-2xl border p-4 transition bg-white
                ${
                  patternId === p.id
                    ? "border-[#C69C6D] shadow-sm"
                    : "border-gray-200 hover:border-gray-400"
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{p.labelNO}</div>
                  {p.noteNO && <div className="text-xs text-gray-500 mt-2">{p.noteNO}</div>}
                </div>

                <div className="text-[#C69C6D]">
                  {p.id === "straight" && <IconRett />}
                  {p.id === "diagonal" && <IconDiagonal />}
                  {p.id === "mosaic" && <IconMosaic />}
                  {p.id === "chevron" && <IconChevron
                    angleDeg={50}
                    plankLength={40}
                    n={3}
                  /> }
                  {p.id === "fiskeben" && <IconFiskeben 
                  />}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Pattern extras */}
        {floorTypeId === "parkett_limt" && (
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {cfg.patternExtras.map((x) => {
              const allowed = !x.allowedPatternIds || x.allowedPatternIds.includes(patternId);
              if (!allowed) return null;

              const checked = selectedPatternExtras.includes(x.id as PatternExtraId);

              return (
                <label
                  key={x.id}
                  className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePatternExtra(x.id as PatternExtraId)}
                      className="accent-[#C69C6D]"
                    />
                    <div>
                      <div className="text-sm font-medium">{x.labelNO}</div>
                      {x.noteNO && <div className="text-xs text-gray-500">{x.noteNO}</div>}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap">
                    +{Math.round((x.multiplier - 1) * 100)}%
                  </div>
                </label>
              );
            })}
          </div>
        )}
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
                +{displayPrice(a.price)} kr/m²
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
          {(includeVat ? result.effectivePricePerM2Gross : result.effectivePricePerM2Net)} kr/m²{" "}
          <span className="text-gray-400">•</span> {result.tierLabelNO}
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
                patternLabel: result.patternLabelNO,
                patternExtras: result.patternExtraLabelsNO,
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