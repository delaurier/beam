"use client";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup as Base } from "@base-ui/react/toggle-group";

type Props = { options: string[]; defaultValue?: string; value?: string; onValueChange?: (value: string) => void; "aria-label": string };

// One option is always pressed: pressing the pressed one again does nothing.
const group = ({ defaultValue, value, onValueChange }: Pick<Props, "defaultValue" | "value" | "onValueChange">) => ({
  defaultValue: value === undefined && defaultValue ? [defaultValue] : undefined,
  value: value === undefined ? undefined : [value],
  onValueChange: (next: string[]) => {
    if (next[0]) onValueChange?.(next[0]);
  },
});

// Beam "Toggle group": gap xxs; control padding xs / s, radius s, medium; pressed on neutral-3.
export function ToggleGroup({ options, defaultValue, value, onValueChange, ...rest }: Props) {
  return (
    <Base {...group({ defaultValue, value, onValueChange })} className="flex gap-xxs" {...rest}>
      {options.map((o) => (
        <Toggle key={o} value={o} className="rounded-s px-s py-xs font-ui text-m font-ui-medium text-fg transition-colors motion-small hover:bg-highlight data-[pressed]:bg-highlight data-[disabled]:text-fg-disabled">
          {o}
        </Toggle>
      ))}
    </Base>
  );
}

// The view switch: Toolbar geometry with Beam's local change (no group fill, solid edge, unpressed labels muted).
export function ViewSwitch({ options, defaultValue, value, onValueChange, ...rest }: Props) {
  return (
    <Base {...group({ defaultValue, value, onValueChange })} className="flex w-fit max-w-full flex-wrap gap-xxs rounded-s p-xxs edge-solid" {...rest}>
      {options.map((o) => (
        <Toggle
          key={o}
          value={o}
          className="rounded-s px-s py-xs font-ui text-m font-ui-medium text-fg-muted transition-colors motion-small hover:bg-hover hover:text-fg data-[pressed]:bg-highlight data-[pressed]:text-fg data-[disabled]:text-fg-disabled"
        >
          {o}
        </Toggle>
      ))}
    </Base>
  );
}
