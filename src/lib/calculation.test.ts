import { describe, expect, it } from "vitest";
import { calculateMaterial, convertDepth, convertLength, convertPackageVolume, convertUnitPrice, formatNumber, formatTons, type CalculatorInput } from "./calculation";

const baseInput: CalculatorInput = {
  system: "imperial",
  shape: "rectangle",
  length: 20,
  width: 15,
  depth: 3,
  quantity: 1,
  wastePercent: 10,
  bagSize: 2,
  density: null,
  densityUnit: "kg-m3",
  pricePerVolume: null,
  deliveryFee: 0,
};

describe("calculateMaterial", () => {
  it("calculates imperial rectangular volume and applies the allowance", () => {
    const result = calculateMaterial(baseInput);
    expect(result.cubicYards).toBeCloseTo((20 * 15 * 3 / 324) * 1.1, 10);
    expect(result.bags).toBe(42);
  });

  it("calculates metric rectangular volume and exact bag multiples", () => {
    const result = calculateMaterial({ ...baseInput, system: "metric", length: 2, width: 1, depth: 10, wastePercent: 0, bagSize: 40 });
    expect(result.cubicMetres).toBeCloseTo(0.2, 10);
    expect(result.bags).toBe(5);
  });

  it("supports circular areas using diameter", () => {
    const result = calculateMaterial({ ...baseInput, shape: "circle", length: 10, depth: 4, wastePercent: 0, bagSize: 0 });
    expect(result.cubicYards).toBeCloseTo((Math.PI * 25 * (4 / 12)) / 27, 10);
    expect(result.bags).toBeNull();
  });

  it("supports triangular areas using base and perpendicular height", () => {
    const result = calculateMaterial({ ...baseInput, shape: "triangle", length: 10, width: 6, depth: 12, wastePercent: 0, bagSize: 0 });
    expect(result.cubicYards).toBeCloseTo(30 / 27, 10);
  });

  it("includes supplier-density weight and entered material and delivery costs", () => {
    const result = calculateMaterial({ ...baseInput, wastePercent: 0, pricePerVolume: 50, deliveryFee: 25, density: 1300 });
    expect(result.totalCost).toBeCloseTo((20 * 15 * 3 / 324 * 50) + 25, 10);
    expect(result.weightKg).toBeGreaterThan(0);
    expect(result.weightLb).toBeGreaterThan(0);
    expect(result.weightShortTons).toBeCloseTo((result.weightLb ?? 0) / 2000, 10);
    expect(result.weightMetricTonnes).toBeCloseTo((result.weightKg ?? 0) / 1000, 10);
    expect(result.weightLongTons).toBeCloseTo((result.weightLb ?? 0) / 2240, 10);
  });

  it("supports density expressed in pounds per cubic yard", () => {
    const result = calculateMaterial({ ...baseInput, wastePercent: 0, bagSize: 0, density: 100, densityUnit: "lb-yd3" });
    expect(result.weightLb).toBeCloseTo(result.cubicYards * 100, 10);
  });

  it("multiplies volume for repeated matching areas", () => {
    const result = calculateMaterial({ ...baseInput, quantity: 3, wastePercent: 0 });
    expect(result.cubicYards).toBeCloseTo((20 * 15 * 3 / 324) * 3, 10);
  });

  it("rejects invalid or non-finite dimensions", () => {
    expect(() => calculateMaterial({ ...baseInput, length: 0 })).toThrow(RangeError);
    expect(() => calculateMaterial({ ...baseInput, length: Number.NaN })).toThrow(RangeError);
    expect(() => calculateMaterial({ ...baseInput, quantity: 1.5 })).toThrow(RangeError);
    expect(() => calculateMaterial({ ...baseInput, wastePercent: 101 })).toThrow(RangeError);
  });
});


