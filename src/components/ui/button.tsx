import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "quiet";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-semibold tracking-[-0.01em] whitespace-nowrap transition duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-azure";

const sizes = {
  md: "h-11 px-5",
  lg: "h-13 px-7",
} as const;

const variants: Record<Variant, string> = {
  primary:
    "bg-linear-to-b from-azure to-electric text-white shadow-[0_10px_30px_-12px_rgb(47_107_255/0.9)] hover:from-white hover:to-mist hover:text-navy hover:shadow-[0_14px_38px_-14px_rgb(95_147_255/0.7)]",
  secondary:
    "glass text-paper hover:border-white/20 hover:bg-white/[0.09] hover:text-white",
  quiet:
    "text-mist hover:text-paper border border-transparent hover:border-white/10",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  /** Renders a trailing arrow that nudges on hover. */
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

/**
 * All calls to action on this site are navigations (in-page anchors, routes or
 * mailto), so the shared control is a link rather than a <button>.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  onClick,
}: ButtonLinkProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const isExternal = /^(mailto:|tel:|https?:)/.test(href);

  const inner = (
    <>
      {children}
      {arrow ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-1"
        >
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {inner}
    </Link>
  );
}
