import Link from "next/link";

export default function LocalSEO() {

  return ( 
    <section className="max-w-4xl mx-auto px-6 py-16 text-gray-700">
        <h2 className="text-2xl font-semibold">
          Gulvlegging i Oslo, Bærum og Asker
        </h2>

        <p className="mt-4">
          Vi utfører <Link href="/gulvlegging" className="underline underline-offset-4">gulvlegging</Link> i Oslo, Bærum og Asker. Arbeidet kan omfatte parkett og laminat i flere rom, fjerning av gammelt gulv og montering av gulvlister. Vi avklarer hva som skal gjøres før vi gir tilbud.
        </p>

        <p className="mt-4">
          Ved fiskebensparkett og andre mønstre vurderes leggemetoden ut fra produktet og undergulvet. Oppgi rom, omtrent areal og ønsket gulvtype når du tar kontakt, så har vi et utgangspunkt for befaringen.
        </p>

        <p className="mt-4">
          Arbeidet utføres av Laskowski Bygg (Org.nr 996 768 031) med base i
          Løkebergveien 15, 1344 Haslum.
        </p>
  </section>
  )
}
