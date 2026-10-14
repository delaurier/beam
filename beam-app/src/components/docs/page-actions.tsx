"use client";

import { Check, Copy, FileText, X } from "lucide-react";
import { Button, ButtonLink } from "../ui/button";
import { Icon } from "../icon";
import { useCopy } from "./use-copy";

export function PageActions({ mdHref }: { mdHref: string }) {
  const { state, copy } = useCopy();
  return (
    <div className="flex items-center gap-xs">
      <Button
        variant="outline"
        onClick={() => copy(() => fetch(mdHref).then((r) => r.text()))}
      >
        <Icon icon={state === "copied" ? Check : state === "failed" ? X : Copy} />
        <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy page"}</span>
      </Button>
      <ButtonLink variant="ghost" href={mdHref} target="_blank">
        <Icon icon={FileText} />
        View as Markdown
      </ButtonLink>
    </div>
  );
}
