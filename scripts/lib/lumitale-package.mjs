// Shared logic for the LumiTale integration (Phase 3J-AU): synchronisation
// from the LumiTale V2 repository, integrity of the synced copy, the
// publishability analysis, and the publication decision. Node built-ins only.
//
// The LumiTale V2 repository (private) is the single source of truth. This
// repository is PUBLIC, so it holds only what may be public:
//   public/apps/lumitale/*.png     approved product artwork for /apps/lumitale
//   vendor/lumitale/manifest.json  source commit, hashes, validator result
//   vendor/lumitale/legal/**       LumiTale's legal/deletion package, ONLY once
//                                  LumiTale's validator reports READY (counsel
//                                  text, real key); drafts are never committed
// Local draft previews read the drafts straight from a LumiTale checkout.
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..", "..");
export const VENDOR = path.join(ROOT, "vendor", "lumitale");
export const VENDOR_LEGAL = path.join(VENDOR, "legal");
export const MANIFEST = path.join(VENDOR, "manifest.json");
export const PRODUCT_PUBLIC = path.join(ROOT, "public", "apps", "lumitale");
export const LEGAL_PUBLIC = path.join(ROOT, "public", "lumitale");

/** A local LumiTale V2 checkout (LUMITALE_V2_DIR or ../LumiTaleV2), if any. */
export function lumitaleCheckout(env = process.env) {
  const dir = path.resolve(env.LUMITALE_V2_DIR ?? path.join(ROOT, "..", "LumiTaleV2"));
  return existsSync(path.join(dir, "website", "lumitale", "privacy", "index.html")) ? dir : null;
}

/** The approved public URLs (owner decision; apex domain since 3J-AU). */
export const APPROVED_ORIGIN = "https://nkdigitalworks.com";
export const LEGAL_ROUTES = ["privacy", "terms", "delete-account"];
export const V2_SUPABASE_URL = "https://jvvjjoplfyruyzsuxmkd.supabase.co";

const TEXT = new Set([".html", ".js", ".css", ".txt", ".md", ".json", ".svg"]);

/** Bytes as stored here: text files with LF line endings, binaries as-is. */
export function normalized(file, bytes = readFileSync(file)) {
  if (!TEXT.has(path.extname(file).toLowerCase())) return bytes;
  return Buffer.from(bytes.toString("utf8").replace(/\r\n/g, "\n"), "utf8");
}

export const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

/** Relative POSIX paths of all files under `dir` (sorted). */
export function listFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  const walk = (d) => {
    for (const name of readdirSync(d).sort()) {
      const full = path.join(d, name);
      if (statSync(full).isDirectory()) walk(full);
      else out.push(path.relative(dir, full).split(path.sep).join("/"));
    }
  };
  walk(dir);
  return out;
}

export function hashTree(dir) {
  return Object.fromEntries(
    listFiles(dir).map((rel) => [rel, sha256(normalized(path.join(dir, rel)))]),
  );
}

/**
 * The synced copy must be exactly what the manifest recorded: no edited,
 * missing or extra file (generated copies are never edited by hand).
 * Returns a list of problems (empty when intact).
 */
export function verifyIntegrity({
  manifestPath = MANIFEST,
  legalDir = VENDOR_LEGAL,
  productDir = PRODUCT_PUBLIC,
} = {}) {
  if (!existsSync(manifestPath)) return ["manifest missing: run npm run sync:lumitale"];
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const problems = [];
  for (const [label, dir, recorded] of [
    ["legal", legalDir, manifest.legal ?? {}],
    ["product", productDir, manifest.product ?? {}],
  ]) {
    const actual = hashTree(dir);
    for (const [rel, hash] of Object.entries(recorded)) {
      if (!(rel in actual)) problems.push(`${label}/${rel}: missing`);
      else if (actual[rel] !== hash) problems.push(`${label}/${rel}: changed since sync`);
    }
    for (const rel of Object.keys(actual)) {
      if (!(rel in recorded)) problems.push(`${label}/${rel}: not from the sync`);
    }
  }
  return problems;
}

