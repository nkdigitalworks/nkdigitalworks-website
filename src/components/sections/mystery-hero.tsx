import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { site } from "@/lib/site";

/** Intrinsic size of the approved combined artwork — 3:2 landscape. */
const ARTWORK_WIDTH = 1536;
const ARTWORK_HEIGHT = 1024;

export function MysteryHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-16 pb-24 sm:pt-24 lg:pt-28 lg:pb-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="glow-electric animate-breathe absolute -top-48 -right-32 size-[44rem] rounded-full opacity-70 blur-3xl" />
        <div className="glow-iris absolute -bottom-56 -left-44 size-[34rem] rounded-full opacity-60 blur-3xl" />
        <div className="grid-veil absolute inset-0 opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink to-transparent" />
      </div>

      <Container className="relative">
        {/* Even split: the approved artwork is 3:2 landscape, so the visual
            column needs enough width for the logo and robot to read clearly. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="flex flex-col items-start">
            <Eyebrow>{site.name} presents</Eyebrow>

            <h1 className="mt-8 max-w-2xl text-[2.5rem] leading-[1.05] font-extrabold sm:text-5xl lg:text-[3.5rem]">
              Something thoughtful is taking shape.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist/85">
              A new intelligent experience, designed around the parts of life
              that matter most.
            </p>

            {/* The reveal: the name, and nothing more about it */}
            <div className="mt-11 flex flex-col items-start gap-4">
              <p className="font-display text-[2rem] leading-none font-extrabold tracking-[-0.02em] sm:text-[2.5rem]">
                <span className="text-gradient">{site.product}</span>
              </p>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-aqua/25 bg-aqua/8 px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-aqua/90 uppercase">
                <span
                  aria-hidden="true"
                  className="animate-breathe size-1.5 rounded-full bg-aqua"
                />
                Private development &bull; Coming soon
              </p>
            </div>

            <p className="mt-8 text-[0.9375rem] text-dim">
              Designed for mobile. Built with purpose.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="#signal" size="lg" arrow>
                Follow the signal
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg">
                Contact {site.name}
              </ButtonLink>
            </div>
          </div>

          {/* Approved transparent artwork: the symbol and the AI companion are
              both inside this single image. No wrapper background, no frame and
              no radius — the section's own dark surface and ambient lighting
              show through the transparent areas. */}
          <div className="w-full">
            <Image
              src="/images/noorlife/noorlife-logo-robot-pointing-transparent.png"
              alt="NoorLife symbol with an AI companion pointing toward it"
              width={ARTWORK_WIDTH}
              height={ARTWORK_HEIGHT}
              priority
              // Matches the real column width: max-w-6xl container (1152px)
              // less lg:px-8 padding, split evenly, less the 56px grid gap.
              sizes="(min-width: 1216px) 548px, (min-width: 1024px) calc(50vw - 60px), calc(100vw - 48px)"
              className="h-auto w-full object-contain object-center"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
