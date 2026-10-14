"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavGroup } from "@/lib/docs";

// Beam "Navigation menu": list gap xxs, links radius s with padding xs / s,
// regular weight. The current page uses the navigation-active colours.
export function Sidebar({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Documentation" className="flex flex-col gap-l">
      {nav.map((group) => (
        <div key={group.slug} className="flex flex-col gap-xxs">
          <div className="px-s pb-xxs font-ui text-xs font-ui-medium tracking-xl text-fg-subtle uppercase">{group.title}</div>
          {group.pages.map((page) => {
            const href = `/docs/${group.slug}/${page.slug}`;
            const current = pathname === href;
            return (
              <Link
                key={page.slug}
                href={href}
                aria-current={current ? "page" : undefined}
                className={
                  "rounded-s px-s py-xs font-ui text-m font-ui-regular transition-colors motion-small " +
                  (current ? "bg-nav-active text-nav-active-fg" : "text-fg hover:bg-highlight")
                }
              >
                {page.title}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
