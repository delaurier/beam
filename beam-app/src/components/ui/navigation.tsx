import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "../icon";

// Beam "Navigation menu" as a sidebar: list gap xxs; group headings medium, links regular; radius s, padding xs / s.
// The current page uses the navigation-active pair.
export function NavList({ children, label }: { children: ReactNode; label: string }) {
  return (
    <nav aria-label={label} className="flex w-full flex-col gap-xxs">
      {children}
    </nav>
  );
}

export function NavGroup({ icon, label, open, onToggle, children }: { icon: LucideIcon; label: string; open?: boolean; onToggle?: () => void; children?: ReactNode }) {
  return (
    <>
      <button type="button" aria-expanded={Boolean(open)} onClick={onToggle} className="flex w-full items-center gap-xs rounded-s px-s py-xs text-left font-ui text-m font-ui-medium text-fg transition-colors motion-small hover:bg-highlight">
        <Icon icon={icon} />
        <span className="flex-1">{label}</span>
        <Icon icon={open ? ChevronDown : ChevronRight} className="text-fg-muted" />
      </button>
      {open ? children : null}
    </>
  );
}

export function NavLink({ href, icon, current, nested, onClick, children }: { href: string; icon?: LucideIcon; current?: boolean; nested?: boolean; onClick?: () => void; children: ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      className={`flex items-center gap-xs rounded-s py-xs pr-s font-ui text-m font-ui-regular transition-colors motion-small ${nested ? "pl-xxl" : "pl-s"} ${current ? "bg-nav-active text-nav-active-fg" : "text-fg hover:bg-highlight"}`}
    >
      {icon ? <Icon icon={icon} /> : null}
      {children}
    </Link>
  );
}
