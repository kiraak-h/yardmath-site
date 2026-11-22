import { describe, expect, it } from "vitest";
import { tools } from "./tools";
import { guides } from "./guides";
import { calculateMaterial } from "./calculation";
import { workedExampleFixtures } from "./worked-examples";

describe("Content Validation & Calculation Integrity", () => {
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

          // URL syntax validation
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

          // URL syntax validation
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

  describe("Benchmark Tables Mathematical Verification", () => {
    it("verifies every benchmark-table numeric entry across all 12 tools matches 324/D and 100/Dcm", () => {
      for (const tool of tools) {
        const table = tool.quickAnswer.benchmarkTable;
        expect(table.length, `Benchmark table for '${tool.slug}' has rows`).toBeGreaterThanOrEqual(3);

        for (const row of table) {
          // Parse depth in inches
          const depthMatch = row.depth.match(/([\d.]+)\s*(?:to\s*[\d.]+)?\s*inch/i);
          if (depthMatch) {
            const depthInches = parseFloat(depthMatch[1]);
            if (depthInches > 0) {
              const expectedSqFtPerYd = 324 / depthInches;
              const cleanSqFt = row.coverageSqFt.replace(/,/g, "");
              const coverageMatch = cleanSqFt.match(/([\d.]+)\s*sq\s*ft/i);
              if (coverageMatch) {
                const statedSqFt = parseFloat(coverageMatch[1]);
                expect(
                  Math.abs(statedSqFt - expectedSqFtPerYd),
                  `Tool '${tool.slug}' row depth '${row.depth}' stated '${statedSqFt}' sq ft vs expected '${expectedSqFtPerYd}'`
                ).toBeLessThanOrEqual(0.15);
              }
            }
          }

          // Parse metric coverage
          const cleanSqM = row.coverageSqM.replace(/,/g, "");
          const metricMatch = cleanSqM.match(/([\d.]+)\s*m²/i);
          if (metricMatch) {
            const statedSqM = parseFloat(metricMatch[1]);
            if (row.coverageSqM.includes("/ m³") || row.coverageSqM.includes("/m³")) {
              const cmMatch = row.depth.match(/([\d.]+)\s*cm/i);
              if (cmMatch) {
                const depthCm = parseFloat(cmMatch[1]);
                if (depthCm > 0) {
                  const expectedSqMPerM3 = 100 / depthCm;
                  expect(
                    Math.abs(statedSqM - expectedSqMPerM3),
                    `Tool '${tool.slug}' row depth '${row.depth}' stated '${statedSqM}' m²/m³ vs expected '${expectedSqMPerM3}'`
                  ).toBeLessThanOrEqual(0.35);
                }
              }
            } else {
              // Metric equivalent of the square footage per cubic yard (1 sq ft ≈ 0.092903 m²)
              const cleanSqFt = row.coverageSqFt.replace(/,/g, "");
              const sqFtMatch = cleanSqFt.match(/([\d.]+)\s*sq\s*ft/i);
              if (sqFtMatch) {
                const statedSqFt = parseFloat(sqFtMatch[1]);
                const expectedSqM = statedSqFt * 0.09290304;
                expect(
                  Math.abs(statedSqM - expectedSqM),
                  `Tool '${tool.slug}' row depth '${row.depth}' stated '${statedSqM}' m² vs expected '${expectedSqM}'`
                ).toBeLessThanOrEqual(0.35);
              }
            }
          }
        }
      }
    });
  });

  describe("End-to-End Mathematical Recalculation of All 12 Worked Examples", () => {
    for (const tool of tools) {
      it(`independently recalculates worked example for '${tool.slug}' using calculation engine`, () => {
        const fixture = workedExampleFixtures[tool.slug];
        expect(fixture, `Fixture must exist for ${tool.slug}`).toBeDefined();

        // Run through central calculation engine
        const result = calculateMaterial(fixture.input);

        // 1. Planar Area Verification
        expect(result.area).toBeCloseTo(fixture.expected.area, 2);

        // 2. Base Geometric Volume Verification (yd³)
        const calculatedBaseYards = result.baseCubicFeet / 27;
        expect(calculatedBaseYards).toBeCloseTo(fixture.expected.baseCubicYards, 2);

        // 3. Post-Allowance Order Volume Verification (yd³)
        expect(result.cubicYards).toBeCloseTo(fixture.expected.orderCubicYards, 2);

        // 4. Metric Order Volume Verification (m³)
        expect(result.cubicMetres).toBeCloseTo(fixture.expected.orderCubicMetres, 2);

        // 5. Bag Packaging Yield Verification
        if (fixture.expected.bags !== null) {
          expect(result.bags).toBe(fixture.expected.bags);
        }

        // 6. Weight & Tonnage Calculations Verification
        if (fixture.expected.weightLb !== null) {
          expect(result.weightLb).not.toBeNull();
          expect(Math.round(result.weightLb!)).toBe(fixture.expected.weightLb);
        }

        if (fixture.expected.weightShortTons !== null) {
          expect(result.weightShortTons).not.toBeNull();
          expect(result.weightShortTons!).toBeCloseTo(fixture.expected.weightShortTons, 2);
        }

        if (fixture.expected.weightMetricTonnes !== null) {
          expect(result.weightMetricTonnes).not.toBeNull();
          expect(result.weightMetricTonnes!).toBeCloseTo(fixture.expected.weightMetricTonnes, 2);
        }

        if (fixture.expected.weightLongTons !== null) {
          expect(result.weightLongTons).not.toBeNull();
          expect(result.weightLongTons!).toBeCloseTo(fixture.expected.weightLongTons, 2);
        }

        // 7. Verify displayed content in tool.workedExample matches the fixture
        expect(tool.workedExample.title).toBe(fixture.title);
        expect(tool.workedExample.scenario).toBe(fixture.scenario);
        expect(tool.workedExample.steps.length).toBe(fixture.steps.length);
        expect(tool.workedExample.finalSummary).toBe(fixture.finalSummary);
      });
    }
  });

  describe("Unit Conversion & Tonnage Math Rigor", () => {
    it("validates exact conversion relationships for tonnage and volumes", () => {
      const input = {
        shape: "rectangle" as const,
        system: "imperial" as const,
        length: 27,
        width: 1,
        depth: 12,
        quantity: 1,
        wastePercent: 0,
        bagSize: 0,
        density: 2000, // 2000 lb/yd3
        densityUnit: "lb-yd3" as const,
        pricePerVolume: null,
        deliveryFee: 0,
      };

      const res = calculateMaterial(input);
      // 27 ft × 1 ft × 1 ft = 27 cu ft = 1 cubic yard
      expect(res.baseCubicFeet).toBe(27);
      expect(res.cubicYards).toBe(1);
      expect(res.cubicMetres).toBeCloseTo(0.764555, 5);

      // Weight at 2000 lb/yd3:
      // Exactly 2000 lbs = 1.0 US short ton
      expect(res.weightLb).toBe(2000);
      expect(res.weightShortTons).toBe(1.0);

      // 1 short ton = 2000 lb = 907.18474 kg = 0.907185 metric tonnes
      expect(res.weightKg).toBeCloseTo(907.18474, 3);
      expect(res.weightMetricTonnes).toBeCloseTo(0.907185, 3);

      // 2000 lb / 2240 lb/long ton = 0.892857 long tons
      expect(res.weightLongTons).toBeCloseTo(2000 / 2240, 5);
    });

    it("verifies circle calculations treat length strictly as diameter", () => {
      // Circle diameter = 10 ft, depth = 12 in (1 ft), no allowance
      // Area = π × (10/2)² = 25π ≈ 78.5398 sq ft
      // Volume = 25π cu ft = 25π / 27 yd³ ≈ 2.90888 yd³
      const res = calculateMaterial({
        shape: "circle",
        system: "imperial",
        length: 10, // diameter
        width: 0,
        depth: 12,
        quantity: 1,
        wastePercent: 0,
        bagSize: 0,
        density: null,
        densityUnit: "lb-yd3",
        pricePerVolume: null,
        deliveryFee: 0,
      });

      expect(res.area).toBeCloseTo(Math.PI * 25, 4);
      expect(res.cubicFeet).toBeCloseTo(Math.PI * 25, 4);
      expect(res.cubicYards).toBeCloseTo((Math.PI * 25) / 27, 4);
    });

    it("verifies triangle calculations treat inputs as base and perpendicular height", () => {
      // Base = 10 ft, height = 6 ft, depth = 12 in (1 ft)
      // Area = (10 × 6) / 2 = 30 sq ft
      // Volume = 30 cu ft = 30 / 27 = 1.1111 yd³
      const res = calculateMaterial({
        shape: "triangle",
        system: "imperial",
        length: 10, // base
        width: 6, // height
        depth: 12,
        quantity: 1,
        wastePercent: 0,
        bagSize: 0,
        density: null,
        densityUnit: "lb-yd3",
        pricePerVolume: null,
        deliveryFee: 0,
      });

      expect(res.area).toBe(30);
      expect(res.cubicFeet).toBe(30);
      expect(res.cubicYards).toBeCloseTo(30 / 27, 4);
    });
  });

  describe("Boundary Cases & Physical Limitations", () => {
    it("throws RangeError on zero or negative dimensions properly", () => {
      const zeroInput = {
        shape: "rectangle" as const,
        system: "imperial" as const,
        length: 0,
        width: 10,
        depth: 4,
        quantity: 1,
        wastePercent: 0,
        bagSize: 0,
        density: null,
        densityUnit: "lb-yd3" as const,
        pricePerVolume: null,
        deliveryFee: 0,
      };

      expect(() => calculateMaterial(zeroInput)).toThrow(RangeError);

      const negativeInput = {
        ...zeroInput,
        length: -5,
      };
      expect(() => calculateMaterial(negativeInput)).toThrow(RangeError);
    });

    it("correctly handles 100% allowance factor", () => {
      // 10 ft × 10 ft × 12 in = 100 cu ft = 3.7037 yd³
      // 100% allowance factor = 2.0 × base volume = 200 cu ft = 7.4074 yd³
      const res = calculateMaterial({
        shape: "rectangle",
        system: "imperial",
        length: 10,
        width: 10,
        depth: 12,
        quantity: 1,
        wastePercent: 100,
        bagSize: 0,
        density: null,
        densityUnit: "lb-yd3",
        pricePerVolume: null,
        deliveryFee: 0,
      });

      expect(res.baseCubicFeet).toBe(100);
      expect(res.cubicFeet).toBe(200);
      expect(res.cubicYards).toBeCloseTo(200 / 27, 4);
    });
  });

  describe("Calculator Content & Feature Consistency", () => {
    it("ensures gravel driveway metadata does not claim automated multi-layer calculations", () => {
      const drivewayTool = tools.find((t) => t.slug === "gravel-driveway-calculator");
      expect(drivewayTool).toBeDefined();
      expect(drivewayTool?.metaTitle).not.toContain("& Layers");
      expect(drivewayTool?.metaDescription).not.toContain("covers sub-base, Crusher Run, and wearing course layers");
      expect(drivewayTool?.description).toContain("single driveway layer");
    });

    it("ensures paver base calculator explains compaction through manual allowance setting", () => {
      const paverTool = tools.find((t) => t.slug === "paver-base-calculator");
      expect(paverTool).toBeDefined();
      expect(paverTool?.metaTitle).toBe("Paver Base Calculator | Geometric Volume & Allowance Estimator");
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
