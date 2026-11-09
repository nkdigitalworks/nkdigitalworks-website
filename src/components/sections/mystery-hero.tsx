import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { site } from "@/lib/site";

export function MysteryHero() {
  return <section id="top" className="product-masthead noorlife-masthead"><Container><div className="product-masthead-grid">
    <div><Eyebrow>{site.name} presents</Eyebrow><p className="product-name">NoorLife</p><h1>Something thoughtful<br /><span className="theme-gradient">is taking shape.</span></h1><p className="product-lede">A new intelligent experience, designed around the parts of life that matter most.</p><p className="app-status"><span aria-hidden="true" />Launching soon · Sneak peek</p><p className="product-mobile-note">Designed for mobile. In private development. This is an early preview.</p><div className="product-actions"><ButtonLink href="#signal" size="lg" arrow>Follow the signal</ButtonLink><ButtonLink href="#contact" variant="secondary" size="lg">Get in touch</ButtonLink></div></div>
    <div className="product-hero-visual"><div className="product-hero-ring" aria-hidden="true" /><Image src="/images/noorlife/noorlife-logo-robot-pointing-transparent.png" alt="NoorLife symbol with an AI companion pointing toward it" width={1536} height={1024} priority sizes="(min-width: 900px) 600px, calc(100vw - 48px)" /></div>
  </div></Container></section>;
}
