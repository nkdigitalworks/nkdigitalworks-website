import { Container, SectionHeading } from "@/components/ui/section";
import { site } from "@/lib/site";

/**
 * The maximum product explanation permitted on the public site. Nothing here
 * names a capability, category or area of life.
 */
export function ProductSignal() {
  return (
    <section
      id="signal"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/8 bg-navy/50 py-20 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="glow-aqua absolute top-1/3 left-1/2 size-[30rem] -translate-x-1/2 rounded-full opacity-35 blur-3xl" />
      </div>

      <Container className="relative">
        <SectionHeading
          align="center"
          eyebrow="The signal is getting clearer"
          title="Not another app. A more thoughtful way forward."
          lede={`${site.product} is being shaped as one connected experience — calm in use, intelligent where useful and intentionally private.`}
          className="mx-auto"
        />
      </Container>
    </section>
  );
}
