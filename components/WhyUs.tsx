export default function WhyUs() {
  const items = [
    {
      title: "Ryddig og forutsigbart",
      desc: "Tydelige rammer og ryddig tilbud etter befaring.",
    },
    {
      title: "Presis legging",
      desc: "Fine avslutninger, rette linjer og god detaljfinish.",
    },
    {
      title: "Effektiv gjennomføring",
      desc: "Vi møter til avtalt tid og holder arbeidsplassen ryddig.",
    },
    {
      title: "Riktig nivå",
      desc: "Solid kvalitet til vanlige hjem – uten ekstrem premium-pris.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold">Hvorfor velge oss</h2>
      <p className="mt-3 text-gray-600 max-w-4xl">
        Vi jobber kun med gulv – parkett, heltre, laminat og vinyl. Du får ryddig
        tilbud, god fremdrift og et pent resultat uten stress.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {items.map((x) => (
          <div key={x.title} className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="font-medium">{x.title}</div>
            <p className="mt-2 text-gray-600">{x.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}