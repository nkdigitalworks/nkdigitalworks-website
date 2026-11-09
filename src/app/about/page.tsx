import type { Metadata } from "next";
import { CompanyApproach, CompanyContact } from "@/components/sections/company-sections";
import { CompanyApps } from "@/components/sections/company-apps";
import { PageHero } from "@/components/ui/page-shell";
import { Container, Eyebrow } from "@/components/ui/section";
import { baseOpenGraph, site } from "@/lib/site";
const description = site.studio;
export const metadata: Metadata = { title: "About", description, alternates: { canonical: "/about" }, openGraph: { ...baseOpenGraph, title: "About — NK Digitalworks", description, url: "/about" }, twitter: { title: "About — NK Digitalworks", description } };
export default function AboutPage() {
  return <>
    <PageHero eyebrow="About NK Digitalworks" title="Independent minds. Meaningful experiences." lede={site.studio} />
    <section className="theme-section about-story"><Container><div className="about-story-grid">
      <div className="brand-universe" aria-hidden="true"><div className="universe-orbit orbit-one" /><div className="universe-orbit orbit-two" /><div className="universe-logo" /><span className="universe-caption">Ideas. Imagination. Innovation.</span></div>
      <div><Eyebrow>Who we are</Eyebrow><h2>Small studio.<br /><span className="theme-gradient">Purposeful thinking.</span></h2><p>NK Digital Works is an independent software studio. We create intelligent, human-centred digital products with clarity, care and purpose.</p><p>Our focus is on our own mobile applications, including NoorLife, LumiTale and ColorWonder. Each product has its own identity, its own experience and its own policies.</p><p>We are building thoughtfully and sharing carefully. All three applications are launching soon. These pages are a sneak peek; public availability will be announced when they are ready.</p></div>
    </div></Container></section>
    <CompanyApproach /><CompanyApps /><CompanyContact />
  </>;
}
