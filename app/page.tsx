import Header from "@/components/Header";
import Services from "@/components/Services";
import HomeClient from "@/components/HomeClient";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import { siteConfig } from "@/lib/siteConfig";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1E1E1E]">
      <Header />

      {/* HERO */}
      <section id="hjem" className="max-w-6xl mx-auto px-6 pt-28 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-semibold leading-tight">
              Parkettlegging i Oslo og omegn
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Profesjonell legging av parkett, heltre og laminat. Solid arbeid
              til avtalt tid og pris.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-lg transition"
              >
                Gratis befaring
              </a>

              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="border border-gray-300 px-6 py-3 rounded-lg hover:border-gray-500 transition"
              >
                Ring nå
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="px-3 py-1 rounded-full border border-gray-200">
                Oslo
              </span>
              <span className="px-3 py-1 rounded-full border border-gray-200">
                Bærum
              </span>
              <span className="px-3 py-1 rounded-full border border-gray-200">
                Asker
              </span>
            </div>
          </div>

          {/* Placeholder na zdjęcie */}
          <div className="rounded-2xl bg-[#F5F3EF] aspect-[4/3] border border-gray-200" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#F5F3EF] border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-700">
          <span>Gratis befaring</span>
          <span>Ryddig tilbud</span>
          <span>Punktlig og pålitelig</span>
          <span>Norsk / polsk / engelsk</span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="tjenester" className="max-w-6xl mx-auto px-6 py-20">
        <Services />
      </section>
      {/* WHY US */}
      <WhyUs />
      {/* PROCESS */}
      <Process />
      {/* HOME CLIENT - PRICE CALCULATOR & CONTACT FORM */}
      <HomeClient />
      {/* GALLERY */}
      <Gallery />
      
      <section className="max-w-4xl mx-auto px-6 py-16 text-gray-700">
        <h2 className="text-2xl font-semibold">Parkettlegging i Oslo og omegn</h2>
        <p className="mt-4">
          Vi utfører parkettlegging i Oslo, Bærum, Asker og nærliggende områder.
          Enten du skal legge nytt parkettgulv i leilighet, hus eller rekkehus,
          leverer vi presis og effektiv utførelse til avtalt tid.
        </p>
      </section>
      {/* FAQ */}
      <FAQ />
    </main>
  );
}
