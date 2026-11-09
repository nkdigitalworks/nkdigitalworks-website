import Image from "next/image";
import Link from "next/link";
import type { AppEntry } from "@/lib/apps";

export function AppStatusBadge({ app }: { app: AppEntry }) {
  return <p className="app-status"><span aria-hidden="true" />{app.statusLabel}</p>;
}

export function AppCard({ app }: { app: AppEntry }) {
  const artwork = app.promotionalArtwork ?? app.cardArtwork ?? app.artwork;
  return (
    <article className={"product-card product-card-" + app.slug + (app.promotionalArtwork ? " has-promotional-art" : "")}>
      <div className="product-card-art">
        <span aria-hidden="true" className="product-orbit" />
        <div className="app-card-artwork"><Image src={artwork.src} alt={artwork.alt} width={artwork.width} height={artwork.height} sizes={app.promotionalArtwork ? "(min-width: 1100px) 400px, (min-width: 640px) 50vw, 100vw" : "220px"} className="product-card-image" /></div>
        {app.promotionalArtwork ? <span className="concept-art-label">Concept preview</span> : null}
      </div>
      <div className="product-card-copy">
        <div className="product-card-heading"><h2><Link href={app.href}>{app.name}</Link></h2><span aria-hidden="true" className="product-card-arrow">↗</span></div>
        <p className="product-category">{app.category ?? "Mobile experience"}</p>
        <p className="product-summary">{app.summary}</p>
        <AppStatusBadge app={app} />
        <Link href={app.href} className="text-link">Discover {app.name}<span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );
}
