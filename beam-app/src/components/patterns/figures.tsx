import type { ReactNode } from "react";

const TONE = { success: "bg-success", warning: "bg-warning", danger: "bg-danger" } as const;

/** A coloured dot and a label. The colour is a token, passed as a CSS variable. */
export function DotLabel({ color, children, tone = "default" }: { color: string; children: ReactNode; tone?: "default" | "secondary" | "muted" }) {
  return (
    <span className={`flex min-w-0 items-center gap-xs font-ui text-m font-ui-regular ${tone === "secondary" ? "text-fg-secondary" : tone === "muted" ? "text-fg-muted" : "text-fg"}`}>
      <span className="size-(--space-xs) shrink-0 rounded-full" style={{ background: color }} />
      <span className="truncate">{children}</span>
    </span>
  );
}

/** A row of dot labels that names the parts of a SplitBar. */
export function Legend({ items }: { items: { color: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-s gap-y-xxs">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-xs font-ui text-s font-ui-regular text-fg-muted">
          <span className="size-(--space-xs) shrink-0 rounded-full" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

/** One row's share of a total: a short bar scaled to the largest share in the column, and the percentage. */
export function ShareBar({ share, max, color = "var(--text-subtle)" }: { share: number; max: number; color?: string }) {
  return (
    <span className="flex w-full items-center gap-s">
      <span className="flex h-(--space-xs) min-w-0 flex-1 overflow-hidden rounded-full bg-surface-muted">
        <span className="rounded-full" style={{ width: `${max ? Math.min((share / max) * 100, 100) : 0}%`, background: color }} />
      </span>
      <span className="w-12 shrink-0 text-right font-data text-m font-data-regular text-fg-muted">{share.toFixed(1)}%</span>
    </span>
  );
}

/** Where a value sits on a scale, against the range that counts as healthy. */
export function RangeGauge({ min, max, at, healthyFrom, healthyTo, tone, minLabel, maxLabel, label }: { min: number; max: number; at: number; healthyFrom: number; healthyTo: number; tone: keyof typeof TONE; minLabel: string; maxLabel: string; label: string }) {
  const pct = (v: number) => Math.min(Math.max(((v - min) / (max - min)) * 100, 0), 100);
  return (
    <div role="img" aria-label={label} className="flex w-full flex-col gap-xxs">
      <div className="relative h-(--space-s)">
        <div className="absolute inset-x-0 top-1/2 h-(--space-xs) -translate-y-1/2 overflow-hidden rounded-full bg-surface-muted">
          <div className="absolute inset-y-0 rounded-full bg-success-muted" style={{ left: `${pct(healthyFrom)}%`, width: `${pct(healthyTo) - pct(healthyFrom)}%` }} />
        </div>
        <div className={`absolute top-0 h-full w-(--space-xxs) -translate-x-1/2 rounded-full ${TONE[tone]}`} style={{ left: `${pct(at)}%` }} />
      </div>
      <div className="flex justify-between font-data text-xs font-data-regular text-fg-subtle">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

/** A small line of recent values. Decorative: the number it belongs to is stated beside it. */
export function Sparkline({ values, color = "var(--accent)", fill = "var(--accent-muted)" }: { values: number[]; color?: string; fill?: string }) {
  if (values.length < 2) return null;
  const w = 130;
  const h = 26;
  const lo = Math.min(...values);
  const range = Math.max(...values) - lo || 1;
  const points = values.map((v, i) => `${((i * w) / (values.length - 1)).toFixed(1)},${(h - 3 - ((v - lo) / range) * (h - 6)).toFixed(1)}`).join(" ");
  return (
    <svg aria-hidden viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-(--line-l) w-full">
      <polygon points={`0,${h} ${points} ${w},${h}`} fill={fill} />
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
