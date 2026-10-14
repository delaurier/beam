import { ChevronDown } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Icon } from "../icon";

export type Column = { key: string; label: string; width?: number; minWidth?: number; align?: "left" | "right" };

const lane = (c: Column) => ({ className: `flex items-center ${c.align === "right" ? "justify-end" : "justify-start"} ${c.width ? "shrink-0" : "min-w-0 flex-1"}`, style: c.width ? { width: c.width } : { minWidth: c.minWidth } });

// A table inside a card: title bar with tools, a header row, rows separated by rules.
// Rows read as data. Pass `editing` to turn one row into inputs.
/** The narrowest a table can be before it scrolls: every lane at its width or minimum, plus the gaps and side padding (all space-l). */
export const tableMinWidth = (columns: Column[]) => `calc(${columns.reduce((w, c) => w + (c.width ?? c.minWidth ?? 0), 0)}px + ${columns.length + 1} * var(--space-l))`;

export function TableCard({ title, count, tools, minWidth, hideHeader, children }: { title: string; count?: string; tools?: ReactNode; minWidth?: string; /** Drop the title bar when the page title already names the table. The title still names it for assistive technology. */ hideHeader?: boolean; children: ReactNode }) {
  return (
    <section className="w-full min-w-0 overflow-hidden rounded-m bg-canvas edge-solid-over">
      {hideHeader ? null : (
        <header className="flex flex-wrap items-center justify-between gap-xs py-xs pr-xs pl-l divider-b">
          <h2 className="flex items-baseline gap-xs py-xs">
            <span className="font-ui text-m font-ui-medium text-fg">{title}</span>
            {count ? <span className="font-ui text-m font-ui-regular text-fg-subtle">{count}</span> : null}
          </h2>
          <div className="flex flex-wrap items-center gap-xxs">{tools}</div>
        </header>
      )}
      {/* Lanes keep their widths; a narrow container scrolls sideways instead of squeezing them. */}
      <div className="overflow-x-auto">
        <div role="table" aria-label={title} style={{ minWidth }} className="[&>*:last-child]:shadow-none">
          {children}
        </div>
      </div>
    </section>
  );
}

export function TableHead({ columns }: { columns: Column[] }) {
  return (
    <div role="row" className="flex items-center gap-l px-l py-s divider-b">
      {columns.map((c) => (
        <div key={c.key} role="columnheader" {...lane(c)}>
          <span className="font-ui text-s font-ui-medium whitespace-nowrap text-fg-muted">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

export function TableRow({ columns, cells, editing = false, focusable = true }: { columns: Column[]; cells: Record<string, ReactNode>; editing?: boolean; focusable?: boolean }) {
  return (
    <div role="row" tabIndex={editing || !focusable ? undefined : 0} className={`flex items-center gap-l px-l divider-b transition-colors motion-small ${editing ? "py-xxs" : "py-s hover:bg-hover"}`}>
      {columns.map((c) => (
        <div key={c.key} role="cell" {...lane(c)}>
          {cells[c.key]}
        </div>
      ))}
    </div>
  );
}

export const Num = ({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "muted" | "success" | "danger" | "warning" | "strong" }) => (
  <span className={`font-data text-m whitespace-nowrap ${tone === "strong" ? "font-data-medium text-fg" : "font-data-regular"} ${tone === "muted" ? "text-fg-muted" : tone === "success" ? "text-fg-success" : tone === "danger" ? "text-fg-danger" : tone === "warning" ? "text-fg-warning" : "text-fg"}`}>{children}</span>
);
export const Txt = ({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "secondary" }) => (
  <span className={`truncate font-ui text-m font-ui-regular ${tone === "secondary" ? "text-fg-secondary" : "text-fg"}`}>{children}</span>
);
export const Status = ({ tone, children }: { tone: "success" | "warning" | "danger"; children: ReactNode }) => (
  <span className="flex items-center gap-xs font-ui text-m font-ui-regular text-fg">
    <span className={`size-(--space-xs) shrink-0 rounded-full ${tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger"}`} />
    {children}
  </span>
);
const cellControl = "w-full min-w-0 rounded-s bg-control px-s py-xs text-m text-fg edge";

/** An input sized for a table cell. Pass value and onChange to control it. */
export function CellInput({ label, align = "right", mono = true, ...input }: { label: string; align?: "left" | "right"; mono?: boolean } & Omit<ComponentProps<"input">, "className" | "aria-label">) {
  return <input aria-label={label} className={`${cellControl} ${mono ? "font-data font-data-regular" : "font-ui font-ui-regular"} ${align === "right" ? "text-right" : "text-left"}`} {...input} />;
}

/** A native select sized for a table cell. */
export function CellSelect({ label, options, ...select }: { label: string; options: string[] } & Omit<ComponentProps<"select">, "className" | "aria-label">) {
  return (
    <span className="relative flex w-full min-w-0 items-center">
      <select aria-label={label} className={`${cellControl} appearance-none pr-xl font-ui font-ui-regular`} {...select}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Icon icon={ChevronDown} className="pointer-events-none absolute right-xs text-fg-muted" />
    </span>
  );
}
