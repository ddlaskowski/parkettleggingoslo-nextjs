import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <div className="text-lg font-semibold">{siteConfig.siteName}</div>
          <p className="mt-3 text-sm text-gray-600 max-w-sm">
            Profesjonell parkettlegging i {siteConfig.area}. Gratis befaring og ryddig tilbud.
          </p>
        </div>

        {/* Contact */}
        <div>
          <div className="text-sm font-semibold">Kontakt</div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div>
              Telefon:{" "}
              <a
                className="underline underline-offset-4 hover:text-gray-900"
                href={`tel:${siteConfig.phoneE164}`}
              >
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <div>
              E-post:{" "}
              <a
                className="underline underline-offset-4 hover:text-gray-900"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="text-gray-600">{siteConfig.area}</div>
          </div>
        </div>

        {/* Company (NAP / SEO) */}
        <div>
          <div className="text-sm font-semibold">Firma</div>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <div>{siteConfig.companyName}</div>
            <div className="text-gray-600">Org.nr {siteConfig.orgNr}</div>
            <div className="text-gray-600">
              {siteConfig.addressLine}, {siteConfig.postalCode} {siteConfig.city}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.companyName}. Alle rettigheter reservert.
          </div>
          <div>
            <a className="underline underline-offset-4 hover:text-gray-700" href={siteConfig.url}>
              {siteConfig.url.replace("https://", "")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
