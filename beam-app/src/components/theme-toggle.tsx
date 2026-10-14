"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Button, ButtonIcon } from "./ui/button";
import { Icon } from "./icon";

const EVENT = "beam-theme-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
const read = () => document.documentElement.dataset.theme ?? "dark";

/** Current mode; re-renders when it changes. */
export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => "dark");
}

export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <Button
      variant="ghost"
      iconOnly
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("beam-theme", next);
        } catch {}
        window.dispatchEvent(new Event(EVENT));
      }}
    >
      <ButtonIcon>
        <Icon icon={theme === "dark" ? Moon : Sun} />
      </ButtonIcon>
    </Button>
  );
}
