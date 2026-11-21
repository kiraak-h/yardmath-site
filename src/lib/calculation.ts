export type MeasurementSystem = "imperial" | "metric";
export type AreaShape = "rectangle" | "circle" | "triangle";
export type DensityUnit = "kg-m3" | "lb-yd3";

export type CalculatorInput = {
  system: MeasurementSystem;
  shape: AreaShape;
  /** Rectangle: length. Circle: diameter. Triangle: base. */
  length: number;
  /** Rectangle: width. Triangle: perpendicular height. Ignored for circles. */
  width: number;
  /** Imperial depth is inches; metric depth is centimetres. */
  depth: number;
  quantity: number;
  wastePercent: number;
  /** Imperial cubic feet per bag; metric litres per bag. Use 0 to omit a bag estimate. */
  bagSize: number;
  density: number | null;
  densityUnit: DensityUnit;
  /** Price per cubic yard in imperial mode or cubic metre in metric mode. */
  pricePerVolume: number | null;
  deliveryFee: number;
};

export type CalculatorResult = {
  area: number;
  /** Total volume before allowance, expressed in cubic feet. */
  baseCubicFeet: number;
  cubicFeet: number;
  cubicYards: number;
  cubicMetres: number;
  litres: number;
  bags: number | null;
  bagSizeCubicFeet: number;
  weightKg: number | null;
  weightLb: number | null;
  /** US Short Tons (2,000 lbs) */
  weightShortTons: number | null;
  /** Metric Tonnes (1,000 kg) */
  weightMetricTonnes: number | null;
  /** Imperial Long Tons (2,240 lbs) */
  weightLongTons: number | null;
  materialCost: number | null;
  totalCost: number | null;
  allowanceCubicYards: number;
};

export const FT3_PER_M3 = 35.3146667215;
export const FT3_PER_YD3 = 27;
export const LITRES_PER_FT3 = 28.316846592;
export const KG_PER_LB = 0.45359237;
export const M3_PER_YD3 = 0.764554857984;

function assertFinitePositive(value: number, label: string, allowZero = false): void {
  if (!Number.isFinite(value) || (allowZero ? value < 0 : value <= 0)) {
    throw new RangeError(`${label} must be a finite ${allowZero ? "non-negative" : "positive"} number.`);
  }
}

/**
 * Calculate bulk material volume from measured plan dimensions.
 * The result is geometric volume; compaction, settlement and material-specific
 * conversion factors are intentionally not guessed.
 */
export function calculateMaterial(input: CalculatorInput): CalculatorResult {
  assertFinitePositive(input.length, "Length / diameter");
  assertFinitePositive(input.depth, "Depth");
  if (input.shape !== "circle") assertFinitePositive(input.width, "Width / triangle height");
  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 1_000_000) {
    throw new RangeError("Quantity must be a whole number between 1 and 1,000,000.");
  }
  assertFinitePositive(input.wastePercent, "Extra-material allowance", true);
  if (input.wastePercent > 100) throw new RangeError("Extra-material allowance cannot exceed 100%.");
  assertFinitePositive(input.bagSize, "Bag volume", true);
  assertFinitePositive(input.deliveryFee, "Delivery fee", true);
  if (input.density !== null) assertFinitePositive(input.density, "Bulk density");
  if (input.pricePerVolume !== null) assertFinitePositive(input.pricePerVolume, "Material unit price", true);

  const singleArea = input.shape === "circle"
    ? Math.PI * (input.length / 2) ** 2
    : input.shape === "triangle"
      ? (input.length * input.width) / 2
      : input.length * input.width;
  const area = singleArea * input.quantity;

  // Inputs use ft + inches for imperial, and m + centimetres for metric.
  const baseCubicFeet = input.system === "imperial"
    ? area * (input.depth / 12)
    : area * (input.depth / 100) * FT3_PER_M3;

  const allowanceFactor = 1 + input.wastePercent / 100;
  const cubicFeet = baseCubicFeet * allowanceFactor;
  const cubicYards = cubicFeet / FT3_PER_YD3;
  const cubicMetres = cubicFeet / FT3_PER_M3;
  const litres = cubicFeet * LITRES_PER_FT3;
  const bagSizeCubicFeet = input.system === "imperial"
    ? input.bagSize
    : input.bagSize / LITRES_PER_FT3;
  const bags = bagSizeCubicFeet > 0
    ? Math.ceil(cubicFeet / bagSizeCubicFeet - 1e-10)
    : null;

  let weightKg: number | null = null;
  let weightLb: number | null = null;
  let weightShortTons: number | null = null;
  let weightMetricTonnes: number | null = null;
  let weightLongTons: number | null = null;
  if (input.density !== null) {
    if (input.densityUnit === "kg-m3") {
      weightKg = cubicMetres * input.density;
      weightLb = weightKg / KG_PER_LB;
    } else {
      weightLb = cubicYards * input.density;
      weightKg = weightLb * KG_PER_LB;
    }
    weightShortTons = weightLb / 2000;
    weightMetricTonnes = weightKg / 1000;
    weightLongTons = weightLb / 2240;
  }

  let materialCost: number | null = null;
  let totalCost: number | null = null;
  if (input.pricePerVolume !== null) {
    const billableVolume = input.system === "imperial" ? cubicYards : cubicMetres;
    materialCost = billableVolume * input.pricePerVolume;
    totalCost = materialCost + input.deliveryFee;
  }

  return {
    area,
    baseCubicFeet,
    cubicFeet,
    cubicYards,
    cubicMetres,
    litres,
    bags,
    bagSizeCubicFeet,
    weightKg,
    weightLb,
    weightShortTons,
    weightMetricTonnes,
    weightLongTons,
    materialCost,
    totalCost,
    allowanceCubicYards: cubicYards - baseCubicFeet / FT3_PER_YD3,
  };
}

export function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatMoney(value: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

export function convertLength(value: number, from: MeasurementSystem, to: MeasurementSystem): number {
  if (from === to) return value;
  return from === "imperial" ? value * 0.3048 : value / 0.3048;
}

export function convertDepth(value: number, from: MeasurementSystem, to: MeasurementSystem): number {
  if (from === to) return value;
  return from === "imperial" ? value * 2.54 : value / 2.54;
}

export function convertPackageVolume(value: number, from: MeasurementSystem, to: MeasurementSystem): number {
  if (from === to) return value;
  return from === "imperial" ? value * LITRES_PER_FT3 : value / LITRES_PER_FT3;
}

/** Convert a price-per-volume number while preserving the same total material price. */
export function convertUnitPrice(value: number, from: MeasurementSystem, to: MeasurementSystem): number {
  if (from === to) return value;
  return from === "imperial" ? value / M3_PER_YD3 : value * M3_PER_YD3;
}
