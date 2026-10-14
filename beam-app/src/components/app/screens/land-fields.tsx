"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/patterns/app-shell";
import { Num, Txt } from "@/components/patterns/data-table";
import { EditableTable, type Draft, type EditColumn } from "@/components/patterns/editable-table";
import { DotLabel, Legend } from "@/components/patterns/figures";
import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/ui/dialog";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { CROPS, CROP_COLOR, LAND_TYPES, land, money, parseNumber, whole, type Field } from "@/lib/farm";
import { newId, useFarm } from "../store";

const ALL_CROPS = "All crops";
const ALL_TYPES = "All land types";
const options = (values: string[]) => values.map((v) => ({ value: v, label: v }));

function readField(d: Draft, base: Pick<Field, "id">): Field | string {
  const name = (d.name ?? "").trim();
  if (!name) return "Give the field a name.";
  const acres = parseNumber(d.acres ?? "");
  if (acres === null || acres <= 0) return "Acres must be a number above zero.";
  const cost = parseNumber(d.cost || "0");
  if (cost === null || cost < 0) return "Land cost must be a number, such as 279.00.";
  return { id: base.id, name, acres, crop: d.crop || CROPS[0], landType: d.landType || LAND_TYPES[0], cost };
}

const COLUMNS: EditColumn<Field>[] = [
  { key: "name", label: "Field", minWidth: 180, cell: (f) => <Txt>{f.name}</Txt>, edit: { kind: "text", get: (f) => f.name } },
  { key: "acres", label: "Acres", width: 80, align: "right", cell: (f) => <Num>{whole(f.acres)}</Num>, edit: { kind: "number", get: (f) => String(f.acres) } },
  { key: "crop", label: "Crop", width: 170, cell: (f) => <DotLabel color={CROP_COLOR[f.crop] ?? "var(--border-strong)"} tone="secondary">{f.crop}</DotLabel>, edit: { kind: "select", get: (f) => f.crop, options: CROPS } },
  { key: "landType", label: "Land type", width: 140, cell: (f) => <Txt tone="secondary">{f.landType}</Txt>, edit: { kind: "select", get: (f) => f.landType, options: LAND_TYPES } },
  { key: "cost", label: "Land cost per acre", width: 150, align: "right", cell: (f) => (f.cost ? <Num>{money(f.cost, 2)}</Num> : <DotLabel color="var(--warning)">Add a cost</DotLabel>), edit: { kind: "number", get: (f) => (f.cost ? f.cost.toFixed(2) : "") } },
];

export function LandFields() {
  const { farm, update, notify, pendingAdd, setPendingAdd } = useFarm();
  const [query, setQuery] = useState("");
  const [crop, setCrop] = useState(ALL_CROPS);
  const [type, setType] = useState(ALL_TYPES);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const l = land(farm.fields);
  const rows = farm.fields.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase()) && (crop === ALL_CROPS || f.crop === crop) && (type === ALL_TYPES || f.landType === type));

  const addOpen = adding || pendingAdd === "field";
  const setAddOpen = (open: boolean) => {
    setAdding(open);
    setError(null);
    if (!open) setPendingAdd(null);
  };

  return (
    <>
      <PageHeader title="Fields" />
      <MetricStrip>
        <Metric label="Total acres" value={whole(l.acres)} />
        <Metric label="Average land cost" value={money(l.averageCost, 2)} unit="/ac" />
        {l.missing.length ? <Metric label="Missing a land cost" value={String(l.missing.length)} unit={l.missing.length === 1 ? "field" : "fields"} note={l.missing.map((f) => f.name).join(", ")} tone="warning" /> : null}
        <Metric label="Acres by crop" wide>
          <SplitBar parts={l.byCrop.map((c) => ({ share: c.acres, color: c.color }))} />
          <Legend items={l.byCrop.map((c) => ({ color: c.color, label: `${c.crop} ${whole(c.acres)}` }))} />
        </Metric>
      </MetricStrip>
      <EditableTable
        title="Fields"
        count={rows.length === farm.fields.length ? String(rows.length) : `${rows.length} of ${farm.fields.length}`}
        columns={COLUMNS}
        rows={rows}
        noun="field"
        rowId={(f) => f.id}
        rowLabel={(f) => f.name}
        onSave={(row, draft) => {
          const next = readField(draft, row);
          if (typeof next === "string") return next;
          update((f) => ({ ...f, fields: f.fields.map((x) => (x.id === row.id ? next : x)) }));
          notify("Field saved", next.name);
        }}
        onDelete={(row) => {
          update((f) => ({ ...f, fields: f.fields.filter((x) => x.id !== row.id) }));
          notify("Field deleted", row.name);
        }}
        empty={farm.fields.length ? "No fields match this search." : "No fields yet. Add the first one to start tracking land."}
        tools={
          <>
            <SearchField label="Search fields" value={query} onChange={setQuery} />
            <div className="w-40">
              <Select label="Crop" hideLabel value={crop} onValueChange={setCrop} options={options([ALL_CROPS, ...CROPS])} />
            </div>
            <div className="w-40">
              <Select label="Land type" hideLabel value={type} onValueChange={setType} options={options([ALL_TYPES, ...LAND_TYPES])} />
            </div>
            <Button variant="primary" onClick={() => setAddOpen(true)}>
              <Icon icon={Plus} />
              Add field
            </Button>
          </>
        }
      />
      <FormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add field"
        submitLabel="Add field"
        onSubmit={(data) => {
          const field = readField(Object.fromEntries([...data].map(([k, v]) => [k, String(v)])), { id: newId("f") });
          if (typeof field === "string") return setError(field);
          update((f) => ({ ...f, fields: [...f.fields, field] }));
          notify("Field added", field.name);
          setAddOpen(false);
        }}
      >
        <TextField label="Name" name="name" required />
        <div className="grid gap-m sm:grid-cols-2">
          <TextField label="Acres" name="acres" inputMode="decimal" required />
          <TextField label="Land cost per acre, $" name="cost" inputMode="decimal" description="Leave empty to add it later." />
          <Select label="Crop" name="crop" defaultValue={CROPS[0]} options={options(CROPS)} />
          <Select label="Land type" name="landType" defaultValue={LAND_TYPES[0]} options={options(LAND_TYPES)} />
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
