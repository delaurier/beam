"use client";

import { Check, Copy, X } from "lucide-react";
import { highlight } from "@/lib/highlight";
import { Icon } from "../icon";
import { Button, ButtonIcon } from "../ui/button";
import { useCopy } from "./use-copy";

export function CodeBlock({ code, lang, file, attached = false }: { code: string; lang?: string; file?: string; attached?: boolean }) {
  const { state, copy } = useCopy();
  return (
    <div className={attached ? "bg-surface" : "overflow-hidden rounded-m bg-surface edge-solid-over"}>
      {file ? <div className="px-l py-s font-data text-xs font-data-regular text-fg-muted divider-b">{file}</div> : null}
      <div className="relative">
        <div className="absolute top-xs right-xs">
          <Button variant="ghost" iconOnly aria-label={state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : `Copy ${lang ?? "code"}`} onClick={() => copy(() => code)}>
            <ButtonIcon>
              <Icon icon={state === "copied" ? Check : state === "failed" ? X : Copy} />
            </ButtonIcon>
          </Button>
        </div>
        <pre className="overflow-x-auto p-l pr-xxl font-data text-s font-data-regular text-fg-secondary">
          <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
        </pre>
      </div>
    </div>
  );
}
