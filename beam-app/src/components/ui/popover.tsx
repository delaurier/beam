"use client";
import { Popover as Base } from "@base-ui/react/popover";
import type { ReactElement, ReactNode } from "react";
import { useScope } from "./use-scope";

// Beam "Popover": popover fill, default edge, radius m, padding m, gap xs; title medium, description muted.
export function Popover({ trigger, title, description, children }: { trigger: ReactElement; title: string; description?: string; children?: ReactNode }) {
  const scope = useScope();
  return (
    <Base.Root>
      <Base.Trigger render={trigger} />
      <Base.Portal>
        <Base.Positioner {...scope} sideOffset={6} align="start" className="z-30">
          <Base.Popup className="flex w-72 origin-(--transform-origin) flex-col gap-xs rounded-m bg-popover p-m outline-none transition-[opacity,scale] motion-small edge data-[starting-style]:scale-(--motion-popup-scale) data-[starting-style]:opacity-0 data-[ending-style]:scale-(--motion-popup-scale) data-[ending-style]:opacity-0">
            <Base.Title className="font-ui text-m font-ui-medium text-fg">{title}</Base.Title>
            {description ? <Base.Description className="font-ui text-m font-ui-regular text-fg-muted">{description}</Base.Description> : null}
            {children}
          </Base.Popup>
        </Base.Positioner>
      </Base.Portal>
    </Base.Root>
  );
}
