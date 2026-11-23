import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { generateMetadata as toolMetadata } from "@/app/[tool]/page";
import { generateMetadata as guideMetadata } from "@/app/guides/[slug]/page";

describe("Metadata Generation Across Deployment Environments", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("Preview / Non-Indexable Deployment", () => {
    it("omits alternates.canonical, openGraph.url, and relative images when VERCEL_ENV=preview", async () => {
      process.env.VERCEL_ENV = "preview";
      process.env.NEXT_PUBLIC_APP_ENV = "production"; // conflicting generic env
      process.env.NEXT_PUBLIC_SITE_URL = "https://accidental-domain.com";

      const meta = await toolMetadata({ params: Promise.resolve({ tool: "topsoil-calculator" }) });

      expect(meta.alternates).toBeUndefined();
      expect(meta.openGraph?.url).toBeUndefined();
      expect(meta.openGraph?.images).toBeUndefined();
      expect(meta.twitter?.images).toBeUndefined();
    });

    it("omits alternates.canonical and openGraph.url on guide pages in preview", async () => {
      process.env.CONTEXT = "deploy-preview";
      process.env.APP_ENV = "production";
      process.env.NEXT_PUBLIC_SITE_URL = "https://accidental-domain.com";

      const meta = await guideMetadata({ params: Promise.resolve({ slug: "how-to-measure-landscaping-materials" }) });

      expect(meta.alternates).toBeUndefined();
      expect(meta.openGraph?.url).toBeUndefined();
      expect(meta.openGraph?.images).toBeUndefined();
    });
  });

  describe("Production Deployment With Approved Domain", () => {
    it("emits full canonical URL and Open Graph URL using configured approved domain", async () => {
      process.env.VERCEL_ENV = "production";
      delete process.env.NEXT_PUBLIC_APP_ENV;
      process.env.NEXT_PUBLIC_SITE_URL = "https://www.approved-yardmath-prod.com";

      const meta = await toolMetadata({ params: Promise.resolve({ tool: "topsoil-calculator" }) });

      expect(meta.alternates?.canonical).toBe("https://www.approved-yardmath-prod.com/topsoil-calculator/");
      expect(meta.openGraph?.url).toBe("https://www.approved-yardmath-prod.com/topsoil-calculator/");
      expect(meta.openGraph?.images).toEqual([
        { url: "/og-image.png", width: 1200, height: 630, alt: "Topsoil Calculator" },
      ]);
      expect(meta.twitter?.images).toEqual(["/og-image.png"]);
    });

    it("emits full canonical and Open Graph URL on guide pages", async () => {
      process.env.CONTEXT = "production";
      process.env.NEXT_PUBLIC_SITE_URL = "https://www.approved-yardmath-prod.com";

      const meta = await guideMetadata({ params: Promise.resolve({ slug: "how-to-measure-landscaping-materials" }) });

      expect(meta.alternates?.canonical).toBe(
        "https://www.approved-yardmath-prod.com/guides/how-to-measure-landscaping-materials/"
      );
      expect(meta.openGraph?.url).toBe(
        "https://www.approved-yardmath-prod.com/guides/how-to-measure-landscaping-materials/"
      );
      expect(meta.openGraph?.images).toBeDefined();
    });
  });

  describe("Production Deployment With Missing or Invalid Domain", () => {
    it("safeguards by omitting canonical and Open Graph URLs when site URL is missing", async () => {
      process.env.VERCEL_ENV = "production";
      process.env.NEXT_PUBLIC_SITE_URL = "";

      const meta = await toolMetadata({ params: Promise.resolve({ tool: "topsoil-calculator" }) });

      expect(meta.alternates).toBeUndefined();
      expect(meta.openGraph?.url).toBeUndefined();
      expect(meta.openGraph?.images).toBeUndefined();
    });

    it("safeguards by omitting canonical and Open Graph URLs when site URL is invalid (localhost/http)", async () => {
      process.env.VERCEL_ENV = "production";
      process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000";

      const meta = await toolMetadata({ params: Promise.resolve({ tool: "topsoil-calculator" }) });

      expect(meta.alternates).toBeUndefined();
      expect(meta.openGraph?.url).toBeUndefined();
      expect(meta.openGraph?.images).toBeUndefined();
    });
  });
});
