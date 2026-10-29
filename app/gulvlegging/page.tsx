import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import TrustStrip from "@/app/TrustStrip";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/siteConfig";
import flooringImage from "@/public/bg_01.jpg";

export const metadata = createPageMetadata({
  title: "Gulvlegging i Oslo, Bærum og Asker | Laskowski Bygg",
  description:
    "Trenger du gulvlegger i Oslo, Bærum eller Asker? Vi legger parkett, laminat, vinyl, fiskebensparkett og heltre. Kontakt Laskowski Bygg for gratis befaring.",
  pathname: "/gulvlegging",
});

const services = [
  {
    title: "Parkett",
    description:
      "Parkett gir en overflate av ekte tre og finnes i flere formater og uttrykk. Vi legger både klikkparkett og limt parkett. Valg av metode avhenger av produktet, undergulvet og rommene gulvet skal legges i.",
  },
  {
    title: "Laminat",
    description:
      "Laminat er et alternativ for deg som ønsker et slitesterkt gulv med treuttrykk. Når vi skal legge laminat, tilpasses bordene ved vegger, døråpninger og overganger. Kravene til underlag og montering følger det valgte produktet.",
  },
  {
    title: "Vinylgulv",
    description:
      "Vi monterer vinylgulv med klikksystem. Et plant undergulv og riktig underlag er viktig også for vinyl. Vi vurderer forutsetningene før legging, slik at gulvet monteres etter produsentens anvisninger.",
  },
  {
    title: "Heltre",
    description:
      "Heltregulv består av massive trebord. Treets bevegelser og kravene til innfesting må tas med i planleggingen. Vi vurderer gulvet og underlaget på befaring før vi avtaler monteringsmetode og omfang.",
  },
];

const steps = [
  { title: "Første kontakt", description: "Fortell hvor boligen ligger, omtrent hvor stort areal det gjelder og hvilken type gulv du ønsker. Si gjerne fra om gammelt gulv skal fjernes." },
  { title: "Vurdering og tilbud", description: "På befaring ser vi på gulvtype, undergulv, rom og detaljer. Du får et tilbud med avtalt arbeidsomfang og tidsplan." },
  { title: "Forberedelser", description: "Rommet tømmes for møbler før oppstart. Fjerning av gammelt gulv, montering av underlag og eventuell avretting utføres når dette er avtalt." },
  { title: "Legging av gulvet", description: "Vi legger gulvet etter valgt mønster og monteringsmetode. Retning, tilpasninger og overganger planlegges ut fra rommene og produktets leggeanvisning." },
  { title: "Lister og avslutninger", description: "Vi tilpasser avslutninger ved vegger og døråpninger. Montering av gulvlister inngår når det er en del av tilbudet." },
  { title: "Kontroll og overlevering", description: "Til slutt går vi gjennom resultatet, kontrollerer avslutningene og rydder arbeidsområdet. Eventuell bortkjøring av avfall avtales som en egen del av oppdraget." },
];

const details = [
  { title: "Flytende eller limt gulv", description: "Et flytende gulv ligger uten å være festet til undergulvet. Ved helliming festes gulvet til underlaget med lim. Klikksystem beskriver sammenføyningen mellom bordene; riktig leggemetode avgjøres av gulvproduktet og konstruksjonen." },
  { title: "Undergulv og forberedelser", description: "Undergulvet må være tilstrekkelig plant, tørt, rent og stabilt for gulvet som skal legges. Vi vurderer behovet for forberedelser og avretting. Krav til planhet, fukt og eventuelt underlag følger produsentens anvisninger." },
  { title: "Bevegelsesfuger", description: "Gulv kan bevege seg når temperatur og luftfuktighet endres. Særlig flytende gulv trenger bevegelsesrom ved vegger og faste bygningsdeler. Avstander og eventuelle oppdelinger tilpasses gulvtypen, romstørrelsen og leggeanvisningen." },
  { title: "Overganger mellom rom", description: "Døråpninger, ulike gulvhøyder og sammenhengende gulvflater må vurderes før legging. Overgangsprofiler eller bevegelsesfuger kan være nødvendige. Løsningen skal passe både rommene og de tekniske kravene til gulvet." },
  { title: "Montering av gulvlister", description: "Gulvlister gir en ryddig avslutning mellom gulv og vegg. Vi monterer nye lister og tilpasser hjørner og skjøter. Ved flytende gulv må listene monteres slik at gulvets bevegelse ikke låses." },
];

