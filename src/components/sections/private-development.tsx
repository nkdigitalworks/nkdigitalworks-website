import { Container, SectionHeading } from "@/components/ui/section";
import { site, statusItems } from "@/lib/site";

export function PrivateDevelopment() {
  return (
    <section
      id="status"
      className="relative scroll-mt-24 overflow-hidden border-y border-white/8 bg-navy/50 py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="glow-electric pointer-events-none absolute -top-40 left-1/3 size-[32rem] rounded-full opacity-35 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            eyebrow="Where things stand"
            title="Built quietly. Revealed carefully."
            lede={`${site.product} is currently in private development. We are taking the time to shape the experience, test its foundations and protect what makes it distinct.`}
          />

          <div className="flex flex-col gap-10">
            {/* Understated markers — no percentages, dates or promises */}
            <ul className="flex flex-col">
              {statusItems.map((item, index) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-b border-white/8 py-4 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-dim"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-6 shrink-0 bg-linear-to-r from-aqua/70 to-transparent"
                  />
                  <span className="text-[0.9375rem] text-paper">{item}</span>
                </li>
              ))}
            </ul>

            {/* About NK Digital Works — one statement, no service list */}
            <div id="about" className="glass scroll-mt-24 rounded-2xl p-6 sm:p-7">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-dim uppercase">
                About {site.name}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist/85">
                {site.studio}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
