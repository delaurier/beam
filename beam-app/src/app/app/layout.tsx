import type { ReactNode } from "react";
import { FarmProvider } from "@/components/app/store";
import { BeamScope } from "@/components/beam-scope";
import { AppShell } from "@/components/patterns/app-shell";

// Every product screen: Beam's own tokens (not the guide's), the farm's data, and the shell.
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <BeamScope className="flex min-h-dvh flex-1 flex-col">
      <FarmProvider>
        <AppShell>{children}</AppShell>
      </FarmProvider>
    </BeamScope>
  );
}