const questions = [
  { question: "Hva koster gulvlegging i Oslo?", answer: "Arbeidsprisen påvirkes av gulvtype, areal, leggemønster og behovet for forberedelser. Riving, avretting, lister og avfallshåndtering kan også påvirke totalen. Priskalkulatoren på prissiden gir et veiledende estimat for arbeid; endelig pris avtales etter befaring." },
  { question: "Hvor lang tid bør jeg sette av til nytt gulv?", answer: "Det avhenger av antall rom, tilpasninger, mønster og undergulvets tilstand. Forberedelser og eventuell tørketid kan påvirke fremdriften. Vi avtaler en tidsplan når arbeidsomfanget er avklart, slik at du kan planlegge tømming og bruk av rommene." },
  { question: "Kan dere legge både parkett, laminat og vinyl?", answer: "Ja. Vi utfører parkettlegging med klikk eller lim, laminatlegging og montering av klikkvinyl. Vi legger også fiskebensparkett og heltregulv. Send gjerne navnet på gulvproduktet du vurderer, slik at vi kan avklare monteringen." },
  { question: "Kan dere fjerne det gamle gulvet før legging?", answer: "Fjerning av gammelt gulv kan tas med i oppdraget. Gi beskjed om hva som ligger der i dag, slik at arbeidet kan vurderes på befaring. Bortkjøring og avfallshåndtering avklares separat i tilbudet." },
  { question: "Må undergulvet være helt jevnt?", answer: "Undergulvet må oppfylle kravene til planhet for det valgte gulvet. Det betyr ikke nødvendigvis at hele rommet må være i vater. Ujevnheter må vurderes før montering, og nødvendig avretting avtales før gulvet legges." },
  { question: "Tar dere gulvoppdrag i både Bærum og Asker?", answer: "Ja, Oslo, Bærum og Asker er en del av området vi betjener. Oppgi hvor boligen ligger og hva du ønsker å få lagt, så avklarer vi befaring og videre planlegging. For nærliggende områder kan du kontakte oss for å avklare oppdraget." },
];

