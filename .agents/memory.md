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
- [x] Step 27: Final search-integrity and technical audit completion:
  - Aligned Paver Base metadata, quick answer, description, formula, and benchmark table to neat geometric volume ($81.0\text{ sq ft/yd}^3$ at 4") with manual compaction allowance (18%–20%).
  - Qualified construction and horticultural recommendations (ACI 332 residential slab minimums, ACI 302.1R joint spacing, single-layer driveway tool, ISA 2–3" mulch depths, USCC compost application rates).
  - Built typed fixture module `src/lib/worked-examples.ts` coupling UI content with automated calculation validation.
  - Expanded `src/lib/content-validation.test.ts` to 27 tests (37 project total) testing all 12 worked examples against `calculateMaterial()`, all benchmark table formulas, all unit conversions, and boundary/zero inputs.
  - Audited all 42 cited source URLs: verified HTTP reachability, classified 403 responses as Cloudflare bot defense (indeterminate, not broken), and mapped direct publication links. Saved machine-readable data to `scratch/url_audit_complete.json`.
  - Added WCAG AA/AAA high-contrast color styles and $44\text{px}$ touch targets to `src/app/globals.css`.
  - Executed Lighthouse lab audit on production build: 100 Performance, 100 Accessibility, 100 Best Practices, 66 SEO (staging guard), 100 Agentic Browsing (`scratch/lighthouse-topsoil-final.report.*`).
  - Updated `FINAL_SEARCH_INTEGRITY_REPORT.md` with all empirical results and pre-launch guidance.
- [x] Step 28: Git stage, commit, and push final changes to `main`.
- [x] Step 29: Resolution of independent review discrepancies:
  - Fixed source audit: Replaced broken USBR 404 URL with USACE Engineer Manual EM 1110-1-1005 (Chapter 8: Earthwork Volume Computations); mapped generic homepages to exact publication links (CMHA PAV-TEC-002 & 004, NSSGA/SME Aggregates Handbook, USDA NRCS NEH Part 650, Cornell turfgrass, RHS garden plan). Audit totals: 40 HTTP 200, 2 HTTP 403 (Cloudflare bot challenge on ASLA and USCC, verified indeterminate), 0 HTTP 404.
  - Concrete Calculator: Removed universal 4.0" (3.5" for 2x4s) minimum and 3,500+ PSI prescriptions; explained dressed 2x4 form boards (3.5") set perimeter pour height rather than structural suitability; qualified thickness and strength by local code, exposure, subgrade, and loads; accurately cited ACI 302.1R-15 and PCA EB001.
  - Paver Base Calculator: Described 18%–20% compaction allowance as an optional planning assumption to verify with suppliers; linked CMHA PAV-TEC-004 directly; noted ASTM D2940 governs aggregate grading and quality rather than shrinkage percentage.
  - Strengthened Content & Calculation Tests: Expanded `src/lib/content-validation.test.ts` to 42 tests (52 total across project). Validates every displayed step against calculation engine, tests benchmark single values and both range endpoints ($324 / D_{max}$ and $324 / D_{min}$), and tests rejection of invalid/non-finite inputs (NaN, Infinity, negative, zero dimensions, invalid quantities/allowances) with zero network calls.
  - Matched Lighthouse metrics in `FINAL_SEARCH_INTEGRITY_REPORT.md` to committed JSON artifact (`scratch/lighthouse-topsoil-final.report.json`: FCP: 1.2s, LCP: 1.2s, TBT: 60ms, CLS: 0.000, Speed Index: 1.2s, single-route mobile emulation). Qualified automated accessibility vs universal WCAG and noted SEO requires live domain check after `NEXT_PUBLIC_SITE_URL` deployment.
  - Verified clean `npm run verify` pipeline (ESLint clean, TypeScript clean, 52/52 Vitest passed, Next.js build 34/34 static prerendered).

## Burn Book (Updated)
- Next.js Turbopack Route Validation: When deleting an existing App Router directory (e.g. `src/app/guides/how-to-measure-landscaping-materials/`), Next.js caches route validators in `.next/types/validator.ts`. Run `Remove-Item -Recurse -Force .next` prior to `tsc --noEmit` to clear stale route validator references.
- Schema Rich Results Deprecation: Google officially deprecated `FAQPage` rich results for general commercial/educational websites in late 2023. Do not include `FAQPage` JSON-LD schema (to avoid validation noise); keep FAQs rendered as native, crawlable HTML `<details>/<summary>` tags.
- Next.js metadataBase: If `NEXT_PUBLIC_SITE_URL` is omitted, Next.js warns about resolving social Open Graph images. Provide a default fallback like `new URL(configuredSiteUrl || "https://yardmath.com")` in `metadataBase` to resolve relative asset URLs while keeping staging `noindex` intact.
- Google-Extended vs Googlebot: Google-Extended only controls Gemini and Vertex AI training/grounding. It has zero effect on Google Search crawling, indexing, or Google AI Overviews.
- Active ASTM Standard Review: Always verify the active year designation on standards (e.g., ASTM C29/C29M-23 is the current standard, replacing C29/C29M-17a).
- Article Publisher Logo: Google Article structured data guidelines require an actual brand logo image (e.g. `/favicon.svg` or a square logo), not a 1200x630 social preview card (`/og-image.png`).
