import Header from "@/components/Header";
import Services from "@/components/Services";
import HomeClient from "@/components/HomeClient";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import FAQSchema from "@/components/FAQSchema";
import Hero from "@/components/Hero";
import CustomerReviews from "@/components/CustomerReviews";
import TrustStrip from "./TrustStrip";
import LocalSEO from "./LocalSeo";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#1E1E1E]">
      <FAQSchema />
      <StickyMobileCTA contactId="kontakt" priceId="pris" />
      <Header />
      {/* HERO */}
      <Hero/>
      {/* TRUST STRIP */}
      <TrustStrip/>
      {/* SERVICES */}
        <Services />
      {/* WHY US */}
      <WhyUs />
      {/* GALLERY */}
      <Gallery />
      {/* Customer Reviews */}
      <CustomerReviews/>
      {/* PROCESS */}
      <Process />
      {/* HOME CLIENT - PRICE CALCULATOR & CONTACT FORM */}
      <HomeClient />
      {/* LOKAL SEO */}
      <LocalSEO/>
      {/* FAQ */}
      <FAQ />
    </main>
  );
}
