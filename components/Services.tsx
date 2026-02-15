const services = [
  {
    title: "Parkett (klikk)",
    desc: "Presis legging av klikk-parkett for pene og stabile gulv.",
  },
  {
    title: "Parkett (limt)",
    desc: "Limet parkett for et ekstra solid resultat – vurderes etter befaring.",
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
    <div>
      <h2 className="text-3xl font-semibold">Tjenester</h2>
      <p className="mt-3 text-gray-600 max-w-2xl">
        Vi jobber kun med gulv: parkett, heltre, laminat og vinyl.
      </p>

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
    </div>
  );
}
