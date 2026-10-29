import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";
import herringboneImage from "@/public/work/parkettleggingoslo_01.jpg";
import transitionImage from "@/public/work/parkettleggingoslo_03.jpg";
import roomImage from "@/public/work/parkettleggingoslo_07.jpg";

export const metadata = createPageMetadata({
  title: "Fiskebensparkett i Oslo – profesjonell legging | Laskowski Bygg",
  description:
    "Vi legger fiskebensparkett og fiskebenslaminat i Oslo, Bærum og Asker. Få vurdert produkt, undergulv og leggemønster. Kontakt oss for gratis befaring.",
  pathname: "/fiskebensparkett",
  image: {
    url: "/work/parkettleggingoslo_01.jpg",
    alt: "Lyst fiskebensgulv gjennom to rom",
    width: 1080,
    height: 608,
  },
});

const priceFactors = [
  { title: "Areal og romgeometri", text: "Antall kvadratmeter må ses sammen med rommenes form. Flere små rom, nisjer og døråpninger gir andre tilpasninger enn én åpen flate." },
  { title: "Materiale og leggemetode", text: "Stavformat, sammenføyning og produktets monteringskrav påvirker arbeidet. Et flytende klikksystem og et gulv som skal hellimes, krever ulike arbeidsoperasjoner." },
  { title: "Undergulv og forarbeid", text: "Fjerning av gammelt gulv, avretting og andre nødvendige forberedelser vurderes før legging. Omfanget avklares på befaring og tas med i tilbudet når det er aktuelt." },
  { title: "Kutt og avslutninger", text: "Tilpasninger langs vegger, overganger mellom rom, eventuell innramming og montering av lister påvirker tidsbruken. Detaljene bør derfor avklares før pris avtales." },
];

const steps = [
  { title: "Vurdering", text: "Vi avklarer areal, rom og ønsket gulvprodukt på befaring. Eksisterende gulv og undergulv vurderes som del av planleggingen." },
  { title: "Planlegging", text: "Vi gjennomgår produktets leggeanvisning og avtaler metode, omfang og tidsplan. Retning, stavformat og eventuelle rammer ses i sammenheng med rommene." },
  { title: "Forberedelser", text: "Avtalt riving, rengjøring og nødvendig klargjøring av undergulvet utføres før montering. Eventuell avretting og tørketid må tas med i fremdriften." },
  { title: "Oppmerking og linjeføring", text: "Startlinjer og plasseringen av mønsteret planlegges før gulvet legges videre. Siktlinjer gjennom døråpninger og tilpasninger ved vegger får særlig oppmerksomhet." },
  { title: "Legging", text: "Stavene monteres etter produktets system, flytende eller limt når dette er foreskrevet. Retning og sammenføyninger kontrolleres underveis." },
  { title: "Avslutning og kontroll", text: "Vi utfører avtalte overganger og listarbeid, kontrollerer avslutningene og rydder arbeidsområdet før overlevering." },
];

const questions = [
  { question: "Hva koster det å legge fiskebensparkett?", answer: "Prisen avhenger av areal, produkt, monteringsmetode og undergulv. Rom med mange hjørner og overganger, eller ønsker om ramme og nye lister, kan gi mer arbeid. Bruk priskalkulatoren på prissiden med mønsteret Fiskeben for et veiledende arbeidsestimat. Endelig pris avtales etter befaring." },
  { question: "Kan fiskebensparkett legges flytende?", answer: "Ja, det finnes fiskebensprodukter som er utviklet for flytende legging. Gulvet ligger da uten å være festet til undergulvet. Produktets krav til sammenføyning, underlag og bevegelsesfuger må følges. Det betyr ikke at alle fiskebensgulv kan monteres på denne måten." },
  { question: "Må fiskebensparkett alltid limes?", answer: "Nei. Noen produkter skal hellimes, mens andre er laget for flytende montering. Vi avklarer metoden ut fra det konkrete produktet, produsentens anvisning og undergulvet. Et produkt som krever helliming, skal ikke behandles som et flytende gulv." },
  { question: "Hva er forskjellen på fiskeben og chevron?", answer: "I tradisjonelt fiskeben møtes rektangulære staver med kortenden mot langsiden i rett vinkel. Det gir et forskjøvet sikksakkmønster. Chevron har skråkappede ender som møtes ende mot ende i en sammenhengende V-form. Mønstrene krever ulike produkter og oppsett." },
  { question: "Kan man legge fiskebensgulv på gulvvarme?", answer: "Det kan være mulig når det valgte gulvet og monteringssystemet er godkjent for den aktuelle gulvvarmen. Krav til underlag, fukt, temperatur og bruk av varmeanlegget må avklares i produktdokumentasjonen. Oppgi hvilken gulvvarme du har når du tar kontakt; mønsteret alene sier ikke om løsningen passer." },
  { question: "Hvor lang tid tar legging av fiskebensparkett?", answer: "Tidsbruken avhenger av areal, stavformat, romform, monteringsmetode og forarbeid. Oppmerking, kutt og detaljer krever planlegging, og eventuell avretting eller limherding kan påvirke fremdriften. Vi avtaler tidsplan etter at produkt og arbeidsomfang er avklart." },
  { question: "Kan man få fiskebensmønster i laminat?", answer: "Ja, det finnes laminatprodukter beregnet for fiskebenslegging. De gir et treuttrykk, men er et annet materiale enn parkett med overflate av ekte tre. Velg et produkt utviklet for mønsteret; vanlig plankelaminat kan ikke uten videre legges som fiskeben." },
];

