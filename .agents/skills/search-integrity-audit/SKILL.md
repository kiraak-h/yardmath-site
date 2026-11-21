---
name: search-integrity-audit
description: Protocol for verifying search integrity, AEO/GEO crawlers, standards currency, and content calculation accuracy in calculator web applications.
---

# Search Integrity and Calculation Content Audit Protocol

## Context & Motivation
Created following the comprehensive search integrity correction phase on YardMath (`70df978bc3aa5e8051947556dfb629a9f75a8b0f`). Ensures calculator websites do not over-promise feature automation, cite outdated standards, or conflate AI model training with search indexing.

## Rules & Patterns

### 1. Crawler Directives (AEO vs GEO vs Training)
- **ChatGPT Search Crawler (`OAI-SearchBot`)**: Always keep allowed in production `robots.txt` if ChatGPT Search discovery is desired.
- **OpenAI Model Scraper (`GPTBot`)**: Disallow by default unless explicit model training permission is granted (`ALLOW_GPTBOT=true`).
- **Gemini / Vertex AI Training (`Google-Extended`)**: Disallow by default unless explicitly permitted (`ALLOW_GOOGLE_EXTENDED=true`). Clearly document that `Google-Extended` controls Gemini Apps/Vertex AI training and grounding—it has zero impact on Google Search indexing or Google AI Overviews (which run on standard `Googlebot`).

### 2. Feature & Content Consistency
- Never claim multi-layer calculation automation if the calculator UI only computes a single volume.
- Never claim automatic compaction calculations if the calculator relies on user-specified allowance percentages.
- Always require manufacturer pack yield volume inputs rather than hardcoding static 60 lb / 80 lb bag volume constants.
- Include short ton (2,000 lb), metric tonne (1,000 kg), and long ton (2,240 lb) conversions in weight estimation when ton units are referenced.

### 3. Standards Currency & Authoritative Citations
- Always check the active year designation on cited technical standards (e.g., `ASTM C29/C29M-23` instead of outdated `C29/C29M-17a`).
- Every citation must provide a verified, clickable `url` pointing to an official publishing organization (ASTM, ACI, USDA, University Extension).
- Do not claim peer-reviewed oversight unless an independent external review board and documented review workflow exist.

### 4. Structured Data Integrity
- Do not emit deprecated schema types (e.g. `FAQPage` rich results, deprecated by Google in 2023 for non-government/health websites). Keep FAQs in crawlable, accessible native HTML (`<details>/<summary>`).
- Article schema publisher `logo` must point to an actual brand logo image asset (SVG or square logo), not a 1200x630 wide Open Graph social preview card.

### 5. Automated Content Math Validation
- Implement automated tests (e.g. in Vitest) that parse all worked examples and benchmark tables in content datasets.
- Assert that every step's formula, post-allowance math, unit conversions, and cross-reference URLs match programmatic calculations before deployment.
