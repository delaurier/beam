"use client";
import { Switch as Base } from "@base-ui/react/switch";
import type { ComponentProps, ReactNode } from "react";

// Beam "Switch": squared track (radius s) and thumb (radius xs); accent track when on. Only the thumb's translate moves.
export function Switch({ children, ...props }: { children: ReactNode } & Omit<ComponentProps<typeof Base.Root>, "className" | "children">) {
  return (
    <label className="flex items-center gap-s font-ui text-m font-ui-medium text-fg has-data-[disabled]:text-fg-disabled">
      <Base.Root className="group flex h-(--space-xl) w-10 shrink-0 rounded-s bg-track p-xxs transition-colors motion-small data-[checked]:bg-accent data-[disabled]:bg-disabled" {...props}>
        <Base.Thumb className="size-(--space-l) rounded-xs bg-thumb transition-transform motion-small edge data-[checked]:translate-x-(--space-l) group-data-[disabled]:bg-(--text-disabled)" />
      </Base.Root>
      {children}
    </label>
  );
}
