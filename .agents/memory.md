# Project Memory - YardMath Landscaping Calculators

## Context
- Project: YardMath (production-ready landscaping material calculator website)
- Framework & Tools: Next.js 16 (App Router with Turbopack), React 19, TypeScript (strict), ESLint 9, Vitest 3.
- Goal: Production website handoff verification, test suite execution, browser testing of all 12 calculators and static routes, metadata/security audits, and GitHub public repository deployment.
- Public Remote: `https://github.com/kiraak-h/yardmath-site`

## Architectural Decisions
- Clean vanilla CSS design system (`src/app/globals.css`) with zero third-party UI dependencies, zero tracking cookies, zero analytics scripts, and zero ads.
- Central calculation engine (`src/lib/calculation.ts`) handles all mathematical formulas, volume conversions, unit price translations, density weights, and bag yield rounding.
- Circle calculation strictly uses diameter ($r = d/2$); triangle calculation strictly uses base and perpendicular height ($\text{base} \times \text{height} / 2$).
- Extra-material allowance is applied after base geometric volume; cost calculations evaluate against post-allowance billable volume.
- Calculator strictly leaves bulk density, package size, and material price blank initially; no assumptions or prefilled density/package values are made.
- Strict `noindex` and `disallow: /` enforced dynamically whenever `NEXT_PUBLIC_SITE_URL` is omitted, protecting staging/preview environments.
- Comprehensive JSON-LD structured data on all pages (WebSite, WebApplication, BreadcrumbList, FAQPage, SoftwareApplication).

## Burn Book
- ESLint JSX unescaped entities: Direct apostrophes in JSX text (e.g. `supplier's`, `visitor's`, `let's`, `isn't`) fail `react/no-unescaped-entities` under ESLint 9. Always escape with `&apos;` in TSX text nodes.
- GitHub Push Authentication: User-scoped fine-grained Personal Access Tokens (`github_pat_...`) exported as `GITHUB_TOKEN` may reject push access to newly created repos (403 Forbidden). Temporarily removing `Env:\GITHUB_TOKEN` allows Git and `gh` to seamlessly use the authenticated keyring OAuth token with full `repo` scope.

