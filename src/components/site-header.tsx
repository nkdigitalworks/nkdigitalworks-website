"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { apps } from "@/lib/apps";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const mobileRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpenPath(null), []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const handle = () => { if (media.matches) close(); };
    media.addEventListener("change", handle);
    return () => media.removeEventListener("change", handle);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>("main, footer"));
    const inertState = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    mobileRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = Array.from(mobileRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
      const focusable = [toggleRef.current, ...links].filter((element): element is HTMLElement => element !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element, index) => { element.inert = inertState[index]; });
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-home" onClick={close} aria-label="NK Digitalworks home"><BrandLogo /></Link>
        <nav aria-label="Primary" className="desktop-nav">
          <ul>
            {navItems.map((item) => {
              const current = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href} className={item.href === "/apps" ? "apps-nav-item" : undefined}>
                  <Link href={item.href} className="cosmic-nav-link" aria-current={current ? "page" : undefined}>{item.label}</Link>
                  {item.href === "/apps" ? (
                    <details className="apps-dropdown">
                      <summary aria-label="Show application links"><span aria-hidden="true">⌄</span></summary>
                      <div className="apps-dropdown-panel">
                        <p>Explore our applications</p>
                        {apps.map((app) => <Link key={app.slug} href={app.href}><span>{app.name}</span><span aria-hidden="true">↗</span></Link>)}
                        <Link href="/apps">View all apps <span aria-hidden="true">→</span></Link>
                      </div>
                    </details>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <Link href="/contact" className="cosmic-cta desktop-contact">Get in Touch <span aria-hidden="true">→</span></Link>
        <button ref={toggleRef} type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpenPath(open ? null : pathname)}><span aria-hidden="true">{open ? "×" : "☰"}</span></button>
      </div>
      <div ref={mobileRef} id="mobile-navigation" className="mobile-navigation" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={close}>{item.label}<span aria-hidden="true">↗</span></Link>)}
          <p>Our applications</p>
          {apps.map((app) => <Link key={app.slug} href={app.href} className="mobile-app-link" onClick={close}>{app.name}<span aria-hidden="true">→</span></Link>)}
        </nav>
        <Link href="/contact" className="cosmic-cta" onClick={close}>Get in Touch <span aria-hidden="true">→</span></Link>
      </div>
    </header>
  );
}
