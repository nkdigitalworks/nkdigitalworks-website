import { existsSync } from "node:fs";
import path from "node:path";

/**
 * LumiTale's legal pages (Phase 3J-AU). They are static files that
 * scripts/lumitale-legal-gate.mjs places under public/lumitale/ only when
 * publication is allowed (counsel-approved, configured and explicitly
 * approved), or as drafts in local development. Pages that link to them must
 * check `lumitaleLegalPublished()` so a production build never links to a
 * page that is not there.
 *
 * Server-only (reads the filesystem at build/render time).
 */
export const lumitaleLegalPages = [
  { label: "Privacy Policy", href: "/lumitale/privacy" },
  { label: "Terms of Service", href: "/lumitale/terms" },
  { label: "Delete your account", href: "/lumitale/delete-account" },
] as const;

export function lumitaleLegalPublished(): boolean {
  return lumitaleLegalPages.every((page) =>
    existsSync(path.join(process.cwd(), "public", page.href, "index.html")),
  );
}
