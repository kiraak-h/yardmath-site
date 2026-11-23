import { describe, it, expect } from "vitest";
import {
  validateSiteUrl,
  getDeploymentEnv,
  isProduction,
  getValidatedSiteUrl,
  isSiteIndexable,
  getCanonicalUrl,
  getMetadataBase,
  type EnvRecord,
} from "./site-config";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Site Configuration & Indexing Safeguards", () => {
  describe("validateSiteUrl", () => {
    it("accepts valid absolute HTTPS URLs with valid domains", () => {
      expect(validateSiteUrl("https://yardmath.com")).toBe("https://yardmath.com");
      expect(validateSiteUrl("https://www.yardmath.com/")).toBe("https://www.yardmath.com");
      expect(validateSiteUrl("https://calculators.example.co.uk")).toBe("https://calculators.example.co.uk");
      expect(validateSiteUrl("https://my-site.org/landscaping/")).toBe("https://my-site.org/landscaping");
    });

    it("rejects non-HTTPS and insecure URLs", () => {
      expect(validateSiteUrl("http://yardmath.com")).toBeNull();
      expect(validateSiteUrl("ftp://yardmath.com")).toBeNull();
      expect(validateSiteUrl("file:///yardmath.com")).toBeNull();
    });

    it("rejects localhost, loopbacks, and invalid hostnames", () => {
      expect(validateSiteUrl("https://localhost")).toBeNull();
      expect(validateSiteUrl("https://localhost:3000")).toBeNull();
      expect(validateSiteUrl("https://127.0.0.1")).toBeNull();
      expect(validateSiteUrl("https://[::1]")).toBeNull();
      expect(validateSiteUrl("https://com")).toBeNull();
      expect(validateSiteUrl("https://yardmath..com")).toBeNull();
      expect(validateSiteUrl("not-a-url")).toBeNull();
      expect(validateSiteUrl("")).toBeNull();
      expect(validateSiteUrl(null)).toBeNull();
      expect(validateSiteUrl(undefined)).toBeNull();
    });
  });

  describe("Scenario 1: Production with a valid URL", () => {
    const env: EnvRecord = {
      VERCEL_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "https://approved-production.com",
    };

    it("establishes production environment and indexable state", () => {
      expect(getDeploymentEnv(env)).toBe("production");
      expect(isProduction(env)).toBe(true);
      expect(getValidatedSiteUrl(env)).toBe("https://approved-production.com");
      expect(isSiteIndexable(env)).toBe(true);
      expect(getCanonicalUrl("/topsoil-calculator/", env)).toBe("https://approved-production.com/topsoil-calculator/");
      expect(getMetadataBase(env)?.toString()).toBe("https://approved-production.com/");
    });

    it("generates crawlable robots rules and sitemap with production origin", () => {
      const robotsResult = robots(env);
      expect(robotsResult.sitemap).toBe("https://approved-production.com/sitemap.xml");
      expect(robotsResult.host).toBe("https://approved-production.com");
      expect(Array.isArray(robotsResult.rules)).toBe(true);

      const sitemapResult = sitemap(env);
      expect(sitemapResult.length).toBeGreaterThan(0);
      expect(sitemapResult.every((entry) => entry.url.startsWith("https://approved-production.com/"))).toBe(true);
    });
  });

  describe("Scenario 2: Production with a missing URL", () => {
    const env: EnvRecord = {
      VERCEL_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "",
    };

    it("safeguards non-indexable status despite production environment", () => {
      expect(getDeploymentEnv(env)).toBe("production");
      expect(isProduction(env)).toBe(true);
      expect(getValidatedSiteUrl(env)).toBeNull();
      expect(isSiteIndexable(env)).toBe(false);
      expect(getCanonicalUrl("/about/", env)).toBe("/about/");
      expect(getMetadataBase(env)).toBeUndefined();
    });

    it("emits disallow-all robots and empty sitemap", () => {
      const robotsResult = robots(env);
      expect(robotsResult.rules).toEqual({ userAgent: "*", disallow: "/" });
      expect(robotsResult.sitemap).toBeUndefined();
      expect(robotsResult.host).toBeUndefined();

      const sitemapResult = sitemap(env);
      expect(sitemapResult).toEqual([]);
    });
  });

  describe("Scenario 3: Production with an invalid URL", () => {
    const env: EnvRecord = {
      APP_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "http://insecure-domain.com",
    };

    it("rejects insecure/invalid URL and blocks indexing", () => {
      expect(isProduction(env)).toBe(true);
      expect(getValidatedSiteUrl(env)).toBeNull();
      expect(isSiteIndexable(env)).toBe(false);
      expect(getCanonicalUrl("/guides/", env)).toBe("/guides/");
      expect(getMetadataBase(env)).toBeUndefined();
    });

    it("emits disallow-all robots and empty sitemap", () => {
      const robotsResult = robots(env);
      expect(robotsResult.rules).toEqual({ userAgent: "*", disallow: "/" });
      expect(sitemap(env)).toEqual([]);
    });
  });

  describe("Scenario 4: Preview with no URL", () => {
    const env: EnvRecord = {
      VERCEL_ENV: "preview",
    };

    it("detects preview environment and enforces non-indexability", () => {
      expect(getDeploymentEnv(env)).toBe("preview");
      expect(isProduction(env)).toBe(false);
      expect(getValidatedSiteUrl(env)).toBeNull();
      expect(isSiteIndexable(env)).toBe(false);
      expect(getCanonicalUrl("/contact/", env)).toBe("/contact/");
      expect(getMetadataBase(env)).toBeUndefined();
    });

    it("emits disallow-all robots and empty sitemap", () => {
      expect(robots(env).rules).toEqual({ userAgent: "*", disallow: "/" });
      expect(sitemap(env)).toEqual([]);
    });
  });

  describe("Scenario 5: Preview with a URL accidentally supplied", () => {
    const env: EnvRecord = {
      VERCEL_ENV: "preview",
      NEXT_PUBLIC_SITE_URL: "https://commercial-domain.com",
    };

    it("NEVER becomes indexable merely because NEXT_PUBLIC_SITE_URL was configured", () => {
      expect(getDeploymentEnv(env)).toBe("preview");
      expect(isProduction(env)).toBe(false);
      // Critical safeguard: URL must be nullified for preview
      expect(getValidatedSiteUrl(env)).toBeNull();
      expect(isSiteIndexable(env)).toBe(false);
      expect(getCanonicalUrl("/topsoil-calculator/", env)).toBe("/topsoil-calculator/");
      expect(getMetadataBase(env)).toBeUndefined();
    });

    it("strictly preserves disallow-all robots and empty sitemap in preview", () => {
      const robotsResult = robots(env);
      expect(robotsResult.rules).toEqual({ userAgent: "*", disallow: "/" });
      expect(robotsResult.sitemap).toBeUndefined();
      expect(robotsResult.host).toBeUndefined();

      expect(sitemap(env)).toEqual([]);
    });
  });

  describe("Scenario 6: Development with no URL", () => {
    const env: EnvRecord = {
      NODE_ENV: "development",
    };

    it("enforces non-indexable development state", () => {
      expect(getDeploymentEnv(env)).toBe("development");
      expect(isProduction(env)).toBe(false);
      expect(getValidatedSiteUrl(env)).toBeNull();
      expect(isSiteIndexable(env)).toBe(false);
      expect(getCanonicalUrl("/terms/", env)).toBe("/terms/");
      expect(getMetadataBase(env)).toBeUndefined();
    });

    it("emits disallow-all robots and empty sitemap in development", () => {
      expect(robots(env).rules).toEqual({ userAgent: "*", disallow: "/" });
      expect(sitemap(env)).toEqual([]);
    });
  });
});
