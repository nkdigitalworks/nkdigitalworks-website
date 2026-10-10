# Phase 3J-AU — company website and multi-app integration (2026-10-10)

Local work only. **Nothing is deployed or pushed; DNS and Vercel settings
are unchanged.** LumiTale's legal pages are **blocked from publication**.

## 1. What the website is

| Item | Finding |
|---|---|
| Framework | Next.js 16.2.12 (App Router, Turbopack), React 19.2, TypeScript, Tailwind CSS 4; npm |
| Hosting | **Vercel**. Live headers: `Server: Vercel`, HSTS `max-age=63072000`. **Apex `https://nkdigitalworks.com` is canonical**; `www.` and `http://` 308-redirect to it |
| Build | `npm run build` (now with a `prebuild` gate); all routes are static |
| Before AU | `/` (NoorLife pre-launch reveal), `/privacy`, `/terms` (company website policies), robots, sitemap, 404 page |
| Design | Dark navy/electric tokens in `src/app/globals.css`; Inter + Manrope via `next/font` (self-hosted); shared `Container`, `SectionHeading`, `PageHero`, `ButtonLink` |
| Tests before AU | None (lint only) |

## 2. Owner decisions taken in AU

1. **Domain:** LumiTale uses the apex. Its URLs are `https://nkdigitalworks.com/lumitale/{privacy,terms,delete-account}`, and the deletion CORS origin is `https://nkdigitalworks.com`. The www. URLs approved in 3J-AT would have been redirected, and deletion refused, on the live setup.
2. **NoorLife untouched:**
   - `/` and every NoorLife section and text are unchanged. The rendered homepage `<main>` is byte-identical before and after (14,081 bytes).
   - Only the disclosure-boundary comment in `src/lib/site.ts` changed. Its "first product" wording now reads "is building it", since a second app now has its own page.
3. **Email:** corporate pages use `hello@nkdigitalworks.com`; LumiTale support uses `nkdigitalworks@outlook.com`.
4. **Name:** "NK Digital Works" on the website.

## 3. Information architecture

| Route | Status | Notes |
|---|---|---|
| `/` | unchanged | NoorLife's page (its URL is preserved) |
| `/about` | new | Only the existing studio statement and the portfolio; no invented history or credentials |
| `/apps` | new | Portfolio from `src/lib/apps.ts` (NoorLife → `/`, LumiTale → `/apps/lumitale`) |
| `/apps/lumitale` | new | LumiTale product page, scoped to LumiTale's Option A colours |
| `/contact` | new | Email only (existing mailto mechanism); no form, no backend |
| `/privacy`, `/terms` | unchanged | Company website policies (`<main>` byte-identical) |
| `/lumitale/privacy`, `/lumitale/terms`, `/lumitale/delete-account` | gated | 404 until published (§5) |

Navigation is now Home / About / Our Apps / Contact, with `aria-current` on
the active route on desktop and mobile. The existing mobile menu (focus
trap, Escape) is reused, and the footer gains "Our Apps" while keeping "The
Signal".

**Adding an application:** add one entry to `src/lib/apps.ts` (name,
factual summary, optional category, status, page, artwork, `stores: []`
until published). Add a page under `src/app/apps/<slug>/` if it needs one,
and legal routes only if that app needs them. No CMS.

## 4. LumiTale product page

Every statement is a verified fact from the LumiTale V2 repository:
- the parent account and the absence of child accounts;
- child profiles;
- the themed story library and reading mode;
- story creation from fixed choices only, with no free text or chat;
- My Stories;
- the safety design, including what the AI service receives;
- account deletion in the app and on the web.

It states that LumiTale is **in development and not yet available**, and
that AI creation is **not switched on yet**. It makes no store links and no
claims about narration, subscriptions or unlimited generation. Its visuals
are approved LumiTale artwork only (wordmark, Screen 00 hero LT-CHAR-005,
moon app icon); there are no screenshots. The policy links appear only when
the policies are published; until then it says they will be published
before release.

## 5. LumiTale legal pages: single source of truth and publication gate

- **Source of truth:** the LumiTale V2 repository, which is **private** (`website/lumitale/`, `website/product/`).
- **This repository is public**, so **draft legal pages are never committed here** (AV decision).
- **`npm run sync:lumitale`:**
  - always copies the approved artwork to `public/apps/lumitale/`;
  - copies the legal package to `vendor/lumitale/legal/` **only when LumiTale's own `tool/website_publish_check.dart` reports READY** (counsel text, real key); otherwise it removes it;
  - writes `vendor/lumitale/manifest.json`: the source commit, per-file SHA-256 (text normalised to LF; `.gitattributes`), the validator result and `legalIncluded`;
  - refuses an uncommitted source;
  - `--check` reports drift.
  - It reads `../LumiTaleV2` or `LUMITALE_V2_DIR`. **Vercel never needs the LumiTale repository.**
