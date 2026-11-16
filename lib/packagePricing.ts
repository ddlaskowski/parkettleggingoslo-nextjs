import { getPackageProduct, packageTerms, type PackageProduct } from "./packageProducts";

export type PackageCalculation =
  | { valid: false; error: string }
  | { valid: true; product: PackageProduct; areaM2: number; total: number };

const nok = new Intl.NumberFormat("nb-NO", {
  style: "currency", currency: "NOK", maximumFractionDigits: 0, minimumFractionDigits: 0,
});

export function formatPackagePrice(amount: number): string {
  return nok.format(amount);
}

/** Independent of the installation-only engine. Never rounds or adjusts the area. */
export function calculatePackage(productId: string, areaInput: string): PackageCalculation {
  const product = getPackageProduct(productId);
  if (!product) return { valid: false, error: "Velg et gulv for å beregne pakkeprisen." };
  if (areaInput === "") return { valid: false, error: "Oppgi arealet i hele kvadratmeter." };
  if (!/^\d+$/.test(areaInput)) {
    return { valid: false, error: "Bruk bare hele kvadratmeter, uten komma, punktum eller minus. Arealet avrundes ikke." };
  }
  const areaM2 = Number(areaInput);
  if (areaM2 < packageTerms.minimumAreaM2) {
    return { valid: false, error: `Minstearealet er ${packageTerms.minimumAreaM2} m². Oppgi minst ${packageTerms.minimumAreaM2} hele kvadratmeter.` };
  }
  const total = areaM2 * product.pricePerM2;
  if (!Number.isSafeInteger(areaM2) || !Number.isSafeInteger(total)) {
    return { valid: false, error: "Arealet er for stort til å beregnes her. Kontakt oss for en vurdering." };
  }
  return { valid: true, product, areaM2, total };
}

export function createPackageSummary(result: PackageCalculation): string | null {
  if (!result.valid) return null;
  return [
    "Forespørsel: Parkett med levering og montering",
    `Produkt: ${result.product.name}`,
    `Areal: ${result.areaM2} m²`,
    `Pris per m²: ${formatPackagePrice(result.product.pricePerM2)} inkl. 25 % mva.`,
    `Veiledende pakkepris inkl. 25 % mva.: ${formatPackagePrice(result.total)}`,
    `Inkludert: ${result.product.included.join("; ")}`,
    `Ikke inkludert: ${packageTerms.excluded.join("; ")}. Tillegg vurderes og prises separat.`,
    "Endelig tilbud bekreftes etter vurdering av prosjektforholdene.",
  ].join("\n");
}
