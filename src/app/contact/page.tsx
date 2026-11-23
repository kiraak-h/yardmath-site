import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/site-config";

const canonicalUrl = getCanonicalUrl("/contact/");

export const metadata: Metadata = {
  title: "Contact YardMath | Feedback, Corrections & Support",
  description: "Contact the YardMath team with calculation feedback, bug reports, editorial corrections, or accessibility inquiries.",
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: "Contact YardMath | Editorial Corrections & Inquiries",
    description: "Submit calculation feedback, bug reports, or corrections to the YardMath team.",
    type: "website",
    url: canonicalUrl,
  },
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  return (
    <article className="page-width legal-page contact-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Contact</span>
      </div>

      <span className="section-kicker">GET IN TOUCH & REPORT CORRECTIONS</span>
      <h1>We welcome <em>verifiable feedback.</em></h1>

      <p className="lead-paragraph">
        Found a calculation discrepancy, unclear mathematical instruction, broken layout, or accessibility barrier?
        The YardMath editorial team investigates and resolves all verified reports promptly.
      </p>

      <h2>1. Direct Email Contact</h2>
      {email ? (
        <p>
          You can reach our editorial and technical team directly at{" "}
          <a className="inline-link" href={`mailto:${email}`}>
            {email}
          </a>.
        </p>
      ) : (
        <div className="configuration-note">
          <strong>Site Owner Setup Notice:</strong>
          <p>
            A public contact email has not yet been configured for this deployment. The site owner must define the <code>NEXT_PUBLIC_CONTACT_EMAIL</code> environment variable with a monitored support address prior to public launch.
          </p>
        </div>
      )}

      <h2>2. What to Include in a Calculation Correction Report</h2>
      <p>
        To allow our engineering and editorial team to reproduce and verify any calculation issue, please provide:
      </p>
      <ul>
        <li><strong>Calculator URL:</strong> The specific calculator route (e.g. <code>/topsoil-calculator/</code> or <code>/concrete-calculator/</code>).</li>
        <li><strong>Input Parameters:</strong> Shape selected, measurement unit system (US Customary or Metric), dimensions entered, depth, and any extra-material allowance applied.</li>
        <li><strong>Observed vs. Expected Result:</strong> The exact numerical output displayed by the calculator, alongside your expected mathematical calculation and reference formula.</li>
        <li><strong>Technical Context:</strong> If reporting a user interface or accessibility bug, please mention your browser, operating system, and device screen size.</li>
      </ul>

      <h2>3. Material & Project Advice Inquiries</h2>
      <p>
        YardMath is an educational and mathematical reference site. We cannot evaluate structural engineering drawings, assess soil load-bearing capacities, or diagnose local drainage permits.
        For project-specific engineering specifications or commercial quarry delivery quotes, please consult a licensed civil engineer, geotechnical professional, or certified local landscape contractor.
      </p>

      <h2>4. Editorial & Privacy Inquiries</h2>
      <p>
        For inquiries regarding our editorial citations, calculation verification methodologies, or data policies, review our <Link href="/about/" className="inline-link">About & Methodology</Link> and <Link href="/privacy/" className="inline-link">Privacy Policy</Link>.
      </p>

      <div className="contact-actions">
        <Link href="/#calculators" className="button-primary">Back to Calculators <span>↗</span></Link>
        <Link href="/guides/" className="button-text">Explore Field Guides <span>↗</span></Link>
      </div>
    </article>
  );
}
