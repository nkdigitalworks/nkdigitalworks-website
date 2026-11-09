import type { Metadata } from "next";
import Image from "next/image";
import { AppStatusBadge } from "@/components/apps/app-card";
import { CompanyContact } from "@/components/sections/company-sections";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { appBySlug } from "@/lib/apps";
import { baseOpenGraph } from "@/lib/site";

const app = appBySlug("colorwonder");
const preview = app.cardArtwork ?? app.artwork;
const description = "A sneak peek at ColorWonder, a colourful creative experience for young artists. Colour, paint and create — launching soon.";
export const metadata: Metadata = {
  title: "ColorWonder",
  description,
  alternates: { canonical: app.href },
  openGraph: { ...baseOpenGraph, title: "ColorWonder — Colour. Paint. Create.", description, url: app.href, images: [{ url: app.artwork.src, width: app.artwork.width, height: app.artwork.height, alt: app.artwork.alt }] },
  twitter: { card: "summary_large_image", title: "ColorWonder — Colour. Paint. Create.", description },
};

const previews = [
  { number: "01", title: "Every artist starts somewhere", copy: "The experience begins with choosing an avatar and creating an artist profile using a nickname and age range." },
  { number: "02", title: "Follow their imagination", copy: "Favourite themes help shape the creative journey: animals, space, nature, vehicles, fantasy and ocean adventures." },
  { number: "03", title: "Colour. Paint. Create.", copy: "A colouring experience for young artists is taking shape, with playful artwork and a calm, welcoming visual world." },
];

export default function ColorWonderPage() {
  return <>
    <section className="colorwonder-hero">
      <Container><div className="colorwonder-hero-grid">
        <div><Eyebrow>A sneak peek from NK Digitalworks</Eyebrow><h1>ColorWonder</h1><p className="colorwonder-tagline">Colour. Paint. <span>Create.</span></p><p className="colorwonder-intro">A colourful creative space for young artists to explore their imagination. From choosing an artist avatar to discovering favourite themes, ColorWonder is being designed to make the first steps into creativity feel welcoming.</p><AppStatusBadge app={app} /><p className="preview-disclaimer">This is an early look at an application in development. Final features, artwork and screens may change before launch.</p><div className="product-actions"><ButtonLink href="#first-look" arrow>Take a first look</ButtonLink><ButtonLink href="/apps" variant="secondary">Explore all apps</ButtonLink></div></div>
        <figure className="colorwonder-preview"><Image src={preview.src} width={preview.width} height={preview.height} alt={preview.alt} sizes="(min-width: 900px) 290px, 240px" priority /><figcaption>Design preview · Launching soon</figcaption></figure>
      </div></Container>
    </section>
    <section id="first-look" className="theme-section">
      <Container><div className="colorwonder-first-look"><div><Eyebrow>A world of imagination</Eyebrow><h2>Little artists.<br /><span className="theme-gradient">Wonderful possibilities.</span></h2><p>Here is a glimpse of the visual world being developed for ColorWonder. These images are a design preview, rather than a promise of the final picture library.</p></div><Image src={app.artwork.src} width={app.artwork.width} height={app.artwork.height} alt={app.artwork.alt} sizes="(min-width: 900px) 650px, calc(100vw - 48px)" /></div><div className="colorwonder-preview-grid">{previews.map((preview) => <article key={preview.number} className="theme-panel"><span>{preview.number}</span><h3>{preview.title}</h3><p>{preview.copy}</p></article>)}</div><div className="launch-preview-notice"><span className="launch-preview-dot" aria-hidden="true" /><div><strong>Launching soon. This is just a sneak peek.</strong><p>ColorWonder is not available to download yet. Launch details and download links will be shared here when ready.</p></div></div></Container>
    </section>
    <CompanyContact />
  </>;
}
