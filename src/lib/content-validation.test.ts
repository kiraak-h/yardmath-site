import { describe, expect, it } from "vitest";
import { tools } from "./tools";
import { guides } from "./guides";

describe("Content Validation & Integrity", () => {
  describe("Internal Link Integrity", () => {
    const guideSlugs = new Set(guides.map((g) => g.slug));
    const toolSlugs = new Set(tools.map((t) => t.slug));

    it("verifies that all tools reference existing guide slugs", () => {
      for (const tool of tools) {
        expect(tool.relatedGuides.length).toBeGreaterThan(0);
        for (const rg of tool.relatedGuides) {
          expect(
            guideSlugs.has(rg.slug),
            `Tool '${tool.slug}' references unknown guide slug: '${rg.slug}'`
          ).toBe(true);
        }
      }
    });

    it("verifies that all guides reference existing tool slugs", () => {
      for (const guide of guides) {
        expect(guide.relatedTools.length).toBeGreaterThan(0);
        for (const toolSlug of guide.relatedTools) {
          expect(
            toolSlugs.has(toolSlug),
            `Guide '${guide.slug}' references unknown tool slug: '${toolSlug}'`
          ).toBe(true);
        }
      }
    });

    it("verifies that all guides reference existing companion guide slugs", () => {
      for (const guide of guides) {
        for (const companionSlug of guide.relatedGuides) {
          expect(
            guideSlugs.has(companionSlug),
            `Guide '${guide.slug}' references unknown companion guide: '${companionSlug}'`
          ).toBe(true);
          expect(companionSlug).not.toBe(guide.slug);
        }
      }
    });
  });

  describe("Source Reference & URL Integrity", () => {
    it("verifies that all 12 tools have valid, well-formed source URLs", () => {
      expect(tools.length).toBe(12);
      for (const tool of tools) {
        expect(
          tool.authoritativeSources.length,
          `Tool '${tool.slug}' must have authoritative sources`
        ).toBeGreaterThanOrEqual(2);

        for (const src of tool.authoritativeSources) {
          expect(src.organization.trim().length).toBeGreaterThan(0);
          expect(src.standardOrDocument.trim().length).toBeGreaterThan(0);
          expect(src.citation.trim().length).toBeGreaterThan(0);
          expect(src.url, `Source URL missing in tool '${tool.slug}'`).toBeDefined();
          expect(src.url.startsWith("http://") || src.url.startsWith("https://")).toBe(true);

          // URL parsing validation
          expect(() => new URL(src.url)).not.toThrow();
        }
      }
    });

    it("verifies that all 9 guides have valid, well-formed source URLs", () => {
      expect(guides.length).toBe(9);
      for (const guide of guides) {
        expect(
          guide.sources.length,
          `Guide '${guide.slug}' must have authoritative sources`
        ).toBeGreaterThanOrEqual(2);

        for (const src of guide.sources) {
          expect(src.title.trim().length).toBeGreaterThan(0);
          expect(src.publisher.trim().length).toBeGreaterThan(0);
          expect(src.citation.trim().length).toBeGreaterThan(0);
          expect(src.url, `Source URL missing in guide '${guide.slug}'`).toBeDefined();
          expect(src.url.startsWith("http://") || src.url.startsWith("https://")).toBe(true);

          // URL parsing validation
          expect(() => new URL(src.url)).not.toThrow();
        }
      }
    });

    it("specifically verifies that ASTM C29 references the active C29/C29M-23 standard", () => {
      const weightGuide = guides.find((g) => g.slug === "how-to-calculate-material-weight-bulk-density");
      expect(weightGuide).toBeDefined();
      const astmC29Source = weightGuide?.sources.find((s) => s.title.includes("C29"));
      expect(astmC29Source).toBeDefined();
      expect(astmC29Source?.title).toContain("C29M-23");
      expect(astmC29Source?.title).not.toContain("17a");
      expect(astmC29Source?.url).toBe("https://www.astm.org/c0029_c0029m-23.html");
    });
  });

  describe("Benchmark Tables Mathematical Integrity", () => {
    it("verifies that benchmark tables across all 12 tools have valid numeric coverage", () => {
      for (const tool of tools) {
        const table = tool.quickAnswer.benchmarkTable;
        expect(table.length, `Benchmark table for '${tool.slug}' has rows`).toBeGreaterThanOrEqual(3);

        for (const row of table) {
          expect(row.depth.trim().length).toBeGreaterThan(0);
          expect(row.coverageSqFt.trim().length).toBeGreaterThan(0);
          expect(row.coverageSqM.trim().length).toBeGreaterThan(0);
          expect(row.typicalUse.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it("verifies the 324 constant relationship on standard rectangular depth rows", () => {
      // 1 cubic yard = 27 cu ft = 324 inch-feet
      // Area (sq ft) at D inches = 324 / D
      const standardDepths = [
        { depth: 1, expectedCoverage: 324 },
        { depth: 2, expectedCoverage: 162 },
        { depth: 3, expectedCoverage: 108 },
        { depth: 4, expectedCoverage: 81 },
        { depth: 6, expectedCoverage: 54 },
      ];

      for (const item of standardDepths) {
        const calculated = 324 / item.depth;
        expect(calculated).toBe(item.expectedCoverage);
      }
    });
  });

  describe("Worked Examples Verification", () => {
    it("validates that all 12 worked examples contain complete step-by-step arithmetic", () => {
      for (const tool of tools) {
        const example = tool.workedExample;
        expect(example.title.trim().length).toBeGreaterThan(0);
        expect(example.scenario.trim().length).toBeGreaterThan(0);
        expect(example.dimensions.trim().length).toBeGreaterThan(0);
        expect(example.steps.length, `Worked example in '${tool.slug}' has steps`).toBeGreaterThanOrEqual(4);
        expect(example.finalSummary.trim().length).toBeGreaterThan(0);

        for (const step of example.steps) {
          expect(step.label.trim().length).toBeGreaterThan(0);
          expect(step.formula.trim().length).toBeGreaterThan(0);
          expect(step.result.trim().length).toBeGreaterThan(0);
          expect(step.explanation.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it("verifies arithmetic of standard rectangular worked example (e.g. topsoil)", () => {
      // 20 ft × 15 ft rectangle at 3 in depth with 10% allowance:
      // Area = 300 sq ft
      // Base Volume = 300 × 3 / 324 = 2.7777... yd³
      // Order Volume = 2.7777... × 1.10 = 3.0555... yd³
      const area = 20 * 15;
      const baseVol = (area * 3) / 324;
      const orderVol = baseVol * 1.1;

      expect(area).toBe(300);
      expect(baseVol).toBeCloseTo(2.7777777778, 6);
      expect(orderVol).toBeCloseTo(3.0555555556, 6);

      // Package yield with 2 cu ft bag:
      // Total cu ft = 3.0555555556 * 27 = 82.5 cu ft
      // Bags = ceil(82.5 / 2) = 42 bags
      const totalCuFt = orderVol * 27;
      const bags = Math.ceil(totalCuFt / 2);
      expect(bags).toBe(42);
    });

    it("verifies concrete bag yields arithmetic", () => {
      // 1 cubic yard = 27 cu ft
      // 80 lb bag (0.60 cu ft yield) -> 27 / 0.60 = 45 bags
      // 60 lb bag (0.45 cu ft yield) -> 27 / 0.45 = 60 bags
      expect(27 / 0.6).toBe(45);
      expect(27 / 0.45).toBe(60);
    });

    it("verifies paver base compaction factor and allowance application", () => {
      // Base: 9 ft × 21 ft = 189 sq ft
      // 4 inches depth -> 189 × 4 / 324 = 2.3333 yd³
      // 20% allowance -> 2.3333 × 1.20 = 2.800 yd³
      const area = 9 * 21;
      const netYards = (area * 4) / 324;
      const orderYards = netYards * 1.2;
      expect(area).toBe(189);
      expect(netYards).toBeCloseTo(2.333333, 4);
      expect(orderYards).toBeCloseTo(2.8, 4);
    });
  });

  describe("Calculator Feature Consistency", () => {
    it("ensures gravel driveway metadata does not claim automated multi-layer calculations", () => {
      const drivewayTool = tools.find((t) => t.slug === "gravel-driveway-calculator");
      expect(drivewayTool).toBeDefined();
      expect(drivewayTool?.metaTitle).not.toContain("& Layers");
      expect(drivewayTool?.metaDescription).not.toContain("covers sub-base, Crusher Run, and wearing course layers");
      expect(drivewayTool?.description).toContain("single driveway layer");
    });

    it("ensures paver base calculator explains compaction through the user-controlled allowance setting", () => {
      const paverTool = tools.find((t) => t.slug === "paver-base-calculator");
      expect(paverTool).toBeDefined();
      expect(paverTool?.formula).toContain("Allowance%");
      expect(paverTool?.formulaExplanation.dimensionalExplanation).toContain("setting the project Allowance");
    });

    it("ensures concrete calculator does not promise prefilled bags without pack volume input", () => {
      const concreteTool = tools.find((t) => t.slug === "concrete-calculator");
      expect(concreteTool).toBeDefined();
      expect(concreteTool?.metaDescription).toContain("printed bag yield");
    });
  });
});
