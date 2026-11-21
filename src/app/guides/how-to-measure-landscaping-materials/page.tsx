import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Measure Landscaping Materials",
  description: "A practical guide to measuring garden areas and calculating the volume of topsoil, mulch, gravel, sand and other landscaping materials.",
};

export default function MeasurementGuidePage() {
  return <article className="page-width legal-page guide-article">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><Link href="/guides/">Guides</Link><span>/</span><span>Measuring materials</span></div>
    <span className="section-kicker">FIELD GUIDE · MEASUREMENT BASICS</span>
    <h1>How to measure a landscaping area and calculate <em>material volume.</em></h1>
    <p>Before ordering soil, mulch, sand or aggregate, estimate the volume of the space you plan to fill. The basic method is simple: measure the area, choose the planned layer depth and multiply them to find volume.</p>
    <h2>1. Measure the plan area</h2>
    <p>For a rectangle, measure the length and width using the same unit. Multiply them to get area. For example, a space 20 feet long and 15 feet wide has an area of 300 square feet.</p>
    <div className="formula-box"><strong>Rectangle area</strong><p>Length × width = area</p><small>20 ft × 15 ft = 300 ft²</small></div>
    <h2>2. Choose a shape for non-rectangular spaces</h2>
    <p>For a circle, measure across its widest point (the diameter). Area is π multiplied by the radius squared; the radius is half the diameter. For a triangle, measure its base and perpendicular height; area is base multiplied by height, divided by two.</p>
    <div className="formula-box"><strong>Circle area</strong><p>π × (diameter ÷ 2)²</p><strong>Triangle area</strong><p>(base × perpendicular height) ÷ 2</p></div>
    <p>For an irregular space, split the outline into manageable rectangles, circles and triangles. Calculate each section separately and add the volumes. Avoid counting overlapping sections twice.</p>
    <h2>3. Measure the depth</h2>
    <p>Measure the intended finished depth of the material layer. This site uses inches for imperial depth and centimetres for metric depth. Use the depth from your project plan, installation specification or supplier guidance; YardMath does not prescribe a universal depth for each material.</p>
    <h2>4. Calculate volume</h2>
    <div className="formula-box"><strong>US customary</strong><p>Volume in cubic yards = area (ft²) × depth (in) ÷ 324</p><strong>Metric</strong><p>Volume in cubic metres = area (m²) × depth (cm) ÷ 100</p></div>
    <p>For the 300-square-foot example at 3 inches deep: 300 × 3 ÷ 324 = approximately 2.78 cubic yards before any optional allowance.</p>
    <h2>5. Understand allowances, bags and weight</h2>
    <p>An allowance is an extra percentage applied to the base geometric volume. It can be useful when the site is uneven or your project plan calls for additional material, but it is not a compaction model. For bag quantities, use the usable volume printed on the actual package. For weight, use the material&apos;s bulk density from the supplier and pay attention to moisture and grading.</p>
    <h2>6. Confirm before ordering</h2>
    <p>Suppliers may sell loose, screened, compacted or differently graded products. Confirm the unit used on the quote, package yield, density, compaction assumptions, delivery minimums and any site-access requirements before placing an order.</p>
    <h2>Try a calculator</h2>
    <p>Choose the material that matches your project to convert your measurements into a volume estimate.</p>
    <div className="guide-tool-links"><Link href="/topsoil-calculator/">Topsoil calculator ↗</Link><Link href="/mulch-calculator/">Mulch calculator ↗</Link><Link href="/pea-gravel-calculator/">Pea gravel calculator ↗</Link><Link href="/cubic-yard-calculator/">Cubic yard calculator ↗</Link></div>
    <p className="guide-disclaimer">This guide is general educational information, not a project specification or professional engineering advice. Check the <Link href="/disclaimer/" className="inline-link">calculation disclaimer</Link> before relying on an estimate.</p>
  </article>;
}
