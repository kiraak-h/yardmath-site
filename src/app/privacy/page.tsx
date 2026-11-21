import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read how YardMath handles information when you use its landscaping calculators and website.",
};

export default function PrivacyPage() {
  return <div className="page-width legal-page">
    <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>Privacy policy</span></div>
    <span className="section-kicker">WEBSITE PRIVACY</span>
    <h1>Privacy <em>policy.</em></h1>
    <p><strong>Last updated: November 20, 2026.</strong></p>
    <p>This page describes the intended privacy practices for the YardMath website. The site owner must review and update it to match the final hosting provider, analytics, advertising, contact and other services actually enabled on the live site. This page is general information and is not legal advice.</p>
    <h2>Calculator information</h2>
    <p>The calculator inputs are processed in your browser to produce the displayed estimate. The current calculator implementation does not require an account and does not send those measurement values to a YardMath application database.</p>
    <h2>Server and hosting logs</h2>
    <p>The hosting provider may process technical information such as IP address, request time, browser details and requested URL in standard security and operational logs. The site owner should identify the hosting provider, log retention practices and any additional processing in this policy before launch.</p>
    <h2>Cookies, analytics and advertising</h2>
    <p>The current source package does not include analytics or advertising tags. If the site owner later enables analytics, advertising, affiliate tracking, embedded content or consent-management services, this policy must be updated to identify those providers, the information they collect, their purposes and applicable user choices before those services are activated.</p>
    <h2>Information you send to us</h2>
    <p>If you contact YardMath by email, the information in your message and email address will be processed to respond to your enquiry. Do not include passwords, payment details, government identifiers or other sensitive information in a support message.</p>
    <h2>Retention and data requests</h2>
    <p>The site owner must define retention periods and a working privacy contact address before launch. Depending on your location, you may have rights to request access, correction or deletion of personal information, subject to applicable law.</p>
    <h2>Children</h2>
    <p>YardMath is a general-purpose project-planning website and is not designed to collect personal information from children.</p>
    <h2>Policy updates</h2>
    <p>This policy may be updated when the website or its services change. The date at the top of this page should be revised whenever a material update is published.</p>
    <p>Questions about this policy can be sent through the <Link href="/contact/" className="inline-link">contact page</Link>.</p>
  </div>;
}
