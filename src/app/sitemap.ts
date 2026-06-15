import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lindahairsalon.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/ochrana-soukromi`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
