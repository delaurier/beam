import { Num, Status, Txt } from "@/components/patterns/data-table";
import type { Draft, EditColumn } from "@/components/patterns/editable-table";
import { CORN, SALE_TYPES, VARIETIES, day, finalPrice, money, parseNumber, signed, whole, type Sale } from "@/lib/farm";

const marginTone = (margin: number) => (margin > 0 ? "success" : margin < 0 ? "danger" : "muted");
const zero = (v: number) => (v === 0 ? "muted" : "default");
/** The final price implied by what is typed so far, or null while any part is not a number. */
function draftFinal(d: Draft) {
  const parts = [d.futures, d.basis, d.premium].map((v) => parseNumber(v ?? ""));
  return parts.some((v) => v === null) ? null : (parts as number[]).reduce((a, b) => a + b, 0);
}

export const SALE_COLUMNS: EditColumn<Sale>[] = [
  { key: "date", label: "Date", width: 124, cell: (s) => <Num tone="muted">{day(s.date)}</Num>, edit: { kind: "date", get: (s) => s.date } },
  { key: "variety", label: "Variety", minWidth: 110, cell: (s) => <Txt>{s.variety}</Txt>, edit: { kind: "select", get: (s) => s.variety, options: VARIETIES } },
  { key: "type", label: "Type", width: 78, optional: true, cell: (s) => <Txt tone="secondary">{s.type}</Txt>, edit: { kind: "select", get: (s) => s.type, options: SALE_TYPES } },
  { key: "bushels", label: "Bushels", width: 84, align: "right", cell: (s) => <Num>{whole(s.bushels)}</Num>, edit: { kind: "number", get: (s) => String(s.bushels) } },
  { key: "futures", label: "Futures", width: 64, align: "right", cell: (s) => <Num>{s.futures.toFixed(2)}</Num>, edit: { kind: "number", get: (s) => s.futures.toFixed(2) } },
  { key: "basis", label: "Basis", width: 64, align: "right", optional: true, cell: (s) => <Num tone={zero(s.basis)}>{signed(s.basis)}</Num>, edit: { kind: "number", get: (s) => s.basis.toFixed(2) } },
  { key: "premium", label: "Premium", width: 72, align: "right", optional: true, cell: (s) => <Num tone={zero(s.premium)}>{signed(s.premium)}</Num>, edit: { kind: "number", get: (s) => s.premium.toFixed(2) } },
  {
    key: "final", label: "Final", width: 68, align: "right",
    cell: (s) => <Num tone="strong">{money(finalPrice(s), 2)}</Num>,
    preview: (d) => {
      const f = draftFinal(d);
      return <Num tone={f === null ? "muted" : "strong"}>{f === null ? "—" : money(f, 2)}</Num>;
    },
  },
  {
    key: "margin", label: "vs break-even", width: 94, align: "right", optional: true,
    cell: (s) => <Num tone={marginTone(finalPrice(s) - CORN.breakEven)}>{signed(finalPrice(s) - CORN.breakEven)}</Num>,
    preview: (d) => {
      const f = draftFinal(d);
      return f === null ? <Num tone="muted">—</Num> : <Num tone={marginTone(f - CORN.breakEven)}>{signed(f - CORN.breakEven)}</Num>;
    },
  },
  { key: "status", label: "Status", width: 92, cell: (s) => <Status tone={s.status === "Filled" ? "success" : "warning"}>{s.status}</Status>, edit: { kind: "select", get: (s) => s.status, options: ["Filled", "Open"] } },
];

/** Turns typed values into a sale, or says what is wrong with them. */
export function readSale(d: Draft, base: Pick<Sale, "id">): Sale | string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date ?? "")) return "Enter the date of the sale.";
  const bushels = parseNumber(d.bushels ?? "");
  if (bushels === null || bushels <= 0) return "Bushels must be a number above zero.";
  const futures = parseNumber(d.futures ?? "");
  if (futures === null || futures < 0) return "Futures must be a price, such as 4.75.";
  const basis = parseNumber(d.basis || "0");
  const premium = parseNumber(d.premium || "0");
  if (basis === null) return "Basis must be a number, such as -0.10.";
  if (premium === null) return "Premium must be a number, such as 0.05.";
  return { id: base.id, date: d.date, variety: d.variety || VARIETIES[0], type: d.type || SALE_TYPES[0], bushels: Math.round(bushels), futures, basis, premium, status: d.status === "Open" ? "Open" : "Filled" };
}
export const saleLabel = (s: Sale) => `sale, ${day(s.date)}, ${whole(s.bushels)} bushels`;
export const byNewest = (a: Sale, b: Sale) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
