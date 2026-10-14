import { SalesTable } from "@/components/patterns/sales-table";
import type { Sale } from "@/lib/farm";

// The same table with awkward but realistic data: a very long variety name, a huge sale, a zero (which also shows a negative margin).
const AWKWARD: Sale[] = [
  { id: "w1", date: "2026-12-31", variety: "Identity-preserved non-GMO white food-grade corn, Pioneer P1197", type: "Basis", bushels: 12845300, futures: 14.75, basis: -1.25, premium: 2.5, status: "Open" },
  { id: "w2", date: "2026-01-01", variety: "C", type: "HTA", bushels: 1, futures: 0, basis: 0, premium: 0, status: "Filled" },
];

export default function TableWorstCase() {
  return <SalesTable sales={AWKWARD} />;
}
