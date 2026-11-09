import type { Metadata } from "next";
import { AppCard } from "@/components/apps/app-card";
import { CompanyContact } from "@/components/sections/company-sections";
import { PageHero } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { baseOpenGraph } from "@/lib/site";
const description = "A sneak peek at NoorLife, LumiTale and ColorWonder — three applications from NK Digitalworks, all launching soon.";
export const metadata: Metadata = { title: "Our Apps", description, alternates: { canonical: "/apps" }, openGraph: { ...baseOpenGraph, title: "Our Apps — NK Digitalworks", description, url: "/apps" }, twitter: { title: "Our Apps — NK Digitalworks", description } };
export default function AppsPage() {
  return <>
    <PageHero eyebrow="Our applications" title="Three apps. A first look at what’s next." lede="Meet NoorLife, LumiTale and ColorWonder. All three applications are launching soon — this is just a sneak peek at what we are creating." />
    <section className="catalog-section"><Container><div className="launch-preview-notice"><span className="launch-preview-dot" aria-hidden="true" /><div><strong>All three applications are launching soon.</strong><p>This is an early preview. Features, artwork and screens may change before launch. Download links will be added when the apps are ready.</p></div></div><div className="catalog-heading"><span>Explore our applications</span><span>Designed & developed by NK Digitalworks</span></div><ul className="portfolio-grid">{apps.map((app) => <li key={app.slug}><AppCard app={app} /></li>)}</ul><p className="catalog-note">A sneak peek, not a download release. Follow each application’s page for a first look.</p></Container></section>
    <CompanyContact />
  </>;
}
