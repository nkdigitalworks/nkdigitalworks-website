import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-shell";
import { Container } from "@/components/ui/section";
import { lumitaleSupport } from "@/lib/lumitale";
import { baseOpenGraph, enquiryMailto, site } from "@/lib/site";
const description = "Get in touch with NK Digitalworks for studio enquiries, collaboration and LumiTale support.";
export const metadata: Metadata = { title: "Contact", description, alternates: { canonical: "/contact" }, openGraph: { ...baseOpenGraph, title: "Contact — NK Digitalworks", description, url: "/contact" }, twitter: { title: "Contact — NK Digitalworks", description } };
export default function ContactPage() {
 return <>
   <PageHero eyebrow="Let’s connect" title="Your next conversation starts here." lede="Have a question, an idea, or something you would like to share? Get in touch with the studio or contact LumiTale support directly." />
   <section className="contact-page-section"><Container>
     <div className="contact-grid">
       <article className="theme-panel contact-option"><span className="contact-symbol" aria-hidden="true">↗</span><p className="product-category">The studio</p><h2>General enquiries</h2><p>For questions about NK Digitalworks, collaboration, or any of our applications.</p><a href={"mailto:" + site.email} className="contact-email">{site.email}</a><ButtonLink href={enquiryMailto} arrow>Email the studio</ButtonLink></article>
       <article className="theme-panel contact-option"><span className="contact-symbol violet" aria-hidden="true">☾</span><p className="product-category">Product support</p><h2>LumiTale support</h2><p>For questions about LumiTale, its development, or the family’s storytelling experience.</p><a href={lumitaleSupport.mailto} className="contact-email">{lumitaleSupport.email}</a><ButtonLink href={lumitaleSupport.mailto} variant="secondary" arrow>Email LumiTale support</ButtonLink></article>
     </div>
     <div className="contact-note"><span aria-hidden="true">✉</span><div><h2>A direct line to us.</h2><p>Each email button opens a draft in your own email application. There is no contact form, mailing list or waitlist behind this page.</p><Link href="/privacy" className="text-link">Read our privacy policy <span aria-hidden="true">↗</span></Link></div></div>
   </Container></section>
 </>;
}
