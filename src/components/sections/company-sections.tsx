import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, SectionHeading } from "@/components/ui/section";
import { apps } from "@/lib/apps";
import { enquiryMailto, mailto, site } from "@/lib/site";

export function CompanyIntro() {
  return (
    <section id="about" className="studio-intro theme-section">
      <Container>
        <div className="studio-intro-grid">
          <div>
            <Eyebrow>The studio behind the experiences</Eyebrow>
            <h2>Thoughtful technology.<br /><span className="theme-gradient">Human at heart.</span></h2>
          </div>
          <div className="studio-intro-copy">
            <p>{site.studio}</p>
            <p>We design and build our own mobile applications. {new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(apps.map((app) => app.name))} are launching soon. This is a sneak peek at three applications, each with its own identity and a carefully considered experience.</p>
            <Link href="/about" className="text-link">Meet NK Digitalworks <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

const approach = [
  { mark: "01", title: "Built for mobile", copy: "Designed for the devices people already carry every day, with clear, considered experiences." },
  { mark: "02", title: "An identity of its own", copy: "Every application has its own purpose, its own page and, where needed, its own policies." },
  { mark: "03", title: "Privacy in mind", copy: "This website sets no cookies and runs no analytics. Care for people guides the way we build." },
  { mark: "04", title: "Shared when ready", copy: "Our applications are launching soon. These pages offer a sneak peek; download availability will be announced when ready." },
];

export function CompanyApproach() {
  return (
    <section className="theme-section approach-section">
      <Container>
        <SectionHeading eyebrow="Our approach" title={<>Made with purpose.<br /><span className="theme-gradient">Built with care.</span></>} align="center" lede="Good digital experiences start with thoughtful decisions." />
        <ol className="approach-grid">
          {approach.map((item) => <li key={item.mark} className="theme-panel approach-card"><span className="approach-number">{item.mark}</span><h3>{item.title}</h3><p>{item.copy}</p></li>)}
        </ol>
      </Container>
    </section>
  );
}

export function CompanyContact() {
  return (
    <section id="contact" className="theme-section contact-banner-section">
      <Container>
        <div className="contact-banner">
          <div><Eyebrow>Let’s connect</Eyebrow><h2>Great things start<br /><span className="theme-gradient">with a conversation.</span></h2><p>Questions about the studio or one of our applications? We would love to hear from you.</p></div>
          <div className="contact-banner-actions"><ButtonLink href={enquiryMailto} size="lg" arrow>Get in Touch</ButtonLink><a href={mailto}>{site.email}</a><Link href="/contact" className="text-link">All contact options <span aria-hidden="true">↗</span></Link></div>
        </div>
      </Container>
    </section>
  );
}
