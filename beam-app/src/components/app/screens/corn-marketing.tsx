"use client";

import { Filter, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/patterns/app-shell";
import { EditableTable } from "@/components/patterns/editable-table";
import { Sparkline } from "@/components/patterns/figures";
import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";
import { Button } from "@/components/ui/button";
import { FormDialog } from "@/components/ui/dialog";
import { Menu } from "@/components/ui/menu";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";
import { CORN, SALE_TYPES, VARIETIES, finalPrice, land, marketing, money, short, signed, whole } from "@/lib/farm";
import { SALE_COLUMNS, byNewest, readSale, saleLabel } from "../sales";
import { newId, useFarm } from "../store";
import { CornViews } from "./corn-views";

const ALL = "All corn";
const options = (values: string[]) => values.map((v) => ({ value: v, label: v }));

export function CornMarketing() {
  const { farm, update, notify, pendingAdd, setPendingAdd } = useFarm();
  const [variety, setVariety] = useState(ALL);
  const [offersOnly, setOffersOnly] = useState(false);
  const [types, setTypes] = useState<string[]>(SALE_TYPES);
  const [hidden, setHidden] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const inVariety = farm.sales.filter((s) => variety === ALL || s.variety === variety);
  const acres = land(farm.fields).byCrop.filter((c) => VARIETIES.includes(c.crop) && (variety === ALL || c.crop === variety)).reduce((t, c) => t + c.acres, 0);
  const m = marketing(inVariety, acres);
  const offers = inVariety.filter((s) => s.status === "Open");
  const rows = inVariety.filter((s) => types.includes(s.type) && (!offersOnly || s.status === "Open")).sort(byNewest);
  const oldestFirst = [...inVariety].sort(byNewest).reverse();
  const revenueRun = oldestFirst.reduce<number[]>((run, s) => [...run, (run.at(-1) ?? 0) + s.bushels * finalPrice(s)], []);

  const addOpen = adding || pendingAdd === "sale";
  const setAddOpen = (open: boolean) => {
    setAdding(open);
    setAddError(null);
    if (!open) setPendingAdd(null);
  };
  const filtered = types.length < SALE_TYPES.length;

  return (
    <>
      <PageHeader
        title="Corn"
        facts={`${whole(acres)} acres · ${CORN.yield} bu/ac expected`}
        actions={
          <Button variant="outline" aria-pressed={offersOnly} className={offersOnly ? "bg-highlight" : ""} onClick={() => setOffersOnly((v) => !v)}>
            Firm offers
            <span className="font-ui-regular text-fg-muted">{offers.length}</span>
          </Button>
        }
      />
      <CornViews current="Marketing">
        <div className="w-44">
          <Select label="Variety" hideLabel value={variety} onValueChange={setVariety} options={options([ALL, ...VARIETIES])} />
        </div>
      </CornViews>
      <MetricStrip>
        <Metric label="Sold" value={`${m.percent.toFixed(1)}%`} note={`${short(m.sold)} of ${short(m.production)} bu`} wide>
          <SplitBar gap={false} parts={[{ share: m.filled, color: "var(--accent)" }, { share: m.open, color: "var(--accent-muted)" }, { share: m.unsold, color: "var(--bg-surface-muted)" }]} />
        </Metric>
        <Metric label="Unsold" value={short(m.unsold)} unit="bu" note={m.open ? `${short(m.open)} bu more on firm offer` : undefined} />
        <Metric label="Average price" value={money(m.average, 2)} unit="/bu">
          <Sparkline values={oldestFirst.map(finalPrice)} />
        </Metric>
        <Metric label="Break-even" value={money(CORN.breakEven, 2)} unit="/bu" note="At expected yield" />
        <Metric label="Margin" value={`${signed(m.margin).replace(/^([+−]?)/, "$1$")}`} unit="/bu" tone={m.margin > 0 ? "success" : m.margin < 0 ? "danger" : "default"} />
        <Metric label="Revenue" value={`$${short(m.revenue)}`}>
          <Sparkline values={revenueRun} />
        </Metric>
      </MetricStrip>
      <EditableTable
        title="Sales"
        count={rows.length === inVariety.length ? String(rows.length) : `${rows.length} of ${inVariety.length}`}
        columns={SALE_COLUMNS}
        rows={rows}
        hidden={hidden}
        noun="sale"
        rowId={(s) => s.id}
        rowLabel={saleLabel}
        onSave={(row, draft) => {
          const next = readSale(draft, row);
          if (typeof next === "string") return next;
          update((f) => ({ ...f, sales: f.sales.map((s) => (s.id === row.id ? next : s)) }));
          notify("Sale saved", saleLabel(next));
        }}
        onDelete={(row) => {
          update((f) => ({ ...f, sales: f.sales.filter((s) => s.id !== row.id) }));
          notify("Sale deleted", saleLabel(row));
        }}
        empty={inVariety.length ? "No sales match these filters." : "No sales yet. Add the first one to start tracking this crop."}
        tools={
          <>
            <Menu
              variant="ghost"
              chevron={false}
              align="end"
              heading="Sale type"
              trigger={
                <>
                  <Icon icon={Filter} />
                  Filter
                  {filtered ? <span className="font-ui-regular text-fg-muted">{types.length}</span> : null}
                </>
              }
              items={SALE_TYPES.map((t) => ({ label: t, checked: types.includes(t), onCheckedChange: (on: boolean) => setTypes((c) => (on ? [...c, t] : c.filter((x) => x !== t))) }))}
            />
            <Menu
              variant="ghost"
              chevron={false}
              align="end"
              heading="Show columns"
              trigger={
                <>
                  <Icon icon={SlidersHorizontal} />
                  Columns
                </>
              }
              items={SALE_COLUMNS.filter((c) => c.optional).map((c) => ({ label: c.label, checked: !hidden.includes(c.key), onCheckedChange: (on: boolean) => setHidden((h) => (on ? h.filter((k) => k !== c.key) : [...h, c.key])) }))}
            />
            <Button variant="primary" onClick={() => setAddOpen(true)}>
              <Icon icon={Plus} />
              Add sale
            </Button>
          </>
        }
      />
      <FormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add sale"
        submitLabel="Add sale"
        onSubmit={(data) => {
          const sale = readSale(Object.fromEntries([...data].map(([k, v]) => [k, String(v)])), { id: newId("s") });
          if (typeof sale === "string") return setAddError(sale);
          update((f) => ({ ...f, sales: [...f.sales, sale] }));
          notify("Sale added", saleLabel(sale));
          setAddOpen(false);
        }}
      >
        <div className="grid gap-m sm:grid-cols-2">
          <TextField label="Date" name="date" type="date" required />
          <TextField label="Bushels" name="bushels" inputMode="numeric" required />
          <Select label="Variety" name="variety" defaultValue={variety === ALL ? VARIETIES[0] : variety} options={options(VARIETIES)} />
          <Select label="Type" name="type" defaultValue={SALE_TYPES[0]} options={options(SALE_TYPES)} />
          <TextField label="Futures, $/bu" name="futures" inputMode="decimal" required />
          <TextField label="Basis, $/bu" name="basis" inputMode="decimal" placeholder="0.00" />
          <TextField label="Premium, $/bu" name="premium" inputMode="decimal" placeholder="0.00" />
          <Select label="Status" name="status" defaultValue="Filled" options={[{ value: "Filled", label: "Filled" }, { value: "Open", label: "Open, a firm offer" }]} />
        </div>
        {addError ? (
          <p role="alert" className="font-ui text-m font-ui-regular text-fg-danger">
            {addError}
          </p>
        ) : null}
      </FormDialog>
    </>
  );
}
