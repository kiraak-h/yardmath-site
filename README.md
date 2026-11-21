# YardMath — Complete Landscaping Calculator Website

YardMath is a full Next.js website for homeowners, gardeners, landscapers and DIY users planning outdoor material orders. It includes 12 specialist calculators, a searchable tool directory, supporting measurement guides, trust and policy pages, metadata and structured data, a sitemap/robots endpoint, and a production deployment configuration.

The project is designed as a fast, account-free utility website. Calculations happen in the visitor's browser; no database or user account is required for the current feature set.

For Antigravity, open this folder and use [`ANTIGRAVITY_FINAL_BUILD_PROMPT.md`](./ANTIGRAVITY_FINAL_BUILD_PROMPT.md) to run the actual dependency-backed build, browser QA and launch-readiness checks.

> **Brand note:** YardMath is a working brand name. Check domain, company-name and trademark availability before making it public.

## Included calculators

1. Topsoil calculator
2. Cubic yard calculator
3. Pea gravel calculator
4. Mulch calculator
5. Soil calculator
6. Raised bed soil calculator
7. Compost calculator
8. Sand calculator
9. Paver base calculator
10. Gravel driveway calculator
11. Concrete calculator
12. Crushed stone calculator

Every calculator uses the shared material-volume engine and supports:

- Rectangle, circle (diameter input) and triangle (base + perpendicular height) plan shapes
- Repeated identical areas / beds
- US customary inputs (feet + inches) and metric inputs (metres + centimetres)
- Live cubic-yard, cubic-metre, cubic-foot and litre results
- Optional extra-material allowance, from 0% to 100%
- Optional package/bag count based on the package's entered usable volume
- Optional weight estimate based only on user-entered supplier bulk density in kg/m³ or lb/yd³
- Optional material and delivery cost estimate using a selected display currency
- Copy, download and print project summaries
- Input validation and reset controls

The site also includes a calculator search/filter interface, mobile navigation, about/contact/privacy/terms/disclaimer pages, a measurement guide, FAQ sections, JSON-LD structured data, social preview artwork, a web manifest, a health endpoint and security response headers.

## Requirements

- Node.js 20.9 or later (Node 22 recommended)
- npm 10 or later
- Internet access to install project dependencies on first setup

## Local setup

1. Extract the project archive.
2. Open the `yardmath-site` directory in a terminal or Antigravity IDE.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env.local` and replace the placeholders:

   ```env
   NEXT_PUBLIC_SITE_URL=https://www.your-real-domain.com
   NEXT_PUBLIC_CONTACT_EMAIL=your-monitored-support-address@example.com
   ```

   The domain must be the actual canonical HTTPS domain. The contact email must be monitored. Do not leave example values in production.

5. Start the local development server:

   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000`.

## Quality checks

Run the full verification sequence before deployment:

```bash
npm run verify
```

This executes:

- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript checks
- `npm run test` — calculation-engine unit tests
- `npm run build` — optimized Next.js production build

Individual commands are also available. `npm run test:watch` starts Vitest in watch mode.

## Deployment (Vercel)

The repository contains `vercel.json` configured for the Next.js framework.

1. Create a Git repository and push this project.
2. Import that repository into Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS URL in the Vercel project environment variables.
4. Set `NEXT_PUBLIC_CONTACT_EMAIL` to the real support inbox.
5. Deploy and test the Vercel preview URL.
6. Add the production domain in Vercel and configure the DNS records at the domain registrar.
7. Confirm HTTPS, redirects, canonical URL, `/robots.txt`, `/sitemap.xml` and `/api/health` after the domain is connected.
8. Submit the sitemap in Google Search Console after the public site is live.

**Indexing safeguard:** if `NEXT_PUBLIC_SITE_URL` is missing, the site outputs `noindex` metadata and disallows crawling in `robots.txt`, and the sitemap is empty. Set the real domain before launch to enable indexing.

## Routes