## Active Scratchpad
- [x] Step 1: Install dependencies with `npm install` (clean install, 390 packages).
- [x] Step 2: Fix ESLint unescaped entities in 6 files (`[tool]/page.tsx`, `about/page.tsx`, `error.tsx`, `guides/.../page.tsx`, `not-found.tsx`, `page.tsx`).
- [x] Step 3: Run `npm run verify` (lint, typecheck, test, build) - all passed.
- [x] Step 4: Run dev server and execute browser tests via Chrome DevTools MCP (all 12 calculators, responsive, search/filter, static pages).
- [x] Step 5: Verified calculation acceptance checks (rectangle with allowance, metric rectangle, circle diameter, triangle).
- [x] Step 6: Verified zero cookies, zero external trackers, strict security headers, and dynamic noindex when canonical URL is unset.
- [x] Step 7: Completed QA Review and self-learning protocol.
- [x] Step 8: Initialized git repository, committed clean source, created public GitHub repo `kiraak-h/yardmath-site`, and pushed `main` branch.
- [x] Step 9: Phase 1 Full Source Audit — analyzed all 12 calculators, canonical tags, schema, robots, and guides.
- [x] Step 10: Phase 2 Technical SEO — canonical URLs with `NEXT_PUBLIC_SITE_URL`, static verifiable lastmod dates in `sitemap.ts`, removed deprecated `FAQPage` schema while keeping accessible HTML accordion FAQs.
- [x] Step 11: Phase 3 & 4 Calculator Content SEO & AEO — individualized all 12 calculators in `src/lib/tools.ts` and `src/app/[tool]/page.tsx` with AEO direct answer blocks, benchmark coverage tables, formula derivations, independently checked worked examples, inputs guidance, material constraints, user mistake callouts, authoritative citations (USDA, Cornell, Penn State, ACI, ASTM), and unique FAQs.
- [x] Step 12: Phase 5 GEO — configurable `robots.ts` for search bots (`OAI-SearchBot`, `GPTBot`, `Bingbot`, `Google-Extended`) and full calculation methodology on `/about/`.
- [x] Step 13: Phase 6 Content Hub Expansion — created `src/lib/guides.ts` and dynamic `src/app/guides/[slug]/page.tsx` with 9 comprehensive, authoritative educational guides.
- [x] Step 14: Phase 7 Trust & Editorial Quality — upgraded `/about/`, `/contact/`, `/disclaimer/`, `/privacy/`, and `/terms/` with verification standards, correction workflows, zero-tracker baseline, and owner pre-launch action flags.
- [x] Step 15: Phase 8 & 9 Internationalization, Performance & Accessibility — unified imperial/metric single-URL design, high-contrast accessible components, and CSS styles in `src/app/globals.css`.
- [x] Step 16: Phase 10 Verification Pipeline — 10/10 Vitest tests, strict TypeScript clean, ESLint clean, Next.js SSG build (34/34 static pages generated), and live HTTP endpoint verification.
- [x] Step 17: Generated comprehensive audit document `SEO_AEO_GEO_AUDIT.md`.
- [x] Step 18: Git stage, commit, push to GitHub `main` (commit SHA `5969061`).
- [x] Step 19: Targeted Correction Phase — robots.ts crawler policy (OAI-SearchBot allowed, GPTBot disallowed by default, Google-Extended configurable with clear model-training purpose explanation).
- [x] Step 20: Source references audit — added validated official URLs to all 24 tool sources and 18 guide sources; rendered source titles as accessible links; updated ASTM C29 to active C29/C29M-23.
- [x] Step 21: Calculator consistency — aligned paver base to user-controlled allowance compaction, gravel driveway to single-layer calculations, concrete bag yield to manufacturer pack volume, and added short-ton / metric-tonne / long-ton conversions to calculation engine and UI output.
- [x] Step 22: Editorial trust — removed hard-coded email addresses and unsupported response promises; documented Vitest calculation testing methodology; clarified genuine editorial ownership.
- [x] Step 23: Automated content calculation test suite — created `src/lib/content-validation.test.ts` (15 tests) validating all worked examples, benchmark tables, URLs, and cross-references.
- [x] Step 24: Empirical Lighthouse lab audit executed (Performance: 99, Accessibility: 93, Best Practices: 100; FCP: 1.1s, LCP: 1.1s, CLS: 0.000, TBT: 98.5ms) and high-contrast CSS applied.
- [x] Step 25: Created `FINAL_SEARCH_INTEGRITY_REPORT.md` and cleaned up unsupported claims.
- [x] Step 26: Commit targeted corrections and push to GitHub `main`.

## Burn Book (Updated)
- Next.js Turbopack Route Validation: When deleting an existing App Router directory (e.g. `src/app/guides/how-to-measure-landscaping-materials/`), Next.js caches route validators in `.next/types/validator.ts`. Run `Remove-Item -Recurse -Force .next` prior to `tsc --noEmit` to clear stale route validator references.
- Schema Rich Results Deprecation: Google officially deprecated `FAQPage` rich results for general commercial/educational websites in late 2023. Do not include `FAQPage` JSON-LD schema (to avoid validation noise); keep FAQs rendered as native, crawlable HTML `<details>/<summary>` tags.
- Next.js metadataBase: If `NEXT_PUBLIC_SITE_URL` is omitted, Next.js warns about resolving social Open Graph images. Provide a default fallback like `new URL(configuredSiteUrl || "https://yardmath.com")` in `metadataBase` to resolve relative asset URLs while keeping staging `noindex` intact.
- Google-Extended vs Googlebot: Google-Extended only controls Gemini and Vertex AI training/grounding. It has zero effect on Google Search crawling, indexing, or Google AI Overviews.
- Active ASTM Standard Review: Always verify the active year designation on standards (e.g., ASTM C29/C29M-23 is the current standard, replacing C29/C29M-17a).
- Article Publisher Logo: Google Article structured data guidelines require an actual brand logo image (e.g. `/favicon.svg` or a square logo), not a 1200x630 social preview card (`/og-image.png`).
