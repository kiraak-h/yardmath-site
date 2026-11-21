"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="YardMath home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>yard<span className="brand-accent">math</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#calculators">Calculators</Link>
          <Link href="/guides/">Guides</Link>
          <Link href="/about/">About</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-cta" href="/topsoil-calculator/">Use a calculator <span aria-hidden="true">↗</span></Link>
          <button type="button" className="mobile-menu-button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
      </div>
      {menuOpen ? <nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/#calculators" onClick={closeMenu}>Calculators</Link><Link href="/guides/" onClick={closeMenu}>Guides</Link><Link href="/about/" onClick={closeMenu}>About</Link><Link href="/contact/" onClick={closeMenu}>Contact</Link></nav> : null}
    </header>
  );
}
