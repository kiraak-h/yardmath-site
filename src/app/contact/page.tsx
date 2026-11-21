import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact YardMath",
  description: "Contact YardMath about calculator feedback, corrections, accessibility or business enquiries.",
};

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return <div className="page-width legal-page">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
    <span className="section-kicker">GET IN TOUCH</span>
    <h1>We welcome <em>useful feedback.</em></h1>
    <p>Found a calculation issue, unclear instruction or accessibility problem? Let the YardMath team know. Include the calculator name, the measurements you entered and what you expected to happen. Do not send private or sensitive information.</p>
    <h2>Contact by email</h2>
    {email ? <p><a className="inline-link" href={`mailto:${email}`}>{email}</a></p> : <div className="configuration-note"><strong>Site owner setup required before public launch.</strong><p>Set the <code>NEXT_PUBLIC_CONTACT_EMAIL</code> environment variable to a monitored support address. The address will appear here once configured.</p></div>}
    <h2>What to include in a bug report</h2>
    <ul><li>The calculator page you were using.</li><li>The unit system and values entered.</li><li>The result you received and what you expected.</li><li>Your browser and device, if the issue concerns the interface.</li></ul>
    <p>For project-specific material requirements, supplier pricing or installation questions, contact your material supplier or qualified contractor.</p>
    <Link href="/#calculators" className="button-primary">Back to calculators <span>↗</span></Link>
  </div>;
}
