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
- [x] Step 30: Truthful Source Verification, CMHA Paver Base Mapping & Exhaustive Worked-Example Validation:
  - Truthful Source Verification: Separated `httpReachability` from `substantiveClaimVerification`. HTTP 200 no longer automatically validates claims without documented primary literature evidence (exact document title, specific supported claim, relevant section/page, and direct excerpt). Audit across 45 sources: 44 HTTP 200 (Reachable), 1 HTTP 403 (USCC STA protected by remote bot challenge, indeterminate; supported by offline USCC literature), 0 HTTP 404.
  - Penn State Citation Correction: Disproved confabulated "Agronomy Facts 62: Soil Amendments and Turfgrass Establishment" (official Penn State Extension records confirm Agronomy Facts 62 is *Weed Management in Pasture Systems* by W. S. Curran and D. D. Lingenfelter) and cited Penn State's real publication *Lawn Establishment: Preparing the Soil and Grading* by Dr. Peter Landschoot.
  - Replaced Inaccessible ASLA Homepage: Replaced generic ASLA homepage with USDA Forest Service / FHWA *Trail Construction and Maintenance Notebook (0723-2806-MTDC): Tread Materials and Surfacing* (`https://www.fhwa.dot.gov/environment/recreational_trails/publications/fs_publications/07232806/page09.cfm`), returning HTTP 200 OK and directly governing 2–3" aggregate trail depths.
  - Replaced generic Penn State Center homepage with direct DSA Technical Bulletin PDF (`https://dirtandgravel.psu.edu/wp-content/uploads/Tech-Bulletin_Driving_Surface_Aggregate_2025.pdf`), updated PCA to active `https://www.cement.org/cement-concrete/`, and updated FHWA geotechnical library listing to `https://www.fhwa.dot.gov/engineering/geotech/library_listing.cfm`.
  - CMHA Paver Base Source Mapping: Mapped CMHA PAV-TEC-002 for pedestrian walkways/patios (4" minimum on well-drained soils) and residential driveways (6" minimum on well-drained soils), and CMHA PAV-TEC-004 for structural design (8–12" base). Re-framed 20% in worked example as an illustrative manual assumption; removed unsupported contractor compaction percentage claims (15–20%, 5–10%).
  - Exhaustive Worked-Example Validation: Replaced loose label substring matching with explicit typed step categories (`surface_area`, `base_volume`, `order_volume`, `packaging_yield`, `total_weight`, `metric_equivalent`). Validates all 4 weight units (lbs, US short tons, metric tonnes, UK long tons) and fails explicitly on unhandled categories.
  - Test & Build Pipeline: 55/55 Vitest tests pass (45 content-validation tests + 10 calculation tests), 0 ESLint warnings/errors, strict TypeScript clean, and 34/34 Next.js static pages prerendered. Updated `FINAL_SEARCH_INTEGRITY_REPORT.md` and `scratch/url_audit_complete.json`.
- [x] Step 31: Final Factuality, Construction Guidance & Test-Integrity Tightening:
  - Source Audit Methodology Transparency: Documented in `scratch/generate_complete_url_audit.js` and `FINAL_SEARCH_INTEGRITY_REPORT.md` that HTTP reachability and page titles are automated network checks, while substantive claim verification is a separately documented manual review (not script-automated NLP body matching). Preserved exact titles, sections/pages, and excerpts. USCC HTTP 403 remains strictly Indeterminate.
  - Construction & Structural Guidance: Concrete FAQ clarifies that aggregate subbase thickness depends on soil support, drainage, loads, and climate, and is kept distinct from concrete slab thickness. Gravel driveway FAQ eliminates universal 8–12" #3/#411/#57 prescription and explains traffic, subgrade, drainage, and grading factors, qualifying #57 vs dense-graded wearing surfaces per FHWA principles. Paver base retains CMHA PAV-TEC-002 for well-drained pedestrian/driveway minimums and PAV-TEC-004 for structural designs with visible engineering caveat.
  - Horticultural Settling Claims: Labeled settling figures (10–15%, 15–20%) as illustrative planning assumptions across topsoil, mulch, garden soil, raised bed, and compost tools and guides.
  - Worked-Example Test Consistency: In `src/lib/content-validation.test.ts`, verified 1:1 complete step correspondence between typed fixtures and rendered `tool.workedExample.steps`. Enforced unique step labels, validated dynamic category coverage based on actual inputs (density, packaging, metric equivalent), and retained all numeric result and 4-unit tonnage assertions with zero unvalidated steps.
  - Verification & Build: 55/55 Vitest tests pass, 0 ESLint warnings, 0 TypeScript errors, 34/34 static pages prerendered. Documented pre-launch notice that production readiness requires live environment variables, domain indexing, and physical device validation.
- [x] Step 32: Final Factuality & Test-Integrity Polish:
  - Delineated Report Status: Replaced "100% Programmatically Verified" status in `FINAL_SEARCH_INTEGRITY_REPORT.md` with clear methodology breakdown distinguishing automated network checks (HTTP 200/403/titles), manual substantive literature review, and automated test pipeline.
  - Qualified All Settling & Compaction Assumptions: Qualified gravel driveway 15–20% base compaction and ~5% #57 stone settling in `tools.ts` and Guide 5; qualified crushed stone compaction percentages in `tools.ts`; removed fixed `× 1.15` order volume formula in topsoil guide (Guide 2) and raised-bed guide (Guide 8), separating neat geometric volume from optional user-selected allowances; removed description of 10–15% as a "standard" allowance in garden soil.
  - Tightened Input-Driven Category Assertions: In `src/lib/content-validation.test.ts`, directly asserted `total_weight` and `packaging_yield` step coverage based on `fixture.input.density` and `fixture.input.bagSize`, and strictly verified that expected weight and bag outputs match those inputs.
  - Verified Pipeline: 0 ESLint warnings, 0 TypeScript errors, 55/55 Vitest passed, 34/34 static pages prerendered. Staged, committed, and pushed to `main`.
- [x] Step 33: Cross-Page Construction Guidance Consistency & Regression Suite:
  - Gravel Driveway Guide Alignment: Completely updated `gravel-driveway-material-estimation` in `src/lib/guides.ts` so tiered three-layer cross-sections are presented as a conditional engineering approach for weak soils and heavy traffic rather than universally required for all residential driveways; added 1.5–2" single-layer replenishment and 4–6" single dense-graded aggregate options; qualified #57 open-graded vs dense-graded wearing surfaces; and distinguished FHWA unpaved road guidelines from private residential driveways.
  - Concrete Calculator Allowance Structure: Removed universal mandatory 10% allowance language in `src/lib/tools.ts` and `src/lib/worked-examples.ts`; adopted neat geometric volume + user-selected optional allowance structure across `formula`, `howTo`, `formulaExplanation`, `inputsGuide`, `quickAnswer`, `commonMistakes`, and FAQs.
  - Accurate Citation Counts: Synchronized `FINAL_SEARCH_INTEGRITY_REPORT.md` to precisely reflect 45 citations assessed and documented, 44 substantively verified, 1 indeterminate (USCC STA HTTP 403), 44 HTTP 200 reachable, 1 HTTP 403 indeterminate, and 0 broken links.
  - Automated Regression Tests: Added 3 new tests in `src/lib/content-validation.test.ts` verifying driveway guide non-prescriptive language, concrete calculator non-mandatory allowance structure, and internal consistency of search-integrity report counts. Vitest now passes 58/58.
- [x] Step 34: Final Gravel Driveway Calculator Alignment, Geotextile Precision & Test Count Synchronization:
  - Aligned Gravel Driveway Calculator (`src/lib/tools.ts`): Updated `howTo`, `quickAnswer`, `benchmarkTable`, `formula`, `formulaExplanation`, `inputsGuide`, `materialSpecifics`, `commonMistakes`, and `faqs` to emphasize optional user-selected planning allowances, distinguish #57 open-graded stone from dense-graded aggregates with fines, position crowning as a drainage design practice, qualify layer depths as illustrative planning figures, and present geotextile separation fabric as conditional (woven stabilization vs non-woven filtration, unnecessary on firm/well-drained ground).
  - Refined Driveway Guide (`src/lib/guides.ts`): Replaced categorical "permanent barrier" and "heavy non-woven geotextile" with conditional separation fabric specifications.
  - Expanded Regression Suite (`src/lib/content-validation.test.ts`): Expanded suite to 50 content validation tests (60 total across project) testing copy fields across driveway calculator, driveway guide, concrete calculator, and arithmetic consistency of report source and test counts.
  - Report Test Count Synchronization (`FINAL_SEARCH_INTEGRITY_REPORT.md`): Synchronized all test run outputs to 60/60 tests (10 calculation + 50 content tests).
  - Verified Pipeline: 0 ESLint warnings, 0 TypeScript errors, 60/60 Vitest passed, 34/34 Next.js static pages prerendered.

## Burn Book (Updated)
- Next.js Turbopack Route Validation: When deleting an existing App Router directory (e.g. `src/app/guides/how-to-measure-landscaping-materials/`), Next.js caches route validators in `.next/types/validator.ts`. Run `Remove-Item -Recurse -Force .next` prior to `tsc --noEmit` to clear stale route validator references.
- Schema Rich Results Deprecation: Google officially deprecated `FAQPage` rich results for general commercial/educational websites in late 2023. Do not include `FAQPage` JSON-LD schema (to avoid validation noise); keep FAQs rendered as native, crawlable HTML `<details>/<summary>` tags.
- Next.js metadataBase: If `NEXT_PUBLIC_SITE_URL` is omitted, Next.js warns about resolving social Open Graph images. Provide a default fallback like `new URL(configuredSiteUrl || "https://yardmath.com")` in `metadataBase` to resolve relative asset URLs while keeping staging `noindex` intact.
- Google-Extended vs Googlebot: Google-Extended only controls Gemini and Vertex AI training/grounding. It has zero effect on Google Search crawling, indexing, or Google AI Overviews.
- Active ASTM Standard Review: Always verify the active year designation on standards (e.g., ASTM C29/C29M-23 is the current standard, replacing C29/C29M-17a).
- Article Publisher Logo: Google Article structured data guidelines require an actual brand logo image (e.g. `/favicon.svg` or a square logo), not a 1200x630 social preview card (`/og-image.png`).
