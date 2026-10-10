import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { site } from "@/lib/site";

/**
 * Company hero (Phase 3J-AX). Verified wording only: the studio statement and
 * description already published on this site, plus the real applications.
 */
export function CompanyHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 pb-24 sm:pt-24 lg:pt-28 lg:pb-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="glow-electric animate-breathe absolute -top-48 -right-32 size-[44rem] rounded-full opacity-60 blur-3xl" />
        <div className="glow-iris absolute -bottom-56 -left-44 size-[34rem] rounded-full opacity-50 blur-3xl" />
        <div className="grid-veil absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="flex flex-col items-start">
            <Eyebrow>{site.name}</Eyebrow>
            <h1 className="mt-8 max-w-2xl text-[2.5rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.5rem]">
              {site.statement}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist/85">
              {site.studio}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/apps" size="lg" arrow>
                Explore our apps
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg">
                Contact {site.name}
              </ButtonLink>
            </div>
          </div>

          {/* The real portfolio, one tile per application. */}
          <ul className="grid grid-cols-2 gap-4" aria-label="Our applications">
            {apps.map((app, index) => (
              <li
                key={app.slug}
                className={index % 2 === 1 ? "translate-y-8" : undefined}
              >
                <Link
                  href={app.href}
                  className="group glass ring-gradient flex flex-col items-center gap-4 rounded-2xl p-5 text-center transition-[transform,background-color] duration-400 ease-out hover:-translate-y-1 hover:bg-white/[0.07]"
                >
                  <span className="flex aspect-square w-full items-center justify-center">
                    <Image
                      src={app.artwork.src}
                      alt=""
                      width={app.artwork.width}
                      height={app.artwork.height}
                      priority
                      sizes="(min-width: 1024px) 220px, 42vw"
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="font-display text-lg font-bold text-paper">
                    {app.name}
                  </span>
                  <span className="text-[0.6875rem] font-semibold tracking-[0.14em] text-dim uppercase">
                    {app.statusLabel}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
