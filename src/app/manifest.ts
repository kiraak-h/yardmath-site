import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YardMath — Landscaping Calculators",
    short_name: "YardMath",
    description: "Free landscaping material calculators for soil, mulch, gravel, sand and outdoor projects.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafbf8",
    theme_color: "#eef1e5",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
