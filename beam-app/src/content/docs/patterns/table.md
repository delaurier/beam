---
title: Table in a card
description: A title bar with tools, a header row, and rows that read as data until one is opened for editing.
---

## Import

```tsx
import { SalesTable } from "@/components/patterns/sales-table";
import { TableCard, TableHead, TableRow } from "@/components/patterns/data-table";
```

## Examples

### Read first, edit on demand

Press Edit, double-click a row, or focus it and press Enter. One row is open at a time. Try typing letters into Bushels and saving.

```demo
table/sales
```

### With difficult data

A very long name truncates; a very large number keeps its column; a zero still reads as a value, and a sale under break-even turns its margin red.

```demo
table/worst-case
```

### Empty

Says what is missing and what to do next.

```demo
table/empty
```

### Rows in groups

Each heading carries its group's subtotal. Click a heading to open or close it.

```demo
table/groups
```

## Building one

`EditableTable` takes a list of columns. A column with `edit` becomes an input while its row is open; a column with `preview` is computed from what is being typed and stays as text.

```tsx
import { EditableTable, type EditColumn } from "@/components/patterns/editable-table";

const columns: EditColumn<Field>[] = [
  { key: "name", label: "Field", minWidth: 180, cell: (f) => <Txt>{f.name}</Txt>, edit: { kind: "text", get: (f) => f.name } },
  { key: "acres", label: "Acres", width: 80, align: "right", cell: (f) => <Num>{f.acres}</Num>, edit: { kind: "number", get: (f) => String(f.acres) } },
];
```

`onSave` receives the typed values. Return a sentence to keep the row open and show it; return nothing to accept.

## Rules

- Numbers are right-aligned in the data font so they compare down a column.
- Columns have fixed lanes. Only one column, the name, takes the remaining width and truncates.
- Computed values stay as text while a row is being edited.
- In a narrow space the table scrolls sideways. Lanes are never squeezed.
- The primary action lives in the title bar, once.
- Enter saves the open row and Escape cancels it.
- Delete sits under the open row and asks once before it removes anything.
