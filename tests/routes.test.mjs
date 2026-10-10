// Phase 3J-AU: routes of the production build (`npm run build` first).
// Starts `next start` on free ports; no dependencies (node --test).
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";
import { after, before, describe, test } from "node:test";

import { LEGAL_PUBLIC, ROOT, lumitaleCheckout, normalized } from "../scripts/lib/lumitale-package.mjs";

const NEXT_BIN = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
const built = existsSync(path.join(ROOT, ".next", "BUILD_ID"));
// Drafts live only in the (private) LumiTale repository; the local preview
// reads them from a checkout.
const checkout = lumitaleCheckout();

const freePort = () =>
  new Promise((resolve) => {
    const s = createServer().listen(0, () => {
      const { port } = s.address();
      s.close(() => resolve(port));
    });
  });

async function startServer() {
  const port = await freePort();
  const child = spawn(process.execPath, [NEXT_BIN, "start", "-p", String(port)], {
    cwd: ROOT,
    stdio: "ignore",
  });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 100; i++) {
    try {
      await fetch(base, { redirect: "manual" });
      return { base, stop: () => child.kill() };
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }
  child.kill();
  throw new Error("next start did not come up");
}

const gate = (env = {}) =>
  spawnSync(process.execPath, [path.join(ROOT, "scripts", "lumitale-legal-gate.mjs")], {
    cwd: ROOT,
    env: { ...process.env, VERCEL: "", LUMITALE_LEGAL_PUBLISH: "", ...env },
    encoding: "utf8",
  });

const PAGES = ["/", "/about", "/apps", "/apps/lumitale", "/contact", "/privacy", "/terms"];

describe("production build (LumiTale legal pages withheld)", { skip: !built && "run npm run build first" }, () => {
  let server;
  const html = {};
  before(async () => {
    assert.equal(gate().status, 0);
    server = await startServer();
    for (const p of PAGES) {
      const r = await fetch(server.base + p);
      html[p] = { status: r.status, body: await r.text() };
    }
  });
  after(() => server?.stop());

  test("every company page responds with one h1 and its own title", () => {
    const titles = new Set();
    for (const p of PAGES) {
      assert.equal(html[p].status, 200, p);
      assert.equal(html[p].body.match(/<h1[\s>]/g)?.length, 1, `${p}: one h1`);
      titles.add(html[p].body.match(/<title>([^<]*)<\/title>/)?.[1]);
    }
    assert.equal(titles.size, PAGES.length, "titles are unique");
  });

  test("the NoorLife homepage is preserved", () => {
    const home = html["/"].body;
    for (const text of [
      "Something thoughtful is taking shape.",
      "Not another app. A more thoughtful way forward.",
      "Built quietly. Revealed carefully.",
      "Stay close to what comes next.",
      "noorlife-logo-robot-pointing-transparent.png",
      'id="signal"',
      'id="status"',
      'id="about"',
      'id="contact"',
    ]) {
      assert.ok(home.includes(text), text);
    }
    assert.ok(home.includes("<title>NoorLife — Something Thoughtful Is Taking Shape</title>"));
    assert.ok(home.includes('href="https://nkdigitalworks.com"'), "canonical stays the apex");
  });

  test("navigation: Home, About, Our Apps, Contact; existing anchors still in the footer", () => {
    const home = html["/"].body;
    for (const href of ['href="/about"', 'href="/apps"', 'href="/contact"', 'href="/#signal"', 'href="/privacy"', 'href="/terms"']) {
      assert.ok(home.includes(href), href);
    }
    assert.ok(html["/apps"].body.includes('aria-current="page"'), "active route is marked");
  });

  test("the portfolio lists NoorLife (its page is /) and LumiTale", () => {
    const apps = html["/apps"].body;
    assert.ok(apps.includes(">NoorLife</a>") && apps.includes('href="/"'));
    assert.ok(apps.includes('href="/apps/lumitale"') && apps.includes(">LumiTale</a>"));
    assert.ok(apps.includes("Private development"));
    assert.ok(apps.includes("In development"));
  });

  test("the LumiTale page is truthful and never links to unpublished policies", () => {
    const page = html["/apps/lumitale"].body;
    assert.ok(page.includes("Every Night Begins with Magic."));
    assert.ok(page.includes("not yet available to download"));
    assert.ok(page.includes("will be published here before the app is released"));
    assert.ok(!page.includes('href="/lumitale/'), "no links to withheld legal pages");
    for (const forbidden of ["play.google.com", "apps.apple.com", "Download on", "Get it on", "subscription", "narrat"]) {
      assert.ok(!page.toLowerCase().includes(forbidden.toLowerCase()), forbidden);
    }
  });

  test("LumiTale legal routes return 404 while withheld (direct, slash, assets)", async () => {
    for (const p of ["/lumitale/privacy", "/lumitale/terms", "/lumitale/delete-account", "/lumitale/privacy/", "/lumitale/assets/config.js"]) {
      const r = await fetch(server.base + p);
      assert.equal(r.status, 404, p);
    }
  });

  test("every internal link on every page resolves", async () => {
    const links = new Set();
    for (const p of PAGES) {
      for (const m of html[p].body.matchAll(/href="(\/[^"#?]*)/g)) {
        if (!m[1].startsWith("/_next/")) links.add(m[1]);
      }
    }
    for (const link of links) {
      const r = await fetch(server.base + link);
      assert.equal(r.status, 200, link);
    }
  });

  test("sitemap lists the company pages and no withheld policy", async () => {
    const xml = await (await fetch(`${server.base}/sitemap.xml`)).text();
    for (const p of ["/about", "/apps", "/apps/lumitale", "/contact"]) {
      assert.ok(xml.includes(`https://nkdigitalworks.com${p}</loc>`), p);
    }
    assert.ok(!xml.includes("/lumitale/"), "no LumiTale policy URLs");
  });

  test("no secret or privileged key in the build output or the synced copy", () => {
    const pattern = /sb_secret_[A-Za-z0-9_-]{10,}|sk-ant-[A-Za-z0-9_-]{10,}|"role":"service_role"|-----BEGIN [A-Z ]*PRIVATE KEY-----/;
    const scan = (dir) => {
      for (const name of readdirSync(dir)) {
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) scan(full);
        else if (/\.(js|html|json|css|txt|map)$/.test(name)) {
          assert.ok(!pattern.test(readFileSync(full, "utf8")), full);
        }
      }
    };
    for (const dir of [".next/static", ".next/server/app", "public", "vendor"]) scan(path.join(ROOT, dir));
  });
});

