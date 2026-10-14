"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ViewSwitch } from "@/components/ui/toggle-group";

const VIEWS = { Budget: "/app/crops/corn/budget", Marketing: "/app/crops/corn/marketing", Inputs: "/app/crops/corn/inputs" } as const;

/** The switch between Corn's views, with room on the right for a view's own control. */
export function CornViews({ current, children }: { current: keyof typeof VIEWS; children?: ReactNode }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-between gap-s">
      <ViewSwitch aria-label="Corn views" options={Object.keys(VIEWS)} value={current} onValueChange={(v) => router.push(VIEWS[v as keyof typeof VIEWS])} />
      {children}
    </div>
  );
}
