import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://parkettleggingoslo.no",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://parkettleggingoslo.no/gulvlegging",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://parkettleggingoslo.no/fiskebensparkett",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://parkettleggingoslo.no/priser",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
