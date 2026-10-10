# Phase 3J-AV — production release of the company pages (2026-10-10)

## 1. Approval scope

**Approved:**
- push the LumiTale AU commits and the website AU commits;
- let Vercel deploy the company pages (About, Our Apps, Contact) and the LumiTale product overview;
- run non-destructive smoke tests;
- roll back if there is a serious regression.

**Not approved:** LumiTale legal pages or account deletion, Supabase, Anthropic, signing, Google Play, DNS, Vercel settings, and changes to V1, NoorLife or the homepage content.

**Additional owner decision (during AV):** this GitHub repository is
**public**. The four local AU commits were rebuilt so that the **draft
LumiTale legal pages are never committed here**: the legal package is synced
only once LumiTale's validator reports READY. The original local commits
(783f247…a329101) were never pushed.

## 2. Pre-release verification

| Check | Result |
|---|---|
| Baselines | LumiTale `a0b9b50` over `31e14d2`; website over `d2a1a1d`; both trees clean; no remote drift |
| Vercel link | GitHub deployments by `vercel[bot]`, environment Production, project `syed-nks-projects/nkdigitalworks-website`, branch `main` (auto-deploy on push) |
| Domain → deployment | Live `<main>` of `/`, `/privacy` and `/terms` byte-identical to a local build of `d2a1a1d` |
| Protection | GitHub: `main` not protected; "Production" environment has no rules. Vercel-side settings not readable (no Vercel CLI/token) |
| `LUMITALE_LEGAL_PUBLISH` | Not readable. **Irrelevant to safety:** no legal package is in the repository, and approval without a ready package fails the build |
| Clean clone (`npm ci`, `VERCEL=1` production build) | Build passes; gate withheld; no draft text in `.next`/`public`; tests 15 pass, 3 skipped (need a LumiTale checkout) |
| Local, full | lint clean; build passes; `npm test` 21/21; sync `--check` matches LumiTale `a0b9b50` |
| LumiTale | Flutter tool and release tests 90/90; Deno 142/142; apex deletion E2E 18/18; branding `--check` up to date; validator NOT READY (as required) |
| Rollback target | Vercel deployment `BXDWb21inhi6d2xrLsC3Le9beNqV` (commit `d2a1a1d`, GitHub deployment 5690841414) |

## 3. Commits

- **LumiTale** (`Syed-NK/lumitale-v2`, private): `2c96907`, `a0b9b50` pushed; origin/main = `a0b9b5026c6f1302145685c84634b8aa2e35bbbf`.
- **Website** (`nkdigitalworks/nkdigitalworks-website`, public): `895addf`, `2d8fdd2`, `471a554`, `229a38e` pushed (fast-forward from `d2a1a1d`); origin/main = `229a38e5a96d127e2e69b95d109ec6b1288ac73e`.

## 4–5. Deployment

| Item | Value |
|---|---|
| Vercel production deployment | `7Di55qZj7p8ANngVRQkXQ75HAfj9`: GitHub deployment 6979788407, environment Production, state success |
| Unique URL | `nkdigitalworks-website-p27tsozo7-syed-nks-projects.vercel.app` |
| Production domain | https://nkdigitalworks.com (apex; `www.` and `http://` 308 to it) |

## 6–8. Live smoke tests (after deployment)

| Route | Status | Content |
|---|---|---|
| `/`, `/privacy`, `/terms` | 200 | Rendered `<main>` byte-identical to before the release |
| `/about`, `/apps`, `/contact`, `/apps/lumitale` | 200 | Expected titles, one h1; both apps listed; LumiTale "In development · Not yet available", no store, pricing or narration claims |
| `/lumitale/privacy`, `/lumitale/terms`, `/lumitale/delete-account` | **404** | Also 404: `/lumitale/assets/*` and `…/index.html`; a trailing slash 308-redirects to a 404 |
| All internal links | 200 | — |
| Sitemap | — | New routes listed; no LumiTale policy URLs |

No page contains draft markers, a password field, a deletion form or a
link to `/lumitale/`.

## 9. Responsive (headless Edge emulation, not real devices)

Phone 390, tablet portrait 820×1180, tablet landscape 1180×820 and desktop
1440, on 7 pages: 28/28 with no horizontal overflow, one h1 and no broken
images. The only console error came from the machine's Grammarly browser
extension (`chrome-extension://…/Grammarly-check.js`), not the site.
Keyboard behaviour (skip link, header and mobile menu) was verified on the
local build of the same code.

## 10. Security

- HTTPS with HSTS (`max-age=63072000`).
- Canonical URLs use the apex.
- No third-party scripts.
- 9 live JavaScript chunks scanned: no secrets, and not even the Supabase project reference.
- No credentials in the repository.
- The LumiTale CSP and security headers apply to `/lumitale/*` once published.

## 11–12. Result and rollback

**Release successful.** No serious regression was found, so no rollback was performed.

If one is ever needed:
- Vercel → Deployments → `BXDWb21inhi6d2xrLsC3Le9beNqV` → Instant Rollback; or
- `git revert` the four commits and push, which redeploys the previous tree. Never rewrite history.

## 13. Remaining LumiTale legal blockers

1. Counsel text for the Privacy Policy, Terms and deletion page.
2. The hosted publishable key.
3. LumiTale's validator must report READY.
4. Approval to deploy `delete-account` with `ACCOUNT_DELETION_ALLOWED_ORIGINS=https://nkdigitalworks.com`.
5. Then here: sync, test, push, and set `LUMITALE_LEGAL_PUBLISH=approved` in Vercel.
6. Counsel check that the company `/privacy` ("no forms", "no accounts") still fits once the deletion page is live.

## 14. Git status (at the time of this report)

| Repository | State |
|---|---|
| LumiTale | HEAD = origin/main = `a0b9b50`, clean |
| Website | origin/main = `229a38e`. This report is a **local, unpushed** commit, because pushing it would trigger another production deployment |
| Local-only branch | `au-original-local` keeps the superseded pre-AV commits (they contain the drafts). **Never push it**; delete it when no longer needed |

## 15. Next milestone

Counsel review of the LumiTale legal pages and the hosted publishable key,
then publication through the gate. That gives Google Play its privacy and
deletion URLs for the first internal-testing release.
