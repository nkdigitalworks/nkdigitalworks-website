import Image from "next/image";
import Link from "next/link";

import type { AppEntry } from "@/lib/apps";

/** Status pill. The label carries the meaning; the dot is decorative. */
export function AppStatusBadge({ app }: { app: AppEntry }) {
  return (
    <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-3.5 py-1.5">
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${
          app.status === "available" ? "bg-aqua" : "bg-azure"
        }`}
      />
      <span className="text-xs font-semibold tracking-[0.14em] text-mist uppercase">
        {app.statusLabel}
      </span>
    </p>
  );
}

/**
 * One application in the portfolio: artwork, name, category, summary, status
 * and a link to the application's own page. The whole card is one link with a
 * single accessible name (the application's name).
 */
export function AppCard({ app }: { app: AppEntry }) {
  return (
    <article className="group glass ring-gradient relative flex w-full flex-col overflow-hidden rounded-2xl transition-[transform,background-color] duration-400 ease-out hover:-translate-y-1 hover:bg-white/[0.07]">
      <div className="flex aspect-[3/2] items-center justify-center bg-navy/60 p-6">
        <Image
          src={app.artwork.src}
          alt={app.artwork.alt}
          width={app.artwork.width}
          height={app.artwork.height}
          sizes="(min-width: 1024px) 520px, calc(100vw - 48px)"
          className="h-full w-auto max-w-full object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7 sm:p-8">
        {app.category ? (
          <p className="text-xs font-semibold tracking-[0.2em] text-dim uppercase">
            {app.category}
          </p>
        ) : null}
        <h2 className="font-display text-2xl font-bold">
          <Link
            href={app.href}
            className="rounded-md after:absolute after:inset-0 after:content-['']"
          >
            {app.name}
          </Link>
        </h2>
        <p className="text-[0.9375rem] leading-relaxed text-mist/85">
          {app.summary}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
          <AppStatusBadge app={app} />
          <span
            aria-hidden="true"
            className="text-sm font-semibold text-azure transition-transform duration-300 group-hover:translate-x-1"
          >
            View &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
