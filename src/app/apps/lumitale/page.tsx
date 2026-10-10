import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { appBySlug } from "@/lib/apps";
import {
  lumitale,
  lumitaleCreation,
  lumitaleFeatures,
  lumitaleParentControl,
  lumitaleSafety,
  lumitaleSupport,
} from "@/lib/lumitale";
import { lumitaleLegalPages, lumitaleLegalPublished } from "@/lib/lumitale-legal";
import { baseOpenGraph, site } from "@/lib/site";

/*
 * LumiTale's own page (Phase 3J-AU). LumiTale's approved Option A colours are
 * scoped to this page (lt-* tokens); the company chrome around it is unchanged.
 * Visuals are approved LumiTale artwork synced from the LumiTale V2 repository
 * (scripts/sync-lumitale.mjs); there are no screenshots and no store links.
 */
const app = appBySlug("lumitale");

export const metadata: Metadata = {
  // The layout template appends "— NK Digital Works".
  title: lumitale.name,
  description: lumitale.intro,
  alternates: { canonical: app.href },
  openGraph: {
    ...baseOpenGraph,
    title: `${lumitale.name} — ${lumitale.tagline}`,
    description: lumitale.intro,
    url: app.href,
    images: [
      {
        url: app.artwork.src,
        width: app.artwork.width,
        height: app.artwork.height,
        alt: app.artwork.alt,
      },
    ],
  },
};

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-lt-soft">
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-lt-gold shadow-[0_0_8px_1px_rgb(255_209_102/0.6)]"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="rounded-3xl bg-lt-surface/80 p-7 sm:p-9">
      <h2 id={id} className="font-display text-2xl font-bold text-white">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function LumiTalePage() {
  const legalPublished = lumitaleLegalPublished();

  return (
    <div className="bg-lt-night">
      {/* 1. Hero */}
      <section className="relative overflow-hidden pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-0 size-[36rem] rounded-full bg-lt-primary/25 blur-3xl" />
          <div className="absolute -bottom-48 -left-24 size-[28rem] rounded-full bg-lt-secondary/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col items-start">
            <p className="text-xs font-semibold tracking-[0.2em] text-lt-soft uppercase">
              An app by {site.name}
            </p>
            <h1 className="mt-6">
              <Image
                src="/apps/lumitale/lumitale-wordmark.png"
                alt={lumitale.name}
                width={720}
                height={240}
                priority
                sizes="(min-width: 640px) 320px, 240px"
                className="h-auto w-60 sm:w-80"
              />
            </h1>
            <p className="mt-6 font-display text-2xl font-bold text-lt-gold sm:text-3xl">
              {lumitale.tagline}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-lt-soft">
              {lumitale.intro}
            </p>
            {/* 9. Availability, stated up front */}
            <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-lt-gold/30 bg-lt-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-lt-gold uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-lt-gold" />
              {app.statusLabel}
            </p>
          </div>
          {/* 8. Approved product visual: the Screen 00 splash artwork */}
          <Image
            src="/apps/lumitale/lumitale-hero.png"
            alt="Two children flying on an open storybook past a crescent moon and a smiling star"
            width={1200}
            height={800}
            priority
            sizes="(min-width: 1024px) 548px, calc(100vw - 48px)"
            className="h-auto w-full"
          />
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-24 lg:px-8 lg:pb-32">
        {/* 2–3. Introduction and key features */}
        <section aria-labelledby="features" className="py-6">
          <h2 id="features" className="font-display text-3xl font-bold text-white sm:text-4xl">
            Made for bedtime, run by parents
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {lumitaleFeatures.map((feature) => (
              <li key={feature.title} className="rounded-3xl bg-lt-surface/80 p-7 sm:p-9">
                <h3 className="font-display text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-lt-soft">
                  {feature.copy}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 4. Parent control */}
          <Block id="parents" title="Parents stay in control">
            <Bullets items={lumitaleParentControl} />
          </Block>
          {/* 5–6. Story creation and saved stories */}
          <Block id="creation" title="Creating stories">
            <Bullets items={lumitaleCreation} />
          </Block>
        </div>

        {/* 7. Safety and privacy */}
        <Block id="safety" title="Safety and privacy by design">
          <Bullets items={lumitaleSafety} />
        </Block>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 9. Availability */}
          <Block id="availability" title="Availability">
            <p className="text-[0.9375rem] leading-relaxed text-lt-soft">
              {lumitale.availability}
            </p>
          </Block>
          {/* 10. Support */}
          <Block id="support" title="Support">
            <p className="text-[0.9375rem] leading-relaxed text-lt-soft">
              Questions about LumiTale:{" "}
              <a
                href={lumitaleSupport.mailto}
                className="break-all text-white underline decoration-lt-gold/60 underline-offset-4 hover:decoration-lt-gold"
              >
                {lumitaleSupport.email}
              </a>
            </p>
          </Block>
        </div>

        {/* 11. LumiTale legal pages (never linked unless published) */}
        <Block id="legal" title="Policies">
          {legalPublished ? (
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {lumitaleLegalPages.map((page) => (
                <li key={page.href}>
                  <a
                    href={page.href}
                    className="inline-flex min-h-11 items-center text-white underline decoration-lt-gold/60 underline-offset-4 hover:decoration-lt-gold"
                  >
                    {page.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[0.9375rem] leading-relaxed text-lt-soft">
              LumiTale&apos;s Privacy Policy, Terms of Service and account-deletion
              page will be published here before the app is released.
            </p>
          )}
        </Block>

        <p className="pt-4 text-sm text-lt-soft/80">
          <Link href="/apps" className="underline underline-offset-4 hover:text-white">
            &larr; All apps by {site.name}
          </Link>
        </p>
      </div>
    </div>
  );
}
