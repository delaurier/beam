"use client";

import { useCallback, useState } from "react";

export type CopyState = "idle" | "copied" | "failed";

/** Copies text and reports the outcome, so a blocked clipboard is visible to the user. */
export function useCopy() {
  const [state, setState] = useState<CopyState>("idle");
  const copy = useCallback(async (getText: () => string | Promise<string>) => {
    try {
      await navigator.clipboard.writeText(await getText());
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1600);
  }, []);
  return { state, copy };
}
