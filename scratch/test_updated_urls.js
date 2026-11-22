const fs = require('fs');

const candidateUrls = [
  // Tools
  { id: 'topsoil-1', org: 'Cornell Turfgrass Program', title: 'Lawn Care Guidelines: Topdressing and Cultivation', url: 'https://turf.cals.cornell.edu/' },
  { id: 'topsoil-2', org: 'Penn State Extension', title: 'Lawn Establishment and Renovation', url: 'https://extension.psu.edu/lawn-establishment-and-renovation' },
  { id: 'cubic-yard-1', org: 'NIST', title: 'NIST Handbook 44: Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices', url: 'https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks' },
  { id: 'cubic-yard-2', org: 'US Bureau of Reclamation', title: 'Earth Manual Part 1 (Third Edition)', url: 'https://www.usbr.gov/tsc/techreferences/manualsandguidelines/manuals.html' },
  { id: 'pea-gravel-1', org: 'ASTM International', title: 'ASTM C33 / C33M-23: Concrete Aggregates', url: 'https://www.astm.org/c0033_c0033m-23.html' },
  { id: 'pea-gravel-2', org: 'ASLA', title: 'American Society of Landscape Architects: Aggregate Surfacing Guidelines', url: 'https://www.asla.org/' },
  { id: 'mulch-1', org: 'International Society of Arboriculture (ISA)', title: 'Proper Mulching Guidelines', url: 'https://www.treesaregood.org/treeowner/mulching' },
  { id: 'mulch-2', org: 'Purdue Extension', title: 'Mulch Practices for Landscapes (FNR-492-W)', url: 'https://www.extension.purdue.edu/extmedia/FNR/FNR-492-W.pdf' },
  { id: 'soil-1', org: 'USDA NRCS', title: 'Soil Quality for Environmental Health: Organic Matter and Pore Space', url: 'https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soil' },
  { id: 'soil-2', org: 'University of Maryland Extension', title: 'Organic Matter and Soil Amendments (HGIC)', url: 'https://extension.umd.edu/resource/organic-matter-and-soil-amendments' },
  { id: 'raised-bed-1', org: 'Oregon State University Extension', title: 'Raised Bed Gardening (FS 270)', url: 'https://catalog.extension.oregonstate.edu/fs270' },
  { id: 'raised-bed-2', org: 'University of Florida IFAS Extension', title: 'Gardening in Raised Beds (EDIS Publication EP472 / ENH1211)', url: 'https://edis.ifas.ufl.edu/publication/EP472' },
  { id: 'compost-1', org: 'US Composting Council (USCC)', title: 'Seal of Testing Assurance (STA) Program: Consumer Application Rates', url: 'https://www.compostingcouncil.org/page/CertifiedCompostSTA' },
  { id: 'compost-2', org: 'Washington State University Extension', title: 'Backyard Composting: Home Garden Series (EB1784E)', url: 'https://pubs.extension.wsu.edu/backyard-composting-home-garden-series' },
  { id: 'sand-1', org: 'ASTM International', title: 'ASTM C33 / C33M-23: Fine Aggregate', url: 'https://www.astm.org/c0033_c0033m-23.html' },
  { id: 'sand-2', org: 'Concrete Masonry & Hardscapes Association (CMHA / ICPI)', title: 'Tech Spec 2: Construction of Interlocking Concrete Pavements', url: 'https://masonryandhardscapes.org/' },
  { id: 'paver-base-1', org: 'Concrete Masonry & Hardscapes Association (CMHA / ICPI)', title: 'Tech Spec 4: Structural Design of Interlocking Concrete Pavements', url: 'https://masonryandhardscapes.org/' },
  { id: 'paver-base-2', org: 'ASTM International', title: 'ASTM D2940 / D2940M-20: Graded Aggregate Material for Bases or Subbases', url: 'https://www.astm.org/d2940_d2940m-20.html' },
  { id: 'driveway-1', org: 'Federal Highway Administration (FHWA)', title: 'Gravel Roads Construction and Maintenance Guide (FHWA-HIF-15-002)', url: 'https://www.fhwa.dot.gov/pavement/pub_details.cfm?id=968' },
  { id: 'driveway-2', org: 'Penn State Center for Dirt and Gravel Road Studies', title: 'Driving Surface Aggregate Standards & Maintenance', url: 'https://www.dirtandgravel.psu.edu/' },
  { id: 'concrete-1', org: 'American Concrete Institute (ACI)', title: 'ACI 302.1R-15: Guide to Concrete Floor and Slab Construction', url: 'https://www.concrete.org/store/productdetail.aspx?ItemID=302115' },
  { id: 'concrete-2', org: 'Portland Cement Association (PCA)', title: 'Design and Control of Concrete Mixtures (EB001)', url: 'https://www.cement.org/learn/concrete-technology/concrete-design-production' },
  { id: 'crushed-stone-1', org: 'ASTM International', title: 'ASTM D448-12(2022): Sizes of Aggregate for Road and Bridge Construction', url: 'https://www.astm.org/d0448-12r22.html' },
  { id: 'crushed-stone-2', org: 'National Stone, Sand & Gravel Association (NSSGA)', title: 'NSSGA Aggregate Handbook', url: 'https://www.nssga.org/' },

  // Guides
  { id: 'g-measure-1', org: 'Penn State Extension', title: 'Lawn Establishment and Renovation', url: 'https://extension.psu.edu/lawn-establishment-and-renovation' },
  { id: 'g-measure-2', org: 'USDA NRCS', title: 'National Engineering Handbook: Measurement of Areas and Earthwork', url: 'https://www.nrcs.usda.gov/' },
  { id: 'g-topsoil-1', org: 'Cornell Turfgrass Program', title: 'Lawn Establishment and Renovation Guide', url: 'https://turf.cals.cornell.edu/' },
  { id: 'g-topsoil-2', org: 'University of Maryland Extension', title: 'Organic Matter and Soil Amendments', url: 'https://extension.umd.edu/resource/organic-matter-and-soil-amendments' },
  { id: 'g-mulch-1', org: 'International Society of Arboriculture (ISA)', title: 'Proper Mulching Techniques', url: 'https://www.treesaregood.org/treeowner/mulching' },
  { id: 'g-mulch-2', org: 'Purdue Extension', title: 'Mulching Landscape Trees and Shrubs (FNR-492-W)', url: 'https://www.extension.purdue.edu/extmedia/FNR/FNR-492-W.pdf' },
  { id: 'g-bulk-density-1', org: 'NIST', title: 'NIST Handbook 44: Specifications, Tolerances, and Other Technical Requirements for Weighing and Measuring Devices', url: 'https://www.nist.gov/pml/weights-and-measures/publications/nist-handbooks' },
  { id: 'g-bulk-density-2', org: 'NIST', title: 'NIST Special Publication 811: Guide for the Use of the International System of Units (SI)', url: 'https://www.nist.gov/pml/special-publication-811' },
  { id: 'g-bulk-density-3', org: 'ASTM International', title: 'ASTM C29 / C29M-23: Bulk Density (Unit Weight) and Voids in Aggregate', url: 'https://www.astm.org/c0029_c0029m-23.html' },
  { id: 'g-bulk-density-4', org: 'Federal Highway Administration (FHWA)', title: 'FHWA Geotechnical Publications Library', url: 'https://www.fhwa.dot.gov/engineering/geotech/pubs.cfm' },
  { id: 'g-driveway-1', org: 'Federal Highway Administration (FHWA)', title: 'Gravel Roads Construction and Maintenance Guide (FHWA-HIF-15-002)', url: 'https://www.fhwa.dot.gov/pavement/pub_details.cfm?id=968' },
  { id: 'g-driveway-2', org: 'Penn State Center for Dirt and Gravel Road Studies', title: 'Environmentally Sensitive Maintenance for Dirt and Gravel Roads', url: 'https://www.dirtandgravel.psu.edu/' },
  { id: 'g-concrete-1', org: 'American Concrete Institute (ACI)', title: 'ACI 302.1R-15: Guide to Concrete Floor and Slab Construction', url: 'https://www.concrete.org/store/productdetail.aspx?ItemID=302115' },
  { id: 'g-concrete-2', org: 'ASTM International', title: 'ASTM C387 / C387M-23: Packaged, Dry, Combined Materials for Mortar and Concrete', url: 'https://www.astm.org/c0387_c0387m-23.html' },
  { id: 'g-raised-bed-1', org: 'Oregon State University Extension', title: 'Raised Bed Gardening (FS 270)', url: 'https://catalog.extension.oregonstate.edu/fs270' },
  { id: 'g-raised-bed-2', org: 'University of Florida IFAS Extension', title: 'Gardening in Raised Beds (EDIS EP472)', url: 'https://edis.ifas.ufl.edu/publication/EP472' },
  { id: 'g-geometry-1', org: 'USDA NRCS', title: 'National Engineering Handbook: Surveying and Geometric Earthwork Measurements', url: 'https://www.nrcs.usda.gov/' },
  { id: 'g-geometry-2', org: 'Royal Horticultural Society (RHS)', title: 'Measuring Your Garden Scale Plans', url: 'https://www.rhs.org.uk/garden-design/measuring-your-garden' }
];

