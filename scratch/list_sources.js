const fs = require('fs');
const toolsStr = fs.readFileSync('src/lib/tools.ts', 'utf8');
const guidesStr = fs.readFileSync('src/lib/guides.ts', 'utf8');

function extractSources(str, label) {
  const sourceBlockRegex = /\{\s*organization:\s*"([^"]+)",\s*standardOrDocument:\s*"([^"]+)",\s*citation:\s*"([^"]+)",\s*url:\s*"([^"]+)"\s*\}/g;
  let m;
  const list = [];
  while ((m = sourceBlockRegex.exec(str)) !== null) {
    list.push({ org: m[1], title: m[2], citation: m[3], url: m[4] });
  }
  return list;
}

function extractGuideSources(str) {
  const guideBlockRegex = /\{\s*title:\s*"([^"]+)",\s*publisher:\s*"([^"]+)",\s*citation:\s*"([^"]+)",\s*url:\s*"([^"]+)"\s*\}/g;
  let m;
  const list = [];
  while ((m = guideBlockRegex.exec(str)) !== null) {
    list.push({ title: m[1], publisher: m[2], citation: m[3], url: m[4] });
  }
  return list;
}

const toolSources = extractSources(toolsStr);
const guideSources = extractGuideSources(guidesStr);

console.log(`Tool Sources (${toolSources.length}):`);
toolSources.forEach((s, i) => console.log(`${i+1}. [${s.org}] ${s.title} -> ${s.url}`));

console.log(`\nGuide Sources (${guideSources.length}):`);
guideSources.forEach((s, i) => console.log(`${i+1}. [${s.publisher}] ${s.title} -> ${s.url}`));
