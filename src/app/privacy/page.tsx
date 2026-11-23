import type { Metadata } from "next";
import Link from "next/link";
import { getCanonicalUrl } from "@/lib/site-config";

const canonicalUrl = getCanonicalUrl("/privacy/");

export const metadata: Metadata = {
  title: "Privacy Policy | Zero-Tracker Architecture",
  description: "Read how YardMath protects user privacy with zero client tracking, zero marketing cookies, and strictly local client-side calculations.",
  ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
  openGraph: {
    title: "Privacy Policy | YardMath Landscaping Calculators",
    description: "YardMath operates a zero-tracking, cookie-free client-side calculation platform.",
    type: "website",
    ...(canonicalUrl ? { url: canonicalUrl } : {}),
  },
};

export default function PrivacyPage() {
  return (
    <article className="page-width legal-page">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <span>Privacy policy</span>
      </div>
      <span className="section-kicker">WEBSITE PRIVACY & DATA TRANSPARENCY</span>
      <h1>Privacy <em>policy.</em></h1>
      <p>
        <strong>Last reviewed: November 21, 2026.</strong>
      </p>

      <div className="callout-box info-box" style={{ margin: "1.5rem 0" }}>
        <strong>Current Technical Baseline: Zero Cookies, Zero Trackers</strong>
        <p style={{ margin: "0.5rem 0 0" }}>
          This codebase is deployed with zero third-party advertising trackers, zero analytic pixels, zero session replay scripts, 
          and zero non-essential cookies. Calculation processing occurs entirely client-side inside your browser engine.
        </p>
      </div>

      <h2>Client-side calculation execution</h2>
      <p>
        All dimensional inputs, unit preferences, material density figures, and cost variables are processed locally in your web browser 
        via JavaScript. YardMath does not maintain a central database for calculation inputs, does not log measurement coordinates, 
        and does not transmit your project dimensions over the network.
      </p>

      <h2>Infrastructure and server logging</h2>
      <p>
        When you request web pages, static assets, or edge routes, the web hosting provider (such as Vercel or Cloudflare) receives standard 
        HTTP protocol transmission data. This includes IP addresses, browser user-agent strings, referring URLs, and request timestamps. 
        These standard server access logs are utilized strictly for routing, DDOS defense, security auditing, and infrastructure maintenance.
      </p>

      <h2>Advertising and affiliate services</h2>
      <p>
        YardMath currently does not execute third-party ad networks (e.g. Google AdSense) or affiliate tracking scripts. 
        Before any advertising, sponsored affiliate links, or external telemetry systems are integrated, this policy will be amended, 
        and standard consent banners (CMP) compliant with GDPR, CCPA/CPRA, and ePrivacy directives will be implemented.
      </p>

      <h2>Communications and correspondence</h2>
      <p>
        If you reach out to our team via email regarding calculation bugs, suggestions, or editorial inquiries, we retain your email address 
        and message content solely to investigate the inquiry and reply. We never sell, rent, or distribute correspondence records to marketing aggregators.
      </p>

      <h2>Data subject rights and inquiries</h2>
      <p>
        Under applicable international privacy regulations (GDPR, UK GDPR, California CPRA), users retain rights to inquire about personal data 
        processing. Because YardMath does not track users or store accounts, we hold no user profiles or behavioral databases. 
        Direct privacy inquiries may be submitted through our <Link href="/contact/" className="inline-link">contact page</Link>.
      </p>
    </article>
  );
}
