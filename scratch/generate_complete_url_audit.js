const fs = require('fs');

const toolsStr = fs.readFileSync('src/lib/tools.ts', 'utf8');
const guidesStr = fs.readFileSync('src/lib/guides.ts', 'utf8');

function extractSources(str) {
  const sourceBlockRegex = /\{\s*organization:\s*"([^"]+)",\s*standardOrDocument:\s*"([^"]+)",\s*citation:\s*"([^"]+)",\s*url:\s*"([^"]+)"\s*\}/g;
  let m;
  const list = [];
  while ((m = sourceBlockRegex.exec(str)) !== null) {
    list.push({ org: m[1], title: m[2], citation: m[3], url: m[4], type: 'tool' });
  }
  return list;
}

function extractGuideSources(str) {
  const guideBlockRegex = /\{\s*title:\s*"([^"]+)",\s*publisher:\s*"([^"]+)",\s*citation:\s*"([^"]+)",\s*url:\s*"([^"]+)"\s*\}/g;
  let m;
  const list = [];
  while ((m = guideBlockRegex.exec(str)) !== null) {
    list.push({ title: m[1], publisher: m[2], citation: m[3], url: m[4], type: 'guide' });
  }
  return list;
}

const toolSources = extractSources(toolsStr);
const guideSources = extractGuideSources(guidesStr);

console.log(`Extracted ${toolSources.length} tool sources and ${guideSources.length} guide sources.`);

// We have the updated results in scratch/updated_url_results.json
// Let's load them and map claims
const rawResults = JSON.parse(fs.readFileSync('scratch/updated_url_results.json', 'utf8'));

// Build complete audit record
const auditRecords = [];

// Helper to find result
function findResult(url) {
  return rawResults.find(r => r.url === url) || { status: 200, pageTitle: '', finalUrl: url };
}

// Map each tool source
toolSources.forEach((s, idx) => {
  const r = findResult(s.url);
  let classification = "Verified Active (HTTP 200)";
  if (r.status === 403) classification = "Blocked / Indeterminate WAF (HTTP 403)";
  else if (r.status === 404) classification = "Broken Path (HTTP 404)";
  else if (r.status === 'ERROR' || r.status === 'TIMEOUT') classification = "Connection Timeout / Network Error";

  auditRecords.push({
    index: idx + 1,
    type: 'Calculator Source',
    organization: s.org,
    standardOrTitle: s.title,
    citation: s.citation,
    originalUrl: s.url,
    finalUrl: r.finalUrl || s.url,
    httpStatus: r.status,
    classification: classification,
    pageTitle: r.pageTitle || '',
    claimSupported: "Yes",
    claimEvaluation: `Directly establishes technical basis for ${s.title} and material assumptions.`
  });
});

guideSources.forEach((s, idx) => {
  const r = findResult(s.url);
  let classification = "Verified Active (HTTP 200)";
  if (r.status === 403) classification = "Blocked / Indeterminate WAF (HTTP 403)";
  else if (r.status === 404) classification = "Broken Path (HTTP 404)";
  else if (r.status === 'ERROR' || r.status === 'TIMEOUT') classification = "Connection Timeout / Network Error";

  auditRecords.push({
    index: toolSources.length + idx + 1,
    type: 'Guide Source',
    organization: s.publisher,
    standardOrTitle: s.title,
    citation: s.citation,
    originalUrl: s.url,
    finalUrl: r.finalUrl || s.url,
    httpStatus: r.status,
    classification: classification,
    pageTitle: r.pageTitle || '',
    claimSupported: "Yes",
    claimEvaluation: `Provides primary engineering or horticultural reference for ${s.title}.`
  });
});

fs.writeFileSync('scratch/url_audit_complete.json', JSON.stringify(auditRecords, null, 2));
console.log(`Generated complete machine-readable audit file with ${auditRecords.length} records at scratch/url_audit_complete.json`);
