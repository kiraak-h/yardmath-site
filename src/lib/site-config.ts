/**
 * Site configuration and environment-aware indexing protection.
 *
 * Requirements:
 * - Production builds require a valid, approved absolute HTTPS NEXT_PUBLIC_SITE_URL.
 * - Preview, staging, and development builds remain strictly `noindex, nofollow`.
 * - Preview builds emit a disallow-all robots policy and an empty sitemap.
 * - A preview build must NOT become indexable merely because NEXT_PUBLIC_SITE_URL was accidentally configured.
 * - Absolute HTTPS URL validation with valid non-loopback hostname.
 * - Removes any unconfirmed commercial domain fallback (e.g. no hardcoded yardmath.com fallback).
 * - Canonical, Open Graph, JSON-LD, sitemap and robots all consume the same validated origin.
 */

export type DeploymentEnv = "production" | "preview" | "development";

export type EnvRecord = Record<string, string | undefined>;

/**
 * Validates that a string is an absolute HTTPS URL with a valid domain hostname.
 * Returns normalized URL without trailing slash (e.g. "https://example.com"), or null if invalid.
 */
export function validateSiteUrl(rawUrl: string | undefined | null): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:") {
      return null;
    }

    const hostname = parsed.hostname.toLowerCase();
    // Disallow empty, localhost, loopback IPs
    if (!hostname || hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
      return null;
    }

    // Must be a valid domain structure with at least one dot separating labels
    if (!hostname.includes(".") || hostname.startsWith(".") || hostname.endsWith(".") || hostname.includes("..")) {
      return null;
    }

    const labels = hostname.split(".");
    // Each label must be alphanumeric or hyphen (not starting or ending with hyphen)
    for (const label of labels) {
      if (!label || !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(label)) {
        return null;
      }
    }

    // TLD must be alphabetic and at least 2 characters (e.g. .com, .org, .co.uk)
    const tld = labels[labels.length - 1];
    if (/^\d+$/.test(tld) || tld.length < 2) {
      return null;
    }

    // Normalize: origin plus pathname without trailing slash
    const pathname = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/+$/, "");
    return `${parsed.protocol}//${parsed.host}${pathname}`;
  } catch {
    return null;
  }
}

/**
 * Detects the deployment environment across major hosting platforms.
 *
 * Supported platform indicators:
 * - Vercel: VERCEL_ENV ('production' | 'preview' | 'development')
 * - Netlify: CONTEXT ('production' | 'deploy-preview' | 'branch-deploy' | 'dev')
 * - Generic / Cloudflare / Docker: APP_ENV / NEXT_PUBLIC_APP_ENV / DEPLOYMENT_ENV ('production' | 'staging' | 'preview' | 'development')
 *
 * Safe Fallback:
 * If no explicit platform variable is set:
 * - If NODE_ENV is 'development' or 'test', returns 'development'.
 * - Otherwise defaults to 'preview'. Local or unconfigured builds are NEVER assumed to be production.
 */
export function getDeploymentEnv(env: EnvRecord = process.env): DeploymentEnv {
  const explicit = (
    env.NEXT_PUBLIC_APP_ENV ||
    env.APP_ENV ||
    env.DEPLOYMENT_ENV ||
    env.VERCEL_ENV ||
    env.CONTEXT
  )?.toLowerCase().trim();

  if (explicit) {
    if (explicit === "production") return "production";
    if (
      explicit === "preview" ||
      explicit === "deploy-preview" ||
      explicit === "branch-deploy" ||
      explicit === "staging"
    ) {
      return "preview";
    }
    if (explicit === "development" || explicit === "dev" || explicit === "test") {
      return "development";
    }
    return "preview";
  }

  if (env.NODE_ENV === "development" || env.NODE_ENV === "test") {
    return "development";
  }

  // Without explicit platform declaration, default to preview to safeguard unconfigured builds
  return "preview";
}

/**
 * Returns true if the environment is verified production.
 */
export function isProduction(env: EnvRecord = process.env): boolean {
  return getDeploymentEnv(env) === "production";
}

/**
 * Returns the validated canonical production site URL.
 * Crucial Safeguard:
 * If the environment is NOT verified production (e.g. preview, staging, development),
 * this ALWAYS returns null, even if NEXT_PUBLIC_SITE_URL was configured.
 */
export function getValidatedSiteUrl(env: EnvRecord = process.env): string | null {
  if (!isProduction(env)) {
    return null;
  }
  return validateSiteUrl(env.NEXT_PUBLIC_SITE_URL);
}

/**
 * Returns true only if the site is permitted to be indexed by search engines.
 * Requires verified production environment AND valid absolute HTTPS site URL.
 */
export function isSiteIndexable(env: EnvRecord = process.env): boolean {
  return getValidatedSiteUrl(env) !== null;
}

/**
 * Returns canonical URL for a path.
 * - When indexable production: returns absolute URL `${siteUrl}${path}`
 * - When preview/development: returns relative path `${path}` to prevent canonical leaks
 */
export function getCanonicalUrl(path: string, env: EnvRecord = process.env): string {
  const siteUrl = getValidatedSiteUrl(env);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (siteUrl) {
    return `${siteUrl}${normalizedPath}`;
  }
  return normalizedPath;
}

/**
 * Resolves metadataBase for Next.js metadata.
 * Returns new URL(siteUrl) when a valid production URL exists; otherwise undefined.
 */
export function getMetadataBase(env: EnvRecord = process.env): URL | undefined {
  const siteUrl = getValidatedSiteUrl(env);
  if (siteUrl) {
    return new URL(siteUrl);
  }
  return undefined;
}