async function check(item) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    const res = await fetch(item.url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeout);
    let title = '';
    try {
      const text = await res.text();
      const m = /<title[^>]*>([^<]+)<\/title>/i.exec(text);
      if (m) title = m[1].trim().replace(/\s+/g, ' ');
    } catch {}
    return {
      ...item,
      status: res.status,
      ok: res.ok,
      finalUrl: res.url,
      pageTitle: title
    };
  } catch (err) {
    return {
      ...item,
      status: err.name === 'AbortError' ? 'TIMEOUT' : 'ERROR',
      ok: false,
      finalUrl: item.url,
      pageTitle: '',
      error: err.message
    };
  }
}

async function run() {
  console.log(`Running audit on ${candidateUrls.length} candidate URLs...`);
  const results = [];
  // Run in chunks of 5
  for (let i = 0; i < candidateUrls.length; i += 5) {
    const chunk = candidateUrls.slice(i, i + 5);
    const chunkResults = await Promise.all(chunk.map(check));
    results.push(...chunkResults);
    chunkResults.forEach(r => {
      console.log(`[${r.status}] ${r.id} -> ${r.url} (${r.pageTitle.slice(0, 40)})`);
    });
  }
  fs.writeFileSync('scratch/updated_url_results.json', JSON.stringify(results, null, 2));
  console.log(`Finished. Saved to scratch/updated_url_results.json`);
}

run();
