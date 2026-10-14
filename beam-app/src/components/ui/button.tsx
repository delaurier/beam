import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Built to the Beam "Button" assignment: radius s, padding xs / m, gap xs,
// ui medium at size m. Edges are box-shadows. Press moves by --motion-press-distance.
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const base =
  "inline-flex items-center justify-center gap-xs rounded-s px-m py-xs font-ui text-m font-ui-medium whitespace-nowrap " +
  "transition-[background-color,box-shadow,color,translate] motion-small active:translate-y-(--motion-press-distance) " +
  "disabled:pointer-events-none disabled:text-fg-disabled";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-fg-on-accent edge-inset disabled:bg-disabled",
  secondary: "bg-accent-muted text-fg edge hover:bg-hover-strong data-[force=hover]:bg-hover-strong disabled:bg-disabled",
  outline: "text-fg edge-solid hover:bg-hover data-[force=hover]:bg-hover",
  ghost: "text-fg hover:bg-hover data-[force=hover]:bg-hover",
  danger: "bg-danger text-fg-on-accent edge-inset disabled:bg-disabled",
};

type Common = { variant?: Variant; iconOnly?: boolean; children: ReactNode; className?: string };

export function buttonClass({ variant = "outline", iconOnly = false, className = "" }: Omit<Common, "children">) {
  return `${base} ${variants[variant]} ${iconOnly ? "px-xs" : ""} ${className}`;
}

export function Button({ variant, iconOnly, className, children, ...props }: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button type="button" className={buttonClass({ variant, iconOnly, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant, iconOnly, className, children, href, ...props }: Common & { href: string } & Omit<ComponentProps<typeof Link>, "className" | "children" | "href">) {
  return (
    <Link href={href} className={buttonClass({ variant, iconOnly, className })} {...props}>
      {children}
    </Link>
  );
}

/** Keeps an icon the same height as a line of size-m text, so icon-only buttons match text buttons. */
export function ButtonIcon({ children }: { children: ReactNode }) {
  return <span className="flex h-(--line-m) items-center">{children}</span>;
}
