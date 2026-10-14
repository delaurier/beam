import { SalesTable } from "@/components/patterns/sales-table";

// Rows read as data. Press Edit, double-click a row, or press Enter on it to edit that row.
export default function TableSales() {
  return <SalesTable limit={5} />;
}
