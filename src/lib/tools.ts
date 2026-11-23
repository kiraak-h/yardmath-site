import { workedExampleFixtures, type WorkedExampleStep } from "./worked-examples";
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
    steps: WorkedExampleStep[];
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
      "Select an allowance (e.g. 5% for bordered beds, or an illustrative 10% to 15% for rough ground) to account for grade variation and natural soil settling.",
      "Enter optional bag volume (e.g. 0.75 or 1.0 cu ft) or supplier density (typically 2,000 to 2,400 lb/yd³) for bag and weight totals."
    ],
    quickAnswer: {
      directAnswer: "To find topsoil volume: multiply your area in square feet by the desired depth in inches, then divide by 324 to get cubic yards. One cubic yard of topsoil covers 324 square feet at 1 inch deep, 162 square feet at 2 inches, and 81 square feet at 4 inches.",
      ruleOfThumb: "A 4-inch layer of topsoil over 1,000 sq ft requires approximately 12.35 cubic yards (or approx. 14.2 cubic yards if an illustrative 15% user planning allowance is selected for settling).",
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
      title: workedExampleFixtures["topsoil-calculator"].title,
      scenario: workedExampleFixtures["topsoil-calculator"].scenario,
      dimensions: workedExampleFixtures["topsoil-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["topsoil-calculator"].steps,
      finalSummary: workedExampleFixtures["topsoil-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the longest boundary lines using a tape measure. For irregularly curved beds, split the area into separate rectangles and triangles.",
      depthGuidance: "Specify the intended settled depth. Established turfgrass cannot survive topsoil layers deeper than 0.5 inches in a single application.",
      allowanceRecommendation: "Apply 5% for framed borders; apply 10% to 15% for new lawn grading over uneven subgrades.",
      packagingGuidance: "Enter the volume stated on the bag label (typically 0.75 or 1.0 cu ft in retail centers, or 2 cu ft for premium mixes)."
    },
    materialSpecifics: {
      compactionBehavior: "Screened loose topsoil contains aerated pore spaces from excavation and handling. Once placed, graded, and watered, loose loam commonly consolidates—contractors frequently plan for an illustrative 10% to 15% settling allowance depending on initial moisture, organic fraction, and subgrade firmness.",
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
      { organization: "Cornell University Turfgrass Program", standardOrDocument: "Lawn Care: The Easiest Steps to an Attractive Environmental Asset", citation: "Cornell University College of Agriculture and Life Sciences.", url: "https://turf.cals.cornell.edu/lawn/lawn-care-the-easiest-steps-to-an-attractive-environmental-asset/" },
      { organization: "Penn State Extension", standardOrDocument: "Lawn Establishment: Preparing the Soil and Grading", citation: "Penn State Extension, College of Agricultural Sciences (Peter Landschoot, Ph.D.).", url: "https://extension.psu.edu/lawn-establishment" }
    ],
    faqs: [
      { question: "How much topsoil do I need for a 1,000 sq ft lawn?", answer: "At a standard 4-inch depth for new seeding or sod, 1,000 sq ft requires 12.35 cubic yards. With an illustrative 10% allowance for grade settling, order 13.6 cubic yards." },
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
      title: workedExampleFixtures["cubic-yard-calculator"].title,
      scenario: workedExampleFixtures["cubic-yard-calculator"].scenario,
      dimensions: workedExampleFixtures["cubic-yard-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["cubic-yard-calculator"].steps,
      finalSummary: workedExampleFixtures["cubic-yard-calculator"].finalSummary,
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
      { organization: "National Institute of Standards and Technology (NIST)", standardOrDocument: "Handbook 44: Specifications and Tolerances for Measuring Devices", citation: "U.S. Department of Commerce.", url: "https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks" },
      { organization: "U.S. Army Corps of Engineers (USACE)", standardOrDocument: "Engineer Manual EM 1110-1-1005: Control and Topographic Surveying (Chapter 8: Earthwork Volume Computations)", citation: "Washington, DC.", url: "https://www.publications.usace.army.mil/portals/76/publications/engineermanuals/em_1110-1-1005.pdf" }
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
      title: workedExampleFixtures["pea-gravel-calculator"].title,
      scenario: workedExampleFixtures["pea-gravel-calculator"].scenario,
      dimensions: workedExampleFixtures["pea-gravel-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["pea-gravel-calculator"].steps,
      finalSummary: workedExampleFixtures["pea-gravel-calculator"].finalSummary,
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
      { organization: "USDA Forest Service / Federal Highway Administration (FHWA)", standardOrDocument: "Trail Construction and Maintenance Notebook (0723-2806-MTDC): Tread Materials and Surfacing", citation: "U.S. Department of Agriculture & U.S. Department of Transportation.", url: "https://www.fhwa.dot.gov/environment/recreational_trails/publications/fs_publications/07232806/page09.cfm" }
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
      title: workedExampleFixtures["mulch-calculator"].title,
      scenario: workedExampleFixtures["mulch-calculator"].scenario,
      dimensions: workedExampleFixtures["mulch-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["mulch-calculator"].steps,
      finalSummary: workedExampleFixtures["mulch-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the bed borders. For foundation beds with curved cutouts, break into sections or measure average width.",
      depthGuidance: "Do not exceed 3 to 4 inches; excessively thick mulch prevents water infiltration and encourages roots to grow upward.",
      allowanceRecommendation: "Use 5% for clean trenched beds; use 10% for rough beds with deep tree roots.",
      packagingGuidance: "Most retail hardwood and cedar mulches are 2.0 cu ft; large pine bark nuggets are frequently 3.0 cu ft."
    },
    materialSpecifics: {
      compactionBehavior: "Loose shredded bark settles after initial rainfall and exposure; landscape planners commonly apply an illustrative 5% to 10% settling allowance. Wood bark mulches decompose organically over 1 to 2 seasons depending on wood species and climate, typically calling for shallow annual maintenance refreshes.",
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
      title: workedExampleFixtures["soil-calculator"].title,
      scenario: workedExampleFixtures["soil-calculator"].scenario,
      dimensions: workedExampleFixtures["soil-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["soil-calculator"].steps,
      finalSummary: workedExampleFixtures["soil-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the planting bed edges accurately. If the bed is terraced on a slope, measure the flat horizontal terrace run.",
      depthGuidance: "Enter the settled depth. For most annuals and perennials, 6 to 8 inches provides ample root development space.",
      allowanceRecommendation: "Add 10% for loose garden soil because organic matter consolidates when first saturated with water.",
      packagingGuidance: "Garden soil in retail bags is commonly sold in 1.0 or 1.5 cubic foot bags."
    },
    materialSpecifics: {
      compactionBehavior: "Enriched garden soil blends containing organic matter, peat, or compost have higher porosity than compacted native dirt. Loose blends commonly consolidate after initial deep waterings; gardeners and landscapers frequently choose an optional illustrative 10% to 15% planning allowance when ordering to account for settling, though actual consolidation depends on organic fraction, initial moisture, and hand-tamping.",
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
      { organization: "University of Maryland Extension", standardOrDocument: "Improving Garden Soils with Organic Matter", citation: "Home and Garden Information Center Publication HG-42.", url: "https://extension.umd.edu/resource/organic-matter-and-soil-amendments" }
    ],
    faqs: [
      { question: "What is the difference between topsoil and garden soil?", answer: "Topsoil is screened natural surface soil (sand, silt, and clay). Garden soil is topsoil enriched with organic matter (compost, peat, or aged manure) formulated for vegetable and flower growth." },
      { question: "How many cubic yards of soil do I need for a 10x10 garden?", answer: "For a 100 sq ft garden at a standard 6-inch depth, you need 1.85 cubic yards. With an illustrative 10% planning allowance for initial watering consolidation, order 2.0 cubic yards." },
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
      title: workedExampleFixtures["raised-bed-soil-calculator"].title,
      scenario: workedExampleFixtures["raised-bed-soil-calculator"].scenario,
      dimensions: workedExampleFixtures["raised-bed-soil-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["raised-bed-soil-calculator"].steps,
      finalSummary: workedExampleFixtures["raised-bed-soil-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure inside the wooden frame. 2-inch lumber is actually 1.5 inches thick, deducting 3 inches from both length and width.",
      depthGuidance: "Measure from the bottom to 1 or 2 inches below the top rim. Leaving freeboard prevents water and soil spillage when watering.",
      allowanceRecommendation: "Consider an optional 10% to 15% planning allowance for organic raised bed mixtures (compost and peat blends consolidate upon initial watering).",
      packagingGuidance: "Raised bed soil mixes are most commonly sold in 1.5 or 2.0 cubic foot bags."
    },
    materialSpecifics: {
      compactionBehavior: "High-porosity raised bed blends (e.g. peat, vermiculite, and compost mixtures) consolidate after several soaking water cycles. Gardeners commonly include an illustrative 10% to 15% ordering allowance to ensure soil remains near the desired root bed height after initial settling.",
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
      { organization: "Oregon State University Extension Service", standardOrDocument: "Constructing and Filling Raised Bed Planters (EM 9183)", citation: "Corvallis, OR.", url: "https://catalog.extension.oregonstate.edu/fs270" },
      { organization: "University of Florida IFAS Extension", standardOrDocument: "Raised Bed Gardening: Soil Mixtures and Dimensions (CIR 1282)", citation: "Gainesville, FL.", url: "https://gardeningsolutions.ifas.ufl.edu/design/types-of-gardens/raised-beds/" }
    ],
    faqs: [
      { question: "How many bags of soil do I need for a 4x8 raised bed at 12 inches?", answer: "A 4×8 bed (inside dimensions 3.75 ft × 7.75 ft) at 12 inches deep holds a neat volume of 29.1 cubic feet (1.08 cubic yards). If an illustrative 15% user planning allowance is selected for watering consolidation (29.1 × 1.15 = 33.5 cu ft), you need approximately seventeen 2-cubic-foot bags (or 1.24 cubic yards)." },
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
      "Add an illustrative 5% to 10% allowance for settling, raking variation, and moisture consolidation.",
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
      title: workedExampleFixtures["compost-calculator"].title,
      scenario: workedExampleFixtures["compost-calculator"].scenario,
      dimensions: workedExampleFixtures["compost-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["compost-calculator"].steps,
      finalSummary: workedExampleFixtures["compost-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the boundaries of the lawn or garden plot. For lawns, subtract driveway, patio, and building footprints.",
      depthGuidance: "Never apply more than 1/2 inch of compost over live grass in a single pass to avoid smothering green shoots.",
      allowanceRecommendation: "Add 5% for flat gardens; add 10% for aerated lawns because compost falls into aeration core holes.",
      packagingGuidance: "Quality bagged compost is commonly packed in 1.0 cu ft or 40 lb bags."
    },
    materialSpecifics: {
      compactionBehavior: "Compost is biologically active organic matter. Over a growing season, soil microorganisms and worms mineralize carbon, causing loose compost to settle and decompose—commonly estimated at an illustrative 15% to 30% seasonal volume reduction depending on temperature, moisture, and starting organic maturity.",
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
      { organization: "Washington State University Extension", standardOrDocument: "How to Use Compost in Gardens and Landscapes (EB1784)", citation: "Pullman, WA.", url: "https://pubs.extension.wsu.edu/backyard-composting-home-garden-series" }
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
      title: workedExampleFixtures["sand-calculator"].title,
      scenario: workedExampleFixtures["sand-calculator"].scenario,
      dimensions: workedExampleFixtures["sand-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["sand-calculator"].steps,
      finalSummary: workedExampleFixtures["sand-calculator"].finalSummary,
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
      { organization: "Concrete Masonry & Hardscapes Association (CMHA)", standardOrDocument: "Tech Spec 2 (PAV-TEC-002): Construction of Interlocking Concrete Pavements", citation: "Herndon, VA.", url: "https://www.cmha.org/resource/pav-tec-002/" }
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
    metaTitle: "Paver Base Calculator | Geometric Volume & Allowance Estimator",
    metaDescription: "Calculate geometric volume for patio and walkway aggregate base layers. Enter dimensions and depth, then apply your chosen allowance for loose-to-compacted ordering.",
    description: "Estimate geometric volume for a patio, walkway, or paver base layer from entered dimensions and design thickness. Users can apply an optional manual allowance based on project specifications or supplier recommendations to plan for loose-to-compacted bulk ordering.",
    cardDescription: "Estimate aggregate quantities for patios, paths and paver foundations.",
    icon: "▦",
    material: "Paver base aggregate",
    bestFor: ["Patio foundations", "Walkway base layers", "Paver project material planning"],
    formula: "Length (ft) × Width (ft) × Depth (in) ÷ 324 = Neat Geometric Volume (yd³). Estimated Order Volume = Geometric Volume × (1 + Allowance% ÷ 100). (Confirm compaction and waste allowances with your aggregate supplier or project specifications).",
    howTo: [
      "Measure your patio or walkway plan area, adding 6 inches of over-excavation beyond the paver edge on all sides.",
      "Enter design compacted depth (4 inches for walkways/patios on well-drained soil; 6 inches for residential driveways per CMHA PAV-TEC-002).",
      "Optionally include a planning allowance (confirm recommended loose-to-compacted factor with your supplier).",
      "Review the loose order volume in cubic yards and weight in short tons."
    ],
    quickAnswer: {
      directAnswer: "Per CMHA Tech Spec 2 (PAV-TEC-002), pedestrian walkways and residential patios on well-drained soils require a minimum 4-inch (100 mm) compacted base of dense-graded aggregate conforming to ASTM D2940 grading specifications, while residential vehicular driveways require a minimum 6-inch (150 mm) base on well-drained soils. For weaker clay soils (low California Bearing Ratio), poor drainage, freeze-thaw climates, or heavier vehicular loading, CMHA Tech Spec 4 (PAV-TEC-004) details engineered pavement design methods; base thicknesses in such conditions commonly range from 8 to 12 inches or more based on site-specific soil testing and traffic analysis. Always consult local building officials or a project engineer for structural pavement designs. This calculator determines neat geometric volume from plan dimensions and design depth (81.0 sq ft per cubic yard at 4 inches). Because mechanical plate compaction consolidates loose aggregate, users may apply an optional manual planning allowance to estimate loose bulk ordering.",
      ruleOfThumb: "A 200 sq ft patio at 4 inches depth requires 2.47 cubic yards of neat base. If the user applies an illustrative 20% manual planning allowance, the estimated order volume is 2.96 cubic yards (approx. 4.1 tons at 1.4 tons/yd³).",
      tableCaption: "Paver Base Depth & Geometric Coverage Benchmarks (Neat Volume)",
      benchmarkTable: [
        { depth: "4.0 inches (10 cm)", coverageSqFt: "81.0 sq ft / yd³", coverageSqM: "7.5 m²", typicalUse: "Pedestrian walkway & residential patio base on well-drained soil (CMHA PAV-TEC-002 minimum)" },
        { depth: "6.0 inches (15 cm)", coverageSqFt: "54.0 sq ft / yd³", coverageSqM: "5.0 m²", typicalUse: "Residential driveway base on well-drained soil (CMHA PAV-TEC-002 minimum); heavy concentrated patio loads" },
        { depth: "8.0 inches (20 cm)", coverageSqFt: "40.5 sq ft / yd³", coverageSqM: "3.8 m²", typicalUse: "Driveway base on low-strength subgrade or heavier passenger traffic (CMHA PAV-TEC-004 structural design)" },
        { depth: "12.0 inches (30 cm)", coverageSqFt: "27.0 sq ft / yd³", coverageSqM: "2.5 m²", typicalUse: "Heavy vehicular access, low CBR clay subgrade, or commercial parking (CMHA PAV-TEC-004 structural design)" }
      ]
    },
    formulaExplanation: {
      usCustomary: "Base Volume (yd³) = Area (ft²) × Depth (in) ÷ 324. Order Volume = Base Volume × (1 + Allowance% ÷ 100)",
      metric: "Base Volume (m³) = Area (m²) × Depth (cm) ÷ 100. Order Volume = Base Volume × (1 + Allowance% ÷ 100)",
      dimensionalExplanation: "The calculator computes exact neat geometric volume from your input dimensions. Compaction behavior varies with aggregate gradation, moisture, and compaction effort (ASTM D2940 governs grading and quality requirements, not a fixed shrinkage percentage). Users planning for vibratory compaction should enter an optional allowance in calculator settings based on supplier or site specifications.",
      circleNote: "For round patios: Area = π × [(Diameter + 1.0 ft over-excavation) ÷ 2]².",
      triangleNote: "For triangular layouts: Area = (Base × Height) ÷ 2."
    },
    workedExample: {
      title: workedExampleFixtures["paver-base-calculator"].title,
      scenario: workedExampleFixtures["paver-base-calculator"].scenario,
      dimensions: workedExampleFixtures["paver-base-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["paver-base-calculator"].steps,
      finalSummary: workedExampleFixtures["paver-base-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Always extend your base area 6 inches beyond the paver perimeter on all sides to anchor edge restraints firmly.",
      depthGuidance: "Compact base in lifts no thicker than 2 inches at a time; plate compactors cannot consolidate thicker lifts thoroughly.",
      allowanceRecommendation: "The calculator computes neat geometric volume with a 0% default allowance. If your site conditions, excavation tolerance, or aggregate supplier suggest accounting for loose-to-compacted consolidation, enter your chosen percentage in the extra allowance field (e.g. 10% to 20% as an illustrative planning figure).",
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
        mistake: "Omitting an allowance for compaction and jobsite variation",
        impact: "Ordering exact neat geometric volume without an allowance can leave a project short after mechanical plate compaction consolidates loose aggregate.",
        prevention: "Consult your aggregate supplier for the loose-to-compacted yield ratio of their material and set the calculator allowance accordingly."
      }
    ],
    authoritativeSources: [
      { organization: "Concrete Masonry & Hardscapes Association (CMHA)", standardOrDocument: "Tech Spec 2 (PAV-TEC-002): Construction of Interlocking Concrete Pavements", citation: "Herndon, VA.", url: "https://www.cmha.org/resource/pav-tec-002/" },
      { organization: "Concrete Masonry & Hardscapes Association (CMHA)", standardOrDocument: "Tech Spec 4 (PAV-TEC-004): Structural Design of Interlocking Concrete Pavements", citation: "Herndon, VA.", url: "https://www.cmha.org/resource/pav-tec-004/" },
      { organization: "ASTM International", standardOrDocument: "ASTM D2940 / D2940M-20: Standard Specification for Graded Aggregate Material for Bases or Subbases", citation: "West Conshohocken, PA.", url: "https://www.astm.org/d2940_d2940m-20.html" }
    ],
    faqs: [
      { question: "How thick should paver base be?", answer: "Per CMHA PAV-TEC-002, pedestrian walkways and residential patios on well-drained subgrades require a minimum of 4 inches (100 mm) of compacted aggregate base, and residential driveways on well-drained soil require a minimum of 6 inches (150 mm). For poor-draining or low-bearing clay subgrades, freeze-thaw exposure, or heavy vehicle traffic, base thickness cannot be assumed from a single rule of thumb and should be engineered according to CMHA PAV-TEC-004 (where structural designs often call for 8 to 12 inches or deeper). Always verify local soil bearing capacity and structural requirements with an engineer or municipal building code." },
      { question: "What is the best material for a paver base?", answer: "Dense-graded aggregate containing 3/4-inch fractured stone down to stone dust (sold as Crusher Run, #411, CR-6, Road Base, or Quarry Process) is the industry standard." },
      { question: "Can I use sand instead of crushed stone for the base?", answer: "No. Sand shifts and washes away under water and foot traffic. Sand is used only as a thin 1-inch bedding layer on top of a firm crushed aggregate base." },
      { question: "How many tons of paver base do I need for a 10x10 patio?", answer: "A 10×10 patio (11×11 with 6-inch over-excavation = 121 sq ft) at 4 inches compacted depth requires 1.49 cubic yards of neat base. If an illustrative 20% user allowance is added, order volume is approximately 1.8 cubic yards, which weighs roughly 2.5 short tons (5,000 lbs at 1.4 tons/yd³)." }
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
    formula: "Neat Volume: Length (ft) × Width (ft) × Depth (in) ÷ 324 = Cubic Yards. Order Volume = Neat Volume × (1 + Allowance% ÷ 100). Weight (tons) = Cubic Yards × 1.35 to 1.45 tons/yd³.",
    howTo: [
      "Measure the length of your driveway and its average width in feet.",
      "Enter the intended depth for the single layer you are currently calculating (run the calculator separately for each distinct layer in a multi-tier profile).",
      "Select an optional planning allowance (e.g. 5% to 15%) if you wish to account for subgrade irregularities, loose-to-compacted consolidation, or wheel spillage.",
      "Review the total in loose cubic yards and estimated quarry weight (tons)."
    ],
    quickAnswer: {
      directAnswer: "This calculator evaluates a single aggregate layer at a time. For refreshing an existing driveway, a 1.5-to-2-inch surface replenishment layer is an illustrative planning figure. For constructing a new gravel driveway, total aggregate thickness is highly site-dependent and governed by native subgrade bearing capacity (CBR), site drainage, vehicle axle loads, and local frost depth. While an illustrative 4-to-6-inch single dense-graded course is often evaluated for passenger cars over firm, well-draining native soil, it should not be assumed universally sufficient for all installations. Demanding conditions—such as soft clay, poor drainage, or heavy truck access—frequently justify an engineered multi-tier profile combining coarse foundation ballast, a dense-graded base, and a dedicated wearing course. Calculate each layer separately using its specific depth, optional allowance, and supplier density.",
      ruleOfThumb: "A standard 100 ft × 10 ft driveway (1,000 sq ft) resurfaced with an illustrative 2 inches of gravel has a neat volume of 6.17 cubic yards (approx. 8.6 tons of crushed stone at 1.4 tons/yd³); adding an optional 10% planning allowance yields ~6.8 cubic yards (approx. 9.5 tons).",
      tableCaption: "Driveway Gravel Layer Guidelines & Material Sizing",
      benchmarkTable: [
        { depth: "1.5 to 2.0 in (3.8 to 5 cm)", coverageSqFt: "162 to 216 sq ft / yd³", coverageSqM: "15 to 20 m²", typicalUse: "Surface top-dress with open-graded stone (#57 washed crushed limestone/granite for drainage and traction)" },
        { depth: "3.0 to 4.0 in (7.5 to 10 cm)", coverageSqFt: "81 to 108 sq ft / yd³", coverageSqM: "7.5 to 10 m²", typicalUse: "Dense-graded binding base or wearing course (Crusher Run / #411 with fines that compacts into a tight crust)" },
        { depth: "6.0 in (15 cm)", coverageSqFt: "54 sq ft / yd³", coverageSqM: "5.0 m²", typicalUse: "Illustrative heavy sub-base foundation stone (#3 or #4 ballast over weak subgrades)" },
        { depth: "8.0 to 12.0 in (20 to 30 cm)", coverageSqFt: "27 to 40.5 sq ft / yd³", coverageSqM: "2.5 to 3.8 m²", typicalUse: "Illustrative multi-tier total profile for low-bearing soils or heavy truck access (requires site-specific engineering)" }
      ]
    },
    formulaExplanation: {
      usCustomary: "1. Neat Volume: Cubic Yards = Length (ft) × Width (ft) × Layer Depth (in) ÷ 324\n2. Order Volume: Neat Volume × (1 + Allowance% ÷ 100)",
      metric: "1. Neat Volume: Cubic Metres = Length (m) × Width (m) × Layer Depth (cm) ÷ 100\n2. Order Volume: Neat Volume × (1 + Allowance% ÷ 100)",
      dimensionalExplanation: "Length (ft) × Width (ft) gives surface area in square feet. Multiplying by layer depth in inches and dividing by 324 calculates neat geometric volume in cubic yards. Applying an optional user-selected planning allowance yields total order volume. Multiplying cubic yards by your supplier's bulk density (typically 1.35 to 1.45 tons/yd³) estimates quarry delivery weight in short tons.",
      circleNote: "For circular turnaround areas: Area = π × (Diameter ÷ 2)².",
      triangleNote: "For driveway entrance flares: Area = (Flare Base × Flare Length) ÷ 2."
    },
    workedExample: {
      title: workedExampleFixtures["gravel-driveway-calculator"].title,
      scenario: workedExampleFixtures["gravel-driveway-calculator"].scenario,
      dimensions: workedExampleFixtures["gravel-driveway-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["gravel-driveway-calculator"].steps,
      finalSummary: workedExampleFixtures["gravel-driveway-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the center length and take width measurements at multiple points; gravel driveways frequently spread wider near the road entrance.",
      depthGuidance: "Calculate base layers and surface layers separately; never combine them into a single mathematical pass because stone sizes and compaction rates differ.",
      allowanceRecommendation: "Allowances are optional user selections. For refreshing an existing hard gravel drive, a 5% to 10% allowance is an illustrative figure to cover minor low spots and edge loss. For dense-graded base stone over uncompacted soil, contractors often plan an illustrative 15% to 20% allowance for roller consolidation and subgrade intrusion. Actual aggregate yield depends on stone gradation, moisture, subgrade firmness, lift thickness, and compaction equipment; verify expected yields with your local aggregate supplier.",
      packagingGuidance: "Driveway aggregate is delivered exclusively in bulk dump truck loads (single-axle ~6 tons; tri-axle ~15–18 tons)."
    },
    materialSpecifics: {
      compactionBehavior: "Dense-graded base stone consolidation varies with quarry gradation and moisture; contractors commonly plan for an optional illustrative 15% to 20% compaction allowance when ordering loose volume. Open-graded washed stone (#57) contains minimal fines and undergoes minor reorientation—often estimated with an optional ~5% planning allowance—though actual yield depends on subgrade firmness and rolling equipment.",
      moistureAndWeight: "Crushed limestone and granite weigh between 2,700 and 2,900 lb/yd³ (1.35 to 1.45 tons/yd³).",
      subgradePreparation: "For public unpaved roads, the FHWA Gravel Roads Guide recommends a crown of approximately 1/2 inch per linear foot (~4% cross slope) to shed water rapidly, warning that flatter surfaces allow potholes to form while steeper slopes create vehicle-handling hazards. On private residential driveways, grading must establish positive cross-slope drainage to direct runoff into stable swales, but the specific slope must balance drainage requirements with site terrain, garage apron transitions, and winter traction safety.",
      orderingRule: "On soft, fine-grained, or moisture-sensitive subgrades, installing a geotextile separation layer between native soil and aggregate preserves base thickness and prevents subgrade pumping. Per FHWA geotechnical guidance (FHWA-NHI-05-037), both woven and non-woven geotextiles can perform separation; selection depends on subgrade soil retention (filtration compatibility), cross-plane permeability, aggregate puncture survivability during installation, and whether in-plane drainage (which certain non-woven products provide) or tensile modulus is required. Over firm, rocky, or well-drained native ground, separation fabric is generally unnecessary."
    },
    commonMistakes: [
      {
        mistake: "Pouring surface gravel directly on bare mud or dirt",
        impact: "Vehicle tires immediately pump stone into the mud, causing deep ruts, tire spin, and disappearing gravel.",
        prevention: "On soft or wet subgrades, install a geotextile separation layer beneath the base course; select woven or non-woven fabric based on soil filtration retention, water permeability, in-plane drainage needs, and aggregate puncture survivability rather than assuming a simplistic one-to-one fabric assignment. On firm, well-draining ground, fabric is typically unnecessary."
      },
      {
        mistake: "Building a flat driveway with no centerline crown",
        impact: "Rainwater pools on the surface; moving vehicle tires create hydraulic action that ejects stone dust, carving deep potholes.",
        prevention: "For dense-graded unpaved surfaces, establish positive cross-slope drainage (FHWA recommends approximately 1/2 inch per foot / 4% on public unpaved roads; adapt for private driveway geometry, garage tie-ins, and winter driving safety) to direct stormwater into swales before puddles can form."
      },
      {
        mistake: "Using round river rock or pea gravel on vehicle drives",
        impact: "Round pebbles act like ball bearings under car tires, sliding away and creating impassable wheel ruts.",
        prevention: "Use angular, fractured quarry aggregate: choose open-graded stone (#57) for drainage and surface traction, or dense-graded aggregate with fines (such as Crusher Run or DSA) that compacts into an interlocked, rut-resistant driving crust."
      }
    ],
    authoritativeSources: [
      { organization: "Federal Highway Administration (FHWA)", standardOrDocument: "Gravel Roads Construction and Maintenance Guide (FHWA-FLH-15-004)", citation: "U.S. Department of Transportation.", url: "https://www.fhwa.dot.gov/pavement/pub_details.cfm?id=968" },
      { organization: "Penn State Center for Dirt and Gravel Road Studies", standardOrDocument: "Technical Bulletin: Driving Surface Aggregate (DSA) Specifications and Maintenance", citation: "Pennsylvania State University College of Agricultural Sciences.", url: "https://dirtandgravel.psu.edu/wp-content/uploads/Tech-Bulletin_Driving_Surface_Aggregate_2025.pdf" }
    ],
    faqs: [
      { question: "How many tons of gravel do I need for a 100-foot driveway?", answer: "For a 100 ft long by 10 ft wide driveway (1,000 sq ft) with an illustrative 2-inch resurfacing layer, neat geometric volume is 6.17 cubic yards (approx. 8.6 tons at 1.4 tons/yd³). If you select an optional 10% allowance for subgrade dips and edge spreading, order volume increases to approx. 6.8 cubic yards (approx. 9.5 tons)." },
      { question: "What is the best gravel size for a driveway surface?", answer: "Driveway wearing courses vary based on climate, slope, and whether surface binding or free drainage is desired. Clean angular gravel like #57 stone (approx. 3/4-inch washed stone) provides good traction and drainage, but loose unbonded stone can shift on steep grades. Dense-graded aggregate mixtures containing fines (such as Driving Surface Aggregate or quarry process stone) bind tightly when compacted to form a semi-impervious, rut-resistant surface, though they require positive crown drainage to prevent softening during heavy rain." },
      { question: "How thick should a new gravel driveway be?", answer: "There is no single universal thickness for all driveways. Total aggregate thickness depends on vehicle traffic volume and axle loads, native subgrade bearing capacity (CBR), site drainage, and local freeze-thaw depth. While an illustrative 4-to-6-inch single dense-graded course is often considered for light passenger use over stable, well-drained soils, it should not be assumed universally sufficient for all residential conditions without evaluating site subgrade firmness. Weak, wet, or low-bearing clay soils frequently require an 8-to-12-inch multi-tier profile (e.g., coarse ballast sub-base, dense-graded base, and surface wearing course) over geotextile separation fabric (where both woven and non-woven products may be specified based on soil retention, permeability, and survivability criteria). For surface drainage, the FHWA Gravel Roads Guide recommends an unpaved road crown of approximately 1/2 inch per foot (4% cross slope) to prevent ponding without creating vehicle-handling hazards, though private residential driveway grading must be tailored to site topography and safe vehicular access." },
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
    formula: "Neat Volume: Length (ft) × Width (ft) × Thickness (in) ÷ 324 = Cubic Yards. Estimated Order Volume = Neat Volume × (1 + Allowance% ÷ 100). Bag count = Order Cubic Feet ÷ Manufacturer Printed Bag Yield.",
    howTo: [
      "Measure internal formwork length and width in feet (use cylinder mode for round sonotubes/post holes).",
      "Enter the engineered pour thickness in inches based on your project requirements (note: nominal 2x4 form lumber measures 3.5 inches dressed, which sets form edge height rather than determining structural thickness).",
      "Select an optional order allowance (e.g. 5% to 10%) to account for formwork deflection, subgrade variations, and spillage.",
      "Review the total in cubic yards, cubic metres, or bags by entering your bag's printed volumetric yield (e.g. 0.60 cu ft for 80 lb; 0.45 cu ft for 60 lb) into the Pack Volume field."
    ],
    quickAnswer: {
      directAnswer: "For common illustrative residential slabs (such as garden walkways or light patios), a nominal 4.0-inch pour thickness is frequently modeled, yielding 81.0 sq ft per cubic yard. However, actual slab thickness and compressive strength (commonly 2,500 to 4,000+ PSI) must be specified based on local building code, subgrade bearing support, intended vehicle or equipment loads, and environmental exposure. Multiply slab length (ft) by width (ft) by thickness (in) and divide by 324 to calculate neat cubic yards. At standard bag yields (0.60 cu ft for 80 lb; 0.45 cu ft for 60 lb), 1 cubic yard requires 45 eighty-pound bags or 60 sixty-pound bags; enter your bag's printed yield to calculate exact package quantities.",
      ruleOfThumb: "A standard 10 ft × 10 ft patio slab at 4 inches thick (100 sq ft) requires 1.23 cubic yards of neat concrete (or 1.36 cubic yards if an optional 10% user planning allowance is selected, requiring 62 eighty-pound bags).",
      tableCaption: "Concrete Slab Volume & Bag Yield Benchmarks",
      benchmarkTable: [
        { depth: "3.5 inches (8.9 cm)", coverageSqFt: "92.6 sq ft / yd³", coverageSqM: "8.6 m² / yd³", typicalUse: "Common form height using dressed 2x4 edge lumber; illustrative light garden paths where permitted by local code" },
        { depth: "4.0 inches (10.2 cm)", coverageSqFt: "81.0 sq ft / yd³", coverageSqM: "7.5 m² / yd³", typicalUse: "Illustrative residential patio, walkway, or light shed pad (verify local code and subgrade bearing)" },
        { depth: "5.0 inches (12.7 cm)", coverageSqFt: "64.8 sq ft / yd³", coverageSqM: "6.0 m² / yd³", typicalUse: "Passenger vehicle residential driveway" },
        { depth: "6.0 inches (15.2 cm)", coverageSqFt: "54.0 sq ft / yd³", coverageSqM: "5.0 m² / yd³", typicalUse: "Heavy RV parking pad, workshop floor, reinforced slab" },
        { depth: "8.0 to 12.0 inches", coverageSqFt: "27.0 to 40.5 sq ft / yd³", coverageSqM: "2.5 to 3.8 m²", typicalUse: "Commercial equipment footers & grade beams" }
      ]
    },
    formulaExplanation: {
      usCustomary: "1. Neat Volume: Cubic Yards = Length (ft) × Width (ft) × Thickness (in) ÷ 324\n2. Order Volume: Neat Volume × (1 + Allowance% ÷ 100)",
      metric: "1. Neat Volume: Cubic Metres = Length (m) × Width (m) × Thickness (cm) ÷ 100\n2. Order Volume: Neat Volume × (1 + Allowance% ÷ 100)",
      dimensionalExplanation: "Neat geometric volume converts planar area and slab thickness into cubic yards (dividing by 324) or cubic metres (dividing by 100). Project order volume applies a user-selected allowance to buffer against formwork deflection, subgrade unevenness, or batch minimums.",
      circleNote: "For round post holes or cylindrical columns: Neat Volume (cu ft) = π × (Diameter in ft ÷ 2)² × Depth in ft. Divide by 27 for cubic yards.",
      triangleNote: "For triangular pads: Neat Volume (cu ft) = [(Base in ft × Height in ft) ÷ 2] × (Thickness in in ÷ 12). Divide by 27 for cubic yards."
    },
    workedExample: {
      title: workedExampleFixtures["concrete-calculator"].title,
      scenario: workedExampleFixtures["concrete-calculator"].scenario,
      dimensions: workedExampleFixtures["concrete-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["concrete-calculator"].steps,
      finalSummary: workedExampleFixtures["concrete-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the inside faces of your wooden form boards. Form boards must be securely braced with wooden stakes every 2 feet.",
      depthGuidance: "Formwork dimensions establish the perimeter pour height, not the engineered suitability of the slab. Dressed 2x4 lumber measures 3.5 inches; specify slab thickness based on structural loading, subgrade conditions, and local code rather than form board size alone.",
      allowanceRecommendation: "Consider an optional allowance (commonly 5% to 10%) to account for formwork deflection, subgrade variations, and spillage. Running short by even one wheelbarrow load risks unsightly and structurally weak cold joints, so ordering buffers should be selected based on job complexity and supplier minimum batch increments.",
      packagingGuidance: "Standard bag yields: an 80 lb bag yields 0.60 cu ft; a 60 lb bag yields 0.45 cu ft; a 50 lb bag yields 0.375 cu ft."
    },
    materialSpecifics: {
      compactionBehavior: "Fresh wet concrete does not compress like soil, but internal air pockets must be consolidated with a screed and bull float to eliminate honeycombing.",
      moistureAndWeight: "Cured standard concrete weighs approximately 145 to 150 lb/cu ft (3,900 to 4,050 lb/yd³ or 2,400 kg/m³).",
      subgradePreparation: "Never pour concrete directly over uncompacted subgrade, topsoil, or organic matter; ACI 302.1R emphasizes a uniform, well-drained, compacted granular subbase to provide consistent slab support and prevent uneven settlement.",
      orderingRule: "For projects requiring more than 1.5 cubic yards (68 bags of 80 lb), order ready-mix delivery by truck to avoid mixing fatigue."
    },
    commonMistakes: [
      {
        mistake: "Assuming a 2x4 form board establishes an engineered 4.0-inch slab",
        impact: "Dressed 2x4s are 3.5 inches wide. Relying on form height alone without excavating or blocking yields a 3.5-inch pour that may fall short of 4-inch code or structural specifications.",
        prevention: "Set form elevation to achieve your engineered slab depth, measuring from the compacted subbase to the top screed line."
      },
      {
        mistake: "Ordering exact volume with zero allowance",
        impact: "Running short near the end of a pour leaves a missing corner or an ugly structural cold joint while scrambling for bags.",
        prevention: "Evaluate formwork rigidity and subgrade variations to select an appropriate ordering allowance (e.g. 5% to 10%), or keep 2 to 3 spare bags on site as an emergency reserve."
      },
      {
        mistake: "Attempting to hand-mix more than 1.5 cubic yards",
        impact: "Mixing 70+ heavy bags takes hours. The first batches begin setting and stiffening before the final batch is poured.",
        prevention: "Call a ready-mix concrete plant whenever project requirements exceed 1 to 1.5 cubic yards."
      }
    ],
    authoritativeSources: [
      { organization: "American Concrete Institute (ACI)", standardOrDocument: "ACI 302.1R-15: Guide to Concrete Floor and Slab Construction", citation: "Farmington Hills, MI.", url: "https://www.concrete.org/store/productdetail.aspx?ItemID=302115" },
      { organization: "Portland Cement Association (PCA)", standardOrDocument: "Design and Control of Concrete Mixtures (EB001)", citation: "Skokie, IL.", url: "https://www.cement.org/cement-concrete/" }
    ],
    faqs: [
      { question: "How many 80 lb bags of concrete make a cubic yard?", answer: "It takes exactly 45 bags of 80 lb concrete mix to equal one cubic yard (27 cubic feet), because each 80 lb bag yields 0.60 cubic feet (27 ÷ 0.60 = 45)." },
      { question: "How many 60 lb bags of concrete make a cubic yard?", answer: "It takes exactly 60 bags of 60 lb concrete mix to equal one cubic yard (27 cubic feet), because each 60 lb bag yields 0.45 cubic feet (27 ÷ 0.45 = 60)." },
      { question: "How much concrete do I need for a 10x10 slab at 4 inches?", answer: "A 10×10 slab at 4 inches thick has a neat geometric volume of 1.23 cubic yards. If an optional 10% planning allowance is selected for formwork flex and grade variation, order volume is approximately 1.36 cubic yards (requiring 62 bags of 80 lb mix)." },
      { question: "Do I need a gravel or crushed stone base under a concrete slab?", answer: "An aggregate subbase is commonly placed under residential slabs to provide uniform subgrade support, a capillary moisture break, and frost protection (4 inches is often cited as an illustrative residential reference). However, required base thickness depends on native soil bearing strength, moisture, expected loads, local climate, and project engineering—and must be evaluated separately from the structural concrete slab thickness." },
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
      title: workedExampleFixtures["crushed-stone-calculator"].title,
      scenario: workedExampleFixtures["crushed-stone-calculator"].scenario,
      dimensions: workedExampleFixtures["crushed-stone-calculator"].dimensionsDescription,
      steps: workedExampleFixtures["crushed-stone-calculator"].steps,
      finalSummary: workedExampleFixtures["crushed-stone-calculator"].finalSummary,
    },
    inputsGuide: {
      lengthWidth: "Measure the trench or pad boundaries accurately with a steel tape measure.",
      depthGuidance: "Enter the thickness for the crushed stone layer only. If layering different stone grades, calculate each layer independently.",
      allowanceRecommendation: "Add 10% for excavated trenches because natural soil walls are never perfectly plumb.",
      packagingGuidance: "Crushed stone is sold by the ton in bulk, or in 50 lb bags (approx. 0.45 cu ft each)."
    },
    materialSpecifics: {
      compactionBehavior: "Washed crushed stone (like ASTM #57) has a relatively uniform particle size without fine dust; particle reorientation under vibration is limited, so contractors frequently use an optional ~5% planning allowance. Dense-graded stone (#411 / Crusher Run) contains a wide distribution of particle sizes down to stone dust; depending on moisture and vibratory compaction effort, ordering allowances commonly range from an illustrative 10% to 20% to account for in-place consolidation.",
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
      { organization: "ASTM International", standardOrDocument: "ASTM D448-12(2022): Standard Classification for Sizes of Aggregate for Road and Bridge Construction", citation: "West Conshohocken, PA.", url: "https://www.astm.org/d0448-12r22.html" },
      { organization: "National Stone, Sand & Gravel Association (NSSGA) / SME", standardOrDocument: "The Aggregates Handbook (2nd Edition): Gradation, Physical Properties and Structural Design", citation: "Society for Mining, Metallurgy, and Exploration / NSSGA.", url: "https://www.smenet.org/docs/public/aggregateshandbooksellsheet.pdf" }
    ],
    faqs: [
      { question: "How many tons is 1 cubic yard of crushed stone?", answer: "One cubic yard of crushed stone typically weighs between 1.35 and 1.45 short tons (2,700 to 2,900 lbs). A safe planning estimate is 1.4 tons per cubic yard." },
      { question: "What is the difference between #57 stone and Crusher Run?", answer: "#57 stone is washed crushed rock (about 3/4-inch) with all fine dust removed, allowing water to drain freely. Crusher Run (also called #411 or road base) includes all fine stone dust, which packs tightly to form a solid, impervious foundation." },
      { question: "How many 50 lb bags of crushed stone are in a cubic yard?", answer: "Because one cubic yard weighs roughly 2,700 lbs, it takes 54 fifty-pound bags to equal one cubic yard." },
      { question: "How deep should crushed stone be under a concrete slab?", answer: "A 4-inch layer of compacted granular base is commonly specified as an illustrative residential reference to provide uniform support and capillary break drainage. However, there is no single universal thickness: required base depth depends on subgrade bearing strength, moisture conditions, expected vehicle or structural loads, frost-heave depth, and local building codes. Concrete slab thickness must always be evaluated separately from the aggregate subbase thickness." }
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
