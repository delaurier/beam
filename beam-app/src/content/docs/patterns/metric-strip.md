---
title: Metric strip
description: One bordered panel divided into cells, each a label and a value.
---

## Import

```tsx
import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";
```

## Examples

### Basic

A wide cell can carry a bar and no number.

```demo
metric-strip/basic
```

## Rules

- Four to six cells. More than that belongs in a table.
- A cell's note adds a fact the value does not already state.
- Use `tone` only for a real state: a margin that is positive, a count that needs attention.
- Do not repeat a number that is already in the table header below.
