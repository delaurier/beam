"use client";
import { Select as Base } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { Icon } from "../icon";
import { useScope } from "./use-scope";

export const popupClass =
  "flex flex-col gap-xxs bg-popover p-xxs outline-none edge origin-(--transform-origin) transition-[opacity,scale] motion-small " +
  "data-[starting-style]:scale-(--motion-popup-scale) data-[starting-style]:opacity-0 data-[ending-style]:scale-(--motion-popup-scale) data-[ending-style]:opacity-0";
export const optionClass =
  "flex cursor-default items-center gap-xs rounded-xs px-xs py-xxs font-ui text-m font-ui-regular text-fg outline-none select-none " +
  "data-[highlighted]:bg-highlight data-[disabled]:text-fg-disabled";

type Option = { value: string; label: string; disabled?: boolean };

// Beam "Select": control like a text field with a trailing chevron; popup radius s, padding xxs; options radius xs.
export function Select({ label, options, defaultValue, value, onValueChange, name, disabled, hideLabel }: { label: string; options: Option[]; defaultValue?: string; value?: string; onValueChange?: (value: string) => void; name?: string; disabled?: boolean; hideLabel?: boolean }) {
  const scope = useScope();
  return (
    <div className="flex w-full flex-col gap-xs">
      <Base.Root items={options} defaultValue={defaultValue} value={value} onValueChange={(v) => onValueChange?.(String(v))} name={name} disabled={disabled}>
        {hideLabel ? null : <Base.Label className={`font-ui text-m font-ui-medium ${disabled ? "text-fg-disabled" : "text-fg"}`}>{label}</Base.Label>}
        <Base.Trigger aria-label={hideLabel ? label : undefined} className="flex w-full items-center gap-xs rounded-s bg-control px-s py-xs text-left font-ui text-m font-ui-regular text-fg edge data-[disabled]:bg-disabled data-[disabled]:text-fg-disabled">
          <span className="min-w-0 flex-1 truncate">
            <Base.Value />
          </span>
          <Base.Icon className="flex text-fg-muted">
            <Icon icon={ChevronDown} />
          </Base.Icon>
        </Base.Trigger>
        <Base.Portal>
          <Base.Positioner {...scope} sideOffset={6} alignItemWithTrigger={false} className="z-30 w-(--anchor-width)">
            <Base.Popup className={`${popupClass} rounded-s`}>
              {options.map((o) => (
                <Base.Item key={o.value} value={o.value} disabled={o.disabled} className={`${optionClass} data-[selected]:bg-surface`}>
                  <Base.ItemText className="flex-1">{o.label}</Base.ItemText>
                  <Base.ItemIndicator className="flex">
                    <Icon icon={Check} />
                  </Base.ItemIndicator>
                </Base.Item>
              ))}
            </Base.Popup>
          </Base.Positioner>
        </Base.Portal>
      </Base.Root>
    </div>
  );
}