describe("local draft preview (never on Vercel)", {
  skip: (!built && "run npm run build first") || (!checkout && "no local LumiTale checkout"),
}, () => {
  let server;
  before(async () => {
    assert.equal(gate({ LUMITALE_LEGAL_DRAFTS: "local" }).status, 0);
    server = await startServer();
  });
  after(() => {
    server?.stop();
    // Restore the withheld state.
    gate();
    assert.ok(!existsSync(LEGAL_PUBLIC));
  });

  test("drafts are served byte-identical, with the LumiTale security headers", async () => {
    for (const route of ["privacy", "terms", "delete-account"]) {
      const r = await fetch(`${server.base}/lumitale/${route}`);
      assert.equal(r.status, 200, route);
      const csp = r.headers.get("content-security-policy") ?? "";
      assert.ok(csp.includes("connect-src https://jvvjjoplfyruyzsuxmkd.supabase.co"), route);
      assert.ok(csp.includes("script-src 'self'") && !csp.includes("unsafe"), route);
      assert.equal(r.headers.get("x-content-type-options"), "nosniff");
      const body = Buffer.from(await r.arrayBuffer());
      const source = path.join(checkout, "website", "lumitale", route, "index.html");
      assert.ok(body.equals(normalized(source)), `${route} identical to the LumiTale source`);
      assert.ok(body.toString().includes(`<link rel="canonical" href="https://nkdigitalworks.com/lumitale/${route}">`));
    }
  });

  test("a trailing slash redirects to the canonical URL; assets load", async () => {
    const r = await fetch(`${server.base}/lumitale/terms/`, { redirect: "manual" });
    assert.equal(r.status, 308);
    assert.equal(new URL(r.headers.get("location"), server.base).pathname, "/lumitale/terms");
    for (const asset of ["config.js", "delete-account.js", "lumitale.css", "fonts/Poppins-Regular.ttf"]) {
      assert.equal((await fetch(`${server.base}/lumitale/assets/${asset}`)).status, 200, asset);
    }
  });

  test("the drafts still say DRAFT and the deletion page stays unconfigured", async () => {
    const privacy = await (await fetch(`${server.base}/lumitale/privacy`)).text();
    assert.ok(privacy.includes("DRAFT — NOT PUBLISHED — LEGAL REVIEW REQUIRED."));
    const config = await (await fetch(`${server.base}/lumitale/assets/config.js`)).text();
    assert.ok(config.includes('publishableKey: "<PUBLISHABLE KEY'), "placeholder key: page fails closed");
  });
});
