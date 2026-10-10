import type { Metadata } from "next";

import { CompanyApps } from "@/components/sections/company-apps";
import { CompanyHero } from "@/components/sections/company-hero";
import {
  CompanyApproach,
  CompanyContact,
  CompanyIntro,
} from "@/components/sections/company-sections";
import { LegacyNoorLifeAnchors } from "@/components/sections/legacy-anchors";
import { baseOpenGraph } from "@/lib/site";

/*
 * NK Digital Works company homepage (Phase 3J-AX). NoorLife's former homepage
 * content lives unchanged at /apps/noorlife; LumiTale at /apps/lumitale.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
};

export default function Home() {
  return (
    <>
      <LegacyNoorLifeAnchors />
      <CompanyHero />
      <CompanyIntro />
      <CompanyApps />
      <CompanyApproach />
      <CompanyContact />
    </>
  );
}
