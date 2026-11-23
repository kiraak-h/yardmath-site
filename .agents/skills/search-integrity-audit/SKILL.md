---
name: search-integrity-audit
description: Protocol for verifying search integrity, AEO/GEO crawlers, standards currency, and content calculation accuracy in calculator web applications.
---

# Search Integrity and Calculation Content Audit Protocol

## Context & Motivation
Created following the comprehensive search integrity correction phase on YardMath (`70df978bc3aa5e8051947556dfb629a9f75a8b0f`), refined during the typed calculation and source audit phase (`e03919e37bf0b6fd7275979838dab7f3fcc4b7cc`), updated with benchmark range parsing and concrete qualification (`23221afbcfbf7ae417fcbf58c1138a896ca5ec1c`), tightened with truthful source verification and CMHA dual-spec mapping (`3b9846c9b5d18ee2c2ae5faaac5096b8ab040807`), completed with transparent audit methodology, qualified construction guidance, and strict worked-example validation (`f37502f2ac3f98b4373948ae24830784465d3a0a`), aligned cross-page on gravel driveway and concrete copy with synchronized report test counts (`4c24b9c23c575389612817fe7b13e0244a349be0`), and refined with geotechnical evidence alignment for geotextile criteria and unpaved road crowning (`5777f109f0b4bc635fa6bbbe077a006c24465639`). Ensures calculator websites do not over-promise feature automation, cite outdated standards, conflate AI model training with search indexing, or present localized rules of thumb as universal physical mandates.

## Rules & Patterns

### 1. Crawler Directives (AEO vs GEO vs Training)
- **ChatGPT Search Crawler (`OAI-SearchBot`)**: Always keep allowed in production `robots.txt` if ChatGPT Search discovery is desired.
- **OpenAI Model Scraper (`GPTBot`)**: Disallow by default unless explicit model training permission is granted (`ALLOW_GPTBOT=true`).
- **Gemini / Vertex AI Training (`Google-Extended`)**: Disallow by default unless explicitly permitted (`ALLOW_GOOGLE_EXTENDED=true`). Clearly document that `Google-Extended` controls Gemini Apps/Vertex AI training and grounding—it has zero impact on Google Search indexing or Google AI Overviews (which run on standard `Googlebot`).

### 2. Feature & Content Consistency
- Never claim multi-layer calculation automation if the calculator UI only computes a single volume.
- Never claim automatic compaction calculations if the calculator relies on user-specified allowance percentages.
- Always require manufacturer pack yield volume inputs rather than hardcoding static 60 lb / 80 lb bag volume constants.
- Include short ton (2,000 lb), metric tonne (1,000 kg), and long ton (2,240 lb) conversions in weight estimation when ton units are referenced in the UI or exports.

### 3. Standards Currency & Authoritative Citations
- Always check the active year designation on cited technical standards (e.g., `ASTM C29/C29M-23` instead of outdated `C29/C29M-17a`).
- Every citation must provide a verified, clickable `url` pointing to an official publishing organization or specific publication (ASTM, ACI, USDA, University Extension).
- **Separation of Reachability vs Substantive Support:** Distinguish live HTTP reachability from substantive claim verification. An HTTP 200 response must never automatically mean a claim is supported without verifying primary literature text. Document exact titles, relevant sections/pages, and direct source excerpts. Note clearly that automated scripts check network status and titles, while substantive verification represents a separately documented manual literature review.
- Classify HTTP 403 Forbidden responses from anti-bot firewalls (Cloudflare, Akamai) as `Indeterminate / Bot Defense`, not broken links; maintain offline verification evidence where available.
- Verify publication titles against publisher records to prevent confabulated series numbers (e.g. Penn State *Lawn Establishment: Preparing the Soil and Grading* vs unrelated *Agronomy Facts 62*).
- Map specific technical documents accurately (e.g., CMHA `PAV-TEC-002` for pedestrian/driveway construction guidelines and `PAV-TEC-004` for structural base design).
- Do not claim peer-reviewed oversight unless an independent external review board and documented review workflow exist.

### 4. Construction & Horticultural Guidance Factuality
- **Concrete Slab vs Subbase:** Keep concrete slab thickness strictly distinct from aggregate subbase thickness. Never prescribe a universal 4" compacted crushed stone minimum under residential slabs without referencing local engineering specifications, subgrade bearing capacity, drainage requirements, and frost depth.
- **Driveway Layering & Aggregate Grading:** Avoid prescribing rigid universal driveway profiles (e.g., #3 base + #411 crusher run + #57 wearing course). Explain that driveway structure depends on traffic load, subgrade strength, climate, and drainage. Accurately reflect FHWA gravel road guidance: dense-graded aggregates with binding fines form compact, rut-resistant surfaces, whereas open-graded stones like #57 are loose and prone to lateral displacement unless used for drainage.
- **Horticultural Settling Assumptions:** Label soil, mulch, compost, and raised bed settling or decomposition percentages (10–15%, 15–20%) as illustrative planning assumptions, not universal material constants.
- **Paver Base Engineering Caveats:** Distinguish light-duty pedestrian walkways (4") and residential driveways (6") on well-drained soils per CMHA PAV-TEC-002 from structural commercial pavements or weak/clay subgrades requiring 8–12"+ bases designed under CMHA PAV-TEC-004 with local civil/geotechnical design.

### 5. Structured Data & Accessibility Integrity
- Do not emit deprecated schema types (e.g. `FAQPage` rich results, deprecated by Google in 2023 for non-government/health websites). Keep FAQs in crawlable, accessible native HTML (`<details>/<summary>`).
- Article schema publisher `logo` must point to an actual brand logo image asset (SVG or square logo), not a 1200x630 wide Open Graph social preview card.
- Target mobile touch areas must meet the 44px minimum size requirement (e.g. `min-height: 44px` on navigation and footer link containers).
- Contrast ratios must strictly pass WCAG AA (minimum 4.5:1 for normal text) and AAA where feasible.

### 6. Automated Content Math Validation via Typed Fixtures
- Use typed numerical fixtures (e.g. `workedExampleFixtures`) to generate both displayed user copy and automated Vitest assertions, guaranteeing zero content drift.
- Enforce explicit typed step categories (e.g. `WorkedExampleStepCategory` union: `surface_area`, `base_volume`, `order_volume`, `packaging_yield`, `total_weight`, `metric_equivalent`) and switch on category in test assertions; fail immediately on any unhandled or unrecognized step category.
- Recalculate every step with the central calculation engine (`calculateMaterial()`) and validate all weight unit variations (lbs, US short tons, metric tonnes, UK long tons).
- Assert 1:1 complete step correspondence between typed fixtures and rendered `tool.workedExample.steps` (comparing `label`, `formula`, `result`, `explanation`, `category`, and `packageYieldCuFt`), ensuring zero unvalidated steps and zero duplicate step labels.
- Dynamically assert category coverage based on actual fixture inputs (e.g., `total_weight` coverage asserted if and only if density is specified; `packaging_yield` asserted if and only if retail bag packaging is defined).
- Programmatically verify every benchmark table numeric value (e.g. $324 / \text{depth}$ in inches) with numeric comma-stripped parsing and range endpoint verification ($324 / D_{max}$ and $324 / D_{min}$).
- Assert that invalid or out-of-boundary zero/negative inputs throw appropriate runtime errors (`RangeError`).
- Keep deterministic CI test suites completely isolated from live remote network requests.
