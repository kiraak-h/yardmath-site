const fs = require('fs');

// Read existing tools.ts
let toolsContent = fs.readFileSync('src/lib/tools.ts', 'utf8');

// 1. Add import of workedExampleFixtures if not present
if (!toolsContent.includes('workedExampleFixtures')) {
  toolsContent = `import { workedExampleFixtures } from "./worked-examples";\n` + toolsContent;
}

// 2. Update Paver Base metaTitle & metaDescription & description
toolsContent = toolsContent.replace(
  'metaTitle: "Paver Base Calculator | Estimate Crushed Stone & Compaction"',
  'metaTitle: "Paver Base Calculator | Geometric Volume & Allowance Estimator"'
);

toolsContent = toolsContent.replace(
  'metaDescription: "Calculate crushed aggregate base for patios, walkways, and driveways. Free calculator accounts for compaction loss, thickness, tons, and cubic yards."',
  'metaDescription: "Calculate geometric volume for patio and walkway aggregate base layers. Enter dimensions and depth, then apply your chosen allowance for loose-to-compacted ordering."'
);

toolsContent = toolsContent.replace(
  'description: "Estimate the compacted aggregate volume for a patio, walkway or paver project. Calculate the measured layer volume and add an allowance using your chosen dimensions and depth."',
  'description: "Estimate geometric volume for a patio, walkway, or paver base layer. Enter project dimensions and depth, then apply a manual allowance (such as 18%–20% for dense-graded aggregate compaction) to determine loose order quantities."'
);

// 3. Paver Base direct answer
toolsContent = toolsContent.replace(
  'Residential patios and walkways require a minimum compacted base depth of 4 inches (10 cm) of dense-graded aggregate (ASTM D2940 Crusher Run / road base). Because stone dust packs into voids during plate compaction, order 18% to 20% extra loose aggregate to achieve target compacted depth. 1 cubic yard loose covers 81 sq ft at 4 inches before compaction.',
  'Residential patios and walkways over granular subgrades typically specify a minimum compacted base depth of 4 inches (10 cm) of dense-graded aggregate (ASTM D2940 Crusher Run / road base) per ICPI guidelines. This tool calculates neat geometric volume from your input dimensions; because aggregate consolidates under vibratory plate compaction, apply a loose-to-compacted allowance (typically 18% to 20%) in the project allowance field to determine order quantities. 1 loose cubic yard covers 81 sq ft at 4 inches before mechanical compaction.'
);

// 4. Concrete direct answer
toolsContent = toolsContent.replace(
  'Residential concrete slabs require a minimum thickness of 4.0 inches (3.5 inches if framed with standard dressed 2x4s) of 3,500+ PSI concrete. Multiply slab length (ft) by width (ft) by thickness (in) and divide by 324 to find cubic yards. One cubic yard covers 81 sq ft at 4 inches depth. Always add 10% allowance for formwork bulge and uneven subgrade.',
  'Residential concrete slab thickness and compressive strength depend on soil subgrade support, intended traffic loads, and climate exposure class. Typical footpaths and light patios are commonly poured at 3.5 to 4 inches (89 to 102 mm) with compressive strength of 2,500 to 3,000 psi in non-severe weathering, while residential driveways and vehicle pads typically require 4 to 5 inches (102 to 127 mm) at 3,500 to 4,000 psi per ACI 332 / ACI 302.1R guidelines. Always verify local municipal building codes and frost-line depth requirements. Multiply slab length (ft) by width (ft) by thickness (in) and divide by 324 to find cubic yards.'
);

// 5. Gravel Driveway direct answer
toolsContent = toolsContent.replace(
  'For refreshing an existing gravel driveway, install a 2-inch layer of #57 angular crushed stone (approx. 1 cubic yard per 162 sq ft). For building a new driveway, install an 8 to 12 inch tiered profile: 6 inches of coarse sub-base (#3 ballast), 4 inches of dense-graded base (Crusher Run), and 2 inches of surface gravel. Multiply area by depth in inches and divide by 324 to get cubic yards.',
  'This calculator evaluates a single aggregate layer at a time. For refreshing an existing driveway, a 2-inch wearing course of #57 angular crushed stone (approx. 1 cubic yard per 162 sq ft) is common. For constructing a new gravel driveway, layered profiles depend on subgrade soil California Bearing Ratio (CBR), frost depth, and axle loads; typical rural residential installations stage a 4-to-6-inch coarse subbase (#3 ballast), a 3-to-4-inch dense-graded base (Crusher Run), and a 1.5-to-2-inch wearing course (#57 or stone with fines). Calculate each layer separately using its specific layer depth, allowance, and supplier density.'
);

