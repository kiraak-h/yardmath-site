# YardMath QA and Verification Status

Date: 20 November 2026

## Verification Pipeline Status

All verification steps passed with zero errors:

- **npm install**: Completed successfully. 390 packages installed and audited.
- **npm run lint**: Passed. All unescaped JSX entities resolved in compliance with ESLint 9 (`eslint-config-next`).
- **npm run typecheck**: Passed. Strict TypeScript semantic checks pass cleanly across all source files with official Next.js 16 and React 19 types.
- **npm run test**: Passed. All unit tests executed with Vitest pass (10/10 tests).
- **npm run build**: Passed. Next.js 16 production build compiled, optimized, and prerendered all 26 static pages and endpoints.

## Browser and End-to-End Testing

Completed live browser testing on local server (`http://localhost:3000`):
1. **Routes Tested**:
   - Homepage (`/`)
   - All 12 Calculator Routes (`/topsoil-calculator/`, `/cubic-yard-calculator/`, `/pea-gravel-calculator/`, `/mulch-calculator/`, `/soil-calculator/`, `/raised-bed-soil-calculator/`, `/compost-calculator/`, `/sand-calculator/`, `/paver-base-calculator/`, `/gravel-driveway-calculator/`, `/concrete-calculator/`, `/crushed-stone-calculator/`)
   - Guides Index (`/guides/`) and Guide Article (`/guides/how-to-measure-landscaping-materials/`)
   - Company & Legal: About (`/about/`), Contact (`/contact/`), Privacy (`/privacy/`), Terms (`/terms/`), Disclaimer (`/disclaimer/`)
   - Custom 404 Page (`/_not-found`)
   - Health Endpoint (`/api/health`) returning `{ status: "ok", service: "yardmath" }`

2. **Responsive Layouts**:
   - Desktop (1440 × 900 px): Passed with no horizontal overflow.
   - Tablet (768 × 1024 px): Passed with no horizontal overflow.
   - Mobile (375 × 812 px): Passed with functional mobile menu drawer toggling open and closed.

3. **Directory Controls**:
   - Live search filtering by title, description, material, and tags.
   - Category filter pills (Soil & garden, Stone & aggregate, Project volume, Construction).
   - Instant `/` keyboard shortcut focus navigation.
   - Zero-results state with one-click "Clear filters" action.

4. **Calculator Features & Mathematics**:
   - **Initial State**: Zero prefilled density or pack volume; bag count and weight estimates remain strictly absent until the visitor enters values.
   - **Shapes**: Rectangle (length × width), Circle (diameter), Triangle (base × perpendicular height).
   - **Conversions**: Bi-directional conversion between Imperial (ft, in, yd³, ft³, lb) and Metric (m, cm, m³, L, kg). Unit price converts accurately without changing total material cost.
   - **Allowance**: Extra-material percentage (0–100%) applied to post-geometric order volume.
   - **Costing**: Cost calculated on post-allowance volume plus flat delivery charge.
   - **Repeated Areas**: Matching areas / beds multiplier correctly scales volume.
   - **Exporting**: One-click Copy estimate, Download estimate (`.txt`), and Print (`window.print()`).
   - **Validation**: Bounds checking and visible error alerts for invalid, zero, or negative inputs.
   - **Reset**: Instantly restores default parameters and collapses optional sections.

5. **Calculation Acceptance Checks**:
   - 20 ft × 15 ft rectangle at 3 in depth with 10% allowance: Base 2.778 yd³, Order volume 3.056 yd³, 2 ft³ bags: 42 packages. (Passed)
   - 2 m × 1 m area at 10 cm depth with 0% allowance: Volume 0.200 m³, 40 L bags: 5 packages. (Passed)
   - 10 ft diameter circle at 4 in depth with 0% allowance: Volume 0.970 yd³ (0.969627... yd³). (Passed)
   - 10 ft base × 6 ft perpendicular height × 12 in depth triangle: Volume 1.111 yd³ (1.111111... yd³). (Passed)

6. **SEO, Metadata, and Privacy**:
   - Strict `noindex` and `disallow: /` dynamically enforced while `NEXT_PUBLIC_SITE_URL` remains unset.
   - Zero third-party trackers, zero advertising scripts, zero cookies, zero third-party form processors.
   - Full JSON-LD structured schemas (`WebSite`, `WebApplication`, `BreadcrumbList`, `FAQPage`, `SoftwareApplication`).
   - Security headers configured (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`).

## Account-specific tasks requiring owner input before public launch

- Connect final custom domain and DNS records.
- Set canonical production URL environment variable `NEXT_PUBLIC_SITE_URL`.
- Set monitored support inbox `NEXT_PUBLIC_CONTACT_EMAIL`.
- Conduct legal identity and privacy review prior to connecting any optional external services.
