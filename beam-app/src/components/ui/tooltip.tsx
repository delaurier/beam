"use client";
import { Tooltip as Base } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";
import { useScope } from "./use-scope";

// Beam "Tooltip": inverse fill and text, radius s, padding xxs / xs, medium.
export function Tooltip({ label, children }: { label: string; children: ReactElement }) {
  const scope = useScope();
  return (
    <Base.Provider>
      <Base.Root>
        <Base.Trigger render={children} />
        <Base.Portal>
          <Base.Positioner {...scope} sideOffset={6} className="z-30">
            <Base.Popup className="origin-(--transform-origin) rounded-s bg-inverse px-xs py-xxs font-ui text-m font-ui-medium text-fg-inverse transition-[opacity,scale] motion-small data-[starting-style]:scale-(--motion-popup-scale) data-[starting-style]:opacity-0 data-[ending-style]:scale-(--motion-popup-scale) data-[ending-style]:opacity-0">
              {label}
            </Base.Popup>
          </Base.Positioner>
        </Base.Portal>
      </Base.Root>
    </Base.Provider>
  );
}
