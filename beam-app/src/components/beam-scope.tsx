import type { ReactNode } from "react";

/** Restores Beam's own tokens for product screens, which must not use the guide's charcoal. */
export function BeamScope({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div data-beam="" className={className}>
      {children}
    </div>
  );
}
