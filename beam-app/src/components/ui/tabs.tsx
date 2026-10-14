"use client";
import { Tabs as Base } from "@base-ui/react/tabs";
import type { ReactNode } from "react";

// Beam "Tabs": list gap l with a bottom rule; triggers subtle until selected.
export function Tabs({ tabs, defaultValue }: { tabs: { value: string; label: string; content: ReactNode; disabled?: boolean }[]; defaultValue?: string }) {
  return (
    <Base.Root defaultValue={defaultValue ?? tabs[0]?.value} className="flex w-full flex-col gap-xs">
      <Base.List className="flex gap-l divider-b">
        {tabs.map((t) => (
          <Base.Tab
            key={t.value}
            value={t.value}
            disabled={t.disabled}
            className="py-xs font-ui text-m font-ui-regular text-fg-subtle transition-colors motion-small hover:text-fg data-[active]:text-fg-selected data-[disabled]:text-(--neutral-4)"
          >
            {t.label}
          </Base.Tab>
        ))}
      </Base.List>
      {tabs.map((t) => (
        <Base.Panel key={t.value} value={t.value} className="pt-xs font-ui text-m font-ui-regular text-fg-secondary">
          {t.content}
        </Base.Panel>
      ))}
    </Base.Root>
  );
}
