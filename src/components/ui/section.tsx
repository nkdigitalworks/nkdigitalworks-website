import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Small uppercase label with a lit dot, used above section headings. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.2em] text-dim uppercase ${className}`}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-aqua shadow-[0_0_10px_2px_rgb(36_212_238/0.55)]"
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  // A plain div, not <header>: keeps the document to exactly one banner
  // landmark so screen-reader landmark navigation stays meaningful.
  return (
    <div
      className={`flex flex-col gap-5 ${
        centered ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-2xl text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {lede ? (
        <p className="max-w-2xl text-base leading-relaxed text-mist/85 sm:text-lg">
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Thin divider that reads as a light seam between sections. */
export function Seam() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto h-px w-full max-w-6xl bg-linear-to-r from-transparent via-white/12 to-transparent"
    />
  );
}
