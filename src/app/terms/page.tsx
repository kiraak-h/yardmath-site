import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using YardMath landscaping and material calculators.",
};

export default function TermsPage() {
  return <div className="page-width legal-page">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Terms of use</span></div>
    <span className="section-kicker">WEBSITE TERMS</span>
    <h1>Terms of <em>use.</em></h1>
    <p><strong>Last updated: November 20, 2026.</strong></p>
    <p>These general terms describe use of the YardMath website. The site owner should have these terms reviewed for the business, jurisdiction and services used before launch. They are not a substitute for legal advice.</p>
    <h2>Using the calculators</h2>
    <p>You may use the calculators for personal and business project planning. You are responsible for entering accurate dimensions and reviewing the assumptions behind each estimate.</p>
    <h2>Estimates are informational</h2>
    <p>Results are geometric or arithmetic planning estimates. They are not supplier quotations, engineering calculations, structural advice, drainage designs, safety assessments or installation instructions. The website does not account automatically for site slope, compaction, settlement, moisture, grading, wastage, taxes or supplier-specific handling unless a particular value is entered and clearly identified.</p>
    <h2>Verify before ordering or building</h2>
    <p>Check material specifications, package yields, density, order units, delivery charges and installation requirements with the supplier or a qualified professional. Do not rely on a YardMath estimate as the sole basis for structural, load-bearing, drainage, excavation or safety-critical work.</p>
    <h2>Availability and changes</h2>
    <p>We may update, change or discontinue website features. We do not promise uninterrupted availability or that every calculation will suit every project or jurisdiction.</p>
    <h2>Third-party services</h2>
    <p>The website may later link to third-party suppliers or services. Those services are operated independently and have their own terms, privacy practices, prices and availability.</p>
    <h2>Contact</h2>
    <p>Questions about these terms can be sent through the <Link href="/contact/" className="inline-link">contact page</Link>.</p>
  </div>;
}
