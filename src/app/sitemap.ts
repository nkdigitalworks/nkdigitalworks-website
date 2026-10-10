import type { MetadataRoute } from "next";

import { apps } from "@/lib/apps";
import { lumitaleLegalPages, lumitaleLegalPublished } from "@/lib/lumitale-legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (
    path: string,
    changeFrequency: "weekly" | "monthly" | "yearly",
    priority: number,
  ) => ({ url: `${site.url}${path}`, lastModified, changeFrequency, priority });

  return [
    { url: site.url, lastModified, changeFrequency: "weekly", priority: 1 },
    page("/about", "monthly", 0.6),
    page("/apps", "monthly", 0.8),
    // Each application's own page ("/" for NoorLife is already listed).
    ...apps
      .filter((app) => app.href !== "/")
      .map((app) => page(app.href, "monthly", 0.7)),
    page("/contact", "yearly", 0.5),
    page("/privacy", "yearly", 0.3),
    page("/terms", "yearly", 0.3),
    // LumiTale's policies only once they are published (Phase 3J-AU gate).
    ...(lumitaleLegalPublished()
      ? lumitaleLegalPages.map((legal) => page(legal.href, "yearly", 0.3))
      : []),
  ];
}
