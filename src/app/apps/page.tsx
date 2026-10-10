import type { Metadata } from "next";

import { AppCard } from "@/components/apps/app-card";
import { PageHero } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { baseOpenGraph, site } from "@/lib/site";

const description = `The applications ${site.name} is building, each with its own page.`;

export const metadata: Metadata = {
  title: "Our Apps",
  description,
  alternates: { canonical: "/apps" },
  openGraph: {
    ...baseOpenGraph,
    title: `Our Apps — ${site.name}`,
    description,
    url: "/apps",
  },
};

export default function AppsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our apps"
        title="Applications by NK Digital Works"
        lede="Each application has its own page, its own identity and, where it needs them, its own policies."
      />
      <section className="pb-24 lg:pb-32">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {apps.map((app) => (
              <li key={app.slug} className="flex">
                <AppCard app={app} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
