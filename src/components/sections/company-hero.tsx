import Link from "next/link";

/** Live text and navigation with the owner's supplied artwork as the hero image. */
export function CompanyHero() {
  return (
    <section id="top" className="reference-hero" aria-labelledby="reference-hero-title">
      <div className="reference-hero-inner">
        <div className="reference-hero-copy">
          <p className="reference-hero-eyebrow">AI Apps <span aria-hidden="true">|</span> Games <span aria-hidden="true">|</span> Digital Innovation</p>
          <h1 id="reference-hero-title">Building Meaningful<br className="hidden sm:block" /> Digital Experiences<br className="hidden sm:block" />{" "}<span>for Everyone.</span></h1>
          <p className="reference-hero-description">We create AI-powered apps, imaginative games,<br className="hidden xl:block" /> and creative digital experiences that inform,<br className="hidden xl:block" /> entertain, and make life better.</p>
          <Link href="/apps" className="reference-hero-button">Explore Our Apps <span aria-hidden="true">→</span></Link>
        </div>
        <div className="reference-hero-art" role="img" aria-label="Supplied concept artwork of LumiTale, ColorWonder, Loopora and NoorLife on four phones above a glowing digital globe" />
      </div>
    </section>
  );
}
