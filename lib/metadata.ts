import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";

type PageMetadata = {
  title: string;
  description: string;
  /** Site-relative pathname, without a query string or fragment. */
  pathname: `/${string}`;
  image?: { url: string; alt: string; width: number; height: number };
};

/** Supply all page-specific metadata together so subpages cannot inherit the home canonical. */
export function createPageMetadata({
  title,
  description,
  pathname,
  image = { url: "/og.png", alt: title, width: 1200, height: 630 },
}: PageMetadata): Metadata {
  if (pathname.startsWith("//") || /[?#]/.test(pathname)) {
    throw new Error("Metadata pathname must be a site-relative path without query or fragment");
  }
  const canonical = new URL(pathname, siteConfig.url);
  if (canonical.origin !== new URL(siteConfig.url).origin) {
    throw new Error("Metadata canonical must stay on the site origin");
  }
  const url = canonical.href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.siteName,
      locale: "nb_NO",
      type: "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
