"use client";

import { useState } from "react";
import { SALE_COLUMNS, byNewest, readSale, saleLabel } from "@/components/app/sales";
import { SEED, type Sale } from "@/lib/farm";
import { EditableTable } from "./editable-table";

// The sales table on its own, holding its rows in memory. The Corn marketing screen uses the same
// columns against the farm's saved data.
export function SalesTable({ sales = SEED.sales, limit }: { sales?: Sale[]; limit?: number }) {
  const [rows, setRows] = useState(sales);
  const shown = [...rows].sort(byNewest).slice(0, limit ?? rows.length);
  return (
    <EditableTable
      title="Sales"
      count={String(rows.length)}
      columns={SALE_COLUMNS}
      rows={shown}
      noun="sale"
      rowId={(s) => s.id}
      rowLabel={saleLabel}
      onSave={(row, draft) => {
        const next = readSale(draft, row);
        if (typeof next === "string") return next;
        setRows((r) => r.map((s) => (s.id === row.id ? next : s)));
      }}
      onDelete={(row) => setRows((r) => r.filter((s) => s.id !== row.id))}
      empty="No sales yet."
    />
  );
}
