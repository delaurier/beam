"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/patterns/app-shell";
import { Num, Txt } from "@/components/patterns/data-table";
import { EditableTable, type Draft, type EditColumn } from "@/components/patterns/editable-table";
import { Legend, ShareBar } from "@/components/patterns/figures";
import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { OWNERSHIP, UNIT_GROUPS, fleet, money, parseNumber, short, type Unit } from "@/lib/farm";
import { newId, useFarm } from "../store";

const options = (values: string[]) => values.map((v) => ({ value: v, label: v }));

function readUnit(d: Draft, base: Pick<Unit, "id" | "group" | "pieces">): Unit | string {
  const name = (d.name ?? "").trim();
  if (!name) return "Give the equipment a name.";
  const year = (d.year ?? "").trim();
  if (year && !/^(19|20)\d{2}$/.test(year)) return "Year must be four digits, such as 2022, or empty.";
  const value = parseNumber(d.value ?? "");
  if (value === null || value < 0) return "Value must be a number, such as 190,000.";
  const life = parseNumber(d.life ?? "");
  if (life === null || life <= 0) return "Useful life must be a number of years above zero.";
  return { id: base.id, group: d.group || base.group, name, year, ownership: d.ownership || OWNERSHIP[0], value, life, pieces: base.pieces };
}

export function MachineryFleet() {
  const { farm, update, notify, pendingAdd, setPendingAdd } = useFarm();
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const f = fleet(farm.units);
  const share = (value: number) => (f.value ? (value / f.value) * 100 : 0);
  const maxShare = Math.max(...f.groups.map((g) => share(g.value)), 0);
  const annualPreview = (d: Draft) => {
    const value = parseNumber(d.value ?? "");
    const life = parseNumber(d.life ?? "");
    return <Num tone="muted">{value === null || !life ? "—" : money(value / life)}</Num>;
  };
  const columns: EditColumn<Unit>[] = [
    { key: "name", label: "Equipment", minWidth: 220, cell: (u) => <Txt tone="secondary">{u.name}</Txt>, edit: { kind: "text", get: (u) => u.name } },
    { key: "year", label: "Year", width: 72, cell: (u) => <Num tone={u.year ? "default" : "muted"}>{u.year || "—"}</Num>, edit: { kind: "number", get: (u) => u.year } },
    { key: "ownership", label: "Ownership", width: 110, cell: (u) => <Txt tone="secondary">{u.ownership}</Txt>, edit: { kind: "select", get: (u) => u.ownership, options: OWNERSHIP } },
    { key: "value", label: "Value", width: 110, align: "right", cell: (u) => <Num>{money(u.value)}</Num>, edit: { kind: "number", get: (u) => String(u.value) } },
    { key: "life", label: "Useful life", width: 88, align: "right", cell: (u) => <Num>{u.life} yr</Num>, edit: { kind: "number", get: (u) => String(u.life) } },
    { key: "annual", label: "Annual cost", width: 100, align: "right", cell: (u) => <Num>{money(u.value / u.life)}</Num>, preview: annualPreview },
    { key: "share", label: "Share of fleet", width: 150, cell: (u) => <ShareBar share={share(u.value)} max={maxShare} /> },
  ];

  const addOpen = adding || pendingAdd === "equipment";
  const setAddOpen = (open: boolean) => {
    setAdding(open);
    setError(null);
    if (!open) setPendingAdd(null);
  };

  return (
    <>
      <PageHeader title="Fleet" />
      <MetricStrip>
        <Metric label="Fleet value" value={money(f.value)} />
        <Metric label="Annual depreciation" value={money(f.annual)} />
        <Metric label="By group" wide>
          <SplitBar parts={f.groups.map((g) => ({ share: g.value, color: g.color }))} />
          <Legend items={f.groups.map((g) => ({ color: g.color, label: `${g.name} $${short(g.value)}` }))} />
        </Metric>
      </MetricStrip>
      <EditableTable
        title="Equipment"
        count={`${f.pieces} pieces`}
        columns={columns}
        groups={f.groups.map((g) => ({
          id: g.name,
          rows: g.rows,
          cells: {
            name: (
              <span className="flex min-w-0 items-baseline gap-s">
                <span className="truncate font-ui text-m font-ui-medium text-fg">{g.name}</span>
                <span className="font-ui text-m font-ui-regular text-fg-subtle">{g.pieces}</span>
              </span>
            ),
            value: <Num tone="strong">{money(g.value)}</Num>,
            annual: <Num tone="strong">{money(g.annual)}</Num>,
            share: <ShareBar share={share(g.value)} max={maxShare} color={g.color} />,
          },
        }))}
        noun="piece of equipment"
        rowId={(u) => u.id}
        rowLabel={(u) => u.name}
        onSave={(row, draft) => {
          const next = readUnit(draft, row);
          if (typeof next === "string") return next;
          update((s) => ({ ...s, units: s.units.map((u) => (u.id === row.id ? next : u)) }));
          notify("Equipment saved", next.name);
        }}
        onDelete={(row) => {
          update((s) => ({ ...s, units: s.units.filter((u) => u.id !== row.id) }));
          notify("Equipment deleted", row.name);
        }}
        empty="No equipment yet. Add the first piece to start tracking the fleet."
        tools={
          <Button variant="primary" onClick={() => setAddOpen(true)}>
            <Icon icon={Plus} />
            Add equipment
          </Button>
        }
      />
      <FormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add equipment"
        submitLabel="Add equipment"
        onSubmit={(data) => {
          const unit = readUnit(Object.fromEntries([...data].map(([k, v]) => [k, String(v)])), { id: newId("u"), group: UNIT_GROUPS[0], pieces: 1 });
          if (typeof unit === "string") return setError(unit);
          update((s) => ({ ...s, units: [...s.units, unit] }));
          notify("Equipment added", unit.name);
          setAddOpen(false);
        }}
      >
        <TextField label="Name" name="name" required />
        <div className="grid gap-m sm:grid-cols-2">
          <Select label="Group" name="group" defaultValue={UNIT_GROUPS[0]} options={options(UNIT_GROUPS)} />
          <Select label="Ownership" name="ownership" defaultValue={OWNERSHIP[0]} options={options(OWNERSHIP)} />
          <TextField label="Value, $" name="value" inputMode="decimal" required />
          <TextField label="Useful life, years" name="life" inputMode="numeric" defaultValue="10" required />
          <TextField label="Model year" name="year" inputMode="numeric" description="Optional." />
        </div>
        {error ? (
          <p role="alert" className="font-ui text-m font-ui-regular text-fg-danger">
            {error}
          </p>
        ) : null}
      </FormDialog>
    </>
  );
}
