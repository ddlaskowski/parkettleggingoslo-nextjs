import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section id="hjem" className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-semibold leading-tight">
            Parkettlegging i Oslo, Bærum og Asker.
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            Profesjonell parkettlegging. Gratis befaring, ryddig tilbud og presis utførelse – levert av {siteConfig.companyName}.
          </p>


          <div className="mt-6 flex flex-wrap gap-2 text-sm text-gray-700">
            <span className="px-3 py-1 rounded-full border border-gray-200 bg-white">Gratis befaring</span>
            <span className="px-3 py-1 rounded-full border border-gray-200 bg-white">Tydelig pris</span>
            <span className="px-3 py-1 rounded-full border border-gray-200 bg-white">Ryddig utførelse</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="bg-[#C69C6D] hover:bg-[#B68655] text-white px-6 py-3 rounded-xl transition text-sm"
            >
              Ring nå
            </a>

            <a
              href="#pris"
              className="border border-gray-300 hover:border-gray-500 px-6 py-3 rounded-xl transition text-sm"
            >
              Få prisestimat
            </a>
          </div>
          
          <p className="mt-4 text-xs text-gray-500">
            For mindre oppdrag gjelder minimumsjobb. Priskalkulatoren gir raskt estimat før befaring.
          </p>

        </div>

        {/* Hero Image */}
        <HeroImage/>
      </div>
    </section>
  );
}
