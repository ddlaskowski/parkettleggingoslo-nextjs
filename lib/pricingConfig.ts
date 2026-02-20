export type AddOnType = "per_m2";

export type AreaTier = {
  id: string;
  labelNO: string;
  min: number;
  max: number;
  multiplier: number;
};

// 1) ID jako const -> typy bez pętli
export const FLOOR_TYPE_IDS = [
  "laminat_click",
  "vinyl_click",
  "parkett_click",
  "parkett_limt",
  "heltre",
] as const;

export type FloorTypeId = (typeof FLOOR_TYPE_IDS)[number];

export const PATTERN_IDS = ["straight", "diagonal", "fiskeben", "chevron", "mosaic"] as const;
export type PatternId = (typeof PATTERN_IDS)[number];

export const PATTERN_EXTRA_IDS = ["border_frame"] as const;
export type PatternExtraId = (typeof PATTERN_EXTRA_IDS)[number];

// ✅ waste disposal
export const WASTE_DISPOSAL_IDS = ["none", "new_only", "new_and_old"] as const;
export type WasteDisposalId = (typeof WASTE_DISPOSAL_IDS)[number];

export type FloorType = {
  id: FloorTypeId;
  labelNO: string;
  basePricePerM2: number;
  typicalRange: { min: number; max: number };
  notesNO?: string;
};

export type AddOn = {
  id: string;
  labelNO: string;
  type: AddOnType;
  price: number;
  range?: { min: number; max: number };
  noteNO?: string;
};

export type Pattern = {
  id: PatternId;
  labelNO: string;
  multiplierByFloorTypeId: Partial<Record<FloorTypeId, number>>;
  defaultMultiplier: number;
  noteNO?: string;
};

export type PatternExtra = {
  id: PatternExtraId;
  labelNO: string;
  multiplier: number;
  noteNO?: string;
  allowedPatternIds?: PatternId[];
};

export type WasteDisposalOption =
  | {
      id: "none";
      labelNO: string;
      type: "none";
      noteNO?: string;
    }
  | {
      id: "new_only";
      labelNO: string;
      type: "fixed";
      price: number; // net
      noteNO?: string;
    }
  | {
      id: "new_and_old";
      labelNO: string;
      type: "hybrid";
      basePrice: number; // net
      pricePerM2: number; // net
      capPrice?: number;
      noteNO?: string;
    };

