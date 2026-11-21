import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];
  const now = new Date();
  const staticPages = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about/", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/contact/", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/guides/", changeFrequency: "monthly" as const, priority: 0.65 },
    { path: "/guides/how-to-measure-landscaping-materials/", changeFrequency: "yearly" as const, priority: 0.65 },
    { path: "/disclaimer/", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/privacy/", changeFrequency: "yearly" as const, priority: 0.2 },
    { path: "/terms/", changeFrequency: "yearly" as const, priority: 0.2 },
  ];
  return [
    ...staticPages.map((page) => ({ url: `${siteUrl}${page.path}`, lastModified: now, changeFrequency: page.changeFrequency, priority: page.priority })),
    ...tools.map((tool) => ({ url: `${siteUrl}/${tool.slug}/`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
  ];
}
