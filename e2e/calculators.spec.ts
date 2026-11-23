import { test, expect } from '@playwright/test';

const calculators = [
  { slug: 'topsoil-calculator', name: 'Topsoil Calculator', defaultQty: '1' },
  { slug: 'mulch-calculator', name: 'Mulch Calculator', defaultQty: '1' },
  { slug: 'concrete-calculator', name: 'Concrete Calculator', defaultQty: '1' },
  { slug: 'gravel-driveway-calculator', name: 'Gravel Driveway Calculator', defaultQty: '1' },
  { slug: 'raised-bed-soil-calculator', name: 'Raised Bed Soil Calculator', defaultQty: '2' },
  { slug: 'paver-base-calculator', name: 'Paver Base Calculator', defaultQty: '1' },
  { slug: 'cubic-yard-calculator', name: 'Cubic Yard Calculator', defaultQty: '1' },
  { slug: 'pea-gravel-calculator', name: 'Pea Gravel Calculator', defaultQty: '1' },
  { slug: 'crushed-stone-calculator', name: 'Crushed Stone Calculator', defaultQty: '1' },
  { slug: 'sand-calculator', name: 'Sand Calculator', defaultQty: '1' },
  { slug: 'compost-calculator', name: 'Compost Calculator', defaultQty: '1' },
  { slug: 'soil-calculator', name: 'Soil Calculator', defaultQty: '1' },
];