export const pricingConfig = {
  meta: {
    currency: "NOK",
    unit: "m²",
    defaultArea: 45,
    minArea: 10,
    maxArea: 300,
    step: 1,
    minimumJob: {
      labelNO: "Minimumsjobb",
      amount: 4000,
      descriptionNO: "Gjelder små jobber (rigg, oppmøte og planlegging).",
    },
    vat: {
      enabled: true,
      rate: 0.25,
      labelNO: "Inkl. MVA",
    },
  },

  areaTiers: [
    { id: "tier_small", labelNO: "10–69 m²", min: 10, max: 69, multiplier: 1.0 },
    { id: "tier_medium", labelNO: "70–119 m²", min: 70, max: 119, multiplier: 0.93 },
    { id: "tier_large", labelNO: "120+ m²", min: 120, max: 9999, multiplier: 0.88 },
  ] satisfies AreaTier[],

  floorTypes: [
    {
      id: "laminat_click",
      labelNO: "Laminat (klikk)",
      basePricePerM2: 270,
      typicalRange: { min: 239, max: 449 },
      notesNO: "Veiledende pris for standard legging på jevnt underlag.",
    },
    {
      id: "vinyl_click",
      labelNO: "Vinyl (klikk)",
      basePricePerM2: 296,
      typicalRange: { min: 269, max: 499 },
      notesNO: "Veiledende pris. Avretting kan komme i tillegg ved behov.",
    },
    {
      id: "parkett_click",
      labelNO: "Parkett (klikk)",
      basePricePerM2: 439,
      typicalRange: { min: 389, max: 669 },
      notesNO: "Klikk-parkett. Pris avhenger av mønster og romløsning.",
    },
    {
      id: "parkett_limt",
      labelNO: "Parkett (limt)",
      basePricePerM2: 599,
      typicalRange: { min: 549, max: 969 },
      notesNO: "Limt parkett krever mer arbeid og riktig underlag.",
    },
    {
      id: "heltre",
      labelNO: "Heltre / massive trebord",
      basePricePerM2: 890,
      typicalRange: { min: 789, max: 1059 },
      notesNO: "Heltre er mer krevende – befaring anbefales alltid.",
    },
  ] satisfies FloorType[],

  patterns: [
    {
      id: "straight",
      labelNO: "Rett legging",
      defaultMultiplier: 1.0,
      multiplierByFloorTypeId: {},
      noteNO: "Standard mønster (mest vanlig).",
    },
    {
      id: "diagonal",
      labelNO: "Diagonal",
      defaultMultiplier: 1.15,
      multiplierByFloorTypeId: {
        laminat_click: 1.12,
        vinyl_click: 1.12,
        parkett_click: 1.18,
        parkett_limt: 1.22,
      },
      noteNO: "Mer kutt og tilpasning.",
    },
    {
      id: "mosaic",
      labelNO: "Mosaikk / ruter",
      defaultMultiplier: 1.45,
      multiplierByFloorTypeId: {
        parkett_limt: 1.50,
      },
      noteNO: "Mer komplekst mønster.",
    },
    {
      id: "fiskeben",
      labelNO: "Fiskeben",
      defaultMultiplier: 1.35,
      multiplierByFloorTypeId: {
        parkett_click: 1.30,
        parkett_limt: 1.45,
        heltre: 1.55,
      },
      noteNO: "Krever høy presisjon og tar mer tid.",
    },
    {
      id: "chevron",
      labelNO: "Chevron",
      defaultMultiplier: 1.55,
      multiplierByFloorTypeId: {
        parkett_limt: 1.60,
        parkett_click: 1.45,
        heltre: 1.70,
      },
      noteNO: "Ekstra presisjon og tilpasning.",
    },
  ] satisfies Pattern[],

  patternExtras: [
    {
      id: "border_frame",
      labelNO: "Ramme / kant (border)",
      multiplier: 1.25,
      allowedPatternIds: ["straight", "diagonal", "fiskeben", "chevron", "mosaic"],
      noteNO: "Øker tidsbruk pga. innramming og flere kutt.",
    },
  ] satisfies PatternExtra[],

  addOns: [
    {
      id: "remove_old_floor",
      labelNO: "Fjerning av gammelt gulv",
      type: "per_m2",
      price: 79,
      range: { min: 70, max: 130 },
    },
    {
      id: "underlay",
      labelNO: "Underlag (montering)",
      type: "per_m2",
      price: 19,
      range: { min: 25, max: 60 },
    },
    {
      id: "skirting",
      labelNO: "Gulvlister (montering)",
      type: "per_m2",
      price: 79,
      range: { min: 40, max: 80 },
      noteNO: "Forenklet beregning. Endelig pris etter befaring.",
    },
    {
      id: "leveling",
      labelNO: "Avretting (ved behov)",
      type: "per_m2",
      price: 300,
      range: { min: 90, max: 800 },
    },
  ] satisfies AddOn[],

  // ✅ NEW: Waste disposal
  wasteDisposal: {
    labelNO: "Avfallshåndtering",
    options: [
      { id: "none", labelNO: "Ingen", type: "none" },
      {
        id: "new_only",
        labelNO: "Avfall etter legging (emballasje og monteringsavfall)",
        type: "fixed",
        price: 990,
        noteNO: "Fast pris. Gjelder normalt avfall etter montering.",
      },
      {
        id: "new_and_old",
        labelNO: "Avfallshåndtering inkl. gammelt gulv",
        type: "hybrid",
        basePrice: 990,
        pricePerM2: 35,
        capPrice: 8900,
        noteNO: "Basert på areal. Endelig pris etter befaring ved tungt avfall.",
      },
    ] satisfies WasteDisposalOption[],
  },

  uiTextNO: {
    title: "Priskalkulator",
    subtitle: "Veiledende priser for arbeid. Endelig pris avtales etter gratis befaring.",
    areaLabel: "Areal (m²)",
    floorTypeLabel: "Type gulv",
    addOnsLabel: "Tilvalg",
    estimatedLabel: "Estimert pris",
    disclaimer:
      "Pris er veiledende og kan endre seg ved komplisert underlag, mønster, mange kutt, trapper eller spesielle forhold.",
  },
} as const;

export type EstimateInput = {
  areaM2: number;
  floorTypeId: FloorTypeId;
  selectedAddOnIds?: string[];
  patternId?: PatternId;
  selectedPatternExtraIds?: PatternExtraId[];
  wasteDisposalId?: WasteDisposalId;
  includeVat?: boolean;
};

