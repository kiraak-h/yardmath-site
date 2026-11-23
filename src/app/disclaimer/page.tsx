import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/site-config";

const canonicalUrl = getCanonicalUrl("/disclaimer/");

export const metadata: Metadata = {
  title: "Calculation Disclaimer | Assumptions & Limitations",
  description: "Understand the mathematical assumptions, compaction realities, density variances, and limitations behind YardMath landscaping estimates.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: "Calculation Disclaimer | YardMath Material Estimations",
    description: "Understand the mathematical assumptions, compaction realities, and bulk density limitations of YardMath estimates.",
    type: "website",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function DisclaimerPage() {
  return (
    <article className="page-width legal-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Calculation disclaimer</span>
      </div>
      <span className="section-kicker">IMPORTANT PROJECT INFORMATION</span>
      <h1>Calculation <em>disclaimer.</em></h1>
      <p>
        <strong>Last reviewed: November 21, 2026.</strong>
      </p>

      <div className="callout-box warning-box" style={{ margin: "1.5rem 0" }}>
        <strong>Owner Pre-Launch Action Item:</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          This disclaimer outlines standard physical and engineering limitations for volumetric estimates. 
          The site owner and legal counsel must review this document prior to deployment to ensure compliance 
          with regional consumer protection laws and municipal contractor liability guidelines.
        </p>
      </div>

      <p>
        YardMath provides general-purpose volumetric and project-planning estimates based on user-entered dimensions 
        and industry-standard geometric formulas. Results are mathematical models and do not constitute a guarantee, 
        warranty, or binding contract regarding the exact quantity, weight, structural integrity, price, or performance 
        of any bulk material.
      </p>

      <h2>Material and density assumptions</h2>
      <p>
        Natural aggregate, topsoil, and organic mulch densities fluctuate significantly based on mineral parentage, 
        organic matter fraction, particle gradation, moisture content, atmospheric humidity, and handling methods. 
        YardMath intentionally does not prefill material density or weight. Weight and bag yield estimates appear 
        strictly after the user inputs specific supplier-provided density values for the exact product batch being purchased.
      </p>

      <h2>Settlement, compaction, and site topography</h2>
      <p>
        Calculations assume idealized geometric boundaries and uniform grade. In field applications, subgrade settlement, 
        mechanical compaction (such as plate tamping gravel base courses), subbase intrusion, slope gradients, and uneven 
        trench excavation routinely consume 10% to 25% more loose material than neat-line geometry predicts.
      </p>

      <h2>Prices, delivery, and supplier minimums</h2>
      <p>
        All monetary and budget calculations utilize user-supplied price and haulage fees. YardMath does not connect to 
        live merchant inventory feeds or guarantee pricing. Bulk aggregate quarries and mulch yards frequently impose 
        minimum order tonnages, split-load delivery fees, or fuel surcharges not captured in base arithmetic.
      </p>

      <h2>Professional verification requirement</h2>
      <p>
        Always cross-examine final material takeoffs with your local quarry, supplier, civil engineer, or landscape contractor 
        prior to ordering non-returnable bulk materials or commencing structural excavation.
      </p>

      <div style={{ marginTop: "2.5rem" }}>
        <Link href="/" className="button-primary">
          Back to calculators &rarr;
        </Link>
      </div>
    </article>
  );
}
