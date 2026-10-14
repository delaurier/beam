"use client";

import { Num, Txt } from "@/components/patterns/data-table";
import { EditableTable, type EditColumn } from "@/components/patterns/editable-table";
import { ShareBar } from "@/components/patterns/figures";

type Row = { id: string; name: string; value: number };
const GROUPS = [
  { name: "Power units", rows: [{ id: "a", name: "John Deere 8R 280", value: 190000 }, { id: "b", name: "Kenworth T880", value: 185000 }] },
  { name: "Implements", rows: [{ id: "c", name: "Planter", value: 120000 }] },
];
const TOTAL = 495000;
const COLUMNS: EditColumn<Row>[] = [
  { key: "name", label: "Equipment", minWidth: 180, cell: (r) => <Txt tone="secondary">{r.name}</Txt> },
  { key: "value", label: "Value", width: 100, align: "right", cell: (r) => <Num>${r.value.toLocaleString("en-US")}</Num> },
  { key: "share", label: "Share", width: 140, cell: (r) => <ShareBar share={(r.value / TOTAL) * 100} max={75.8} /> },
];

// Group headings carry the subtotal. The first group starts open.
export default function TableGroups() {
  return (
    <EditableTable
      title="Equipment"
      count="3 pieces"
      columns={COLUMNS}
      rowId={(r) => r.id}
      rowLabel={(r) => r.name}
      empty="No equipment yet."
      groups={GROUPS.map((g) => {
        const value = g.rows.reduce((t, r) => t + r.value, 0);
        return {
          id: g.name,
          rows: g.rows,
          cells: { name: <span className="font-ui text-m font-ui-medium text-fg">{g.name}</span>, value: <Num tone="strong">${value.toLocaleString("en-US")}</Num>, share: <ShareBar share={(value / TOTAL) * 100} max={75.8} color="var(--color-1)" /> },
        };
      })}
    />
  );
}