export default function GulvleggingPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#1E1E1E]">
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-20">
          <nav aria-label="Brødsmuler" className="mb-8 text-sm text-gray-600">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Forside</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Gulvlegging</li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="min-w-0">
              <h1 className="text-4xl lg:text-5xl font-semibold leading-tight [overflow-wrap:anywhere]">
                Gulvlegging i Oslo – profesjonell legging av gulv
              </h1>
              <p className="mt-5 text-lg text-gray-600">
                Trenger du en gulvlegger i Oslo, Bærum eller Asker? {siteConfig.companyName} utfører gulvlegging og parkettlegging i leiligheter og hus – fra rett legging av klikkgulv til presis tilpasning av fiskebensparkett.
              </p>
              <p className="mt-4 text-gray-600">
                Vi legger vekt på håndverket fra undergulv til siste list. Du får gratis befaring, et ryddig tilbud og en plan for arbeidet som skal utføres.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Be om tilbud på gulvlegging</Link>
                <Link href="/priser#pris" className="inline-block border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm">Beregn pris</Link>
              </div>
            </div>
            <div className="relative min-w-0 rounded-2xl overflow-hidden aspect-[4/3] border border-gray-200 bg-[#F5F3EF]">
              <Image src={flooringImage} alt="Tregulv med rette bord gjennom stue og spiseplass" fill priority sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1152px) calc((100vw - 96px) / 2), 528px" className="object-cover" />
            </div>
          </div>
        </section>

        <TrustStrip />

        <section aria-labelledby="gulvtyper" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="gulvtyper" className="text-3xl font-semibold">Hvilket gulv skal du legge?</h2>
          <p className="mt-3 text-gray-600 max-w-3xl">Gulvtype, romløsning og leggemønster påvirker både uttrykket og arbeidet. Vi hjelper med selve monteringen, enten du skal legge parkett, fornye med laminat eller velge et mer krevende mønster.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <article className="md:col-span-2 bg-[#F5F3EF] border border-gray-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-semibold">Fiskebensparkett – presisjon i mønsteret</h3>
              <p className="mt-3 text-gray-600 max-w-3xl">Fiskebensparkett gir rommet et tydelig særpreg. Mønsteret krever nøye planlegging av startlinje, retning og tilpasninger langs veggene. Vi har praktisk erfaring med fiskebenslegging og legger vekt på jevne linjer og gjennomarbeidede avslutninger.</p>
              <p className="mt-3 text-gray-600 max-w-3xl">Monteringsmetoden avhenger av produktet. På befaring avklarer vi undergulv, rom og detaljer før arbeidet prises.</p>
              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <Link href="/fiskebensparkett" className="underline underline-offset-4">Les mer om legging av fiskebensparkett</Link>
                <Link href="/#referanser" className="underline underline-offset-4">Se bilder av gulvarbeid</Link>
              </div>
            </article>
            {services.map((service) => (
              <article key={service.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-gray-600">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="arbeidsprosess" className="bg-[#F5F3EF] border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 id="arbeidsprosess" className="text-3xl font-semibold">Fra første kontakt til ferdig gulv</h2>
            <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((step, index) => (
                <li key={step.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <span aria-hidden="true" className="text-sm text-gray-500">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-3 text-gray-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="gulvdetaljer" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="gulvdetaljer" className="text-3xl font-semibold">Detaljene som må være på plass</h2>
          <p className="mt-3 max-w-3xl text-gray-600">God gulvlegging handler også om det som ligger under gulvet og hvordan det møter resten av boligen. Derfor avklarer vi disse punktene før montering.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-8">
            {details.map((detail) => (
              <div key={detail.title}>
                <h3 className="text-lg font-semibold">{detail.title}</h3>
                <p className="mt-3 text-gray-600">{detail.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="omrade" className="bg-[#F5F3EF] border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 id="omrade" className="text-3xl font-semibold">Gulvlegger for Oslo, Bærum og Asker</h2>
            <p className="mt-4 max-w-3xl text-gray-600">Vi har base i {siteConfig.city} og tar oppdrag med gulvlegging i Oslo, Bærum, Asker og nærliggende områder. Enten du skal skifte gulv i ett rom eller legge nytt gulv gjennom flere rom, vurderer vi omfanget og forutsetningene sammen med deg.</p>
            <p className="mt-4 max-w-3xl text-gray-600">Send oss omtrent antall kvadratmeter, ønsket gulvtype og hvor boligen ligger. Opplysninger om etasje, adkomst og eksisterende gulv hjelper oss å forberede befaringen.</p>
            <Link href="/#kontakt" className="inline-block mt-8 bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Avtal gratis befaring</Link>
          </div>
        </section>

        <section aria-labelledby="relatert" className="max-w-6xl mx-auto px-6 pt-20">
          <h2 id="relatert" className="text-3xl font-semibold">Se priser og tidligere arbeid</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { href: "/", title: "Parkettlegging", description: "Les om parkettlegging og bli kjent med Laskowski Bygg." },
              { href: "/priser", title: "Priskalkulator", description: "Få et veiledende prisestimat for arbeid ut fra gulvtype, areal og tilvalg." },
              { href: "/prosjekter", title: "Gulvprosjekter", description: "Besøk prosjektoversikten og finn veien til bildegalleriet." },
            ].map((item) => (
              <div key={item.href} className="border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold"><Link href={item.href} className="underline underline-offset-4">{item.title}</Link></h3>
                <p className="mt-3 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="sporsmal" className="max-w-6xl mx-auto px-6 py-20">
          <h2 id="sporsmal" className="text-3xl font-semibold">Spørsmål om gulvlegging</h2>
          <div className="mt-10 divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {questions.map((item) => (
              <details key={item.question} className="px-6">
                <summary className="py-5 cursor-pointer"><h3 className="inline font-medium">{item.question}</h3></summary>
                <p className="pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Be om tilbud</Link>
            <a href={`tel:${siteConfig.phoneE164}`} className="text-sm underline underline-offset-4">Ring {siteConfig.phoneDisplay}</a>
          </div>
        </section>
      </main>
    </>
  );
}