export type EstimateResult = {
  areaM2: number;
  tierId: string;
  tierLabelNO: string;
  floorTypeLabelNO: string;

  patternLabelNO: string;
  patternExtraLabelsNO: string[];

  effectivePricePerM2Net: number;
  effectivePricePerM2Gross: number;

  subtotalNet: number;
  subtotalGross: number;

  minimumApplied: boolean;

  wasteDisposalLabelNO: string;
  wasteDisposalNet: number;
  wasteDisposalGross: number;

  totalNet: number;
  totalGross: number;

  currency: string;
};

export function estimatePrice({
  areaM2,
  floorTypeId,
  selectedAddOnIds = [],
  patternId = "straight",
  selectedPatternExtraIds = [],
  wasteDisposalId = "none",
}: EstimateInput): EstimateResult {
  const cfg = pricingConfig;

  const floorType = cfg.floorTypes.find((x) => x.id === floorTypeId);
  if (!floorType) throw new Error("Invalid floorTypeId");

  const tier =
    cfg.areaTiers.find((t) => areaM2 >= t.min && areaM2 <= t.max) ??
    cfg.areaTiers[cfg.areaTiers.length - 1];

  const pattern = cfg.patterns.find((p) => p.id === patternId) ?? cfg.patterns[0];

  const patternMultiplier =
    pattern.multiplierByFloorTypeId[floorTypeId] ?? pattern.defaultMultiplier;

  const extras = cfg.patternExtras.filter((x) => selectedPatternExtraIds.includes(x.id));
  const allowedExtras = extras.filter(
    (x) => !x.allowedPatternIds || x.allowedPatternIds.includes(pattern.id)
  );

  const extrasMultiplier = allowedExtras.reduce((m, x) => m * x.multiplier, 1);

  const addOns = cfg.addOns.filter((a) => selectedAddOnIds.includes(a.id));
  const addOnsPerM2 = addOns.reduce((sum, a) => sum + a.price, 0);

  const vatMultiplier =
    cfg.meta.vat.enabled && cfg.meta.vat.rate > 0 ? 1 + cfg.meta.vat.rate : 1;

  // ✅ Labor / installation (with multipliers)
  const effectivePricePerM2Net =
    (floorType.basePricePerM2 + addOnsPerM2) *
    tier.multiplier *
    patternMultiplier *
    extrasMultiplier;

  const laborSubtotalNet = effectivePricePerM2Net * areaM2;
  const laborWithMinimumNet = Math.max(laborSubtotalNet, cfg.meta.minimumJob.amount);
  const minimumApplied = laborSubtotalNet < cfg.meta.minimumJob.amount;

  // ✅ Waste disposal (separate, no tier/pattern/extras multipliers)
  const wasteOpt =
    cfg.wasteDisposal.options.find((o) => o.id === wasteDisposalId) ?? cfg.wasteDisposal.options[0];

  let wasteNet = 0;
  const wasteLabelNO = wasteOpt.labelNO;

  if (wasteOpt.type === "fixed") {
    wasteNet = wasteOpt.price;
  } else if (wasteOpt.type === "hybrid") {
    wasteNet = wasteOpt.basePrice + wasteOpt.pricePerM2 * areaM2;
    if (typeof wasteOpt.capPrice === "number") {
      wasteNet = Math.min(wasteNet, wasteOpt.capPrice);
    }
  }

  const totalNet = laborWithMinimumNet + wasteNet;
  const totalGross = totalNet * vatMultiplier;

  const round = (n: number) => Math.round(n);

  return {
    areaM2,
    tierId: tier.id,
    tierLabelNO: tier.labelNO,
    floorTypeLabelNO: floorType.labelNO,

    patternLabelNO: pattern.labelNO,
    patternExtraLabelsNO: allowedExtras.map((x) => x.labelNO),

    effectivePricePerM2Net: round(effectivePricePerM2Net),
    effectivePricePerM2Gross: round(effectivePricePerM2Net * vatMultiplier),

    subtotalNet: round(laborWithMinimumNet),
    subtotalGross: round(laborWithMinimumNet * vatMultiplier),

    minimumApplied,

    wasteDisposalLabelNO: wasteLabelNO,
    wasteDisposalNet: round(wasteNet),
    wasteDisposalGross: round(wasteNet * vatMultiplier),

    totalNet: round(totalNet),
    totalGross: round(totalGross),

    currency: cfg.meta.currency,
  };
}