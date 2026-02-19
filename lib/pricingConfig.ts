export type AddOnType = "per_m2" | "fixed";

export type AreaTier = {
  id: string;
  labelNO: string;
  min: number;
  max: number;
  multiplier: number;
};

export type FloorType = {
  id: string;
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
      amount: 5000,
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
      basePricePerM2: 329,
      typicalRange: { min: 299, max: 349 },
      notesNO: "Veiledende pris for standard legging på jevnt underlag.",
    },
    {
      id: "vinyl_click",
      labelNO: "Vinyl (klikk)",
      basePricePerM2: 369,
      typicalRange: { min: 329, max: 399 },
      notesNO: "Veiledende pris. Avretting kan komme i tillegg ved behov.",
    },
    {
      id: "parkett_click",
      labelNO: "Parkett (klikk)",
      basePricePerM2: 549,
      typicalRange: { min: 449, max: 649 },
      notesNO: "Klikk-parkett. Pris avhenger av mønster og romløsning.",
    },
    {
      id: "parkett_limt",
      labelNO: "Parkett (limt)",
      basePricePerM2: 749,
      typicalRange: { min: 550, max: 850 },
      notesNO: "Limt parkett krever mer arbeid og riktig underlag.",
    },
    {
      id: "heltre",
      labelNO: "Heltre / massive trebord",
      basePricePerM2: 1090,
      typicalRange: { min: 850, max: 1250 },
      notesNO: "Heltre er mer krevende – befaring anbefales alltid.",
    },
  ] satisfies FloorType[],

  addOns: [
    {
      id: "remove_old_floor",
      labelNO: "Fjerning av gammelt gulv",
      type: "per_m2",
      price: 99,
      range: { min: 70, max: 130 },
    },
    {
      id: "underlay",
      labelNO: "Underlag (montering)",
      type: "per_m2",
      price: 39,
      range: { min: 25, max: 60 },
    },
    {
      id: "skirting",
      labelNO: "Gulvlister (montering)",
      type: "per_m2",
      price: 99,
      range: { min: 40, max: 80 },
      noteNO: "Forenklet beregning. Endelig pris etter befaring.",
    },
    {
      id: "leveling",
      labelNO: "Avretting (ved behov)",
      type: "per_m2",
      price: 129,
      range: { min: 90, max: 180 },
    },
  ] satisfies AddOn[],

  uiTextNO: {
    title: "Priskalkulator",
    subtitle:
      "Veiledende priser for arbeid. Endelig pris avtales etter gratis befaring.",
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
  floorTypeId: string;
  selectedAddOnIds?: string[];
  includeVat?: boolean;
};

export type EstimateResult = {
  areaM2: number;
  tierId: string;
  tierLabelNO: string;
  floorTypeLabelNO: string;

  // NET / GROSS
  effectivePricePerM2Net: number;
  effectivePricePerM2Gross: number;

  fixedAddOnsNet: number;
  fixedAddOnsGross: number;

  subtotalNet: number;
  subtotalGross: number;

  minimumApplied: boolean;

  totalNet: number;
  totalGross: number;

  currency: string;
};

export function estimatePrice({
  areaM2,
  floorTypeId,
  selectedAddOnIds = [],
  includeVat = false, // zostawiamy, ale UI i tak będzie wybierał co pokazać
}: EstimateInput): EstimateResult {
  const cfg = pricingConfig;

  const floorType = cfg.floorTypes.find((x) => x.id === floorTypeId);
  if (!floorType) throw new Error("Invalid floorTypeId");

  const tier =
    cfg.areaTiers.find((t) => areaM2 >= t.min && areaM2 <= t.max) ??
    cfg.areaTiers[cfg.areaTiers.length - 1];

  const addOns = cfg.addOns.filter((a) => selectedAddOnIds.includes(a.id));

  const addOnsPerM2 = addOns
    .filter((a) => a.type === "per_m2")
    .reduce((sum, a) => sum + a.price, 0);

  const fixedAddOnsNet = addOns
    .filter((a) => a.type === "fixed")
    .reduce((sum, a) => sum + a.price, 0);

  const vatMultiplier =
    cfg.meta.vat.enabled && cfg.meta.vat.rate > 0 ? 1 + cfg.meta.vat.rate : 1;

  const effectivePricePerM2Net =
    (floorType.basePricePerM2 + addOnsPerM2) * tier.multiplier;

  const subtotalNet = effectivePricePerM2Net * areaM2 + fixedAddOnsNet;

  const subtotalWithMinimumNet = Math.max(subtotalNet, cfg.meta.minimumJob.amount);

  const totalNet = subtotalWithMinimumNet;
  const totalGross = subtotalWithMinimumNet * vatMultiplier;

  const effectivePricePerM2Gross = effectivePricePerM2Net * vatMultiplier;

  const fixedAddOnsGross = fixedAddOnsNet * vatMultiplier;

  const subtotalGross = subtotalWithMinimumNet * vatMultiplier;

  const round = (n: number) => Math.round(n);

  return {
    areaM2,
    tierId: tier.id,
    tierLabelNO: tier.labelNO,
    floorTypeLabelNO: floorType.labelNO,

    effectivePricePerM2Net: round(effectivePricePerM2Net),
    effectivePricePerM2Gross: round(effectivePricePerM2Gross),

    fixedAddOnsNet: round(fixedAddOnsNet),
    fixedAddOnsGross: round(fixedAddOnsGross),

    subtotalNet: round(subtotalWithMinimumNet),
    subtotalGross: round(subtotalGross),

    minimumApplied: subtotalNet < cfg.meta.minimumJob.amount,

    totalNet: round(totalNet),
    totalGross: round(totalGross),

    currency: cfg.meta.currency,
  };
}
