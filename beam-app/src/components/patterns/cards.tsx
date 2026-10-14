import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "../icon";

const TONE = { success: "bg-success", warning: "bg-warning", danger: "bg-danger" } as const;

/** A titled card of short rows. With `href` the title bar is a link to the area it summarises. */
export function SummaryCard({ title, count, href, children }: { title: string; count?: string; href?: string; children: ReactNode }) {
  const heading = (
    <>
      <span className="flex items-baseline gap-xs">
        <span className="font-ui text-m font-ui-medium text-fg">{title}</span>
        {count ? <span className="font-ui text-m font-ui-regular text-fg-subtle">{count}</span> : null}
      </span>
      {href ? <Icon icon={ChevronRight} className="text-fg-muted" /> : null}
    </>
  );
  return (
    <section className="flex w-full min-w-0 flex-col overflow-hidden rounded-m bg-canvas edge-solid-over [&>*:last-child]:shadow-none">
      <h2 className="flex divider-b">
        {href ? (
          <Link href={href} className="flex flex-1 items-center justify-between px-l py-m transition-colors motion-small hover:bg-hover">
            {heading}
          </Link>
        ) : (
          <span className="flex flex-1 items-center justify-between px-l py-m">{heading}</span>
        )}
      </h2>
      {children}
    </section>
  );
}

/** A label on the left and its value on the right. */
export function FactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-l px-l py-s divider-b">
      <span className="font-ui text-m font-ui-regular text-fg-muted">{label}</span>
      <span className="flex items-center gap-s font-data text-m font-data-regular text-fg">{children}</span>
    </div>
  );
}

/** One thing that needs a decision, linking to where it is fixed. */
export function AttentionRow({ tone, title, detail, where, href }: { tone: keyof typeof TONE; title: string; detail: string; where: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-l px-l py-m transition-colors motion-small divider-b hover:bg-hover">
      <span className={`size-(--space-xs) shrink-0 rounded-full ${TONE[tone]}`} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-ui text-m font-ui-medium text-fg">{title}</span>
        <span className="font-ui text-m font-ui-regular text-fg-muted">{detail}</span>
      </span>
      <span className="hidden w-36 shrink-0 font-ui text-m font-ui-regular text-fg-secondary sm:block">{where}</span>
      <Icon icon={ChevronRight} className="text-fg-muted" />
    </Link>
  );
}
