import type { ReactNode } from "react";

import { Container, Eyebrow } from "@/components/ui/section";

/** Shared masthead for the standalone routes. */
export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-14 lg:pt-24 lg:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="glow-electric absolute -top-52 left-1/3 size-[36rem] rounded-full opacity-55 blur-3xl" />
        <div className="grid-veil absolute inset-0" />
      </div>

      <Container className="relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-[2.25rem] leading-[1.08] font-extrabold sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
            {lede}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

/**
 * One block of long-form policy copy. Body elements are styled through
 * descendant selectors so the page markup stays plain HTML.
 */
export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/8 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold">{heading}</h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-mist/80 [&_a]:text-azure [&_a]:underline [&_a]:decoration-azure/40 [&_a]:underline-offset-4 [&_a:hover]:decoration-azure [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-paper [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

/**
 * Visible advisory above policy copy. Marked up as a `note` role so assistive
 * technology announces it as an aside rather than as body text.
 */
export function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <div
      role="note"
      className="glass mb-10 rounded-2xl border-azure/25 bg-azure/8 p-5 text-[0.9375rem] leading-relaxed text-mist sm:p-6"
    >
      <p className="mb-1.5 font-display text-sm font-bold text-paper">
        Initial website policy
      </p>
      {children}
    </div>
  );
}

/** Constrains policy copy to a comfortable measure. */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <div className="max-w-3xl">{children}</div>
      </Container>
    </section>
  );
}