- `/` — homepage and searchable calculator directory
- `/<tool-slug>/` — one route for each of the 12 calculators
- `/guides/` — measurement guide directory
- `/guides/how-to-measure-landscaping-materials/` — practical measurement guide
- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`
- `/disclaimer/`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/api/health`

## Calculation model and important assumptions

The calculation engine intentionally returns geometric volume without silently applying a material-specific compaction, settlement or density factor.

For a rectangular area:

- Imperial: `cubic yards = length (ft) × width (ft) × depth (in) ÷ 324`
- Metric: `cubic metres = length (m) × width (m) × depth (cm) ÷ 100`

For a circle, the area is `π × (diameter ÷ 2)²`. For a triangle, it is `(base × perpendicular height) ÷ 2`.

The optional allowance is applied after base geometric volume. Package counts require the visitor to enter the usable volume of the exact package. Weight estimates require the visitor to enter supplier bulk density. Price estimates use the price per selected volume unit and a flat delivery fee entered by the visitor. Prices are not live market prices and no supplier feeds are connected.

For concrete, enter the product's stated yield volume per bag—not the bag weight. The concrete tool estimates geometric pour volume only; it does not design a structural slab, footing, reinforcement or mix specification.

Paver-base and driveway tools calculate the one layer/depth entered. Calculate different material layers separately. The calculators do not derive compaction factors or convert compacted design thickness into loose delivered quantities.

## Privacy, advertising and business setup

- Calculator input state is handled client-side. The current code does not send entered dimensions to a YardMath database.
- No analytics or advertising scripts are included in this source package.
- No AdSense account, publisher ID, ads.txt, affiliate feed or supplier referral agreement is configured.
- The Contact page displays the email configured by `NEXT_PUBLIC_CONTACT_EMAIL`.
- The Privacy Policy and Terms are baseline website drafts. Have them reviewed and update them to match the legal entity, hosting provider, jurisdiction, analytics, advertising, affiliate and email services actually used.
- Before adding AdSense or other tracking, update the privacy notice and implement any required consent experience for the audience/jurisdictions you serve.

## Verification record

See [`QA_STATUS.md`](./QA_STATUS.md) for the checks run while preparing this source package and the npm-registry limitation that prevented a full Next.js build in this environment.

## Project structure

```text
src/
  app/
    [tool]/page.tsx                         Dynamic static calculator pages
    about/page.tsx                           About page
    api/health/route.ts                      Health endpoint
    contact/page.tsx                         Contact details from environment
    disclaimer/page.tsx                      Calculation limits
    guides/page.tsx                           Guide directory
    guides/how-to-measure-landscaping-materials/page.tsx
    privacy/page.tsx                          Privacy policy draft
    terms/page.tsx                            Terms of use draft
    QA_STATUS.md                               Source and verification notes (repository root)
    error.tsx                                 Route error boundary
    globals.css                               Responsive visual system
    layout.tsx                                Metadata, header/footer, shell
    loading.tsx                               Loading state
    manifest.ts                               Web app manifest
    not-found.tsx                             Custom 404 page
    page.tsx                                  Homepage
    robots.ts                                 Robots policy
    sitemap.ts                                Sitemap
  components/
    Calculator.tsx                            Shared interactive calculator
    SiteFooter.tsx
    SiteHeader.tsx                             Responsive navigation
    ToolCard.tsx
    ToolDirectory.tsx                          Searchable/filterable directory
  lib/
    calculation.ts                             Shared validated calculation engine
    calculation.test.ts                        Unit tests
    tools.ts                                    Tool content and FAQs
public/
  favicon.svg
  og-image.svg
  og-image.png
ANTIGRAVITY_FINAL_BUILD_PROMPT.md  Antigravity final verification and launch prompt
QA_STATUS.md                       Checks completed and environment limitation
```

## Remaining account-specific launch actions

The application source is complete as a deployable website codebase. Public launch still requires the site owner's real domain, hosting account, contact inbox and account-specific services. Those credentials cannot be safely guessed or created on the owner's behalf from this source package.
