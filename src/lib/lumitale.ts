/**
 * LumiTale product content (Phase 3J-AU). Every statement is a verified fact
 * from the LumiTale V2 repository as of 2026-10-10:
 * - parent-controlled: the parent holds the account; children have no accounts;
 * - child profiles (display name, age 3–9, avatar, preferences) under the parent;
 * - illustrated story library by theme, with a full-screen reading mode;
 * - My Stories (created stories): keep up to 10, remove, delete, report with
 *   fixed reasons;
 * - story creation from fixed choices only (no free text, no chat); the AI
 *   service is not enabled yet;
 * - account deletion in the app and on the web.
 * Not claimed (not available): store availability, narration/audio,
 * subscriptions, unlimited generation, AI-safety guarantees.
 */
export const lumitale = {
  name: "LumiTale",
  tagline: "Every Night Begins with Magic.",
  intro:
    "LumiTale is a bedtime storytelling app for families with children aged about 3 to 9. A parent sets everything up and stays in control; the child gets a calm, magical story at the end of the day.",
  availability:
    "LumiTale is in development. It is not yet available to download, and there are no store listings yet.",
} as const;

export type Feature = { title: string; copy: string };

export const lumitaleFeatures: Feature[] = [
  {
    title: "Child profiles, set up by you",
    copy: "Add a profile for each child with a display name, age and avatar, and set their story preferences. Children never need an account or a password.",
  },
  {
    title: "An illustrated story library",
    copy: "Stories are organised by theme — bedtime, adventure, animals, magical, space and learning — and open in a calm, full-screen reading mode.",
  },
];

export const lumitaleParentControl: string[] = [
  "The account belongs to the parent or guardian, verified by email.",
  "Child profiles live inside the parent's account; children do not sign in.",
  "Parents accept the Terms and Privacy Policy before using the app, and read how AI is used before creating a story.",
  "Deleting the account removes the family's LumiTale records, from the app or on the web.",
];

export const lumitaleCreation: string[] = [
  "Stories are created from fixed choices only: the hero (one of your children or an invented hero), a theme and a length.",
  "There is no free-text prompt and no chat.",
  "Created stories can be kept in My Stories (up to ten at a time), removed or deleted.",
  "AI story creation is being prepared and is not switched on yet.",
];

export const lumitaleSafety: string[] = [
  "When story creation is enabled, the AI service receives only an age range, the theme, the length and whether the hero is your child — never your child's name, exact age or any account details.",
  "Your child's name is added by LumiTale's own server after a story has been checked.",
  "Parents can report any story with a fixed reason from inside the app.",
  "There are no ads, no analytics and no sharing between families.",
];

export const lumitaleSupport = {
  email: "nkdigitalworks@outlook.com",
  mailto: `mailto:nkdigitalworks@outlook.com?subject=${encodeURIComponent("LumiTale support")}`,
} as const;