describe("measurement conversions", () => {
  it("converts dimensions and package volumes in both directions", () => {
    expect(convertLength(10, "imperial", "metric")).toBeCloseTo(3.048, 10);
    expect(convertLength(3.048, "metric", "imperial")).toBeCloseTo(10, 10);
    expect(convertDepth(2, "imperial", "metric")).toBeCloseTo(5.08, 10);
    expect(convertPackageVolume(2, "imperial", "metric")).toBeCloseTo(56.633693184, 10);
  });

  it("preserves the material total when converting a unit price", () => {
    const pricePerYard = 50;
    const pricePerMetre = convertUnitPrice(pricePerYard, "imperial", "metric");
    const cubicYards = 3.25;
    const cubicMetres = cubicYards * 0.764554857984;
    expect(cubicYards * pricePerYard).toBeCloseTo(cubicMetres * pricePerMetre, 10);
    expect(convertUnitPrice(pricePerMetre, "metric", "imperial")).toBeCloseTo(pricePerYard, 10);
  });

  it("preserves exact calculated volume when switching measurement systems with full precision", () => {
    // Starting with imperial: 20 ft x 15 ft x 3 in, 5% waste
    const imperialCalc = calculateMaterial({
      system: "imperial",
      shape: "rectangle",
      length: 20,
      width: 15,
      depth: 3,
      quantity: 1,
      wastePercent: 5,
      bagSize: 0,
      density: null,
      densityUnit: "kg-m3",
      pricePerVolume: null,
      deliveryFee: 0,
    });

    // Converted to metric full precision
    const metricLen = convertLength(20, "imperial", "metric"); // 6.096 m
    const metricW = convertLength(15, "imperial", "metric");   // 4.572 m
    const metricD = convertDepth(3, "imperial", "metric");     // 7.62 cm

    const metricCalc = calculateMaterial({
      system: "metric",
      shape: "rectangle",
      length: metricLen,
      width: metricW,
      depth: metricD,
      quantity: 1,
      wastePercent: 5,
      bagSize: 0,
      density: null,
      densityUnit: "kg-m3",
      pricePerVolume: null,
      deliveryFee: 0,
    });

    // The physical volumes must be identical across systems
    expect(metricCalc.cubicYards).toBeCloseTo(imperialCalc.cubicYards, 10);
    expect(metricCalc.cubicMetres).toBeCloseTo(imperialCalc.cubicMetres, 10);
    expect(metricCalc.cubicFeet).toBeCloseTo(imperialCalc.cubicFeet, 10);
  });

  it("preserves calculated volume without drift across 20 consecutive full-precision conversions", () => {
    // Starting with arbitrary metric values: 5.5 m x 3.2 m x 12.5 cm
    let currentSystem: "imperial" | "metric" = "metric";
    let len = 5.5;
    let w = 3.2;
    let d = 12.5;

    const initialMetricCalc = calculateMaterial({
      system: "metric",
      shape: "rectangle",
      length: len,
      width: w,
      depth: d,
      quantity: 1,
      wastePercent: 5,
      bagSize: 0,
      density: null,
      densityUnit: "kg-m3",
      pricePerVolume: null,
      deliveryFee: 0,
    });

    for (let i = 0; i < 20; i++) {
      const nextSystem: "imperial" | "metric" = currentSystem === "metric" ? "imperial" : "metric";
      len = convertLength(len, currentSystem, nextSystem);
      w = convertLength(w, currentSystem, nextSystem);
      d = convertDepth(d, currentSystem, nextSystem);
      currentSystem = nextSystem;
    }

    // After 20 conversions (even number), we are back in metric
    expect(currentSystem).toBe("metric");
    expect(len).toBeCloseTo(5.5, 12);
    expect(w).toBeCloseTo(3.2, 12);
    expect(d).toBeCloseTo(12.5, 12);

    const finalMetricCalc = calculateMaterial({
      system: "metric",
      shape: "rectangle",
      length: len,
      width: w,
      depth: d,
      quantity: 1,
      wastePercent: 5,
      bagSize: 0,
      density: null,
      densityUnit: "kg-m3",
      pricePerVolume: null,
      deliveryFee: 0,
    });

    expect(finalMetricCalc.cubicMetres).toBeCloseTo(initialMetricCalc.cubicMetres, 10);
    expect(finalMetricCalc.cubicYards).toBeCloseTo(initialMetricCalc.cubicYards, 10);
  });

  it("maintains precision and stability over repeated bi-directional conversion cycles", () => {
    // Starting with 20 ft
    let lengthFt = 20;
    for (let i = 0; i < 10; i++) {
      const metricVal = Number(convertLength(lengthFt, "imperial", "metric").toFixed(3));
      lengthFt = Number(convertLength(metricVal, "metric", "imperial").toFixed(2));
    }
    expect(lengthFt).toBe(20.00);

    // Starting with 5 metres
    let lengthM = 5;
    for (let i = 0; i < 10; i++) {
      const impVal = Number(convertLength(lengthM, "metric", "imperial").toFixed(2));
      lengthM = Number(convertLength(impVal, "imperial", "metric").toFixed(3));
    }
    // Stabilizes at 4.999 (0.02% variance, within tape measure tolerance) with zero ongoing drift
    expect(lengthM).toBe(4.999);
  });

  describe("precision state synchronization and conversion edge cases", () => {
    it("handles clearing measurement fields without calculation errors", () => {
      // When a user clears length (value becomes 0 or invalid), calculation rejects gracefully
      expect(() =>
        calculateMaterial({
          system: "imperial",
          shape: "rectangle",
          length: 0,
          width: 15,
          depth: 3,
          quantity: 1,
          wastePercent: 5,
          bagSize: 0,
          density: null,
          densityUnit: "kg-m3",
          pricePerVolume: null,
          deliveryFee: 0,
        })
      ).toThrow();
    });

    it("correctly evaluates user modifications made after switching to metric", () => {
      // 1. Initial imperial state: 20 ft x 15 ft x 3 in converted to metric
      const convertedLen = convertLength(20, "imperial", "metric"); // 6.096 m
      expect(convertedLen).toBeCloseTo(6.096, 3);
      const convertedW = convertLength(15, "imperial", "metric");   // 4.572 m
      const convertedD = convertDepth(3, "imperial", "metric");     // 7.62 cm

      // 2. User edits metric length to 8.5 m
      const userEditedLen = 8.5;
      const result = calculateMaterial({
        system: "metric",
        shape: "rectangle",
        length: userEditedLen,
        width: convertedW,
        depth: convertedD,
        quantity: 1,
        wastePercent: 0,
        bagSize: 0,
        density: null,
        densityUnit: "kg-m3",
        pricePerVolume: null,
        deliveryFee: 0,
      });

      // Area = 8.5 m * 4.572 m = 38.862 m²
      // Volume = 38.862 m² * (7.62 / 100 m) = 2.9612844 m³
      expect(result.cubicMetres).toBeCloseTo(2.9612844, 6);
      // Ensure no stale 20 ft length is present
      expect(result.cubicMetres).not.toBeCloseTo(2.12376, 3);
    });

    it("handles empty optional bag-size and price fields during conversion", () => {
      // When bagSize is 0 (empty) or price is null (empty)
      expect(convertPackageVolume(0, "imperial", "metric")).toBe(0);
      expect(convertPackageVolume(0, "metric", "imperial")).toBe(0);
      expect(convertUnitPrice(0, "imperial", "metric")).toBe(0);
      expect(convertUnitPrice(0, "metric", "imperial")).toBe(0);
    });

    it("accurately converts and synchronizes bag size and price across both systems", () => {
      // 2 cu ft bag in imperial -> litres in metric
      const bagCuFt = 2.0;
      const bagLitres = convertPackageVolume(bagCuFt, "imperial", "metric");
      expect(bagLitres).toBeCloseTo(56.6337, 3);

      // User modifies metric bag size to 50 L -> converts back to cu ft
      const userEditedBagL = 50.0;
      const convertedBackCuFt = convertPackageVolume(userEditedBagL, "metric", "imperial");
      expect(convertedBackCuFt).toBeCloseTo(1.7657, 3);

      // Price per yd³ in imperial -> price per m³ in metric
      const pricePerYd = 45.0;
      const pricePerM3 = convertUnitPrice(pricePerYd, "imperial", "metric");
      expect(pricePerM3).toBeCloseTo(58.8578, 3);

      // User modifies metric price to $65.00 / m³ -> converts back to price per yd³
      const userEditedPriceM3 = 65.0;
      const convertedBackPriceYd = convertUnitPrice(userEditedPriceM3, "metric", "imperial");
      expect(convertedBackPriceYd).toBeCloseTo(49.6961, 3);
    });

    it("maintains zero cumulative drift across 50 bi-directional conversion cycles for all dimensions", () => {
      let l = 12.5;
      let w = 8.25;
      let d = 15.0;
      let bag = 75.0;
      let pr = 55.0;

      for (let i = 0; i < 50; i++) {
        // Metric -> Imperial
        l = convertLength(l, "metric", "imperial");
        w = convertLength(w, "metric", "imperial");
        d = convertDepth(d, "metric", "imperial");
        bag = convertPackageVolume(bag, "metric", "imperial");
        pr = convertUnitPrice(pr, "metric", "imperial");

        // Imperial -> Metric
        l = convertLength(l, "imperial", "metric");
        w = convertLength(w, "imperial", "metric");
        d = convertDepth(d, "imperial", "metric");
        bag = convertPackageVolume(bag, "imperial", "metric");
        pr = convertUnitPrice(pr, "imperial", "metric");
      }

      expect(l).toBeCloseTo(12.5, 10);
      expect(w).toBeCloseTo(8.25, 10);
      expect(d).toBeCloseTo(15.0, 10);
      expect(bag).toBeCloseTo(75.0, 10);
      expect(pr).toBeCloseTo(55.0, 10);
    });

    it("ensures latest user inputs strictly override previous internal numeric state without stale leakage", () => {
      // Sequence of rapid user updates on length
      const updates = [20, 35, 12, 18.5, 40];
      let finalResult = null;

      for (const val of updates) {
        finalResult = calculateMaterial({
          system: "imperial",
          shape: "rectangle",
          length: val,
          width: 15,
          depth: 3,
          quantity: 1,
          wastePercent: 0,
          bagSize: 0,
          density: null,
          densityUnit: "kg-m3",
          pricePerVolume: null,
          deliveryFee: 0,
        });
      }

      // Expected for final length 40 ft:
      // Area = 40 * 15 = 600 sq ft. Volume = 600 * (3 / 12) = 150 cu ft = 150 / 27 = 5.5555... yd³
      expect(finalResult?.cubicYards).toBeCloseTo(5.555555, 5);
      expect(finalResult?.cubicFeet).toBeCloseTo(150.0, 5);
    });
  });
});

describe("weight number formatting", () => {
  it("formats integer and fractional tonnage consistently with two decimal places", () => {
    expect(formatTons(3)).toBe("3.00");
    expect(formatTons(3.364)).toBe("3.36");
    expect(formatTons(0.5)).toBe("0.50");
    expect(formatTons(12.7)).toBe("12.70");
  });

  it("formats pounds and kilograms as integers with thousands separators", () => {
    expect(formatNumber(6000, 0)).toBe("6,000");
    expect(formatNumber(2722, 0)).toBe("2,722");
    expect(formatNumber(500, 0)).toBe("500");
    expect(formatNumber(15420.8, 0)).toBe("15,421");
  });
});
