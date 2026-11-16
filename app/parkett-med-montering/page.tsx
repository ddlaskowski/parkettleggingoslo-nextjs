import Link from "next/link";
import Header from "@/components/Header";
import PackageOfferClient from "@/components/PackageOfferClient";
import ProjectCard from "@/components/ProjectCard";
import { createPageMetadata } from "@/lib/metadata";
import { packageProducts, packageTerms } from "@/lib/packageProducts";
import { formatPackagePrice } from "@/lib/packagePricing";
import { getProjectBySlug } from "@/lib/projects";
import { meisterProjectReferences } from "@/lib/meisterProjectReferences";
import { siteConfig } from "@/lib/siteConfig";

const lowestPrice = Math.min(...packageProducts.map((product) => product.pricePerM2));
const pageUrl = `${siteConfig.url}/parkett-med-montering`;
const title = `Parkett med montering i Oslo – fra ${formatPackagePrice(lowestPrice)}/m² | Laskowski Bygg`;
const description = `Velg mellom to parkettgulv med levering og montering i Oslo, Bærum og Asker. Fra ${formatPackagePrice(lowestPrice)}/m² inkl. mva. Minimum ${packageTerms.minimumAreaM2} m². Beregn pris og be om tilbud.`;

export const metadata = createPageMetadata({ title, description, pathname: "/parkett-med-montering" });

export default function PackagePage() {
  const related = meisterProjectReferences.flatMap(({ slug, imageId }) => {
    const project = getProjectBySlug(slug);
    return project ? [{ project, imageId }] : [];
  });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: title, description, inLanguage: "nb-NO", breadcrumb: { "@id": `${pageUrl}#breadcrumb` } },
      { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Parkett med montering", item: pageUrl },
      ] },
    ],
  };
  return <>
    <Header />
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#1E1E1E]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16 md:pb-20">
        <nav aria-label="Brødsmuler" className="mb-8 text-sm text-gray-600"><ol className="flex flex-wrap items-center gap-2"><li><Link href="/" className="inline-flex min-h-11 items-center underline underline-offset-4">Forside</Link></li><li aria-hidden="true">/</li><li aria-current="page">Parkett med montering</li></ol></nav>
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium text-[#805B36]">Gulv, levering og håndverk i én pakke</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">Parkett levert og montert – fra {formatPackagePrice(lowestPrice)}/m²</h1>
          <p className="mt-6 max-w-3xl text-lg text-gray-600">Velg mellom to utvalgte parkettgulv. Vi ordner materialer, transport helt inn i boligen og profesjonell montering i {packageTerms.serviceAreas.join(", ").replace(", Asker", " og Asker")}.</p>
          <p className="mt-5 font-medium">Minimum {packageTerms.minimumAreaM2} m² · Prisene inkluderer 25 % mva.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#produkter" className="inline-flex min-h-11 items-center rounded-xl bg-[#C69C6D] px-6 py-3 text-sm text-[#1E1E1E] hover:bg-[#B68655]">Velg parkett og beregn pris</Link>
            <Link href="#inkludert" className="inline-flex min-h-11 items-center rounded-xl border border-gray-300 px-6 py-3 text-sm hover:border-gray-500">Se hva som er inkludert</Link>
          </div>
        </div>
      </section>
      <PackageOfferClient>
        <section id="inkludert" aria-labelledby="package-terms-title" className="border-y border-gray-200 bg-[#F5F3EF]">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 id="package-terms-title" className="text-3xl font-semibold">Dette er inkludert – og dette kommer i tillegg</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6"><h3 className="text-xl font-semibold">Med i pakkeprisen</h3><ul className="mt-5 space-y-3 text-gray-700">{packageTerms.included.map((item) => <li key={item}>— {item}</li>)}</ul><p className="mt-6 text-gray-600">Du trenger ikke ordne transport eller bære gulvmaterialene selv. Ordinær transport, trapper, etasjer og innbæring gir ikke ekstra kostnad.</p></div>
              <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-6"><h3 className="text-xl font-semibold">Vurderes og prises separat</h3><ul className="mt-5 space-y-3 text-gray-700">{packageTerms.excluded.map((item) => <li key={item}>— {item}</li>)}</ul><p className="mt-6 text-gray-600">Vi kan anbefale og levere egnet underlag separat. Gulvlister og montering av disse kan også tilbys som tillegg. Behov og pris avklares før arbeidet avtales.</p></div>
            </div>
            <p className="mt-8 max-w-3xl text-gray-600">Undergulvet og produktets monteringskrav må vurderes før oppstart. Nødvendig forarbeid og tilleggsmaterialer er ikke med i grunnpakken. Endelig tilbud bekreftes etter gjennomgang av prosjektet.</p>
          </div>
        </section>
        <section aria-labelledby="package-process-title" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="package-process-title" className="text-3xl font-semibold">Fra gulvvalg til levering og montering</h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[
            ["Velg gulv", "Se forskjellen mellom fiskeben og brede planker, og velg gulvet du ønsker."],
            ["Beregn pakkeprisen", "Oppgi hele kvadratmeter. Beregningen viser en veiledende pris med materialer, levering og montering."],
            ["Send forespørsel", "Legg til kontaktinformasjon, område, rom og opplysninger om undergulvet."],
            ["Bekreft prosjektet", "Vi gjennomgår prosjektforholdene, avklarer eventuelle tillegg og bekrefter det endelige tilbudet."],
            ["Avtal levering og montering", "Vi avtaler fremdrift og ordner henting, transport, innbæring og montering."],
          ].map(([heading, text], index) => <li key={heading} className="min-w-0 rounded-2xl border border-gray-200 p-6"><p className="text-sm text-[#805B36]" aria-hidden="true">0{index + 1}</p><h3 className="mt-3 text-xl font-semibold">{heading}</h3><p className="mt-3 text-gray-600">{text}</p></li>)}</ol>
        </section>
        <section aria-labelledby="package-projects-title" className="max-w-6xl mx-auto px-6 pb-20">
          <h2 id="package-projects-title" className="text-3xl font-semibold">Se våre tidligere Meister-prosjekter</h2>
          <p className="mt-4 max-w-3xl text-gray-600">Vi har erfaring med legging av fiskebensgulv fra Meister. Her ser du tidligere arbeider utført av Laskowski Bygg med tilsvarende gulvtype. Farge og utførelse kan avvike fra Classic Oak 08925. Prosjektene er ikke bekreftet som installasjoner av det nøyaktige produktet i pakken.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">{related.map(({ project, imageId }) => <ProjectCard key={project.id} project={project} imageId={imageId} showDescription />)}</div>
          <p className="mt-5 max-w-3xl text-sm text-gray-600">Leggemetoden i et tidligere prosjekt beskriver det oppdraget. Flytende gulv med lim mellom bordene er ikke det samme som helliming til undergulvet. Classic Oak HS 500 med UniZip monteres etter den gjeldende produsentanvisningen.</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm"><Link href="/prosjekter" className="inline-flex min-h-11 items-center underline underline-offset-4">Se flere prosjekter</Link><Link href="/fiskebensparkett" className="inline-flex min-h-11 items-center underline underline-offset-4">Les om legging av fiskebensparkett</Link><Link href="/priser" className="inline-flex min-h-11 items-center underline underline-offset-4">Har du eget gulv? Beregn arbeidspris</Link></div>
        </section>
      </PackageOfferClient>
    </main>
  </>;
}
