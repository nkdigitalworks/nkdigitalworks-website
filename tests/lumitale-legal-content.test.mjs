// LumiTale's legal drafts as the local preview serves them. The drafts live
// only in the (private) LumiTale repository, never here, so these tests read
// a local checkout and are skipped where none exists. They check that the
// drafts stay protected (draft, noindex, review markers), name every open
// owner/legal decision, describe the verified implementation without
// overclaiming, keep the deletion form fail-closed and accessible, and
// contain no secret.
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
// Visible text only (tags removed, entities and whitespace normalised).
const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

describe("LumiTale legal drafts", { skip: !checkout && "no local LumiTale checkout (set LUMITALE_V2_DIR)" }, () => {
  test("every page stays a draft: noindex, banner, review markers, own canonical", () => {
    for (const route of ROUTES) {
      const html = page(route);
      assert.ok(html.includes('<meta name="robots" content="noindex">'), `${route}: noindex`);
      assert.ok(html.includes("data-draft-banner"), `${route}: draft banner`);
      assert.ok(html.includes("DRAFT — NOT PUBLISHED — LEGAL REVIEW REQUIRED."), `${route}: draft text`);
      assert.ok(html.includes('data-legal-review="required"'), `${route}: legal-review markers`);
      assert.ok(html.includes('data-legal-decision="required"'), `${route}: decision markers`);
      assert.ok(html.includes(`<link rel="canonical" href="https://nkdigitalworks.com/lumitale/${route}">`), route);
    }
  });

  test("each page names the open owner and legal decisions conspicuously", () => {
    const privacy = text(page("privacy"));
    for (const decision of [
      "exact entity name, address and registration details",
      "governing law and jurisdiction",
      "launch territories and the children's-privacy regimes",
      "legally sufficient parental consent",
      "how consent is withdrawn, and how long acceptance records are kept",
      "final retention periods, including backups",
      "provider retention and model-training terms",
      "subscription prices, products, renewal, cancellation, refund and trial wording",
      "Google Play Families and Apple Kids Category",
    ]) {
      assert.ok(privacy.includes(decision), `privacy: ${decision}`);
    }
    const terms = text(page("terms"));
    for (const decision of ["governing law, jurisdiction", "subscription prices, products, renewal, cancellation, refund and trial wording", "Google Play Families and Apple Kids Category"]) {
      assert.ok(terms.includes(decision), `terms: ${decision}`);
    }
    const deletion = text(page("delete-account"));
    assert.ok(deletion.includes("procedure for verifying ownership"), "deletion: manual procedure is open");
    for (const route of ROUTES) {
      assert.ok(text(page(route)).includes("OWNER AND COUNSEL DECISIONS REQUIRED"), `${route}: decision summary`);
    }
  });

  test("LumiTale is described as parent-controlled", () => {
    const privacy = text(page("privacy"));
    assert.ok(privacy.includes("A parent or guardian creates, owns and controls the account"));
    assert.ok(privacy.includes("Child profiles are not independent accounts"));
    assert.ok(privacy.includes("Children do not have their own email or password login, subscriptions, payments, privacy controls or deletion controls"));
  });

  test("current technical behaviour is stated without overclaiming", () => {
    const privacy = text(page("privacy"));
    for (const fact of [
      "Supabase (active)",
      "Live AI story generation is currently disabled",
      "Anthropic is the story-text provider implemented in the code, behind a release gate that is disabled",
      "versioned AI disclosure",
      "never contains the child's name, exact age, account or user identifiers, the parent's identity or email, or device information",
      "inserts the child's name into the story only after the story has passed automated content checks",
      "not individually reviewed by a person",
      "ElevenLabs is only an evaluated candidate, not a current provider",
      "Billing is off",
    ]) {
      assert.ok(privacy.includes(fact), fact);
    }
    const terms = text(page("terms"));
    assert.ok(terms.includes("no approved prices, no live store products, no purchases, no subscriptions, no trials and no billing SDK"));
    assert.ok(terms.includes("hashed store purchase reference"));
    // Never a claim that stories are reviewed by people, or a price or trial offer.
    for (const route of ROUTES) {
      const body = text(page(route));
      assert.ok(!/every (generated )?story is (human[- ])?reviewed|reviewed by (our )?(staff|a human) before/i.test(body), route);
      assert.ok(!/[$€£]\s?\d|\d+(\.\d+)?\s?(USD|EUR|GBP|AED)\b|free trial|money-back/i.test(body), `${route}: no price or trial`);
      assert.ok(!/ElevenLabs (is|as) (our|the) (provider|narration provider)/i.test(body), route);
    }
  });

  test("every required data category is covered; nothing unproven is claimed", () => {
    const privacy = text(page("privacy"));
    for (const category of [
      "email address and name",
      "display name",
      "age from 3 to 9",
      "avatars",
      "Child preferences",
      "Stories and saved state",
      "Reading progress and favourites",
      "Parent-facing activity summaries",
      "Story reports",
      "Acceptance records",
      "Generation request metadata",
      "generated story illustrations",
      "generated narration audio",
      "hashed store purchase reference",
    ]) {
      assert.ok(privacy.includes(category), category);
    }
    for (const notCollected of ["No recording of a child's voice", "no uploaded likeness of a child", "No payment-card data", "No contacts, no location, no advertising identifiers, and no analytics"]) {
      assert.ok(privacy.includes(notCollected), notCollected);
    }
  });

  test("retention values are unapproved technical defaults, never promises", () => {
    const privacy = text(page("privacy"));
    for (const value of ["24 hours", "90 days", "35-day"]) {
      const sentence = privacy.split(/(?<=\.)\s/).find((s) => s.includes(value));
      assert.ok(sentence?.startsWith("Unapproved technical default"), `${value} is marked unapproved`);
    }
    assert.ok(privacy.includes("Not yet verified: platform log retention, backup retention, any legally required retention of billing records, and the retention of any future provider"));
    assert.ok(text(page("delete-account")).includes("A 35-day prune window is an unapproved technical default"));
  });

  test("deletion is explained accurately, and separately from store subscriptions", () => {
    const deletion = text(page("delete-account"));
    for (const fact of [
      "Profile → Account & privacy → Delete account",
      "requires a recent sign-in",
      "deletes only the account that is signed in",
      "deployed cascade behaviour",
      "asynchronous clean-up function. That function and its scheduler are not yet deployed or configured on the hosted service",
      "disabled until the hosted publishable key is supplied and the hosted deletion flow has been tested",
      "never deleted on the basis of an email request alone",
      "Deleting a LumiTale account and cancelling a Google Play or Apple subscription are separate actions",
    ]) {
      assert.ok(deletion.includes(fact), fact);
    }
    assert.ok(deletion.includes("nkdigitalworks@outlook.com"), "verified support route");
  });

  test("the deletion form is fail-closed, labelled, announced and safe to confirm", () => {
    const html = page("delete-account");
    const script = read("assets/delete-account.js");
    // Hidden in the HTML: disabled without JavaScript or configuration.
    assert.match(html, /<form id="signin"[^>]*\bhidden\b/);
    assert.ok(script.includes("if (!isConfigured())"), "configuration check");
    const reveal = script.indexOf("reveal it only for a configured page");
    assert.ok(reveal > script.indexOf("if (!isConfigured())"), "revealed only after the check");
    assert.ok(script.slice(reveal).startsWith("reveal it only for a configured page.\n    form.hidden = false;"));
    // Labels, live status, destructive step that is not the default focus.
    for (const id of ["email", "password"]) assert.ok(html.includes(`<label for="${id}">`), id);
    assert.ok(html.includes('id="status" class="status" role="status" aria-live="polite"'));
    assert.match(html, /<section id="confirm"[^>]*\bhidden\b/);
    assert.ok(html.indexOf('id="cancel"') < html.indexOf('id="delete"'), "Cancel comes first");
    assert.ok(!/autofocus/.test(html), "no autofocus");
    assert.ok(script.includes("cancelButton.focus(); // never default to Delete"));
    assert.ok(html.includes('class="skip-link" href="#content"') && html.includes('<main id="content"'));
    // Caller-scoped request with an empty body; success only on 200 + deleted.
    assert.ok(script.includes('body: "{}"'));
    assert.ok(script.includes("response.status === 200 && body.deleted === true"));
    assert.ok(!/user_id|userId/.test(script), "no account ID is ever sent");
  });

  test("no secret, privileged key or real key in the package; placeholder keeps deletion off", () => {
    // Key values, not the words in config.js's warning comment.
    const secret = /sb_secret_[A-Za-z0-9_-]{10,}|sb_publishable_[A-Za-z0-9_-]{10,}|"role"\s*:\s*"service_role"|sk-ant-[A-Za-z0-9_-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\./;
    for (const rel of listFiles(dir).filter((f) => /\.(html|js|css)$/.test(f))) {
      assert.ok(!secret.test(read(rel)), rel);
    }
    assert.match(read("assets/config.js"), /publishableKey: "<PUBLISHABLE KEY - fill in at deployment>"/);
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
