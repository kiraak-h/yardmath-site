import type { Metadata } from "next";
import Link from "next/link";
import ToolDirectory from "@/components/ToolDirectory";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";
import { getCanonicalUrl, getValidatedSiteUrl } from "@/lib/site-config";

const siteUrl = getValidatedSiteUrl();
const canonicalUrl = getCanonicalUrl("/");

export const metadata: Metadata = {
  title: "Free Landscaping Calculators | Soil, Mulch, Gravel, Sand & Concrete",
  description: "Plan outdoor projects with 12 free landscaping material calculators. Estimate topsoil, mulch, pea gravel, compost, sand, concrete and aggregate in US or metric units.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: "YardMath — Free Landscaping Material Calculators",
    description: "Calculate material volume, package quantities and project estimates for landscaping and outdoor projects.",
    type: "website",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
    ...(siteUrl ? { images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "YardMath landscaping calculators" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "YardMath — Free Landscaping Material Calculators",
    description: "Calculate soil, mulch, gravel, sand, and concrete volumes accurately.",
    ...(siteUrl ? { images: ["/og-image.png"] } : {}),
  },
};

const homeFaqs = [
  { question: "Are YardMath calculators free?", answer: "Yes. All calculators are 100% free to use with zero accounts, zero registrations, and zero ads. Calculations execute locally in your web browser." },
  { question: "Are the results exact?", answer: "They are mathematical geometric estimates based on plan dimensions. Real-world site conditions, uneven ground, compaction, moisture variations, and supplier bucket sizing introduce minor differences. We recommend adding a 5% to 15% allowance." },
  { question: "Can I use metric measurements?", answer: "Yes. Every calculator supports instant bi-directional switching between US Customary (feet, inches, cubic yards, lbs) and Metric (metres, centimetres, cubic metres, kg, litres). Switching systems converts unit prices accurately without changing your underlying estimate." },
  { question: "How do I estimate material weight?", answer: "Open the optional shopping details on any calculator and enter a bulk density provided by your quarry or supplier (such as 2,700 lb/yd³ or 1,600 kg/m³). YardMath never silently guesses material density." },
  { question: "Can I calculate more than one area?", answer: "For multiple identical beds or footings, enter the quantity count multiplier. For different or irregular spaces, calculate each shape separately and add the volumes." },
];

function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "YardMath",
    description: "Free landscaping material calculators for soil, mulch, gravel, sand and outdoor projects.",
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YardMath Landscaping Calculators",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern web browser.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Free calculators for landscaping material volume, packages, supplier-based weight and project cost estimates.",
    ...(siteUrl ? { url: siteUrl } : {}),
  };

  const featuredGuides = guides.slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(appStructuredData) }} />

      <section className="home-hero">
        <div className="hero-grid-lines" aria-hidden="true" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <span className="hero-kicker"><span className="kicker-dot" /> THE OUTDOOR PROJECT CALCULATOR</span>
            <h1>Good projects<br />start with <em>good math.</em></h1>
            <p>Know what to order before the truck pulls up. Calculate soil, mulch, gravel, sand and concrete with clear, practical estimates.</p>
            <div className="hero-actions">
              <Link href="#calculators" className="button-primary">Find your calculator <span>↗</span></Link>
              <Link href="#how-it-works" className="button-text">See how it works <span>↓</span></Link>
            </div>
            <div className="hero-trust">
              <span className="trust-check">✓</span> Free project estimates <span className="trust-separator">·</span> US + metric units <span className="trust-separator">·</span> No account required
            </div>
          </div>
          <div className="hero-visual" role="img" aria-label="Illustration of a garden project material estimate">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="visual-card visual-card-back">
              <div className="mini-card-top"><span>PROJECT MATERIALS</span><span>↗</span></div>
              <div className="mini-swatch-row"><i className="swatch soil"/><span>Topsoil</span><b>2.4 yd³</b></div>
              <div className="mini-swatch-row"><i className="swatch gravel"/><span>Pea gravel</span><b>1.2 yd³</b></div>
              <div className="mini-swatch-row"><i className="swatch mulch"/><span>Mulch</span><b>0.8 yd³</b></div>
              <div className="mini-total"><span>PLANNING ESTIMATE</span><strong>3 materials</strong></div>
            </div>
            <div className="visual-card visual-card-front">
              <div className="visual-card-label">YOUR PROJECT, MEASURED</div>
              <div className="measure-diagram">
                <div className="measure-top">20 ft</div>
                <div className="measure-side">15 ft</div>
                <div className="measure-shape"><span>300</span><small>sq ft</small></div>
                <div className="measure-depth">3 in depth</div>
              </div>
              <div className="visual-result">
                <div><span>EXAMPLE VOLUME</span><strong>2.78 <small>yd³</small></strong></div>
                <span className="result-check">✓</span>
              </div>
            </div>
            <div className="visual-sticker"><span>LESS GUESSWORK</span><strong>MORE<br />GARDEN.</strong><i>✳</i></div>
          </div>
        </div>
        <div className="hero-bottom page-width">
          <span>MADE FOR THE MEASURE TWICE CROWD</span>
          <div>
            <span>HOMEOWNERS</span><i />
            <span>LANDSCAPERS</span><i />
            <span>GARDENERS</span><i />
            <span>DIYERS</span>
          </div>
        </div>
      </section>

      <section className="tools-section page-width" id="calculators">
        <div className="section-heading">
          <div>
            <span className="section-kicker">THE TOOL SHED</span>
            <h2>What are you <em>working on?</em></h2>
            <p>Choose a specialist calculator and get a clear estimate in a few steps.</p>
          </div>
          <span className="section-side-note">{String(tools.length).padStart(2, "0")} / CALCULATORS</span>
        </div>
        <ToolDirectory />
      </section>

      <section className="process-section" id="how-it-works">
        <div className="page-width process-inner">
          <div className="process-intro">
            <span className="section-kicker">NO SPREADSHEETS REQUIRED</span>
            <h2>Measure it.<br /><em>Know it.</em><br />Order it.</h2>
            <p>YardMath turns simple measurements into a practical volume estimate. Use your supplier&apos;s pack size, density and price when you need a more detailed shopping plan.</p>
            <Link href="/topsoil-calculator/" className="button-primary">Try a calculator <span>↗</span></Link>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <span className="step-number">01</span>
              <div className="step-illustration measure-illustration">
                <span className="ruler-line"/><span className="ruler-line short"/><span className="ruler-dot">↗</span>
              </div>
              <div>
                <h3>Measure your space</h3>
                <p>Enter area, depth and shape. Use feet and inches or metric dimensions.</p>
              </div>
            </div>
            <div className="process-step">
              <span className="step-number">02</span>
              <div className="step-illustration calculate-illustration">
                <strong>∑</strong><span>volume<br />+ allowance</span>
              </div>
              <div>
                <h3>Get the volume</h3>
                <p>See cubic yards, cubic metres, cubic feet and litres as you edit.</p>
              </div>
            </div>
            <div className="process-step">
              <span className="step-number">03</span>
              <div className="step-illustration order-illustration">
                <div className="bag-shape"><i>yd³</i></div><span className="order-check">✓</span>
              </div>
              <div>
                <h3>Plan the order</h3>
                <p>Estimate packages, weight and cost with details from your supplier.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Field Guides Section */}
      <section className="home-guides-section page-width">
        <div className="section-heading">
          <div>
            <span className="section-kicker">EDUCATIONAL FIELD NOTES</span>
            <h2>Practical <em>Guides & Math.</em></h2>
            <p>Master depth standards, bulk density weight physics, and irregular area surveying.</p>
          </div>
          <Link href="/guides/" className="button-text">All 9 guides ↗</Link>
        </div>
        <div className="guides-grid">
          {featuredGuides.map((guide) => (
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

      <section className="pro-section page-width" id="for-pros">
        <div className="pro-panel">
          <div>
            <span className="section-kicker">FOR THE PEOPLE WHO DO THIS EVERY DAY</span>
            <h2>Make the estimate.<br /><em>Plan the job.</em></h2>
            <p>Use YardMath to prepare an initial material estimate before you quote, order or visit the supplier.</p>
            <div className="pro-points">
              <span>✓ Multiple measurement systems</span>
              <span>✓ Copy, download and print estimates</span>
              <span>✓ Supplier density and price inputs</span>
            </div>
          </div>
          <div className="pro-quote-card">
            <span className="quote-mark">“</span>
            <p>A good estimate does not replace a site visit. It makes the site visit count.</p>
            <div className="quote-line"><span /> THE YARDMATH APPROACH</div>
          </div>
        </div>
      </section>

      <section className="home-faq page-width">
        <div>
          <span className="section-kicker">A FEW GOOD QUESTIONS</span>
          <h2>Before you <em>dig in.</em></h2>
        </div>
        <div className="home-faq-list">
          {homeFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
