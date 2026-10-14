"use client";
import { Checkbox as Base } from "@base-ui/react/checkbox";
import { Check, Minus } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "../icon";

// Beam "Checkbox": radius xs, inset default edge, accent fill when checked or indeterminate.
export function Checkbox({ children, ...props }: { children: ReactNode } & Omit<ComponentProps<typeof Base.Root>, "className" | "children">) {
  return (
    <label className="flex items-center gap-s font-ui text-m font-ui-regular text-fg has-data-[disabled]:text-fg-disabled">
      <Base.Root
        className="flex size-(--space-l) shrink-0 items-center justify-center rounded-xs bg-control text-fg-on-accent transition-colors motion-small edge-inset data-[checked]:bg-accent data-[indeterminate]:bg-accent data-[disabled]:bg-disabled"
        {...props}
      >
        <Base.Indicator className="flex">
          <Icon icon={props.indeterminate ? Minus : Check} size={12} />
        </Base.Indicator>
      </Base.Root>
      {children}
    </label>
  );
}
