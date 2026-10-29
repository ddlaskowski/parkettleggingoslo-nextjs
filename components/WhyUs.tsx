import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";

export default function WhyUs() {
  const herringboneProject = getProjectBySlug("limt-eik-fiskeben-ramme-grunerlokka");
  const items = [
    {
      title: "Arbeidsomfang og tilbud",
      desc: "Vi avklarer gulvtype, areal og tilhørende arbeid før vi gir tilbud.",
    },
    {
      title: "Valg av leggemetode",
      desc: "Klikk eller liming vurderes ut fra gulvproduktet og undergulvet.",
    },
    {
      title: "Undergulv og forarbeid",
      desc: "Behovet for fjerning av gammelt gulv og avretting vurderes på befaring.",
    },
    {
      title: "Tilpasninger og avslutninger",
      desc: "Gulvlister, døråpninger og overganger avklares før vi gir tilbud.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold">Hvorfor velge oss</h2>
      <p className="mt-3 text-gray-600 max-w-4xl">
        Vi vurderer undergulvet, leggemetoden og overgangene mellom rommene før arbeidet starter. Gulvlister og avslutninger avklares i tilbudet.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {items.map((x) => (
          <div key={x.title} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="font-medium">{x.title}</div>
            <p className="mt-2 text-gray-600">{x.desc}</p>
          </div>
        ))}
      </div>
      {herringboneProject && (
        <div className="mt-8 max-w-4xl">
          <h3 className="text-xl font-semibold">Erfaring med fiskebensparkett</h3>
          <p className="mt-3 text-gray-600">Et oppdrag på Grünerløkka omfattet eikestaver i fiskeben med ramme, limt til undergulvet. Det er ett av gulvprosjektene du kan lese mer om i porteføljen vår.</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link href={`/prosjekter/${herringboneProject.slug}`} className="underline underline-offset-4">Se fiskebensgulvet med ramme på Grünerløkka →</Link>
            <Link href="/fiskebensparkett" className="underline underline-offset-4">Les om legging av fiskebensparkett →</Link>
          </div>
        </div>
      )}
    </section>
  );
}
