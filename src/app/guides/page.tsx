import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Landscaping Measurement Guides",
  description: "Practical guides to measuring garden beds, calculating material volume and using landscaping calculators.",
};

export default function GuidesPage() {
  return <div className="page-width legal-page">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Guides</span></div>
    <span className="section-kicker">YARDMATH FIELD NOTES</span>
    <h1>Measure well.<br /><em>Plan with confidence.</em></h1>
    <p>Clear measurement methods and calculation notes to help you use material-volume estimates responsibly.</p>
    <Link className="guide-index-card" href="/guides/how-to-measure-landscaping-materials/"><span className="section-kicker">MEASUREMENT BASICS · 6 MIN READ</span><strong>How to measure a landscaping area and calculate material volume</strong><p>Learn how to measure rectangles, circles and triangles, choose depth units, split irregular spaces and convert the result into common order units.</p><span className="inline-link">Read the guide ↗</span></Link>
    <p className="guide-disclaimer">Guides explain general measurement methods. They do not replace supplier instructions, site assessments or professional specifications.</p>
  </div>;
}
