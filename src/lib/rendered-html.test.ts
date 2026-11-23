import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Rendered Production-Build HTML Metadata Integrity", () => {
  const serverAppDir = path.join(process.cwd(), ".next", "server", "app");

  it("verifies rendered static HTML files adhere to indexing and origin protections", () => {
    if (!fs.existsSync(serverAppDir)) {
      // If build has not run yet (e.g. before npm run build), skip cleanly
      return;
    }

    const pagesToCheck = [
      "index.html",
      "topsoil-calculator.html",
      "about.html",
      "contact.html",
      "disclaimer.html",
      "privacy.html",
      "terms.html",
      "guides.html",
      "guides/how-to-measure-landscaping-materials.html",
    ];

    for (const pageRel of pagesToCheck) {
      const pagePath = path.join(serverAppDir, pageRel);
      if (!fs.existsSync(pagePath)) continue;

      const html = fs.readFileSync(pagePath, "utf8");

      // In non-production preview builds (default build):
      // 1. MUST NOT have canonical link tag
      expect(html).not.toMatch(/<link[^>]*rel="canonical"[^>]*>/i);

      // 2. MUST NOT have og:url tag
      expect(html).not.toMatch(/<meta[^>]*property="og:url"[^>]*>/i);

      // 3. MUST NOT have localhost in og:image or twitter:image
      expect(html).not.toContain("localhost:3000/og-image.png");
      expect(html).not.toContain("localhost:3005/og-image.png");

      // 4. MUST NOT leak unapproved commercial domain
      expect(html).not.toContain("https://yardmath.com");
      expect(html).not.toContain("http://yardmath.com");
    }
  });
});
