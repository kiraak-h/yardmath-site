const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// We'll read the sources from scratch/list_sources.js data
const listSourcesCode = fs.readFileSync('scratch/list_sources.js', 'utf8');

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

const allSources = [...extractSources(toolsStr), ...extractGuideSources(guidesStr)];

async function checkUrl(item) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(item.url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      signal: controller.signal,
      redirect: 'follow'
    });
    clearTimeout(timeout);
    return { url: item.url, title: item.title, status: res.status, ok: res.ok, finalUrl: res.url };
  } catch (err) {
    return { url: item.url, title: item.title, status: 'ERROR', error: err.message };
  }
}

async function run() {
  console.log(`Testing ${allSources.length} URLs...`);
  const results = [];
  for (const s of allSources) {
    const r = await checkUrl(s);
    results.push(r);
    console.log(`${r.status === 200 || r.ok ? '✓' : '✗'} [${r.status}] ${s.url} (${s.title.slice(0, 35)}...)`);
  }
  fs.writeFileSync('scratch/url_test_results.json', JSON.stringify(results, null, 2));
}

run();
