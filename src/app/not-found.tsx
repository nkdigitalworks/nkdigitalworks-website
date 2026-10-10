import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="glow-electric absolute -top-52 left-1/2 size-[38rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl" />
        <div className="grid-veil absolute inset-0" />
      </div>

      <Container className="relative">
        <div className="flex max-w-xl flex-col items-start">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-6 text-[2.25rem] leading-[1.1] font-extrabold sm:text-5xl">
            That page does not exist.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-mist/85 sm:text-lg">
            The link may be out of date, or the page may have moved. Each of
            our applications has its own page under Our Apps.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg" arrow>
              Back to home
            </ButtonLink>
            <ButtonLink href="/apps" variant="secondary" size="lg">
              Our apps
            </ButtonLink>
            <ButtonLink href={mailto} variant="quiet" size="lg">
              Email us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
