import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/site-config";

const canonicalUrl = getCanonicalUrl("/about/");

export const metadata: Metadata = {
  title: "About YardMath | Calculation Methodology, Editorial Policy & Standards",
  description: "Learn about YardMath's editorial standards, mathematical verification protocols, source citation policy, and client-side calculation methodology.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: "About YardMath | Editorial Standards & Calculation Methodology",
    description: "Transparent dimensional mathematics and verified educational guidelines for homeowners and landscape contractors.",
    type: "website",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function AboutPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  return (
    <article className="page-width legal-page about-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>About</span>
      </div>

      <span className="section-kicker">EDITORIAL STANDARDS & METHODOLOGY</span>
      <h1>Transparent math.<br /><em>Better-planned outdoor projects.</em></h1>

      <p className="lead-paragraph">
        YardMath is an independent reference platform providing free, transparent mathematical calculators and educational field guides for landscaping, earthworks, and outdoor construction projects.
      </p>

      <h2>1. Our Core Mission</h2>
      <p>
        Ordering bulk landscaping materials is fraught with unexpected costs: commercial delivery minimums, sudden truckload weight limits, under-ordering that halts installation mid-pour, or over-ordering that leaves tons of unused stone on a driveway.
        YardMath was built to eliminate guesswork by providing accurate, client-side dimensional math before you call the quarry or landscape supplier.
      </p>

      <h2>2. Calculation Methodology & Transparency</h2>
      <p>
        Every calculator on YardMath operates on an open, verifiable mathematical model:
      </p>
      <ul>
        <li><strong>Strict Geometric Volume:</strong> Formulas calculate true geometric displacement based on plan dimensions. We never embed hidden profit markups or undisclosed compaction factors.</li>
        <li><strong>User-Controlled Allowances:</strong> We provide an explicit extra-material allowance setting (0% to 100%) so the user can choose a buffer that reflects their specific site grade or border irregularity.</li>
        <li><strong>Zero Unverified Density Defaults:</strong> Because natural rock, soil, and organic materials vary by hundreds of pounds per cubic yard based on moisture and processing, our tools leave bulk density blank until you enter values from your supplier.</li>
        <li><strong>Preserved Unit Conversion Integrity:</strong> When converting between imperial and metric systems, entered unit prices are automatically adjusted by the volume factor (0.764555 m³/yd³) so your total project budget remains mathematically identical.</li>
      </ul>

      <h2>3. Source Citation & Reference Standards</h2>
      <p>
        YardMath does not invent horticultural rules of thumb or material properties. All application depth recommendations, compaction guidelines, and layer cross-sections in our guides and calculator notes are derived from established institutional authorities:
      </p>
      <ul>
        <li><strong>Horticultural & Soil Standards:</strong> University agricultural extensions (including Cornell University, Penn State, Purdue, Oregon State, and University of Florida IFAS) and the USDA Natural Resources Conservation Service (NRCS).</li>
        <li><strong>Aggregate & Roadway Specifications:</strong> ASTM International standards (ASTM C33, C29, D448, D2940) and the Federal Highway Administration (FHWA) Gravel Roads Guidelines.</li>
        <li><strong>Pavement & Concrete Guidelines:</strong> Interlocking Concrete Pavement Institute (ICPI Tech Specs), American Concrete Institute (ACI 302.1R), and Portland Cement Association (PCA).</li>
      </ul>

      <h2>4. Quality-Control & Testing Methodology</h2>
      <p>
        We treat mathematical accuracy and semantic clarity with rigorous discipline. The core calculation engine is tested using an automated Vitest test suite executing in strict TypeScript:
      </p>
      <ul>
        <li><strong>Unit Tests & Geometric Proofs:</strong> Automated tests validate neat geometric displacement across rectangles, circles (using diameter), and triangles (using base and perpendicular height).</li>
        <li><strong>Conversion Invariance:</strong> Tests verify that converting between imperial and metric systems preserves underlying material quantities and budget totals.</li>
        <li><strong>IEEE 754 Floating-Point Precision:</strong> All rounding and unit-conversion multipliers use validated precision thresholds to prevent compounding rounding artifacts.</li>
        <li><strong>Content Math Validation:</strong> All worked examples and benchmark tables in our guides and calculator landing pages are programmatically validated by automated test suites before release.</li>
      </ul>
      <p>
        If you discover a formula discrepancy, typographical error, unclear instruction, or broken link:
      </p>
      <ul>
        <li>We investigate technical and content bug reports promptly.</li>
        <li>Corrections are tested, verified, and deployed directly to the open source codebase.</li>
        <li>You can submit feedback or corrections via our <Link href="/contact/" className="inline-link">contact page</Link>{email ? <> or by emailing <a className="inline-link" href={`mailto:${email}`}>{email}</a></> : null}.</li>
      </ul>

      <h2>5. Editorial Responsibility & Transparency</h2>
      <p>
        YardMath is an independent software and educational project maintained by the YardMath project team. We do not claim an external peer-review board; rather, our editorial standards require that every material guideline, layer recommendation, and density reference cite verified, primary institutional sources (such as USDA NRCS, Cornell Cooperative Extension, Penn State Agronomy, ASTM International, and the American Concrete Institute). We do not accept sponsored placements for specific soil brands or stone quarries.
      </p>

      <h2>6. Operational Boundaries & Disclaimer</h2>
      <p>
        YardMath provides mathematical planning estimates, not licensed civil engineering designs, structural drawings, or drainage permits. Local site grading, soil load-bearing capacity, building codes, and municipal easements vary. Always confirm structural designs, ready-mix specifications, and delivery logistics with qualified local contractors and material suppliers before ordering.
        Review our full <Link href="/disclaimer/" className="inline-link">Calculation Disclaimer</Link> and <Link href="/terms/" className="inline-link">Terms of Use</Link>.
      </p>

      <div className="about-actions">
        <Link href="/#calculators" className="button-primary">Explore Calculators <span>↗</span></Link>
        <Link href="/guides/" className="button-text">Read Field Guides <span>↗</span></Link>
      </div>
    </article>
  );
}