for (const calc of calculators) {
  test.describe(`Calculator: ${calc.name} (/${calc.slug})`, () => {
    test('executes all 12 end-to-end verification scenarios', async ({ page }) => {
      // 1. Initial Rendering & Default Values
      await page.goto(`/${calc.slug}/`);
      await expect(page.locator('h1')).toContainText(calc.name);

      const lengthInput = page.locator('#field-length');
      const widthInput = page.locator('#field-width');
      const depthInput = page.locator('#field-material-depth');
      const qtyInput = page.locator('#field-matching-areas, #field-number-of-beds');
      const allowanceInput = page.locator('#field-allowance-percent');
      const primaryResult = page.locator('.primary-result strong');
      const primaryUnit = page.locator('.primary-result span');

      await expect(lengthInput).toHaveValue('20');
      await expect(widthInput).toHaveValue('15');
      await expect(depthInput).toHaveValue('3');
      await expect(qtyInput).toHaveValue(calc.defaultQty);
      await expect(allowanceInput).toHaveValue('5');
      await expect(primaryUnit).toHaveText('cubic yards');

      const isRaisedBed = calc.slug === 'raised-bed-soil-calculator';
      const expectedInitialOrder = isRaisedBed ? '5.833' : '2.917';
      const expectedInitialBase = isRaisedBed ? '5.556 yd³' : '2.778 yd³';

      // 2. Normal Calculation Check
      await expect(primaryResult).toHaveText(expectedInitialOrder);
      await expect(page.locator('.result-line:has-text("Base volume") strong')).toHaveText(expectedInitialBase);

      // 3. Dimension and Depth Changes
      await lengthInput.fill('30');
      await depthInput.fill('4');
      // 30 x 15 x (4/12) / 27 = 5.556 yd^3; with 5% waste = 5.833 yd^3 (x2 for raised bed = 11.667)
      const expectedModifiedOrder = isRaisedBed ? '11.667' : '5.833';
      await expect(primaryResult).toHaveText(expectedModifiedOrder);

      // 4. Unit Switching (Imperial ↔ Metric) with Precision Preservation
      const metricToggle = page.locator('button:has-text("Metric")');
      const imperialToggle = page.locator('button:has-text("US / Imperial")');

      await metricToggle.click();
      await expect(primaryUnit).toHaveText('cubic metres');
      // 30 ft = 9.144 m
      await expect(lengthInput).toHaveValue('9.144');

      await imperialToggle.click();
      await expect(primaryUnit).toHaveText('cubic yards');
      // Full precision preserved back to 30.00 ft
      await expect(lengthInput).toHaveValue('30.00');
      await expect(primaryResult).toHaveText(expectedModifiedOrder);

      // 5. Shape-Specific Calculations (Circle and Triangle)
      // Return to baseline 20 x 15 x 3 for clean benchmark verification
      await lengthInput.fill('20');
      await depthInput.fill('3');

      // Circle shape
      const circleBtn = page.locator('.shape-picker button:has-text("Circle")');
      await circleBtn.click();
      const diameterInput = page.locator('#field-diameter');
      await expect(diameterInput).toBeVisible();
      await diameterInput.fill('20');
      await depthInput.fill('3');
      // Circle area: pi * 10^2 = 314.159... sq ft; 314.159 * 0.25 / 27 = 2.909 yd^3; with 5% waste: 3.054 (x2 for raised bed = 6.109)
      const expectedCircleOrder = isRaisedBed ? '6.109' : '3.054';
      await expect(primaryResult).toHaveText(expectedCircleOrder);

      // Triangle shape
      const triangleBtn = page.locator('.shape-picker button:has-text("Triangle")');
      await triangleBtn.click();
      const baseLengthInput = page.locator('#field-base-length');
      const perpHeightInput = page.locator('#field-perpendicular-height');
      await expect(baseLengthInput).toBeVisible();
      await expect(perpHeightInput).toBeVisible();
      await baseLengthInput.fill('20');
      await perpHeightInput.fill('15');
      // Triangle area: 20 * 15 / 2 = 150 sq ft; 150 * 0.25 / 27 = 1.389 yd^3; with 5% waste: 1.458 (x2 for raised bed = 2.917)
      const expectedTriangleOrder = isRaisedBed ? '2.917' : '1.458';
      await expect(primaryResult).toHaveText(expectedTriangleOrder);

      // Return to Rectangle
      const rectBtn = page.locator('.shape-picker button:has-text("Rectangle")');
      await rectBtn.click();
      await expect(lengthInput).toBeVisible();

      // 6. Optional Allowance
      // Reset dimensions to 20 x 15 x 3
      await lengthInput.fill('20');
      await widthInput.fill('15');
      await depthInput.fill('3');
      await allowanceInput.fill('10');
      // 2.778 * 1.10 = 3.056 yd^3 (x2 for raised bed = 6.111)
      const expectedAllowanceOrder = isRaisedBed ? '6.111' : '3.056';
      await expect(primaryResult).toHaveText(expectedAllowanceOrder);

      // 7. Bag Estimates
      const advancedToggle = page.locator('.advanced-toggle');
      await advancedToggle.click();

      const bagInput = page.locator('#field-pack-volume');
      await expect(bagInput).toBeVisible();
      await bagInput.fill('2');
      // 3.0555... yd^3 * 27 / 2 = 41.25 -> 42 packages (x2 for raised bed = 83 packages)
      const expectedBags = isRaisedBed ? '83 packages' : '42 packages';
      await expect(page.locator('.purchase-result')).toContainText(expectedBags);

      // 8. Density and Weight
      const densityInput = page.locator('#field-bulk-density');
      const densityUnitSelect = page.locator('#density-unit-select');
      await densityInput.fill('2200');
      await densityUnitSelect.selectOption('lb-yd3');
      // Single bed: 3.0555... * 2200 = 6,722 lb (3.36 short tons, 3.00 long tons)
      // Raised bed (x2): 13,444 lb (6.72 short tons, 6.00 long tons)
      const expectedWeight = isRaisedBed ? '13,444 lb' : '6,722 lb';
      const expectedShortTons = isRaisedBed ? '6.72 US short tons' : '3.36 US short tons';
      const expectedLongTons = isRaisedBed ? '6.00 UK long tons' : '3.00 UK long tons';
      const weightRow = page.locator('.result-line:has-text("Estimated weight")');
      await expect(weightRow).toContainText(expectedWeight);
      await expect(weightRow).toContainText(expectedShortTons);
      await expect(weightRow).toContainText(expectedLongTons);

      // 9. Material Price and Delivery Cost
      const priceInput = page.locator('input#field-price-per-cubic-yard');
      const deliveryInput = page.locator('#field-delivery-fee');
      await priceInput.fill('40');
      await deliveryInput.fill('50');
      // Single bed: 3.0555... * 40 + 50 = $172.22
      // Raised bed: 6.1111... * 40 + 50 = $294.44
      const expectedCost = isRaisedBed ? '$294.44' : '$172.22';
      await expect(page.locator('.cost-result strong')).toHaveText(expectedCost);

      // 10. Invalid Input Handling
      await lengthInput.fill('');
      await expect(page.locator('.validation-message[role="alert"]')).toBeVisible();
      await expect(page.locator('.empty-result')).toBeVisible();

      await lengthInput.fill('20');
      await depthInput.fill('-1');
      await expect(page.locator('.validation-message[role="alert"]')).toBeVisible();

      await depthInput.fill('3');
      await allowanceInput.fill('105');
      await expect(page.locator('.validation-message[role="alert"]')).toBeVisible();

      // 11. Reset Functionality
      const resetBtn = page.locator('.reset-calculator');
      await resetBtn.click();
      await expect(lengthInput).toHaveValue('20');
      await expect(widthInput).toHaveValue('15');
      await expect(depthInput).toHaveValue('3');
      await expect(allowanceInput).toHaveValue('5');
      await expect(primaryResult).toHaveText(expectedInitialOrder);

      // 12. Mobile Layout & Zero Horizontal Overflow at 375px
      await page.setViewportSize({ width: 375, height: 667 });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= 375;
      });
      expect(overflow).toBe(true);
    });
  });
}
