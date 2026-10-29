import Link from "next/link";
import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./pricing.module.css";

export const metadata = createPageMetadata({
  title: "Pris på gulvlegging og parkettlegging | Laskowski Bygg",
  description:
    "Beregn veiledende pris på parkettlegging, laminat, vinyl og fiskebensparkett i Oslo, Bærum og Asker. Se hva som påvirker prisen og be om tilbud.",
  pathname: "/priser",
});

const factors = [
  { title: "Gulvtype og montering", text: "Klikkparkett, limt parkett, laminat, klikkvinyl og heltre har ulike monteringsbehov. Velg riktig gulvtype i kalkulatoren. Estimatet gjelder arbeid; prisen på selve gulvmaterialet må vurderes separat." },
  { title: "Leggemønster", text: "Rett legging, diagonal, fiskeben og andre mønstre krever ulik tidsbruk. Velg mønsteret som passer produktet og prosjektet. Eventuell ramme eller kant er et eget valg der kalkulatoren tilbyr det." },
  { title: "Prosjektets størrelse", text: "Arealet påvirker totalen, og kalkulatoren bruker automatisk mengderabatt ved større arealer. For små oppdrag kan minimumsjobb bli brukt. Dette vises sammen med estimatet." },
  { title: "Undergulv og forberedelser", text: "Tilstanden under gulvet kan påvirke arbeidsomfanget. Montering av underlag og avretting er separate tilvalg. Behovet må vurderes i boligen; å velge et tilvalg erstatter ikke en vurdering av undergulvet." },
  { title: "Gulvlister og detaljer", text: "Montering av gulvlister er et tilvalg. Kalkulatoren bruker en forenklet beregning basert på gulvarealet. Antall hjørner, lengder, overganger og ønsket finish avklares før endelig tilbud." },
  { title: "Fjerning av gammelt gulv", text: "Riving er ikke automatisk inkludert når du velger en gulvtype. Kryss av for fjerning av gammelt gulv dersom dette skal være med i estimatet, og oppgi gjerne hva som ligger der i dag." },
  { title: "Avfallshåndtering", text: "Avfallshåndtering velges separat. Du kan velge ingen, avfall etter legging eller håndtering som også omfatter gammelt gulv. Når fjerning av gammelt gulv slås på, foreslår kalkulatoren det siste alternativet; kontroller at valget passer oppdraget." },
];

