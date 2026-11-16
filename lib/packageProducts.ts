export const packageTerms = {
  minimumAreaM2: 10,
  vatRate: 0.25,
  serviceAreas: ["Oslo", "Bærum", "Asker"],
  included: [
    "Valgt gulvmateriale og nødvendig materialtillegg til leggemønsteret",
    "Henting og transport fra leverandør",
    "Levering og innbæring helt inn i leiligheten eller huset",
    "Profesjonell montering",
    "25 % mva.",
  ],
  excluded: [
    "Underlag",
    "Gulvlister",
    "Montering av gulvlister",
    "Klargjøring eller avretting av undergulv",
    "Annet tilleggsarbeid som avtales separat",
  ],
} as const;

export type PackageProductId = "classic-oak" | "select-larvik";

export type PackageProductImage = {
  src: `/sale/${string}`;
  alt: string;
  width: number;
  height: number;
};

export type PackageProduct = {
  id: PackageProductId;
  name: string;
  category: string;
  manufacturer: string;
  collection: string;
  manufacturerUrl: string;
  dimensions: { widthMm: number; lengthMm: number; thicknessMm: number };
  /** Whole NOK per installed square metre, including VAT and material allowance. */
  pricePerM2: number;
  description: string;
  images: readonly [PackageProductImage, ...PackageProductImage[]];
  specifications: readonly { label: string; value: string }[];
  durability: string;
  care: string;
  installation: string;
  included: readonly string[];
};

export const packageProducts: readonly PackageProduct[] = [
  {
    id: "classic-oak",
    name: "Meister Lindura HS 500 Classic Oak",
    category: "Herdet tregulv i fiskebensmønster",
    manufacturer: "MEISTER",
    collection: "Lindura HS 500",
    manufacturerUrl: "https://www.meister.com/en/products/lindura-wood-flooring-hs-500-classic-oak-08925-ultra-matt-lacquered.html",
    dimensions: { widthMm: 140, lengthMm: 700, thicknessMm: 11 },
    pricePerM2: 1490,
    description: "Varm eik i klassisk fiskebensmønster. Børstingen fremhever trestrukturen, mens Classic-sorteringen kombinerer roligere staver med naturlige kvister og variasjon. Den ultramatte lakken gir en dempet overflate.",
    images: [
      { src: "/sale/meister/01.jpg", alt: "Meister Classic Oak i fiskebensmønster i en lys stue med peis og grå lenestoler", width: 1920, height: 1280 },
      { src: "/sale/meister/04.jpg", alt: "Nærbilde av eikestruktur, kvister og fiskebensmønster i Meister Classic Oak", width: 600, height: 848 },
    ],
    specifications: [
      { label: "Treslag og sortering", value: "Eik · Classic" },
      { label: "Oppbygning", value: "Ekte treoverflate, wood-powder-lag og HDF-kjerne" },
      { label: "Overflate", value: "Børstet og ultramatt lakkert · Duratec Nature" },
      { label: "Klikksystem", value: "UniZip" },
    ],
    durability: "Produsenten oppgir bruksklasse 23/32 og en lakkoverflate som motstår flekker og mikroriper. Treoverflaten er likevel ikke ripefri.",
    care: "Støvsug jevnlig. Bruk en lett fuktet mopp og rengjøringsmiddel anbefalt for lakkerte tregulv. Unngå skuremidler, og bruk filt under møbelbein.",
    installation: "Tørt, plant, fast og rent undergulv er nødvendig. Flytende eller hellimt legging må følge produsentens anvisning. Egnet underlag og eventuell fuktsperre avklares før montering. Gulvet er ikke beregnet for våtrom.",
    included: packageTerms.included,
  },
  {
    id: "select-larvik",
    name: "Bjelin Woodura Planks Larvik 3.0 XXL",
    category: "Herdet tregulv med brede planker",
    manufacturer: "Bjelin",
    collection: "Woodura Planks 3.0 · XXL",
    manufacturerUrl: "https://no.bjelin.com/no/shop/gulv--woodura-planks/30087-woodura-planks-larvik-3-0-xxl",
    dimensions: { widthMm: 271, lengthMm: 2378, thicknessMm: 11.2 },
    pricePerM2: 1390,
    description: "Lyse, brede eikeplanker i Powder White med et rolig uttrykk. Select-sorteringen og de lange bordene gir et sammenhengende gulvbilde, mens børstet mattlakk lar trestrukturen komme frem.",
    images: [
      { src: "/sale/bjelin/04.webp", alt: "Bjelin Larvik med lyse brede planker under et spisebord ved et mørkt kjøkken", width: 1600, height: 1200 },
      { src: "/sale/bjelin/07.webp", alt: "Lyse Bjelin Larvik-planker i en gang med siktlinje gjennom flere rom", width: 1600, height: 1200 },
      { src: "/sale/bjelin/05.webp", alt: "Bjelin Larvik foran en kjøkkenøy med tre barkrakker, vist i høydeformat", width: 1977, height: 2971 },
      { src: "/sale/bjelin/06.webp", alt: "Detalj av skjøter og eikestruktur i Bjelin Larvik ved en kjøkkenøy", width: 1600, height: 1200 },
      { src: "/sale/bjelin/08.webp", alt: "Nærbilde av lyse plankeskjøter og årringer i Bjelin Larvik", width: 1600, height: 1200 },
      { src: "/sale/bjelin/01.webp", alt: "Bjelin Larvik sett rett ovenfra med lys eikeoverflate og rette plankeskjøter", width: 1600, height: 1200 },
      { src: "/sale/bjelin/03.webp", alt: "Børstet eikeoverflate i Bjelin Larvik ved beinet på en trestol", width: 1600, height: 1200 },
      { src: "/sale/bjelin/02.webp", alt: "Lys Bjelin Larvik-parkett ved et teppe med en liten hvit hund", width: 1600, height: 1200 },
    ],
    specifications: [
      { label: "Treslag og sortering", value: "Eik · Select" },
      { label: "Oppbygning", value: "Herdet tregulv med ekte eikeoverflate og HDF-kjerne" },
      { label: "Overflate og farge", value: "Børstet mattlakk · Powder White" },
      { label: "Klikksystem", value: "Välinge 5G Dry" },
    ],
    durability: "Den herdede treoverflaten har beskyttende mattlakk. Gulvet kan fortsatt få merker og riper; bruk filt under møbler og tørk opp søl raskt.",
    care: "Bruk hovedsakelig støvsuger eller tørrmopp. Ved behov brukes en lett fuktet mikrofibermopp med nøytralt rengjøringsmiddel. Unngå overdosering og stående vann.",
    installation: "Legges normalt flytende med klikksystem på tørt, plant, fast og rent undergulv. Egnet underlag og fuktbeskyttelse må vurderes. Eventuell helliming krever egne produsentanvisninger. Ved gulvvarme skal overflatetemperaturen ikke overstige 27 °C.",
    included: packageTerms.included,
  },
];

export function getPackageProduct(id: string): PackageProduct | undefined {
  return packageProducts.find((product) => product.id === id);
}
