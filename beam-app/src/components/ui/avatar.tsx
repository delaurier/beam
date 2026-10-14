"use client";
import { Avatar as Base } from "@base-ui/react/avatar";

// Beam "Avatar": full radius, muted fill, initials in secondary text, medium.
export function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <Base.Root aria-label={name} className="flex size-(--space-xxl) shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-muted">
      {src ? <Base.Image src={src} alt="" className="size-full object-cover" /> : null}
      <Base.Fallback className="font-ui text-m font-ui-medium text-fg-secondary">{initials}</Base.Fallback>
    </Base.Root>
  );
}
