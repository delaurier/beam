"use client";

import { AppWindow, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, type MouseEvent } from "react";
import { Icon } from "./icon";

const SIDES = [
  { label: "Design system", icon: BookOpen, home: "/docs/getting-started/introduction", key: "beam-last-docs" },
  { label: "App", icon: AppWindow, home: "/app", key: "beam-last-app" },
] as const;
const sideOf = (path: string) => (path === "/app" || path.startsWith("/app/") ? SIDES[1] : SIDES[0]);

/**
 * A floating switch between the design system and the app, in the same corner on every page.
 * Each side remembers the last page you were on, so switching back returns you there.
 * `raised` lifts it above the Agentation toolbar, which takes the corner during development.
 */
export function SiteSwitch({ raised = false }: { raised?: boolean }) {
  const path = usePathname();
  const router = useRouter();
  const current = sideOf(path);
  useEffect(() => {
    try {
      sessionStorage.setItem(current.key, path);
    } catch {}
  }, [current.key, path]);
  const go = (side: (typeof SIDES)[number]) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (side === current || e.metaKey || e.ctrlKey || e.shiftKey) return;
    let last: string | null = null;
    try {
      last = sessionStorage.getItem(side.key);
    } catch {}
    if (last) {
      e.preventDefault();
      router.push(last);
    }
  };
  return (
    <nav
      data-beam=""
      aria-label="Switch between the design system and the app"
      className={`fixed right-l z-10 flex gap-xxs rounded-full bg-popover p-xxs edge ${raised ? "bottom-[calc(var(--space-l)+var(--space-xxl)+var(--space-xl))]" : "bottom-l"}`}
    >
      {SIDES.map((side) => (
        <Link
          key={side.label}
          href={side.home}
          onClick={go(side)}
          aria-current={side === current ? "page" : undefined}
          aria-label={side.label}
          className="flex items-center rounded-full p-xs text-fg-muted transition-colors motion-small hover:bg-hover hover:text-fg aria-[current=page]:bg-highlight aria-[current=page]:text-fg"
        >
          <Icon icon={side.icon} />
        </Link>
      ))}
    </nav>
  );
}