export default function FiskebensparkettPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#1E1E1E]">
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <nav aria-label="Brødsmuler" className="mb-8 text-sm text-gray-600">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Forside</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Fiskebensparkett</li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight [overflow-wrap:anywhere]">Fiskebensparkett i Oslo – profesjonell legging</h1>
              <p className="mt-5 text-lg text-gray-600">Et tydelig mønster begynner med gjennomtenkte linjer. {siteConfig.companyName} utfører legging av fiskebensparkett i Oslo, Bærum og Asker, med vekt på planlegging, presise tilpasninger og ryddige avslutninger.</p>
              <p className="mt-4 text-gray-600">Skal du legge fiskebensparkett eller laminat i fiskebensmønster? Vi vurderer produktet og undergulvet før vi avtaler hvordan gulvet skal monteres.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Be om tilbud på fiskebensgulv</Link>
                <Link href="#prisfaktorer" className="inline-block border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm">Hva påvirker prisen?</Link>
              </div>
            </div>
            <figure className="min-w-0">
              <Image src={herringboneImage} alt="Lyst fiskebensgulv med mønster som fortsetter gjennom en døråpning" priority sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 96px) / 2), 528px" className="w-full h-auto rounded-2xl border border-gray-200" />
              <figcaption className="mt-3 text-sm text-gray-600">Linjeføring gjennom rom og tilpasning ved vegger.</figcaption>
            </figure>
          </div>
        </section>

        <section aria-labelledby="monster" className="bg-[#F5F3EF] border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">
            <div>
              <h2 id="monster" className="text-3xl font-semibold">Ett mønster, flere materialer</h2>
              <p className="mt-4 text-gray-600">Fiskeben er et leggemønster. Rektangulære staver møtes vinkelrett, med kortenden mot langsiden, og danner et forskjøvet sikksakkmønster. Stavformat og leggeretning påvirker hvordan gulvet oppleves i rommet.</p>
              <p className="mt-4 text-gray-600">Fiskebensparkett har en overflate av ekte tre, men fiskebensmønster finnes også i laminat. Materialet og produktets oppbygning må skilles fra selve mønsteret når gulv og leggemetode velges.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold">Fiskeben og chevron</h3>
              <p className="mt-4 text-gray-600">Tradisjonelt fiskeben bruker rektangulære staver med rette ender. I chevron er endene skråkappet og møtes ende mot ende, slik at det dannes en sammenhengende V-form.</p>
              <p className="mt-4 text-gray-600">Send gjerne et bilde av uttrykket du ønsker. Da kan vi avklare mønsteret før produkt og arbeidsomfang planlegges.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="leggemetoder" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="leggemetoder" className="text-3xl font-semibold">Flytende eller limt fiskebensgulv?</h2>
          <p className="mt-4 max-w-3xl text-gray-600">Begge løsninger finnes, men metoden kan ikke velges uavhengig av produktet. Vi tar utgangspunkt i produsentens leggeanvisning og vurderer forholdene i boligen.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <article className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold">Flytende legging</h3>
              <p className="mt-3 text-gray-600">Et flytende gulv festes ikke til undergulvet. Det finnes fiskebenssystemer med klikksammenføyning som er beregnet for denne metoden. Riktig underlag og bevegelsesrom ved vegger, faste bygningsdeler og eventuelle oppdelinger må ivaretas.</p>
            </article>
            <article className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-semibold">Helliming</h3>
              <p className="mt-3 text-gray-600">Ved helliming festes gulvet til undergulvet med egnet lim. Underlaget må oppfylle kravene til blant annet planhet, fukt, renhet og fasthet. Valg av lim, klargjøring og herdetid følger anvisningene for gulvet og limsystemet.</p>
            </article>
          </div>
          <p className="mt-6 max-w-3xl text-gray-600">At et gulv har klikksystem, betyr ikke at det også kan limes. Tilsvarende skal et gulv beregnet for helliming ikke legges flytende uten at produsenten uttrykkelig tillater det.</p>
        </section>

        <section aria-labelledby="materialer" className="max-w-6xl mx-auto px-6 pb-20">
          <h2 id="materialer" className="text-3xl font-semibold">Parkett eller laminat i fiskebensmønster</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold">Parkett med overflate av tre</h3>
              <p className="mt-3 text-gray-600">Lamellparkett har en oppbygning av flere lag og en overflate av ekte tre. Tresort, sortering og overflatebehandling gir ulike uttrykk. Det finnes forskjellige fiskebenssystemer; monteringen avklares for produktet du vurderer.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Fiskebenslaminat</h3>
              <p className="mt-3 text-gray-600">Laminat har en dekoroverflate som kan gjengi treets utseende. Fiskebenslaminat må være utviklet for dette mønsteret og monteres med produktets sammenføyningssystem. Det er et eget materialvalg, selv om uttrykket kan minne om parkett.</p>
            </div>
          </div>
          <Link href="/gulvlegging" className="inline-block mt-8 text-sm underline underline-offset-4">Les om gulvlegging og andre gulvtyper</Link>
        </section>

        <section aria-labelledby="prisfaktorer" className="bg-[#F5F3EF] border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 id="prisfaktorer" className="text-3xl font-semibold">Hva påvirker prisen på fiskebensparkett?</h2>
            <p className="mt-4 max-w-3xl text-gray-600">For deg som sammenligner pris på legging av fiskebensparkett, er det viktig å se på hele arbeidsomfanget. Materialkjøp og monteringsarbeid er ulike kostnader. Kalkulatoren på prissiden gir et veiledende estimat for arbeid.</p>
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {priceFactors.map((factor) => (
                <div key={factor.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold">{factor.title}</h3>
                  <p className="mt-3 text-gray-600">{factor.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/priser#pris" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Beregn veiledende arbeidspris</Link>
              <p className="max-w-lg text-sm text-gray-600">Velg aktuell gulvtype og mønsteret «Fiskeben». Endelig pris avtales etter befaring.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="gulvarbeid" className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h2 id="gulvarbeid" className="text-3xl font-semibold">Detaljer fra utført gulvarbeid</h2>
            <p className="mt-4 text-gray-600">Et fiskebensgulv skal fungere både som helhet og i møtet med resten av boligen. Her viser vi bilder fra det eksisterende bildegalleriet, med vekt på mønster og overganger.</p>
          </div>
          {/* Add verified project records here when project facts and photo grouping are supplied. */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <figure>
              <Image src={transitionImage} alt="Fiskebensmønster med tilpasset avslutning ved en døråpning og nivåforskjell" sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 72px) / 2), 540px" className="w-full h-auto rounded-2xl border border-gray-200" />
              <figcaption className="mt-3 text-sm text-gray-600">Tilpasning ved en overgang mellom gulvflater.</figcaption>
            </figure>
            <figure>
              <Image src={roomImage} alt="Fiskebensgulv foran bokhyller og en glassdør" sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 72px) / 2), 540px" className="w-full h-auto rounded-2xl border border-gray-200" />
              <figcaption className="mt-3 text-sm text-gray-600">Mønster og retning sett i sammenheng med rommet.</figcaption>
            </figure>
          </div>
          <Link href="/#referanser" className="inline-block mt-8 text-sm underline underline-offset-4">Se flere bilder på forsiden</Link>
          <Link href="/prosjekter" className="inline-block mt-4 md:ml-6 text-sm underline underline-offset-4">Til prosjektoversikten</Link>
        </section>

        <section aria-labelledby="prosess" className="bg-[#F5F3EF] border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 id="prosess" className="text-3xl font-semibold">Fra planlegging til siste list</h2>
            <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <li key={step.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <span aria-hidden="true" className="text-sm text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-gray-600">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="sporsmal" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="sporsmal" className="text-3xl font-semibold">Spørsmål om fiskebensgulv</h2>
          <div className="mt-10 divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {questions.map((item) => (
              <details key={item.question} className="px-6">
                <summary className="py-5 cursor-pointer"><h3 className="inline font-medium">{item.question}</h3></summary>
                <p className="pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="foresporsel" className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-[#F5F3EF] border border-gray-200 rounded-3xl p-6 md:p-10">
            <h2 id="foresporsel" className="text-3xl font-semibold">Planlegger du et fiskebensgulv?</h2>
            <p className="mt-4 max-w-3xl text-gray-600">Vi tar oppdrag i Oslo, Bærum, Asker og nærliggende områder. Fortell oss omtrent hvor mange kvadratmeter du vil legge, hvor boligen ligger, hvilket materiale du vurderer og om du ønsker tradisjonelt fiskeben eller et annet mønster.</p>
            <p className="mt-4 max-w-3xl text-gray-600">Har du bilder av rommet eller det eksisterende gulvet, kan du sende dem på e-post. Oppgi gjerne produktnavn eller lenke til gulvet du vurderer. Det gir et bedre utgangspunkt for befaring og tilbud.</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Avtal gratis befaring</Link>
              <a href={`mailto:${siteConfig.email}`} className="text-sm underline underline-offset-4">Send bilder på e-post</a>
              <a href={`tel:${siteConfig.phoneE164}`} className="text-sm underline underline-offset-4">Ring {siteConfig.phoneDisplay}</a>
            </div>
            <Link href="/" className="inline-block mt-8 text-sm text-gray-600 underline underline-offset-4">Mer om parkettlegging og Laskowski Bygg</Link>
          </div>
        </section>
      </main>
    </>
  );
}
