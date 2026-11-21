import Link from "next/link";

export default function NotFound() {
  return <div className="page-width legal-page not-found-page">
    <span className="section-kicker">404 · THAT PATH ISN&apos;T HERE</span>
    <h1>Looks like this project took <em>a detour.</em></h1>
    <p>The page may have moved or the address may be mistyped. Head back to the calculator directory to find the tool you need.</p>
    <Link href="/#calculators" className="button-primary">Browse calculators <span>↗</span></Link>
  </div>;
}
