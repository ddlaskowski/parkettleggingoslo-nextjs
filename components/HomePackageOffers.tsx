import Image from "next/image";
import Link from "next/link";
import { packageProducts, packageTerms } from "@/lib/packageProducts";
import { formatPackagePrice } from "@/lib/packagePricing";

/** A server-rendered introduction; selections and calculation stay on the offer page. */
export default function HomePackageOffers() {
  return (
    <section id="parkettpakker" aria-labelledby="home-package-title" className="border-y border-gray-200 bg-[#F5F3EF]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 id="home-package-title" className="text-3xl font-semibold">Parkett med levering og montering</h2>
        <p className="mt-4 max-w-3xl text-gray-600">To utvalgte gulv. Én samlet pris for parkett, transport helt inn i boligen og profesjonell montering.</p>
        <p className="mt-4 text-sm font-medium">Minimum {packageTerms.minimumAreaM2} m². Prisene inkluderer {packageTerms.vatRate * 100} % mva. og nødvendig materialtillegg.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {packageProducts.map((product) => {
            const image = product.images[0];
            return (
              <article key={product.id} className="min-w-0 rounded-2xl border border-gray-200 bg-white">
                <Link href="/parkett-med-montering" aria-label={`Se ${product.name} med levering og montering`} className="group flex h-full flex-col rounded-2xl transition-colors hover:bg-white/70 motion-reduce:transition-none">
                  <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-[#F5F3EF]">
                    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 80px) / 2), 536px" loading="lazy" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <h3 className="mt-3 text-xl font-semibold [overflow-wrap:anywhere]">{product.name}</h3>
                    <div className="mt-auto pt-5">
                      <p className="text-2xl font-semibold">{formatPackagePrice(product.pricePerM2)}<span className="text-base font-normal">/m² inkl. mva.</span></p>
                      <span className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-[#805B36] underline-offset-4 group-hover:underline">Se gulvpakken →</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-6 max-w-3xl text-sm text-gray-600">Underlag, gulvlister, montering av lister og klargjøring av undergulvet vurderes og prises separat. Pakkeprisen er veiledende; endelig tilbud bekreftes etter vurdering av prosjektet.</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href="/parkett-med-montering" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#C69C6D] px-6 py-3 text-sm text-[#1E1E1E] hover:bg-[#B68655]">Se parkett og beregn pris</Link>
          <Link href="/#pris" className="inline-flex min-h-11 items-center text-sm text-[#805B36] underline underline-offset-4">Har du eget gulv? Beregn kun arbeidspris</Link>
        </div>
      </div>
    </section>
  );
}
