# Phase 3J-AX — company homepage and dedicated app pages (2026-10-10)

Local work only. **Nothing is pushed or deployed.** A push to `main`
deploys to Vercel production.

## 1. Initial state (verified)

| Item | State |
|---|---|
| Website repository | `main`, HEAD `e1493b1` (the AV report, local) over origin `229a38e` = live production; clean. Local-only branch `au-original-local` (pre-AV commits containing drafts; never push) |
| LumiTale repository | HEAD `29eed27` (docs, local) over origin `a0b9b50`; clean |
| Live site | `/` = NoorLife pre-launch reveal (title "NoorLife — Something Thoughtful Is Taking Shape"). `/about`, `/apps`, `/contact`, `/apps/lumitale` = 200. `/apps/noorlife` = 404. `/privacy`, `/terms` = 200. `/lumitale/*` = 404. Production deployment `229a38e` |
| LumiTale discoverability | Deployed (`/apps/lumitale`), but reachable only through Our Apps or navigation; the homepage did not mention it |

## 2. Information architecture (implemented)

| Route | Content |
|---|---|
| `/` | **New** NK Digital Works homepage |
| `/apps/noorlife` | **NoorLife's page**: the former homepage, moved unchanged |
| `/apps/lumitale` | LumiTale's page (unchanged from AV) |
| `/apps`, `/about`, `/contact` | Company pages; NoorLife now links to `/apps/noorlife` |
| `/privacy`, `/terms` | Unchanged company website policies |
| `/lumitale/{privacy,terms,delete-account}` | Withheld (404) |

## 3. Company homepage

Sections:
- hero (`#top`): the existing studio statement and description, with tiles for the real apps;
- About the studio (`#about`);
- Our applications: one featured row per app, from `src/lib/apps.ts`;
- How we work;
- Contact (`#contact`);
- the new three-column footer (Company, Apps, Website).

Every statement is already published on this site or verified for the
apps. There are no founding dates, team size, clients, awards, testimonials
or availability claims.

"How we work" rests on facts:
- the apps are designed for mobile;
- each app has its own page and identity;
- this website sets no cookies and runs no analytics (stated in the company privacy policy);
- the apps are in development.

The corporate design keeps the existing tokens and components. The product
pages keep their own identity (NoorLife: the original look; LumiTale: its
Option A colours).

## 4. NoorLife page preservation

`/apps/noorlife` renders the same five section components with no copy
changes. **Its rendered `<main>` is byte-identical to the former homepage's**
(desktop capture compared with the AU baseline). It keeps the title "NoorLife
— Something Thoughtful Is Taking Shape" and its own canonical URL
(`/apps/noorlife`); the disclosure boundary still applies.

**Legacy links** (fragments never reach a server):
- `/#signal` and `/#status` are forwarded client-side to `/apps/noorlife#…` (verified in a browser);
- `#top`, `#about` and `#contact` exist on the new homepage.

**Chrome changes:**
- NoorLife's "Coming soon" badge left the global header and mobile menu (it remains in NoorLife's own hero);
- the footer lists the apps instead of NoorLife's status badge;
- the 404 page points to Our Apps.

## 5. LumiTale page

Verified unchanged from AV: truthful status, approved artwork, no store or
price claims, and policy links only once published. It is now prominent:
- in the homepage hero tiles;
- as a featured row on the homepage;
- in the footer Apps column and Our Apps.

## 6. Legal pages

`/privacy` and `/terms` are the **company website** policies; their
rendered `<main>` is byte-identical. They were not rewritten.

For counsel, not changed by AX:
- The Terms contain NoorLife-specific sections, including that "the visuals on this website are abstract and conceptual… not images of the application". The site now also shows LumiTale's approved artwork and a LumiTale page.
- The privacy policy says the site has "no forms" and "no accounts", which will no longer hold once a LumiTale deletion page is published.
- Whether app-specific aliases are wanted (for example `/noorlife/privacy` once NoorLife has its own policy) is a future decision. No aliases were added.

## 7. Navigation, SEO, accessibility

**Navigation:**
- Home, About, Our Apps and Contact, with `aria-current` on the active route.
- The apps are discoverable through Our Apps, the homepage and the footer.
- **Fixed:** opening the mobile menu now moves focus to its first link, as the code's comment intended. It previously stayed on the toggle.

**SEO:**
- Company default title and description (`companySeo`), and Open Graph defaults are now company-level.
- NoorLife keeps its own title, description and canonical URL.
- The sitemap adds `/apps/noorlife`; LumiTale policies appear only once published.
- Keywords include both apps; robots is unchanged.

**Accessibility:**
- one h1 per page and unique titles;
- the skip link reaches content;
- keyboard order: skip link, brand, Home, About, Our Apps, Contact;
- the mobile menu opens from the keyboard, focus moves inside, and Escape closes it and returns focus;
- labelled links, and decorative artwork in the hero tiles has empty alt text (the app name is the link text).

## 8. Verification (local; headless Edge emulation, not real devices)

| Check | Result |
|---|---|
| `npm run lint` / `npm run build` | clean / passes (12 routes incl. `/apps/noorlife`); gate withheld the legal pages |
| `npm test` | **24/24**: corporate homepage, NoorLife page with the original content, both apps linked, legal pages unchanged, LumiTale legal 404, no draft text or secrets in the build, no draft in the repository, no deploy hooks, gate and sync |
| Responsive (phone, tablet portrait, tablet landscape, desktop; 8 pages) | 32/32: no overflow, one h1, no broken images. One intermittent console error on a single page in one run, not reproduced in 9 further loads; earlier diagnosed as the machine's Grammarly extension |
| Browser behaviour | 11/11: legacy anchors (4), keyboard order, active route, mobile menu open, focus inside, Escape |
| Sync / drafts | `sync:lumitale --check` matches; no LumiTale legal package tracked; no draft text in `.next` |
| Secret scan, `git diff --check` | clean |

## 9. Deployment prerequisites and rollback

- **Deploy (needs your approval):** push `main`; Vercel builds `/` as the company homepage and adds `/apps/noorlife`.
- **Pending AV report:** the local commit (`e1493b1`) would go live with this push.
- **Legal pages:** stay 404 whatever `LUMITALE_LEGAL_PUBLISH` is set to.
- **Rollback:**
  - Vercel Instant Rollback to the current production deployment `7Di55qZj7p8ANngVRQkXQ75HAfj9` (commit `229a38e`); or
  - `git revert` the AX commits and push. Never rewrite history.

## 10. Remaining owner decisions

1. Approve deploying AX: the homepage becomes company-focused and NoorLife moves to `/apps/noorlife`. Old shared links to `/` now show the company page.
2. Counsel: the company Terms' NoorLife-specific passages now that two apps are shown.
3. Optional richer company content (history, team) that only you can provide.
4. Everything listed for LumiTale publication in `docs/phase_3j_av_production_release.md` §13.
