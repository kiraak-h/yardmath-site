import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { computeSourceFingerprint, verifyBuildFreshness } from "./build-fingerprint";

describe("build-fingerprint: Build Freshness Gate", () => {
  it("computes a deterministic 16-character hex fingerprint for the current source tree", () => {
    const fp1 = computeSourceFingerprint();
    const fp2 = computeSourceFingerprint();
    expect(fp1).toBeTypeOf("string");
    expect(fp1).toHaveLength(16);
    expect(/^[0-9a-f]{16}$/.test(fp1)).toBe(true);
    expect(fp1).toBe(fp2);
  });

  it("detects source modifications and produces different fingerprints", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ym-fp-test-"));
    try {
      fs.mkdirSync(path.join(tempDir, "src"), { recursive: true });
      fs.writeFileSync(path.join(tempDir, "src", "index.ts"), "export const a = 1;");

      const fp1 = computeSourceFingerprint(tempDir);

      fs.writeFileSync(path.join(tempDir, "src", "index.ts"), "export const a = 2;");
      const fp2 = computeSourceFingerprint(tempDir);

      expect(fp1).not.toBe(fp2);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("throws descriptive error when .next or BUILD_ID is missing", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ym-freshness-missing-"));
    try {
      expect(() => verifyBuildFreshness(tempDir)).toThrow(
        /Production Next\.js build not found in \.next\/ directory/
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("throws descriptive error when .next/build-manifest.json is missing", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ym-manifest-missing-"));
    try {
      const nextDir = path.join(tempDir, ".next");
      fs.mkdirSync(nextDir, { recursive: true });
      fs.writeFileSync(path.join(nextDir, "BUILD_ID"), "ym-test1234");

      expect(() => verifyBuildFreshness(tempDir)).toThrow(
        /Production Next\.js build not found in \.next\/ directory/
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("throws descriptive error when .next/BUILD_ID is stale or invalid", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ym-stale-"));
    try {
      fs.mkdirSync(path.join(tempDir, "src"), { recursive: true });
      fs.writeFileSync(path.join(tempDir, "src", "page.tsx"), "export default function P() {}");

      const nextDir = path.join(tempDir, ".next");
      fs.mkdirSync(nextDir, { recursive: true });
      fs.writeFileSync(path.join(nextDir, "BUILD_ID"), "ym-stale-hash-value");
      fs.writeFileSync(path.join(nextDir, "build-manifest.json"), "{}");

      expect(() => verifyBuildFreshness(tempDir)).toThrow(
        /Stale production build detected/
      );
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("succeeds when .next/BUILD_ID matches the computed source fingerprint", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "ym-match-"));
    try {
      fs.mkdirSync(path.join(tempDir, "src"), { recursive: true });
      fs.writeFileSync(path.join(tempDir, "src", "page.tsx"), "export default function P() {}");

      const expectedFp = `ym-${computeSourceFingerprint(tempDir)}`;

      const nextDir = path.join(tempDir, ".next");
      fs.mkdirSync(nextDir, { recursive: true });
      fs.writeFileSync(path.join(nextDir, "BUILD_ID"), expectedFp);
      fs.writeFileSync(path.join(nextDir, "build-manifest.json"), "{}");

      const result = verifyBuildFreshness(tempDir);
      expect(result.isFresh).toBe(true);
      expect(result.buildId).toBe(expectedFp);
      expect(result.fingerprint).toBe(expectedFp);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
