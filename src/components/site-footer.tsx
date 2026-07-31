import Link from "next/link";

import { Container } from "@/components/ui/section";
import { legalLinks, mailto, site } from "@/lib/site";

/** Minimal footer. No product description beyond the private-development status. */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-navy/60">
      <div
        aria-hidden="true"
        className="glow-electric pointer-events-none absolute -top-56 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
      />

      <Container className="relative py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/#top"
              className="flex items-baseline gap-2 text-base tracking-[-0.015em]"
            >
              <span className="font-display font-extrabold text-paper">NK</span>
              <span className="font-display font-medium text-mist">
                Digital Works
              </span>
              <span
                aria-hidden="true"
                className="mb-px size-1.5 rounded-full bg-electric shadow-[0_0_10px_2px_rgb(47_107_255/0.7)]"
              />
            </Link>

            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-mist/75">
              {site.statement}
            </p>

            <p className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 px-4 py-2">
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-aqua"
              />
              <span className="text-xs font-semibold tracking-[0.14em] text-mist uppercase">
                {site.product} &bull; Private development
              </span>
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 lg:justify-end">
              <li>
                <Link
                  href="/#signal"
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist/80 transition-colors duration-200 hover:text-paper"
                >
                  The Signal
                </Link>
              </li>
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist/80 transition-colors duration-200 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={mailto}
                  className="inline-flex min-h-11 items-center text-[0.9375rem] text-mist/80 transition-colors duration-200 hover:text-paper"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6 text-sm text-dim">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
