export default function CustomerReviews() {

return (
<section id="referanser" className="max-w-6xl mx-auto px-6 py-20">
  <div className="flex items-end justify-between gap-6 flex-wrap">
    <div>
      <h2 className="text-3xl font-semibold">Referanser</h2>
      <p className="mt-3 text-gray-600 max-w-2xl">
        Noen korte tilbakemeldinger fra kunder i Oslo og omegn.
      </p>
    </div>

    <a
      href="#kontakt"
      className="border border-gray-300 hover:border-gray-500 px-5 py-3 rounded-xl transition text-sm"
    >
      Be om tilbud
    </a>
  </div>

  <div className="mt-12 grid md:grid-cols-3 gap-6">
    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed">
        “Veldig hyggelig og dyktige håndverkere. Leverte raskt og godt. Løste nye utfordringer på en god måte.”
      </p>
      <div className="mt-5 text-sm text-gray-500">— Arild</div>
    </div>
    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed">
        “La fiskebensparkett i leilighet. Ble helt strøkent. Ryddig og god kommunikasjon - kom presist. Fullførte jobben raskere enn forventet og fjernet i tillegg lister som måtte bort. Absolutt å anbefale. Kommer til å ta kontakt med Laskowski Bygg neste gang jeg skal ha arbeider utført.”
      </p>
      <div className="mt-5 text-sm text-gray-500">— Marianne</div>
    </div>

    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed">
        “Laskowski bygg la fiskebensparkett samt nye lister hos meg og jeg kunne ikke vært mer fornøyd. Kjempehyggelige, profesesjonelle, effektive og dyktige i jobben sin. Anbefales på det varmeste! Jeg kommer absolutt til å ta kontakt med de igjen dersom jeg skal ha annet snekkerarbeid utført i fremtiden.”
      </p>
      <div className="mt-5 text-sm text-gray-500">— Rikke</div>
    </div>

<div className="border border-gray-200 rounded-2xl p-6 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed">
        “Darek og teamet hans la fiskebensparkett effektivt, profesjonelt og med god utnyttelse av materialene. Listverket ble gjort på en fin og utførlig måte, og det samme gjelder montering av soveromsdør. I det hele tatt svært fornøyd med resultatet, og vil absolutt anbefale Laskowski Bygg for andre som vurderer dem.”
      </p>
      <div className="mt-5 text-sm text-gray-500">— Thomas</div>
    </div>

    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed">
        `Vi ble helt utrolig fornøyde med jobben Laskowski bygg gjorde for oss med å legge ny parkett i vår 91 kvm leilighet. Resultatet er upåklagelig, og det er tydelig at de har lang erfaring i faget da arbeidet er utført med høy kvalitet. De tok utfordringer som dukket opp på strak arm, og hjalp oss fikse/handle riktige produkter. Effektive og konkurransedyktige på pris. Vil absolutt bruke bedriften igjen om vi trenger hjelp til snekkerarbeid :)`
      </p>
      <div className="mt-5 text-sm text-gray-500">— Malin</div>
    </div>

    <div className="border border-gray-200 rounded-2xl p-6 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed">
        “Laskowski la ca 80 kvadrat fiskeben for oss, samt lister. De sørget for rett gulv, priming og nydelig legging av gulvet samt fokus på finish. De hjalp oss også med andre småting. De tettet spiker- hullene på listene uten at vi trengte å be om det og gjorde alt veldig pent. Vi følte oss veldig trygge på dette firmaet og kommer til å henvende oss til dem igjen ved behov. Anbefales på det sterkeste!”
      </p>
      <div className="mt-5 text-sm text-gray-500">— Martine</div>
    </div>   
  </div>
  <div className="mt-12 text-center">
    <p className="text-sm text-gray-700 font-medium">
      ★ 4.7 / 5 basert på vurderinger hos Mittanbud
    </p>
    <a
      href="https://mittanbud.no/bedrift/1009514#m=evaluations"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-3 text-[#C69C6D] hover:underline text-sm"
    >
      Se alle vurderinger på Mittanbud →
    </a>
  </div>
</section>
)
}