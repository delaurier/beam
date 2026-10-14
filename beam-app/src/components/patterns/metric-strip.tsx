import type { ReactNode } from "react";

// One bordered panel divided into cells. Each cell is a label and a value, with a bar or sparkline where it helps.
// Each cell draws a rule on its right and bottom; the outer edge is drawn over them, so cells can wrap onto rows
// and the corners stay round.
export function MetricStrip({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-wrap overflow-hidden rounded-m bg-canvas edge-solid-over">{children}</div>;
}

export function Metric({ label, value, unit, note, tone = "default", wide, children }: { label: string; value?: string; unit?: string; note?: string; tone?: "default" | "success" | "warning" | "danger"; wide?: boolean; children?: ReactNode }) {
  const color = tone === "success" ? "text-fg-success" : tone === "warning" ? "text-fg-warning" : tone === "danger" ? "text-fg-danger" : "text-fg";
  return (
    <div className={`flex min-w-0 flex-col gap-xs p-l divider-rb ${wide ? "flex-2 basis-64" : "flex-1 basis-36"}`}>
      <span className="font-ui text-m font-ui-regular text-fg-muted">{label}</span>
      {value ? (
        <span className="flex items-baseline gap-xxs">
          <span className={`font-brand text-l font-brand-medium ${color}`}>{value}</span>
          {unit ? <span className="font-ui text-m font-ui-regular text-fg-muted">{unit}</span> : null}
        </span>
      ) : null}
      {note ? <span className="font-ui text-s font-ui-regular text-fg-subtle">{note}</span> : null}
      {children}
    </div>
  );
}

/** A thin bar split into parts. Give each part a share and a token colour. */
export function SplitBar({ parts, gap = true }: { parts: { share: number; color: string }[]; gap?: boolean }) {
  return (
    <div className={`flex h-(--space-xs) w-full overflow-hidden rounded-full ${gap ? "gap-xxs" : ""}`}>
      {parts.map((p, i) => (
        <div key={i} className="rounded-full" style={{ flex: p.share, background: p.color }} />
      ))}
    </div>
  );
}
