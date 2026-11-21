"use client";

import { useMemo, useState } from "react";
import type { ToolDefinition } from "@/lib/tools";
import { calculateMaterial, convertDepth, convertLength, convertPackageVolume, convertUnitPrice, formatMoney, formatNumber, type AreaShape, type DensityUnit, type MeasurementSystem } from "@/lib/calculation";

type Currency = "USD" | "CAD" | "GBP" | "AUD" | "NZD" | "EUR";

const currencies: { code: Currency; label: string }[] = [
  { code: "USD", label: "USD — US dollar" },
  { code: "CAD", label: "CAD — Canadian dollar" },
  { code: "GBP", label: "GBP — British pound" },
  { code: "AUD", label: "AUD — Australian dollar" },
  { code: "NZD", label: "NZD — New Zealand dollar" },
  { code: "EUR", label: "EUR — Euro" },
];

function NumberField({ label, value, onChange, unit, min = 0.01, step = "any", hint, inputId }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  min?: number;
  step?: string;
  hint?: string;
  inputId?: string;
}) {
  const id = inputId ?? `field-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <span className="input-wrap">
        <input id={id} type="number" inputMode="decimal" min={min} step={step} value={value} onChange={(event) => onChange(event.target.value)} />
        {unit ? <span className="input-unit">{unit}</span> : null}
      </span>
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

export default function Calculator({ tool }: { tool: ToolDefinition }) {
  const [system, setSystem] = useState<MeasurementSystem>("imperial");
  const [shape, setShape] = useState<AreaShape>("rectangle");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("15");
  const [depth, setDepth] = useState("3");
  const [quantity, setQuantity] = useState(tool.slug === "raised-bed-soil-calculator" ? "2" : "1");
  const [waste, setWaste] = useState("5");
  const [bagSize, setBagSize] = useState("");
  const [density, setDensity] = useState("");
  const [densityUnit, setDensityUnit] = useState<DensityUnit>("kg-m3");
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState("0");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [copyState, setCopyState] = useState("Copy estimate");

  const parsed = {
    length: Number(length),
    width: Number(width),
    depth: Number(depth),
    quantity: Number(quantity),
    waste: Number(waste),
    bagSize: bagSize.trim() === "" ? 0 : Number(bagSize),
    density: density.trim() === "" ? null : Number(density),
    price: price.trim() === "" ? null : Number(price),
    delivery: delivery.trim() === "" ? 0 : Number(delivery),
  };

  const isValid = Number.isFinite(parsed.length) && parsed.length > 0
    && (shape === "circle" || (Number.isFinite(parsed.width) && parsed.width > 0))
    && Number.isFinite(parsed.depth) && parsed.depth > 0
    && Number.isInteger(parsed.quantity) && parsed.quantity >= 1 && parsed.quantity <= 1_000_000
    && Number.isFinite(parsed.waste) && parsed.waste >= 0 && parsed.waste <= 100
    && Number.isFinite(parsed.bagSize) && parsed.bagSize >= 0
    && (parsed.density === null || (Number.isFinite(parsed.density) && parsed.density > 0))
    && (parsed.price === null || (Number.isFinite(parsed.price) && parsed.price >= 0))
    && Number.isFinite(parsed.delivery) && parsed.delivery >= 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    try {
      return calculateMaterial({
        system,
        shape,
        length: parsed.length,
        width: shape === "circle" ? 1 : parsed.width,
        depth: parsed.depth,
        quantity: parsed.quantity,
        wastePercent: parsed.waste,
        bagSize: parsed.bagSize,
        density: parsed.density,
        densityUnit,
        pricePerVolume: parsed.price,
        deliveryFee: parsed.delivery,
      });
    } catch {
      return null;
    }
  // Keep dependencies explicit; all values are primitive input state.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [system, shape, length, width, depth, quantity, waste, bagSize, density, densityUnit, price, delivery, isValid]);

  function switchSystem(next: MeasurementSystem) {
    if (next === system) return;
    setLength(convertLength(Number(length), system, next).toFixed(next === "metric" ? 3 : 2));
    setWidth(convertLength(Number(width), system, next).toFixed(next === "metric" ? 3 : 2));
    setDepth(convertDepth(Number(depth), system, next).toFixed(2));
    if (bagSize.trim() !== "") setBagSize(convertPackageVolume(Number(bagSize), system, next).toFixed(next === "metric" ? 1 : 2));
    if (price.trim() !== "") setPrice(convertUnitPrice(Number(price), system, next).toFixed(2));
    setSystem(next);
  }

  function resetCalculator() {
    setSystem("imperial");
    setShape("rectangle");
    setLength("20");
    setWidth("15");
    setDepth("3");
    setQuantity(tool.slug === "raised-bed-soil-calculator" ? "2" : "1");
    setWaste("5");
    setBagSize("");
    setDensity("");
    setDensityUnit("kg-m3");
    setPrice("");
    setDelivery("0");
    setCurrency("USD");
    setShowAdvanced(false);
    setCopyState("Copy estimate");
  }

  const volumeLabel = system === "imperial" ? "cubic yards" : "cubic metres";
  const primaryVolume = result ? (system === "imperial" ? result.cubicYards : result.cubicMetres) : 0;
  const bagUnit = system === "imperial" ? "cu ft / bag" : "L / bag";
  const dimensionUnit = system === "imperial" ? "ft" : "m";
  const depthUnit = system === "imperial" ? "in" : "cm";
  const summary = result ? [
    `${tool.name} — YardMath project estimate`,
    `Area shape: ${shape}`,
    `Dimensions: ${length} ${dimensionUnit}${shape === "circle" ? " diameter" : ` × ${width} ${dimensionUnit}`} × ${depth} ${depthUnit}`,
    `Matching areas: ${quantity}`,
    `Extra-material allowance: ${waste}%`,
    `Base volume: ${formatNumber(result.baseCubicFeet / 27, 3)} yd³`,
    `Order volume: ${formatNumber(primaryVolume, 3)} ${volumeLabel}`,
    `Equivalent: ${formatNumber(result.cubicYards, 3)} yd³ · ${formatNumber(result.cubicMetres, 3)} m³ · ${formatNumber(result.cubicFeet, 2)} ft³ · ${formatNumber(result.litres, 0)} L`,
    result.bags !== null ? `Estimated bags: ${result.bags} × ${bagSize} ${system === "imperial" ? "cu ft" : "L"}` : "",
    result.weightKg !== null ? `Estimated weight: ${formatNumber(result.weightKg, 0)} kg (${formatNumber(result.weightMetricTonnes ?? 0, 2)} tonnes) / ${formatNumber(result.weightLb ?? 0, 0)} lb (${formatNumber(result.weightShortTons ?? 0, 2)} short tons) (based on ${density} ${densityUnit === "kg-m3" ? "kg/m³" : "lb/yd³"})` : "",
    result.materialCost !== null ? `Estimated material + delivery: ${formatMoney(result.totalCost ?? result.materialCost, currency)}` : "",
    "Planning estimate only. Confirm material specification, density, packaging and order quantity with your supplier.",
  ].filter(Boolean).join("\n") : "";

  async function copySummary() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopyState("Copied");
    } catch {
      setCopyState("Clipboard unavailable");
    }
  }

  function downloadSummary() {
    if (!summary) return;
    const file = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${tool.slug}-estimate.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="calculator-shell" aria-label={`${tool.name} form`}>
      <div className="calculator-panel">
        <div className="calc-panel-head">
          <div><span className="step-tag">01 / PROJECT DIMENSIONS</span><h2>Tell us about your space</h2><p>Enter the measurements you have. Results update as you edit.</p></div>
          <div className="unit-toggle" role="group" aria-label="Measurement system">
            <button type="button" className={system === "imperial" ? "active" : ""} aria-pressed={system === "imperial"} onClick={() => switchSystem("imperial")}>US / Imperial</button>
            <button type="button" className={system === "metric" ? "active" : ""} aria-pressed={system === "metric"} onClick={() => switchSystem("metric")}>Metric</button>
          </div>
        </div>

        <div className="shape-picker" role="group" aria-label="Area shape">
          <button type="button" className={shape === "rectangle" ? "shape-option selected" : "shape-option"} aria-pressed={shape === "rectangle"} onClick={() => setShape("rectangle")}><span className="shape-symbol rectangle-symbol" />Rectangle</button>
          <button type="button" className={shape === "circle" ? "shape-option selected" : "shape-option"} aria-pressed={shape === "circle"} onClick={() => setShape("circle")}><span className="shape-symbol circle-symbol" />Circle</button>
          <button type="button" className={shape === "triangle" ? "shape-option selected" : "shape-option"} aria-pressed={shape === "triangle"} onClick={() => setShape("triangle")}><span className="shape-symbol triangle-symbol" />Triangle</button>
        </div>

        <div className="form-grid">
          <NumberField label={shape === "circle" ? "Diameter" : shape === "triangle" ? "Base length" : "Length"} value={length} onChange={setLength} unit={dimensionUnit} />
          {shape !== "circle" ? <NumberField label={shape === "triangle" ? "Perpendicular height" : "Width"} value={width} onChange={setWidth} unit={dimensionUnit} /> : null}
          <NumberField label="Material depth" value={depth} onChange={setDepth} unit={depthUnit} hint="Use the specified finished layer depth." />
          <NumberField label={tool.slug === "raised-bed-soil-calculator" ? "Number of beds" : "Matching areas"} value={quantity} onChange={setQuantity} unit="count" min={1} step="1" hint="How many spaces share these dimensions?" />
        </div>

        <div className="allowance-row">
          <div><strong>Extra-material allowance</strong><span>An optional buffer for uneven areas or small measurement differences.</span></div>
          <label className="compact-number"><input aria-label="Extra-material allowance percentage" type="number" min="0" max="100" step="1" value={waste} onChange={(event) => setWaste(event.target.value)} /><span>%</span></label>
        </div>

        <button className="advanced-toggle" type="button" aria-expanded={showAdvanced} onClick={() => setShowAdvanced(!showAdvanced)}><span>{showAdvanced ? "−" : "+"}</span> Optional shopping details <small>Bag count, weight and cost</small></button>
        {showAdvanced ? (
          <div className="advanced-fields">
            <div className="form-grid">
              <NumberField label="Pack volume" value={bagSize} onChange={setBagSize} unit={bagUnit} min={0} hint="Enter the usable volume printed on the package." />
              <NumberField label="Bulk density" value={density} onChange={setDensity} unit={densityUnit === "kg-m3" ? "kg/m³" : "lb/yd³"} min={0.01} hint="Use the exact supplier density for a weight estimate." />
              <NumberField label={`Price per ${system === "imperial" ? "cubic yard" : "cubic metre"}`} value={price} onChange={setPrice} unit={currency} min={0} hint="Optional material price before delivery." />
              <NumberField label="Delivery fee" value={delivery} onChange={setDelivery} unit={currency} min={0} hint="Optional flat delivery charge." />
            </div>
            <div className="currency-row"><label htmlFor="density-unit-select">Density units</label><select id="density-unit-select" value={densityUnit} onChange={(event) => setDensityUnit(event.target.value as DensityUnit)}><option value="kg-m3">Kilograms per cubic metre</option><option value="lb-yd3">Pounds per cubic yard</option></select></div><div className="currency-row"><label htmlFor="currency-select">Display currency</label><select id="currency-select" value={currency} onChange={(event) => setCurrency(event.target.value as Currency)}>{currencies.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select></div>
            <p className="density-note">Weight is calculated only from the density and unit you enter. Material grade, particle size, moisture and compaction can change actual delivered weight.</p>
          </div>
        ) : null}

        {!isValid || !result ? <p className="validation-message" role="alert">Check your entries. Dimensions and depth must be positive; quantity must be a whole number; allowance must be 0–100%; optional values must be valid non-negative numbers.</p> : null}
        <button className="reset-calculator" type="button" onClick={resetCalculator}>↺ Reset calculator</button>
      </div>

      <aside className="results-panel" aria-live="polite" aria-atomic="true">
        <div className="results-topline"><span className="step-tag">02 / YOUR ESTIMATE</span><span className="live-dot">LIVE CALCULATION</span></div>
        <p className="result-intro">Estimated material volume</p>
        {result ? <>
          <div className="primary-result"><strong>{formatNumber(primaryVolume, 3)}</strong><span>{volumeLabel}</span></div>
          <div className="result-equivalents"><span>{formatNumber(result.cubicMetres, 3)} m³</span><i /> <span>{formatNumber(result.cubicFeet, 2)} ft³</span><i /> <span>{formatNumber(result.litres, 0)} L</span></div>
          <div className="result-divider" />
          <div className="result-line"><span>Base volume</span><strong>{formatNumber(system === "imperial" ? result.baseCubicFeet / 27 : result.baseCubicFeet / 35.3146667215, 3)} {system === "imperial" ? "yd³" : "m³"}</strong></div>
          <div className="result-line"><span>Extra allowance</span><strong>{formatNumber(system === "imperial" ? result.allowanceCubicYards : result.allowanceCubicYards * 0.764554857984, 3)} {system === "imperial" ? "yd³" : "m³"}</strong></div>
          <div className="result-line"><span>Area covered</span><strong>{formatNumber(result.area, 2)} {system === "imperial" ? "ft²" : "m²"}</strong></div>
          {result.bags !== null ? <div className="purchase-result"><div className="purchase-icon">▧</div><div><span>Estimated packages to buy</span><strong>{result.bags} {result.bags === 1 ? "package" : "packages"}</strong><small>Based on {bagSize} {system === "imperial" ? "cu ft" : "L"} per package</small></div></div> : <button className="add-cost-link" type="button" onClick={() => setShowAdvanced(true)}>＋ Enter package volume to estimate bag count</button>}
          {result.weightKg !== null ? <div className="result-line"><span>Estimated weight</span><strong>{system === "imperial" ? `${formatNumber(result.weightLb ?? 0, 0)} lb (${formatNumber(result.weightShortTons ?? 0, 2)} short tons) · ${formatNumber(result.weightKg, 0)} kg` : `${formatNumber(result.weightKg, 0)} kg (${formatNumber(result.weightMetricTonnes ?? 0, 2)} tonnes) · ${formatNumber(result.weightLb ?? 0, 0)} lb`}</strong></div> : null}
          {result.materialCost !== null ? <div className="cost-result"><div><span>Estimated material + delivery</span><strong>{formatMoney(result.totalCost ?? result.materialCost, currency)}</strong></div><small>Based on your entered unit price and delivery fee.</small></div> : <button className="add-cost-link" type="button" onClick={() => setShowAdvanced(true)}>＋ Add a material price to estimate cost</button>}
          <div className="result-actions"><button type="button" onClick={copySummary}>↗ {copyState}</button><button type="button" onClick={downloadSummary}>↓ Download</button><button type="button" onClick={() => window.print()}>⎙ Print</button></div>
        </> : <div className="empty-result"><div className="empty-result-icon">∑</div><strong>Check your dimensions</strong><p>Enter valid measurements to see your volume and shopping estimate.</p></div>}
        <div className="result-caveat"><span>i</span><p>Planning estimate, not a supplier quote. The result does not infer compaction, density or material-specific installation requirements.</p></div>
      </aside>
    </section>
  );
}
