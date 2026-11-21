# Antigravity Agent Prompt — Final YardMath Build, QA and Launch Readiness

You are working in the `yardmath-site` repository. This is intended to become the complete YardMath public website, not an MVP, prototype, demo or mockup. The source already contains the homepage, 12 real calculator routes, calculator logic, guide pages, policy pages, SEO metadata, structured data, sitemap/robots, responsive navigation and deployment configuration.

## Your mission

Finish the engineering verification and production hardening of the existing implementation. Do not replace the working calculator logic with mock calculations. Do not remove pages or reduce the calculator catalogue. Preserve all 12 tool URLs.

## Phase 1 — Install and verify

1. Inspect the repository and read `README.md`, `QA_STATUS.md` and `ANTIGRAVITY_HANDOFF.md`.
2. Run `npm install` using the repository's package.json.
3. Run `npm run lint`, `npm run typecheck`, `npm run test` and `npm run build`.
4. Fix every genuine warning or error. Do not disable strict TypeScript, broadly suppress ESLint, or delete tests merely to get a green result.
5. Update `QA_STATUS.md` with exact commands and outcomes. Never mark a command as passed unless it was run successfully.

## Phase 2 — Functional browser QA

Run `npm run dev` and test the actual website in a browser.

Test:
- Homepage loads and every tool card opens the correct calculator.
- Search by material, category filters, no-results state, clear filters and `/` keyboard shortcut.
- Desktop navigation and mobile menu open/close/navigation behavior.
- Every one of the 12 calculator pages loads directly from its URL and refreshes without a routing error.
- Rectangle, circle (diameter input) and triangle (base + perpendicular height) calculations.
- US/Imperial ↔ Metric conversion, including length, depth, package volume and unit price.
- Repeated identical areas, allowance limits, blank optional values, invalid values and reset behavior.
- Package counts only appear after entering the real package yield/volume.
- Weight only appears after entering supplier density, with both kg/m³ and lb/yd³ selectable.
- Material cost and delivery fee use the currently displayed price unit and selected currency.
- Copy estimate, download summary and print estimate actions.
- About, Contact, Privacy, Terms, Disclaimer, Guides, custom 404 and `/api/health` routes.
- Tablet and mobile layouts, keyboard navigation, visible focus, labels and screen-reader announcements.

Use these acceptance values:
- 20 ft × 15 ft × 3 in, 10% allowance = approximately 3.055556 yd³.
- 2 m × 1 m × 10 cm, no allowance = 0.2 m³.
- 10 ft circle diameter × 4 in depth = approximately 0.969627 yd³.
- Triangle base 10 ft × perpendicular height 6 ft × 12 in depth = approximately 1.111111 yd³.
- 0.2 m³ divided into 40 L packages = 5 packages.

## Phase 3 — SEO and deployment checks

1. Confirm page titles/descriptions, canonical URLs, Open Graph/Twitter metadata and JSON-LD.
2. Confirm `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` and `/api/health` return valid responses.
3. Confirm the site stays `noindex` and the sitemap stays empty until `NEXT_PUBLIC_SITE_URL` is set.
4. Never leave `https://www.your-domain.com` or `hello@your-domain.com` as real production configuration. The owner must supply the actual domain and monitored support inbox.
5. Do not add analytics, ad networks, affiliate tracking, cookies or third-party forms unless the owner explicitly asks and the Privacy Policy/consent implementation is updated for the actual providers and audience jurisdictions.
6. Do not create fictitious supplier partnerships, prices, customer testimonials, business addresses, support contacts, AdSense approval or deployment claims.
7. Run a production build after the final code changes.

## Phase 4 — Finish and report

Deliver:
- The complete corrected source code.
- A verified `npm run verify` result, or a precise list of blocked checks and why they could not run.
- Browser QA notes for desktop and mobile.
- A list of owner-only external actions still needed (domain, hosting, contact inbox, legal review, Search Console and optional monetization).

Do not say the website is deployed until a real public URL is configured, deployed by the hosting provider and tested in the browser. Do not claim an npm build passed if the package registry is unavailable. Do not stop after updating documentation; complete the implementation and tests.
