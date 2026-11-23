import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getMetadataBase, isSiteIndexable } from "@/lib/site-config";

const metadataBase = getMetadataBase();
const indexable = isSiteIndexable();

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: { default: "YardMath — Landscaping Material Calculators", template: "%s | YardMath" },
  description: "Plan landscaping projects with free calculators for topsoil, mulch, gravel, compost, sand, concrete and more. Estimate volume, packages and project costs.",
  applicationName: "YardMath",
  category: "Home and garden calculators",
  robots: { index: indexable, follow: indexable, googleBot: { index: indexable, follow: indexable } },
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", siteName: "YardMath", title: "YardMath — Landscaping Material Calculators", description: "Free calculators for soil, mulch, gravel, sand and outdoor project materials.", images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "YardMath landscaping calculators" }] },
  twitter: { card: "summary_large_image", title: "YardMath — Landscaping Material Calculators", description: "Free calculators for soil, mulch, gravel, sand and outdoor project materials.", images: ["/og-image.png"] },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "YardMath", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eef1e5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
