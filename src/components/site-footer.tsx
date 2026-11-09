import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Container } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { legalLinks, mailto, navItems, site } from "@/lib/site";

export function SiteFooter() {
  return <footer className="site-footer"><Container>
    <div className="footer-main">
      <div className="footer-brand"><Link href="/" className="brand-home" aria-label="NK Digitalworks home"><BrandLogo /></Link><p>Building meaningful digital<br />experiences for everyone.</p><a href={mailto} className="text-link">{site.email}<span aria-hidden="true">↗</span></a></div>
      <nav aria-label="Footer" className="footer-navigation">
        <div><h2>Explore</h2><ul>{navItems.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></div>
        <div><h2>Our applications</h2><ul>{apps.map((app) => <li key={app.slug}><Link href={app.href}>{app.name}</Link></li>)}</ul></div>
        <div><h2>The essentials</h2><ul>{legalLinks.map((item) => <li key={item.href}><Link href={item.href}>{item.label === "Privacy" ? "Privacy Policy" : "Terms of Use"}</Link></li>)}<li><Link href="/contact">Get in touch</Link></li></ul></div>
      </nav>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p><p>AI Apps <span aria-hidden="true">·</span> Games <span aria-hidden="true">·</span> Digital Innovation</p></div>
  </Container></footer>;
}
