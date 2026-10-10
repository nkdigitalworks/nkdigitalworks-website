// LumiTale legal-page publication gate (Phase 3J-AU/AV). Runs before every
// build (npm "prebuild") and dev server (npm "predev").
//
// 1. Verifies the synced LumiTale copy is intact (fails the build if a
//    generated file was edited, removed or added by hand).
// 2. Decides whether /lumitale/{privacy,terms,delete-account} may be served:
//    - published only from the committed package (synced only once LumiTale's
//      validator reports READY), when it is still ready now AND
//      LUMITALE_LEGAL_PUBLISH=approved is set for the deployment;
//    - drafts only locally (dev, or LUMITALE_LEGAL_DRAFTS=local), never on
//      Vercel, read straight from a local LumiTale checkout (drafts are never
//      committed to this public repository);
//    - otherwise withheld: public/lumitale/ is removed and the routes 404,
//      while the company site builds normally.
// Usage: node scripts/lumitale-legal-gate.mjs [--dev]
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  LEGAL_PUBLIC,
  MANIFEST,
  VENDOR_LEGAL,
  decide,
  listFiles,
  lumitaleCheckout,
  normalized,
  publicationProblems,
  verifyIntegrity,
} from "./lib/lumitale-package.mjs";

const mode = process.argv.includes("--dev") ? "dev" : "build";

const integrity = verifyIntegrity();
if (integrity.length > 0) {
  console.error("LumiTale sync copy is not intact (never edit generated files; run npm run sync:lumitale):");
  for (const problem of integrity) console.error(`  - ${problem}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const problems = publicationProblems();
if (existsSync(VENDOR_LEGAL) && !manifest.publishCheck?.ready) {
  problems.unshift("LumiTale's own publication check did not pass at sync time");
}
const ready = problems.length === 0;
const decision = decide({ mode, env: process.env, ready, problems });

rmSync(LEGAL_PUBLIC, { recursive: true, force: true });
switch (decision.action) {
  case "fail":
    console.error(`LumiTale legal pages: ${decision.reason}`);
    process.exit(1);
    break;
  case "publish":
    cpSync(VENDOR_LEGAL, LEGAL_PUBLIC, { recursive: true });
    console.log(`LumiTale legal pages: PUBLISHED (${decision.reason}).`);
    break;
  case "draft": {
    const checkout = lumitaleCheckout();
    const source = existsSync(VENDOR_LEGAL)
      ? VENDOR_LEGAL
      : checkout && path.join(checkout, "website", "lumitale");
    if (!source) {
      console.log("LumiTale legal pages: no local LumiTale checkout; drafts not shown (routes 404).");
      break;
    }
    for (const rel of listFiles(source)) {
      const target = path.join(LEGAL_PUBLIC, rel);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(target, normalized(path.join(source, rel)));
    }
    console.log(`LumiTale legal pages: DRAFT copies served locally only (${decision.reason}).`);
    break;
  }
  default:
    console.log(`LumiTale legal pages: withheld, routes return 404 (${decision.reason}).`);
}
