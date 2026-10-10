import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/section";
import { lumitaleSupport } from "@/lib/lumitale";
import { baseOpenGraph, enquiryMailto, site } from "@/lib/site";

/*
 * Email only, through the user's own mail application: there is no form, no
 * backend and no third-party form service (the site's privacy policy says so).
 */
const description = `How to contact ${site.name} and get support for its applications.`;

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...baseOpenGraph,
    title: `Contact — ${site.name}`,
    description,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={`Contact ${site.name}`}
        lede="For general enquiries, collaboration or questions about the studio."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass ring-gradient flex flex-col items-start gap-5 rounded-2xl p-7 sm:p-8">
              <h2 className="font-display text-xl font-bold">
                General enquiries
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center font-mono text-sm break-all text-mist underline decoration-white/25 decoration-1 underline-offset-4 hover:text-paper hover:decoration-azure"
              >
                {site.email}
              </a>
              <ButtonLink href={enquiryMailto} arrow>
                Email {site.name}
              </ButtonLink>
            </div>

            <div className="glass ring-gradient flex flex-col items-start gap-5 rounded-2xl p-7 sm:p-8">
              <h2 className="font-display text-xl font-bold">
                LumiTale support
              </h2>
              <a
                href={`mailto:${lumitaleSupport.email}`}
                className="inline-flex min-h-11 items-center font-mono text-sm break-all text-mist underline decoration-white/25 decoration-1 underline-offset-4 hover:text-paper hover:decoration-azure"
              >
                {lumitaleSupport.email}
              </a>
              <ButtonLink href={lumitaleSupport.mailto} variant="secondary" arrow>
                Email LumiTale support
              </ButtonLink>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-dim">
            Each button opens a draft in your own email application. There is
            no contact form, mailing list or waitlist behind this page.
          </p>
        </Container>
      </section>
    </>
  );
}
