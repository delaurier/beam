import Link from "next/link";
import { BeamMark } from "@/components/beam-mark";
import { Sidebar } from "@/components/docs/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { NAV } from "@/lib/docs";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <div className="flex min-h-full flex-1 flex-col [--docs-bar:53px] [--docs-offset:76px]">
      <header className="sticky top-0 z-10 flex h-(--docs-bar) items-center justify-between bg-canvas px-l divider-b">
        <Link href="/" className="flex items-center gap-s rounded-s text-fg">
          <BeamMark />
          <span className="font-brand text-m font-brand-medium">Beam</span>
          <span className="font-ui text-m font-ui-regular text-fg-muted">Design system</span>
        </Link>
        <div className="flex items-center gap-xxs">
          <ButtonLink variant="ghost" href="/docs/getting-started/introduction">
            Docs
          </ButtonLink>
          <ButtonLink variant="ghost" href="/icons">
            Icons
          </ButtonLink>
          <ButtonLink variant="ghost" href="/llms.txt">
            llms.txt
          </ButtonLink>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="sticky top-(--docs-bar) hidden h-[calc(100dvh-var(--docs-bar))] w-62 shrink-0 overflow-y-auto p-m divider-r md:block">
          <Sidebar nav={NAV} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
