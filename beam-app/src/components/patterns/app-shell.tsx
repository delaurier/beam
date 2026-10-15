"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import { BookOpen, DollarSign, FileText, LayoutDashboard, MapPin, Menu as MenuIcon, PanelLeft, Plus, Search, SlidersHorizontal, Sprout, Wrench, X, type LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PAGES, type Page } from "@/lib/farm";
import { useFarm, type AddKind } from "../app/store";
import { BeamMark } from "../beam-mark";
import { ThemeToggle } from "../theme-toggle";
import { Icon } from "../icon";
import { Avatar } from "../ui/avatar";
import { Button, ButtonIcon } from "../ui/button";
import { Menu } from "../ui/menu";
import { NavGroup, NavLink, NavList } from "../ui/navigation";
import { optionClass, popupClass } from "../ui/select";
import { useScope } from "../ui/use-scope";

const GROUP_ICON: Record<string, LucideIcon> = { Crops: Sprout, Land: MapPin, Machinery: Wrench, Finance: DollarSign };
const PAGE_ICON: Record<string, LucideIcon> = { Overview: LayoutDashboard, Reports: FileText, Settings: SlidersHorizontal };
const GROUPS = Object.keys(GROUP_ICON);
const ADD: { label: string; kind: AddKind; href: string }[] = [
  { label: "Sale", kind: "sale", href: "/app/crops/corn/marketing" },
  { label: "Expense", kind: "expense", href: "/app/crops/corn/budget" },
  { label: "Field", kind: "field", href: "/app/land/fields" },
  { label: "Equipment", kind: "equipment", href: "/app/machinery/fleet" },
];

/** The page a path belongs to. Corn's three views share one sidebar entry. */
function currentPage(path: string): Page | undefined {
  if (path.startsWith("/app/crops/corn")) return PAGES.find((p) => p.label === "Corn");
  return PAGES.find((p) => p.href === path);
}
const searchLabel = (p: Page) => (p.group ? `${p.group} › ${p.label}` : p.label);

