"use client";

import { useEffect, useState } from "react";

export type ToastMessage = { id: number; title: string; description?: string };

// Beam "Toast": popover fill, default edge, radius m, padding m; title medium, description muted.
// Rendered in a Beam scope so it is the product's toast, not the guide's chrome.
export function Toast({ message }: { message: ToastMessage | null }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!message) return;
    const show = setTimeout(() => setVisible(true), 0);
    const hide = setTimeout(() => setVisible(false), 2200);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [message]);
  const shown = message;
  return (
    <div data-beam="" role="status" aria-live="polite" className="pointer-events-none fixed right-l bottom-l z-20">
      <div
        className={`flex max-w-80 flex-col gap-xs rounded-m bg-popover p-m transition-[opacity,translate] motion-large edge ${visible ? "translate-y-0 opacity-100" : "translate-y-(--space-s) opacity-0"}`}
      >
        <span className="font-ui text-m font-ui-medium text-fg">{shown?.title}</span>
        {shown?.description ? <span className="font-data text-s font-data-regular break-all text-fg-muted">{shown.description}</span> : null}
      </div>
    </div>
  );
}
