export type ToolSlug =
  | "topsoil-calculator"
  | "cubic-yard-calculator"
  | "pea-gravel-calculator"
  | "mulch-calculator"
  | "soil-calculator"
  | "raised-bed-soil-calculator"
  | "compost-calculator"
  | "sand-calculator"
  | "paver-base-calculator"
  | "gravel-driveway-calculator"
  | "concrete-calculator"
  | "crushed-stone-calculator";

export type ToolCategory = "Soil & garden" | "Stone & aggregate" | "Project volume" | "Construction";

export type ToolDefinition = {
  slug: ToolSlug;
  name: string;
  shortName: string;
  eyebrow: string;
  category: ToolCategory;
  metaTitle: string;
  metaDescription: string;
  description: string;
  cardDescription: string;
  icon: string;
  material: string;
  bestFor: string[];
  formula: string;
  howTo: string[];
  
  // Phase 4: AEO Answer-first block & Quick reference table
  quickAnswer: {
    directAnswer: string;
    ruleOfThumb: string;
    tableCaption: string;
    benchmarkTable: {
      depth: string;
      coverageSqFt: string;
      coverageSqM: string;
      typicalUse: string;
    }[];
  };

  // Phase 3 & 5: Formula & dimensional mathematics explanation
  formulaExplanation: {
    usCustomary: string;
    metric: string;
    dimensionalExplanation: string;
    circleNote: string;
    triangleNote: string;
  };

  // Phase 3: Independently checked numerical worked example
  workedExample: {
    title: string;
    scenario: string;
    dimensions: string;
    steps: { label: string; formula: string; result: string; explanation: string }[];
    finalSummary: string;
  };

  // Phase 3: Measurement inputs guide
  inputsGuide: {
    lengthWidth: string;
    depthGuidance: string;
    allowanceRecommendation: string;
    packagingGuidance: string;
  };

  // Phase 3: Material-specific assumptions and physical limitations
  materialSpecifics: {
    compactionBehavior: string;
    moistureAndWeight: string;
    subgradePreparation: string;
    orderingRule: string;
  };

  // Phase 3: Typical user mistakes
  commonMistakes: {
    mistake: string;
    impact: string;
    prevention: string;
  }[];

  // Phase 3: Authoritative source citations
  authoritativeSources: {
    organization: string;
    standardOrDocument: string;
    citation: string;
    url: string;
  }[];

  // Phase 3: Genuinely distinct, high-value FAQs
  faqs: { question: string; answer: string }[];

  // Phase 3 & 6: Internal link targets
  relatedGuides: { slug: string; title: string }[];
};

