import { Children, isValidElement, type ReactNode } from "react";
import { Container, Eyebrow } from "@/components/ui/section";

const sectionId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function PageHero({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return <section className="page-masthead"><Container><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{lede ? <p className="page-lede">{lede}</p> : null}<div className="masthead-line" aria-hidden="true" /></Container></section>;
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return <section id={sectionId(heading)} className="legal-section"><h2>{heading}</h2><div className="legal-section-copy">{children}</div></section>;
}

export function LegalNotice({ children }: { children: ReactNode }) {
  return <div role="note" className="legal-notice"><p className="legal-notice-label">Initial website policy</p>{children}</div>;
}

export function LegalBody({ children }: { children: ReactNode }) {
  const headings = Children.toArray(children).filter((child) => isValidElement<{ heading?: string }>(child) && typeof child.props.heading === "string").map((child) => (child as React.ReactElement<{ heading: string }>).props.heading);
  return <section className="legal-body"><Container><div className="legal-layout"><aside className="legal-sidebar"><p>On this page</p><nav aria-label="Policy sections">{headings.map((heading) => <a key={heading} href={"#" + sectionId(heading)}>{heading}</a>)}</nav><a className="text-link" href="/contact">Questions? Contact us <span aria-hidden="true">↗</span></a></aside><div className="legal-document theme-panel">{children}</div></div></Container></section>;
}
