import type { Signal } from "@/lib/site";

/**
 * Abstract CSS markers for the signal cards: concentric rings, a light trail and
 * a privacy halo. Deliberately non-representational — no calendar, wallet, heart
 * monitor, graduation cap, target or any other literal feature icon, and only one
 * accent colour so nothing hints at a colour-coded internal system.
 */
export function SignalMarker({ marker }: { marker: Signal["marker"] }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-14 shrink-0 items-center justify-center"
    >
      {marker === "rings" ? <Rings /> : null}
      {marker === "trail" ? <Trail /> : null}
      {marker === "halo" ? <Halo /> : null}
    </span>
  );
}

/** Concentric rings drawing inward to a lit centre — connection. */
function Rings() {
  return (
    <>
      <span className="absolute inset-0 rounded-full border border-white/12" />
      <span className="absolute inset-[22%] rounded-full border border-white/20" />
      <span className="absolute inset-[44%] rounded-full border border-aqua/50" />
      <span className="absolute top-1/2 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua shadow-[0_0_10px_2px_rgb(36_212_238/0.6)]" />
    </>
  );
}

/** A light trail rising through stepped points — assistance, not control. */
function Trail() {
  return (
    <>
      <span className="absolute inset-x-[8%] bottom-[26%] h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
      <span className="absolute bottom-[26%] left-[12%] size-1.5 -translate-y-1/2 rounded-full bg-white/30" />
      <span className="absolute bottom-[46%] left-[42%] size-1.5 -translate-y-1/2 rounded-full bg-white/40" />
      <span className="absolute bottom-[68%] left-[74%] size-2 -translate-y-1/2 rounded-full bg-aqua shadow-[0_0_12px_2px_rgb(36_212_238/0.65)]" />
      <span className="absolute bottom-[30%] left-[16%] h-[42%] w-[60%] rounded-tr-[70%] border-t border-r border-white/14" />
    </>
  );
}

/** A closed halo sealing a solid centre — what is yours stays yours. */
function Halo() {
  return (
    <>
      <span className="absolute inset-[6%] rounded-full border border-dashed border-white/18" />
      <span className="absolute inset-[26%] rounded-full bg-linear-to-br from-white/14 to-transparent" />
      <span className="absolute inset-[26%] rounded-full border border-aqua/45 shadow-[0_0_16px_-2px_rgb(36_212_238/0.5)]" />
    </>
  );
}
