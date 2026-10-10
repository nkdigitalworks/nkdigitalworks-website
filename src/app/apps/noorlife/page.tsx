import type { Metadata } from "next";

import { AbstractPrinciples } from "@/components/sections/abstract-principles";
import { Contact } from "@/components/sections/contact";
import { MysteryHero } from "@/components/sections/mystery-hero";
import { PrivateDevelopment } from "@/components/sections/private-development";
import { ProductSignal } from "@/components/sections/product-signal";
import { baseOpenGraph, seo } from "@/lib/site";

/*
 * NoorLife's own page (Phase 3J-AX). This is the former homepage, moved
 * unchanged: the same sections, copy, artwork, anchors (#top, #signal,
 * #status, #about, #contact) and calls to action. NoorLife's disclosure
 * boundary (src/lib/site.ts) still applies to everything here.
 */
export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/apps/noorlife" },
  openGraph: {
    ...baseOpenGraph,
    title: seo.title,
    description: seo.description,
    url: "/apps/noorlife",
  },
  twitter: { card: "summary", title: seo.title, description: seo.description },
};

export default function NoorLifePage() {
  return (
    <>
      <MysteryHero />
      <ProductSignal />
      <AbstractPrinciples />
      <PrivateDevelopment />
      <Contact />
    </>
  );
}
