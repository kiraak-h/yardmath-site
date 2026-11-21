import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];

  // Use genuine, verifiable release/revision dates rather than generating dynamic 'new Date()' on every request
  const staticLastMod = new Date("2026-11-21T00:00:00.000Z");

  const staticPages = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1.0, lastModified: staticLastMod },
    { path: "/about/", changeFrequency: "monthly" as const, priority: 0.6, lastModified: staticLastMod },
    { path: "/contact/", changeFrequency: "monthly" as const, priority: 0.5, lastModified: staticLastMod },
    { path: "/guides/", changeFrequency: "weekly" as const, priority: 0.8, lastModified: staticLastMod },
    { path: "/disclaimer/", changeFrequency: "yearly" as const, priority: 0.3, lastModified: staticLastMod },
    { path: "/privacy/", changeFrequency: "yearly" as const, priority: 0.3, lastModified: staticLastMod },
    { path: "/terms/", changeFrequency: "yearly" as const, priority: 0.3, lastModified: staticLastMod },
  ];

  const toolPages = tools.map((tool) => ({
    url: `${siteUrl}/${tool.slug}/`,
    lastModified: staticLastMod,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}/`,
    lastModified: new Date(`${guide.revisedDate}T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...toolPages,
    ...guidePages,
  ];
}
