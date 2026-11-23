import { verifyBuildFreshness } from '../src/lib/build-fingerprint';

/**
 * Deterministic build freshness gate for Playwright E2E tests.
 *
 * Verifies that:
 * 1. A production Next.js build exists in .next/.
 * 2. .next/BUILD_ID matches the SHA-256 fingerprint generated from the current source tree.
 *
 * Throws immediately if the build is missing, incomplete, or stale, preventing
 * Playwright from executing tests against out-of-date assets.
 */
export default async function globalSetup() {
  const result = verifyBuildFreshness();
  console.log(
    `[Playwright E2E Gate] Verified fresh production build: BUILD_ID=${result.buildId} matching current source fingerprint (${result.fingerprint})`
  );
}
