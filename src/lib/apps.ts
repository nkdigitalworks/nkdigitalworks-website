/**
 * Application portfolio (Phase 3J-AU). One entry per real NK Digital Works
 * application; /apps, the About page and each product page read from here, so
 * adding an application means adding one entry (and, if it needs one, its own
 * page under src/app/apps/<slug>/).
 *
 * Content rules:
 * - Only verified facts. No invented features, availability, ratings, store
 *   links or dates. `stores` stays empty until an app is actually published.
 * - NoorLife carries only what its disclosure boundary allows (src/lib/site.ts):
 *   its name, that it is an intelligent digital experience, coming to mobile,
 *   in private development. No category.
 * - Legal pages are per application and optional; nothing here is global.
 */
import { site } from "@/lib/site";

export type AppStatus = "private-development" | "in-development" | "available";

export type AppArtwork = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type AppEntry = {
  slug: string;
  name: string;
  /** One or two sentences, factual. */
  summary: string;
  /** Omitted where an app's disclosure rules forbid naming a category. */
  category?: string;
  status: AppStatus;
  statusLabel: string;
  /** The application's own page on this site (existing URLs are preserved). */
  href: string;
  artwork: AppArtwork;
  /** Store links: empty until the app is actually published. */
  stores: { label: string; href: string }[];
};

export const apps: AppEntry[] = [
  {
    slug: "noorlife",
    name: site.product,
    summary:
      "A new intelligent digital experience, designed for mobile and currently in private development.",
    status: "private-development",
    statusLabel: "Private development · Coming soon",
    // NoorLife's existing page is the homepage; its URL is unchanged.
    href: "/",
    artwork: {
      src: "/images/noorlife/noorlife-logo-robot-pointing-transparent.png",
      width: 1536,
      height: 1024,
      alt: "NoorLife symbol with an AI companion pointing toward it",
    },
    stores: [],
  },
  {
    slug: "lumitale",
    name: "LumiTale",
    summary:
      "Parent-controlled bedtime storytelling for families with children aged about 3 to 9.",
    category: "Family · Bedtime stories",
    status: "in-development",
    statusLabel: "In development · Not yet available",
    href: "/apps/lumitale",
    artwork: {
      // Approved app icon (LT-ILL-SETUP-002 Crescent Moon Glow on #0A0E2A),
      // synced from the LumiTale V2 repository.
      src: "/apps/lumitale/lumitale-app-icon.png",
      width: 384,
      height: 384,
      alt: "LumiTale app icon: a glowing crescent moon on clouds",
    },
    stores: [],
  },
];

export function appBySlug(slug: string): AppEntry {
  const app = apps.find((entry) => entry.slug === slug);
  if (!app) throw new Error(`Unknown application: ${slug}`);
  return app;
}
