import { packageProducts, packageTerms } from "@/lib/packageProducts";
import { formatPackagePrice, type PackageCalculation } from "@/lib/packagePricing";

export default function PackageCalculator({ productId, area, result, showError, onProductChange, onAreaChange, onAreaBlur, onInquiry }: {
  productId: string;
  area: string;
  result: PackageCalculation;
  showError: boolean;
  onProductChange: (id: string) => void;
  onAreaChange: (value: string) => void;
  onAreaBlur: () => void;
  onInquiry: () => void;
}) {
  return (
    <section id="pakkekalkulator" aria-labelledby="pakkekalkulator-title" className="max-w-6xl mx-auto px-6 pb-20">
      <div className="rounded-3xl border border-gray-200 bg-[#F5F3EF] p-5 sm:p-8 md:p-10">
        <h2 id="pakkekalkulator-title" className="text-3xl font-semibold [overflow-wrap:anywhere]">Beregn veiledende pakkepris</h2>
        <p className="mt-4 max-w-3xl text-gray-600">Velg gulv og oppgi arealet som skal legges. Materialtillegg og innbæring er allerede med i prisen.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="package-calculator-product" className="block text-sm font-medium">Valgt gulv</label>
            <select id="package-calculator-product" value={productId} onChange={(event) => onProductChange(event.target.value)} className="mt-3 min-h-11 w-full min-w-0 rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm">
              <option value="">Velg et gulv</option>
              {packageProducts.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
            </select>
            <label htmlFor="package-area" className="mt-6 block text-sm font-medium">Areal i m² (hele kvadratmeter)</label>
            <input id="package-area" type="text" inputMode="numeric" autoComplete="off" value={area} onChange={(event) => onAreaChange(event.target.value)} onBlur={onAreaBlur} aria-invalid={showError && !result.valid} aria-describedby={`package-area-help${showError && !result.valid ? " package-area-error" : ""}`} className="mt-3 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-4 py-3" placeholder="For eksempel 35" />
            <p id="package-area-help" className="mt-3 text-sm text-gray-600">Minimum {packageTerms.minimumAreaM2} m². Kun hele kvadratmeter, uten komma eller punktum. Vi avrunder ikke arealet.</p>
            {showError && !result.valid && <p id="package-area-error" role="status" className="mt-3 text-sm text-red-700">{result.error}</p>}
            <p className="mt-6 text-sm text-gray-600">Ingen mengderabatt, ekstra svinnberegning eller transporttillegg legges til. Underlag, lister og forarbeid inngår ikke.</p>
          </div>
          <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <div aria-live="polite" aria-atomic="true">
              <p className="text-sm text-gray-600">Veiledende pakkepris inkl. 25 % mva.</p>
              {result.valid ? <>
                <p className="mt-3 text-3xl font-semibold [overflow-wrap:anywhere]">{formatPackagePrice(result.total)}</p>
                <p className="mt-4 font-medium">{result.product.name}</p>
                <p className="mt-2 text-sm text-gray-600">{result.areaM2} m² × {formatPackagePrice(result.product.pricePerM2)}/m² inkl. mva.</p>
              </> : <p className="mt-4 text-gray-600">Velg et gulv og oppgi minst {packageTerms.minimumAreaM2} hele kvadratmeter for å se prisen.</p>}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">{packageTerms.included.map((item) => <li key={item}>— {item}</li>)}</ul>
            <button type="button" disabled={!result.valid} onClick={onInquiry} className="mt-6 min-h-11 w-full rounded-xl bg-[#C69C6D] px-4 py-3 text-sm text-[#1E1E1E] hover:bg-[#B68655] disabled:cursor-not-allowed disabled:opacity-60">Be om tilbud på valgt gulv</button>
            <p className="mt-4 text-sm text-gray-600">Beregningen er veiledende. Endelig tilbud bekreftes etter vurdering av rom, undergulv og prosjektforhold. Eventuelle tillegg avtales separat.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
