import type { Metadata } from "next";

/**
 * Public content model for the NoorLife pre-launch page and the shared site
 * chrome.
 *
 * DISCLOSURE BOUNDARY (NoorLife) — this file compiles into the public bundle.
 * About NoorLife it may carry only: that NK Digital Works is building it, that
 * the product is called NoorLife, that it is an intelligent, human-centred
 * digital experience being designed thoughtfully, that it is coming to mobile,
 * and that it is in private development. (Other applications have their own
 * pages and content models in src/lib/apps.ts; Phase 3J-AU.)
 *
 * It must NOT carry internal structure names or counts, product categories,
 * feature descriptions, layout or navigation detail, AI boundaries, integrations,
 * plans or pricing.
 *
 * `url` is the canonical production domain (apex, no www). It is the single
 * source for metadataBase, canonical tags, Open Graph/Twitter URLs, sitemap.xml
 * entries and the robots.txt host — change it here and nowhere else.
 */
export const site = {
  name: "NK Digital Works",
  product: "NoorLife",
  statement: "Thoughtful technology, taking shape.",
  studio:
    "NK Digital Works is an independent software studio creating intelligent, human-centred digital products with clarity, care and purpose.",
  email: "hello@nkdigitalworks.com",
  url: "https://nkdigitalworks.com",
} as const;

export const seo = {
  title: "NoorLife — Something Thoughtful Is Taking Shape",
  description:
    "NK Digital Works is creating NoorLife, a new intelligent digital experience currently in private development.",
} as const;

/**
 * Open Graph fields shared by every route, minus `url`.
 *
 * Next.js merges metadata *shallowly*, so a page that declares `openGraph`
 * replaces the parent's object outright. Each route therefore spreads this base
 * and adds only its own `url`, which keeps og:type, og:site_name, og:locale,
 * og:title and og:description identical everywhere.
 *
 * `url` is always given as a path and resolved against `metadataBase`, so the
 * production hostname is never repeated outside `site.url`.
 */
export const baseOpenGraph = {
  type: "website",
  siteName: site.name,
  title: seo.title,
  description: seo.description,
  locale: "en_GB",
} satisfies NonNullable<Metadata["openGraph"]>;

export const mailto = `mailto:${site.email}`;

/** Enquiry action, encoded so the em dash travels as %E2%80%94. */
export const enquiryMailto = `${mailto}?subject=${encodeURIComponent(
  "Enquiry — NK Digital Works",
)}`;

export type NavItem = { label: string; href: string };

/**
 * Company navigation (Phase 3J-AU): routes, none naming NoorLife's internal
 * structure. The homepage's own anchors (/#signal, /#about, /#contact) keep
 * working, and "The Signal" stays in the footer.
 */
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Apps", href: "/apps" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/**
 * Three abstract signals. Deliberately not features: each names a quality of
 * the experience, never a capability, category or area of life.
 *
 * `marker` selects a CSS-drawn abstract visual — never a literal icon.
 */
export type Signal = {
  title: string;
  copy: string;
  marker: "rings" | "trail" | "halo";
};

export const signals: Signal[] = [
  {
    title: "Connected",
    copy: "The important parts should feel less fragmented.",
    marker: "rings",
  },
  {
    title: "Intelligent",
    copy: "Technology should assist without taking control.",
    marker: "trail",
  },
  {
    title: "Personal",
    copy: "What matters to you should remain yours.",
    marker: "halo",
  },
];

/** Understated progress markers. No percentages, dates or promises. */
export const statusItems = [
  "Product design in progress",
  "Core experience under development",
  "Public preview will follow",
];
