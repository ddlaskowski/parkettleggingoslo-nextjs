"use client";

import { useEffect, useState, type ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import PackageProductCard from "@/components/PackageProductCard";
import PackageCalculator from "@/components/PackageCalculator";
import { packageProducts } from "@/lib/packageProducts";
import { calculatePackage, createPackageSummary } from "@/lib/packagePricing";

export default function PackageOfferClient({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState("");
  const [area, setArea] = useState("");
  const [touched, setTouched] = useState(false);
  const result = calculatePackage(productId, area);
  const summary = createPackageSummary(result);

  useEffect(() => {
    fetch("/api/handshake", { method: "POST" }).catch(() => {});
  }, []);

  function goToContact() {
    if (!result.valid) return;
    const heading = document.getElementById("package-contact-title");
    heading?.focus({ preventScroll: true });
    // CSS supplies the established scroll offset and reduced-motion behavior.
    heading?.scrollIntoView({ block: "start" });
  }

  return <>
    <section id="produkter" aria-labelledby="package-products-title" className="max-w-6xl mx-auto px-6 pb-20">
      <h2 id="package-products-title" className="text-3xl font-semibold">Velg mellom to utvalgte parkettgulv</h2>
      <p className="mt-4 max-w-3xl text-gray-600">Fiskeben eller brede planker? Velg uttrykket du ønsker. Gulvet og undergulvet vurderes sammen før vi bekrefter monteringsløsningen.</p>
      <fieldset className="mt-10 min-w-0">
        <legend className="sr-only">Velg gulv til pakken</legend>
        <div className="grid gap-8 md:grid-cols-2">{packageProducts.map((product) => <PackageProductCard key={product.id} product={product} selected={product.id === productId} onSelect={() => setProductId(product.id)} />)}</div>
      </fieldset>
    </section>
    <PackageCalculator productId={productId} area={area} result={result} showError={touched || area.length > 0} onProductChange={setProductId} onAreaChange={setArea} onAreaBlur={() => setTouched(true)} onInquiry={goToContact} />
    {children}
    <section id="kontakt" aria-labelledby="package-contact-title" className="max-w-6xl mx-auto px-6 pb-20">
      <h2 id="package-contact-title" tabIndex={-1} className="text-3xl font-semibold scroll-mt-4">Be om tilbud på parkett med montering</h2>
      <p className="mt-4 mb-8 max-w-3xl text-gray-600">Fortell hvilke rom det gjelder, hvor boligen ligger og hva du vet om undergulvet. Legg gjerne til ønsker om underlag, gulvlister eller annet arbeid. Pakkevalget vises separat og følger med forespørselen.</p>
      <ContactForm packageSummary={summary} />
    </section>
  </>;
}
