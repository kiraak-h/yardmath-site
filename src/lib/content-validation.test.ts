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

  describe("Source Reference & URL Integrity (Local & Deterministic Syntax)", () => {
    it("verifies that all 12 tools have valid, well-formed source URLs without remote calls", () => {
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

          // URL syntax validation (deterministic, zero network calls)
          expect(() => new URL(src.url)).not.toThrow();
        }
      }
    });

    it("verifies that all 9 guides have valid, well-formed source URLs without remote calls", () => {
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

          // URL syntax validation (deterministic, zero network calls)
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

    it("verifies cubic yard calculator references verified USACE survey manual rather than dead USBR URL", () => {
      const cubicTool = tools.find((t) => t.slug === "cubic-yard-calculator");
      expect(cubicTool).toBeDefined();
      const usaceSource = cubicTool?.authoritativeSources.find((s) => s.organization.includes("USACE") || s.standardOrDocument.includes("1110-1-1005"));
      expect(usaceSource, "USACE EM 1110-1-1005 source should be cited").toBeDefined();
      expect(usaceSource?.url).toContain("em_1110-1-1005.pdf");
    });

    it("verifies CMHA citations point to exact publication resources", () => {
      const paverTool = tools.find((t) => t.slug === "paver-base-calculator");
      const cmhaTec002 = paverTool?.authoritativeSources.find((s) => s.url.includes("pav-tec-002"));
      const cmhaTec004 = paverTool?.authoritativeSources.find((s) => s.url.includes("pav-tec-004"));
      expect(cmhaTec002, "CMHA PAV-TEC-002 must be cited for pedestrian/driveway construction").toBeDefined();
      expect(cmhaTec004, "CMHA PAV-TEC-004 must be cited for structural design").toBeDefined();
      expect(cmhaTec002?.url).toBe("https://www.cmha.org/resource/pav-tec-002/");
      expect(cmhaTec004?.url).toBe("https://www.cmha.org/resource/pav-tec-004/");

      const sandTool = tools.find((t) => t.slug === "sand-calculator");
      const cmhaSand = sandTool?.authoritativeSources.find((s) => s.organization.includes("CMHA"));
      expect(cmhaSand?.url).toBe("https://www.cmha.org/resource/pav-tec-002/");
    });

    it("verifies USDA NRCS handbook citation points to Part 650 publication document", () => {
      const measureGuide = guides.find((g) => g.slug === "how-to-measure-landscaping-materials");
      const nrcsSource = measureGuide?.sources.find((s) => s.publisher.includes("NRCS"));
      expect(nrcsSource?.url).toContain("Engineering%20Field%20Handbook.pdf");
    });

    it("verifies Cornell citation points to official lawn care publication", () => {
      const topsoilTool = tools.find((t) => t.slug === "topsoil-calculator");
      const cornellSource = topsoilTool?.authoritativeSources.find((s) => s.organization.includes("Cornell"));
      expect(cornellSource?.url).toBe("https://turf.cals.cornell.edu/lawn/lawn-care-the-easiest-steps-to-an-attractive-environmental-asset/");
    });

    it("verifies Penn State citation references genuine Lawn Establishment guide rather than confabulated Agronomy Facts 62", () => {
      const topsoilTool = tools.find((t) => t.slug === "topsoil-calculator");
      const psuSource = topsoilTool?.authoritativeSources.find((s) => s.organization.includes("Penn State"));
      expect(psuSource?.standardOrDocument).toBe("Lawn Establishment: Preparing the Soil and Grading");
      expect(psuSource?.standardOrDocument).not.toContain("Agronomy Facts 62");
      expect(psuSource?.url).toBe("https://extension.psu.edu/lawn-establishment");

      const topsoilGuide = guides.find((g) => g.slug === "how-to-measure-landscaping-materials");
      const psuGuideSource = topsoilGuide?.sources.find((s) => s.publisher.includes("Penn State"));
      expect(psuGuideSource?.title).toBe("Lawn Establishment: Preparing the Soil and Grading");
      expect(psuGuideSource?.title).not.toContain("Agronomy Facts 62");
      expect(psuGuideSource?.url).toBe("https://extension.psu.edu/lawn-establishment");
    });

    it("verifies pea gravel calculator cites USDA Forest Service / FHWA tread guide rather than ASLA homepage", () => {
      const peaTool = tools.find((t) => t.slug === "pea-gravel-calculator");
      const treadSource = peaTool?.authoritativeSources.find((s) => s.organization.includes("FHWA") || s.organization.includes("Forest Service"));
      expect(treadSource, "USDA Forest Service / FHWA tread source must be cited").toBeDefined();
      expect(treadSource?.url).toBe("https://www.fhwa.dot.gov/environment/recreational_trails/publications/fs_publications/07232806/page09.cfm");
    });

    it("verifies driveway calculator and guide cite direct CDGRS technical bulletin rather than generic homepage", () => {
      const drivewayTool = tools.find((t) => t.slug === "gravel-driveway-calculator");
      const cdgrsToolSource = drivewayTool?.authoritativeSources.find((s) => s.organization.includes("Dirt and Gravel"));
      expect(cdgrsToolSource?.url).toBe("https://dirtandgravel.psu.edu/wp-content/uploads/Tech-Bulletin_Driving_Surface_Aggregate_2025.pdf");

      const drivewayGuide = guides.find((g) => g.slug === "gravel-driveway-material-estimation");
      const cdgrsGuideSource = drivewayGuide?.sources.find((s) => s.publisher.includes("Dirt and Gravel"));
      expect(cdgrsGuideSource?.url).toBe("https://dirtandgravel.psu.edu/wp-content/uploads/Tech-Bulletin_Driving_Surface_Aggregate_2025.pdf");
    });

    it("verifies RHS citation points to official garden plan publication", () => {
      const irregularGuide = guides.find((g) => g.slug === "measuring-irregular-landscaping-areas");
      const rhsSource = irregularGuide?.sources.find((s) => s.publisher.includes("RHS"));
      expect(rhsSource?.url).toBe("https://www.rhs.org.uk/garden-inspiration/design/creating-your-garden-plan");
    });

    it("verifies NSSGA citation points to the Aggregates Handbook publication document", () => {
      const stoneTool = tools.find((t) => t.slug === "crushed-stone-calculator");
      const nssgaSource = stoneTool?.authoritativeSources.find((s) => s.organization.includes("NSSGA"));
      expect(nssgaSource?.url).toBe("https://www.smenet.org/docs/public/aggregateshandbooksellsheet.pdf");
    });
  });

  describe("Benchmark Tables Mathematical Verification (Range & Endpoint Rigor)", () => {
    it("verifies every benchmark-table numeric entry across all 12 tools and validates range endpoints", () => {
      for (const tool of tools) {
        const table = tool.quickAnswer.benchmarkTable;
        expect(table.length, `Benchmark table for '${tool.slug}' has rows`).toBeGreaterThanOrEqual(3);

        for (const row of table) {
          if (tool.slug === "soil-calculator") {
            // Soil table format: depth "X inches (Y cm)", coverageSqFt "X yd³ (Y cu ft)", coverageSqM "Z m³"
            const depthMatch = row.depth.match(/([\d.]+)\s*inches/i);
            if (!depthMatch) expect.fail(`Tool 'soil-calculator' unparseable depth: "${row.depth}"`);
            const d = parseFloat(depthMatch[1]);
            const expectedYd3 = (100 * d) / 324;
            const expectedCuFt = (100 * d) / 12;
            const expectedM3 = expectedYd3 * 0.764555;

            const yd3Match = row.coverageSqFt.match(/([\d.]+)\s*yd³/i);
            const cuFtMatch = row.coverageSqFt.match(/([\d.]+)\s*cu\s*ft/i);
            const m3Match = row.coverageSqM.match(/([\d.]+)\s*m³/i);

            if (!yd3Match || !cuFtMatch || !m3Match) {
              expect.fail(`Tool 'soil-calculator' unparseable row volume: "${row.coverageSqFt}" / "${row.coverageSqM}"`);
            }

            expect(parseFloat(yd3Match[1])).toBeCloseTo(expectedYd3, 2);
            expect(parseFloat(cuFtMatch[1])).toBeCloseTo(expectedCuFt, 1);
            expect(parseFloat(m3Match[1])).toBeCloseTo(expectedM3, 2);
            continue;
          }

          if (tool.slug === "raised-bed-soil-calculator") {
            // Raised bed format: "LxW ft bed at D in depth", coverageSqFt "X sq ft", coverageSqM "Y cu ft (Z yd³)"
            const bedMatch = row.depth.match(/(\d+)x(\d+)\s*ft\s*bed\s*at\s*(\d+)\s*in\s*depth/i);
            if (!bedMatch) expect.fail(`Tool 'raised-bed-soil-calculator' unparseable bed format: "${row.depth}"`);
            const nominalL = parseInt(bedMatch[1], 10);
            const nominalW = parseInt(bedMatch[2], 10);
            const depthInches = parseInt(bedMatch[3], 10);

            // Deduct 3 inches (0.25 ft) for framing lumber thickness
            const insideL = nominalL - 0.25;
            const insideW = nominalW - 0.25;
            const insideArea = insideL * insideW;
            const expectedCuFt = insideArea * (depthInches / 12);
            const expectedYd3 = expectedCuFt / 27;

            const sqFtMatch = row.coverageSqFt.match(/([\d.]+)\s*sq\s*ft/i);
            const cuFtMatch = row.coverageSqM.match(/([\d.]+)\s*cu\s*ft/i);
            const yd3Match = row.coverageSqM.match(/([\d.]+)\s*yd³/i);

            if (!sqFtMatch || !cuFtMatch || !yd3Match) {
              expect.fail(`Tool 'raised-bed-soil-calculator' unparseable row: "${row.coverageSqFt}" / "${row.coverageSqM}"`);
            }

            expect(Math.abs(parseFloat(sqFtMatch[1]) - insideArea)).toBeLessThanOrEqual(0.25);
            expect(Math.abs(parseFloat(cuFtMatch[1]) - expectedCuFt)).toBeLessThanOrEqual(0.25);
            expect(Math.abs(parseFloat(yd3Match[1]) - expectedYd3)).toBeLessThanOrEqual(0.05);
            continue;
          }

          // Standard coverage table per cubic yard: check for range depth vs single depth
          const rangeDepthMatch = row.depth.match(/([\d.]+)\s*(?:to|-)\s*([\d.]+)\s*(?:in|inch|inches)/i);
          const singleDepthMatch = row.depth.match(/^([\d.]+)\s*(?:in|inch|inches)/i);

          if (!rangeDepthMatch && !singleDepthMatch) {
            expect.fail(`Tool '${tool.slug}' has unparseable depth in row: "${row.depth}"`);
          }

          const cleanSqFt = row.coverageSqFt.replace(/,/g, "");
          const cleanSqM = row.coverageSqM.replace(/,/g, "");

          if (rangeDepthMatch) {
            const dMin = parseFloat(rangeDepthMatch[1]);
            const dMax = parseFloat(rangeDepthMatch[2]);
            expect(dMin).toBeGreaterThan(0);
            expect(dMax).toBeGreaterThan(dMin);

            // Deeper depth yields lower square footage per cubic yard
            const expectedMinSqFt = 324 / dMax;
            const expectedMaxSqFt = 324 / dMin;

            const sqFtRangeMatch = cleanSqFt.match(/([\d.]+)\s*(?:to|-)\s*([\d.]+)\s*sq\s*ft/i);
            if (!sqFtRangeMatch) {
              expect.fail(`Tool '${tool.slug}' depth is a range "${row.depth}" but coverageSqFt is not: "${row.coverageSqFt}"`);
            }

            const statedMinSqFt = parseFloat(sqFtRangeMatch[1]);
            const statedMaxSqFt = parseFloat(sqFtRangeMatch[2]);

            expect(
              Math.abs(statedMinSqFt - expectedMinSqFt),
              `Tool '${tool.slug}' range lower bound stated '${statedMinSqFt}' vs expected '${expectedMinSqFt}'`
            ).toBeLessThanOrEqual(0.35);

            expect(
              Math.abs(statedMaxSqFt - expectedMaxSqFt),
              `Tool '${tool.slug}' range upper bound stated '${statedMaxSqFt}' vs expected '${expectedMaxSqFt}'`
            ).toBeLessThanOrEqual(0.35);

            // Metric verification for range
            const sqMRangeMatch = cleanSqM.match(/([\d.]+)\s*(?:to|-)\s*([\d.]+)\s*m²/i);
            if (!sqMRangeMatch) {
              expect.fail(`Tool '${tool.slug}' coverageSqM is not a valid range: "${row.coverageSqM}"`);
            }

            const statedMinSqM = parseFloat(sqMRangeMatch[1]);
            const statedMaxSqM = parseFloat(sqMRangeMatch[2]);
            const expectedMinSqM = statedMinSqFt * 0.09290304;
            const expectedMaxSqM = statedMaxSqFt * 0.09290304;

            expect(
              Math.abs(statedMinSqM - expectedMinSqM),
              `Tool '${tool.slug}' metric range lower bound stated '${statedMinSqM}' vs expected '${expectedMinSqM}'`
            ).toBeLessThanOrEqual(0.4);

            expect(
              Math.abs(statedMaxSqM - expectedMaxSqM),
              `Tool '${tool.slug}' metric range upper bound stated '${statedMaxSqM}' vs expected '${expectedMaxSqM}'`
            ).toBeLessThanOrEqual(0.4);

          } else if (singleDepthMatch) {
            const depthInches = parseFloat(singleDepthMatch[1]);
            expect(depthInches).toBeGreaterThan(0);
            const expectedSqFtPerYd = 324 / depthInches;

            const sqFtSingleMatch = cleanSqFt.match(/([\d.]+)\s*sq\s*ft/i);
            if (!sqFtSingleMatch) {
              expect.fail(`Tool '${tool.slug}' single depth "${row.depth}" has unparseable coverageSqFt: "${row.coverageSqFt}"`);
            }

            const statedSqFt = parseFloat(sqFtSingleMatch[1]);
            expect(
              Math.abs(statedSqFt - expectedSqFtPerYd),
              `Tool '${tool.slug}' row depth '${row.depth}' stated '${statedSqFt}' sq ft vs expected '${expectedSqFtPerYd}'`
            ).toBeLessThanOrEqual(0.15);

            // Metric verification
            const sqMSingleMatch = cleanSqM.match(/([\d.]+)\s*m²/i);
            if (!sqMSingleMatch) {
              expect.fail(`Tool '${tool.slug}' single depth has unparseable coverageSqM: "${row.coverageSqM}"`);
            }

            const statedSqM = parseFloat(sqMSingleMatch[1]);
            if (row.coverageSqM.includes("/ m³") || row.coverageSqM.includes("/m³")) {
              const cmMatch = row.depth.match(/([\d.]+)\s*cm/i);
              if (!cmMatch) {
                expect.fail(`Tool '${tool.slug}' row states /m³ but has no cm depth: "${row.depth}"`);
              }
              const depthCm = parseFloat(cmMatch[1]);
              const expectedSqMPerM3 = 100 / depthCm;
              expect(
                Math.abs(statedSqM - expectedSqMPerM3),
                `Tool '${tool.slug}' row depth '${row.depth}' stated '${statedSqM}' m²/m³ vs expected '${expectedSqMPerM3}'`
              ).toBeLessThanOrEqual(0.35);
            } else {
              const expectedSqM = statedSqFt * 0.09290304;
              expect(
                Math.abs(statedSqM - expectedSqM),
                `Tool '${tool.slug}' row depth '${row.depth}' stated '${statedSqM}' m² vs expected '${expectedSqM}'`
              ).toBeLessThanOrEqual(0.35);
            }
          }
        }
      }
    });
  });

  describe("End-to-End Mathematical Recalculation of All 12 Worked Examples", () => {
    for (const tool of tools) {
      it(`independently recalculates worked example for '${tool.slug}' and verifies each displayed step result`, () => {
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

        // 7. Verify displayed content in tool.workedExample matches fixture metadata
        expect(tool.workedExample.title).toBe(fixture.title);
        expect(tool.workedExample.scenario).toBe(fixture.scenario);
        expect(tool.workedExample.steps.length).toBe(fixture.steps.length);
        expect(tool.workedExample.finalSummary).toBe(fixture.finalSummary);

        // Ensure every rendered step corresponds to a typed fixture step with identical data and no duplicates
        const seenLabels = new Set<string>();
        for (let i = 0; i < fixture.steps.length; i++) {
          const renderedStep = tool.workedExample.steps[i];
          const fixtureStep = fixture.steps[i];
          expect(renderedStep, `Rendered step ${i} must exist in '${tool.slug}'`).toBeDefined();
          expect(renderedStep.label, `Step ${i} label mismatch in '${tool.slug}'`).toBe(fixtureStep.label);
          expect(renderedStep.formula, `Step ${i} formula mismatch in '${tool.slug}'`).toBe(fixtureStep.formula);
          expect(renderedStep.result, `Step ${i} result mismatch in '${tool.slug}'`).toBe(fixtureStep.result);
          expect(renderedStep.explanation, `Step ${i} explanation mismatch in '${tool.slug}'`).toBe(fixtureStep.explanation);
          expect(renderedStep.category, `Step ${i} category mismatch in '${tool.slug}'`).toBe(fixtureStep.category);
          expect(renderedStep.packageYieldCuFt, `Step ${i} package yield mismatch in '${tool.slug}'`).toBe(fixtureStep.packageYieldCuFt);

          // Verify no duplicated step labels within this tool
          expect(seenLabels.has(renderedStep.label), `Duplicate step label '${renderedStep.label}' in tool '${tool.slug}'`).toBe(false);
          seenLabels.add(renderedStep.label);
        }

        const validatedCategories = new Set<string>();
        let validatedStepCount = 0;

        // 8. Mathematically validate every displayed step result using explicit typed step category
        for (const step of fixture.steps) {
          expect(step.label.length).toBeGreaterThan(0);
          expect(step.formula.length).toBeGreaterThan(0);
          expect(step.result.length).toBeGreaterThan(0);
          expect(step.explanation.length).toBeGreaterThan(0);

          const cleanResult = step.result.replace(/,/g, "");
          validatedCategories.add(step.category);
          validatedStepCount++;

          switch (step.category) {
            case "surface_area": {
              // Surface area (e.g. "300 sq ft" or "1,000 sq ft")
              const match = cleanResult.match(/([\d.]+)\s*(?:sq\s*ft|square\s*feet|m²)/i);
              expect(match, `Step '${step.label}' (${step.category}) must contain valid planar area numeric result`).toBeDefined();
              const areaNum = parseFloat(match![1]);
              expect(areaNum, `Surface area mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.area, 1);
              break;
            }

            case "base_volume": {
              // Base geometric volume (e.g. "2.778 yd³")
              const match = cleanResult.match(/([\d.]+)\s*yd³/i);
              expect(match, `Step '${step.label}' (${step.category}) must contain valid base volume in yd³`).toBeDefined();
              const baseYdNum = parseFloat(match![1]);
              expect(baseYdNum, `Base volume mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.baseCubicYards, 2);
              break;
            }

            case "order_volume": {
              // Post-allowance volume (e.g. "3.056 yd³")
              const match = cleanResult.match(/([\d.]+)\s*yd³/i);
              expect(match, `Step '${step.label}' (${step.category}) must contain valid order volume in yd³`).toBeDefined();
              const orderYdNum = parseFloat(match![1]);
              expect(orderYdNum, `Order volume mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.orderCubicYards, 2);
              break;
            }

            case "packaging_yield": {
              // Bag or package count (e.g. "110 bags")
              const match = cleanResult.match(/(\d+)\s*bags?/i);
              expect(match, `Step '${step.label}' (${step.category}) must contain integer bag count`).toBeDefined();
              const bagNum = parseInt(match![1], 10);
              if (step.packageYieldCuFt) {
                // Derived from packaging yield (e.g. alternative bag options or custom pack sizes)
                const expectedBags = Math.ceil(result.cubicFeet / step.packageYieldCuFt - 1e-10);
                expect(bagNum, `Bag yield mismatch for '${step.label}'`).toBe(expectedBags);
              } else if (fixture.expected.bags !== null) {
                expect(bagNum, `Primary bag count mismatch for '${step.label}'`).toBe(fixture.expected.bags);
              } else {
                expect.fail(`Step '${step.label}' has category 'packaging_yield' but fixture has no expected bags or packageYieldCuFt`);
              }
              break;
            }

            case "total_weight": {
              // Total weight: Validate pounds, US short tons, metric tonnes, and UK long tons
              const fullWeightText = (step.result + " " + step.explanation).replace(/,/g, "");

              if (fixture.expected.weightLb !== null) {
                const lbMatch = fullWeightText.match(/(\d+)\s*lbs?/i);
                expect(lbMatch, `Step '${step.label}' must contain pounds weight`).toBeDefined();
                const lbs = parseInt(lbMatch![1], 10);
                expect(lbs, `Pounds weight mismatch in '${step.label}'`).toBe(fixture.expected.weightLb);
              }

              if (fixture.expected.weightShortTons !== null) {
                const tonMatch = fullWeightText.match(/([\d.]+)\s*short\s*tons?/i);
                expect(tonMatch, `Step '${step.label}' must contain US short tons`).toBeDefined();
                const shortTons = parseFloat(tonMatch![1]);
                expect(shortTons, `Short tons mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.weightShortTons, 2);
              }

              if (fixture.expected.weightMetricTonnes !== null) {
                const metricMatch = fullWeightText.match(/([\d.]+)\s*metric\s*tonnes?/i);
                expect(metricMatch, `Step '${step.label}' must contain metric tonnes`).toBeDefined();
                const metricTonnes = parseFloat(metricMatch![1]);
                expect(metricTonnes, `Metric tonnes mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.weightMetricTonnes, 2);
              }

              if (fixture.expected.weightLongTons !== null) {
                const longMatch = fullWeightText.match(/([\d.]+)\s*long\s*tons?/i);
                expect(longMatch, `Step '${step.label}' must contain UK long tons`).toBeDefined();
                const longTons = parseFloat(longMatch![1]);
                expect(longTons, `Long tons mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.weightLongTons, 2);
              }
              break;
            }

            case "metric_equivalent": {
              // Metric equivalent (e.g. "4.485 m³" or "2.141 m³")
              const match = cleanResult.match(/([\d.]+)\s*m³/i);
              expect(match, `Step '${step.label}' (${step.category}) must contain valid m³ result`).toBeDefined();
              const metricNum = parseFloat(match![1]);
              expect(metricNum, `Metric volume mismatch in '${step.label}'`).toBeCloseTo(fixture.expected.orderCubicMetres, 2);
              break;
            }

            default: {
              // Fail on any unexpected or unsupported step category
              const unknownStep = step as { category?: unknown };
              expect.fail(`Encountered unexpected or unsupported step category: '${String(unknownStep.category)}' in step '${step.label}'`);
            }
          }
        }

        // 9. Verify step counts and ensure no steps went unvalidated
        expect(validatedStepCount, `Every fixture step must be validated for '${tool.slug}'`).toBe(fixture.steps.length);
        expect(tool.workedExample.steps.length, `Rendered step count must match validated step count for '${tool.slug}'`).toBe(validatedStepCount);

        // 10. Validate the expected category coverage for each fixture based on its actual inputs
        expect(validatedCategories.has("surface_area"), `Tool '${tool.slug}' must validate surface_area`).toBe(true);
        expect(validatedCategories.has("base_volume"), `Tool '${tool.slug}' must validate base_volume`).toBe(true);
        expect(validatedCategories.has("order_volume"), `Tool '${tool.slug}' must validate order_volume`).toBe(true);

        // Density / Weight step coverage
        if (fixture.expected.weightLb !== null) {
          expect(validatedCategories.has("total_weight"), `Tool '${tool.slug}' specifies density (${fixture.input.density}) so it must validate total_weight`).toBe(true);
        } else {
          expect(validatedCategories.has("total_weight"), `Tool '${tool.slug}' has no density so it must NOT validate total_weight`).toBe(false);
        }

        // Packaging yield step coverage
        if (fixture.expected.bags !== null) {
          expect(validatedCategories.has("packaging_yield"), `Tool '${tool.slug}' specifies bag packaging so it must validate packaging_yield`).toBe(true);
        } else {
          expect(validatedCategories.has("packaging_yield"), `Tool '${tool.slug}' has no packaging so it must NOT validate packaging_yield`).toBe(false);
        }

        // Metric equivalent coverage
        const hasMetricStep = fixture.steps.some((s) => s.category === "metric_equivalent");
        expect(validatedCategories.has("metric_equivalent"), `Metric category mismatch for '${tool.slug}'`).toBe(hasMetricStep);
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
      expect(res.baseCubicFeet).toBe(27);
      expect(res.cubicYards).toBe(1);
      expect(res.cubicMetres).toBeCloseTo(0.764555, 5);

      // Weight at 2000 lb/yd3: Exactly 2000 lbs = 1.0 US short ton
      expect(res.weightLb).toBe(2000);
      expect(res.weightShortTons).toBe(1.0);

      // 1 short ton = 2000 lb = 907.18474 kg = 0.907185 metric tonnes
      expect(res.weightKg).toBeCloseTo(907.18474, 3);
      expect(res.weightMetricTonnes).toBeCloseTo(0.907185, 3);

      // 2000 lb / 2240 lb/long ton = 0.892857 long tons
      expect(res.weightLongTons).toBeCloseTo(2000 / 2240, 5);
    });

    it("verifies circle calculations treat length strictly as diameter", () => {
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

  describe("Boundary Cases, Inappropriate & Non-Finite Input Rejection", () => {
    const baseValidInput = {
      shape: "rectangle" as const,
      system: "imperial" as const,
      length: 10,
      width: 10,
      depth: 4,
      quantity: 1,
      wastePercent: 10,
      bagSize: 0.75,
      density: 2000,
      densityUnit: "lb-yd3" as const,
      pricePerVolume: 50,
      deliveryFee: 25,
    };

    it("throws RangeError on non-finite, zero or negative length", () => {
      expect(() => calculateMaterial({ ...baseValidInput, length: 0 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, length: -5 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, length: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, length: Infinity })).toThrow(RangeError);
    });

    it("throws RangeError on non-finite, zero or negative width for rectangles and triangles", () => {
      expect(() => calculateMaterial({ ...baseValidInput, width: 0 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, width: -10 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, width: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, width: Infinity })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, shape: "triangle", width: 0 })).toThrow(RangeError);
    });

    it("throws RangeError on non-finite, zero or negative depth", () => {
      expect(() => calculateMaterial({ ...baseValidInput, depth: 0 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, depth: -2 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, depth: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, depth: Infinity })).toThrow(RangeError);
    });

    it("throws RangeError on non-integer, zero, negative or excessive quantities", () => {
      expect(() => calculateMaterial({ ...baseValidInput, quantity: 0 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, quantity: -1 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, quantity: 1.5 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, quantity: 1_000_001 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, quantity: NaN })).toThrow(RangeError);
    });

    it("throws RangeError on negative, non-finite or excessive extra-material allowance", () => {
      expect(() => calculateMaterial({ ...baseValidInput, wastePercent: -1 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, wastePercent: 101 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, wastePercent: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, wastePercent: Infinity })).toThrow(RangeError);
    });

    it("correctly allows valid allowance boundaries of 0% and 100%", () => {
      const res0 = calculateMaterial({ ...baseValidInput, wastePercent: 0 });
      expect(res0.cubicFeet).toBe(res0.baseCubicFeet);

      const res100 = calculateMaterial({ ...baseValidInput, wastePercent: 100 });
      expect(res100.cubicFeet).toBeCloseTo(res100.baseCubicFeet * 2, 4);
    });

    it("throws RangeError on negative or non-finite bagSize", () => {
      expect(() => calculateMaterial({ ...baseValidInput, bagSize: -0.5 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, bagSize: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, bagSize: Infinity })).toThrow(RangeError);
    });

    it("correctly handles bagSize = 0 by omitting bag count", () => {
      const res = calculateMaterial({ ...baseValidInput, bagSize: 0 });
      expect(res.bags).toBeNull();
    });

    it("throws RangeError on non-positive or non-finite bulk density when provided", () => {
      expect(() => calculateMaterial({ ...baseValidInput, density: 0 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, density: -100 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, density: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, density: Infinity })).toThrow(RangeError);
    });

    it("correctly handles density = null by omitting weight outputs", () => {
      const res = calculateMaterial({ ...baseValidInput, density: null });
      expect(res.weightLb).toBeNull();
      expect(res.weightKg).toBeNull();
      expect(res.weightShortTons).toBeNull();
      expect(res.weightMetricTonnes).toBeNull();
      expect(res.weightLongTons).toBeNull();
    });

    it("throws RangeError on negative or non-finite unit price and delivery fee", () => {
      expect(() => calculateMaterial({ ...baseValidInput, pricePerVolume: -10 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, pricePerVolume: NaN })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, deliveryFee: -5 })).toThrow(RangeError);
      expect(() => calculateMaterial({ ...baseValidInput, deliveryFee: NaN })).toThrow(RangeError);
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
      expect(paverTool?.formulaExplanation.dimensionalExplanation).toContain("calculator settings");
      const tec002 = paverTool?.authoritativeSources.find((s) => s.url.includes("pav-tec-002"));
      const tec004 = paverTool?.authoritativeSources.find((s) => s.url.includes("pav-tec-004"));
      expect(tec002, "Must cite CMHA PAV-TEC-002").toBeDefined();
      expect(tec004, "Must cite CMHA PAV-TEC-004").toBeDefined();
    });

    it("ensures concrete calculator does not give universal thickness prescription or prefilled bags", () => {
      const concreteTool = tools.find((t) => t.slug === "concrete-calculator");
      expect(concreteTool).toBeDefined();
      expect(concreteTool?.metaDescription).toContain("printed bag yield");
      expect(concreteTool?.quickAnswer.directAnswer).not.toContain("Residential concrete slabs require a minimum thickness of 4.0 inches");
      expect(concreteTool?.quickAnswer.directAnswer).toContain("illustrative residential slabs");
      expect(concreteTool?.inputsGuide.depthGuidance).toContain("establish the perimeter pour height");
    });
  });
});
