import { Container } from "@/components/ui/section";
import { SignalMarker } from "@/components/ui/signal-markers";
import { signals } from "@/lib/site";

/**
 * Three abstract signals. The count and the single accent colour are deliberate:
 * neither should hint at any internal structure. No implementation detail is
 * given for any of them.
 */
export function AbstractPrinciples() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="glow-iris pointer-events-none absolute -right-40 bottom-0 size-[26rem] rounded-full opacity-40 blur-3xl"
      />

      <Container className="relative">
        <ul className="grid gap-4 md:grid-cols-3">
          {signals.map((signal) => (
            <li
              key={signal.title}
              className="group glass ring-gradient flex flex-col gap-7 rounded-2xl p-7 transition-[transform,background-color] duration-400 ease-out hover:-translate-y-1 hover:bg-white/[0.07] sm:p-8"
            >
              <SignalMarker marker={signal.marker} />
              <div>
                <h2 className="font-display text-xl font-bold">
                  {signal.title}
                </h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mist/80">
                  {signal.copy}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