const MARKERS = [
  /data-legal-review/,
  /data-legal-decision/,
  /data-draft-banner/,
  /LEGAL REVIEW REQUIRED/i,
  /COUNSEL (DECISION )?REQUIRED/i,
  /COUNSEL TEXT/i,
  /NOT PUBLISHED/,
];

function jwtClaim(key, claim) {
  const parts = key.split(".");
  if (parts.length !== 3) return undefined;
  try {
    return JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"))[claim];
  } catch {
    return undefined;
  }
}

/**
 * Why the package may not be published (empty: publishable). Mirrors the
 * essential rules of LumiTale's tool/website_publish_check.dart, which stays
 * authoritative (its result is recorded in the manifest at sync time).
 */
export function publicationProblems(legalDir = VENDOR_LEGAL) {
  if (!existsSync(legalDir)) {
    return ["legal package not synced (it is synced only once counsel-approved and ready)"];
  }
  const problems = [];
  for (const rel of listFiles(legalDir)) {
    if (!/\.(html|js|css)$/.test(rel)) continue;
    const text = readFileSync(path.join(legalDir, rel), "utf8");
    if (MARKERS.some((m) => m.test(text))) problems.push(`${rel}: unresolved legal-review markers`);
  }
  for (const route of LEGAL_ROUTES) {
    const file = path.join(legalDir, route, "index.html");
    if (!existsSync(file)) {
      problems.push(`${route}: page missing`);
      continue;
    }
    const canonical = readFileSync(file, "utf8").match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== `${APPROVED_ORIGIN}/lumitale/${route}`) {
      problems.push(`${route}: canonical URL is not ${APPROVED_ORIGIN}/lumitale/${route}`);
    }
  }
  const configFile = path.join(legalDir, "assets", "config.js");
  const config = existsSync(configFile) ? readFileSync(configFile, "utf8") : "";
  const field = (name) => config.match(new RegExp(`${name}:\\s*"([^"]*)"`))?.[1];
  const url = field("supabaseUrl");
  const key = field("publishableKey") ?? "";
  if (url !== V2_SUPABASE_URL) problems.push("config: supabaseUrl is not the hosted LumiTale V2 project");
  if (/[<>\s]/.test(key) || key.length < 20) problems.push("config: publishable key not set");
  else if (key.startsWith("sb_secret_") || jwtClaim(key, "role") === "service_role") {
    problems.push("config: a privileged key must never be published");
  } else if (!(key.startsWith("sb_publishable_") || jwtClaim(key, "role") === "anon")) {
    problems.push("config: not a publishable (anon) key");
  } else if (jwtClaim(key, "iss") === "supabase-demo") {
    problems.push("config: the local development key");
  }
  return problems;
}

/**
 * The publication decision (pure, for tests):
 * - explicit approval (LUMITALE_LEGAL_PUBLISH=approved) publishes only a
 *   ready package, and FAILS the build otherwise, so an approval can never
 *   silently publish drafts or silently do nothing;
 * - drafts are shown only locally (npm run dev, or LUMITALE_LEGAL_DRAFTS=local),
 *   never on Vercel;
 * - otherwise nothing is published and the corporate site builds normally.
 */
export function decide({ mode, env, ready, problems }) {
  const onVercel = Boolean(env.VERCEL);
  if (env.LUMITALE_LEGAL_PUBLISH === "approved") {
    if (!ready) return { action: "fail", reason: `publication approved but not publishable: ${problems.join("; ")}` };
    return { action: "publish", reason: "approved and publishable" };
  }
  if (!onVercel && (mode === "dev" || env.LUMITALE_LEGAL_DRAFTS === "local")) {
    return { action: "draft", reason: "local draft preview (never deployed)" };
  }
  return {
    action: "withhold",
    reason: ready ? "publishable, awaiting LUMITALE_LEGAL_PUBLISH=approved" : problems.join("; "),
  };
}
