import type { LucideIcon } from "lucide-react";

/** Lucide at the theme's stroke width. Decorative unless a label is given. */
export function Icon({ icon: Glyph, size = 16, label, className }: { icon: LucideIcon; size?: 12 | 16 | 20 | 24; label?: string; className?: string }) {
  return <Glyph size={size} strokeWidth={2.5} aria-hidden={label ? undefined : true} aria-label={label} className={`shrink-0 ${className ?? ""}`} />;
}
