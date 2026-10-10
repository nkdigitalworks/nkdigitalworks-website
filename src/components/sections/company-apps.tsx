import Image from "next/image";

import { AppStatusBadge } from "@/components/apps/app-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/section";
import { apps } from "@/lib/apps";

/**
 * Featured applications (Phase 3J-AX): one row per real application from the
 * shared data model, alternating artwork side, each linking to the
 * application's own page. Only each app's verified summary and status.
 */
export function CompanyApps() {
  return (
    <section
      id="apps"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/8 bg-navy/50 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="glow-aqua pointer-events-none absolute top-1/3 left-1/2 size-[30rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Our applications"
          title="Products, each with its own identity."
          lede="Every application has its own page, its own purpose and, where it needs them, its own policies."
        />

        <ul className="mt-14 flex flex-col gap-8">
          {apps.map((app, index) => (
            <li
              key={app.slug}
              className="glass ring-gradient grid items-center gap-8 overflow-hidden rounded-[1.75rem] p-7 sm:p-10 lg:grid-cols-2 lg:gap-14"
            >
              <div
                className={`flex aspect-[3/2] items-center justify-center rounded-2xl bg-ink/50 p-6 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={app.artwork.src}
                  alt={app.artwork.alt}
                  width={app.artwork.width}
                  height={app.artwork.height}
                  sizes="(min-width: 1024px) 480px, calc(100vw - 104px)"
                  className="h-full w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col items-start gap-5">
                {app.category ? (
                  <p className="text-xs font-semibold tracking-[0.2em] text-dim uppercase">
                    {app.category}
                  </p>
                ) : null}
                <h3 className="font-display text-3xl font-bold">{app.name}</h3>
                <p className="max-w-md text-base leading-relaxed text-mist/85">
                  {app.summary}
                </p>
                <AppStatusBadge app={app} />
                <ButtonLink href={app.href} variant="secondary" arrow>
                  Discover {app.name}
                </ButtonLink>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ButtonLink href="/apps" variant="quiet" arrow>
            All applications
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
