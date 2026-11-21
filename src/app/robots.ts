import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  // GPTBot: OpenAI's model scraping and training crawler.
  // Disallowed by default to protect proprietary editorial guides and calculator data from bulk model training.
  // Set ALLOW_GPTBOT=true in environment variables to enable.
  const allowGptBot = process.env.ALLOW_GPTBOT === "true";

  // Google-Extended: Controls content usage for Google Gemini and Vertex AI generative training and grounding.
  // Note: Google-Extended does NOT affect standard Google Search indexing, ranking, or Google AI Overviews
  // (which are governed by Googlebot). Disallowed by default; set ALLOW_GOOGLE_EXTENDED=true to enable.
  const allowGoogleExtended = process.env.ALLOW_GOOGLE_EXTENDED === "true";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "GPTBot",
        ...(allowGptBot ? { allow: "/", disallow: ["/api/"] } : { disallow: ["/"] }),
      },
      {
        userAgent: "Google-Extended",
        ...(allowGoogleExtended ? { allow: "/", disallow: ["/api/"] } : { disallow: ["/"] }),
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
