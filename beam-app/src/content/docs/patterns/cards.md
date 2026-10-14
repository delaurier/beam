---
title: Summary cards
description: A titled card of short rows, and the list of things that need a decision.
---

## Import

```tsx
import { AttentionRow, FactRow, SummaryCard } from "@/components/patterns/cards";
```

## Examples

### Summary card

With `href`, the title bar links to the area it summarises.

```demo
cards/summary
```

### Needs attention

Each row links to the place where it is fixed.

```demo
cards/attention
```

## Rules

- Three or four rows. A card is a glance, not a table.
- A fact appears in one card only.
- A row in Needs attention exists only while the problem does. When nothing is wrong the card says so.
