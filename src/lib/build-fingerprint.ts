import fs from "fs";
import path from "path";
import crypto from "crypto";

function getFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Computes a deterministic 16-character hexadecimal SHA-256 fingerprint
 * based on all source files, templates, assets, and configurations that
 * contribute to the Next.js production build.
 */
export function computeSourceFingerprint(root: string = process.cwd()): string {
  const hash = crypto.createHash("sha256");
  const targetFiles = [
    ...getFilesRecursively(path.join(root, "src")),
    ...getFilesRecursively(path.join(root, "public")),
    path.join(root, "next.config.ts"),
    path.join(root, "tsconfig.json"),
    path.join(root, "package.json"),
  ].filter((f) => fs.existsSync(f));

  // Sort paths for deterministic cross-platform order
  targetFiles.sort((a, b) => {
    const relA = path.relative(root, a).replace(/\\/g, "/");
    const relB = path.relative(root, b).replace(/\\/g, "/");
    return relA.localeCompare(relB);
  });

  for (const file of targetFiles) {
    const relativePath = path.relative(root, file).replace(/\\/g, "/");
    const content = fs.readFileSync(file);
    hash.update(`${relativePath}:${content.length}:`);
    hash.update(content);
  }

  return hash.digest("hex").slice(0, 16);
}

/**
 * Validates that an existing production build matches the current source tree.
 * Throws an informative Error if the build is missing or stale.
 */
export function verifyBuildFreshness(root: string = process.cwd()): {
  buildId: string;
  fingerprint: string;
  isFresh: boolean;
} {
  const buildIdPath = path.join(root, ".next", "BUILD_ID");
  const manifestPath = path.join(root, ".next", "build-manifest.json");

  if (!fs.existsSync(buildIdPath) || !fs.existsSync(manifestPath)) {
    throw new Error(
      `[Playwright E2E Gate] Production Next.js build not found in .next/ directory.\n` +
      `Please execute "npm run verify" (or "npm run build") before running E2E tests.`
    );
  }

  const buildId = fs.readFileSync(buildIdPath, "utf8").trim();
  const currentFingerprint = `ym-${computeSourceFingerprint(root)}`;

  if (buildId !== currentFingerprint) {
    throw new Error(
      `[Playwright E2E Gate] Stale production build detected!\n` +
      `Current source fingerprint is: "${currentFingerprint}"\n` +
      `Existing .next/BUILD_ID is:     "${buildId}"\n\n` +
      `The build in .next/ does not match the current source code.\n` +
      `Please run the mandatory release sequence:\n` +
      `  npm run verify && npm run test:e2e\n` +
      `to compile the current source before executing browser E2E tests.`
    );
  }

  return {
    buildId,
    fingerprint: currentFingerprint,
    isFresh: true,
  };
}
