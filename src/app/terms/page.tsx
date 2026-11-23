import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/site-config";

const canonicalUrl = getCanonicalUrl("/terms/");

export const metadata: Metadata = {
  title: "Terms of Use | YardMath Project Planning Tools",
  description: "Read the terms and conditions governing the use of YardMath landscaping calculators, educational guides, and mathematical estimation tools.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Terms of Use | YardMath Project Planning Tools",
    description: "Terms governing use of YardMath calculators, conversion engines, and landscaping guides.",
    type: "website",
    url: canonicalUrl,
  },
};

export default function TermsPage() {
  return (
    <article className="page-width legal-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Terms of use</span>
      </div>
      <span className="section-kicker">WEBSITE TERMS OF USE</span>
      <h1>Terms of <em>use.</em></h1>
      <p>
        <strong>Last reviewed: November 21, 2026.</strong>
      </p>

      <div className="callout-box warning-box" style={{ margin: "1.5rem 0" }}>
        <strong>Owner Pre-Launch Action Item:</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          These terms establish intellectual property boundaries, disclaim engineering warranties, and govern project planning usage. 
          The website owner must have these terms reviewed by legal counsel in their operating jurisdiction prior to production launch.
        </p>
      </div>

      <h2>Permitted usage and planning purposes</h2>
      <p>
        YardMath grants users a non-exclusive, revocable license to utilize its volumetric calculation engines, unit conversion tools, 
        and educational field guides for residential landscaping, horticultural planning, commercial estimating, and educational purposes. 
        You are solely responsible for verifying the accuracy of field measurements and entering appropriate unit dimensions.
      </p>

      <h2>Mathematical estimation limits & no professional warranty</h2>
      <p>
        All calculations provided on YardMath are mathematical estimations based on classical geometric algorithms and standard bulk density physics. 
        YardMath does not provide civil engineering certifications, structural load design, stormwater drainage permitting, or geotechnical survey reports. 
        Do not rely on YardMath as the sole engineering authority for retaining walls over 4 feet, commercial foundations, or safety-critical drainage swales.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All site layout code, SVG diagrams, interactive calculator logic, editorial guides, and curated benchmark tables are proprietary works 
        protected by international copyright and intellectual property laws. Systematic scraping or automated harvesting of calculator assets 
        without prior written consent is strictly prohibited.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, YardMath, its contributors, and operators disclaim all liability for direct, indirect, 
        incidental, or consequential damages resulting from discrepancies between estimated material takeoffs and actual field quantities delivered, 
        including excess or short material orders, supplier delivery fees, or contractor labor delays.
      </p>

      <h2>Governing law & inquiries</h2>
      <p>
        Questions regarding these terms may be submitted through our <Link href="/contact/" className="inline-link">contact page</Link>.
      </p>
    </article>
  );
}
