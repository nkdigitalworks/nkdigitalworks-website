// Publication safety of LumiTale's legal drafts as the local preview serves
// them. The drafts live only in the (private) LumiTale repository, never
// here, so these tests read a local checkout and are skipped where none
// exists. They check only generic protections: every page is still marked
// as a draft and not indexable, the deletion form stays disabled, nothing
// secret is embedded, and LumiTale's pages stay separate from the company
// policies. Checks of the drafts' wording live in the LumiTale repository
// (this repository is public).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

import { listFiles, lumitaleCheckout } from "../scripts/lib/lumitale-package.mjs";

const checkout = lumitaleCheckout();
const dir = checkout && path.join(checkout, "website", "lumitale");
const read = (rel) => readFileSync(path.join(dir, rel), "utf8");
const page = (route) => read(`${route}/index.html`);
const ROUTES = ["privacy", "terms", "delete-account"];

describe("LumiTale legal drafts", { skip: !checkout && "no local LumiTale checkout (set LUMITALE_V2_DIR)" }, () => {
  test("every page stays a draft: noindex, banner, review markers, own canonical", () => {
    for (const route of ROUTES) {
      const html = page(route);
      assert.ok(html.includes('<meta name="robots" content="noindex">'), `${route}: noindex`);
      assert.ok(html.includes("data-draft-banner"), `${route}: draft banner`);
      assert.ok(html.includes('data-legal-review="required"'), `${route}: legal-review markers`);
      assert.ok(html.includes('data-legal-decision="required"'), `${route}: decision markers`);
      assert.ok(html.includes(`<link rel="canonical" href="https://nkdigitalworks.com/lumitale/${route}">`), route);
    }
  });

  test("the deletion form stays disabled: hidden until configured, placeholder key", () => {
    const html = page("delete-account");
    assert.match(html, /<form id="signin"[^>]*\bhidden\b/);
    assert.match(html, /<section id="confirm"[^>]*\bhidden\b/);
    assert.match(read("assets/config.js"), /publishableKey: "<PUBLISHABLE KEY[^"]*"/);
  });

  test("no secret, privileged key or real key in the package", () => {
    // Key values, not the words in config.js's warning comment.
    const secret = /sb_secret_[A-Za-z0-9_-]{10,}|sb_publishable_[A-Za-z0-9_-]{10,}|"role"\s*:\s*"service_role"|sk-ant-[A-Za-z0-9_-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./;
    for (const rel of listFiles(dir).filter((f) => /\.(html|js|css)$/.test(f))) {
      assert.ok(!secret.test(read(rel)), rel);
    }
  });

  test("LumiTale pages stay separate from the company policies", () => {
    for (const route of ROUTES) {
      const html = page(route);
      assert.ok(!/href="\/(privacy|terms)"/.test(html), `${route} does not point at the company policies`);
      for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
        assert.ok(m[1].startsWith("/lumitale/"), `${route}: ${m[1]} stays inside /lumitale/`);
      }
    }
  });
});
