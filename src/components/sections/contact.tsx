import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/section";
import { enquiryMailto, mailto, site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <Container>
        <div className="ring-gradient relative overflow-hidden rounded-[1.75rem] bg-midnight/70 px-7 py-16 text-center sm:px-12 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="grid-veil absolute inset-0" />
            <div className="glow-electric animate-breathe absolute -top-52 left-1/2 size-[40rem] -translate-x-1/2 rounded-full blur-3xl" />
            <div className="glow-iris absolute -bottom-40 -left-24 size-[22rem] rounded-full opacity-50 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center">
            <Eyebrow>Contact</Eyebrow>

            <h2 className="mt-6 max-w-2xl text-3xl leading-[1.1] font-extrabold sm:text-4xl lg:text-[2.75rem]">
              Stay close to what comes next.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-mist/85 sm:text-lg">
              For early interest, collaboration or general enquiries, contact{" "}
              {site.name}.
            </p>

            <div className="mt-10">
              <ButtonLink href={enquiryMailto} size="lg" arrow>
                Get in touch
              </ButtonLink>
            </div>

            <a
              href={mailto}
              className="mt-8 inline-flex min-h-11 items-center font-mono text-sm text-mist underline decoration-white/25 decoration-1 underline-offset-4 transition-colors duration-200 hover:text-paper hover:decoration-azure"
            >
              {site.email}
            </a>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-dim">
              This opens a draft in your own email application. There is no
              mailing list or waitlist behind this page.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
