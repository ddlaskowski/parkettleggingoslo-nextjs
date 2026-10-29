import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://parkettleggingoslo.no"),
  title: "Gulvlegging og parkettlegging i Oslo | Laskowski Bygg",
  description:
  "Gulvlegging og parkettlegging i Oslo, Bærum og Asker. Vi legger parkett, laminat og fiskebensparkett. Se prosjekter, beregn pris og be om tilbud.",
  keywords: [
    "parkettlegging oslo",
    "legge parkett oslo",
    "gulvlegger oslo",
    "parkett oslo",
    "hvitoljet parkett oslo",
    "laminatgulv oslo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gulvlegging og parkettlegging i Oslo | Laskowski Bygg",
    description:
      "Gulvlegging og parkettlegging i Oslo, Bærum og Asker. Vi legger parkett, laminat og fiskebensparkett. Se prosjekter, beregn pris og be om tilbud.",
    url: "https://parkettleggingoslo.no",
    siteName: "Parkettlegging Oslo",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gulvlegging og parkettlegging – Laskowski Bygg",
      },
    ],
  },
   twitter: {
    card: "summary_large_image",
    title: "Gulvlegging og parkettlegging i Oslo | Laskowski Bygg",
    description:
      "Gulvlegging og parkettlegging i Oslo, Bærum og Asker. Vi legger parkett, laminat og fiskebensparkett. Se prosjekter, beregn pris og be om tilbud.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.companyName,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    areaServed: ["Oslo", "Bærum", "Asker"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressLine,
      postalCode: siteConfig.postalCode,
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.country,
    },
    identifier: siteConfig.orgNr.replaceAll(" ", ""),
  };

  return (
    <html lang="nb" data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="skip-link">Hopp til innhold</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
