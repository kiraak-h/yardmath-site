---
name: search-integrity-audit
description: Protocol for verifying search integrity, AEO/GEO crawlers, standards currency, and content calculation accuracy in calculator web applications.
---

# Search Integrity and Calculation Content Audit Protocol

## Context & Motivation
Created following the comprehensive search integrity correction phase on YardMath (`70df978bc3aa5e8051947556dfb629a9f75a8b0f`) and refined during the typed calculation and source audit phase (`e03919e37bf0b6fd7275979838dab7f3fcc4b7cc`). Ensures calculator websites do not over-promise feature automation, cite outdated standards, or conflate AI model training with search indexing.

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
- Distinguish syntax validation from live HTTP reachability. Classify HTTP 403 Forbidden responses from anti-bot firewalls (Cloudflare, Akamai) as `Indeterminate / Bot Challenge`, not broken links.
- Do not claim peer-reviewed oversight unless an independent external review board and documented review workflow exist.

### 4. Structured Data & Accessibility Integrity
- Do not emit deprecated schema types (e.g. `FAQPage` rich results, deprecated by Google in 2023 for non-government/health websites). Keep FAQs in crawlable, accessible native HTML (`<details>/<summary>`).
- Article schema publisher `logo` must point to an actual brand logo image asset (SVG or square logo), not a 1200x630 wide Open Graph social preview card.
- Target mobile touch areas must meet the 44px minimum size requirement (e.g. `min-height: 44px` on navigation and footer link containers).
- Contrast ratios must strictly pass WCAG AA (minimum 4.5:1 for normal text) and AAA where feasible.

### 5. Automated Content Math Validation via Typed Fixtures
- Use typed numerical fixtures (e.g. `workedExampleFixtures`) to generate both displayed user copy and automated Vitest assertions, guaranteeing zero content drift.
- Programmatically recalculate every worked example step with the central calculation engine (`calculateMaterial()`).
- Programmatically verify every benchmark table numeric value (e.g. $324 / \text{depth}$ in inches) with numeric comma-stripped parsing.
- Assert that invalid or out-of-boundary zero/negative inputs throw appropriate runtime errors (`RangeError`).
