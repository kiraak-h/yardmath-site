import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase = new URL(configuredSiteUrl || "https://yardmath.com");

export const metadata: Metadata = {
  metadataBase,
  title: { default: "YardMath — Landscaping Material Calculators", template: "%s | YardMath" },
  description: "Plan landscaping projects with free calculators for topsoil, mulch, gravel, compost, sand, concrete and more. Estimate volume, packages and project costs.",
  applicationName: "YardMath",
  category: "Home and garden calculators",
  robots: { index: Boolean(configuredSiteUrl), follow: Boolean(configuredSiteUrl), googleBot: { index: Boolean(configuredSiteUrl), follow: Boolean(configuredSiteUrl) } },
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
