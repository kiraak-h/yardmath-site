import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About YardMath",
  description: "Learn how YardMath helps homeowners, gardeners and landscaping professionals estimate material volumes for outdoor projects.",
};

export default function AboutPage() {
  return <div className="page-width legal-page">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>About</span></div>
    <span className="section-kicker">ABOUT YARDMATH</span>
    <h1>Better estimates.<br /><em>Better-planned projects.</em></h1>
    <p>YardMath is a practical collection of landscaping and outdoor-project calculators. It helps people turn measurements into material-volume estimates they can use when planning a project or speaking with a supplier.</p>
    <h2>What YardMath is designed to do</h2>
    <p>Our calculators cover common materials including topsoil, garden soil, mulch, compost, sand, pea gravel, crushed stone, paver base and concrete. Each tool supports US customary and metric dimensions and shows equivalent volume units.</p>
    <h2>How estimates are calculated</h2>
    <p>Calculations use the dimensions entered by the visitor. Optional package counts use the package volume entered by the visitor. Optional weight estimates use a bulk-density value entered by the visitor. Optional cost estimates use the visitor&apos;s own material price and delivery charge.</p>
    <h2>What YardMath does not do</h2>
    <p>YardMath does not provide live supplier inventory, market prices, delivery quotes, structural engineering advice, drainage design or material-specific installation specifications. It does not silently apply a density or compaction factor.</p>
    <h2>Our accuracy principle</h2>
    <p>We prefer a transparent estimate with visible assumptions over a precise-looking result based on an undisclosed guess. Confirm product details, site conditions and final order quantities with your supplier or qualified installer.</p>
    <Link href="/#calculators" className="button-primary">Explore calculators <span>↗</span></Link>
  </div>;
}
