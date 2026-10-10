import Link from "next/link";

import { Container } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { legalLinks, mailto, navItems, site } from "@/lib/site";

const linkClass =
  "inline-flex min-h-11 items-center text-[0.9375rem] text-mist/80 transition-colors duration-200 hover:text-paper";

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.2em] text-dim uppercase">
        {label}
      </h2>
      <ul className="mt-2 flex flex-col">{children}</ul>
    </div>
  );
}

/**
 * Company footer (Phase 3J-AX): the studio, its applications (from the shared
 * data model) and the company website policies. No product claims.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-navy/60">
      <div
        aria-hidden="true"
        className="glow-electric pointer-events-none absolute -top-56 left-1/2 size-[34rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
      />

      <Container className="relative py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/"
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
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-3">
            <FooterColumn label="Company">
              {navItems
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
            </FooterColumn>
            <FooterColumn label="Apps">
              {apps.map((app) => (
                <li key={app.slug}>
                  <Link href={app.href} className={linkClass}>
                    {app.name}
                  </Link>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn label="Website">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={mailto} className={linkClass}>
                  Email
                </a>
              </li>
            </FooterColumn>
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
