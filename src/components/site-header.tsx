"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { navItems } from "@/lib/site";

const FOCUSABLE = "a[href], button:not([disabled])";

/** The current section: "/" only on the homepage; other routes by prefix. */
function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Compact sticky header: brand mark, company navigation, status pill. */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scrolling while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the panel on open (its first link, not the toggle that
  // shares the wrapper; fixed in Phase 3J-AX).
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, [open]);

  // Escape closes; Tab cycles within the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        mobileRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-transparent bg-ink/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link
          href="/"
          onClick={close}
          className="group flex items-baseline gap-2 rounded-md text-base tracking-[-0.015em] whitespace-nowrap"
        >
          <span className="font-display font-extrabold text-paper">NK</span>
          <span className="font-display font-medium text-mist transition-colors duration-300 group-hover:text-paper">
            Digital Works
          </span>
          <span
            aria-hidden="true"
            className="mb-px size-1.5 rounded-full bg-electric shadow-[0_0_10px_2px_rgb(47_107_255/0.7)]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                  className="flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium text-mist transition-colors duration-200 hover:bg-white/5 hover:text-paper aria-[current=page]:bg-white/8 aria-[current=page]:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile: toggle plus panel share a wrapper so focus can cycle. */}
        <div ref={mobileRef} className="md:hidden">
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass relative z-10 flex size-11 items-center justify-center rounded-xl text-paper"
          >
            <span aria-hidden="true" className="relative block h-3 w-4.5">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-px w-full bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>

          <div
            ref={panelRef}
            id="mobile-navigation"
            hidden={!open}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-white/10 bg-ink/97 backdrop-blur-2xl"
          >
            <nav aria-label="Primary mobile" className="px-6 pt-4 pb-10">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.label} className="border-b border-white/8">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                      className="block py-4 font-display text-lg font-semibold text-paper aria-[current=page]:text-azure"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
