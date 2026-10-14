import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BeamMark } from "@/components/beam-mark";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { Catalogue } from "./catalogue";

export const metadata: Metadata = { title: "Icons", description: "Every Lucide icon at Beam's stroke width. Search and copy the import." };

export default function IconsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-[53px] items-center justify-between bg-canvas px-l divider-b">
        <Link href="/" className="flex items-center gap-s rounded-s text-fg">
          <BeamMark />
          <span className="font-brand text-m font-brand-medium">Beam</span>
          <span className="font-ui text-m font-ui-regular text-fg-muted">Design system</span>
        </Link>
        <div className="flex items-center gap-xxs">
          <ButtonLink variant="ghost" href="/docs/foundations/icons">
            <Icon icon={ArrowLeft} />
            Icon rules
          </ButtonLink>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-l px-xxl py-xxl">
        <div className="flex flex-col gap-xs">
          <h1 className="font-brand text-xl font-brand-medium text-fg">Icons</h1>
          <p className="font-ui text-m font-ui-regular text-fg-muted">Lucide, outlined, drawn at Beam&apos;s 2.5 stroke. Click an icon to copy its import.</p>
        </div>
        <Catalogue />
      </main>
    </div>
  );
}
