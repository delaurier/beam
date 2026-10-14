"use client";

import { PageHeader } from "@/components/patterns/app-shell";
import { AttentionRow, FactRow, SummaryCard } from "@/components/patterns/cards";
import { Status } from "@/components/patterns/data-table";
import { DotLabel, ShareBar } from "@/components/patterns/figures";
import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";
import { RATIOS, STATUS_TONE, budget, day, finalPrice, fleet, land, marketing, money, short, signed, whole } from "@/lib/farm";
import { useFarm } from "../store";

const list = (names: string[]) => (names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : (names[0] ?? ""));

export function Overview() {
  const { farm } = useFarm();
  const m = marketing(farm.sales);
  const l = land(farm.fields);
  const f = fleet(farm.units);
  const b = budget(farm);
  const weak = RATIOS.filter((r) => r.status === "Weak");
  const open = farm.sales.filter((s) => s.status === "Open");
  const noYear = f.groups[0].rows.filter((u) => !u.year);
  const working = RATIOS.find((r) => r.name === "Working capital")!;
  const largestCrop = Math.max(...l.byCrop.map((c) => c.acres), 0);

  const attention = [
    weak.length ? { tone: "danger" as const, title: `${weak.length} of ${RATIOS.length} financial ratios ${weak.length === 1 ? "is" : "are"} weak`, detail: list(weak.map((r) => r.name)), where: "Balance sheet", href: "/app/finance/balance-sheet" } : null,
    ...l.missing.map((x) => ({ tone: "warning" as const, title: `${x.name} has no land cost`, detail: `${whole(x.acres)} acres of ${x.crop.toLowerCase()}, ${x.landType.toLowerCase()}`, where: "Fields", href: "/app/land/fields" })),
    open.length ? { tone: "warning" as const, title: `${open.length} corn ${open.length === 1 ? "sale is" : "sales are"} still open`, detail: open.length === 1 ? `${whole(open[0].bushels)} bu from ${day(open[0].date)} at ${money(finalPrice(open[0]), 2)}` : `${whole(m.open)} bu on firm offer`, where: "Corn marketing", href: "/app/crops/corn/marketing" } : null,
    noYear.length ? { tone: "warning" as const, title: `${noYear.length} power ${noYear.length === 1 ? "unit has" : "units have"} no model year`, detail: "Depreciation uses the useful life entered for each", where: "Fleet", href: "/app/machinery/fleet" } : null,
  ].filter((a) => a !== null);

  return (
    <>
      <PageHeader title="Overview" />
      <MetricStrip>
        <Metric label="Acres farmed" value={whole(l.acres)} />
        <Metric label="Corn sold" value={`${m.percent.toFixed(1)}%`} note={`${short(m.sold)} of ${short(m.production)} bu`} wide>
          <SplitBar gap={false} parts={[{ share: m.filled, color: "var(--accent)" }, { share: m.open, color: "var(--accent-muted)" }, { share: m.unsold, color: "var(--bg-surface-muted)" }]} />
        </Metric>
        <Metric label="Corn margin" value={signed(m.margin).replace(/^([+−]?)/, "$1$")} unit="/bu" tone={m.margin > 0 ? "success" : m.margin < 0 ? "danger" : "default"} />
        <Metric label="Fleet value" value={money(f.value)} />
        <Metric label="Working capital" value={working.value} tone={STATUS_TONE[working.status]} />
      </MetricStrip>
      <div className="grid items-start gap-l xl:grid-cols-[1.35fr_1fr]">
        <SummaryCard title="Needs attention" count={String(attention.length)}>
          {attention.length ? attention.map((a) => <AttentionRow key={a.title} {...a} />) : <p className="px-l py-m font-ui text-m font-ui-regular text-fg-muted">Nothing needs a decision right now.</p>}
        </SummaryCard>
        <SummaryCard title="Crops" href="/app/crops/corn/marketing">
          {l.byCrop.map((c) => (
            <div key={c.crop} className="flex items-center gap-l px-l py-s divider-b">
              <span className="min-w-0 flex-1">
                <DotLabel color={c.color}>{c.crop}</DotLabel>
              </span>
              <span className="font-data text-m font-data-regular whitespace-nowrap text-fg">{whole(c.acres)} ac</span>
              <span className="w-36 shrink-0">
                <ShareBar share={l.acres ? (c.acres / l.acres) * 100 : 0} max={l.acres ? (largestCrop / l.acres) * 100 : 0} color={c.color} />
              </span>
            </div>
          ))}
          <FactRow label="Corn cost to grow">{money(b.perAcre, 2)} /ac</FactRow>
          <FactRow label="Corn average price">{money(m.average, 2)} /bu</FactRow>
        </SummaryCard>
      </div>
      <div className="grid items-start gap-l md:grid-cols-3">
        <SummaryCard title="Land" href="/app/land/fields">
          <FactRow label="Fields">{farm.fields.length}</FactRow>
          <FactRow label="Average land cost">{money(l.averageCost, 2)} /ac</FactRow>
          <FactRow label="Fields with a land cost">
            {farm.fields.length - l.missing.length} of {farm.fields.length}
          </FactRow>
        </SummaryCard>
        <SummaryCard title="Machinery" href="/app/machinery/fleet">
          <FactRow label="Pieces">{f.pieces}</FactRow>
          <FactRow label="Power units">{money(f.groups[0].value)}</FactRow>
          <FactRow label="Annual depreciation">{money(f.annual)}</FactRow>
        </SummaryCard>
        <SummaryCard title="Finance" href="/app/finance/balance-sheet">
          {["Current ratio", "Debt-to-asset", "Debt-to-equity"].map((name) => {
            const r = RATIOS.find((x) => x.name === name)!;
            return (
              <FactRow key={name} label={name}>
                {r.value}
                <Status tone={STATUS_TONE[r.status]}>{r.status}</Status>
              </FactRow>
            );
          })}
        </SummaryCard>
      </div>
    </>
  );
}
