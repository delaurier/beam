"use client";
import { Field } from "@base-ui/react/field";
import type { ComponentProps } from "react";

// Beam "Text field" and "Field": control radius s, padding xs / s, default edge; label medium; description muted; error in danger.
export const controlClass =
  "w-full rounded-s bg-control px-s py-xs font-ui text-m font-ui-regular text-fg edge placeholder:text-fg-subtle " +
  "data-[invalid]:edge-danger data-[disabled]:bg-disabled data-[disabled]:text-fg-disabled";

type Props = { label: string; description?: string; error?: string; disabled?: boolean } & Omit<ComponentProps<typeof Field.Control>, "className">;

export function TextField({ label, description, error, disabled, ...input }: Props) {
  return (
    <Field.Root invalid={Boolean(error)} disabled={disabled} className="flex w-full flex-col gap-xs">
      <Field.Label className="font-ui text-m font-ui-medium text-fg data-[disabled]:text-fg-disabled">{label}</Field.Label>
      <Field.Control className={controlClass} {...input} />
      {error ? (
        <p className="font-ui text-m font-ui-regular text-fg-danger">{error}</p>
      ) : description ? (
        <Field.Description className="font-ui text-m font-ui-regular text-fg-muted data-[disabled]:text-fg-disabled">{description}</Field.Description>
      ) : null}
    </Field.Root>
  );
}
