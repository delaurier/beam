"use client";
import { Dialog as Base } from "@base-ui/react/dialog";
import type { FormEvent, ReactElement, ReactNode } from "react";
import { buttonClass } from "./button";
import { useScope } from "./use-scope";

// Beam "Dialog": popover fill, default edge, radius m, padding l, gap s; backdrop at 20%. Uses the large motion role and stays centred.
export function Dialog({ trigger, title, description, confirmLabel, confirmVariant = "primary", children }: { trigger: ReactElement; title: string; description?: string; confirmLabel: string; confirmVariant?: "primary" | "danger"; children?: ReactNode }) {
  const scope = useScope();
  return (
    <Base.Root>
      <Base.Trigger render={trigger} />
      <Base.Portal>
        <Base.Backdrop {...scope} className="fixed inset-0 z-30 bg-backdrop transition-opacity motion-large data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Base.Popup
          {...scope}
          className="fixed top-1/2 left-1/2 z-40 flex w-[min(420px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-s rounded-m bg-popover p-l outline-none transition-[opacity,scale] motion-large edge data-[starting-style]:scale-(--motion-popup-scale) data-[starting-style]:opacity-0 data-[ending-style]:scale-(--motion-popup-scale) data-[ending-style]:opacity-0"
        >
          <Base.Title className="font-ui text-m font-ui-medium text-fg">{title}</Base.Title>
          {description ? <Base.Description className="font-ui text-m font-ui-regular text-fg-muted">{description}</Base.Description> : null}
          {children}
          <div className="flex justify-end gap-xs pt-s">
            <Base.Close className={buttonClass({ variant: "ghost" })}>Cancel</Base.Close>
            <Base.Close className={buttonClass({ variant: confirmVariant })}>{confirmLabel}</Base.Close>
          </div>
        </Base.Popup>
      </Base.Portal>
    </Base.Root>
  );
}

const popup =
  "fixed top-1/2 left-1/2 z-40 flex max-h-[calc(100dvh-2rem)] w-[min(480px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-s overflow-y-auto rounded-m bg-popover p-l outline-none transition-[opacity,scale] motion-large edge data-[starting-style]:scale-(--motion-popup-scale) data-[starting-style]:opacity-0 data-[ending-style]:scale-(--motion-popup-scale) data-[ending-style]:opacity-0";
const backdrop = "fixed inset-0 z-30 bg-backdrop transition-opacity motion-large data-[starting-style]:opacity-0 data-[ending-style]:opacity-0";

/** A dialog that holds a form. It is opened by its owner and closes only when onSubmit returns no error. */
export function FormDialog({ open, onOpenChange, title, description, submitLabel, submitVariant = "primary", onSubmit, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; submitLabel: string; submitVariant?: "primary" | "danger"; onSubmit: (data: FormData) => void; children?: ReactNode }) {
  const scope = useScope();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(new FormData(e.currentTarget));
  };
  return (
    <Base.Root open={open} onOpenChange={onOpenChange}>
      <Base.Portal>
        <Base.Backdrop {...scope} className={backdrop} />
        <Base.Popup {...scope} className={popup}>
          <Base.Title className="font-ui text-m font-ui-medium text-fg">{title}</Base.Title>
          {description ? <Base.Description className="font-ui text-m font-ui-regular text-fg-muted">{description}</Base.Description> : null}
          <form onSubmit={submit} noValidate className="flex flex-col gap-m pt-xs">
            {children}
            <div className="flex justify-end gap-xs pt-s">
              <Base.Close className={buttonClass({ variant: "ghost" })}>Cancel</Base.Close>
              <button type="submit" className={buttonClass({ variant: submitVariant })}>
                {submitLabel}
              </button>
            </div>
          </form>
        </Base.Popup>
      </Base.Portal>
    </Base.Root>
  );
}