const questions = [
  { question: "Hva koster det å legge parkett per m²?", answer: "Det avhenger av om parketten skal klikkes eller limes, arealet, mønsteret og valgte tilvalg. Bruk kalkulatoren med din kombinasjon for å se et arbeidsestimat. Den viste satsen per m² kan avvike fra totalpris delt på areal når minimumsjobb eller avfallshåndtering inngår." },
  { question: "Hvordan får jeg pris fra en gulvlegger i Oslo?", answer: "Velg gulvtype, areal, mønster og aktuelle tilvalg, og trykk «Send forespørsel» under estimatet. Valgene og beregnede beløp fylles inn i kontaktskjemaet nedenfor. Legg til sted og opplysninger om rommene før du sender. Vi vurderer prosjektet og avklarer endelig pris etter befaring i Oslo, Bærum, Asker eller nærliggende områder." },
  { question: "Er fiskebensparkett dyrere å legge enn rett parkett?", answer: "Med samme gulvtype, areal og tilvalg beregner kalkulatoren et mønstertillegg for fiskeben. Totalforskjellen kan påvirkes av minimumsjobb. Startlinjer, mønsterkontroll og flere tilpasninger kan kreve mer arbeid enn rett legging. Velg Fiskeben for å se estimatet for din kombinasjon." },
  { question: "Er montering av gulvlister inkludert i prisen?", answer: "Bare dersom du velger «Gulvlister (montering)». Dette er en forenklet beregning per m² gulvareal, ikke en oppmåling av løpemeter list. Materialer og ønsket etterarbeid må avklares i tilbudet; kalkulatoren beskriver arbeidspriser." },
  { question: "Hva koster det å fjerne gammelt gulv og kjøre bort avfallet?", answer: "Velg «Fjerning av gammelt gulv» for å ta med riving i beregningen. Kontroller deretter alternativet for avfallshåndtering. Riving og bortkjøring er ulike deler av oppdraget. Du kan også velge håndtering av gammelt gulv dersom du demonterer selv. Faktisk omfang avklares før endelig pris." },
  { question: "Er prisene i kalkulatoren inkludert mva.?", answer: "Kalkulatoren starter med visning inkludert mva. Du kan slå av dette valget for å se beløp uten mva. Prisene som fylles inn i kontaktskjemaet følger visningen du har valgt, og totalen merkes med inkl. eller eks. mva." },
  { question: "Er kalkulatorens estimat et bindende tilbud?", answer: "Nei. Estimatet er veiledende og bygger på valgene dine. Undergulv, produktkrav, romgeometri, kutt og avtalte avslutninger kan påvirke sluttprisen. Send forespørselen med relevante opplysninger, så avklarer vi arbeidsomfang og endelig pris etter befaring." },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-[#1E1E1E]">
        <section className="max-w-6xl mx-auto px-6 pt-28 pb-8">
          <nav aria-label="Brødsmuler" className="mb-8 text-sm text-gray-600">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/" className="underline underline-offset-4">Forside</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Priser</li>
            </ol>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">Pris på gulvlegging og parkettlegging</h1>
            <p className="mt-5 text-lg text-gray-600">Hva vil det koste å legge nytt gulv? Gulvmateriale, leggemønster, areal, undergulv og avsluttende arbeid påvirker prisen. Her kan du beregne en veiledende arbeidspris og sende valgene dine til Laskowski Bygg.</p>
            <p className="mt-4 text-gray-600">Vi utfører gulvlegging i Oslo, Bærum, Asker og omegn. Et estimat gir et utgangspunkt for samtalen; endelig pris og arbeidsomfang avtales etter gratis befaring.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="#pris" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Beregn pris på ditt gulv</Link>
              <Link href="#kontakt" className="inline-block border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm">Be om vurdering</Link>
            </div>
          </div>
        </section>

        {/* Reuse the existing state, formatter, calculator and contact form together. */}
        <div className={styles.composition}>
          <HomeClient />
        </div>

        <section aria-labelledby="prisforklaring" className="bg-[#F5F3EF] border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 id="prisforklaring" className="text-3xl font-semibold">Hva påvirker prisen på gulvlegging?</h2>
            <p className="mt-4 max-w-3xl text-gray-600">En pris per m² er mest nyttig når du vet hvilket arbeid den gjelder. Kalkulatoren samler gulvtype, mønster, areal og tilvalg i ett estimat. Tilvalg inngår i den samlede beregningen, mens avfallshåndtering vises som en egen kostnad.</p>
            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {factors.map((factor) => (
                <div key={factor.title} className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold">{factor.title}</h3>
                  <p className="mt-3 text-gray-600">{factor.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="estimat" className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h2 id="estimat" className="text-3xl font-semibold">Fra veiledende estimat til avtalt pris</h2>
            <p className="mt-4 text-gray-600">Estimatet er ikke et bindende tilbud. Det forutsetter at valgene passer gulvproduktet og arbeidet som skal utføres. På befaring vurderer vi undergulvet, adkomst, rommene og detaljene som påvirker monteringen.</p>
            <p className="mt-4 text-gray-600">Oppgi produktnavn hvis du har valgt gulv, og fortell om eksisterende belegg, gulvvarme, overganger og ønsket listarbeid. Vi avklarer hva som inngår, hvilke materialer som trengs og en tidsplan før oppstart.</p>
            <Link href="/gulvlegging" className="inline-block mt-6 text-sm underline underline-offset-4">Les om gulvtyper, undergulv og leggemetoder</Link>
          </div>
        </section>

        <section aria-labelledby="fiskebenspris" className="max-w-6xl mx-auto px-6 pb-20">
          <div className="bg-[#F5F3EF] border border-gray-200 rounded-3xl p-6 md:p-10">
            <h2 id="fiskebenspris" className="text-3xl font-semibold [overflow-wrap:anywhere]">Pris på legging av fiskebensparkett</h2>
            <p className="mt-4 max-w-3xl text-gray-600">Fiskebensmønster krever planlegging av startlinjer og retning, kontroll av mønsteret underveis og tilpasninger langs veggene. Antall kutt og rommenes geometri påvirker arbeidsmengden. Flytende systemer og hellimte produkter har også ulike monteringskrav.</p>
            <p className="mt-4 max-w-3xl text-gray-600">Velg gulvtypen som passer produktet ditt, og mønsteret «Fiskeben» der det tilbys i kalkulatoren. Estimatet gir et utgangspunkt; produkt og undergulv må vurderes før vi avtaler løsningen.</p>
            <Link href="/fiskebensparkett" className="inline-block mt-6 text-sm underline underline-offset-4">Mer om fiskebensparkett, laminat og montering</Link>
          </div>
        </section>

        <section aria-labelledby="prissporsmal" className="max-w-6xl mx-auto px-6 pb-20">
          <h2 id="prissporsmal" className="text-3xl font-semibold">Spørsmål om pris og tilbud</h2>
          <div className="mt-10 divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden bg-white">
            {questions.map((item) => (
              <details key={item.question} className="px-6">
                <summary className="py-5 cursor-pointer"><h3 className="inline font-medium">{item.question}</h3></summary>
                <p className="pb-5 text-gray-600 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="tilbud" className="max-w-6xl mx-auto px-6 pb-20">
          <h2 id="tilbud" className="text-3xl font-semibold">Få en vurdering av ditt gulvprosjekt</h2>
          <p className="mt-4 max-w-3xl text-gray-600">Legg inn valgene dine i kalkulatoren og bruk «Send forespørsel» under estimatet for å fylle inn kontaktskjemaet. Oppgi gjerne sted, omtrent areal og hva som skal gjøres. Har du allerede fylt inn skjemaet, kan du gå tilbake og fullføre forespørselen.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#kontakt" className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm">Til kontaktskjemaet</Link>
            <Link href="#pris" className="inline-block border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm">Tilbake til kalkulatoren</Link>
          </div>
        </section>
      </main>
    </>
  );
}
