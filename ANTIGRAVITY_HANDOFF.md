# YardMath — Production Website Handoff

## Objective

Treat this project as a complete website implementation, not as an MVP or a visual prototype. Preserve the existing information architecture, 12 calculator routes, shared calculation engine and measurement assumptions. Do not replace functioning calculator logic with mock results.

## Engineering requirements

1. Install dependencies and run `npm run verify`.
2. Resolve all lint, TypeScript, unit-test and production-build failures. Do not weaken strict TypeScript settings to silence errors.
3. Start `npm run dev` and browser-test the homepage, all 12 calculator routes, guide, about, contact, privacy, terms, disclaimer, 404 and health endpoint.
4. Check desktop, tablet and mobile widths. Verify the mobile menu opens/closes and the directory search/filter works, including the `/` keyboard shortcut.
5. On every calculator, verify shape changes, metric/imperial conversion, quantity, allowance, invalid inputs, package yield, supplier density (kg/m³ or lb/yd³), price/delivery estimates, reset, copy, text download and print.
6. Confirm the calculator does not prefill package volume or material density. Weight and package estimates must remain absent until the visitor enters supplier/product values.
7. Verify circle dimensions are treated as diameter; triangle dimensions are base and perpendicular height.
8. Confirm cost is calculated on the post-allowance volume using the displayed unit and currency. Changing measurement systems must convert the entered unit price without changing the underlying estimate.
9. Verify metadata, canonical URLs, JSON-LD, robots, sitemap, Open Graph image, manifest and security headers.
10. Confirm the site remains `noindex` until `NEXT_PUBLIC_SITE_URL` is set to the real canonical production URL.
11. Do not connect analytics, ad scripts, cookies, affiliate tags or third-party forms without updating the privacy policy and adding legally appropriate consent handling.

## Calculation acceptance checks

For a 20 ft × 15 ft rectangle at 3 in depth with 10% allowance:

- Base volume: 2.777777... yd³
- Order volume after allowance: 3.055555... yd³
- With a 2 ft³ package: 42 packages (round up)

For a 2 m × 1 m area at 10 cm depth with no allowance:

- Volume: 0.2 m³
- With 40 L packages: 5 packages

For a 10 ft diameter circle at 4 in depth with no allowance:

- Volume: approximately 0.969627 yd³

For a triangle with 10 ft base, 6 ft perpendicular height and 12 in depth:

- Volume: approximately 1.111111 yd³

## External launch setup requiring owner input

- Final domain and DNS control
- Vercel or other hosting account
- Monitored support email (`NEXT_PUBLIC_CONTACT_EMAIL`)
- Final business/legal identity and legal review
- Optional analytics/Search Console connection
- Optional AdSense approval, publisher configuration and consent management
- Optional affiliate programme and supplier referral agreements

Never invent these credentials or claim the site is deployed until the provider confirms deployment and the public URL has been tested.
