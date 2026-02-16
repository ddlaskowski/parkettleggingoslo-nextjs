export default function Process() {
  const steps = [
    { n: "01", title: "Gratis befaring", desc: "Vi ser på underlag, rom og detaljer." },
    { n: "02", title: "Tilbud", desc: "Du får et ryddig tilbud med pris og tidsplan." },
    { n: "03", title: "Utførelse", desc: "Vi legger gulvet effektivt og pent." },
    { n: "04", title: "Overlevering", desc: "Kontroll, opprydding og ferdig gulv." },
  ];

  return (
    <section className="bg-[#F5F3EF] border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold">Slik jobber vi</h2>

        <div className="mt-10 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-sm text-gray-500">{s.n}</div>
              <div className="mt-2 font-medium">{s.title}</div>
              <p className="mt-2 text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