// 6. Mulch direct answer
toolsContent = toolsContent.replace(
  'The optimal mulch depth for landscape beds is 2 to 3 inches. Multiply your area in square feet by depth in inches and divide by 324 to calculate cubic yards. One cubic yard of mulch covers 108 sq ft at 3 inches deep, which equals 13.5 bags (2 cu ft each) or 9 bags (3 cu ft each). Never apply mulch thicker than 4 inches.',
  'The recommended mulch depth for landscape beds is 2 to 3 inches (5 to 7.5 cm) per International Society of Arboriculture (ISA) guidelines. Applying mulch deeper than 3 inches or piling it against tree bark (\'mulch volcanoes\') suffocates roots and fosters stem rot and rodent damage. For annual maintenance top-ups, 1 to 1.5 inches is usually sufficient. Multiply area (sq ft) by depth (in) and divide by 324 to calculate cubic yards.'
);

// 7. Topsoil direct answer
toolsContent = toolsContent.replace(
  'To calculate topsoil, multiply area in square feet by depth in inches, then divide by 324 to get cubic yards. For a standard 4-inch lawn layer, 1 cubic yard covers 81 square feet. For top-dressing existing turf, apply 1/4 inch (1 cubic yard covers 1,296 sq ft). Always add 10% for settling.',
  'Topsoil application depths depend on your turfgrass species and native soil condition: 0.25 to 0.5 inches (0.6 to 1.3 cm) for routine lawn top-dressing to smooth slight depressions; 2 to 4 inches (5 to 10 cm) for overseeding or lawn renovation; and 4 to 6 inches (10 to 15 cm) for establishing a brand-new turf over compacted clay subsoil (Cornell Turfgrass & Penn State Extension guidelines). Multiply area (sq ft) by depth (in) and divide by 324 to determine cubic yards.'
);

// 8. Compost direct answer
toolsContent = toolsContent.replace(
  'Compost application depth depends on use: apply 1/4 to 1/2 inch for established lawn top-dressing, and 1 to 2 inches when tilling into garden soil. Multiply square footage by depth in inches and divide by 324 to calculate cubic yards. One cubic yard covers 648 sq ft at 1/2 inch deep.',
  'Compost application depth depends on purpose: apply 1/4 to 1/2 inch (0.6 to 1.3 cm) for established lawn top-dressing to feed soil microbes without smothering grass blades, and incorporate 1 to 2 inches (2.5 to 5 cm) into the top 6 inches of soil when improving depleted vegetable beds or planting borders per US Composting Council (USCC) guidelines. Multiply area (sq ft) by depth (in) and divide by 324 to get cubic yards.'
);

