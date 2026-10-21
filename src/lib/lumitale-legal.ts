import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * LumiTale's legal pages (Phase 3J-AU). They are static files that
 * scripts/lumitale-legal-gate.mjs places under public/lumitale/ only when
 * publication is allowed (counsel-approved, configured and explicitly
 * approved), or as drafts in local development. Pages that link to them must
 * check `lumitaleLegalState()` so a production build never links to a page
 * that is not there, and a local draft is never presented as published.
 *
 * Server-only (reads the filesystem at build/render time).
 */
export const lumitaleLegalPages = [
  {
    label: "Privacy Policy",
    href: "/lumitale/privacy",
    description: "What LumiTale collects about a family, why, and who processes it.",
  },
  {
    label: "Terms of Service",
    href: "/lumitale/terms",
    description: "The terms for the parent or guardian who holds the account.",
  },
  {
    label: "Delete your account",
    href: "/lumitale/delete-account",
    description: "How a parent deletes the LumiTale account and its data.",
  },
] as const;

/**
 * - "published": the gate placed a counsel-approved package (no review markers);
 * - "draft": local preview of LumiTale's drafts (never on Vercel);
 * - "withheld": nothing placed; the routes return 404.
 */
export type LumitaleLegalState = "published" | "draft" | "withheld";

// The markers LumiTale's drafts carry until counsel resolves them (the same
// ones its publication validator and the gate refuse).
const DRAFT_MARKERS = /data-draft-banner|data-legal-review|data-legal-decision/;

export function lumitaleLegalState(root: string = process.cwd()): LumitaleLegalState {
  const files = lumitaleLegalPages.map((page) =>
    path.join(root, "public", page.href, "index.html"),
  );
  if (!files.every((file) => existsSync(file))) return "withheld";
  return files.some((file) => DRAFT_MARKERS.test(readFileSync(file, "utf8")))
    ? "draft"
    : "published";
}

/** True only for a published (counsel-approved) package, never for drafts. */
export function lumitaleLegalPublished(root?: string): boolean {
  return lumitaleLegalState(root) === "published";
}
