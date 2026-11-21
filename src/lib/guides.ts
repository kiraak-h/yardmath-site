import type { ToolSlug } from "./tools";

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  formulaBox?: {
    title: string;
    formula: string;
    note?: string;
  };
  table?: {
    caption?: string;
    headers: string[];
    rows: string[][];
  };
  callout?: {
    type: "tip" | "warning" | "note";
    title: string;
    text: string;
  };
};

export type GuideDefinition = {
  slug: string;
  title: string;
  shortTitle: string;
  kicker: string;
  description: string;
  publishedDate: string;
  revisedDate: string;
  readTime: string;
  category: "Soil & Garden" | "Aggregate & Stone" | "Measurement & Math" | "Construction";
  summary: string;
  keyTakeaways: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  sources: { title: string; publisher: string; citation: string }[];
  relatedTools: ToolSlug[];
  relatedGuides: string[];
};

export const guides: GuideDefinition[] = [
  {
    slug: "how-to-measure-landscaping-materials",
    title: "How to Measure a Landscaping Area and Calculate Material Volume",
    shortTitle: "Measuring Landscaping Areas",
    kicker: "FIELD GUIDE · MEASUREMENT BASICS",
    description: "Learn how to measure rectangles, circles, and triangles, select appropriate depth units, divide irregular spaces, and convert plan dimensions into cubic yards and cubic metres.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "7 min read",
    category: "Measurement & Math",
    summary: "Accurate bulk material estimation begins with sound physical measurements. This guide details field measurement techniques for regular and irregular geometric areas, mathematical conversion factors for imperial and metric units, and ordering allowances.",
    keyTakeaways: [
      "Always measure the plan area using consistent boundary lines; for planters and raised beds, measure inside edges.",
      "The US customary volume divisor is 324: area (sq ft) × depth (in) ÷ 324 = cubic yards.",
      "The metric volume divisor is 100: area (sq m) × depth (cm) ÷ 100 = cubic metres.",
      "Irregular areas should be segmented into non-overlapping geometric shapes rather than guessed as a single polygon.",
      "Order allowances (typically 5% to 15%) account for grade variation and subgrade settling, not compaction models."
    ],
    sections: [
      {
        heading: "1. The Fundamental Volume Equation",
        paragraphs: [
          "Every bulk landscaping material calculation follows a single geometric principle: horizontal plan area multiplied by vertical layer depth equals cubic volume. Regardless of whether you are ordering topsoil, crushed stone, mulch, or concrete, you are purchasing three-dimensional space.",
          "Confusion typically arises when mixing dimensional units. In the United States, site boundaries are measured in linear feet, while layer depth is specified in inches, and suppliers quote prices in cubic yards. In metric jurisdictions, areas are measured in square metres, depths in centimetres, and bulk quantities in cubic metres."
        ],
        formulaBox: {
          title: "Standard Volume Formulas",
          formula: "Imperial: Cubic Yards = Area (ft²) × Depth (in) ÷ 324\nMetric: Cubic Metres = Area (m²) × Depth (cm) ÷ 100",
          note: "324 is derived from 27 cubic feet per cubic yard multiplied by 12 inches per foot (27 × 12 = 324)."
        }
      },
      {
        heading: "2. Measuring Regular Shapes: Rectangles, Circles, and Triangles",
        paragraphs: [
          "For rectangular and square beds, measure length and width at multiple points to verify parallel boundaries. Uneven ground frequently conceals tapered borders.",
          "For circular spaces—such as fire-pit rings, decorative circular planters, or tree aprons—measure the full diameter across the widest central point. Measuring radius in the field is prone to center-point placement errors.",
          "For triangular sections—such as corner planting beds or driveway flares—measure the straight base edge and the true perpendicular height from the base to the opposite apex (not the angled hypotenuse)."
        ],
        table: {
          caption: "Plan Area Geometric Formulas",
          headers: ["Shape", "Field Measurements Required", "Area Formula", "Worked Example (10 ft base dimension)"],
          rows: [
            ["Rectangle", "Length (L) and Width (W)", "L × W", "20 ft × 10 ft = 200 sq ft"],
            ["Circle", "Full Diameter (D)", "π × (D ÷ 2)²", "π × (10 ft ÷ 2)² = 78.54 sq ft"],
            ["Triangle", "Base (B) and Perpendicular Height (H)", "(B × H) ÷ 2", "(10 ft × 8 ft) ÷ 2 = 40 sq ft"]
          ]
        }
      },
      {
        heading: "3. Handling Depth and Grade Variations",
        paragraphs: [
          "Finished layer depth should be determined from horticultural recommendations, structural paving specifications, or manufacturer instructions—not guessed.",
          "Natural ground is rarely level. When estimating an uneven lawn or newly graded excavation, take depth readings at 5 to 10 representative points using a wooden survey stake and line level, then calculate the arithmetic mean. Applying a single maximum depth across an entire area leads to significant over-ordering."
        ]
      },
      {
        heading: "4. Applying an Extra-Material Allowance",
        paragraphs: [
          "An allowance is a contingency buffer applied to the base geometric volume. It compensates for minor ground undulations, wheelbarrow spillage, boundary trimming, and natural settling.",
          "A 5% allowance is standard for clean, hard-edged installations (such as framed raised beds or timber-edged walkways). A 10% to 15% allowance is recommended for rough earthworks, sloping lawn top-dressing, or excavations in stony soil."
        ],
        callout: {
          type: "warning",
          title: "Allowance vs. Compaction",
          text: "An allowance percentage is not a compaction factor. Materials like aggregate base and Crusher Run decrease in volume by 15% to 20% under vibratory plate compaction. That mechanical compaction requirement must be calculated separately from surface allowance."
        }
      }
    ],
    faqs: [
      {
        question: "Why divide by 324 to calculate cubic yards?",
        answer: "One cubic yard equals 27 cubic feet (3 ft × 3 ft × 3 ft). One cubic foot contains 12 board feet of 1-inch-thick volume (1 ft × 1 ft × 1/12 ft = 1/12 cu ft). Therefore, one cubic yard contains 27 × 12 = 324 square feet at a depth of exactly 1 inch."
      },
      {
        question: "How do I measure an irregular, curved garden bed?",
        answer: "You can divide the bed into smaller geometric shapes (rectangles and semi-circles), or use the offset baseline method: run a straight reference line along the longest dimension and measure perpendicular offsets to the boundary at fixed 5-foot intervals."
      },
      {
        question: "Should I measure raised beds from the outside or inside?",
        answer: "Always measure the inside dimensions. Using outside dimensions counts the thickness of the framing timbers (typically 1.5 to 3 inches on all sides), which can inflate your soil estimate by 8% to 15% depending on bed size."
      }
    ],
    sources: [
      { title: "Agronomy Facts 62: Estimating Soil and Amendment Quantities", publisher: "Penn State Extension", citation: "Pennsylvania State University College of Agricultural Sciences." },
      { title: "National Engineering Handbook, Part 642: Measurement of Areas and Earthwork", publisher: "USDA Natural Resources Conservation Service (NRCS)", citation: "United States Department of Agriculture." }
    ],
    relatedTools: ["cubic-yard-calculator", "topsoil-calculator", "mulch-calculator", "crushed-stone-calculator"],
    relatedGuides: ["cubic-yards-vs-cubic-feet", "measuring-irregular-landscaping-areas", "how-much-topsoil-do-i-need"]
  },
  {
    slug: "how-much-topsoil-do-i-need",
    title: "How Much Topsoil Do I Need? Depth Standards and Volume Calculations",
    shortTitle: "Topsoil Needs & Depth Standards",
    kicker: "FIELD GUIDE · LAWN & GARDEN",
    description: "Determine the exact topsoil volume required for lawn top-dressing, new turf establishment, garden grading, and deep planting beds based on university extension standards.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "8 min read",
    category: "Soil & Garden",
    summary: "Applying the correct depth of topsoil is critical for root establishment, drainage, and moisture retention. This guide outlines standard depth specifications for lawns, turf, and gardens, explains settling rates, and provides exact volume formulas.",
    keyTakeaways: [
      "Lawn top-dressing requires a thin layer of 1/8 to 1/4 inch (maximum 1/2 inch) to prevent smothering existing grass.",
      "New lawns grown from seed or sod require a minimum of 4 to 6 inches of loosened, quality topsoil for healthy root systems.",
      "Vegetable gardens and perennial beds perform best with 8 to 12 inches of amended rooting soil.",
      "Screened loose topsoil settles by 15% to 20% after watering and natural rainfall.",
      "1 cubic yard of topsoil covers 324 sq ft at 1 inch depth, 162 sq ft at 2 inches, and 81 sq ft at 4 inches."
    ],
    sections: [
      {
        heading: "1. Standard Recommended Depths by Project Type",
        paragraphs: [
          "The most common mistake when ordering topsoil is selecting an arbitrary depth. Applying too much topsoil over established turfgrass suffocates the crown and causes thatch rot, while under-applying topsoil on a newly excavated building lot stunts root growth into compacted subsoils.",
          "Horticultural extensions consistently specify depth ranges based on target root depth and existing soil condition."
        ],
        table: {
          caption: "Recommended Topsoil Application Depths",
          headers: ["Project Type", "Recommended Depth", "Target Purpose", "Coverage per Cubic Yard"],
          rows: [
            ["Lawn Top-Dressing", "0.25 in (6 mm)", "Level minor thatch; improve microbial soil activity", "1,296 sq ft"],
            ["Lawn Over-seeding & Renovation", "0.5 in (12 mm)", "Seed-to-soil contact; minor hollow filling", "648 sq ft"],
            ["New Turf / Sod Establishment", "4 to 6 in (10 to 15 cm)", "Healthy turfgrass root zone development", "54 to 81 sq ft"],
            ["Flower & Perennial Borders", "6 to 8 in (15 to 20 cm)", "Fibrous perennial root expansion", "40.5 to 54 sq ft"],
            ["Vegetable Gardens & Raised Beds", "8 to 12 in (20 to 30 cm)", "Taproot and deep vegetable nutrient access", "27 to 40.5 sq ft"]
          ]
        }
      },
      {
        heading: "2. Calculating Topsoil Volume and Coverage",
        paragraphs: [
          "To compute the volume in cubic yards: measure length and width in feet, multiply to find square footage, multiply by intended depth in inches, and divide by 324.",
          "Worked Example: A homeowner plans to establish a new sod lawn over a 40 ft × 30 ft backyard with 4 inches of fresh topsoil. The plan area is 1,200 sq ft. Volume = 1,200 × 4 ÷ 324 = 14.81 cubic yards. Accounting for a 15% settlement allowance (14.81 × 1.15), the recommended order is 17.0 cubic yards."
        ],
        formulaBox: {
          title: "Topsoil Calculation Formula",
          formula: "Cubic Yards = Length (ft) × Width (ft) × Depth (in) ÷ 324\nPost-Settlement Order Volume = Base Cubic Yards × 1.15",
          note: "Loose topsoil fluffs up when screened and handled; it consolidates as water settles air pockets."
        }
      },
      {
        heading: "3. Bulk Delivery vs. Bagged Topsoil",
        paragraphs: [
          "Topsoil is sold either loose by the cubic yard from landscape supply yards or in plastic retail bags (typically 0.75 cu ft or 1.0 cu ft) at garden centers.",
          "Because 1 cubic yard equals 27 cubic feet, purchasing one cubic yard in 0.75 cu ft bags requires 36 bags. For projects requiring more than 2 cubic yards (54 cu ft), bulk delivery by dump truck is significantly more cost-effective and reduces packaging waste."
        ]
      },
      {
        heading: "4. Soil Settlement and Compaction Realities",
        paragraphs: [
          "When screened topsoil is loaded into a dump truck, air is introduced into the pore space. Once dumped, raked into position, and saturated with irrigation or rainfall, the soil naturally reconsolidates.",
          "Uncompacted sandy loam topsoil typically settles 10% to 15%, while loam rich in organic compost can settle 15% to 20%. Grade your topsoil 0.5 to 1 inch above surrounding hard surfaces (such as driveways or walkways) to ensure it finishes flush after the first growing season."
        ]
      }
    ],
    faqs: [
      {
        question: "How many square feet does 1 cubic yard of topsoil cover?",
        answer: "One cubic yard covers 324 square feet at 1 inch deep, 162 square feet at 2 inches deep, 108 square feet at 3 inches deep, 81 square feet at 4 inches deep, and 54 square feet at 6 inches deep."
      },
      {
        question: "How much does a cubic yard of topsoil weigh?",
        answer: "Dry screened topsoil typically weighs between 2,000 and 2,200 lbs (0.9 to 1.0 metric tonnes) per cubic yard. Wet or saturated topsoil can exceed 2,600 to 2,800 lbs (1.2 to 1.3 tonnes) per cubic yard. Always check vehicle payload capacities before hauling."
      },
      {
        question: "Can I use standard topsoil to fill raised vegetable beds?",
        answer: "Pure subsoil-derived field topsoil is often too dense for enclosed raised beds and compacts readily. Horticultural guidelines recommend blending 50% to 60% quality screened topsoil with 30% to 40% organic compost and 10% aeration material (such as perlite or coarse sand)."
      }
    ],
    sources: [
      { title: "Lawn Establishment and Renovation Guide", publisher: "Cornell Cooperative Extension", citation: "Cornell University College of Agriculture and Life Sciences." },
      { title: "Soil Management for Lawns and Gardens", publisher: "University of Maryland Extension", citation: "Home & Garden Information Center, Publication HG-110." }
    ],
    relatedTools: ["topsoil-calculator", "soil-calculator", "raised-bed-soil-calculator", "compost-calculator"],
    relatedGuides: ["how-to-measure-landscaping-materials", "raised-bed-soil-volume", "how-to-calculate-material-weight-bulk-density"]
  },
  {
    slug: "how-much-mulch-do-i-need",
    title: "How Much Mulch Do I Need? Depths, Bag Yields, and Tree Safety",
    shortTitle: "Mulch Depth & Quantity Guide",
    kicker: "FIELD GUIDE · GARDEN MAINTENANCE",
    description: "Calculate mulch quantities for planting beds and tree rings. Learn recommended application depths, bag-to-bulk conversions, and how to avoid deadly mulch volcanoes.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "7 min read",
    category: "Soil & Garden",
    summary: "Organic mulch conserves moisture, moderates soil temperature, and suppresses weeds. This guide explains optimal mulch depths for shredded bark and wood chips, bag-to-bulk conversion mathematics, and essential arboricultural safety rules.",
    keyTakeaways: [
      "The optimal mulch depth for landscape beds is 2 to 3 inches (5 to 7.5 cm).",
      "Layers deeper than 4 inches prevent oxygen diffusion to root zones and encourage hydrophobic fungal mats.",
      "Never mound mulch against tree trunks; 'mulch volcanoes' cause bark rot, rodent infestation, and root girdling.",
      "1 cubic yard of mulch equals fourteen 2-cubic-foot bags or nine 3-cubic-foot bags.",
      "1 cubic yard covers 108 square feet at 3 inches depth."
    ],
    sections: [
      {
        heading: "1. Recommended Mulch Depths by Application",
        paragraphs: [
          "Applying mulch is both aesthetic and protective, but thickness matters immensely. A shallow layer under 2 inches fails to block sunlight from germinating weed seeds and dries out rapidly. Conversely, excessive depths exceed soil gas exchange capacities.",
          "When refreshing existing beds that already have partially decomposed mulch from prior seasons, add only 1 to 1.5 inches to bring the total profile back up to the recommended 3-inch benchmark."
        ],
        table: {
          caption: "Mulch Depth Guidelines by Situation",
          headers: ["Bed Scenario", "Recommended Depth", "Purpose", "Coverage per Cubic Yard"],
          rows: [
            ["New Planting Beds (Bare Soil)", "3 inches (7.5 cm)", "Weed suppression and initial moisture sealing", "108 sq ft"],
            ["Established Bed Refresh", "1 to 1.5 inches (2.5 to 3.8 cm)", "Restoring color and replenishing degraded surface", "216 to 324 sq ft"],
            ["Vegetable Garden Walkways", "3 to 4 inches (7.5 to 10 cm)", "Foot traffic cushioning and weed block", "81 to 108 sq ft"],
            ["Coarse Wood Chips (Play Areas)", "4 to 6 inches (10 to 15 cm)", "Impact absorption and decay longevity", "54 to 81 sq ft"],
            ["Fine Pine Bark / Compost Mulch", "2 inches (5 cm)", "Rapid nutrient cycling around annuals", "162 sq ft"]
          ]
        }
      },
      {
        heading: "2. The Bag vs. Bulk Calculation",
        paragraphs: [
          "Most retail wood and bark mulches in North America are sold in bags containing either 2.0 cubic feet or 3.0 cubic feet. Bulk landscape yards deliver by the cubic yard (27 cubic feet).",
          "To calculate bag requirements from your measured square footage: Area (sq ft) × Depth (in) ÷ 324 = Cubic Yards. Multiply cubic yards by 27 to find cubic feet, then divide by the bag volume."
        ],
        formulaBox: {
          title: "Mulch Bag Calculation",
          formula: "Cubic Yards = Area (ft²) × Depth (in) ÷ 324\n2.0 cu ft Bags Needed = (Cubic Yards × 27) ÷ 2 = Cubic Yards × 13.5 (round up)\n3.0 cu ft Bags Needed = (Cubic Yards × 27) ÷ 3 = Cubic Yards × 9 (round up)",
          note: "Always round up to the nearest full bag to account for uneven bed edges."
        }
      },
      {
        heading: "3. Arboricultural Warning: Avoiding the Mulch Volcano",
        paragraphs: [
          "Piling mulch up against the trunk of a tree—commonly termed a 'mulch volcano'—is one of the leading causes of premature urban tree mortality. Tree bark requires atmospheric gas exchange; buried bark remains permanently moist, leading to fungal phloem necrosis.",
          "Additionally, roots grow upward into the moist mulch cone and eventually circle the trunk, developing into fatal girdling roots that strangle the vascular cambium. Always maintain a bare 3-to-4-inch 'donut hole' clearance between the tree root flare and the start of the mulch layer."
        ]
      }
    ],
    faqs: [
      {
        question: "How many bags of mulch make a cubic yard?",
        answer: "It requires exactly 13.5 bags of 2-cubic-foot mulch (practically 14 bags) or 9 bags of 3-cubic-foot mulch to equal one cubic yard (27 cubic feet)."
      },
      {
        question: "Should I remove old mulch before applying fresh mulch?",
        answer: "If the existing mulch has broken down into clean, odor-free organic matter, you do not need to remove it; simply rake it to break up crusted surface molds and top-dress with 1 inch of fresh mulch. If the old mulch has compacted into a thick, moldy, water-repellent mat, remove or thoroughly cultivate it first."
      },
      {
        question: "What is the best time of year to apply mulch?",
        answer: "Mid-to-late spring is ideal. Applying mulch too early in spring traps cold winter temperatures in the ground and delays root activity; waiting until the soil warms to around 55°F (13°C) allows plant roots to awaken before the moisture seal is locked in."
      }
    ],
    sources: [
      { title: "Proper Mulching Techniques", publisher: "International Society of Arboriculture (ISA)", citation: "TreesAreGood Educational Bulletin." },
      { title: "Mulching Landscape Trees and Shrubs", publisher: "Purdue Extension", citation: "Purdue University Department of Forestry and Natural Resources, FNR-012-W." }
    ],
    relatedTools: ["mulch-calculator", "cubic-yard-calculator", "soil-calculator", "compost-calculator"],
    relatedGuides: ["how-to-measure-landscaping-materials", "cubic-yards-vs-cubic-feet"]
  },
  {
    slug: "cubic-yards-vs-cubic-feet",
    title: "Cubic Yards vs Cubic Feet: Conversion Math, Coverage, and Buying Guide",
    shortTitle: "Cubic Yards vs Cubic Feet",
    kicker: "MEASUREMENT MATH · VOLUME GUIDE",
    description: "Master the mathematical conversion between cubic yards and cubic feet. Includes coverage tables by depth, bag-to-bulk price break-even thresholds, and volume visualization.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "6 min read",
    category: "Measurement & Math",
    summary: "Understanding the ratio of 27 cubic feet per cubic yard is the cornerstone of bulk landscaping procurement. This guide provides exact conversion formulas, coverage tables across depths from 1 to 12 inches, and a financial break-even analysis for bag versus bulk delivery.",
    keyTakeaways: [
      "1 cubic yard equals exactly 27 cubic feet (3 ft × 3 ft × 3 ft = 27 cu ft).",
      "To convert cubic feet to cubic yards, divide by 27. To convert cubic yards to cubic feet, multiply by 27.",
      "1 cubic yard fills a 3 ft × 3 ft × 3 ft cube and occupies roughly the level-full cargo bed of a standard standard-bed pickup truck.",
      "1 cubic yard covers 324 square feet at 1 inch depth, 108 square feet at 3 inches, and 81 square feet at 4 inches.",
      "When project volume exceeds 1.5 to 2 cubic yards (40 to 54 cu ft), bulk delivery is typically cheaper than retail bags."
    ],
    sections: [
      {
        heading: "1. The Geometry of the 27:1 Ratio",
        paragraphs: [
          "One linear yard equals 3 linear feet. Because volume measures three dimensions (length, width, and height), a cubic yard is a cube measuring 3 feet wide, 3 feet long, and 3 feet deep: 3 ft × 3 ft × 3 ft = 27 cubic feet.",
          "People frequently confuse linear conversions with volumetric conversions, mistakenly assuming a cubic yard contains 3 or 9 cubic feet. Remembering the full 27:1 multiplier prevents massive material shortages."
        ],
        formulaBox: {
          title: "Direct Conversion Equations",
          formula: "Cubic Yards = Cubic Feet ÷ 27\nCubic Feet = Cubic Yards × 27\nCubic Metres = Cubic Yards × 0.764555",
          note: "1 cubic yard is equivalent to approximately 0.765 m³ or 764.55 litres."
        }
      },
      {
        heading: "2. Master Coverage Matrix by Depth",
        paragraphs: [
          "Because 1 cubic yard equals 27 cubic feet, and each cubic foot contains 12 board feet of 1-inch-thick coverage, 1 cubic yard contains 27 × 12 = 324 board-feet. Dividing 324 by your intended depth in inches gives your square-foot coverage."
        ],
        table: {
          caption: "Coverage Area Provided by 1 Cubic Yard (27 cu ft)",
          headers: ["Layer Depth", "Square Feet Covered (ft²)", "Square Metres Covered (m²)", "Common Material Use Case"],
          rows: [
            ["0.5 inch (1.27 cm)", "648 sq ft", "60.2 m²", "Lawn aeration top-dressing"],
            ["1.0 inch (2.54 cm)", "324 sq ft", "30.1 m²", "Thin compost seed-starter blanket"],
            ["2.0 inches (5.08 cm)", "162 sq ft", "15.1 m²", "Paver bedding sand; established mulch refresh"],
            ["3.0 inches (7.62 cm)", "108 sq ft", "10.0 m²", "New garden bed mulch; walkway pea gravel"],
            ["4.0 inches (10.16 cm)", "81 sq ft", "7.5 m²", "Residential concrete patio slab; paver base aggregate"],
            ["6.0 inches (15.24 cm)", "54 sq ft", "5.0 m²", "Driveway base gravel; turf subgrade topsoil"],
            ["12.0 inches (30.48 cm)", "27 sq ft", "2.5 m²", "Deep timber raised vegetable planter box"]
          ]
        }
      },
      {
        heading: "3. Break-Even Analysis: Bags vs. Bulk Truckload",
        paragraphs: [
          "Retail bags offer convenience: you can transport them inside a passenger vehicle, stage them easily around the property, and store unused bags under cover without weather degradation.",
          "However, bulk ordering is substantially cheaper per volume unit. A typical cubic yard of mulch costs $35 to $50 bulk, whereas 14 bags (2 cu ft each at $4.50 to $6.00/bag) costs $63 to $84. When your requirement exceeds 2 cubic yards, bulk savings usually outweigh the typical $50 to $90 local truck delivery fee."
        ]
      }
    ],
    faqs: [
      {
        question: "How big is a cubic yard visually?",
        answer: "A cubic yard is the size of a standard kitchen washing machine or dishwasher (3 ft × 3 ft × 3 ft). A standard full-size pickup truck with a 6.5-foot bed can carry roughly 1.5 to 2.0 cubic yards of light mulch or 1.0 cubic yard of heavy soil or stone without exceeding bed volume limits."
      },
      {
        question: "How do I convert square feet to cubic yards?",
        answer: "Multiply your square footage by the planned thickness in inches, then divide by 324. For example, 500 sq ft at 3 inches deep: 500 × 3 = 1,500; 1,500 ÷ 324 = 4.63 cubic yards."
      },
      {
        question: "How many cubic feet are in a 50 lb bag of sand or stone?",
        answer: "Because dense sand and stone weigh roughly 95 to 105 lbs per cubic foot, a 50 lb bag contains roughly 0.45 to 0.50 cubic feet of material. It takes about 54 to 60 bags of 50 lb stone to equal 1 cubic yard."
      }
    ],
    sources: [
      { title: "NIST Handbook 44: Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices", publisher: "National Institute of Standards and Technology (NIST)", citation: "U.S. Department of Commerce." }
    ],
    relatedTools: ["cubic-yard-calculator", "topsoil-calculator", "mulch-calculator", "concrete-calculator"],
    relatedGuides: ["how-to-measure-landscaping-materials", "how-to-calculate-material-weight-bulk-density"]
  },
  {
    slug: "how-to-calculate-material-weight-bulk-density",
    title: "How to Calculate Material Weight Using Bulk Density: Sand, Soil, Gravel & Concrete",
    shortTitle: "Bulk Density & Material Weight",
    kicker: "ENGINEERING PHYSICS · WEIGHT ESTIMATION",
    description: "Learn how to turn cubic yard or cubic metre volume into accurate weight estimates using bulk density values. Avoid vehicle overloads and equipment strain.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "8 min read",
    category: "Aggregate & Stone",
    summary: "Volume and weight are completely different physical properties. This engineering guide explains bulk density, particle porosity, moisture bulking factors, and how to safely compute truck payload limits for gravel, soil, sand, and aggregate.",
    keyTakeaways: [
      "Bulk density measures mass divided by total volume, including inter-particle pore space.",
      "Never convert volume to weight without knowing the specific material's moisture state and grading.",
      "1 cubic yard of dry topsoil weighs ~2,000 lbs; wet compacted topsoil can exceed 2,700 lbs.",
      "Crushed stone (#57) and gravel typically weigh between 2,500 and 2,900 lbs per cubic yard.",
      "A standard half-ton pickup truck (payload limit ~1,500 to 2,000 lbs) can safely carry less than 0.75 cubic yards of wet gravel or soil."
    ],
    sections: [
      {
        heading: "1. The Difference Between True Density and Bulk Density",
        paragraphs: [
          "True solid rock density (such as solid quartz or limestone) is roughly 165 lbs per cubic foot (2,650 kg/m³). However, crushed gravel or screened sand does not occupy 100% solid space; it consists of individual particles separated by air voids.",
          "Bulk density measures the dry or moist weight of material occupying a given unit container, inclusive of voids. Standard aggregates have void fractions between 30% and 45%, reducing bulk density to 90–110 lbs/cu ft (1,440–1,760 kg/m³)."
        ],
        table: {
          caption: "Typical Bulk Densities for Landscaping Materials",
          headers: ["Material Name", "Density (lb/ft³)", "Density (lb/yd³)", "Density (kg/m³)", "Tons per Cubic Yard"],
          rows: [
            ["Wood Mulch (Dry)", "15 to 25 lb/ft³", "400 to 700 lb/yd³", "240 to 415 kg/m³", "0.20 to 0.35 tons"],
            ["Wood Mulch (Wet / Saturated)", "30 to 45 lb/ft³", "800 to 1,200 lb/yd³", "475 to 710 kg/m³", "0.40 to 0.60 tons"],
            ["Dry Screened Topsoil", "75 to 85 lb/ft³", "2,000 to 2,300 lb/yd³", "1,200 to 1,365 kg/m³", "1.00 to 1.15 tons"],
            ["Damp / Compacted Topsoil", "90 to 105 lb/ft³", "2,400 to 2,800 lb/yd³", "1,425 to 1,660 kg/m³", "1.20 to 1.40 tons"],
            ["Dry Masonry Sand", "90 to 100 lb/ft³", "2,430 to 2,700 lb/yd³", "1,440 to 1,600 kg/m³", "1.21 to 1.35 tons"],
            ["Crushed Stone Base (#411 / Crusher Run)", "100 to 115 lb/ft³", "2,700 to 3,100 lb/yd³", "1,600 to 1,840 kg/m³", "1.35 to 1.55 tons"],
            ["Washed Pea Gravel", "95 to 110 lb/ft³", "2,560 to 2,970 lb/yd³", "1,520 to 1,760 kg/m³", "1.28 to 1.48 tons"],
            ["Solid Ready-Mix Concrete", "145 to 150 lb/ft³", "3,900 to 4,050 lb/yd³", "2,320 to 2,400 kg/m³", "1.95 to 2.02 tons"]
          ]
        }
      },
      {
        heading: "2. The Mathematical Weight Equations",
        paragraphs: [
          "To compute weight when given volume: multiply cubic yards by pounds per cubic yard to find total pounds; divide by 2,000 to find short tons.",
          "In metric units: multiply cubic metres by kilograms per cubic metre to find total kilograms; divide by 1,000 to find metric tonnes."
        ],
        formulaBox: {
          title: "Bulk Density Weight Formulas",
          formula: "Weight (lb) = Volume (yd³) × Bulk Density (lb/yd³)\nWeight (Short Tons) = Weight (lb) ÷ 2,000\nWeight (kg) = Volume (m³) × Bulk Density (kg/m³)",
          note: "Never assume a single universal density. Request the quarry or supplier's certified delivery ticket density."
        }
      },
      {
        heading: "3. Moisture Bulking and Surcharge Hazards",
        paragraphs: [
          "Fine aggregate such as sand exhibits a phenomenon known as 'moisture bulking'. When fine sand contains 4% to 8% surface moisture, surface tension pushes sand grains apart, artificially expanding loose volume by up to 25% compared to completely dry or completely submerged sand.",
          "For haulers, rain creates the opposite risk: sudden overweight conditions. An open load of porous crushed limestone or organic compost parked in heavy rain can absorb hundreds of pounds of water without altering its visible volume."
        ],
        callout: {
          type: "warning",
          title: "Vehicle Payload and GVWR Compliance",
          text: "Exceeding your truck's Gross Vehicle Weight Rating (GVWR) damages suspension, ruins brakes, and is illegal on public roads. Half-ton pickups generally have cargo payload limits between 1,400 and 2,000 lbs—meaning a full cubic yard of gravel (2,700+ lbs) will severely overload the vehicle."
        }
      }
    ],
    faqs: [
      {
        question: "How many tons is 10 cubic yards of gravel?",
        answer: "A typical crushed aggregate weighs approximately 1.4 short tons (2,800 lbs) per cubic yard. Therefore, 10 cubic yards of gravel weighs approximately 14 short tons (28,000 lbs or 12.7 metric tonnes)."
      },
      {
        question: "Why do quarries sell stone by the ton rather than by the yard?",
        answer: "Quarries use certified truck drive-on scales to ensure legally audited, fair transactions based on exact mass. Because stone density and moisture fluctuate daily, weighing the loaded truck is more reliable for bulk commercial transactions than visually estimating bucket volumes."
      },
      {
        question: "How do I convert tons of stone into cubic yards?",
        answer: "Divide total tons by the material's bulk density factor in tons per cubic yard (typically 1.35 to 1.4 tons/yd³ for crushed stone). For example: 10 tons ÷ 1.4 tons/yd³ = approximately 7.14 cubic yards."
      }
    ],
    sources: [
      { title: "ASTM C29 / C29M-17a: Standard Test Method for Bulk Density ('Unit Weight') and Voids in Aggregate", publisher: "ASTM International", citation: "West Conshohocken, PA." },
      { title: "Geotechnical Engineering Circular No. 5: Evaluation of Soil and Rock Properties", publisher: "Federal Highway Administration (FHWA)", citation: "U.S. Department of Transportation, Publication FHWA-IF-02-034." }
    ],
    relatedTools: ["pea-gravel-calculator", "crushed-stone-calculator", "sand-calculator", "cubic-yard-calculator"],
    relatedGuides: ["cubic-yards-vs-cubic-feet", "gravel-driveway-material-estimation"]
  },
  {
    slug: "gravel-driveway-material-estimation",
    title: "Gravel Driveway Material Estimation: 3-Layer Cross Sections and Compaction",
    shortTitle: "Gravel Driveway Cross-Sections",
    kicker: "CONSTRUCTION GUIDE · ROADS & ACCESS",
    description: "Design and calculate aggregate quantities for stable, well-draining gravel driveways. Learn sub-base specifications, stone sizes (#3, #411, #57), crowns, and compaction factors.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "9 min read",
    category: "Construction",
    summary: "A durable gravel driveway requires a tiered three-layer aggregate profile rather than a single stone type dumped over dirt. This engineering guide details aggregate sizing, compaction loss calculations, crown grading for drainage, and subgrade stabilization.",
    keyTakeaways: [
      "A long-lasting driveway consists of three distinct layers: sub-base, middle binding base, and surface wearing course.",
      "Total aggregate profile depth should range from 8 to 12 inches on typical residential soils.",
      "Crusher Run (#411 / CR-6) compacts by 15% to 20%; orders must be adjusted upward to hit target compacted depths.",
      "A driveway crown sloping 1/2 inch per linear foot from center to shoulder prevents puddle formation and pothole cratering.",
      "Non-woven geotextile fabric between subgrade dirt and sub-base stone prevents heavy aggregate from sinking into muddy subsoils."
    ],
    sections: [
      {
        heading: "1. The Engineered 3-Layer Driveway Cross-Section",
        paragraphs: [
          "Dumping 4 inches of round river gravel directly onto bare dirt will result in rutting, sinking stone, and muddy potholes after the first thaw or heavy rain. Heavy vehicle point loads must be distributed outward across progressively larger stone.",
          "Civil roadway engineering guidelines prescribe three distinct courses: a stabilizing coarse sub-base, a dense-graded packing middle base, and a shed-water wearing surface."
        ],
        table: {
          caption: "Standard Driveway Aggregate Layers",
          headers: ["Layer Name", "Stone Size / Grade", "Target Compacted Depth", "Primary Function"],
          rows: [
            ["1. Sub-Base Course", "#3 or #4 ballast (2 to 3 inch fractured stone)", "4 to 6 inches (10 to 15 cm)", "Structural foundation; bridges soft subsoil moisture"],
            ["2. Middle Base Course", "#411 / CR-6 Crusher Run (1 inch down to dust)", "3 to 4 inches (7.5 to 10 cm)", "Dense mechanical interlock; locks sub-base firmly in place"],
            ["3. Wearing Surface", "#57 washed crushed limestone or angular gravel (3/4 inch)", "1.5 to 2 inches (3.8 to 5 cm)", "Smooth traction; sheds surface water into roadside swales"]
          ]
        }
      },
      {
        heading: "2. Calculating Volume with Mechanical Compaction Loss",
        paragraphs: [
          "Crushed stone with fine particles (such as #411, quarry process, or Crusher Run) contains stone dust that vibrates down into voids when rolled. As a result, loose volume shrinks significantly during installation.",
          "To achieve 4 inches of compacted base, you must order 4.8 inches of loose stone (a 20% compaction expansion factor). Failure to calculate compaction leaves the driveway under-depth and prone to structural failure."
        ],
        formulaBox: {
          title: "Driveway Layer Calculation Formula",
          formula: "Compacted Volume (yd³) = Length (ft) × Width (ft) × Compacted Depth (in) ÷ 324\nLoose Order Quantity (yd³) = Compacted Volume × 1.20 (for dense-graded base)\nLoose Order Quantity (yd³) = Compacted Volume × 1.05 (for washed surface stone)",
          note: "Calculate each of the three layers independently because they use different materials and compaction rates."
        }
      },
      {
        heading: "3. Crown Grading and Water Shedding",
        paragraphs: [
          "Water is the primary enemy of unpaved roadways. If water sits on a gravel surface, vehicle tires create hydraulic pumping action that ejects stone dust, forming potholes. The driveway must be graded with a parabolic crown.",
          "A driveway 12 feet wide should have a centerline crown 3 inches higher than the shoulder edges (a slope of 1/2 inch rise per foot of cross-fall)."
        ]
      }
    ],
    faqs: [
      {
        question: "How much gravel do I need for a 100-foot driveway?",
        answer: "For a 100 ft long by 10 ft wide driveway with a 4-inch compacted wearing course: Area = 1,000 sq ft. Volume = 1,000 × 4 ÷ 324 = 12.35 cubic yards. Accounting for a 10% compaction and edge allowance, order 13.6 cubic yards (approx. 19 tons)."
      },
      {
        question: "Why should I use geotextile fabric under a gravel driveway?",
        answer: "Heavy truck and vehicle traffic pushes heavy stone downward into soft underlying clay or silt subgrade, while pumping mud upward into the aggregate voids. A heavy non-woven geotextile fabric creates a permanent separation layer, preserving aggregate structural integrity."
      },
      {
        question: "Can I use round river pea gravel on a driveway?",
        answer: "Round stones act like ball bearings under vehicle tires, sliding away and creating deep ruts. Only angular, crushed quarry stone with sharp fractured faces locks mechanically together to form a firm driving surface."
      }
    ],
    sources: [
      { title: "Gravel Roads Construction and Maintenance Guide", publisher: "Federal Highway Administration (FHWA)", citation: "Publication FHWA-FLH-15-004." },
      { title: "Environmentally Sensitive Maintenance for Dirt and Gravel Roads", publisher: "Penn State Center for Dirt and Gravel Road Studies", citation: "Pennsylvania State University." }
    ],
    relatedTools: ["gravel-driveway-calculator", "crushed-stone-calculator", "paver-base-calculator", "cubic-yard-calculator"],
    relatedGuides: ["how-to-calculate-material-weight-bulk-density", "cubic-yards-vs-cubic-feet"]
  },
  {
    slug: "concrete-volume-and-bag-yield",
    title: "Concrete Volume and Bag Yield: Ready-Mix vs Bagged Mix Calculations",
    shortTitle: "Concrete Volume & Bag Yields",
    kicker: "CONSTRUCTION GUIDE · SLABS & FOOTINGS",
    description: "Calculate concrete volume for slabs, footings, and post holes. Compare yields for 40, 50, 60, and 80 lb bags and determine when to call the ready-mix truck.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "8 min read",
    category: "Construction",
    summary: "Concrete volume estimation requires strict geometric accuracy because under-ordering results in cold joints, while over-ordering creates costly disposal problems. This guide covers slab and cylinder formulas, exact bag yield specifications, and ready-mix procurement rules.",
    keyTakeaways: [
      "Bagged concrete mix yield depends on packaging volume, not dry bag weight.",
      "An 80 lb bag yields 0.60 cu ft; an 80 lb bag does not contain 80 lbs of concrete once mixed with water.",
      "It requires 45 bags of 80 lb mix (or 60 bags of 60 lb mix) to pour 1 cubic yard (27 cu ft).",
      "Ready-mix delivery trucks are recommended for any project requiring 1.5 cubic yards or more.",
      "Slab thickness must be framed with internal measurements; 2x4 lumber frames a 3.5-inch slab, not 4.0 inches."
    ],
    sections: [
      {
        heading: "1. The True Yield of Bagged Concrete",
        paragraphs: [
          "A frequent novice error is assuming concrete bag weights relate directly to volume. Standard dry premix concrete contains Portland cement, coarse gravel aggregate, and masonry sand.",
          "When water is mixed with the dry components, fine sand particles pack between the coarse aggregate, meaning the mixed plastic concrete volume is significantly less than the unmixed loose powder."
        ],
        table: {
          caption: "Premix Concrete Bag Yield and Multipliers",
          headers: ["Bag Weight", "Yield in Cubic Feet (ft³)", "Yield in Cubic Metres (m³)", "Bags Needed for 1 Cubic Yard (27 ft³)"],
          rows: [
            ["40 lb (18.1 kg)", "0.30 cu ft", "0.0085 m³", "90 bags"],
            ["50 lb (22.7 kg)", "0.375 cu ft", "0.0106 m³", "72 bags"],
            ["60 lb (27.2 kg)", "0.45 cu ft", "0.0127 m³", "60 bags"],
            ["80 lb (36.3 kg)", "0.60 cu ft", "0.0170 m³", "45 bags"]
          ]
        }
      },
      {
        heading: "2. Calculating Slab and Round Footing Volumes",
        paragraphs: [
          "For rectangular slabs: Length (ft) × Width (ft) × Thickness (in) ÷ 324 = Cubic Yards.",
          "For cylindrical post holes and sonotubes: Radius squared (in feet) × π × Depth (in feet) = Cubic Feet. Divide cubic feet by 27 to find cubic yards.",
          "Lumber Dimensional Warning: If you build formwork using standard 2×4 dimensional lumber, remember that dressed 2×4s actually measure 1.5 inches × 3.5 inches. Framing with a 2×4 produces a 3.5-inch-thick slab—not a 4.0-inch slab. Enter 3.5 inches into your calculation to prevent substantial over-ordering."
        ],
        formulaBox: {
          title: "Slab and Cylinder Formulas",
          formula: "Rectangular Slab: Cubic Yards = Length (ft) × Width (ft) × Thickness (in) ÷ 324\nCylindrical Footing: Cubic Feet = π × (Diameter in ft ÷ 2)² × Depth in ft\nCylinder Cubic Yards = Cubic Feet ÷ 27",
          note: "Always add a 10% allowance for formwork deflection, uneven grade, and slight over-excavation."
        }
      },
      {
        heading: "3. When to Call the Ready-Mix Truck",
        paragraphs: [
          "Hand-mixing bagged concrete in a wheelbarrow or portable drum mixer becomes physically exhausting and structurally risky on larger pours. If you cannot place and consolidate the entire pour before initial set begins (typically 60 to 90 minutes), you risk 'cold joints' that crack under load.",
          "As a general contractor rule: any pour exceeding 1.0 to 1.5 cubic yards (45 to 68 bags of 80 lb mix) should be ordered from a commercial ready-mix concrete plant."
        ]
      }
    ],
    faqs: [
      {
        question: "How many 80 lb bags of concrete do I need for a 10x10 slab at 4 inches?",
        answer: "A 10 ft × 10 ft slab at 4 in thick has a volume of 100 × 4 ÷ 324 = 1.235 cubic yards (33.33 cu ft). At 0.60 cu ft per 80 lb bag, you need 33.33 ÷ 0.60 = 55.6 bags. Adding a 10% allowance for form flex, you should order 62 bags."
      },
      {
        question: "How many bags of concrete do I need for a 4x4 fence post?",
        answer: "A standard fence post hole is 10 to 12 inches in diameter and 36 inches deep. After subtracting the space occupied by a 4×4 treated wood post, the hole requires approximately 1.5 to 2.0 cubic feet of concrete, which equals three to four 50-lb bags or two to three 80-lb bags per post."
      },
      {
        question: "What is the minimum recommended thickness for a concrete patio or walkway?",
        answer: "Residential walkways and patios require a minimum thickness of 4 inches (10 cm) of 3,500 to 4,000 PSI concrete over a compacted aggregate base. Driveways accommodating passenger vehicles should be 4 to 5 inches thick; heavy trucks or RV pads require 6 inches with steel rebar reinforcement."
      }
    ],
    sources: [
      { title: "ACI 302.1R-15: Guide to Concrete Floor and Slab Construction", publisher: "American Concrete Institute (ACI)", citation: "Farmington Hills, MI." },
      { title: "Design and Control of Concrete Mixtures", publisher: "Portland Cement Association (PCA)", citation: "16th Edition, Engineering Bulletin EB001." }
    ],
    relatedTools: ["concrete-calculator", "cubic-yard-calculator", "sand-calculator", "paver-base-calculator"],
    relatedGuides: ["cubic-yards-vs-cubic-feet", "how-to-calculate-material-weight-bulk-density"]
  },
  {
    slug: "raised-bed-soil-volume",
    title: "Raised Bed Soil Volume: Internal Dimensions, Mel's Mix, and Layering",
    shortTitle: "Raised Bed Soil Math & Blends",
    kicker: "GARDENING GUIDE · RAISED BEDS",
    description: "Calculate exact soil and amendment volumes for raised garden beds. Master internal dimension deductions, soil blend ratios (Mel's Mix), and organic settling allowances.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "7 min read",
    category: "Soil & Garden",
    summary: "Filling raised garden beds with premium growing medium requires careful geometric measurement and understanding of organic soil blends. This guide details lumber thickness deductions, soil blend formulas, bottom filler strategies, and first-season settling rates.",
    keyTakeaways: [
      "Always measure the inside dimensions of your bed; exterior dimensions overestimate volume by 8% to 15%.",
      "Standard square foot gardening blends ('Mel's Mix') consist of 1/3 compost, 1/3 peat moss or coconut coir, and 1/3 coarse vermiculite.",
      "Deep raised beds (18 to 24+ inches) can use a modified hügelkultur base layer (untreated logs and branches) to reduce soil purchase costs.",
      "Organic planting soil settles 15% to 20% within the first four weeks of watering.",
      "Fill beds to within 1 to 2 inches of the top rim to prevent root exposure while leaving room for annual top-dressing."
    ],
    sections: [
      {
        heading: "1. The Internal Dimension Rule",
        paragraphs: [
          "A classic mistake when ordering soil for raised beds is using the nominal lumber length. A bed framed with 2-inch-thick dimensional lumber (actual thickness 1.5 inches) has an inside cavity smaller than its outer footprint.",
          "For example: a 4 ft × 8 ft bed built with 2×10 timbers has interior dimensions of 3.75 ft × 7.75 ft. At a fill depth of 9 inches (0.75 ft), using exterior dimensions gives 24.0 cu ft, whereas the actual interior soil space is 21.8 cu ft—a 10% overestimate."
        ],
        formulaBox: {
          title: "Raised Bed Volume Formula",
          formula: "Interior Length (ft) × Interior Width (ft) × Soil Depth (ft) = Total Cubic Feet\nCubic Yards = Total Cubic Feet ÷ 27\nOrder Volume = Cubic Yards × 1.15 (to account for settling)",
          note: "Convert depth in inches to feet by dividing by 12 (e.g. 10 inches ÷ 12 = 0.833 ft)."
        }
      },
      {
        heading: "2. Popular Soil Blending Ratios",
        paragraphs: [
          "Pure garden topsoil is too dense for wooden raised beds; it compacts tightly under repeated hand-watering and restricts drainage. Horticultural extension services recommend porous, aerated growing mixtures."
        ],
        table: {
          caption: "Recommended Raised Bed Soil Blends",
          headers: ["Blend Name", "Formula Components", "Best Application", "Drainage & Aeration"],
          rows: [
            ["Mel's Mix (Square Foot Gardening)", "1/3 blended compost + 1/3 coarse vermiculite + 1/3 peat moss / coco coir", "Intensive vegetable and leafy greens production", "Maximum aeration; low compaction; superior moisture retention"],
            ["Triple Mix (Commercial Standard)", "1/3 screened topsoil + 1/3 aged organic compost + 1/3 coarse peat or bark fines", "General raised beds, perennial herbs, and root crops", "Balanced weight and nutrient buffering; retains moisture well"],
            ["Mineral Loam Blend", "50% sandy loam topsoil + 40% compost + 10% perlite or pumice", "Drought-tolerant crops, brassicas, and tall fruiting vegetables", "Heavier anchor weight for tall staking; natural trace minerals"]
          ]
        }
      },
      {
        heading: "3. Filling Deep Beds: The Hügelkultur Base Layer",
        paragraphs: [
          "Modern raised beds frequently measure 18 to 30 inches deep to reduce back strain. However, most vegetable crops only utilize the top 10 to 12 inches for active feeder roots.",
          "Filling a 24-inch-deep bed entirely with expensive bagged potting mix is unnecessary. Instead, fill the bottom 8 to 12 inches with untreated hardwood logs, rotting branches, twigs, and leaf mulch (a practice adapted from German hügelkultur). As this buried wood slowly decomposes over several years, it acts as a sponge, retaining moisture and feeding mycorrhizal fungi."
        ]
      }
    ],
    faqs: [
      {
        question: "How many bags of soil do I need for a 4x8 raised bed at 10 inches deep?",
        answer: "A 4×8 bed (internal dimensions 3.75 ft × 7.75 ft) at 10 in deep has a volume of 24.2 cubic feet. Factoring in 15% settling, you need approximately 27.8 cubic feet. That equals fourteen 2-cubic-foot bags, or roughly 1.03 cubic yards."
      },
      {
        question: "Why did my raised bed soil sink by 3 inches after planting?",
        answer: "Fresh organic mixes have extensive macro-pore space. As water permeates the profile, small particles settle into voids and organic compost naturally compresses. Plan for 15% to 20% settling and top-dress annually with 1 to 2 inches of aged compost."
      },
      {
        question: "Should I line the bottom of my raised bed?",
        answer: "If building over existing turf or invasive weeds (such as Bermuda grass or thistle), line the bottom with untreated brown cardboard or hardware cloth (1/4-inch galvanized wire mesh) to stop burrowing gophers and voles. Never line the bottom with non-porous plastic sheeting, which blocks drainage and creates an anaerobic swamp."
      }
    ],
    sources: [
      { title: "Constructing and Filling Raised Bed Planters", publisher: "Oregon State University Extension Service", citation: "Publication EM 9183." },
      { title: "Raised Bed Gardening", publisher: "University of Florida IFAS Extension", citation: "Publication CIR 1282." }
    ],
    relatedTools: ["raised-bed-soil-calculator", "soil-calculator", "compost-calculator", "topsoil-calculator"],
    relatedGuides: ["how-to-measure-landscaping-materials", "how-much-topsoil-do-i-need"]
  },
  {
    slug: "measuring-irregular-landscaping-areas",
    title: "Measuring Irregular Landscaping Areas: Offset Method, Geometry & Curves",
    shortTitle: "Measuring Irregular Areas",
    kicker: "SURVEYING GUIDE · FIELD GEOMETRY",
    description: "Step-by-step methods to calculate square footage for curved garden beds, kidney-shaped lawns, and irregular boundaries using geometric decomposition and offset baselines.",
    publishedDate: "2026-11-20",
    revisedDate: "2026-11-21",
    readTime: "8 min read",
    category: "Measurement & Math",
    summary: "Real-world landscaping features curvilinear borders, rounded property lines, and non-standard boundaries. This field guide details three proven surveyor methods—geometric decomposition, the perpendicular offset method, and radius averaging—to calculate exact square footage.",
    keyTakeaways: [
      "Geometric decomposition breaks complex curved beds into smaller rectangles, triangles, and semi-circles.",
      "The perpendicular offset method (adapted from Simpson's and Trapezoidal rules) provides surveyor-grade accuracy for winding boundaries.",
      "Kidney and curved oval beds can be estimated accurately using the ellipse formula: Area = Length × Width × 0.8.",
      "Always measure flat horizontal distance; measuring down steep slope faces over-orders material.",
      "Keep track of sub-areas in a structured table to prevent double-counting overlaps."
    ],
    sections: [
      {
        heading: "1. Method 1: Geometric Decomposition",
        paragraphs: [
          "The most straightforward field approach is dividing an irregular space into simpler, recognizable geometric figures. Stake out boundaries using wooden pegs or survey flags to separate large rectangular center zones from triangular tapered corners and semi-circular rounded ends.",
          "Calculate the area of each shape independently, verify that adjoining boundaries meet without gaps or overlaps, and sum the results. This method is fast and requires no advanced math beyond basic arithmetic."
        ]
      },
      {
        heading: "2. Method 2: The Perpendicular Offset (Baseline) Method",
        paragraphs: [
          "For organic, kidney-shaped beds or long serpentine borders, geometric decomposition leaves too many curved scraps unmeasured. The perpendicular offset method is the standard field procedure used by surveyors and landscape contractors.",
          "Step 1: Stake a straight reference tape (the 'baseline') along the longest axis through the center of the area.",
          "Step 2: At regular fixed intervals along the baseline (e.g. every 5 feet or 10 feet), measure the perpendicular distance to the left and right borders.",
          "Step 3: Sum the offset widths at each station, average them, and multiply by the total baseline length."
        ],
        formulaBox: {
          title: "Trapezoidal Offset Equation",
          formula: "Total Area = Interval Width × [(First Width + Last Width) ÷ 2 + Sum of All Middle Widths]",
          note: "Using a smaller interval (such as every 5 feet rather than 10 feet) increases accuracy on sharp curves."
        }
      },
      {
        heading: "3. Method 3: Curved Kidney and Oval Beds",
        paragraphs: [
          "For freeform oval beds with rounded edges, you can approximate area using an adapted ellipse formula. Measure the longest length (major axis) and widest width (minor axis).",
          "A true mathematical ellipse has an area of π × (L/2) × (W/2) = L × W × 0.785. In practical landscaping, because curved beds have fuller rounded shoulders than a perfect geometric ellipse, multiplying Length × Width × 0.80 provides an accurate estimate."
        ],
        table: {
          caption: "Irregular Area Measurement Methods Comparison",
          headers: ["Method", "Best Suited For", "Required Equipment", "Accuracy Level"],
          rows: [
            ["Geometric Decomposition", "Angular yards with small curves", "100 ft tape measure, flags", "Good (±5%)"],
            ["Perpendicular Offset", "Winding borders, irregular ponds, long swales", "Two tape measures, marking paint", "High (±2%)"],
            ["Adapted Ellipse (L × W × 0.8)", "Kidney beds, oval lawn islands, circular corners", "Single tape measure", "Practical (±4%)"]
          ]
        }
      }
    ],
    faqs: [
      {
        question: "How do I measure a sloped garden bed?",
        answer: "Measure the horizontal run rather than following the surface slope down the hill. If you measure along a 30-degree slope, your tape reading will be 15% longer than the true horizontal plan area, causing you to order excess material."
      },
      {
        question: "What is the best way to physically mark sub-shapes on the lawn?",
        answer: "Use water-based landscape marking spray paint, powdered builder's chalk, or garden hoses. Garden hoses are especially useful for curved borders because you can adjust the curve smoothly before taking measurements."
      },
      {
        question: "How do I calculate volume once I have the irregular area?",
        answer: "Once you have determined the total square footage, volume calculation is identical to any regular area: multiply total square footage by layer depth in inches, and divide by 324 to get cubic yards."
      }
    ],
    sources: [
      { title: "Elementary Surveying: An Introduction to Geomatics", publisher: "Pearson", citation: "Ghilani & Wolf, 15th Edition, Chapter 12: Area Computations." },
      { title: "RHS Practical Landscaping Guides: Measuring Your Garden", publisher: "Royal Horticultural Society (RHS)", citation: "London, UK." }
    ],
    relatedTools: ["cubic-yard-calculator", "topsoil-calculator", "mulch-calculator", "pea-gravel-calculator"],
    relatedGuides: ["how-to-measure-landscaping-materials", "cubic-yards-vs-cubic-feet"]
  }
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}
