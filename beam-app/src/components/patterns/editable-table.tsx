"use client";

import { Check, ChevronDown, ChevronRight, Trash2, X } from "lucide-react";
import { useState, type KeyboardEvent, type ReactNode } from "react";
import { Icon } from "../icon";
import { Button, ButtonIcon } from "../ui/button";
import { CellInput, CellSelect, TableCard, TableHead, TableRow, tableMinWidth, type Column } from "./data-table";

export type Draft = Record<string, string>;
export type EditColumn<T> = Column & {
  cell: (row: T) => ReactNode;
  /** Makes the cell an input while its row is open. Without it the cell stays as text. */
  edit?: { kind: "text" | "number" | "date" | "select"; get: (row: T) => string; options?: string[] };
  /** What a computed cell shows while its row is open, worked out from the values being typed. */
  preview?: (draft: Draft, row: T) => ReactNode;
  /** The Columns menu can hide this column. */
  optional?: boolean;
};
export type RowGroup<T> = { id: string; cells: Record<string, ReactNode>; rows: T[] };

type Props<T> = {
  title: string;
  count?: string;
  tools?: ReactNode;
  columns: EditColumn<T>[];
  rows?: T[];
  /** Rows under headings that open and close. Use this or `rows`. */
  groups?: RowGroup<T>[];
  rowId: (row: T) => string;
  /** Names the row for assistive technology: "Edit <rowLabel>". */
  rowLabel: (row: T) => string;
  /** Return a message to keep the row open and show the message; return nothing to accept. */
  onSave?: (row: T, draft: Draft) => string | void;
  onDelete?: (row: T) => void;
  hidden?: string[];
  /** What one row is called, for the delete question: "sale", "field". */
  noun?: string;
  empty: string;
};

const ACTIONS: Column = { key: "__actions", label: "", width: 64, align: "right" };
const TOGGLE: Column = { key: "__toggle", label: "", width: 16 };

// Read first, edit on demand. Rows are text until one is opened; one row is open at a time.
// Enter saves, Escape cancels. Computed cells never become inputs.
export function EditableTable<T>({ title, count, tools, columns, rows, groups, rowId, rowLabel, onSave, onDelete, hidden = [], noun = "row", empty }: Props<T>) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>({});
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [closed, setClosed] = useState<string[]>(() => (groups ? groups.slice(1).map((g) => g.id) : []));

  const shown = columns.filter((c) => !hidden.includes(c.key));
  const lanes: Column[] = [...(groups ? [TOGGLE] : []), ...shown, ...(onSave ? [ACTIONS] : [])];

  const open = (row: T) => {
    setDraft(Object.fromEntries(columns.filter((c) => c.edit).map((c) => [c.key, c.edit!.get(row)])));
    setError(null);
    setConfirming(false);
    setEditing(rowId(row));
  };
  const close = () => {
    setEditing(null);
    setError(null);
    setConfirming(false);
  };
  const save = (row: T) => {
    const message = onSave?.(row, draft);
    if (message) setError(message);
    else close();
  };
  const keys = (row: T) => (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save(row);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  const renderRow = (row: T) => {
    const id = rowId(row);
    if (editing !== id) {
      const cells: Record<string, ReactNode> = Object.fromEntries(shown.map((c) => [c.key, c.cell(row)]));
      if (onSave)
        cells.__actions = (
          <Button variant="ghost" aria-label={`Edit ${rowLabel(row)}`} onClick={() => open(row)}>
            Edit
          </Button>
        );
      return (
        <div key={id} role="presentation" onDoubleClick={onSave ? () => open(row) : undefined} onKeyDown={onSave ? (e) => e.key === "Enter" && e.target === e.currentTarget.firstElementChild && open(row) : undefined}>
          <TableRow columns={lanes} cells={cells} focusable={Boolean(onSave)} />
        </div>
      );
    }
    let first = true;
    const cells: Record<string, ReactNode> = Object.fromEntries(
      shown.map((c) => {
        if (!c.edit) return [c.key, c.preview ? c.preview(draft, row) : c.cell(row)];
        const common = { label: c.label || c.key, value: draft[c.key] ?? "", autoFocus: first, onKeyDown: keys(row) };
        first = false;
        const set = (value: string) => setDraft((d) => ({ ...d, [c.key]: value }));
        if (c.edit.kind === "select") return [c.key, <CellSelect key={c.key} {...common} options={c.edit.options ?? []} onChange={(e) => set(e.target.value)} />];
        return [c.key, <CellInput key={c.key} {...common} type={c.edit.kind === "date" ? "date" : "text"} inputMode={c.edit.kind === "number" ? "decimal" : undefined} align={c.align ?? "left"} mono={c.edit.kind !== "text"} onChange={(e) => set(e.target.value)} />];
      }),
    );
    cells.__actions = (
      <span className="flex gap-xxs">
        <Button variant="primary" iconOnly aria-label={`Save ${rowLabel(row)}`} onClick={() => save(row)}>
          <ButtonIcon>
            <Icon icon={Check} />
          </ButtonIcon>
        </Button>
        <Button variant="ghost" iconOnly aria-label="Cancel edit" onClick={close}>
          <ButtonIcon>
            <Icon icon={X} />
          </ButtonIcon>
        </Button>
      </span>
    );
    return (
      <div key={id} role="presentation" className="divider-b">
        <div className="[&>*]:shadow-none">
          <TableRow columns={lanes} cells={cells} editing />
        </div>
        {error ? (
          <p role="alert" className="px-l pb-xs font-ui text-m font-ui-regular text-fg-danger">
            {error}
          </p>
        ) : null}
        {onDelete ? (
          <div className="flex flex-wrap items-center gap-xs px-l pb-xs">
            {confirming ? (
              <>
                <span role="alert" className="font-ui text-m font-ui-regular text-fg-secondary">
                  Delete this {noun}? It cannot be undone.
                </span>
                <Button variant="ghost" onClick={() => setConfirming(false)}>
                  Keep
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    onDelete(row);
                    close();
                  }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <Button variant="ghost" aria-label={`Delete ${rowLabel(row)}`} onClick={() => setConfirming(true)}>
                <Icon icon={Trash2} />
                Delete
              </Button>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  const total = groups ? groups.reduce((n, g) => n + g.rows.length, 0) : (rows?.length ?? 0);
  return (
    <TableCard title={title} count={count} tools={tools} minWidth={tableMinWidth(lanes)}>
      <TableHead columns={lanes} />
      {total === 0 ? <p className="px-l py-l font-ui text-m font-ui-regular text-fg-muted">{empty}</p> : null}
      {groups
        ? groups.map((g) => {
            const isOpen = !closed.includes(g.id);
            const toggle = () => setClosed((c) => (isOpen ? [...c, g.id] : c.filter((x) => x !== g.id)));
            return (
              <div key={g.id} role="rowgroup">
                <div role="presentation" onClick={toggle} className="cursor-default">
                  <TableRow
                    columns={lanes}
                    focusable={false}
                    cells={{
                      ...g.cells,
                      __toggle: (
                        <button type="button" aria-expanded={isOpen} aria-label={`${isOpen ? "Hide" : "Show"} ${g.id}`} onClick={(e) => (e.stopPropagation(), toggle())} className="flex rounded-xs text-fg-muted">
                          <Icon icon={isOpen ? ChevronDown : ChevronRight} />
                        </button>
                      ),
                    }}
                  />
                </div>
                {isOpen ? g.rows.map(renderRow) : null}
              </div>
            );
          })
        : rows?.map(renderRow)}
    </TableCard>
  );
}
