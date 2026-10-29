import Link from "next/link";

const services = [
  {
    title: "Parkett (klikk)",
    desc: "Effektiv legging av parkett med klikksystem i leiligheter og hus.",
  },
  {
    title: "Parkett (limt)",
    desc: " Limt parkett for stabil og varig løsning. Anbefales ved høy belastning.",
  },
  {
    title: "Laminat og vinyl",
    desc: "Rask og ryddig montering, perfekt for moderne boliger.",
  },
  {
    title: "Gulvlister",
    desc: "Pent avsluttende lister som gir helhet og et ferdig uttrykk.",
  },
];

export default function Services() {
  return (
    <section id="tjenester" className="max-w-6xl mx-auto px-6 py-20">
      <div>
        <h2 className="text-3xl font-semibold">Tjenester</h2>
        <p className="mt-3 text-gray-600 max-w-3xl mb-8">
          Vi jobber kun med gulv. Parkett, heltre, laminat og vinyl – levert med presisjon og ryddig utførelse
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { number: "01", title: "Gulvlegging", description: "Parkett, laminat, vinyl og heltre.", cta: "Utforsk gulvlegging →", href: "/gulvlegging" },
            { number: "02", title: "Fiskebensparkett", description: "Klassisk fiskeben og moderne mønstre.", cta: "Se fiskebensparkett →", href: "/fiskebensparkett" },
            { number: "03", title: "Priser og prisberegning", description: "Se hva som påvirker prisen på nytt gulv.", cta: "Beregn pris →", href: "/priser" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group min-w-0 flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#C69C6D] hover:bg-[#F5F3EF] focus-visible:border-[#C69C6D] transition-colors motion-reduce:transition-none">
              <span aria-hidden="true" className="text-sm font-medium text-[#805B36]">{item.number}</span>
              <h3 className="mt-3 text-xl font-semibold [overflow-wrap:anywhere]">{item.title}</h3>
              <p className="mt-3 mb-6 text-gray-600">{item.description}</p>
              <span className="mt-auto text-sm font-medium text-[#805B36] group-hover:underline underline-offset-4">{item.cta}</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 transition"
            >
              <div className="font-medium">{s.title}</div>
              <p className="mt-2 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            href="#pris"
            className="inline-block bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm"
          >
            Beregn pris →
          </a>
        </div>
      </div>
    </section>
  );
}
