import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { enquiryMailto, mailto, site } from "@/lib/site";

/*
 * Company homepage sections (Phase 3J-AX). Every statement rests on facts
 * already published on this site or verified for each application: no
 * founding dates, team size, clients, awards, testimonials or availability
 * claims.
 */

/** "About the studio": what the company develops (anchor #about kept). */
export function CompanyIntro() {
  const names = apps.map((app) => app.name);
  const listed = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0];
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            eyebrow="About the studio"
            title="An independent studio building mobile applications."
          />
          <div className="flex flex-col items-start gap-6 lg:pt-14">
            <p className="text-base leading-relaxed text-mist/85 sm:text-lg">
              {site.name} designs and builds its own applications. {names.length === 2 ? "Two are" : `${names.length} are`} in
              development today: {listed}. Each has its own page, its own identity and, where it needs them, its own policies.
            </p>
            <ButtonLink href="/about" variant="secondary" arrow>
              About {site.name}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

const approach = [
  {
    title: "Built for mobile",
    copy: "Our applications are designed for mobile, for the devices people already carry every day.",
  },
  {
    title: "Each product stands on its own",
    copy: "Every application has its own identity, its own page and, where it needs them, its own policies.",
  },
  {
    title: "Privacy in mind",
    copy: "This website sets no cookies and runs no analytics, and our products are designed so that what matters to people stays theirs.",
  },
  {
    title: "Shared when ready",
    copy: "Our applications are in development. We describe them carefully and announce availability only when it is real.",
  },
];

/** How the studio works: principles backed by verifiable facts. */
export function CompanyApproach() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="glow-iris pointer-events-none absolute -right-40 bottom-0 size-[26rem] rounded-full opacity-35 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading eyebrow="How we work" title="Thoughtful by design." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((item) => (
            <li
              key={item.title}
              className="glass ring-gradient flex flex-col gap-3 rounded-2xl p-7 transition-[transform,background-color] duration-400 ease-out hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <h3 className="font-display text-lg font-bold">{item.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-mist/80">
                {item.copy}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Company contact call to action (anchor #contact kept). */
export function CompanyContact() {
  return (
    <section id="contact" className="scroll-mt-24 pb-20 lg:pb-28">
      <Container>
        <div className="ring-gradient relative overflow-hidden rounded-[1.75rem] bg-midnight/70 px-7 py-16 text-center sm:px-12 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="grid-veil absolute inset-0" />
            <div className="glow-electric animate-breathe absolute -top-52 left-1/2 size-[40rem] -translate-x-1/2 rounded-full blur-3xl" />
          </div>
          <div className="relative flex flex-col items-center">
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-3xl leading-[1.1] font-extrabold sm:text-4xl lg:text-[2.75rem]">
              Talk to {site.name}.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/85 sm:text-lg">
              For enquiries about the studio or any of its applications.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={enquiryMailto} size="lg" arrow>
                Get in touch
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                All contact options
              </ButtonLink>
            </div>
            <a
              href={mailto}
              className="mt-8 inline-flex min-h-11 items-center font-mono text-sm text-mist underline decoration-white/25 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-paper hover:decoration-azure"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
