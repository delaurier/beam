"use client";
import { Accordion as Base } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "../icon";

// Beam "Accordion": trigger padding m, medium; panel text in secondary; a rule between items.
// The panel fades in. Its height is not animated: Beam only animates transform and opacity.
export function Accordion({ items }: { items: { title: string; content: ReactNode; disabled?: boolean }[] }) {
  return (
    <Base.Root className="flex w-full flex-col">
      {items.map((item) => (
        <Base.Item key={item.title} disabled={item.disabled} className="divider-b last:shadow-none">
          <Base.Header>
            <Base.Trigger className="group flex w-full items-center justify-between gap-xs rounded-s py-m text-left font-ui text-m font-ui-medium text-fg data-[disabled]:text-fg-disabled">
              {item.title}
              <Icon icon={ChevronDown} className="text-fg-muted transition-transform motion-small group-data-[panel-open]:rotate-180" />
            </Base.Trigger>
          </Base.Header>
          <Base.Panel className="pb-m font-ui text-m font-ui-regular text-fg-secondary transition-opacity motion-large data-[starting-style]:opacity-0">{item.content}</Base.Panel>
        </Base.Item>
      ))}
    </Base.Root>
  );
}
