import PackageProductGallery from "@/components/PackageProductGallery";
import { packageTerms, type PackageProduct } from "@/lib/packageProducts";
import { formatPackagePrice } from "@/lib/packagePricing";

export default function PackageProductCard({ product, selected, onSelect }: {
  product: PackageProduct;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article aria-labelledby={`product-name-${product.id}`} className={`min-w-0 flex flex-col rounded-2xl border bg-white transition-colors motion-reduce:transition-none ${selected ? "border-[#805B36] ring-1 ring-[#805B36]" : "border-gray-200"}`}>
      <PackageProductGallery product={product} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-sm font-medium text-[#805B36]">{product.manufacturer} · {product.collection}</p>
        <h3 id={`product-name-${product.id}`} className="mt-2 text-xl font-semibold [overflow-wrap:anywhere]">{product.name}</h3>
        <p className="mt-5 text-2xl font-semibold">{formatPackagePrice(product.pricePerM2)}<span className="text-base font-normal">/m²</span></p>
        <p className="mt-1 text-sm text-gray-600">Inkl. 25 % mva., levering og montering fra Laskowski Bygg.</p>
        <p className="mt-2 text-sm text-gray-600">Minste pakkepris: {formatPackagePrice(product.pricePerM2 * packageTerms.minimumAreaM2)} inkl. mva. ({packageTerms.minimumAreaM2} m²)</p>
        <p className="mt-3 text-sm text-gray-600">{product.category}</p>
        <p className="mt-3 text-sm text-gray-600">{product.dimensions.widthMm} × {product.dimensions.lengthMm} mm</p>
        <p className="mt-2 text-sm text-gray-600">Tykkelse: {product.dimensions.thicknessMm.toLocaleString("nb-NO")} mm</p>
        <p className="mt-5 mb-6 text-gray-600 leading-relaxed">{product.description}</p>
        <dl className="divide-y divide-gray-200 border-y border-gray-200 text-sm">{product.specifications.map((spec) => <div key={spec.label} className="py-3"><dt className="font-medium">{spec.label}</dt><dd className="mt-1 text-gray-600">{spec.value}</dd></div>)}</dl>
        <details className="mt-4 text-sm text-gray-600">
          <summary className="flex min-h-11 cursor-pointer items-center font-medium text-[#1E1E1E] underline underline-offset-4">Om bruk, vedlikehold og montering</summary>
          <div className="mt-3 space-y-4"><p><strong className="font-medium text-[#1E1E1E]">Bruk og overflate: </strong>{product.durability}</p><p><strong className="font-medium text-[#1E1E1E]">Vedlikehold: </strong>{product.care}</p><p><strong className="font-medium text-[#1E1E1E]">Montering: </strong>{product.installation}</p><p>Dette er produsentens produktinformasjon. Monteringsmetode og prosjektforhold avklares før vi bekrefter tilbudet.</p></div>
        </details>
        <a href={product.manufacturerUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm text-gray-600 underline underline-offset-4">Se produktinformasjon hos {product.manufacturer} ↗<span className="sr-only"> (åpnes i ny fane)</span></a>
        <div className="mt-auto pt-6">
          <details className="text-sm text-gray-600"><summary className="flex min-h-11 cursor-pointer items-center underline underline-offset-4">Dette er med i pakken</summary><ul className="mt-2 space-y-2">{product.included.map((item) => <li key={item}>— {item}</li>)}</ul><p className="mt-4">Underlag, gulvlister, listmontering og klargjøring av undergulvet inngår ikke.</p></details>
          <label htmlFor={`product-${product.id}`} className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-[#805B36] bg-[#F5F3EF] px-4 py-3">
            <input id={`product-${product.id}`} type="radio" name="package-product" value={product.id} aria-labelledby={`product-name-${product.id}`} checked={selected} onChange={onSelect} className="h-5 w-5 shrink-0 accent-[#805B36]" />
            <span className="text-sm font-medium">{selected ? "Valgt" : "Velg dette gulvet"}<span className="sr-only">: {product.name}</span></span>
          </label>
        </div>
      </div>
    </article>
  );
}
