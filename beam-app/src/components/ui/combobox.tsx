"use client";
import { Combobox as Base } from "@base-ui/react/combobox";
import { Check } from "lucide-react";
import { Icon } from "../icon";
import { optionClass, popupClass } from "./select";
import { controlClass } from "./text-field";
import { useScope } from "./use-scope";

// Beam "Combobox": a text field that filters a list. Popup and options match Select.
export function Combobox({ label, options, placeholder }: { label: string; options: string[]; placeholder?: string }) {
  const scope = useScope();
  return (
    <Base.Root items={options}>
      <label className="flex w-full flex-col gap-xs font-ui text-m font-ui-medium text-fg">
        {label}
        <Base.Input placeholder={placeholder} className={controlClass} />
      </label>
      <Base.Portal>
        <Base.Positioner {...scope} sideOffset={6} className="z-30 w-(--anchor-width)">
          <Base.Popup className={`${popupClass} rounded-s`}>
            <Base.Empty className="px-xs py-xxs font-ui text-m font-ui-regular text-fg-muted empty:hidden">No match.</Base.Empty>
            <Base.List className="flex max-h-48 flex-col gap-xxs overflow-y-auto overscroll-contain">
              {(item: string) => (
                <Base.Item key={item} value={item} className={`${optionClass} data-[selected]:bg-surface`}>
                  <span className="flex-1">{item}</span>
                  <Base.ItemIndicator className="flex">
                    <Icon icon={Check} />
                  </Base.ItemIndicator>
                </Base.Item>
              )}
            </Base.List>
          </Base.Popup>
        </Base.Positioner>
      </Base.Portal>
    </Base.Root>
  );
}
