import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://parkettleggingoslo.no"),
  title: "Parkettlegging i Oslo – Legge parkett, laminat og heltre",
  description:
  "Profesjonell parkettlegging i Oslo og omegn. Vi legger parkett, heltre, laminat og vinyl. Få gratis befaring og raskt tilbud.",
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
    title: "Parkettlegging Oslo – Profesjonell gulvlegging",
    description:
      "Vi legger parkett, heltre og laminat i Oslo. Gratis befaring og tydelig pris.",
    url: "https://parkettleggingoslo.no",
    siteName: "Parkettlegging Oslo",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Parkettlegging Oslo – Profesjonell gulvlegging",
      },
    ],
  },
   twitter: {
    card: "summary_large_image",
    title: "Parkettlegging Oslo",
    description:
      "Profesjonell parkettlegging i Oslo og omegn.",
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
    <html lang="nb">
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
