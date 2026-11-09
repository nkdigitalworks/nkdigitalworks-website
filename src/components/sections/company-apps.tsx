import { AppCard } from "@/components/apps/app-card";
import { ButtonLink } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/section";
import { apps } from "@/lib/apps";

export function CompanyApps() {
  return (
    <section id="apps" className="theme-section portfolio-section">
      <Container>
        <div className="section-heading-row">
          <SectionHeading eyebrow="Our applications" title={<>Different ideas.<br /><span className="theme-gradient">One thoughtful studio.</span></>} lede="A sneak peek at NoorLife, LumiTale and ColorWonder. All three applications are launching soon." />
          <ButtonLink href="/apps" variant="secondary" arrow>Explore all apps</ButtonLink>
        </div>
        <ul className="portfolio-grid">{apps.map((app) => <li key={app.slug}><AppCard app={app} /></li>)}</ul>
      </Container>
    </section>
  );
}
