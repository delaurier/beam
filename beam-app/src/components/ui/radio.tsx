"use client";
import { Radio as Base } from "@base-ui/react/radio";
import { RadioGroup as Group } from "@base-ui/react/radio-group";
import type { ComponentProps, ReactNode } from "react";

// Beam "Radio": full radius, default edge, accent dot when selected.
export function RadioGroup(props: Omit<ComponentProps<typeof Group>, "className">) {
  return <Group className="flex flex-col gap-m" {...props} />;
}

export function Radio({ children, ...props }: { children: ReactNode } & Omit<ComponentProps<typeof Base.Root>, "className" | "children">) {
  return (
    <label className="flex items-center gap-s font-ui text-m font-ui-regular text-fg has-data-[disabled]:text-fg-disabled">
      <Base.Root className="flex size-(--space-l) shrink-0 items-center justify-center rounded-full bg-control edge data-[disabled]:bg-disabled" {...props}>
        <Base.Indicator className="size-(--space-s) rounded-full bg-accent" />
      </Base.Root>
      {children}
    </label>
  );
}
