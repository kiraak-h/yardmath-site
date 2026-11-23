import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { getTool } from "@/lib/tools";
import { getCanonicalUrl, getValidatedSiteUrl } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  const siteUrl = getValidatedSiteUrl();
  const canonicalUrl = getCanonicalUrl(`/guides/${guide.slug}/`);

  return {
    title: guide.title,
    description: guide.description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      title: `${guide.title} | YardMath Guides`,
      description: guide.description,
      type: "article",
      publishedTime: guide.publishedDate,
      modifiedTime: guide.revisedDate,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(siteUrl ? { images: [{ url: "/og-image.png", width: 1200, height: 630, alt: guide.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | YardMath`,
      description: guide.description,
      ...(siteUrl ? { images: ["/og-image.png"] } : {}),
    },
  };
}

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const siteUrl = getValidatedSiteUrl();
  const pageUrl = getCanonicalUrl(`/guides/${guide.slug}/`);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", ...(siteUrl ? { item: siteUrl } : {}) },
      { "@type": "ListItem", position: 2, name: "Guides", ...(siteUrl ? { item: `${siteUrl}/guides/` } : {}) },
      { "@type": "ListItem", position: 3, name: guide.shortTitle, ...(siteUrl && pageUrl ? { item: pageUrl } : {}) },
    ],
  };

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedDate,
    dateModified: guide.revisedDate,
    ...(siteUrl && pageUrl ? { mainEntityOfPage: pageUrl } : {}),
    ...(siteUrl ? { image: `${siteUrl}/og-image.png` } : {}),
    publisher: {
      "@type": "Organization",
      name: "YardMath",
      ...(siteUrl ? { url: siteUrl } : {}),
      ...(siteUrl ? { logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.svg` } } : {}),
    },
    author: {
      "@type": "Organization",
      name: "YardMath Editorial Team",
      ...(siteUrl ? { url: `${siteUrl}/about/` } : {}),
    },
  };

  const relatedTools = guide.relatedTools.map((toolSlug) => getTool(toolSlug)).filter(Boolean);
  const relatedGuides = guide.relatedGuides.map((guideSlug) => getGuide(guideSlug)).filter(Boolean);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(articleData) }} />

      <article className="page-width legal-page guide-article">
        <header className="guide-header">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/guides/">Guides</Link>
            <span>/</span>
            <span>{guide.shortTitle}</span>
          </div>

          <span className="section-kicker">{guide.kicker}</span>
          <h1>{guide.title}</h1>

          <div className="guide-meta-bar">
            <span>Published: <time dateTime={guide.publishedDate}>{guide.publishedDate}</time></span>
            <span className="meta-sep">·</span>
            <span>Updated: <time dateTime={guide.revisedDate}>{guide.revisedDate}</time></span>
            <span className="meta-sep">·</span>
            <span>{guide.readTime}</span>
            <span className="meta-sep">·</span>
            <span className="guide-category-badge">{guide.category}</span>
          </div>

          <p className="guide-summary-lead">{guide.summary}</p>

          <div className="key-takeaways-box">
            <div className="takeaways-header">
              <span className="takeaways-icon">✓</span>
              <strong>Key Takeaways & Core Numbers</strong>
            </div>
            <ul>
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx}>{takeaway}</li>
              ))}
            </ul>
          </div>
        </header>

        <div className="guide-body">
          {guide.sections.map((section, sIndex) => (
            <section key={sIndex} className="guide-content-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((pText, pIndex) => (
                <p key={pIndex}>{pText}</p>
              ))}

              {section.formulaBox ? (
                <div className="formula-box">
                  <strong>{section.formulaBox.title}</strong>
                  <pre className="formula-pre">{section.formulaBox.formula}</pre>
                  {section.formulaBox.note ? <small>{section.formulaBox.note}</small> : null}
                </div>
              ) : null}

              {section.table ? (
                <div className="table-wrap">
                  <table className="content-table">
                    {section.table.caption ? <caption>{section.table.caption}</caption> : null}
                    <thead>
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {section.callout ? (
                <aside className={`guide-callout callout-${section.callout.type}`}>
                  <strong>{section.callout.title}</strong>
                  <p>{section.callout.text}</p>
                </aside>
              ) : null}
            </section>
          ))}
        </div>

        {guide.faqs && guide.faqs.length > 0 ? (
          <section className="faq-section guide-faqs">
            <div>
              <span className="section-kicker">FREQUENTLY ASKED QUESTIONS</span>
              <h2>Common Questions on {guide.shortTitle}</h2>
              <p>Direct, verified answers to standard landscape and construction questions.</p>
            </div>
            <div className="faq-list">
              {guide.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {guide.sources && guide.sources.length > 0 ? (
          <section className="sources-section">
            <span className="section-kicker">AUTHORITATIVE REFERENCES</span>
            <h2>Sources & Extension Standards</h2>
            <p>Our material recommendations and mathematical formulas are cross-referenced with established agricultural extensions, government standards, and trade engineering guidelines:</p>
            <ul className="sources-list">
              {guide.sources.map((src, idx) => (
                <li key={idx}>
                  {src.url ? (
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                      <strong>{src.title}</strong>
                    </a>
                  ) : (
                    <strong>{src.title}</strong>
                  )}{" "}
                  — <span>{src.publisher}</span>. <small>{src.citation}</small>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {relatedTools.length > 0 ? (
          <section className="guide-tools-section">
            <span className="section-kicker">INTERACTIVE TOOLS</span>
            <h2>Apply This Math with YardMath Calculators</h2>
            <div className="guide-tool-links">
              {relatedTools.map((t) => t ? (
                <Link key={t.slug} href={`/${t.slug}/`}>
                  {t.name} ↗
                </Link>
              ) : null)}
            </div>
          </section>
        ) : null}

        {relatedGuides.length > 0 ? (
          <section className="related-guides-section">
            <span className="section-kicker">FURTHER READING</span>
            <h2>Companion Field Guides</h2>
            <div className="related-guides-grid">
              {relatedGuides.map((rg) => rg ? (
                <Link key={rg.slug} href={`/guides/${rg.slug}/`} className="related-guide-card">
                  <span className="section-kicker">{rg.kicker}</span>
                  <strong>{rg.title}</strong>
                  <p>{rg.description}</p>
                  <span className="inline-link">Read guide ({rg.readTime}) ↗</span>
                </Link>
              ) : null)}
            </div>
          </section>
        ) : null}

        <footer className="guide-footer-disclaimer">
          <p className="guide-disclaimer">
            This guide provides general educational and engineering reference information. It is not an engineering specification or contractual quote.
            Always confirm local building codes, structural loads, drainage laws, and delivery minimums with qualified contractors or suppliers before ordering.
            Read our <Link href="/disclaimer/" className="inline-link">Calculation Disclaimer</Link> and <Link href="/about/" className="inline-link">Editorial Policy</Link>.
          </p>
        </footer>
      </article>
    </>
  );
}
