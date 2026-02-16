import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
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
    "@type": "FlooringContractor",
    name: "Laskowski Bygg",
    url: "https://parkettleggingoslo.no",
    telephone: "+4796861689",
    email: "laskowskibygg@gmail.com",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Oslo",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "NO",
    },
    identifier: "996768031",
  };

  return (
    <html lang="nb">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
