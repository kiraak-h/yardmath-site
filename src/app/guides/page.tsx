import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { getCanonicalUrl, getValidatedSiteUrl } from "@/lib/site-config";

const siteUrl = getValidatedSiteUrl();
const canonicalUrl = getCanonicalUrl("/guides/");

export const metadata: Metadata = {
  title: "Landscaping Material Guides & Calculation Field Notes",
  description: "Comprehensive guides to measuring yard projects, calculating topsoil, mulch, concrete, gravel driveway cross-sections, and bulk density weight conversions.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Landscaping Material Guides | YardMath Field Notes",
    description: "Practical engineering and horticultural guides to estimating materials, calculating volumes, and avoiding costly landscaping mistakes.",
    type: "website",
    url: canonicalUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Landscaping Material Guides | YardMath",
    description: "In-depth calculation guides for soil, gravel, concrete, mulch, and irregular area measurement.",
  },
};

export default function GuidesPage() {
  const categories = ["Soil & Garden", "Aggregate & Stone", "Measurement & Math", "Construction"] as const;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", ...(siteUrl ? { item: siteUrl } : {}) },
      { "@type": "ListItem", position: 2, name: "Guides", ...(siteUrl ? { item: canonicalUrl } : {}) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData).replace(/</g, "\\u003c") }} />

      <div className="page-width legal-page guides-hub-page">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Guides</span>
        </div>

        <span className="section-kicker">YARDMATH FIELD NOTES & REFERENCE GUIDES</span>
        <h1>Measure with confidence.<br /><em>Plan with precision.</em></h1>
        <p className="guides-intro-p">
          Clear measurement methods, dimensional mathematics, and material science notes to help homeowners, landscapers, and builders estimate materials accurately before placing an order.
        </p>

        {categories.map((cat) => {
          const categoryGuides = guides.filter((g) => g.category === cat);
          if (categoryGuides.length === 0) return null;

          return (
            <section key={cat} className="guides-category-section">
              <div className="category-header">
                <span className="category-tag">{cat.toUpperCase()}</span>
                <h2>{cat} Guides</h2>
              </div>
              <div className="guides-grid">
                {categoryGuides.map((guide) => (
                  <Link key={guide.slug} className="guide-card" href={`/guides/${guide.slug}/`}>
                    <div className="guide-card-top">
                      <span className="guide-card-kicker">{guide.kicker}</span>
                      <span className="guide-card-readtime">{guide.readTime}</span>
                    </div>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <div className="guide-card-footer">
                      <span className="inline-link">Read guide ↗</span>
                      <span className="guide-card-date">Updated {guide.revisedDate}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="guides-support-callout">
          <h3>Need to run numbers right now?</h3>
          <p>Explore our 12 specialist material calculators for instant geometric volumes, packaging yields, and delivery estimates.</p>
          <div className="guide-tool-links">
            <Link href="/topsoil-calculator/">Topsoil Calculator ↗</Link>
            <Link href="/mulch-calculator/">Mulch Calculator ↗</Link>
            <Link href="/concrete-calculator/">Concrete Calculator ↗</Link>
            <Link href="/gravel-driveway-calculator/">Driveway Gravel Calculator ↗</Link>
            <Link href="/cubic-yard-calculator/">Cubic Yard Calculator ↗</Link>
          </div>
        </div>

        <p className="guide-disclaimer">
          All guides provide educational calculation and engineering principles based on agricultural extensions and standard trade specifications. They do not replace on-site professional assessments or structural specifications.
        </p>
      </div>
    </>
  );
}
