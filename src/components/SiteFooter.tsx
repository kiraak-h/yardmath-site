import Link from "next/link";
import { tools } from "@/lib/tools";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link href="/" className="brand footer-brand"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span>yard<span className="brand-accent">math</span></span></Link>
          <p>Practical material calculators for better-planned outdoor projects.</p>
          <p className="footer-disclaimer">Free planning estimates. No account required.</p>
        </div>
        <div className="footer-links">
          <div><h3>Calculators</h3>{tools.map((tool) => <Link key={tool.slug} href={`/${tool.slug}/`}>{tool.shortName}</Link>)}</div>
          <div><h3>YardMath</h3><Link href="/about/">About</Link><Link href="/guides/">Measurement guides</Link><Link href="/contact/">Contact</Link><Link href="/disclaimer/">Calculation disclaimer</Link></div>
          <div><h3>Policies</h3><Link href="/privacy/">Privacy policy</Link><Link href="/terms/">Terms of use</Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} YardMath. Built for projects that add up.</span><span>Confirm material specifications and order quantities with your supplier.</span></div>
    </footer>
  );
}