- **`prebuild` / `predev` gate** (`scripts/lumitale-legal-gate.mjs`):
  - An edited, missing or extra synced file **fails the build**.
  - With **`LUMITALE_LEGAL_PUBLISH=approved`**, the pages are published only if they are ready; otherwise the **build fails**. "Ready" means the LumiTale validator passed at sync time and no marker, placeholder, privileged or local key, or wrong canonical URL remains.
  - Without approval (the default), `public/lumitale/` is removed, the routes return 404 and the company site builds normally.
  - Drafts are served only locally (`npm run dev` or `LUMITALE_LEGAL_DRAFTS=local`), read straight from a LumiTale checkout into the git-ignored `public/lumitale/`. **Never on Vercel.**
- **`next.config.ts`:** rewrites the slashless URLs to the static `index.html` (a trailing slash 308-redirects), and sets on `/lumitale/*` a strict CSP (`connect-src` = the LumiTale V2 project only), `no-referrer`, `nosniff`, `Permissions-Policy` and `no-cache`.
- **Today:** withheld. No legal package is in this repository; the LumiTale validator reports NOT READY (markers + placeholder key).

## 6. Account deletion

The page is LumiTale's tested implementation, byte-identical (hash-verified):
- password sign-in with the publishable key;
- a recent sign-in check, with re-authentication after 9 minutes;
- the session kept in memory only, ended on cancel, refresh or back/forward;
- double-submit protection;
- caller-only deletion;
- success shown only for HTTP 200 with `{deleted: true}`;
- disabled while the key is a placeholder.

Verified in LumiTale with the apex origin:
- direct edge-runtime checks: **18/18** (`www.`, `http://` and look-alike origins refused);
- headless-Edge browser test: **60/60**. The browser sent exactly `Origin: https://nkdigitalworks.com`, and an unrelated origin was blocked before the POST.

The Edge Function is **not deployed**. It needs
`ACCOUNT_DELETION_ALLOWED_ORIGINS=https://nkdigitalworks.com` and your
approval.

## 7. Verification (2026-10-10)

| Check | Result |
|---|---|
| `npm run lint` | clean |
| `npm run build` | passes; 12 static routes; gate withheld the legal pages |
| `npm test` (Node test runner, no new dependencies) | **21/21**, including "no LumiTale draft is tracked in this public repository" and the real gate in a Vercel-like build |
| Sync integrity | `sync:lumitale --check` matches LumiTale `a0b9b50` (product art; legal package not included); a hand-edited or hand-added synced file fails the tests and the build |
| Responsive (headless Edge; 390, 820×1180, 1180×820, 1440 px; 7 pages) | 28/28: no horizontal overflow, one h1, no broken images, no site errors |
| Accessibility | One h1 per page; unique titles; landmarks unchanged; `aria-current`; labelled links; alt text; keyboard focus styles; reduced-motion rules (existing) |
| SEO | Unique titles, descriptions, canonical URLs and Open Graph per new page; sitemap adds the four routes and the LumiTale policies only when published; robots unchanged |
| Performance | Product art served by Next/Vercel as WebP (hero 58–142 KB, wordmark 25 KB); no new JavaScript libraries; fonts self-hosted |
| Security | No external scripts, trackers, cookies/storage, `dangerouslySetInnerHTML` or secrets (scanned build output, `public/`, `vendor/`) |

The Edge browser on this machine injects a Grammarly extension error into
pages; it is not from the site. Real-device mobile testing was not
performed.

## 8. Deployment procedure (when you approve; not done)

1. **Company pages:** review the local commits, push, and let Vercel build. The LumiTale legal routes stay 404.
2. **LumiTale policies, later:**
   1. counsel text and the publishable key go into the LumiTale repository, and `dart run tool/website_publish_check.dart` must print READY (commit there);
   2. here, `npm run sync:lumitale` (now includes the ready package), then `npm test`, then commit and push. This is the first time the legal pages enter this public repository;
   3. approve and deploy `delete-account` with `ACCOUNT_DELETION_ALLOWED_ORIGINS=https://nkdigitalworks.com`;
   4. in Vercel → Production environment, set `LUMITALE_LEGAL_PUBLISH=approved` and redeploy;
   5. smoke-test per `LumiTaleV2/website/DEPLOYMENT.md` §6.
3. **Rollback:** redeploy the previous build, or remove `LUMITALE_LEGAL_PUBLISH` (routes 404 again).

## 9. Owner checklist

**Website:**
1. Approve the company pages for deployment (About, Apps, Contact, LumiTale page, navigation).
2. Counsel-approved LumiTale Privacy Policy.
3. Counsel-approved LumiTale Terms of Service.
4. Hosted Supabase V2 publishable key (LumiTale `tool\release\new_production_config.ps1`, and in `website/lumitale/assets/config.js`).
5. Approval to deploy `delete-account` with the apex origin.
6. Approval to publish the LumiTale pages (`LUMITALE_LEGAL_PUBLISH=approved`).
7. Counsel check: the company `/privacy` says the site has "no forms" and "no accounts". Once the LumiTale deletion page is live it has a sign-in form (covered by LumiTale's own policy). Decide whether the company policy should mention it.
8. Optional richer About content (history, team), which only you can supply.

**Android app:**
1. Upload keystore and signing (`LumiTaleV2/docs/release/android_upload_signing_procedure.md`).
2. Play Console setup (`google_play_internal_track_handoff.md`).
3. Android 13 monochrome icon decision.
4. Screens 09 and 14 product-owner review.
