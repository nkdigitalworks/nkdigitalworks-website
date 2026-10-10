// Synchronises LumiTale's website material from the LumiTale V2 repository,
// the single source of truth (Phase 3J-AU/AV).
//
//   npm run sync:lumitale            copy + write vendor/lumitale/manifest.json
//   npm run sync:lumitale -- --check verify the copy still matches the source
//
// Source: LUMITALE_V2_DIR, or ../LumiTaleV2 next to this repository.
// This repository is PUBLIC, so:
//   <source>/website/product/**   -> public/apps/lumitale/**   (always: approved artwork)
//   <source>/website/lumitale/**  -> vendor/lumitale/legal/**  ONLY when LumiTale's
//        own check (dart run tool/website_publish_check.dart) reports READY, i.e.
//        counsel-approved text and the hosted publishable key; drafts are never
//        copied here (local previews read them from the checkout instead).
// Text files are normalised to LF; each file's SHA-256, the source commit and
// the validator result are recorded. The source must be committed (use
// --allow-dirty only for local experiments). Deployments build from the
// committed copy and never need the LumiTale repository.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  MANIFEST,
  PRODUCT_PUBLIC,
  ROOT,
  VENDOR_LEGAL,
  hashTree,
  listFiles,
  normalized,
} from "./lib/lumitale-package.mjs";

const check = process.argv.includes("--check");
const allowDirty = process.argv.includes("--allow-dirty");
const source = path.resolve(process.env.LUMITALE_V2_DIR ?? path.join(ROOT, "..", "LumiTaleV2"));
const legalSource = path.join(source, "website", "lumitale");
const productSource = path.join(source, "website", "product");

const fail = (message) => {
  console.error(`sync:lumitale: ${message}`);
  process.exit(1);
};

if (!existsSync(path.join(source, "pubspec.yaml")) ||
    !/^name:\s*lumitale\s*$/m.test(readFileSync(path.join(source, "pubspec.yaml"), "utf8"))) {
  fail(`not a LumiTale V2 checkout: ${source} (set LUMITALE_V2_DIR)`);
}
for (const dir of [legalSource, productSource]) {
  if (!existsSync(dir)) fail(`missing ${path.relative(source, dir)} in the LumiTale repository`);
}

const git = (...args) => spawnSync("git", ["-C", source, ...args], { encoding: "utf8" });
const commit = git("rev-parse", "HEAD").stdout.trim();
const dirty = git("status", "--porcelain", "--", "website", "tool/website", "tool/branding").stdout.trim();

// LumiTale's authoritative publication check (Dart). A fixed command string
// (no user input): on Windows `dart` is a .bat shim that needs a shell.
// Unavailable = not ready.
const validator = spawnSync("dart run tool/website_publish_check.dart", {
  cwd: source,
  encoding: "utf8",
  shell: true,
});
const ready = validator.status === 0;
const summary = (validator.stdout ?? "").trim().split(/\r?\n/).filter((l) => l.startsWith("WEBSITE PUBLISH")).pop() ??
  "validator unavailable";

const compare = (label, from, to, drift) => {
  const a = hashTree(from);
  const b = hashTree(to);
  for (const rel of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (a[rel] !== b[rel]) drift.push(`${label}/${rel}`);
  }
};

if (check) {
  const drift = [];
  compare("product", productSource, PRODUCT_PUBLIC, drift);
  if (ready) compare("legal", legalSource, VENDOR_LEGAL, drift);
  else if (existsSync(VENDOR_LEGAL)) drift.push("legal/ present although LumiTale is NOT READY");
  if (drift.length) fail(`copy differs from LumiTale source (${drift.length}): ${drift.join(", ")}`);
  console.log(
    `sync:lumitale: copy matches LumiTale source (${commit.slice(0, 7)}; legal package ${ready ? "included" : "not included: " + summary})${dirty ? "; source has uncommitted changes" : ""}.`,
  );
  process.exit(0);
}

if (dirty && !allowDirty) fail("LumiTale website sources have uncommitted changes; commit them first (or --allow-dirty locally).");

const copyTree = (from, to) => {
  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });
  for (const rel of listFiles(from)) {
    const target = path.join(to, rel);
    mkdirSync(path.dirname(target), { recursive: true });
    writeFileSync(target, normalized(path.join(from, rel)));
  }
};
copyTree(productSource, PRODUCT_PUBLIC);
if (ready) copyTree(legalSource, VENDOR_LEGAL);
else rmSync(VENDOR_LEGAL, { recursive: true, force: true });

const manifest = {
  source: "LumiTale V2 repository",
  sourceCommit: commit,
  sourceClean: !dirty,
  publishCheck: { ready, summary },
  legalIncluded: ready,
  legal: ready ? hashTree(VENDOR_LEGAL) : {},
  product: hashTree(PRODUCT_PUBLIC),
};
mkdirSync(path.dirname(MANIFEST), { recursive: true });
writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(
  `sync:lumitale: ${Object.keys(manifest.product).length} product files from ${commit.slice(0, 7)}; legal package ${ready ? `included (${Object.keys(manifest.legal).length} files)` : "NOT included (drafts stay in LumiTale)"}; ${summary}`,
);
