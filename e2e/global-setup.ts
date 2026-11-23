import fs from 'fs';
import path from 'path';

export default async function globalSetup() {
  const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
  const manifestPath = path.join(process.cwd(), '.next', 'build-manifest.json');

  if (!fs.existsSync(buildIdPath) || !fs.existsSync(manifestPath)) {
    throw new Error(
      `[Playwright E2E Gate] Production Next.js build not found in .next/ directory.\n` +
      `Please execute "npm run build" before running E2E tests to ensure tests run against the current production build.`
    );
  }

  const buildId = fs.readFileSync(buildIdPath, 'utf8').trim();
  const buildMtime = fs.statSync(buildIdPath).mtime;

  console.log(`[Playwright E2E Gate] Verified production build present: BUILD_ID=${buildId} (built ${buildMtime.toISOString()})`);
}