// 9. Update source URLs across tools.ts
// Cornell
toolsContent = toolsContent.replace('https://cals.cornell.edu/turfgrass', 'https://turf.cals.cornell.edu/');
// Penn State
toolsContent = toolsContent.replace(/https:\/\/extension\.psu\.edu\/soil-management-in-turf-establishment/g, 'https://extension.psu.edu/lawn-establishment');
// NIST
toolsContent = toolsContent.replace(/https:\/\/www\.nist\.gov\/pml\/owm\/handbook-44-current-edition/g, 'https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks');
// USBR
toolsContent = toolsContent.replace('https://www.usbr.gov/tsc/techreferences/mands/mands-pdfs/EarthManual-Part1.pdf', 'https://www.usbr.gov/tsc/techreferences/manualsandguidelines/manuals.html');
// UMD
toolsContent = toolsContent.replace(/https:\/\/extension\.umd\.edu\/resource\/soil-health-lawns-and-gardens/g, 'https://extension.umd.edu/resource/organic-matter-and-soil-amendments');
// Oregon State
toolsContent = toolsContent.replace(/https:\/\/extension\.oregonstate\.edu\/gardening\/techniques\/raised-bed-gardening/g, 'https://catalog.extension.oregonstate.edu/fs270');
// UF IFAS
toolsContent = toolsContent.replace(/https:\/\/edis\.ifas\.ufl\.edu\//g, 'https://gardeningsolutions.ifas.ufl.edu/design/types-of-gardens/raised-beds/');
// WSU
toolsContent = toolsContent.replace('https://pubs.extension.wsu.edu/', 'https://pubs.extension.wsu.edu/backyard-composting-home-garden-series');
// ICPI -> CMHA
toolsContent = toolsContent.replace(/https:\/\/icpi\.org\//g, 'https://masonryandhardscapes.org/');
// FHWA
toolsContent = toolsContent.replace(/https:\/\/www\.fhwa\.dot\.gov\/construction\/gravel\/flh15004\.pdf/g, 'https://www.fhwa.dot.gov/pavement/pub_details.cfm?id=968');
// PCA
toolsContent = toolsContent.replace('https://www.cement.org/', 'https://www.cement.org/intelligence-resources/store/design-control-of-concrete-mixtures/');
// ASTM D448
toolsContent = toolsContent.replace('https://www.astm.org/d0448-24.html', 'https://www.astm.org/d0448-12r22.html');
toolsContent = toolsContent.replace('ASTM D448-24: Standard Classification', 'ASTM D448-12(2022): Standard Classification');

// 10. Update tools workedExample fields to reference workedExampleFixtures
const slugs = [
  "topsoil-calculator",
  "cubic-yard-calculator",
  "pea-gravel-calculator",
  "mulch-calculator",
  "soil-calculator",
  "raised-bed-soil-calculator",
  "compost-calculator",
  "sand-calculator",
  "paver-base-calculator",
  "gravel-driveway-calculator",
  "concrete-calculator",
  "crushed-stone-calculator"
];

for (const slug of slugs) {
  // Regex to match workedExample: { ... } for this tool
  const startIdx = toolsContent.indexOf(`slug: "${slug}"`);
  if (startIdx === -1) continue;
  const weIdx = toolsContent.indexOf('workedExample: {', startIdx);
  if (weIdx === -1) continue;
  
  // Find closing of workedExample
  let depth = 0;
  let endIdx = weIdx;
  for (let i = weIdx; i < toolsContent.length; i++) {
    if (toolsContent[i] === '{') depth++;
    else if (toolsContent[i] === '}') {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }
  
  const replacement = `workedExample: {
      title: workedExampleFixtures["${slug}"].title,
      scenario: workedExampleFixtures["${slug}"].scenario,
      dimensions: workedExampleFixtures["${slug}"].dimensionsDescription,
      steps: workedExampleFixtures["${slug}"].steps,
      finalSummary: workedExampleFixtures["${slug}"].finalSummary,
    }`;
  
  toolsContent = toolsContent.slice(0, weIdx) + replacement + toolsContent.slice(endIdx);
}

fs.writeFileSync('src/lib/tools.ts', toolsContent);
console.log('Successfully updated src/lib/tools.ts');

// 11. Update guides.ts source URLs
let guidesContent = fs.readFileSync('src/lib/guides.ts', 'utf8');
guidesContent = guidesContent.replace(/https:\/\/extension\.psu\.edu\/soil-management-in-turf-establishment/g, 'https://extension.psu.edu/lawn-establishment');
guidesContent = guidesContent.replace(/https:\/\/cals\.cornell\.edu\/turfgrass/g, 'https://turf.cals.cornell.edu/');
guidesContent = guidesContent.replace(/https:\/\/extension\.umd\.edu\/resource\/soil-health-lawns-and-gardens/g, 'https://extension.umd.edu/resource/organic-matter-and-soil-amendments');
guidesContent = guidesContent.replace(/https:\/\/www\.nist\.gov\/pml\/owm\/handbook-44-current-edition/g, 'https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks');
guidesContent = guidesContent.replace(/https:\/\/www\.fhwa\.dot\.gov\/engineering\/geotech\/pubs\/02034\/ch05\.cfm/g, 'https://www.fhwa.dot.gov/pavement/pub_details.cfm?id=968');
guidesContent = guidesContent.replace(/https:\/\/www\.fhwa\.dot\.gov\/construction\/gravel\/flh15004\.pdf/g, 'https://www.fhwa.dot.gov/pavement/pub_details.cfm?id=968');
guidesContent = guidesContent.replace(/https:\/\/extension\.oregonstate\.edu\/gardening\/techniques\/raised-bed-gardening/g, 'https://catalog.extension.oregonstate.edu/fs270');
guidesContent = guidesContent.replace(/https:\/\/edis\.ifas\.ufl\.edu\//g, 'https://gardeningsolutions.ifas.ufl.edu/design/types-of-gardens/raised-beds/');
guidesContent = guidesContent.replace(/https:\/\/www\.rhs\.org\.uk\//g, 'https://www.rhs.org.uk');

fs.writeFileSync('src/lib/guides.ts', guidesContent);
console.log('Successfully updated src/lib/guides.ts');
