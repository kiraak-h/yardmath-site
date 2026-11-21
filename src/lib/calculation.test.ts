import { describe, expect, it } from "vitest";
import { calculateMaterial, convertDepth, convertLength, convertPackageVolume, convertUnitPrice, type CalculatorInput } from "./calculation";

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
});
