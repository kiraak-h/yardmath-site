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
 * Detects the deployment environment across hosting platforms.
 *
 * Precedence Rules:
 * 1. If VERCEL_ENV is present, it is authoritative ('production' | 'preview' | 'development').
 * 2. Otherwise, if Netlify CONTEXT is present, it is authoritative ('production' | 'deploy-preview' | 'branch-deploy' | 'dev').
 * 3. Only when neither platform variable exists may generic application variables (APP_ENV, NEXT_PUBLIC_APP_ENV, DEPLOYMENT_ENV) be evaluated.
 * 4. Any unknown or conflicting platform value fails safely to 'preview' (non-indexable).
 * 5. A preview deployment must NEVER become indexable because a generic variable says 'production'.
 *
 * Safe Fallback:
 * If no explicit variable is set:
 * - If NODE_ENV is 'development' or 'test', returns 'development'.
 * - Otherwise defaults to 'preview'. Local or unconfigured builds are NEVER assumed to be production.
 */
export function getDeploymentEnv(env: EnvRecord = process.env): DeploymentEnv {
  // 1. Vercel environment takes top precedence if present
  if (env.VERCEL_ENV !== undefined && env.VERCEL_ENV !== "") {
    const vercelEnv = env.VERCEL_ENV.toLowerCase().trim();
    if (vercelEnv === "production") return "production";
    if (vercelEnv === "preview") return "preview";
    if (vercelEnv === "development") return "development";
    // Unknown Vercel environment fails safely to preview (non-indexable)
    return "preview";
  }

  // 2. Netlify CONTEXT takes second precedence if present
  if (env.CONTEXT !== undefined && env.CONTEXT !== "") {
    const netlifyContext = env.CONTEXT.toLowerCase().trim();
    if (netlifyContext === "production") return "production";
    if (netlifyContext === "deploy-preview" || netlifyContext === "branch-deploy") return "preview";
    if (netlifyContext === "dev") return "development";
    // Unknown Netlify context fails safely to preview (non-indexable)
    return "preview";
  }

  // 3. Generic application environment variables (only when neither platform variable exists)
  const genericEnv = (
    env.APP_ENV ||
    env.NEXT_PUBLIC_APP_ENV ||
    env.DEPLOYMENT_ENV
  )?.toLowerCase().trim();

  if (genericEnv !== undefined && genericEnv !== "") {
    if (genericEnv === "production") return "production";
    if (genericEnv === "preview" || genericEnv === "staging") return "preview";
    if (genericEnv === "development" || genericEnv === "dev" || genericEnv === "test") return "development";
    // Unknown generic environment fails safely to preview (non-indexable)
    return "preview";
  }

  // 4. Node environment fallback (development/test)
  if (env.NODE_ENV === "development" || env.NODE_ENV === "test") {
    return "development";
  }

  // Default fallback: preview (non-indexable) to safeguard unconfigured builds
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
 * - When preview/development: returns undefined so no canonical tag is emitted
 */
export function getCanonicalUrl(path: string, env: EnvRecord = process.env): string | undefined {
  const siteUrl = getValidatedSiteUrl(env);
  if (!siteUrl) {
    return undefined;
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
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