function QuickSearch({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const scope = useScope();
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        input.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <Combobox.Root
      items={PAGES.map(searchLabel)}
      value={null}
      onValueChange={(label) => {
        const page = PAGES.find((p) => searchLabel(p) === label);
        if (!page) return;
        router.push(page.href);
        input.current?.blur();
        onNavigate?.();
      }}
    >
      <label className="flex items-center gap-xs rounded-s bg-control px-s py-xs text-fg-muted edge focus-within:outline-2 focus-within:outline-(--focus-ring)">
        <Icon icon={Search} />
        <Combobox.Input ref={input} aria-label="Quick search" placeholder="Quick search" className="min-w-0 flex-1 bg-transparent font-ui text-m font-ui-regular text-fg outline-none placeholder:text-fg-subtle" />
        <kbd className="font-data text-xs font-data-regular text-fg-muted">⌘K</kbd>
      </label>
      <Combobox.Portal>
        <Combobox.Positioner {...scope} sideOffset={6} className="z-50 w-(--anchor-width)">
          <Combobox.Popup className={`${popupClass} rounded-s`}>
            <Combobox.Empty className="px-xs py-xxs font-ui text-m font-ui-regular text-fg-muted empty:hidden">No page matches.</Combobox.Empty>
            <Combobox.List className="flex max-h-64 flex-col gap-xxs overflow-y-auto overscroll-contain">
              {(label: string) => (
                <Combobox.Item key={label} value={label} className={optionClass}>
                  {label}
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

function Sidebar({ onNavigate, onCollapse }: { onNavigate?: () => void; onCollapse?: () => void }) {
  const page = currentPage(usePathname());
  // One group is open at a time: the current page's, until another is chosen.
  const [chosen, setChosen] = useState<{ for: string | undefined; group: string | null } | null>(null);
  const open = chosen && chosen.for === page?.href ? chosen.group : (page?.group ?? null);
  const top = (label: string) => {
    const p = PAGES.find((x) => x.label === label)!;
    return (
      <NavLink href={p.href} icon={PAGE_ICON[label]} current={page?.href === p.href} onClick={onNavigate}>
        {label}
      </NavLink>
    );
  };
  return (
    <div className="flex h-full w-full flex-col gap-m p-m">
      <div className="flex items-center gap-s px-s py-xs">
        <BeamMark />
        <span className="flex-1 font-ui text-m font-ui-medium text-fg">Sample Farm</span>
      </div>
      <QuickSearch onNavigate={onNavigate} />
      <NavList label="Main">
        {top("Overview")}
        {GROUPS.map((g) => (
          <NavGroup key={g} icon={GROUP_ICON[g]} label={g} open={open === g} onToggle={() => setChosen({ for: page?.href, group: open === g ? null : g })}>
            {PAGES.filter((p) => p.group === g).map((p) => (
              <NavLink key={p.href} href={p.href} nested current={page?.href === p.href} onClick={onNavigate}>
                {p.label}
              </NavLink>
            ))}
          </NavGroup>
        ))}
        {top("Reports")}
      </NavList>
      <div className="flex-1" />
      <div className="flex flex-col gap-xxs pt-s divider-t">
        {top("Settings")}
        <NavLink href="/docs/getting-started/introduction" icon={BookOpen} onClick={onNavigate}>
          Design system
        </NavLink>
        {onCollapse ? (
          <button type="button" onClick={onCollapse} className="flex items-center gap-xs rounded-s px-s py-xs text-left font-ui text-m font-ui-regular text-fg transition-colors motion-small hover:bg-highlight">
            <Icon icon={PanelLeft} />
            Collapse
          </button>
        ) : null}
      </div>
    </div>
  );
}

// The frame every Beam screen sits in: a labelled sidebar with one group open, and a thin top bar.
// Below the lg breakpoint the sidebar becomes a drawer opened from the top bar.
export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const scope = useScope();
  const { setPendingAdd } = useFarm();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  return (
    <div className="flex min-h-0 w-full flex-1 bg-canvas text-fg">
      {collapsed ? null : (
        <aside className="sticky top-0 hidden h-dvh w-62 shrink-0 overflow-y-auto divider-r lg:block">
          <Sidebar onCollapse={() => setCollapsed(true)} />
        </aside>
      )}
      <Dialog.Root open={drawer} onOpenChange={setDrawer}>
        <Dialog.Portal>
          <Dialog.Backdrop {...scope} className="fixed inset-0 z-30 bg-backdrop transition-opacity motion-large data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 lg:hidden" />
          <Dialog.Popup {...scope} className="fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-canvas outline-none transition-transform motion-large divider-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full lg:hidden">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Dialog.Close aria-label="Close navigation" className="absolute top-m right-m flex rounded-s p-xs text-fg-muted transition-colors motion-small hover:bg-hover">
              <Icon icon={X} />
            </Dialog.Close>
            <Sidebar onNavigate={() => setDrawer(false)} />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-xs px-l py-s divider-b lg:px-xxl">
          <Button variant="ghost" iconOnly aria-label="Open navigation" className="lg:hidden" onClick={() => setDrawer(true)}>
            <ButtonIcon>
              <Icon icon={MenuIcon} />
            </ButtonIcon>
          </Button>
          {collapsed ? (
            <Button variant="ghost" iconOnly aria-label="Show sidebar" className="hidden lg:inline-flex" onClick={() => setCollapsed(false)}>
              <ButtonIcon>
                <Icon icon={PanelLeft} />
              </ButtonIcon>
            </Button>
          ) : null}
          <div className="flex-1" />
          <span className="px-s font-ui text-m font-ui-regular text-fg-muted">2026 season</span>
          <Menu
            variant="ghost"
            chevron={false}
            align="end"
            trigger={
              <>
                <Icon icon={Plus} />
                Add
              </>
            }
            items={ADD.map((a) => ({
              label: a.label,
              onSelect: () => {
                setPendingAdd(a.kind);
                router.push(a.href);
              },
            }))}
          />
          <ThemeToggle />
          <Avatar name="Paul Delaurier" />
        </header>
        <main className="flex min-w-0 flex-1 flex-col gap-l px-l py-xl lg:px-xxl">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, facts, actions }: { title: string; facts?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-l">
      <div className="flex flex-col gap-xxs">
        <h1 className="font-brand text-xl font-brand-medium text-fg">{title}</h1>
        {facts ? <p className="font-ui text-m font-ui-regular text-fg-muted">{facts}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-xs">{actions}</div> : null}
    </div>
  );
}
