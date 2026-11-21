# Project Memory - YardMath Landscaping Calculators

## Context
- Project: YardMath (production-ready landscaping material calculator website)
- Framework & Tools: Next.js 16 (App Router with Turbopack), React 19, TypeScript (strict), ESLint 9, Vitest 3.
- Goal: Production website handoff verification, test suite execution, browser testing of all 12 calculators and static routes, metadata/security audits, and launch readiness checklist.

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

## Active Scratchpad
- [x] Step 1: Install dependencies with `npm install` (clean install, 390 packages).
- [x] Step 2: Fix ESLint unescaped entities in 6 files (`[tool]/page.tsx`, `about/page.tsx`, `error.tsx`, `guides/.../page.tsx`, `not-found.tsx`, `page.tsx`).
- [x] Step 3: Run `npm run verify` (lint, typecheck, test, build) - all passed.
- [x] Step 4: Run dev server and execute browser tests via Chrome DevTools MCP:
  - Homepage, `/about/`, `/contact/`, `/guides/`, `/guides/how-to-measure-landscaping-materials/`, `/privacy/`, `/terms/`, `/disclaimer/`, `/does-not-exist` (404), `/api/health`.
  - Desktop (1440px), Tablet (768px), Mobile (375px) responsive layouts without horizontal overflow.
  - Mobile hamburger menu toggle and navigation links.
  - Directory search and category filtering with `/` keyboard shortcut focus.
  - All 12 calculator pages tested with shape changes (Rectangle, Circle, Triangle), metric/imperial switching, allowance adjustment, package counts, density weights, cost estimates, validation errors, reset, copy, download, and print.
- [x] Step 5: Verified calculation acceptance checks:
  - 20 ft × 15 ft × 3 in at 10% allowance = 2.778 yd³ base, 3.056 yd³ order volume, 42 packages of 2 ft³ (round up).
  - 2 m × 1 m × 10 cm at 0% allowance = 0.200 m³, 5 packages of 40 L.
  - 10 ft diameter circle at 4 in depth = ~0.970 yd³ (0.969627... yd³).
  - 10 ft base × 6 ft perpendicular height × 12 in depth triangle = ~1.111 yd³ (1.111111... yd³).
- [x] Step 6: Verified zero cookies, zero external trackers, strict security headers, and dynamic noindex when canonical URL is unset.
- [x] Step 7: Completed QA Review and self-learning protocol.