export const tools: ToolDefinition[] = [
  {
    slug: "topsoil-calculator",
    name: "Topsoil Calculator",
    shortName: "Topsoil",
    eyebrow: "GARDEN & LAWN RENOVATION",
    category: "Soil & garden",
    metaTitle: "Topsoil Calculator | Estimate Cubic Yards, Bags & Weight",
    metaDescription: "Calculate topsoil volume for lawns, garden beds, and grading. Free calculator converts square feet and depth into cubic yards, metric tonnes, and bags.",
    description: "Calculate how much topsoil your lawn, garden bed or landscaping project needs. Estimate cubic yards, cubic metres, bag quantities, supplier-based weight and a project cost using your own measurements.",
    cardDescription: "Estimate topsoil volume, bags and project cost from your area and depth.",
    icon: "◒",
    material: "Topsoil",
    bestFor: ["Adding a fresh layer to a lawn", "Filling garden beds", "Levelling low areas before seeding"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. For metric: Area (m²) × Depth (cm) ÷ 100 = Cubic Metres.",
    howTo: [
      "Measure the length and width of your area in feet (or diameter for circular garden islands).",
      "Enter the intended finished topsoil depth in inches (e.g. 4 inches for turf establishment; 0.25 inches for top-dressing).",
      "Select an allowance (5% for bordered beds, 10–15% for rough ground) to account for grade variation and settling.",
      "Enter optional bag volume (e.g. 0.75 or 1.0 cu ft) or supplier density (typically 2,000 to 2,400 lb/yd³) for bag and weight totals."
    ],
    quickAnswer: {
      directAnswer: "To find topsoil volume: multiply your area in square feet by the desired depth in inches, then divide by 324 to get cubic yards. One cubic yard of topsoil covers 324 square feet at 1 inch deep, 162 square feet at 2 inches, and 81 square feet at 4 inches.",
      ruleOfThumb: "A 4-inch layer of topsoil over 1,000 sq ft requires approximately 12.35 cubic yards (or 14.2 cubic yards with a 15% settling allowance).",
      tableCaption: "Topsoil Coverage Benchmarks per Cubic Yard (27 cu ft)",
      benchmarkTable: [
        { depth: "0.25 inch (6 mm)", coverageSqFt: "1,296 sq ft", coverageSqM: "120.4 m²", typicalUse: "Lawn aeration top-dressing & overseeding" },
        { depth: "0.50 inch (12 mm)", coverageSqFt: "648 sq ft", coverageSqM: "60.2 m²", typicalUse: "Minor hollow levelling on established grass" },
        { depth: "2.0 inches (5 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "Light garden bed enrichment" },
        { depth: "4.0 inches (10 cm)", coverageSqFt: "81 sq ft", coverageSqM: "7.5 m²", typicalUse: "New lawn seeding and sod root zone" },
        { depth: "6.0 inches (15 cm)", coverageSqFt: "54 sq ft", coverageSqM: "5.0 m²", typicalUse: "Deep perennial borders & shrub plantings" },
        { depth: "8.0 inches (20 cm)", coverageSqFt: "40.5 sq ft", coverageSqM: "3.8 m²", typicalUse: "Intensive vegetable cultivation beds" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "1 cubic yard equals 27 cubic feet. Since 1 foot equals 12 inches, 1 cubic yard covers 27 × 12 = 324 square feet at a depth of exactly 1 inch. Dividing total inch-square-feet by 324 gives the true cubic yard volume.",
      circleNote: "For circular areas, calculate area as π × (diameter ÷ 2)² before multiplying by depth.",
      triangleNote: "For triangular beds, calculate area as (base × perpendicular height) ÷ 2."
    },
    workedExample: {
      title: "Lawn Renovation Worked Example",
      scenario: "A homeowner is preparing a 20 ft × 15 ft lawn area with 3 inches of screened topsoil and a 10% allowance, using 2 cu ft retail bags.",
      dimensions: "20 ft length × 15 ft width × 3 in depth, 10% allowance",
      steps: [
        { label: "1. Surface Area", formula: "20 ft × 15 ft", result: "300 sq ft", explanation: "Calculates the flat horizontal plan area." },
        { label: "2. Base Geometric Volume", formula: "300 sq ft × 3 in ÷ 324", result: "2.778 yd³", explanation: "Translates area and depth into base volume before settling." },
        { label: "3. Post-Allowance Order Volume", formula: "2.778 yd³ × 1.10", result: "3.056 yd³", explanation: "Applies a 10% buffer for soil consolidation and grading." },
        { label: "4. Equivalent Cubic Feet", formula: "3.056 yd³ × 27 cu ft/yd³", result: "82.5 cu ft", explanation: "Converts cubic yards to cubic feet for bag calculations." },
        { label: "5. Bag Count (2 cu ft bags)", formula: "82.5 cu ft ÷ 2 cu ft/bag", result: "42 packages", explanation: "41.25 bags rounded up to the nearest whole package." }
      ],
      finalSummary: "Order 3.1 cubic yards in bulk or 42 bags (2 cu ft each) to achieve a finished 3-inch topsoil layer."
    },
    inputsGuide: {
      lengthWidth: "Measure the longest boundary lines using a tape measure. For irregularly curved beds, split the area into separate rectangles and triangles.",
      depthGuidance: "Specify the intended settled depth. Established turfgrass cannot survive topsoil layers deeper than 0.5 inches in a single application.",
      allowanceRecommendation: "Apply 5% for framed borders; apply 10% to 15% for new lawn grading over uneven subgrades.",
      packagingGuidance: "Enter the volume stated on the bag label (typically 0.75 or 1.0 cu ft in retail centers, or 2 cu ft for premium mixes)."
    },
    materialSpecifics: {
      compactionBehavior: "Screened topsoil contains air pore spaces from processing. Once placed, raked, and watered, it naturally settles by 15% to 20%.",
      moistureAndWeight: "Dry screened loam weighs ~2,000 to 2,200 lb/yd³ (1,200 kg/m³). Saturated topsoil can exceed 2,700 lb/yd³ (1,600 kg/m³).",
      subgradePreparation: "Rototill or core-aerate the existing subsoil to a depth of 2 inches before spreading topsoil to prevent interface shearing.",
      orderingRule: "For volumes exceeding 2 to 3 cubic yards, bulk truck delivery is significantly more economical than retail bags."
    },
    commonMistakes: [
      {
        mistake: "Smothering established grass with deep top-dressing",
        impact: "Applying over 1/2 inch of topsoil over an existing lawn cuts off sunlight and oxygen, killing the turfgrass crowns.",
        prevention: "Limit top-dressing applications to 1/4 inch per pass. For major grade changes, strip the old sod first."
      },
      {
        mistake: "Ignoring initial post-watering soil settling",
        impact: "Soil finishes below adjoining sidewalk and patio edges, creating water collection traps and tripping hazards.",
        prevention: "Crown or grade topsoil 0.5 to 1.0 inch above surrounding hardscapes to allow for natural consolidation."
      },
      {
        mistake: "Ordering topsoil by weight instead of volume after heavy rain",
        impact: "Wet soil contains heavy water weight. Buying by the ton during rainy periods delivers substantially less actual soil volume.",
        prevention: "Always specify your order in cubic yards or cubic metres rather than weight tonnage."
      }
    ],
    authoritativeSources: [
      { organization: "Cornell Cooperative Extension", standardOrDocument: "Lawn Care Guidelines: Topdressing and Soil Health", citation: "Cornell University College of Agriculture and Life Sciences.", url: "https://cals.cornell.edu/turfgrass" },
      { organization: "Penn State Extension", standardOrDocument: "Agronomy Facts 62: Soil Amendments and Turfgrass Establishment", citation: "Pennsylvania State University.", url: "https://extension.psu.edu/soil-management-in-turf-establishment" }
    ],
    faqs: [
      { question: "How much topsoil do I need for a 1,000 sq ft lawn?", answer: "At a standard 4-inch depth for new seeding or sod, 1,000 sq ft requires 12.35 cubic yards. With a 10% allowance for settling, order 13.6 cubic yards." },
      { question: "How much does a cubic yard of topsoil weigh?", answer: "Screened dry topsoil typically weighs between 2,000 and 2,200 lbs (approx. 1 to 1.1 short tons). Wet topsoil can exceed 2,600 to 2,800 lbs per cubic yard." },
      { question: "How many bags of topsoil are in a cubic yard?", answer: "Because 1 cubic yard equals 27 cubic feet, it requires 27 one-cubic-foot bags, 36 bags of 0.75 cu ft, or 13.5 bags of 2 cu ft." },
      { question: "Can I use topsoil in raised garden beds?", answer: "Field topsoil compacts too densely inside raised beds. For raised containers, blend 50% topsoil with 30% organic compost and 20% coarse aeration material like perlite or vermiculite." }
    ],
    relatedGuides: [
      { slug: "how-much-topsoil-do-i-need", title: "How Much Topsoil Do I Need? Complete Depth Guide" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Conversion Math" },
      { slug: "how-to-measure-landscaping-materials", title: "How to Measure a Landscaping Area" }
    ]
  },
  {
    slug: "cubic-yard-calculator",
    name: "Cubic Yard Calculator",
    shortName: "Cubic yards",
    eyebrow: "UNIVERSAL BULK VOLUME CONVERTER",
    category: "Project volume",
    metaTitle: "Cubic Yard Calculator | Convert Feet & Inches to Yards",
    metaDescription: "Calculate cubic yards from length, width, and depth. Free calculator converts feet, inches, metres, and centimetres into cubic yards, cubic feet, and cubic metres.",
    description: "Calculate cubic yards from length, width and depth. Convert project dimensions into cubic feet, cubic metres and litres for soil, gravel, mulch, sand, concrete and other bulk materials.",
    cardDescription: "Convert project dimensions into cubic yards and other useful volume units.",
    icon: "▦",
    material: "Bulk material",
    bestFor: ["Ordering bulk landscaping materials", "Estimating excavation volume", "Comparing supplier quantities"],
    formula: "For feet and inches: Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. For metric: Length (m) × Width (m) × Depth (cm) ÷ 100 = Cubic Metres.",
    howTo: [
      "Select your area shape (Rectangle, Circle, or Triangle).",
      "Enter your boundary dimensions in feet (or metres) and your layer depth in inches (or centimetres).",
      "Toggle between US / Imperial and Metric units at any time; your measurements convert automatically.",
      "Review the live result in cubic yards, cubic metres, cubic feet, and litres."
    ],
    quickAnswer: {
      directAnswer: "A cubic yard is a volumetric cube measuring 3 feet on each side, equal to 27 cubic feet. To calculate cubic yards from dimensions: multiply length (ft) by width (ft) by depth (in) and divide by 324.",
      ruleOfThumb: "1 cubic yard covers 324 sq ft at 1 inch deep, 108 sq ft at 3 inches deep, and 81 sq ft at 4 inches deep.",
      tableCaption: "Cubic Yard Coverage Matrix across Common Depths",
      benchmarkTable: [
        { depth: "1.0 inch (2.54 cm)", coverageSqFt: "324 sq ft", coverageSqM: "30.1 m²", typicalUse: "Fine seedbed mulch, sand bedding" },
        { depth: "2.0 inches (5.08 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "Mulch refresh, pathway gravel" },
        { depth: "3.0 inches (7.62 cm)", coverageSqFt: "108 sq ft", coverageSqM: "10.0 m²", typicalUse: "New garden mulch, pea stone patio" },
        { depth: "4.0 inches (10.16 cm)", coverageSqFt: "81 sq ft", coverageSqM: "7.5 m²", typicalUse: "Concrete sidewalk slab, paver base aggregate" },
        { depth: "6.0 inches (15.24 cm)", coverageSqFt: "54 sq ft", coverageSqM: "5.0 m²", typicalUse: "Driveway gravel base, turf subsoil layer" },
        { depth: "12.0 inches (30.48 cm)", coverageSqFt: "27 sq ft", coverageSqM: "2.5 m²", typicalUse: "Timber raised planter box, deep footing" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Length (ft) × Width (ft) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Length (m) × Width (m) × Depth (cm) ÷ 100",
      dimensionalExplanation: "Volume = Length (ft) × Width (ft) × [Depth (in) ÷ 12 ft/in] = Total Cubic Feet. Dividing Cubic Feet by 27 cu ft/yd³ yields: [L × W × D] ÷ (12 × 27) = [L × W × D] ÷ 324.",
      circleNote: "For circular areas: Area = π × (Diameter ÷ 2)². Then: Area (ft²) × Depth (in) ÷ 324 = Cubic Yards.",
      triangleNote: "For triangular areas: Area = (Base × Height) ÷ 2. Then: Area (ft²) × Depth (in) ÷ 324 = Cubic Yards."
    },
    workedExample: {
      title: "Excavation and Backfill Worked Example",
      scenario: "Estimating backfill volume for a rectangular trench 30 feet long, 4 feet wide, and 18 inches deep with a 5% allowance.",
      dimensions: "30 ft × 4 ft × 18 in depth, 5% allowance",
      steps: [
        { label: "1. Area", formula: "30 ft × 4 ft", result: "120 sq ft", explanation: "Plan view area of the trench excavation." },
        { label: "2. Base Cubic Yards", formula: "120 sq ft × 18 in ÷ 324", result: "6.667 yd³", explanation: "Raw geometric displacement volume." },
        { label: "3. Allowance Addition", formula: "6.667 yd³ × 1.05", result: "7.000 yd³", explanation: "Adds 5% for irregular trench side sloughing." },
        { label: "4. Equivalent Cubic Feet", formula: "7.0 yd³ × 27", result: "189 cu ft", explanation: "Converts to total cubic feet." },
        { label: "5. Equivalent Metric Volume", formula: "7.0 yd³ × 0.764555", result: "5.352 m³", explanation: "Calculates equivalent volume in cubic metres." }
      ],
      finalSummary: "Total required backfill is exactly 7.0 cubic yards (189 cu ft or 5.35 m³)."
    },
    inputsGuide: {
      lengthWidth: "Enter ground dimensions in linear feet. For circular features, enter the full diameter across the widest midpoint.",
      depthGuidance: "Enter depth in inches. Do not enter feet into the depth field.",
      allowanceRecommendation: "Use 0% for exact geometric formwork; use 5% to 10% for rough earth excavations.",
      packagingGuidance: "Enter unit costs per cubic yard or cubic metre to calculate total material budgets."
    },
    materialSpecifics: {
      compactionBehavior: "A cubic yard is a fixed unit of geometric volume (27 cu ft). It does not adjust automatically for soil compaction or loose material consolidation.",
      moistureAndWeight: "The weight of one cubic yard varies dramatically by material: wood mulch is ~500 lbs, dry soil is ~2,100 lbs, crushed stone is ~2,700 lbs, and concrete is ~4,000 lbs.",
      subgradePreparation: "Excavated loose soil expands by 15% to 30% ('swell factor') upon being dug out of virgin ground.",
      orderingRule: "Check with your supplier whether their dump truck bed capacity matches your volume order."
    },
    commonMistakes: [
      {
        mistake: "Dividing by 3 or 9 instead of 27 to convert cubic feet",
        impact: "Calculates 3 to 9 times more material than needed, leading to massive overspending.",
        prevention: "Remember volume is 3-dimensional: 3 ft × 3 ft × 3 ft = 27 cubic feet per cubic yard."
      },
      {
        mistake: "Entering depth in feet instead of inches",
        impact: "Distorts calculation results by a factor of 12.",
        prevention: "Always verify that depth is entered in inches for imperial mode or centimetres for metric mode."
      },
      {
        mistake: "Confusing cubic yards with weight tons",
        impact: "Assuming 1 cubic yard equals 1 ton causes immediate aggregate shortages (crushed stone is ~1.4 tons/yd³).",
        prevention: "Use supplier bulk density to translate volume into weight."
      }
    ],
    authoritativeSources: [
      { organization: "National Institute of Standards and Technology (NIST)", standardOrDocument: "Handbook 44: Specifications and Tolerances for Measuring Devices", citation: "U.S. Department of Commerce.", url: "https://www.nist.gov/pml/owm/handbook-44-current-edition" },
      { organization: "Bureau of Reclamation", standardOrDocument: "Earth Manual: Earth Materials and Measurement Principles", citation: "U.S. Department of the Interior.", url: "https://www.usbr.gov/tsc/techreferences/mands/mands-pdfs/EarthManual-Part1.pdf" }
    ],
    faqs: [
      { question: "How many cubic feet are in a cubic yard?", answer: "There are exactly 27 cubic feet in one cubic yard (3 ft × 3 ft × 3 ft = 27 cu ft)." },
      { question: "How many wheelbarrow loads are in a cubic yard?", answer: "A standard contractor wheelbarrow holds 6 cubic feet of heaped material, meaning 1 cubic yard equals 4.5 wheelbarrow loads. A smaller homeowner wheelbarrow (3 cu ft) takes 9 loads." },
      { question: "How do I convert cubic yards to cubic metres?", answer: "Multiply cubic yards by 0.764555 to get cubic metres. To convert cubic metres to cubic yards, multiply by 1.30795." },
      { question: "How many square feet does 1 cubic yard cover at 2 inches deep?", answer: "One cubic yard covers exactly 162 square feet at a 2-inch thickness (324 ÷ 2 = 162)." }
    ],
    relatedGuides: [
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Complete Conversion Guide" },
      { slug: "how-to-calculate-material-weight-bulk-density", title: "How to Calculate Material Weight from Volume" },
      { slug: "how-to-measure-landscaping-materials", title: "How to Measure a Landscaping Area" }
    ]
  },
  {
    slug: "pea-gravel-calculator",
    name: "Pea Gravel Calculator",
    shortName: "Pea gravel",
    eyebrow: "DECORATIVE STONE & WALKWAYS",
    category: "Stone & aggregate",
    metaTitle: "Pea Gravel Calculator | Estimate Cubic Yards, Tons & Bags",
    metaDescription: "Calculate how much pea gravel you need for paths, patios, and gardens. Estimate bulk cubic yards, tons, and 50 lb bags from your length, width, and depth.",
    description: "Estimate pea gravel for paths, garden borders, play areas and decorative landscaping. Calculate bulk volume, bag quantities, supplier-density weight and an optional material budget.",
    cardDescription: "Estimate pea gravel for garden paths, borders and decorative areas.",
    icon: "◌",
    material: "Pea gravel",
    bestFor: ["Garden paths and borders", "Decorative landscape areas", "Ground cover around planting beds"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Weight (tons) = Cubic Yards × 1.35 to 1.45 tons/yd³.",
    howTo: [
      "Measure path or patio length and width in feet (or diameter for circular fire pit areas).",
      "Enter gravel depth (recommended 2.5 to 3 inches for paths; shallower depths expose base dirt; deeper depths cause foot sinking).",
      "Add a 5% to 10% allowance for edge retention spillage and ground undulations.",
      "Enter your supplier's density (default ~2,700 lb/yd³) to estimate total weight in tons."
    ],
    quickAnswer: {
      directAnswer: "For pathways and decorative patios, pea gravel is installed at a finished depth of 2.5 to 3 inches. Multiply your area in square feet by depth in inches and divide by 324 to find cubic yards. One cubic yard covers 108 square feet at 3 inches deep and weighs approximately 2,700 lbs (1.35 short tons).",
      ruleOfThumb: "A 50-foot walkway that is 3 feet wide (150 sq ft) at 3 inches depth requires 1.39 cubic yards of pea gravel (approx. 1.9 tons or 75 fifty-pound bags).",
      tableCaption: "Pea Gravel Coverage & Weight per Cubic Yard",
      benchmarkTable: [
        { depth: "1.5 inches (3.8 cm)", coverageSqFt: "216 sq ft", coverageSqM: "20.1 m²", typicalUse: "Decorative mulch top-dress around pots" },
        { depth: "2.0 inches (5.0 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "Light foot-traffic garden borders" },
        { depth: "2.5 inches (6.4 cm)", coverageSqFt: "129.6 sq ft", coverageSqM: "12.0 m²", typicalUse: "Optimal residential pedestrian walkway" },
        { depth: "3.0 inches (7.6 cm)", coverageSqFt: "108 sq ft", coverageSqM: "10.0 m²", typicalUse: "Heavy foot-traffic path & fire-pit patio" },
        { depth: "4.0 inches (10.2 cm)", coverageSqFt: "81 sq ft", coverageSqM: "7.5 m²", typicalUse: "Perimeter foundation drip edge & drainage trenches" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "Pea gravel calculation determines bulk geometric space. Weight is computed as: Weight (lbs) = Cubic Yards × Bulk Density (typically 2,600 to 2,800 lb/yd³).",
      circleNote: "For round patios or circular seating areas: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For wedge-shaped garden corners: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: "Garden Walkway Worked Example",
      scenario: "Installing a 40 ft long, 3 ft wide curved garden path at 3 inches depth with an 8% allowance, using 50 lb bags.",
      dimensions: "40 ft × 3 ft × 3 in depth, 8% allowance",
      steps: [
        { label: "1. Plan Area", formula: "40 ft × 3 ft", result: "120 sq ft", explanation: "Surface area of the walkway." },
        { label: "2. Base Volume", formula: "120 sq ft × 3 in ÷ 324", result: "1.111 yd³", explanation: "Geometric cubic volume." },
        { label: "3. Post-Allowance Volume", formula: "1.111 yd³ × 1.08", result: "1.200 yd³", explanation: "Includes 8% for border settling and curves." },
        { label: "4. Total Weight (at 2,700 lb/yd³)", formula: "1.200 yd³ × 2,700 lb/yd³", result: "3,240 lbs", explanation: "Calculates total weight in pounds (1.62 short tons)." },
        { label: "5. 50 lb Bags", formula: "3,240 lbs ÷ 50 lb/bag", result: "65 bags", explanation: "64.8 bags rounded up to nearest bag." }
      ],
      finalSummary: "Order 1.2 cubic yards in bulk or 65 bags (50 lbs each) of washed pea gravel."
    },
    inputsGuide: {
      lengthWidth: "Measure the total length and average width. If borders curve, take width measurements every 10 feet and use the average.",
      depthGuidance: "Do not exceed 3 inches for walkways; rounded stones slide underfoot, and layers deeper than 3 inches feel like walking on dry beach sand.",
      allowanceRecommendation: "Add 5% for timber-edged paths; add 10% for natural stone or curved metal edging.",
      packagingGuidance: "Retail pea gravel is commonly packaged in 0.5 cu ft bags (approx. 45 to 50 lbs)."
    },
    materialSpecifics: {
      compactionBehavior: "Pea gravel consists of naturally rounded, water-worn pebbles (typically 3/8-inch / 10 mm). Because particles are round, they do not interlock and will not mechanically compact.",
      moistureAndWeight: "Dry pea gravel has a bulk density of roughly 95 to 105 lb/ft³ (2,560 to 2,835 lb/yd³). Saturated stone is heavier.",
      subgradePreparation: "Always excavate and compact a 2-to-3-inch sub-base of dense-graded crushed stone (#411 or road base) beneath pea gravel to prevent sinking into subsoil.",
      orderingRule: "Install permanent metal, poly, or timber edging to contain pea gravel laterally."
    },
    commonMistakes: [
      {
        mistake: "Pouring pea gravel too deep on pedestrian paths",
        impact: "Installing 4 to 6 inches of loose pea gravel causes foot sinking, difficulty pushing strollers or wheelbarrows, and unstable footing.",
        prevention: "Keep pea gravel surface layers strictly between 2.5 and 3.0 inches deep over a firm, compacted crushed stone sub-base."
      },
      {
        mistake: "Omitting a rigid edge restraint",
        impact: "Without solid borders, loose round pebbles migrate into surrounding grass, creating dangerous mower projectiles.",
        prevention: "Install steel, aluminum, or pressure-treated timber edging set 1/2 inch above the finished gravel surface."
      },
      {
        mistake: "Using pea gravel on vehicular driveways",
        impact: "Vehicle tires spin and rut in round gravel because the pebbles lack angular fracture faces to lock together.",
        prevention: "Use angular crushed stone (such as #57 limestone) for driveways rather than round pea gravel."
      }
    ],
    authoritativeSources: [
      { organization: "ASTM International", standardOrDocument: "ASTM C33 / C33M-23: Standard Specification for Concrete Aggregates (Coarse Aggregate Gradation)", citation: "West Conshohocken, PA.", url: "https://www.astm.org/c0033_c0033m-23.html" },
      { organization: "American Society of Landscape Architects (ASLA)", standardOrDocument: "Landscape Architecture Technical Information Series: Aggregate Surfacing", citation: "Washington, DC.", url: "https://www.asla.org/" }
    ],
    faqs: [
      { question: "How many bags of pea gravel are in a cubic yard?", answer: "One cubic yard weighs approximately 2,700 lbs. If using 50 lb bags, it takes 54 bags to equal one cubic yard (27 cubic feet)." },
      { question: "How deep should pea gravel be for a patio?", answer: "A depth of 2.5 to 3 inches is ideal over a 3-inch compacted crushed stone base. This depth provides complete coverage without feeling mushy under outdoor furniture." },
      { question: "Does pea gravel wash away in heavy rain?", answer: "Because pebbles are rounded and loose, water flowing across an uncontained surface can carry them away. Proper crown grading and a permeable crushed stone base prevent surface washouts." },
      { question: "Can I lay pea gravel directly on dirt?", answer: "No. Without a base layer and geotextile fabric, foot traffic pushes pea gravel down into the mud, and weeds quickly penetrate the surface." }
    ],
    relatedGuides: [
      { slug: "how-to-calculate-material-weight-bulk-density", title: "Calculating Material Weight from Bulk Density" },
      { slug: "gravel-driveway-material-estimation", title: "Driveway Gravel & Aggregate Cross-Sections" },
      { slug: "how-to-measure-landscaping-materials", title: "How to Measure a Landscaping Area" }
    ]
  },
  {
    slug: "mulch-calculator",
    name: "Mulch Calculator",
    shortName: "Mulch",
    eyebrow: "ORGANIC GROUND COVER & BEDS",
    category: "Soil & garden",
    metaTitle: "Mulch Calculator | Estimate Bags & Bulk Cubic Yards",
    metaDescription: "Calculate how much mulch you need for garden beds and tree rings. Free calculator converts square feet into cubic yards and 2 or 3 cu ft bags.",
    description: "Calculate how much mulch you need for garden beds, tree rings and landscape borders. Estimate bulk cubic yards, cubic metres, retail bags and an optional project budget.",
    cardDescription: "Work out mulch volume and how many bags to buy for your garden.",
    icon: "▤",
    material: "Mulch",
    bestFor: ["Garden beds and borders", "Tree rings", "Refreshing existing mulch"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. 2 cu ft Bags = Cubic Yards × 13.5. 3 cu ft Bags = Cubic Yards × 9.",
    howTo: [
      "Measure bed length and width in feet (use the circle option for circular tree rings).",
      "Enter mulch depth: 3 inches for new beds; 1 to 1.5 inches for annual maintenance top-ups.",
      "Add a 5% allowance for bed contouring and uneven edging.",
      "Review the bag count breakdown (13.5 bags of 2 cu ft or 9 bags of 3 cu ft per cubic yard)."
    ],
    quickAnswer: {
      directAnswer: "The optimal mulch depth for landscape beds is 2 to 3 inches. Multiply your area in square feet by depth in inches and divide by 324 to calculate cubic yards. One cubic yard covers 108 square feet at 3 inches deep and equals fourteen 2-cubic-foot bags or nine 3-cubic-foot bags.",
      ruleOfThumb: "A 300 sq ft garden bed at 3 inches depth requires 2.78 cubic yards of mulch (or 38 bags of 2 cu ft).",
      tableCaption: "Mulch Coverage Benchmarks by Depth",
      benchmarkTable: [
        { depth: "1.0 inch (2.5 cm)", coverageSqFt: "324 sq ft", coverageSqM: "30.1 m²", typicalUse: "Annual top-up over existing decomposed mulch" },
        { depth: "2.0 inches (5.0 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "Fine bark mulch; flower borders" },
        { depth: "3.0 inches (7.5 cm)", coverageSqFt: "108 sq ft", coverageSqM: "10.0 m²", typicalUse: "Standard weed suppression on new bare-soil beds" },
        { depth: "4.0 inches (10.0 cm)", coverageSqFt: "81 sq ft", coverageSqM: "7.5 m²", typicalUse: "Coarse wood chips; garden pathways" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "1 cubic yard is 27 cubic feet. A 2.0 cu ft retail bag holds 2/27 (7.4%) of a cubic yard. Therefore, 27 ÷ 2 = 13.5 bags per cubic yard.",
      circleNote: "For tree rings: Area = π × (Outer Diameter ÷ 2)² minus the unmulched trunk collar area.",
      triangleNote: "For corner beds: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: "Residential Shrub Bed Worked Example",
      scenario: "Mulching three front foundation beds totaling 450 sq ft with 3 inches of shredded hardwood mulch and a 5% allowance.",
      dimensions: "450 sq ft total area × 3 in depth, 5% allowance",
      steps: [
        { label: "1. Total Surface Area", formula: "450 sq ft", result: "450 sq ft", explanation: "Combined surface area of three beds." },
        { label: "2. Base Cubic Yards", formula: "450 sq ft × 3 in ÷ 324", result: "4.167 yd³", explanation: "Net volumetric requirement." },
        { label: "3. Order Volume with 5% Allowance", formula: "4.167 yd³ × 1.05", result: "4.375 yd³", explanation: "Accounts for uneven ground and bed edges." },
        { label: "4. Total Cubic Feet", formula: "4.375 yd³ × 27", result: "118.1 cu ft", explanation: "Conversion to cubic feet." },
        { label: "5. Retail 2 cu ft Bags", formula: "118.1 cu ft ÷ 2 cu ft/bag", result: "60 bags", explanation: "59.06 bags rounded up to 60." }
      ],
      finalSummary: "Order 4.5 cubic yards in bulk or 60 bags (2 cu ft each) of shredded hardwood mulch."
    },
    inputsGuide: {
      lengthWidth: "Measure the bed borders. For foundation beds with curved cutouts, break into sections or measure average width.",
      depthGuidance: "Do not exceed 3 to 4 inches; excessively thick mulch prevents water infiltration and encourages roots to grow upward.",
      allowanceRecommendation: "Use 5% for clean trenched beds; use 10% for rough beds with deep tree roots.",
      packagingGuidance: "Most retail hardwood and cedar mulches are 2.0 cu ft; large pine bark nuggets are frequently 3.0 cu ft."
    },
    materialSpecifics: {
      compactionBehavior: "Fresh shredded bark settles roughly 10% to 15% after rain. Wood mulch decomposes organically over 12 to 24 months, requiring periodic 1-inch refreshes.",
      moistureAndWeight: "Dry wood mulch weighs ~400 to 600 lb/yd³ (15 to 22 lb/cu ft). Saturated mulch can weigh 800 to 1,200 lb/yd³.",
      subgradePreparation: "Weed the bed thoroughly and edge deeply (2 to 3 inches) to form a trench that keeps mulch from spilling onto the lawn.",
      orderingRule: "Keep mulch 3 to 4 inches away from wooden house siding and foundation sills to prevent termite pathways."
    },
    commonMistakes: [
      {
        mistake: "Creating 'mulch volcanoes' around tree trunks",
        impact: "Piling mulch against the trunk keeps bark continuously moist, rotting the bark, inviting borers, and causing girdling roots that strangle the tree.",
        prevention: "Keep mulch 3 to 4 inches away from the tree root flare; mulch should resemble a flat donut, never a cone."
      },
      {
        mistake: "Applying fresh mulch over thick mats of old, crusted mulch",
        impact: "Creates a water-repellent (hydrophobic) barrier that sheds rain instead of letting it soak into plant roots.",
        prevention: "Rake and fluff existing mulch to break up crusts before adding a light 1-inch top-up."
      },
      {
        mistake: "Buying bags when bulk delivery is half the price",
        impact: "A 4-cubic-yard job requires 54 bags, costing $250+ in bags versus $140 bulk delivered.",
        prevention: "Switch to bulk ordering whenever your project requires more than 2 cubic yards (27 bags)."
      }
    ],
    authoritativeSources: [
      { organization: "International Society of Arboriculture (ISA)", standardOrDocument: "Proper Mulching Guidelines", citation: "TreesAreGood Educational Resources, Champaign, IL.", url: "https://www.treesaregood.org/treeowner/mulching" },
      { organization: "Purdue Extension", standardOrDocument: "Mulch Practices for Landscapes (FNR-492-W)", citation: "Purdue University Department of Forestry and Natural Resources.", url: "https://www.extension.purdue.edu/extmedia/FNR/FNR-492-W.pdf" }
    ],
    faqs: [
      { question: "How many bags of mulch equal 1 cubic yard?", answer: "One cubic yard (27 cu ft) equals exactly 13.5 bags of 2-cubic-foot mulch (practically 14 bags) or 9 bags of 3-cubic-foot mulch." },
      { question: "How thick should mulch be in a flower bed?", answer: "A 2 to 3 inch layer is optimal. This provides sufficient darkness to suppress weeds and seal in soil moisture without starving roots of oxygen." },
      { question: "Can mulch touch the foundation of my house?", answer: "No. Maintain a 6-inch buffer of bare soil or crushed gravel between mulch and wooden siding or foundation vents to prevent insect and termite intrusion." },
      { question: "Does dyed mulch harm garden plants or soil?", answer: "High-quality dyed mulches certified by the Mulch & Soil Council use non-toxic iron oxide (red) or carbon black (black) colorants that are safe for plants and soil microbes." }
    ],
    relatedGuides: [
      { slug: "how-much-mulch-do-i-need", title: "How Much Mulch Do I Need? Complete Depth Guide" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Conversion Math" },
      { slug: "how-to-measure-landscaping-materials", title: "How to Measure a Landscaping Area" }
    ]
  },
  {
    slug: "soil-calculator",
    name: "Soil Calculator",
    shortName: "Soil",
    eyebrow: "PLANTING SOIL & GARDEN BEDS",
    category: "Soil & garden",
    metaTitle: "Soil Calculator | Estimate Volume, Bags & Weight for Gardens",
    metaDescription: "Calculate garden soil volume in cubic yards, cubic metres, and bags. Free calculator supporting US and metric dimensions for flower beds, turf, and landscaping.",
    description: "Calculate soil volume for lawns, planting areas, garden projects and landscape beds. Switch between US customary and metric measurements and estimate packaging and cost from supplier details.",
    cardDescription: "A flexible soil volume calculator for garden and landscaping projects.",
    icon: "♧",
    material: "Soil",
    bestFor: ["Garden soil top-ups", "Planting areas", "General landscaping estimates"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Metric: Area (m²) × Depth (cm) ÷ 100 = Cubic Metres.",
    howTo: [
      "Select your space shape (Rectangle, Circle, or Triangle) and enter its plan dimensions.",
      "Enter the intended soil layer depth in inches (or cm).",
      "If you have multiple identical beds, enter the quantity multiplier.",
      "Review the volume in cubic yards, cubic metres, and equivalent bags."
    ],
    quickAnswer: {
      directAnswer: "Calculate garden soil volume by multiplying area in square feet by depth in inches, then dividing by 324 to get cubic yards. For metric, multiply area in square metres by depth in centimetres and divide by 100. One cubic yard covers 81 sq ft at 4 inches deep.",
      ruleOfThumb: "A standard 10 ft × 10 ft planting bed (100 sq ft) filled to 6 inches deep requires approximately 1.85 cubic yards of soil.",
      tableCaption: "Garden Soil Volume Benchmarks per 100 sq ft",
      benchmarkTable: [
        { depth: "2 inches (5 cm)", coverageSqFt: "0.62 yd³ (16.7 cu ft)", coverageSqM: "0.47 m³", typicalUse: "Surface top-dressing of perennial beds" },
        { depth: "4 inches (10 cm)", coverageSqFt: "1.23 yd³ (33.3 cu ft)", coverageSqM: "0.94 m³", typicalUse: "Lawn turf establishment root zone" },
        { depth: "6 inches (15 cm)", coverageSqFt: "1.85 yd³ (50.0 cu ft)", coverageSqM: "1.42 m³", typicalUse: "Standard flower and shrub border depth" },
        { depth: "8 inches (20 cm)", coverageSqFt: "2.47 yd³ (66.7 cu ft)", coverageSqM: "1.89 m³", typicalUse: "Deep vegetable beds & root crops" },
        { depth: "12 inches (30 cm)", coverageSqFt: "3.70 yd³ (100.0 cu ft)", coverageSqM: "2.83 m³", typicalUse: "Deep raised timber planters" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "The formula converts area in square feet and depth in inches into cubic volume by dividing by 324 (27 cu ft/yd³ × 12 in/ft).",
      circleNote: "For round planting mounds: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For corner beds: Area = (Base × Perpendicular Height) ÷ 2."
    },
    workedExample: {
      title: "Perennial Bed Preparation Worked Example",
      scenario: "Filling an 18 ft long by 6 ft wide perennial garden bed with 6 inches of enriched garden soil and a 10% settling allowance.",
      dimensions: "18 ft × 6 ft × 6 in depth, 10% allowance",
      steps: [
        { label: "1. Bed Area", formula: "18 ft × 6 ft", result: "108 sq ft", explanation: "Calculates the rectangular planting area." },
        { label: "2. Base Volume", formula: "108 sq ft × 6 in ÷ 324", result: "2.000 yd³", explanation: "Calculates net geometric volume." },
        { label: "3. Order Volume with 10% Allowance", formula: "2.000 yd³ × 1.10", result: "2.200 yd³", explanation: "Adds 10% for compaction and settling." },
        { label: "4. Total Cubic Feet", formula: "2.200 yd³ × 27", result: "59.4 cu ft", explanation: "Converts to total cubic feet." },
        { label: "5. 1.5 cu ft Bags", formula: "59.4 cu ft ÷ 1.5 cu ft/bag", result: "40 bags", explanation: "39.6 bags rounded up to 40." }
      ],
      finalSummary: "Order 2.2 cubic yards of garden soil in bulk or 40 bags (1.5 cu ft each)."
    },
    inputsGuide: {
      lengthWidth: "Measure the planting bed edges accurately. If the bed is terraced on a slope, measure the flat horizontal terrace run.",
      depthGuidance: "Enter the settled depth. For most annuals and perennials, 6 to 8 inches provides ample root development space.",
      allowanceRecommendation: "Add 10% for loose garden soil because organic matter consolidates when first saturated with water.",
      packagingGuidance: "Garden soil in retail bags is commonly sold in 1.0 or 1.5 cubic foot bags."
    },
    materialSpecifics: {
      compactionBehavior: "Enriched garden soil blends (topsoil + compost + peat) have higher porosity than field dirt and settle 10% to 15% after planting.",
      moistureAndWeight: "A blended garden soil weighs ~2,000 to 2,400 lb/yd³ (1,200 to 1,425 kg/m³) depending on compost and sand content.",
      subgradePreparation: "Loosen the existing native subsoil with a garden fork before adding fresh soil to encourage deep taproot penetration.",
      orderingRule: "Check whether your supplier's soil is weed-free screened loam or unamended raw fill dirt."
    },
    commonMistakes: [
      {
        mistake: "Filling planting beds with unscreened raw fill dirt",
        impact: "Fill dirt contains heavy subsoil clay, stones, and weed rhizomes that restrict root growth and drain poorly.",
        prevention: "Specify screened garden soil blended with 30% organic compost for planting applications."
      },
      {
        mistake: "Using pure potting mix in in-ground garden beds",
        impact: "Potting mix is too light, dries out quickly in the ground, and costs four times more than blended garden soil.",
        prevention: "Use in-ground garden soil for landscape beds; reserve lightweight potting mix for containers and planters."
      },
      {
        mistake: "Tamping garden soil down firmly with heavy rollers",
        impact: "Over-compacting wet soil crushes macro-pore spaces, suffocating beneficial microbes and causing water runoff.",
        prevention: "Rake soil gently into place and let gentle overhead irrigation settle the soil naturally."
      }
    ],
    authoritativeSources: [
      { organization: "USDA Natural Resources Conservation Service (NRCS)", standardOrDocument: "Soil Quality for Environmental Health: Organic Matter and Pore Space", citation: "United States Department of Agriculture.", url: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soil" },
      { organization: "University of Maryland Extension", standardOrDocument: "Improving Garden Soils with Organic Matter", citation: "Home and Garden Information Center Publication HG-42.", url: "https://extension.umd.edu/resource/soil-health-lawns-and-gardens" }
    ],
    faqs: [
      { question: "What is the difference between topsoil and garden soil?", answer: "Topsoil is screened natural surface soil (sand, silt, and clay). Garden soil is topsoil enriched with organic matter (compost, peat, or aged manure) formulated for vegetable and flower growth." },
      { question: "How many cubic yards of soil do I need for a 10x10 garden?", answer: "For a 100 sq ft garden at a standard 6-inch depth, you need 1.85 cubic yards. With a 10% settling allowance, order 2.0 cubic yards." },
      { question: "How many bags of soil are in a cubic yard?", answer: "A cubic yard contains 27 cubic feet. It requires 27 bags of 1.0 cu ft, 18 bags of 1.5 cu ft, or 13.5 bags of 2.0 cu ft." },
      { question: "Can I plant directly into 100% compost instead of garden soil?", answer: "Pure compost lacks the mineral silt and clay needed for structural root anchorage and can dry out or burn sensitive root hairs. A blend of 60% topsoil and 40% compost is ideal." }
    ],
    relatedGuides: [
      { slug: "how-much-topsoil-do-i-need", title: "Topsoil Needs & Application Depths" },
      { slug: "raised-bed-soil-volume", title: "Raised Bed Soil Volume and Mixes" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Guide" }
    ]
  },
  {
    slug: "raised-bed-soil-calculator",
    name: "Raised Bed Soil Calculator",
    shortName: "Raised beds",
    eyebrow: "VEGETABLE GARDENS & PLANTERS",
    category: "Soil & garden",
    metaTitle: "Raised Bed Soil Calculator | Calculate Soil for Planter Boxes",
    metaDescription: "Calculate soil volume for raised garden beds and planters. Enter inside length, width, and depth to get exact cubic yards, cubic feet, and bag counts.",
    description: "Estimate the soil and growing-medium volume for one or more raised garden beds. Use internal dimensions to calculate total fill volume, bag quantities and an optional cost estimate.",
    cardDescription: "Calculate the fill volume for raised beds, planters and vegetable gardens.",
    icon: "▱",
    material: "Raised-bed mix",
    bestFor: ["Vegetable garden beds", "Timber raised planters", "Repeated modular garden beds"],
    formula: "Inside Length (ft) × Inside Width (ft) × Depth (in) ÷ 324 × Number of Beds = Cubic Yards.",
    howTo: [
      "Measure the INSIDE length and width of your raised bed (deduct timber thickness).",
      "Enter the intended soil fill depth in inches (leave 1 to 2 inches of freeboard below the top rim).",
      "Enter the total number of identical beds.",
      "Review the total volume in cubic feet, cubic yards, and bags (e.g. 1.5 or 2.0 cu ft bags)."
    ],
    quickAnswer: {
      directAnswer: "Always measure the inside dimensions of your raised bed. Multiply interior length (ft) by interior width (ft) by fill depth (in) and divide by 324 to get cubic yards. Multiply cubic yards by 27 to find cubic feet.",
      ruleOfThumb: "A classic 4 ft × 8 ft raised bed (interior dimensions 3.75 ft × 7.75 ft) at 10 inches deep holds approximately 24.2 cubic feet of soil (0.90 cubic yards or twelve 2 cu ft bags).",
      tableCaption: "Raised Bed Soil Quantities by Common Bed Size",
      benchmarkTable: [
        { depth: "4x4 ft bed at 8 in depth", coverageSqFt: "14.2 sq ft", coverageSqM: "9.5 cu ft (0.35 yd³)", typicalUse: "Five 2-cu-ft bags (compact square foot bed)" },
        { depth: "4x4 ft bed at 12 in depth", coverageSqFt: "14.2 sq ft", coverageSqM: "14.2 cu ft (0.53 yd³)", typicalUse: "Seven 2-cu-ft bags (deep root vegetables)" },
        { depth: "4x8 ft bed at 8 in depth", coverageSqFt: "29.1 sq ft", coverageSqM: "19.4 cu ft (0.72 yd³)", typicalUse: "Ten 2-cu-ft bags (standard lettuce/greens bed)" },
        { depth: "4x8 ft bed at 10 in depth", coverageSqFt: "29.1 sq ft", coverageSqM: "24.2 cu ft (0.90 yd³)", typicalUse: "Twelve 2-cu-ft bags (ideal tomato/pepper depth)" },
        { depth: "4x8 ft bed at 12 in depth", coverageSqFt: "29.1 sq ft", coverageSqM: "29.1 cu ft (1.08 yd³)", typicalUse: "Fifteen 2-cu-ft bags (carrots & deep taproots)" },
        { depth: "3x6 ft bed at 10 in depth", coverageSqFt: "15.8 sq ft", coverageSqM: "13.2 cu ft (0.49 yd³)", typicalUse: "Seven 2-cu-ft bags (patio planter box)" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Inside Length (ft) × Inside Width (ft) × Soil Depth (in) ÷ 324 × Quantity",
      metric: "Cubic Metres = Inside Length (m) × Inside Width (m) × Soil Depth (cm) ÷ 100 × Quantity",
      dimensionalExplanation: "Using inside measurements prevents over-calculating the volume occupied by lumber framing. 1 cubic yard equals 27 cubic feet.",
      circleNote: "For round galvanized steel stock tanks: Area = π × (Inside Diameter ÷ 2)².",
      triangleNote: "For corner planters: Area = (Inside Base × Inside Height) ÷ 2."
    },
    workedExample: {
      title: "Twin Raised Bed Vegetable Garden Example",
      scenario: "Filling two identical 4 ft × 8 ft cedar raised beds (framed with 2x10 lumber, inside dimensions 3.75 ft × 7.75 ft) to a fill depth of 9 inches with 15% settling allowance.",
      dimensions: "Two beds: 3.75 ft × 7.75 ft × 9 in depth each, 15% allowance",
      steps: [
        { label: "1. Interior Area per Bed", formula: "3.75 ft × 7.75 ft", result: "29.063 sq ft", explanation: "True interior planting surface area." },
        { label: "2. Total Area (2 beds)", formula: "29.063 sq ft × 2", result: "58.125 sq ft", explanation: "Combined surface area for both beds." },
        { label: "3. Base Volume", formula: "58.125 sq ft × 9 in ÷ 324", result: "1.615 yd³", explanation: "Base geometric fill requirement (43.6 cu ft)." },
        { label: "4. Volume with 15% Settling Allowance", formula: "1.615 yd³ × 1.15", result: "1.857 yd³", explanation: "Accounts for organic compaction and fluffy soil settling." },
        { label: "5. Total Bags (2 cu ft bags)", formula: "(1.857 yd³ × 27) ÷ 2 cu ft/bag", result: "26 bags", explanation: "50.14 cu ft total ÷ 2 = 25.1 bags, rounded up to 26." }
      ],
      finalSummary: "Order 1.9 cubic yards of raised bed soil mix or 26 bags (2.0 cu ft each) for both beds."
    },
    inputsGuide: {
      lengthWidth: "Measure inside the wooden frame. 2-inch lumber is actually 1.5 inches thick, deducting 3 inches from both length and width.",
      depthGuidance: "Measure from the bottom to 1 or 2 inches below the top rim. Leaving freeboard prevents water and soil spillage when watering.",
      allowanceRecommendation: "Add 15% for organic raised bed mixtures (compost and peat compress significantly upon initial saturation).",
      packagingGuidance: "Raised bed soil mixes are most commonly sold in 1.5 or 2.0 cubic foot bags."
    },
    materialSpecifics: {
      compactionBehavior: "Specialty raised bed blends (such as Mel's Mix: 1/3 compost, 1/3 peat, 1/3 vermiculite) settle 15% to 20% in the first month.",
      moistureAndWeight: "Raised bed mix is lightweight (~900 to 1,200 lb/yd³), allowing for safe installation on elevated decks and patios.",
      subgradePreparation: "If placing over grass or weeds, line the bottom with non-printed brown cardboard or 1/4-inch hardware cloth to deter gophers.",
      orderingRule: "For beds deeper than 18 inches, fill the lower 8 to 12 inches with untreated logs and branches (hügelkultur method) to reduce soil costs."
    },
    commonMistakes: [
      {
        mistake: "Measuring outside frame dimensions",
        impact: "Framing lumber thickness accounts for 8% to 15% of bed footprint, leading to buying surplus soil bags.",
        prevention: "Always place the tape measure against the inside face of the lumber walls."
      },
      {
        mistake: "Filling beds with 100% backyard topsoil",
        impact: "Subsoil clay compacts into hard brick-like mud inside raised beds, choking vegetable roots.",
        prevention: "Use a dedicated raised bed blend of compost, topsoil, and aeration material (vermiculite or perlite)."
      },
      {
        mistake: "Filling to the very top rim of the boards",
        impact: "Soil and mulch wash over the sides during rain, creating mess and exposing root crowns.",
        prevention: "Stop filling 1.5 to 2 inches below the top rim of the framing timbers."
      }
    ],
    authoritativeSources: [
      { organization: "Oregon State University Extension Service", standardOrDocument: "Constructing and Filling Raised Bed Planters (EM 9183)", citation: "Corvallis, OR.", url: "https://extension.oregonstate.edu/gardening/techniques/raised-bed-gardening" },
      { organization: "University of Florida IFAS Extension", standardOrDocument: "Raised Bed Gardening: Soil Mixtures and Dimensions (CIR 1282)", citation: "Gainesville, FL.", url: "https://edis.ifas.ufl.edu/" }
    ],
    faqs: [
      { question: "How many bags of soil do I need for a 4x8 raised bed at 12 inches?", answer: "A 4×8 bed (inside dimensions 3.75 ft × 7.75 ft) at 12 inches deep holds 29.1 cubic feet of soil. Factoring in 15% settling, you need 33.5 cu ft, which equals seventeen 2-cubic-foot bags (or 1.25 cubic yards)." },
      { question: "What is the ideal soil blend for a vegetable raised bed?", answer: "The gold standard is 1/3 blended compost (for nutrients), 1/3 peat moss or coconut coir (for moisture retention), and 1/3 coarse vermiculite or perlite (for aeration and drainage)." },
      { question: "How deep should a raised bed be for vegetables?", answer: "Most vegetables (lettuce, greens, herbs) thrive in 8 to 10 inches of soil. Deep-rooted crops like tomatoes, peppers, and carrots perform best with 12 to 18 inches." },
      { question: "How do I fill a very deep (24-inch) raised bed cheaply?", answer: "Use the hügelkultur method: fill the bottom 10 to 12 inches with untreated tree logs, branches, and leaf mulch, then fill the top 12 inches with high-quality growing soil." }
    ],
    relatedGuides: [
      { slug: "raised-bed-soil-volume", title: "Raised Bed Soil Volume: Complete Mixing & Depth Guide" },
      { slug: "how-much-topsoil-do-i-need", title: "Topsoil Depth & Volume Standards" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Guide" }
    ]
  },
  {
    slug: "compost-calculator",
    name: "Compost Calculator",
    shortName: "Compost",
    eyebrow: "ORGANIC MATTER & SOIL AMENDMENTS",
    category: "Soil & garden",
    metaTitle: "Compost Calculator | Calculate Cubic Yards, Bags & Application Depth",
    metaDescription: "Calculate how much compost you need for garden beds and lawn top-dressing. Free calculator converts square footage and depth into cubic yards and bags.",
    description: "Estimate compost volume for garden beds, lawn top-dressing and soil-improvement projects. Calculate bulk quantities, bag counts and optional costs in US or metric units.",
    cardDescription: "Estimate compost volume for soil improvement and garden beds.",
    icon: "♻",
    material: "Compost",
    bestFor: ["Garden bed improvement", "Lawn top-dressing", "Blending growing media"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Metric: Area (m²) × Depth (cm) ÷ 100 = Cubic Metres.",
    howTo: [
      "Measure your application area in feet (or metres).",
      "Enter the recommended compost depth (1/4 to 1/2 inch for lawn top-dressing; 1 to 2 inches for garden soil incorporation).",
      "Add a 5% to 10% allowance for settling and raking unevenness.",
      "Review the total volume in cubic yards, cubic metres, or retail bags (typically 1.0 or 1.5 cu ft)."
    ],
    quickAnswer: {
      directAnswer: "Compost application depth depends on use: apply 1/4 to 1/2 inch for established lawn top-dressing, and 1 to 2 inches for tilling into in-ground garden beds. Multiply area in square feet by depth in inches and divide by 324 to get cubic yards. One cubic yard covers 324 sq ft at 1 inch deep.",
      ruleOfThumb: "A 500 sq ft vegetable garden amended with a standard 2-inch compost layer requires approximately 3.09 cubic yards (or 56 bags of 1.5 cu ft).",
      tableCaption: "Compost Application Depths & Coverage per Cubic Yard",
      benchmarkTable: [
        { depth: "0.25 inch (6 mm)", coverageSqFt: "1,296 sq ft", coverageSqM: "120.4 m²", typicalUse: "Lawn core aeration top-dressing" },
        { depth: "0.50 inch (12 mm)", coverageSqFt: "648 sq ft", coverageSqM: "60.2 m²", typicalUse: "Heavy lawn renovation & fall turf feeding" },
        { depth: "1.0 inch (2.5 cm)", coverageSqFt: "324 sq ft", coverageSqM: "30.1 m²", typicalUse: "Annual flower bed top-dressing" },
        { depth: "2.0 inches (5.0 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "Tilled into garden beds to break up clay" },
        { depth: "3.0 inches (7.5 cm)", coverageSqFt: "108 sq ft", coverageSqM: "10.0 m²", typicalUse: "Establishing new intensive vegetable plots" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "One cubic yard contains 27 cubic feet. Dividing Area (ft²) × Depth (in) by 324 converts the rectangular volume directly into cubic yards.",
      circleNote: "For circular beds: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For triangular beds: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: "Lawn Core Aeration Top-Dressing Example",
      scenario: "Top-dressing a 2,500 sq ft home lawn with a 1/4-inch layer of finely screened organic compost after core aeration, with a 5% allowance.",
      dimensions: "2,500 sq ft × 0.25 in depth, 5% allowance",
      steps: [
        { label: "1. Lawn Area", formula: "2,500 sq ft", result: "2,500 sq ft", explanation: "Total turfgrass area." },
        { label: "2. Base Cubic Yards", formula: "2,500 sq ft × 0.25 in ÷ 324", result: "1.929 yd³", explanation: "Geometric application requirement." },
        { label: "3. Volume with 5% Allowance", formula: "1.929 yd³ × 1.05", result: "2.025 yd³", explanation: "Compensates for aerator holes and uneven grass density." },
        { label: "4. Total Cubic Feet", formula: "2.025 yd³ × 27", result: "54.7 cu ft", explanation: "Converts to cubic feet." },
        { label: "5. Total 1.0 cu ft Bags", formula: "54.7 cu ft ÷ 1.0 cu ft/bag", result: "55 bags", explanation: "54.7 bags rounded up to 55." }
      ],
      finalSummary: "Order 2.0 cubic yards of screened compost in bulk or 55 bags (1.0 cu ft each)."
    },
    inputsGuide: {
      lengthWidth: "Measure the boundaries of the lawn or garden plot. For lawns, subtract driveway, patio, and building footprints.",
      depthGuidance: "Never apply more than 1/2 inch of compost over live grass in a single pass to avoid smothering green shoots.",
      allowanceRecommendation: "Add 5% for flat gardens; add 10% for aerated lawns because compost falls into aeration core holes.",
      packagingGuidance: "Quality bagged compost is commonly packed in 1.0 cu ft or 40 lb bags."
    },
    materialSpecifics: {
      compactionBehavior: "Compost is biologically active organic matter. Over a single growing season, soil organisms consume carbon, reducing compost volume by 20% to 30%.",
      moistureAndWeight: "Finished mature compost weighs ~1,000 to 1,400 lb/yd³ (600 to 830 kg/m³). Very wet compost can weigh up to 1,600 lb/yd³.",
      subgradePreparation: "For garden beds, spread compost evenly and incorporate it into the top 6 inches of soil using a spade or rototiller.",
      orderingRule: "Ensure your compost is certified 'weed-seed free' and fully cured (STA-certified through the US Composting Council)."
    },
    commonMistakes: [
      {
        mistake: "Using immature, hot compost directly around plant stems",
        impact: "Active unfinished compost produces ammonia gas and robs nitrogen from plant roots as it continues decomposing.",
        prevention: "Use dark, sweet-smelling, fully stabilized compost that has completed its thermophilic heating phase."
      },
      {
        mistake: "Applying too thick a layer over turfgrass",
        impact: "More than 1/2 inch of compost blocks sunlight from turf blades, creating yellowing, rot, and fungal outbreaks.",
        prevention: "Keep lawn top-dressing strictly between 1/8 and 1/4 inch; brush it into the canopy with the back of a garden rake."
      },
      {
        mistake: "Assuming compost provides all structural soil needs",
        impact: "Compost breaks down over time into carbon dioxide and water; beds filled with 100% compost will collapse in height.",
        prevention: "Blend compost with permanent mineral soil (topsoil) to maintain lasting bed structure."
      }
    ],
    authoritativeSources: [
      { organization: "US Composting Council (USCC)", standardOrDocument: "Seal of Testing Assurance (STA) Program: Consumer Application Rates", citation: "Raleigh, NC.", url: "https://www.compostingcouncil.org/page/CertifiedCompostSTA" },
      { organization: "Washington State University Extension", standardOrDocument: "How to Use Compost in Gardens and Landscapes (EB1784)", citation: "Pullman, WA.", url: "https://pubs.extension.wsu.edu/" }
    ],
    faqs: [
      { question: "How much compost do I need for a garden bed?", answer: "For annual maintenance, spread 1 to 2 inches across the bed and till or fork it into the top 6 inches of soil. A 100 sq ft bed at 2 inches deep requires 0.62 cubic yards (approx. 17 cubic feet)." },
      { question: "How many bags of compost are in a cubic yard?", answer: "One cubic yard equals 27 cubic feet. That equals 27 one-cubic-foot bags, 18 bags of 1.5 cu ft, or 13.5 bags of 2 cu ft." },
      { question: "How much does a cubic yard of compost weigh?", answer: "Mature compost typically weighs between 1,000 and 1,400 lbs per cubic yard, depending on moisture content. This is much lighter than topsoil (2,200 lbs) or gravel (2,700 lbs)." },
      { question: "Can I use compost as a mulch?", answer: "Yes. Coarser compost makes an excellent nutrient-rich mulch layer, though weed seeds may germinate in it more easily than in coarse wood bark." }
    ],
    relatedGuides: [
      { slug: "how-much-topsoil-do-i-need", title: "Topsoil Application & Soil Blends" },
      { slug: "raised-bed-soil-volume", title: "Raised Bed Soil and Compost Ratios" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Guide" }
    ]
  },
  {
    slug: "sand-calculator",
    name: "Sand Calculator",
    shortName: "Sand",
    eyebrow: "BEDDING, PLAY & LEVELING SAND",
    category: "Stone & aggregate",
    metaTitle: "Sand Calculator | Calculate Cubic Yards, Tons & Bags",
    metaDescription: "Calculate how much sand you need for paver bedding, sandboxes, and masonry. Free calculator converts square feet and depth into cubic yards, tons, and bags.",
    description: "Calculate sand volume for landscaping, bedding and general project planning. Convert dimensions into cubic yards, cubic metres, cubic feet and litres, with optional bag and supplier-density estimates.",
    cardDescription: "Calculate sand volume for bedding, landscaping and fill projects.",
    icon: "⌁",
    material: "Sand",
    bestFor: ["Paver bedding estimates", "Play and landscaping areas", "General fill-volume planning"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Weight (tons) = Cubic Yards × 1.30 to 1.40 tons/yd³.",
    howTo: [
      "Measure the length and width of the area to receive sand in feet.",
      "Enter the planned sand depth in inches (exactly 1.0 inch for interlocking paver bedding; 6 to 8 inches for children's sandboxes).",
      "Add a 5% screeding and edge allowance.",
      "Review the volume in cubic yards, cubic metres, or 50 lb retail bags."
    ],
    quickAnswer: {
      directAnswer: "For paver bedding layers, install sand at an exact uncompacted depth of 1.0 inch (25 mm) using ASTM C33 concrete sand. Multiply area in square feet by depth in inches and divide by 324 to find cubic yards. One cubic yard covers 324 sq ft at 1 inch deep and weighs approximately 2,600 to 2,700 lbs (1.3 to 1.35 tons).",
      ruleOfThumb: "A 15 ft × 20 ft paver patio (300 sq ft) requires approximately 0.93 cubic yards of bedding sand (1.25 tons or 50 fifty-pound bags).",
      tableCaption: "Sand Coverage & Weight Benchmarks per Cubic Yard",
      benchmarkTable: [
        { depth: "0.50 inch (1.27 cm)", coverageSqFt: "648 sq ft", coverageSqM: "60.2 m²", typicalUse: "Fine paver joint sand top-up" },
        { depth: "1.0 inch (2.54 cm)", coverageSqFt: "324 sq ft", coverageSqM: "30.1 m²", typicalUse: "Standard paver bedding layer (ASTM C33)" },
        { depth: "2.0 inches (5.08 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "Above-ground pool leveling base" },
        { depth: "4.0 inches (10.16 cm)", coverageSqFt: "81 sq ft", coverageSqM: "7.5 m²", typicalUse: "Utility pipe trench bedding & protection" },
        { depth: "6.0 inches (15.24 cm)", coverageSqFt: "54 sq ft", coverageSqM: "5.0 m²", typicalUse: "Standard residential playground sandbox" },
        { depth: "8.0 inches (20.32 cm)", coverageSqFt: "40.5 sq ft", coverageSqM: "3.8 m²", typicalUse: "Commercial play safety depth" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "The formula divides total square-foot-inches by 324 (27 cu ft/yd³ × 12 in/ft). Weight is calculated using bulk density: Weight (lbs) = Cubic Yards × Bulk Density (typically 2,600 to 2,750 lb/yd³).",
      circleNote: "For circular sandboxes or pool bases: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For triangular spaces: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: "Paver Patio Bedding Sand Worked Example",
      scenario: "Installing a 20 ft × 16 ft interlocking concrete paver patio requiring an uncompacted 1-inch bedding layer of ASTM C33 sand with a 5% allowance.",
      dimensions: "20 ft × 16 ft × 1.0 in depth, 5% allowance",
      steps: [
        { label: "1. Plan Patio Area", formula: "20 ft × 16 ft", result: "320 sq ft", explanation: "Surface area of the paver base." },
        { label: "2. Base Cubic Yards", formula: "320 sq ft × 1 in ÷ 324", result: "0.988 yd³", explanation: "Base geometric bedding volume (26.67 cu ft)." },
        { label: "3. Order Volume with 5% Allowance", formula: "0.988 yd³ × 1.05", result: "1.037 yd³", explanation: "Accounts for screeding waste and edge loss." },
        { label: "4. Total Weight (at 2,700 lb/yd³)", formula: "1.037 yd³ × 2,700 lb/yd³", result: "2,800 lbs", explanation: "Calculates total weight (1.40 short tons)." },
        { label: "5. 50 lb Bags", formula: "2,800 lbs ÷ 50 lb/bag", result: "56 bags", explanation: "56 fifty-pound retail bags." }
      ],
      finalSummary: "Order 1.05 cubic yards (1.4 tons) in bulk or 56 bags (50 lbs each) of coarse washed concrete sand."
    },
    inputsGuide: {
      lengthWidth: "Measure the compacted aggregate base area. Paver bedding sand extends to the inside of the edge restraints.",
      depthGuidance: "For paver bedding, depth MUST be strictly 1.0 inch. Installing bedding sand thicker than 1.5 inches causes severe surface rutting.",
      allowanceRecommendation: "Add 5% for flat screeded patio bases; add 10% for sandboxes or irregular pipe trenches.",
      packagingGuidance: "Retail play sand and all-purpose sand are packaged in 50 lb bags (approx. 0.45 to 0.50 cu ft each)."
    },
    materialSpecifics: {
      compactionBehavior: "Dry coarse sand compacts minimally, but undergoes 'moisture bulking'—damp sand (4–8% moisture) expands in loose volume by up to 25% due to surface tension.",
      moistureAndWeight: "Dry masonry sand weighs ~2,500 to 2,700 lb/yd³ (1,480 to 1,600 kg/m³). Saturated wet sand can exceed 3,000 lb/yd³ (1,780 kg/m³).",
      subgradePreparation: "Do not pre-compact bedding sand. Screed it loose over compacted aggregate, lay the pavers, and compact the pavers into the sand using a plate compactor.",
      orderingRule: "Never use fine masonry mortar sand or limestone screenings for paver bedding; use coarse, washed concrete sand (ASTM C33)."
    },
    commonMistakes: [
      {
        mistake: "Using fine masonry sand for paver bedding",
        impact: "Fine round sand washes away during rain and turns to mush under high moisture, causing sunken, uneven pavers.",
        prevention: "Insist on coarse, angular, washed concrete sand meeting ASTM C33 specifications."
      },
      {
        mistake: "Installing bedding sand thicker than 1 inch to make up for an uneven base",
        impact: "Excessive sand thickness ruts and shifts under foot traffic and wheel loads, ruining the patio surface.",
        prevention: "Achieve proper grade with the compacted crushed gravel base; keep bedding sand strictly at 1.0 inch."
      },
      {
        mistake: "Pre-compacting bedding sand before placing pavers",
        impact: "If the sand is already compacted, the pavers cannot bed into the sand during the final plate compaction pass.",
        prevention: "Leave the sand screeded and loose until pavers are laid and ready for joint vibrating."
      }
    ],
    authoritativeSources: [
      { organization: "ASTM International", standardOrDocument: "ASTM C33 / C33M-23: Standard Specification for Concrete Aggregates (Fine Aggregate)", citation: "West Conshohocken, PA.", url: "https://www.astm.org/c0033_c0033m-23.html" },
      { organization: "Interlocking Concrete Pavement Institute (ICPI)", standardOrDocument: "Tech Spec 2: Construction of Interlocking Concrete Pavements", citation: "Chantilly, VA.", url: "https://icpi.org/" }
    ],
    faqs: [
      { question: "How many 50 lb bags of sand are in a cubic yard?", answer: "Dry sand weighs approximately 2,700 lbs per cubic yard. It takes 54 fifty-pound bags to equal one cubic yard (27 cubic feet)." },
      { question: "How deep should sand be under pavers?", answer: "ICPI engineering standards require an uncompacted bedding layer of exactly 1.0 inch (25 mm). Never install bedding sand less than 0.75 inches or greater than 1.5 inches deep." },
      { question: "How much sand do I need for a 4x4 sandbox?", answer: "A 4 ft × 4 ft sandbox (16 sq ft) filled to a 6-inch depth requires 8 cubic feet of play sand (approx. 0.30 cubic yards or 16 fifty-pound bags)." },
      { question: "Can I use polymeric sand as the bedding layer?", answer: "No. Polymeric sand contains chemical binding polymers meant exclusively for narrow joints between pavers. Using it as a bedding layer will fail and ruin the patio." }
    ],
    relatedGuides: [
      { slug: "how-to-calculate-material-weight-bulk-density", title: "Calculating Bulk Density and Weight" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Conversion Guide" },
      { slug: "how-to-measure-landscaping-materials", title: "How to Measure a Landscaping Area" }
    ]
  },
  {
    slug: "paver-base-calculator",
    name: "Paver Base Calculator",
    shortName: "Paver base",
    eyebrow: "PATIO & WALKWAY SUB-BASE",
    category: "Stone & aggregate",
    metaTitle: "Paver Base Calculator | Estimate Crushed Stone & Compaction",
    metaDescription: "Calculate crushed aggregate base for patios, walkways, and driveways. Free calculator accounts for compaction loss, thickness, tons, and cubic yards.",
    description: "Estimate the compacted aggregate volume for a patio, walkway or paver project. Calculate the measured layer volume and add an allowance using your chosen dimensions and depth.",
    cardDescription: "Estimate aggregate quantities for patios, paths and paver foundations.",
    icon: "▦",
    material: "Paver base aggregate",
    bestFor: ["Patio foundations", "Walkway base layers", "Paver project material planning"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Base Geometric Volume (yd³). Loose Order Volume = Base Volume × (1 + Allowance% ÷ 100). (Set Allowance to 18%–20% for dense-graded aggregate compaction).",
    howTo: [
      "Measure your patio or walkway plan area, adding 6 inches of over-excavation beyond the paver edge on all sides.",
      "Enter design compacted depth (4 inches for walkways/patios; 6 to 8 inches for residential driveways).",
      "Include a compaction and spillage allowance (typically 18% to 20% for dense-graded Crusher Run / road base).",
      "Review the loose order volume in cubic yards and weight in short tons."
    ],
    quickAnswer: {
      directAnswer: "Residential patios and walkways require a minimum compacted base depth of 4 inches (10 cm) of dense-graded aggregate (ASTM D2940 Crusher Run / road base). Because stone dust packs into voids during plate compaction, order 18% to 20% extra loose aggregate to achieve target compacted depth. 1 cubic yard loose covers 81 sq ft at 4 inches before compaction.",
      ruleOfThumb: "A 200 sq ft patio requires 2.47 cubic yards of compacted base, which requires ordering 2.96 cubic yards of loose stone (approx. 4.1 tons).",
      tableCaption: "Paver Base Compacted Depth Standards & Order Quantities",
      benchmarkTable: [
        { depth: "4.0 inches (10 cm)", coverageSqFt: "67.5 sq ft / loose yd³", coverageSqM: "6.3 m² / m³", typicalUse: "Pedestrian walkway & residential patio base" },
        { depth: "6.0 inches (15 cm)", coverageSqFt: "45.0 sq ft / loose yd³", coverageSqM: "4.2 m² / m³", typicalUse: "Hot tub pad, outdoor kitchen, light vehicle driveway" },
        { depth: "8.0 inches (20 cm)", coverageSqFt: "33.8 sq ft / loose yd³", coverageSqM: "3.1 m² / m³", typicalUse: "Standard residential paver driveway base" },
        { depth: "10.0 to 12.0 inches", coverageSqFt: "22.5 sq ft / loose yd³", coverageSqM: "2.1 m² / m³", typicalUse: "Commercial parking, clay subgrades, heavy truck access" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Base Volume (yd³) = Area (ft²) × Depth (in) ÷ 324. Order Volume = Base Volume × (1 + Allowance% ÷ 100)",
      metric: "Base Volume (m³) = Area (m²) × Depth (cm) ÷ 100. Order Volume = Base Volume × (1 + Allowance% ÷ 100)",
      dimensionalExplanation: "The calculator computes exact neat geometric volume from your input dimensions. To account for plate compaction shrinkage (which typically compresses dense-graded road base by 15% to 20%), apply the loose-to-compacted factor by setting the project Allowance to 18% or 20% in the calculator settings.",
      circleNote: "For round patios: Area = π × [(Diameter + 1.0 ft over-excavation) ÷ 2]².",
      triangleNote: "For triangular layouts: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: "Walkway Paver Base Worked Example",
      scenario: "Preparing the base for an 8 ft × 20 ft walkway (including 6-inch over-dig on both sides = 9 ft × 21 ft = 189 sq ft) with 4 inches of compacted Crusher Run and a 20% compaction factor.",
      dimensions: "189 sq ft area × 4 in compacted depth, 20% compaction allowance",
      steps: [
        { label: "1. Over-Dug Plan Area", formula: "9 ft × 21 ft", result: "189 sq ft", explanation: "Includes 6-inch perimeter base extension for edge restraints." },
        { label: "2. Compacted Net Volume", formula: "189 sq ft × 4 in ÷ 324", result: "2.333 yd³", explanation: "Target geometric finished base volume." },
        { label: "3. Loose Order Volume (20% Allowance)", formula: "2.333 yd³ × 1.20", result: "2.800 yd³", explanation: "Compensates for mechanical compaction shrinkage via the user-controlled 20% allowance input." },
        { label: "4. Total Weight (at 2,800 lb/yd³)", formula: "2.800 yd³ × 2,800 lb/yd³", result: "7,840 lbs", explanation: "Calculates total weight in short tons (3.92 tons)." },
        { label: "5. Metric Equivalent", formula: "2.800 yd³ × 0.764555", result: "2.14 m³", explanation: "Equivalent loose metric volume (3.56 metric tonnes)." }
      ],
      finalSummary: "Order 2.8 cubic yards (approx. 4.0 tons) of dense-graded road base (#411 / Crusher Run)."
    },
    inputsGuide: {
      lengthWidth: "Always extend your base area 6 inches beyond the paver perimeter on all sides to anchor edge restraints firmly.",
      depthGuidance: "Compact base in lifts no thicker than 2 inches at a time; plate compactors cannot consolidate thicker lifts thoroughly.",
      allowanceRecommendation: "Use an 18% to 20% compaction allowance for dense-graded aggregate; use 5% for washed open-graded base.",
      packagingGuidance: "Base material is sold loose by the ton from quarries or in 50 lb bags at home centers (approx. 0.45 cu ft each)."
    },
    materialSpecifics: {
      compactionBehavior: "Dense-graded aggregate (quarry process, #411, Crusher Run) contains particle sizes from 3/4-inch down to fine stone dust. It compacts to near-concrete hardness.",
      moistureAndWeight: "Compacted paver base weighs approximately 2,700 to 2,900 lb/yd³ (1.35 to 1.45 short tons/yd³).",
      subgradePreparation: "Excavate native soil, compact the dirt subgrade firmly, and lay a woven geotextile fabric before placing aggregate.",
      orderingRule: "Lightly moisten the aggregate with a hose before running the plate compactor to achieve optimal Proctor compaction density."
    },
    commonMistakes: [
      {
        mistake: "Failing to extend the base 6 inches past the pavers",
        impact: "The edge pavers collapse and shift laterally because the spike-anchored plastic edging breaks away on the edge of the trench.",
        prevention: "Always excavate the base 6 inches wider than the finished patio dimensions on all unconfined edges."
      },
      {
        mistake: "Compacting the entire 4 or 6 inch depth in a single lift",
        impact: "Vibratory plate compactors only consolidate the top 2 inches, leaving the bottom spongy, leading to future patio dips.",
        prevention: "Spread and compact the base aggregate in sequential 2-inch lifts, running the compactor 3 to 4 times per lift."
      },
      {
        mistake: "Omitting the compaction factor when ordering",
        impact: "Homeowners order exact geometric volume and find themselves 20% short of stone after compacting.",
        prevention: "Always multiply compacted geometric volume by 1.20 to calculate loose delivery quantities."
      }
    ],
    authoritativeSources: [
      { organization: "Interlocking Concrete Pavement Institute (ICPI)", standardOrDocument: "Tech Spec 4: Structural Design of Interlocking Concrete Pavements", citation: "Chantilly, VA.", url: "https://icpi.org/" },
      { organization: "ASTM International", standardOrDocument: "ASTM D2940 / D2940M-20: Standard Specification for Graded Aggregate Material for Bases or Subbases", citation: "West Conshohocken, PA.", url: "https://www.astm.org/d2940_d2940m-20.html" }
    ],
    faqs: [
      { question: "How thick should paver base be?", answer: "Walkways and pedestrian patios require a minimum of 4 inches of compacted base. Patios supporting hot tubs or heavy fire pits require 6 inches; residential paver driveways require 8 to 12 inches." },
      { question: "What is the best material for a paver base?", answer: "Dense-graded aggregate containing 3/4-inch fractured stone down to stone dust (sold as Crusher Run, #411, CR-6, Road Base, or Quarry Process) is the industry standard." },
      { question: "Can I use sand instead of crushed stone for the base?", answer: "No. Sand shifts and washes away under water and foot traffic. Sand is used only as a thin 1-inch bedding layer on top of a firm crushed aggregate base." },
      { question: "How many tons of paver base do I need for a 10x10 patio?", answer: "A 10×10 patio (11×11 with over-dig = 121 sq ft) at 4 inches compacted depth requires 1.8 cubic yards of loose stone, which weighs approximately 2.5 short tons (5,000 lbs)." }
    ],
    relatedGuides: [
      { slug: "how-to-calculate-material-weight-bulk-density", title: "Material Weight and Bulk Density Guide" },
      { slug: "gravel-driveway-material-estimation", title: "Driveway Gravel & Aggregate Cross-Sections" },
      { slug: "how-to-measure-landscaping-materials", title: "How to Measure a Landscaping Area" }
    ]
  },
  {
    slug: "gravel-driveway-calculator",
    name: "Gravel Driveway Calculator",
    shortName: "Driveway gravel",
    eyebrow: "ROADWAYS, DRIVES & HEAVY ACCESS",
    category: "Stone & aggregate",
    metaTitle: "Gravel Driveway Calculator | Estimate Volume, Tons & Depth",
    metaDescription: "Calculate gravel volume and weight for driveways, lanes, and parking pads. Enter dimensions and single-layer depth to estimate cubic yards and quarry tonnage.",
    description: "Estimate gravel volume and quarry tonnage for a single driveway layer from its length, width, and layer depth. Calculate multi-tier profiles by running base and surface layers separately.",
    cardDescription: "Estimate gravel volume and tonnage for a single driveway layer.",
    icon: "▰",
    material: "Driveway gravel",
    bestFor: ["Driveway resurfacing", "New gravel driveway planning", "Driveway base or wearing-course estimates"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Weight (tons) = Cubic Yards × 1.35 to 1.45 tons/yd³.",
    howTo: [
      "Measure the length of your driveway and its average width in feet.",
      "Enter the intended depth for the single layer you are currently calculating (run the calculator separately for each distinct layer in a multi-tier profile).",
      "Add an allowance (10% to 15%) for mechanical compaction and subgrade displacement.",
      "Review the total in loose cubic yards and estimated quarry weight (tons)."
    ],
    quickAnswer: {
      directAnswer: "For refreshing an existing gravel driveway, install a 2-inch layer of #57 angular crushed stone (approx. 1 cubic yard per 162 sq ft). For building a new driveway, install an 8 to 12 inch tiered profile: 6 inches of coarse sub-base (#3 ballast), 4 inches of dense-graded base (Crusher Run), and 2 inches of surface gravel. Multiply area by depth in inches and divide by 324 to get cubic yards.",
      ruleOfThumb: "A standard 100 ft × 10 ft driveway (1,000 sq ft) resurfaced with 2 inches of gravel requires 6.17 cubic yards (approx. 8.6 tons of crushed stone).",
      tableCaption: "Driveway Gravel Layer Guidelines & Material Sizing",
      benchmarkTable: [
        { depth: "1.5 to 2.0 in (3.8 to 5 cm)", coverageSqFt: "162 to 216 sq ft / yd³", coverageSqM: "15 to 20 m²", typicalUse: "Surface top-dress (#57 washed crushed limestone / granite)" },
        { depth: "3.0 to 4.0 in (7.5 to 10 cm)", coverageSqFt: "81 to 108 sq ft / yd³", coverageSqM: "7.5 to 10 m²", typicalUse: "Middle binding base (Crusher Run / #411 dense-graded)" },
        { depth: "6.0 in (15 cm)", coverageSqFt: "54 sq ft / yd³", coverageSqM: "5.0 m²", typicalUse: "Heavy sub-base foundation stone (#3 or #4 ballast)" },
        { depth: "8.0 to 12.0 in (20 to 30 cm)", coverageSqFt: "27 to 40.5 sq ft / yd³", coverageSqM: "2.5 to 3.8 m²", typicalUse: "Total engineered profile depth for new rural driveways" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Length (ft) × Width (ft) × Layer Depth (in) ÷ 324 × Allowance Factor",
      metric: "Cubic Metres = Length (m) × Width (m) × Layer Depth (cm) ÷ 100 × Allowance Factor",
      dimensionalExplanation: "Length (ft) × Width (ft) gives square footage. Multiplying by depth in inches and dividing by 324 converts directly to cubic yards. Multiply cubic yards by 1.4 tons/yd³ to estimate quarry delivery weight.",
      circleNote: "For circular turnaround areas: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For driveway entrance flares: Area = (Flare Base × Flare Length) ÷ 2."
    },
    workedExample: {
      title: "150-Foot Driveway Resurfacing Example",
      scenario: "Top-dressing an existing 150 ft long by 12 ft wide rural gravel driveway with 2 inches of #57 crushed limestone and a 10% allowance.",
      dimensions: "150 ft × 12 ft × 2 in depth, 10% allowance",
      steps: [
        { label: "1. Driveway Plan Area", formula: "150 ft × 12 ft", result: "1,800 sq ft", explanation: "Total surface square footage." },
        { label: "2. Base Volume", formula: "1,800 sq ft × 2 in ÷ 324", result: "11.111 yd³", explanation: "Net geometric volume requirement." },
        { label: "3. Volume with 10% Allowance", formula: "11.111 yd³ × 1.10", result: "12.222 yd³", explanation: "Compensates for hollows and wheel rut filling." },
        { label: "4. Quarry Weight in Tons (at 1.4 tons/yd³)", formula: "12.222 yd³ × 1.4 tons/yd³", result: "17.1 tons", explanation: "Calculates total weight for quarry ordering (34,200 lbs)." },
        { label: "5. Dump Truck Loads", formula: "17.1 tons ÷ 15 tons/triaxle truck", result: "2 truckloads", explanation: "Requires two standard tri-axle dump truck deliveries." }
      ],
      finalSummary: "Order 12.5 cubic yards or approximately 17 to 18 tons of #57 crushed stone."
    },
    inputsGuide: {
      lengthWidth: "Measure the center length and take width measurements at multiple points; gravel driveways frequently spread wider near the road entrance.",
      depthGuidance: "Calculate base layers and surface layers separately; never combine them into a single mathematical pass because stone sizes and compaction rates differ.",
      allowanceRecommendation: "Add 10% for resurfacing existing hard gravel; add 15% to 20% for uncompacted new road cuts.",
      packagingGuidance: "Driveway aggregate is delivered exclusively in bulk dump truck loads (single-axle ~6 tons; tri-axle ~15–18 tons)."
    },
    materialSpecifics: {
      compactionBehavior: "Dense-graded base stone compacts by 15% to 20% under a heavy vibratory roller. Clean washed surface stone (#57) settles ~5% under tire traffic.",
      moistureAndWeight: "Crushed limestone and granite weigh between 2,700 and 2,900 lb/yd³ (1.35 to 1.45 tons/yd³).",
      subgradePreparation: "Grade a 1/2-inch-per-foot crown from center to shoulders to shed surface water into side swales.",
      orderingRule: "Lay a woven geotextile fabric between the raw subgrade dirt and your first coarse stone layer."
    },
    commonMistakes: [
      {
        mistake: "Pouring surface gravel directly on bare mud or dirt",
        impact: "Vehicle tires immediately pump stone into the mud, causing deep ruts, tire spin, and disappearing gravel.",
        prevention: "Install a 4-to-6-inch coarse aggregate sub-base over heavy non-woven geotextile fabric."
      },
      {
        mistake: "Building a flat driveway with no centerline crown",
        impact: "Rainwater pools on the surface; moving vehicle tires create hydraulic action that ejects stone dust, carving deep potholes.",
        prevention: "Crown the center of the driveway 2 to 3 inches higher than the shoulder edges."
      },
      {
        mistake: "Using round river rock or pea gravel on vehicle drives",
        impact: "Round pebbles act like ball bearings under car tires, sliding away and creating impassable wheel ruts.",
        prevention: "Use angular, fractured crushed quarry stone (#57 or Crusher Run) that locks mechanically together under traffic."
      }
    ],
    authoritativeSources: [
      { organization: "Federal Highway Administration (FHWA)", standardOrDocument: "Gravel Roads Construction and Maintenance Guide (FHWA-FLH-15-004)", citation: "U.S. Department of Transportation.", url: "https://www.fhwa.dot.gov/construction/gravel/flh15004.pdf" },
      { organization: "Penn State Center for Dirt and Gravel Road Studies", standardOrDocument: "Driving Surface Aggregate Standards & Maintenance", citation: "Pennsylvania State University.", url: "https://www.dirtandgravel.psu.edu/" }
    ],
    faqs: [
      { question: "How many tons of gravel do I need for a 100-foot driveway?", answer: "For a 100 ft long by 10 ft wide driveway with a 2-inch resurfacing layer: you need 6.17 cubic yards. At 1.4 tons per yard, you need approximately 8.6 tons of gravel." },
      { question: "What is the best gravel size for a driveway surface?", answer: "#57 crushed stone (approx. 3/4-inch angular stone) is the gold standard for driveway surfaces. It provides smooth driving traction, locks together firmly, and allows rainwater to drain freely." },
      { question: "How thick should a new gravel driveway be?", answer: "A new driveway over virgin ground should have a total aggregate profile of 8 to 12 inches: 6 inches of coarse base (#3 stone), 4 inches of dense-graded stone (Crusher Run), and 2 inches of surface gravel (#57 stone)." },
      { question: "How often does a gravel driveway need to be resurfaced?", answer: "With proper crowning and drainage, a gravel driveway typically requires a 1-to-2-inch surface top-up every 2 to 4 years to replace aggregate lost to plowing and shoulder displacement." }
    ],
    relatedGuides: [
      { slug: "gravel-driveway-material-estimation", title: "Gravel Driveway Cross-Sections & Compaction Guide" },
      { slug: "how-to-calculate-material-weight-bulk-density", title: "Calculating Material Weight from Bulk Density" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Guide" }
    ]
  },
  {
    slug: "concrete-calculator",
    name: "Concrete Calculator",
    shortName: "Concrete",
    eyebrow: "SLABS, FOOTINGS & STEPS",
    category: "Construction",
    metaTitle: "Concrete Calculator | Calculate Slabs, Footings & Bags",
    metaDescription: "Calculate concrete volume for slabs, footings, and post holes. Free calculator converts square feet and thickness into cubic yards, metres, and estimated bags based on your manufacturer's printed bag yield.",
    description: "Calculate geometric concrete volume for a slab, footing or other simple pour. Convert the result to cubic yards, cubic metres and litres, and estimate bag counts using the yield printed on your concrete mix.",
    cardDescription: "Calculate concrete volume for slabs, pads and simple pours.",
    icon: "▧",
    material: "Concrete",
    bestFor: ["Concrete slabs and pads", "Simple rectangular footings", "Comparing ready-mix and bagged concrete volume"],
    formula: "Length (ft) × Width (ft) × Thickness (in) ÷ 324 = Cubic Yards. Bag count is calculated by dividing total cubic feet by the manufacturer's printed bag yield (e.g. 0.60 cu ft for 80 lb; 0.45 cu ft for 60 lb).",
    howTo: [
      "Measure internal formwork length and width in feet (use cylinder mode for round sonotubes/post holes).",
      "Enter exact pour thickness in inches (remember: a 2x4 form board has an actual depth of 3.5 inches).",
      "Include a 10% allowance for formwork deflection, subgrade dips, and spillage.",
      "Review the total in cubic yards, cubic metres, or bags by entering your bag's printed volumetric yield (e.g. 0.60 cu ft for 80 lb; 0.45 cu ft for 60 lb) into the Pack Volume field."
    ],
    quickAnswer: {
      directAnswer: "Residential concrete slabs require a minimum thickness of 4.0 inches (3.5 inches if framed with standard dressed 2x4s) of 3,500+ PSI concrete. Multiply slab length (ft) by width (ft) by thickness (in) and divide by 324 to find cubic yards. One cubic yard covers 81 sq ft at 4 inches thick. At standard bag yields (0.60 cu ft for 80 lb; 0.45 cu ft for 60 lb), 1 cubic yard requires 45 eighty-pound bags or 60 sixty-pound bags; enter your bag's printed yield to calculate exact package quantities.",
      ruleOfThumb: "A standard 10 ft × 10 ft patio slab at 4 inches thick (100 sq ft) requires 1.23 cubic yards of concrete (or 1.36 cubic yards with a 10% allowance, requiring 62 eighty-pound bags).",
      tableCaption: "Concrete Slab Volume & Bag Yield Benchmarks",
      benchmarkTable: [
        { depth: "3.5 inches (8.9 cm)", coverageSqFt: "92.6 sq ft / yd³", coverageSqM: "8.6 m² / m³", typicalUse: "Framed with dressed 2x4 lumber; light walkways" },
        { depth: "4.0 inches (10.2 cm)", coverageSqFt: "81.0 sq ft / yd³", coverageSqM: "7.5 m² / m³", typicalUse: "Standard residential patio & shed pad" },
        { depth: "5.0 inches (12.7 cm)", coverageSqFt: "64.8 sq ft / yd³", coverageSqM: "6.0 m² / m³", typicalUse: "Passenger vehicle residential driveway" },
        { depth: "6.0 inches (15.2 cm)", coverageSqFt: "54.0 sq ft / yd³", coverageSqM: "5.0 m² / m³", typicalUse: "Heavy RV parking pad, workshop floor, reinforced slab" },
        { depth: "8.0 to 12.0 inches", coverageSqFt: "27.0 to 40.5 sq ft / yd³", coverageSqM: "2.5 to 3.8 m²", typicalUse: "Commercial equipment footers & grade beams" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Length (ft) × Width (ft) × Thickness (in) ÷ 324 × 1.10",
      metric: "Cubic Metres = Length (m) × Width (m) × Thickness (cm) ÷ 100 × 1.10",
      dimensionalExplanation: "To find volume in cubic yards: Area (ft²) × [Thickness (in) ÷ 12 in/ft] ÷ 27 cu ft/yd³ = [L × W × T] ÷ 324. Always add a 10% allowance for form spreading and uneven sub-base.",
      circleNote: "For round post holes or cylindrical columns: Volume (cu ft) = π × (Diameter in ft ÷ 2)² × Depth in ft. Divide by 27 for cubic yards.",
      triangleNote: "For triangular pads: Volume (cu ft) = [(Base in ft × Height in ft) ÷ 2] × (Thickness in in ÷ 12)."
    },
    workedExample: {
      title: "12x12 Patio Slab Worked Example",
      scenario: "Pouring a 12 ft × 12 ft concrete patio slab at a design thickness of 4 inches with a 10% formwork allowance, using 80 lb bags.",
      dimensions: "12 ft × 12 ft × 4 in thickness, 10% allowance",
      steps: [
        { label: "1. Slab Surface Area", formula: "12 ft × 12 ft", result: "144 sq ft", explanation: "Plan view area inside forms." },
        { label: "2. Base Volume", formula: "144 sq ft × 4 in ÷ 324", result: "1.778 yd³", explanation: "Base geometric cubic volume (48.0 cu ft)." },
        { label: "3. Volume with 10% Allowance", formula: "1.778 yd³ × 1.10", result: "1.956 yd³", explanation: "Accounts for form flex and subgrade variations (52.8 cu ft)." },
        { label: "4. 80 lb Bags Needed (yield 0.60 cu ft/bag)", formula: "52.8 cu ft ÷ 0.60 cu ft/bag", result: "88 bags", explanation: "88 eighty-pound bags (approx. 7,040 lbs dry)." },
        { label: "5. Alternative: 60 lb Bags (yield 0.45 cu ft/bag)", formula: "52.8 cu ft ÷ 0.45 cu ft/bag", result: "118 bags", explanation: "117.3 bags rounded up to 118 sixty-pound bags." }
      ],
      finalSummary: "Order 2.0 cubic yards from a ready-mix truck, or purchase 88 bags of 80 lb premix concrete."
    },
    inputsGuide: {
      lengthWidth: "Measure the inside faces of your wooden form boards. Form boards must be securely braced with wooden stakes every 2 feet.",
      depthGuidance: "Remember dimensional lumber sizes: a standard 2x4 is 3.5 inches wide, producing a 3.5-inch slab unless excavation dips below the board.",
      allowanceRecommendation: "Always add 10% for concrete slabs. Running short by 1 wheelbarrow load ruins a pour, creating unsightly cold joints.",
      packagingGuidance: "Standard bag yields: an 80 lb bag yields 0.60 cu ft; a 60 lb bag yields 0.45 cu ft; a 50 lb bag yields 0.375 cu ft."
    },
    materialSpecifics: {
      compactionBehavior: "Fresh wet concrete does not compress like soil, but internal air pockets must be consolidated with a screed and bull float to eliminate honeycombing.",
      moistureAndWeight: "Cured standard concrete weighs approximately 145 to 150 lb/cu ft (3,900 to 4,050 lb/yd³ or 2,400 kg/m³).",
      subgradePreparation: "Never pour concrete directly over loose topsoil or mud; pour over a minimum 4-inch compacted crushed stone base with vapor barrier.",
      orderingRule: "For projects requiring more than 1.5 cubic yards (68 bags of 80 lb), order ready-mix delivery by truck to avoid mixing fatigue."
    },
    commonMistakes: [
      {
        mistake: "Assuming a 2x4 form board produces a 4.0-inch slab",
        impact: "Dressed 2x4s are actually 3.5 inches wide. Assuming 4 inches results in 14% excess concrete delivered.",
        prevention: "Check the exact lumber dimension and measure depth from sub-base to top of form board."
      },
      {
        mistake: "Ordering exact volume with zero allowance",
        impact: "Running short near the end of a pour leaves a missing corner or an ugly structural cold joint while scrambling for bags.",
        prevention: "Always include a 10% allowance on ready-mix truck orders and keep 2 to 3 spare bags on site."
      },
      {
        mistake: "Attempting to hand-mix more than 1.5 cubic yards",
        impact: "Mixing 70+ heavy bags takes hours. The first batches begin setting and stiffening before the final batch is poured.",
        prevention: "Call a ready-mix concrete plant whenever project requirements exceed 1 to 1.5 cubic yards."
      }
    ],
    authoritativeSources: [
      { organization: "American Concrete Institute (ACI)", standardOrDocument: "ACI 302.1R-15: Guide to Concrete Floor and Slab Construction", citation: "Farmington Hills, MI.", url: "https://www.concrete.org/store/productdetail.aspx?ItemID=302115" },
      { organization: "Portland Cement Association (PCA)", standardOrDocument: "Design and Control of Concrete Mixtures (EB001)", citation: "Skokie, IL.", url: "https://www.cement.org/" }
    ],
    faqs: [
      { question: "How many 80 lb bags of concrete make a cubic yard?", answer: "It takes exactly 45 bags of 80 lb concrete mix to equal one cubic yard (27 cubic feet), because each 80 lb bag yields 0.60 cubic feet (27 ÷ 0.60 = 45)." },
      { question: "How many 60 lb bags of concrete make a cubic yard?", answer: "It takes exactly 60 bags of 60 lb concrete mix to equal one cubic yard (27 cubic feet), because each 60 lb bag yields 0.45 cubic feet (27 ÷ 0.45 = 60)." },
      { question: "How much concrete do I need for a 10x10 slab at 4 inches?", answer: "A 10×10 slab at 4 inches thick has a base volume of 1.23 cubic yards. With a 10% allowance, order 1.36 cubic yards (or 62 bags of 80 lb mix)." },
      { question: "How many bags of concrete do I need for a 4x4 fence post hole?", answer: "A standard 10-inch diameter hole that is 36 inches deep (with a 4x4 post inserted) requires approximately 1.5 to 2.0 cubic feet of concrete, which equals three 60 lb bags or two to three 80 lb bags per post." }
    ],
    relatedGuides: [
      { slug: "concrete-volume-and-bag-yield", title: "Concrete Volume and Bag Yield: Ready-Mix vs Bags" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Conversion Guide" },
      { slug: "how-to-calculate-material-weight-bulk-density", title: "Material Weight from Bulk Density" }
    ]
  },
  {
    slug: "crushed-stone-calculator",
    name: "Crushed Stone Calculator",
    shortName: "Crushed stone",
    eyebrow: "AGGREGATE, BASE & DRAINAGE",
    category: "Stone & aggregate",
    metaTitle: "Crushed Stone Calculator | Estimate Cubic Yards, Tons & Bags",
    metaDescription: "Calculate crushed stone for drainage, driveways, paths, and base layers. Free calculator converts square feet and depth into cubic yards and quarry tons.",
    description: "Estimate crushed stone volume for landscaping, drainage and general aggregate projects. Calculate cubic yards, cubic metres, bag quantities and supplier-density weight estimates.",
    cardDescription: "Calculate crushed stone for paths, base layers and landscaping.",
    icon: "⬡",
    material: "Crushed stone",
    bestFor: ["Landscape paths", "Aggregate base layers", "General stone-volume planning"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Weight (tons) = Cubic Yards × 1.35 to 1.45 tons/yd³.",
    howTo: [
      "Measure the length and width of the project area in feet.",
      "Enter the planned crushed stone depth (e.g. 4 inches for drainage trenches; 3 inches for paths).",
      "Add a 10% allowance for subgrade unevenness and edge displacement.",
      "Review the total in cubic yards and short tons (default ~2,700 lb/yd³ or 1.35 tons/yd³)."
    ],
    quickAnswer: {
      directAnswer: "Crushed stone is specified by ASTM size numbers (#57 is 3/4-inch clean; #411 is Crusher Run with fines; #3 is 2-inch ballast). Multiply area in square feet by depth in inches and divide by 324 to get cubic yards. Multiply cubic yards by 1.35 to 1.45 to find quarry order weight in short tons.",
      ruleOfThumb: "One cubic yard of crushed stone covers 108 square feet at 3 inches deep, 81 square feet at 4 inches deep, and weighs approximately 2,700 lbs (1.35 short tons).",
      tableCaption: "Crushed Stone Sizing & Coverage Benchmarks",
      benchmarkTable: [
        { depth: "2.0 inches (5 cm)", coverageSqFt: "162 sq ft", coverageSqM: "15.1 m²", typicalUse: "#57 stone top-dressing over existing driveway" },
        { depth: "3.0 inches (7.5 cm)", coverageSqFt: "108 sq ft", coverageSqM: "10.0 m²", typicalUse: "Pedestrian walkway & shed foundation perimeter" },
        { depth: "4.0 inches (10 cm)", coverageSqFt: "81 sq ft", coverageSqM: "7.5 m²", typicalUse: "French drainage trench & patio sub-base" },
        { depth: "6.0 inches (15 cm)", coverageSqFt: "54 sq ft", coverageSqM: "5.0 m²", typicalUse: "Heavy roadway base layer & retaining wall backfill" },
        { depth: "8.0 to 12.0 inches", coverageSqFt: "27 to 40.5 sq ft", coverageSqM: "2.5 to 3.8 m²", typicalUse: "Commercial sub-base & cattle access pad" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324",
      metric: "Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
      dimensionalExplanation: "The formula calculates cubic yards from surface area and layer thickness. Multiplying cubic yards by the stone's bulk density (typically 2,700 lb/yd³) gives total weight.",
      circleNote: "For circular areas: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For triangular sections: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: "French Drain Backfill Worked Example",
      scenario: "Filling a 50 ft long, 1.5 ft wide French drain trench with 12 inches of #57 washed crushed stone around a 4-inch perforated pipe, with a 10% allowance.",
      dimensions: "50 ft × 1.5 ft × 12 in depth, 10% allowance",
      steps: [
        { label: "1. Trench Area", formula: "50 ft × 1.5 ft", result: "75 sq ft", explanation: "Surface area of the drainage trench." },
        { label: "2. Base Cubic Yards", formula: "75 sq ft × 12 in ÷ 324", result: "2.778 yd³", explanation: "Net geometric volume (75.0 cu ft)." },
        { label: "3. Volume with 10% Allowance", formula: "2.778 yd³ × 1.10", result: "3.056 yd³", explanation: "Accounts for trench wall irregularity and settling." },
        { label: "4. Weight in Tons (at 1.35 tons/yd³)", formula: "3.056 yd³ × 1.35 tons/yd³", result: "4.13 tons", explanation: "Calculates quarry delivery weight (8,250 lbs)." },
        { label: "5. Metric Equivalent", formula: "3.056 yd³ × 0.764555", result: "2.34 m³", explanation: "Equivalent volume in cubic metres." }
      ],
      finalSummary: "Order 3.1 cubic yards or approximately 4.25 tons of #57 washed crushed stone."
    },
    inputsGuide: {
      lengthWidth: "Measure the trench or pad boundaries accurately with a steel tape measure.",
      depthGuidance: "Enter the thickness for the crushed stone layer only. If layering different stone grades, calculate each layer independently.",
      allowanceRecommendation: "Add 10% for excavated trenches because natural soil walls are never perfectly plumb.",
      packagingGuidance: "Crushed stone is sold by the ton in bulk, or in 50 lb bags (approx. 0.45 cu ft each)."
    },
    materialSpecifics: {
      compactionBehavior: "Washed crushed stone (like #57) has uniform particle size with no fines; it consolidates roughly 5% under vibration. Dense-graded stone (#411 / Crusher Run) compacts 15% to 20%.",
      moistureAndWeight: "Bulk density ranges from 2,600 to 2,900 lb/yd³ (1.3 to 1.45 tons/yd³ or 1,540 to 1,720 kg/m³).",
      subgradePreparation: "Line drainage trenches with non-woven geotextile filter fabric before placing crushed stone to prevent silt from clogging drainage voids.",
      orderingRule: "Quarries bill by the short ton (2,000 lbs) weighed on certified truck scales."
    },
    commonMistakes: [
      {
        mistake: "Using Crusher Run with stone dust for a French drain",
        impact: "The fine stone dust washes down and cakes the perforated pipe slots, completely clogging the drain within months.",
        prevention: "Always specify washed clean stone (#57 or #4 stone) with zero fines for drainage applications."
      },
      {
        mistake: "Assuming all gravel is crushed stone",
        impact: "Natural rounded river gravel slides under load, while crushed stone has angular fractured faces that lock together.",
        prevention: "Use angular crushed quarry stone for base and load-bearing structures."
      },
      {
        mistake: "Underestimating the delivery weight for transport",
        impact: "Trying to haul 2 yards of crushed stone (5,400 lbs) in a half-ton pickup will break the vehicle's suspension.",
        prevention: "Have bulk crushed stone delivered by commercial dump truck."
      }
    ],
    authoritativeSources: [
      { organization: "ASTM International", standardOrDocument: "ASTM D448-24: Standard Classification for Sizes of Aggregate for Road and Bridge Construction", citation: "West Conshohocken, PA.", url: "https://www.astm.org/d0448-24.html" },
      { organization: "National Stone, Sand & Gravel Association (NSSGA)", standardOrDocument: "Aggregate Handbook: Gradation, Physical Properties and Uses", citation: "Alexandria, VA.", url: "https://www.nssga.org/" }
    ],
    faqs: [
      { question: "How many tons is 1 cubic yard of crushed stone?", answer: "One cubic yard of crushed stone typically weighs between 1.35 and 1.45 short tons (2,700 to 2,900 lbs). A safe planning estimate is 1.4 tons per cubic yard." },
      { question: "What is the difference between #57 stone and Crusher Run?", answer: "#57 stone is washed crushed rock (about 3/4-inch) with all fine dust removed, allowing water to drain freely. Crusher Run (also called #411 or road base) includes all fine stone dust, which packs tightly to form a solid, impervious foundation." },
      { question: "How many 50 lb bags of crushed stone are in a cubic yard?", answer: "Because one cubic yard weighs roughly 2,700 lbs, it takes 54 fifty-pound bags to equal one cubic yard." },
      { question: "How deep should crushed stone be under a concrete slab?", answer: "A minimum of 4 inches of compacted crushed stone is standard under residential concrete slabs to provide structural support and prevent capillary water moisture from rising into the concrete." }
    ],
    relatedGuides: [
      { slug: "how-to-calculate-material-weight-bulk-density", title: "Calculating Material Weight from Bulk Density" },
      { slug: "gravel-driveway-material-estimation", title: "Driveway Gravel & Aggregate Cross-Sections" },
      { slug: "cubic-yards-vs-cubic-feet", title: "Cubic Yards vs. Cubic Feet Guide" }
    ]
  }
];

export function getTool(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}
