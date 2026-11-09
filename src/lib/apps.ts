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

export type AppStatus = "private-development" | "in-development" | "launching-soon" | "available";

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
  /** Optional complete branding image for portfolio cards. */
  cardArtwork?: AppArtwork;
  /** Promotional concept artwork, separate from approved logos and screenshots. */
  promotionalArtwork?: AppArtwork;
  /** Store links: empty until the app is actually published. */
  stores: { label: string; href: string }[];
};

export const apps: AppEntry[] = [
  {
    slug: "noorlife",
    name: site.product,
    summary:
      "A new intelligent digital experience, designed for mobile and currently in private development.",
    status: "launching-soon",
    statusLabel: "Launching soon · Sneak peek",
    // NoorLife's own page (Phase 3J-AX; formerly the homepage).
    href: "/apps/noorlife",
    artwork: {
      src: "/images/noorlife/noorlife-logo-robot-pointing-transparent.png",
      width: 1536,
      height: 1024,
      alt: "NoorLife symbol with an AI companion pointing toward it",
    },
    promotionalArtwork: {
      src: "/brand/app-previews/noorlife-phone-concept-v1.png",
      width: 1536,
      height: 1024,
      alt: "NoorLife promotional concept: a cyan and violet illuminated phone displaying the approved heart symbol and friendly robot",
    },
    stores: [],
  },
  {
    slug: "lumitale",
    name: "LumiTale",
    summary:
      "Parent-controlled bedtime storytelling for families with children aged about 3 to 9.",
    category: "Family · Bedtime stories",
    status: "launching-soon",
    statusLabel: "Launching soon · Sneak peek",
    href: "/apps/lumitale",
    artwork: {
      // Approved app icon (LT-ILL-SETUP-002 Crescent Moon Glow on #0A0E2A),
      // synced from the LumiTale V2 repository.
      src: "/apps/lumitale/lumitale-app-icon.png",
      width: 384,
      height: 384,
      alt: "LumiTale app icon: a glowing crescent moon on clouds",
    },
    promotionalArtwork: {
      src: "/brand/app-previews/lumitale-phone-concept-v1.png",
      width: 1536,
      height: 1024,
      alt: "LumiTale promotional concept: a glowing phone with two children on a magical storybook beneath a smiling moon and stars",
    },
    stores: [],
  },
  {
    slug: "colorwonder",
    name: "ColorWonder",
    summary: "A colourful creative experience for young artists to colour, paint and explore their imagination.",
    category: "Creativity · Colouring",
    status: "launching-soon",
    statusLabel: "Launching soon · Sneak peek",
    href: "/apps/colorwonder",
    artwork: {
      src: "/apps/colorwonder/imagination-artwork.png",
      width: 1536,
      height: 1024,
      alt: "ColorWonder artwork featuring a lion, space, nature, vehicles, fantasy castles and ocean animals",
    },
    cardArtwork: {
      src: "/apps/colorwonder/colorwonder-kids-logo.png",
      width: 458,
      height: 593,
      alt: "Complete ColorWonder branding with paint palette, colourful name, NK Digitalworks byline, Color Paint Create tagline, and two children holding art supplies",
    },
    promotionalArtwork: {
      src: "/brand/app-previews/colorwonder-phone-concept-v1.png",
      width: 1536,
      height: 1024,
      alt: "ColorWonder promotional concept: a glowing phone showing both young artist children, the paint palette logo and colourful art supplies",
    },
    stores: [],
  },
];

export function appBySlug(slug: string): AppEntry {
  const app = apps.find((entry) => entry.slug === slug);
  if (!app) throw new Error(`Unknown application: ${slug}`);
  return app;
}
