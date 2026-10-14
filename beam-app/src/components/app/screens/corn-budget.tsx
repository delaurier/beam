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
import { CORN_BUDGET, budget, money, parseNumber, whole, type Expense } from "@/lib/farm";
import { newId, useFarm } from "../store";
import { CornViews } from "./corn-views";

const perBushel = (perAcre: number) => perAcre / CORN_BUDGET.yield;
const toCover = (perAcre: number) => perAcre / CORN_BUDGET.price;
const total = (perAcre: number) => perAcre * CORN_BUDGET.acres;
const typed = (d: Draft) => parseNumber(d.perAcre ?? "");

function readExpense(d: Draft, base: Pick<Expense, "id" | "category">): Expense | string {
  const name = (d.name ?? "").trim();
  if (!name) return "Give the expense a name.";
  const perAcre = typed(d);
  if (perAcre === null || perAcre < 0) return "Cost per acre must be a number, such as 120.00.";
  return { id: base.id, category: d.category || base.category, name, perAcre, note: (d.note ?? "").trim() };
}

export function CornBudget() {
  const { farm, update, notify, pendingAdd, setPendingAdd } = useFarm();
  const [adding, setAdding] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const b = budget(farm);
  const largest = Math.max(...b.byCategory.map((c) => c.perAcre), 0);
  const share = (perAcre: number) => (b.perAcre ? (perAcre / b.perAcre) * 100 : 0);
  const maxShare = share(largest);

  const preview = (render: (perAcre: number) => string) =>
    function Preview(d: Draft) {
      const v = typed(d);
      return <Num tone="muted">{v === null ? "—" : render(v)}</Num>;
    };
  const columns: EditColumn<Expense>[] = [
    { key: "name", label: "Expense", minWidth: 190, cell: (e) => <Txt tone="secondary">{e.name}</Txt>, edit: { kind: "text", get: (e) => e.name } },
    { key: "perAcre", label: "Per acre", width: 92, align: "right", cell: (e) => <Num>{money(e.perAcre, 2)}</Num>, edit: { kind: "number", get: (e) => e.perAcre.toFixed(2) } },
    { key: "perBushel", label: "Per bushel", width: 84, align: "right", cell: (e) => <Num>{money(perBushel(e.perAcre), 2)}</Num>, preview: preview((v) => money(perBushel(v), 2)) },
    { key: "toCover", label: "Bu to cover", width: 88, align: "right", cell: (e) => <Num>{toCover(e.perAcre).toFixed(1)}</Num>, preview: preview((v) => toCover(v).toFixed(1)) },
    { key: "total", label: "Total", width: 96, align: "right", cell: (e) => <Num>{money(total(e.perAcre))}</Num>, preview: preview((v) => money(total(v))) },
    { key: "share", label: "Share of budget", width: 130, cell: (e) => <ShareBar share={share(e.perAcre)} max={maxShare} /> },
    { key: "note", label: "Notes", width: 150, cell: (e) => <Txt tone="secondary">{e.note}</Txt>, edit: { kind: "text", get: (e) => e.note } },
  ];

  const addOpen = adding || pendingAdd === "expense";
  const setAddOpen = (open: boolean) => {
    setAdding(open);
    setError(null);
    if (!open) setPendingAdd(null);
  };

  return (
    <>
      <PageHeader
        title="Corn"
        facts={`${whole(CORN_BUDGET.acres)} acres · ${CORN_BUDGET.yield} bu/ac expected`}
        actions={
          <Button variant="outline" onClick={() => (setError(null), setAddingCategory(true))}>
            Add category
          </Button>
        }
      />
      <CornViews current="Budget" />
      <MetricStrip>
        <Metric label="Cost per acre" value={money(b.perAcre, 2)} />
        <Metric label="Cost per bushel" value={money(b.perBushel, 2)} />
        <Metric label="Bushels to cover" value={b.toCover.toFixed(1)} unit="/ac" note={`At ${money(CORN_BUDGET.price, 2)} per bushel`} />
        <Metric label="Total" value={money(b.total)} />
        <Metric label="By category" wide>
          <SplitBar parts={b.byCategory.map((c) => ({ share: c.perAcre, color: c.color }))} />
          <Legend items={b.byCategory.map((c) => ({ color: c.color, label: c.name }))} />
        </Metric>
      </MetricStrip>
      <EditableTable
        title="Expenses"
        count={`${b.byCategory.length} categories`}
        columns={columns}
        groups={b.byCategory.map((c) => ({
          id: c.name,
          rows: c.items,
          cells: {
            name: (
              <span className="flex min-w-0 items-baseline gap-s">
                <span className="truncate font-ui text-m font-ui-medium text-fg">{c.name}</span>
                <span className="font-ui text-m font-ui-regular whitespace-nowrap text-fg-subtle">{c.items.length === 1 ? "1 item" : `${c.items.length} items`}</span>
              </span>
            ),
            perAcre: <Num tone="strong">{money(c.perAcre, 2)}</Num>,
            perBushel: <Num tone="strong">{money(perBushel(c.perAcre), 2)}</Num>,
            toCover: <Num tone="strong">{toCover(c.perAcre).toFixed(1)}</Num>,
            total: <Num tone="strong">{money(total(c.perAcre))}</Num>,
            share: <ShareBar share={share(c.perAcre)} max={maxShare} color={c.color} />,
          },
        }))}
        noun="expense"
        rowId={(e) => e.id}
        rowLabel={(e) => e.name}
        onSave={(row, draft) => {
          const next = readExpense(draft, row);
          if (typeof next === "string") return next;
          update((f) => ({ ...f, expenses: f.expenses.map((e) => (e.id === row.id ? next : e)) }));
          notify("Expense saved", next.name);
        }}
        onDelete={(row) => {
          update((f) => ({ ...f, expenses: f.expenses.filter((e) => e.id !== row.id) }));
          notify("Expense deleted", row.name);
        }}
        empty="No expenses yet. Add the first one to build this budget."
        tools={
          <Button variant="primary" onClick={() => setAddOpen(true)}>
            <Icon icon={Plus} />
            Add expense
          </Button>
        }
      />
      <FormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add expense"
        submitLabel="Add expense"
        onSubmit={(data) => {
          const expense = readExpense(Object.fromEntries([...data].map(([k, v]) => [k, String(v)])), { id: newId("e"), category: farm.categories[0] });
          if (typeof expense === "string") return setError(expense);
          update((f) => ({ ...f, expenses: [...f.expenses, expense] }));
          notify("Expense added", expense.name);
          setAddOpen(false);
        }}
      >
        <TextField label="Name" name="name" required />
        <div className="grid gap-m sm:grid-cols-2">
          <Select label="Category" name="category" defaultValue={farm.categories[0]} options={farm.categories.map((c) => ({ value: c, label: c }))} />
          <TextField label="Cost per acre, $" name="perAcre" inputMode="decimal" required />
        </div>
        <TextField label="Note" name="note" />
        {error ? (
          <p role="alert" className="font-ui text-m font-ui-regular text-fg-danger">
            {error}
          </p>
        ) : null}
      </FormDialog>
      <FormDialog
        open={addingCategory}
        onOpenChange={setAddingCategory}
        title="Add category"
        submitLabel="Add category"
        onSubmit={(data) => {
          const name = String(data.get("name") ?? "").trim();
          if (!name) return setError("Give the category a name.");
          if (farm.categories.some((c) => c.toLowerCase() === name.toLowerCase())) return setError("That category already exists.");
          update((f) => ({ ...f, categories: [...f.categories, name] }));
          notify("Category added", name);
          setAddingCategory(false);
        }}
      >
        <TextField label="Name" name="name" required error={addingCategory && error ? error : undefined} />
      </FormDialog>
    </>
  );
}
