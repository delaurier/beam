"use client";
import { NumberField as Base } from "@base-ui/react/number-field";
import { Minus, Plus } from "lucide-react";
import { Icon } from "../icon";
import { controlClass } from "./text-field";

const step = "flex items-center rounded-s bg-control p-xs text-fg transition-colors motion-small edge hover:bg-highlight data-[disabled]:text-fg-disabled";

// Beam "Number field": an input between two step buttons, each with the default edge, gap xs.
export function NumberField({ label, defaultValue, min, max, stepBy = 1, disabled }: { label: string; defaultValue?: number; min?: number; max?: number; stepBy?: number; disabled?: boolean }) {
  return (
    <Base.Root defaultValue={defaultValue} min={min} max={max} step={stepBy} disabled={disabled} className="flex w-full flex-col gap-xs">
      <label className="flex flex-col gap-xs font-ui text-m font-ui-medium text-fg has-data-[disabled]:text-fg-disabled">
        {label}
        <Base.Group className="flex gap-xs">
          <Base.Decrement aria-label={`Decrease ${label}`} className={step}>
            <Icon icon={Minus} />
          </Base.Decrement>
          <Base.Input className={`${controlClass} min-w-0 flex-1`} />
          <Base.Increment aria-label={`Increase ${label}`} className={step}>
            <Icon icon={Plus} />
          </Base.Increment>
        </Base.Group>
      </label>
    </Base.Root>
  );
}
