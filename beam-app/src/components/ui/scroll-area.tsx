"use client";
import { ScrollArea as Base } from "@base-ui/react/scroll-area";
import type { ReactNode } from "react";

// Beam "Scroll area": surface fill, default edge, radius s, padding m; thumb on neutral-4.
export function ScrollArea({ children, className = "h-40" }: { children: ReactNode; className?: string }) {
  return (
    <Base.Root className={`relative w-full overflow-hidden rounded-s bg-surface edge ${className}`}>
      <Base.Viewport className="h-full overscroll-contain p-m font-ui text-m font-ui-regular text-fg-secondary">{children}</Base.Viewport>
      <Base.Scrollbar className="flex w-(--space-s) justify-center p-xxs">
        <Base.Thumb className="w-full rounded-full bg-track transition-colors motion-small hover:bg-line-strong" />
      </Base.Scrollbar>
    </Base.Root>
  );
}
