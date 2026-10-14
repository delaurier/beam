"use client";

import { useState } from "react";
import { PageHeader } from "@/components/patterns/app-shell";
import { Num, Status, TableCard, TableHead, TableRow, Txt, tableMinWidth, type Column } from "@/components/patterns/data-table";
import { RangeGauge } from "@/components/patterns/figures";
import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";
import { ViewSwitch } from "@/components/ui/toggle-group";
import { RATIOS, STATUS_TONE } from "@/lib/farm";
import { NotDesigned } from "./not-designed";

const VIEWS = ["Summary", "Basic", "Advanced", "Financial health"];
const COLUMNS: Column[] = [
  { key: "ratio", label: "Ratio", minWidth: 240 },
  { key: "now", label: "Now", width: 120, align: "right" },
  { key: "gauge", label: "Against the healthy range", width: 280 },
  { key: "healthy", label: "Healthy", width: 120 },
  { key: "gap", label: "Gap", width: 96, align: "right" },
  { key: "status", label: "Status", width: 88 },
];
const FILL = { danger: "var(--danger)", warning: "var(--warning)", success: "var(--success)" };

export function BalanceSheet() {
  const [view, setView] = useState("Financial health");
  const count = (status: string) => RATIOS.filter((r) => r.status === status);
  return (
    <>
      <PageHeader title="Balance sheet" />
      <ViewSwitch aria-label="Balance sheet views" options={VIEWS} value={view} onValueChange={setView} />
      {view !== "Financial health" ? (
        <NotDesigned title={`The ${view} view`} embedded />
      ) : (
        <>
          <MetricStrip>
            {(["Weak", "Fair", "Strong"] as const).map((status) => {
              const in_ = count(status);
              return (
                <Metric key={status} label={status} value={String(in_.length)} unit={`of ${RATIOS.length}`} note={in_.map((r) => r.name).join(", ")} wide={status === "Weak"}>
                  <SplitBar gap={false} parts={[{ share: in_.length, color: FILL[STATUS_TONE[status]] }, { share: RATIOS.length - in_.length, color: "var(--bg-surface-muted)" }]} />
                </Metric>
              );
            })}
          </MetricStrip>
          <TableCard title="Ratios" minWidth={tableMinWidth(COLUMNS)}>
            <TableHead columns={COLUMNS} />
            {RATIOS.map((r) => (
              <TableRow
                key={r.name}
                columns={COLUMNS}
                focusable={false}
                cells={{
                  ratio: (
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate font-ui text-m font-ui-medium text-fg">{r.name}</span>
                      <span className="truncate font-ui text-m font-ui-regular text-fg-muted">{r.formula}</span>
                    </span>
                  ),
                  now: <span className="font-brand text-l font-brand-medium whitespace-nowrap text-fg">{r.value}</span>,
                  gauge: <RangeGauge min={r.min} max={r.max} at={r.at} healthyFrom={r.healthyFrom} healthyTo={r.healthyTo} tone={STATUS_TONE[r.status]} minLabel={r.minLabel} maxLabel={r.maxLabel} label={`${r.name} is ${r.value}; healthy is ${r.healthy}`} />,
                  healthy: <Txt tone="secondary">{r.healthy}</Txt>,
                  gap: <Num tone={r.gap === "Met" ? "muted" : "default"}>{r.gap}</Num>,
                  status: <Status tone={STATUS_TONE[r.status]}>{r.status}</Status>,
                }}
              />
            ))}
          </TableCard>
        </>
      )}
    </>
  );
}
