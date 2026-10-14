"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { PageHeader } from "@/components/patterns/app-shell";
import { TableCard, TableHead, TableRow, Txt, tableMinWidth, type Column } from "@/components/patterns/data-table";
import { Button } from "@/components/ui/button";
import { SearchField } from "@/components/ui/search-field";
import { ViewSwitch } from "@/components/ui/toggle-group";
import { REPORTS, toCsv, type Report } from "@/lib/farm";
import { useFarm } from "../store";

const AREAS = ["All", "Crops", "Land", "Machinery", "Finance"];
const COLUMNS: Column[] = [
  { key: "report", label: "Report", minWidth: 280 },
  { key: "area", label: "Area", width: 120 },
  { key: "covers", label: "Covers", width: 180 },
  { key: "get", label: "", width: 132, align: "right" },
];

export function Reports() {
  const { farm, notify } = useFarm();
  const [area, setArea] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const rows = REPORTS.filter((r) => (area === "All" || r.area === area) && (r.name.toLowerCase().includes(q) || r.about.toLowerCase().includes(q)));

  const download = (r: Report) => {
    if (!r.rows) return;
    const url = URL.createObjectURL(new Blob([toCsv(r.rows(farm))], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify("Report downloaded", `${r.id}.csv`);
  };

  return (
    <>
      <PageHeader title="Reports" />
      <div className="flex flex-wrap items-center justify-between gap-s">
        <ViewSwitch aria-label="Report area" options={AREAS} value={area} onValueChange={setArea} />
        <SearchField label="Search reports" value={query} onChange={setQuery} />
      </div>
      <TableCard title="Reports" hideHeader minWidth={tableMinWidth(COLUMNS)}>
        <TableHead columns={COLUMNS} />
        {rows.length === 0 ? <p className="px-l py-l font-ui text-m font-ui-regular text-fg-muted">No report matches this search.</p> : null}
        {rows.map((r) => (
          <TableRow
            key={r.id}
            columns={COLUMNS}
            focusable={false}
            cells={{
              report: (
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-ui text-m font-ui-medium text-fg">{r.name}</span>
                  <span className="truncate font-ui text-m font-ui-regular text-fg-muted">{r.about}</span>
                </span>
              ),
              area: <Txt tone="secondary">{r.area}</Txt>,
              covers: <Txt tone="secondary">{r.covers(farm)}</Txt>,
              get: r.rows ? (
                <Button variant="ghost" aria-label={`Download ${r.name} as CSV`} onClick={() => download(r)}>
                  <Icon icon={Download} />
                  CSV
                </Button>
              ) : (
                <span className="font-ui text-m font-ui-regular whitespace-nowrap text-fg-subtle">Not designed yet</span>
              ),
            }}
          />
        ))}
      </TableCard>
    </>
  );
}
