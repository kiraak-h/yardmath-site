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
- [ ] Step 18: Git stage, commit, push to GitHub `main`, and report commit SHA to user.

## Burn Book (Updated)
- Next.js Turbopack Route Validation: When deleting an existing App Router directory (e.g. `src/app/guides/how-to-measure-landscaping-materials/`), Next.js caches route validators in `.next/types/validator.ts`. Run `Remove-Item -Recurse -Force .next` prior to `tsc --noEmit` to clear stale route validator references.
- Schema Rich Results Deprecation: Google officially deprecated `FAQPage` rich results for general commercial/educational websites in late 2023. Do not include `FAQPage` JSON-LD schema (to avoid validation noise); keep FAQs rendered as native, crawlable HTML `<details>/<summary>` tags.
- Next.js metadataBase: If `NEXT_PUBLIC_SITE_URL` is omitted, Next.js warns about resolving social Open Graph images. Provide a default fallback like `new URL(configuredSiteUrl || "https://yardmath.com")` in `metadataBase` to resolve relative asset URLs while keeping staging `noindex` intact.
