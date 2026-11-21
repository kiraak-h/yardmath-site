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
  return {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: `/${tool.slug}/` },
    openGraph: {
      title: `${tool.name} | YardMath`,
      description: tool.description,
      type: "website",
    },
    twitter: { card: "summary", title: `${tool.name} | YardMath`, description: tool.description },
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
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", ...(siteUrl ? { item: siteUrl } : {}) },
      { "@type": "ListItem", position: 2, name: "Calculators", ...(siteUrl ? { item: `${siteUrl}/#calculators` } : {}) },
      { "@type": "ListItem", position: 3, name: tool.name, ...(siteUrl ? { item: `${siteUrl}/${tool.slug}/` } : {}) },
    ],
  };
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const appData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `YardMath ${tool.name}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
    ...(siteUrl ? { url: `${siteUrl}/${tool.slug}/` } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(appData) }} />
      <div className="tool-page-hero">
        <div className="page-width">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/#calculators">Calculators</Link><span>/</span><span>{tool.shortName}</span></div>
          <div className="tool-page-heading">
            <div>
              <span className="section-kicker">{tool.eyebrow}</span>
              <h1>{tool.name.replace(" Calculator", "")} <em>Calculator.</em></h1>
              <p>{tool.description}</p>
              <div className="tool-page-badges"><span>✓ Free to use</span><span>↔ US + metric</span><span>◷ Updates as you type</span></div>
            </div>
            <div className="tool-page-symbol" aria-hidden="true">{tool.icon}</div>
          </div>
        </div>
      </div>

      <div className="page-width tool-page-main">
        <Calculator tool={tool} />
        <div className="content-grid">
          <article className="tool-guide">
            <section>
              <span className="section-kicker">A BETTER MATERIAL ESTIMATE</span>
              <h2>How to use the {tool.shortName.toLowerCase()} calculator</h2>
              <p>Start with the actual area you plan to fill. Use internal dimensions for raised beds and planters. If your space is irregular, split it into simpler shapes, calculate each section and add the volumes together.</p>
              <ol className="howto-list">{tool.howTo.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
            </section>
            <section className="formula-box">
              <span className="section-kicker">THE MATH BEHIND THE RESULT</span>
              <h2>{tool.shortName} calculation formula</h2>
              <p>{tool.formula}</p>
              <div className="formula-note"><strong>Important:</strong> the calculator returns geometric volume. It does not silently add compaction, settlement or a material density factor.</div>
            </section>
            <section className="best-for">
              <span className="section-kicker">GOOD FOR THESE PROJECTS</span>
              <h2>Where this calculator helps</h2>
              <div className="best-for-list">{tool.bestFor.map((item) => <span key={item}>✓ {item}</span>)}</div>
            </section>
            <section>
              <span className="section-kicker">BEFORE YOU PLACE AN ORDER</span>
              <h2>Check the supplier&apos;s product details</h2>
              <p>Confirm the exact material grade, sale unit, bag yield, bulk density, moisture condition, loose-versus-compacted quantity, delivery minimums and site access. If a project has structural, drainage or safety requirements, use its approved specification and consult a qualified professional.</p>
              <p>For help measuring an area, read our <Link href="/guides/how-to-measure-landscaping-materials/" className="inline-link">landscaping measurement guide</Link>.</p>
            </section>
          </article>
          <aside className="guide-aside">
            <div className="aside-card"><span className="aside-number">Y / M</span><h3>A quick note on accuracy</h3><p>Material estimates depend on your measurements and the selected product. Density, moisture, compaction and package sizes vary.</p><Link href="/disclaimer/">Read the calculation disclaimer ↗</Link></div>
            <div className="aside-card aside-green"><span className="section-kicker">ESTIMATE WITH CONFIDENCE</span><h3>Use supplier-specific values</h3><p>Open optional shopping details and enter the actual package volume, density and unit price printed or quoted for your product.</p><Link href="/guides/">Read measurement guides ↗</Link></div>
          </aside>
        </div>
        <section className="faq-section">
          <div><span className="section-kicker">GOOD TO KNOW</span><h2>{tool.shortName} calculator FAQs</h2></div>
          <div className="faq-list">{tool.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </section>
        <section className="related-tools">
          <div className="section-heading"><div><span className="section-kicker">KEEP THE PROJECT MOVING</span><h2>More useful <em>calculators.</em></h2></div><Link href="/#calculators" className="button-text">All calculators ↗</Link></div>
          <div className="related-grid">{related.map((item) => <Link href={`/${item.slug}/`} key={item.slug} className="related-card"><span className="tool-icon">{item.icon}</span><span><strong>{item.name}</strong><small>{item.cardDescription}</small></span><b>↗</b></Link>)}</div>
        </section>
      </div>
    </>
  );
}
