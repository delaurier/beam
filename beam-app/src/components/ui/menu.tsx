"use client";
import { Menu as Base } from "@base-ui/react/menu";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Icon } from "../icon";
import { buttonClass } from "./button";
import { optionClass, popupClass } from "./select";
import { useScope } from "./use-scope";

export type MenuEntry = { label: string; disabled?: boolean; onSelect?: () => void; checked?: boolean; onCheckedChange?: (checked: boolean) => void } | "separator";

// Beam "Menu": outline trigger; popup radius m, padding xxs; group label subtle; separator in the border colour.
// An entry with `checked` is a checkbox item and keeps the menu open.
export function Menu({ trigger, heading, items, variant = "outline", chevron = true, align = "start" }: { trigger: ReactNode; heading?: string; items: MenuEntry[]; variant?: "outline" | "ghost" | "primary"; chevron?: boolean; align?: "start" | "end" }) {
  const scope = useScope();
  return (
    <Base.Root>
      <Base.Trigger className={buttonClass({ variant })}>
        {trigger}
        {chevron ? <Icon icon={ChevronDown} /> : null}
      </Base.Trigger>
      <Base.Portal>
        <Base.Positioner {...scope} sideOffset={6} align={align} className="z-30">
          <Base.Popup className={`${popupClass} min-w-48 rounded-m`}>
            <Base.Group className="flex flex-col gap-xxs">
              {heading ? <Base.GroupLabel className="px-xs py-xxs font-ui text-m font-ui-medium text-fg-subtle">{heading}</Base.GroupLabel> : null}
              {items.map((item, i) =>
                item === "separator" ? (
                  <div key={i} role="separator" className="h-(--border-s) bg-(--border)" />
                ) : item.checked !== undefined ? (
                  <Base.CheckboxItem key={item.label} checked={item.checked} onCheckedChange={item.onCheckedChange} closeOnClick={false} disabled={item.disabled} className={optionClass}>
                    <span className="flex-1">{item.label}</span>
                    <Base.CheckboxItemIndicator className="flex">
                      <Icon icon={Check} />
                    </Base.CheckboxItemIndicator>
                  </Base.CheckboxItem>
                ) : (
                  <Base.Item key={item.label} disabled={item.disabled} onClick={item.onSelect} className={optionClass}>
                    {item.label}
                  </Base.Item>
                ),
              )}
            </Base.Group>
          </Base.Popup>
        </Base.Positioner>
      </Base.Portal>
    </Base.Root>
  );
}
