import type { Metadata } from "next";

import { AppCard } from "@/components/apps/app-card";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-shell";
import { Container, SectionHeading } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { baseOpenGraph, site } from "@/lib/site";

/*
 * Only verified company information (the site's existing studio statement).
 * History, team, clients and credentials are deliberately absent until the
 * owner provides them.
 */
const description = site.studio;

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    ...baseOpenGraph,
    title: `About — ${site.name}`,
    description,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`About ${site.name}`}
        lede={site.studio}
      />

      <section className="border-y border-white/8 bg-navy/50 py-20 lg:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we build"
            title="Mobile applications, each with its own identity."
            lede={`Every ${site.name} application has its own page, purpose and, where it needs them, its own policies.`}
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {apps.map((app) => (
              <li key={app.slug} className="flex">
                <AppCard app={app} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="flex flex-col items-start gap-6">
            <SectionHeading
              eyebrow="Contact"
              title={`Talk to ${site.name}.`}
              lede="For enquiries about the studio or any of its applications."
            />
            <ButtonLink href="/contact" size="lg" arrow>
              Contact us
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
