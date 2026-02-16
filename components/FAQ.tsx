const faqs = [
  { q: "Hva påvirker prisen mest?", a: "Areal (m²), type gulv, underlag og antall kutt/overganger." },
  { q: "Må dere komme på befaring?", a: "Ja – for limt parkett/heltre anbefales befaring alltid. For klikk kan vi ofte gi estimat først." },
  { q: "Tar dere små oppdrag?", a: "Ja, men vi har minimumsjobb for små arealer (rigg/oppmøte)." },
  { q: "Hvor lang tid tar jobben?", a: "Vanligvis 1–3 dager avhengig av størrelse og kompleksitet." },
  { q: "Hvilke områder dekker dere?", a: "Oslo, Bærum, Asker og omegn." },
];

export default function FAQ() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold">Ofte stilte spørsmål</h2>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {faqs.map((f) => (
          <div key={f.q} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="font-medium">{f.q}</div>
            <p className="mt-2 text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
