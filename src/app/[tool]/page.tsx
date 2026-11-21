import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Calculator from "@/components/Calculator";
import { getTool, tools } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((tool) => ({ tool: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const canonicalUrl = siteUrl ? `${siteUrl}/${tool.slug}/` : `/${tool.slug}/`;

  return {
    title: tool.metaTitle || tool.name,
    description: tool.metaDescription || tool.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${tool.name} | YardMath`,
      description: tool.metaDescription || tool.description,
      type: "website",
      url: canonicalUrl,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: tool.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | YardMath`,
      description: tool.metaDescription || tool.description,
      images: ["/og-image.png"],
    },
  };
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const related = tools
    .filter((item) => item.slug !== tool.slug)
    .sort((a, b) => Number(b.category === tool.category) - Number(a.category === tool.category))
    .slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const pageUrl = siteUrl ? `${siteUrl}/${tool.slug}/` : `/${tool.slug}/`;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", ...(siteUrl ? { item: siteUrl } : {}) },
      { "@type": "ListItem", position: 2, name: "Calculators", ...(siteUrl ? { item: `${siteUrl}/#calculators` } : {}) },
      { "@type": "ListItem", position: 3, name: tool.name, ...(siteUrl ? { item: pageUrl } : {}) },
    ],
  };

  const appData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `YardMath ${tool.name}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern web browser.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.metaDescription || tool.description,
    ...(siteUrl ? { url: pageUrl } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(appData) }} />

      <div className="tool-page-hero">
        <div className="page-width">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#calculators">Calculators</Link>
            <span>/</span>
            <span>{tool.shortName}</span>
          </div>
          <div className="tool-page-heading">
            <div>
              <span className="section-kicker">{tool.eyebrow}</span>
              <h1>{tool.name.replace(" Calculator", "")} <em>Calculator.</em></h1>
              <p>{tool.description}</p>
              <div className="tool-page-badges">
                <span>✓ 100% Free & Client-Side</span>
                <span>↔ US Customary + Metric</span>
                <span>◷ Real-Time Calculation</span>
              </div>
            </div>
            <div className="tool-page-symbol" aria-hidden="true">{tool.icon}</div>
          </div>
        </div>
      </div>

      <div className="page-width tool-page-main">
        <Calculator tool={tool} />

        {/* Phase 4 AEO Answer-First Section */}
        <section className="aeo-answer-section" aria-label="Quick Answer and Coverage Benchmarks">
          <div className="aeo-answer-card">
            <div className="aeo-kicker-row">
              <span className="section-kicker">QUICK ANSWER & RULE OF THUMB</span>
              <span className="aeo-badge">AEO VERIFIED SUMMARY</span>
            </div>
            <h2>How to Calculate {tool.shortName} Volume</h2>
            <p className="aeo-direct-answer">{tool.quickAnswer.directAnswer}</p>
            <div className="aeo-rule-of-thumb">
              <strong>Rule of thumb:</strong> <span>{tool.quickAnswer.ruleOfThumb}</span>
            </div>

            <div className="table-wrap aeo-table-wrap">
              <table className="content-table">
                <caption>{tool.quickAnswer.tableCaption}</caption>
                <thead>
                  <tr>
                    <th scope="col">Application Depth</th>
                    <th scope="col">Sq Ft / Cubic Yard</th>
                    <th scope="col">Sq Metres / Cubic Metre</th>
                    <th scope="col">Recommended Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  {tool.quickAnswer.benchmarkTable.map((row, idx) => (
                    <tr key={idx}>
                      <td><strong>{row.depth}</strong></td>
                      <td>{row.coverageSqFt}</td>
                      <td>{row.coverageSqM}</td>
                      <td>{row.typicalUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="content-grid">
          <article className="tool-guide">
            {/* Measurement Inputs Guide */}
            <section className="guide-content-section">
              <span className="section-kicker">MEASUREMENT PROTOCOL</span>
              <h2>How to Measure for {tool.shortName}</h2>
              <p>Accurate material estimation depends on clean horizontal measurements and target vertical depths. For beds with borders or timbers, measure the inside planting cavity.</p>
              <ol className="howto-list">
                {tool.howTo.map((step, index) => (
                  <li key={index}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>

              <div className="inputs-detail-grid">
                <div className="input-detail-card">
                  <strong>Length & Width</strong>
                  <p>{tool.inputsGuide.lengthWidth}</p>
                </div>
                <div className="input-detail-card">
                  <strong>Finished Depth</strong>
                  <p>{tool.inputsGuide.depthGuidance}</p>
                </div>
                <div className="input-detail-card">
                  <strong>Allowance Buffer</strong>
                  <p>{tool.inputsGuide.allowanceRecommendation}</p>
                </div>
                <div className="input-detail-card">
                  <strong>Packaging & Yields</strong>
                  <p>{tool.inputsGuide.packagingGuidance}</p>
                </div>
              </div>
            </section>

            {/* Formula & Dimensional Mathematics */}
            <section className="formula-box">
              <span className="section-kicker">MATHEMATICAL DERIVATION</span>
              <h2>{tool.shortName} Calculation Formulas</h2>
              <div className="formula-comparison">
                <div className="formula-block">
                  <strong>US Customary (Cubic Yards)</strong>
                  <code>{tool.formulaExplanation.usCustomary}</code>
                </div>
                <div className="formula-block">
                  <strong>Metric (Cubic Metres)</strong>
                  <code>{tool.formulaExplanation.metric}</code>
                </div>
              </div>
              <p className="formula-explanation-p">{tool.formulaExplanation.dimensionalExplanation}</p>
              <div className="formula-shape-notes">
                <p><strong>Circles:</strong> {tool.formulaExplanation.circleNote}</p>
                <p><strong>Triangles:</strong> {tool.formulaExplanation.triangleNote}</p>
              </div>
              <div className="formula-note">
                <strong>Calculation Principle:</strong> YardMath calculates true geometric displacement. It does not silently hide commercial markup, vehicle fuel surcharges, or assumed compaction factors.
              </div>
            </section>

            {/* Independently Checked Worked Example */}
            <section className="worked-example-box">
              <span className="section-kicker">INDEPENDENTLY VERIFIED CALCULATION</span>
              <h2>Worked Numerical Example</h2>
              <div className="example-scenario">
                <strong>Project Scenario:</strong>
                <p>{tool.workedExample.scenario}</p>
                <span className="example-dims">Specified Inputs: {tool.workedExample.dimensions}</span>
              </div>

              <div className="example-steps-list">
                {tool.workedExample.steps.map((step, idx) => (
                  <div key={idx} className="example-step-card">
                    <div className="step-header">
                      <span className="step-label">{step.label}</span>
                      <code className="step-formula">{step.formula}</code>
                      <strong className="step-result">{step.result}</strong>
                    </div>
                    <p className="step-detail">{step.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="example-final-callout">
                <strong>Calculation Outcome:</strong> {tool.workedExample.finalSummary}
              </div>
            </section>

            {/* Material-Specific Assumptions & Limitations */}
            <section className="material-realities-box">
              <span className="section-kicker">ENGINEERING & HORTICULTURAL REALITIES</span>
              <h2>Material Assumptions & Physical Constraints</h2>
              <div className="realities-grid">
                <div className="reality-item">
                  <strong>Compaction & Consolidation</strong>
                  <p>{tool.materialSpecifics.compactionBehavior}</p>
                </div>
                <div className="reality-item">
                  <strong>Moisture Content & Weight</strong>
                  <p>{tool.materialSpecifics.moistureAndWeight}</p>
                </div>
                <div className="reality-item">
                  <strong>Subgrade & Site Preparation</strong>
                  <p>{tool.materialSpecifics.subgradePreparation}</p>
                </div>
                <div className="reality-item">
                  <strong>Procurement & Delivery Rule</strong>
                  <p>{tool.materialSpecifics.orderingRule}</p>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mistakes-section">
              <span className="section-kicker">AVOID COSTLY MISTAKES</span>
              <h2>Common Mistakes When Ordering {tool.shortName}</h2>
              <div className="mistakes-list">
                {tool.commonMistakes.map((m, idx) => (
                  <div key={idx} className="mistake-item">
                    <div className="mistake-title">
                      <span className="mistake-x">✕</span>
                      <strong>{m.mistake}</strong>
                    </div>
                    <p className="mistake-impact"><strong>The Consequence:</strong> {m.impact}</p>
                    <p className="mistake-fix"><strong>How to avoid it:</strong> {m.prevention}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Authoritative Sources */}
            <section className="sources-section">
              <span className="section-kicker">EXTENSION STANDARDS & CITATIONS</span>
              <h2>Authoritative Sources for {tool.shortName}</h2>
              <ul className="sources-list">
                {tool.authoritativeSources.map((src, idx) => (
                  <li key={idx}>
                    {src.url ? (
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                        <strong>{src.standardOrDocument}</strong>
                      </a>
                    ) : (
                      <strong>{src.standardOrDocument}</strong>
                    )}{" "}
                    — <span>{src.organization}</span>. <small>{src.citation}</small>
                  </li>
                ))}
              </ul>
            </section>

            {/* Companion Guides Links */}
            {tool.relatedGuides && tool.relatedGuides.length > 0 ? (
              <section className="tool-guides-links-section">
                <span className="section-kicker">IN-DEPTH FIELD GUIDES</span>
                <h2>Detailed Guides for {tool.shortName} Projects</h2>
                <div className="tool-guide-links-grid">
                  {tool.relatedGuides.map((rg) => (
                    <Link key={rg.slug} href={`/guides/${rg.slug}/`} className="tool-guide-link-card">
                      <strong>{rg.title} ↗</strong>
                      <small>Read comprehensive field instructions and depth tables</small>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>

          {/* Sidebar */}
          <aside className="guide-aside">
            <div className="aside-card">
              <span className="aside-number">Y / M</span>
              <h3>Geometric Accuracy Principle</h3>
              <p>Estimates reflect strict geometric volume. Moisture, compaction, particle size, and supplier bucket practices introduce real-world variations.</p>
              <Link href="/disclaimer/">Calculation disclaimer ↗</Link>
            </div>
            <div className="aside-card aside-green">
              <span className="section-kicker">FIELD MEASUREMENT GUIDES</span>
              <h3>Master Irregular Shapes</h3>
              <p>Learn how to measure curved borders, oval beds, and slopes using offset baseline geometry.</p>
              <Link href="/guides/measuring-irregular-landscaping-areas/">Read measurement guide ↗</Link>
            </div>
            <div className="aside-card">
              <span className="section-kicker">WEIGHT CONVERSIONS</span>
              <h3>Bulk Density Physics</h3>
              <p>Understand how soil, sand, and stone change weight drastically when damp or compacted.</p>
              <Link href="/guides/how-to-calculate-material-weight-bulk-density/">Bulk density guide ↗</Link>
            </div>
          </aside>
        </div>

        {/* Phase 4 Distinct Visible FAQs */}
        <section className="faq-section" aria-label="Frequently Asked Questions">
          <div>
            <span className="section-kicker">VERIFIED ANSWERS</span>
            <h2>{tool.shortName} Calculator FAQs</h2>
            <p>Direct, concise answers to common questions about estimating, ordering, and installing {tool.material.toLowerCase()}.</p>
          </div>
          <div className="faq-list">
            {tool.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Calculators */}
        <section className="related-tools">
          <div className="section-heading">
            <div>
              <span className="section-kicker">KEEP YOUR PROJECT MOVING</span>
              <h2>Companion <em>Calculators.</em></h2>
            </div>
            <Link href="/#calculators" className="button-text">All 12 calculators ↗</Link>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <Link href={`/${item.slug}/`} key={item.slug} className="related-card">
                <span className="tool-icon">{item.icon}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.cardDescription}</small>
                </span>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
