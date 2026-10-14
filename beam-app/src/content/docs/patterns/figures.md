---
title: Bars and gauges
description: Small figures that sit inside a table cell or a metric: a share bar, a range gauge, a split bar, a sparkline.
---

## Import

```tsx
import { DotLabel, Legend, RangeGauge, ShareBar, Sparkline } from "@/components/patterns/figures";
import { SplitBar } from "@/components/patterns/metric-strip";
```

## Examples

### Share bar

One row's part of a total.

```demo
figures/share-bar
```

### Range gauge

Where a value sits against the range that counts as healthy.

```demo
figures/range-gauge
```

## Rules

- A figure never replaces the number. The value is always stated beside it.
- Colours come from the palette or status tokens and are passed as CSS variables, such as `var(--color-1)`.
- A range gauge has a text label that states the value and the healthy range, for people who cannot see it.
- A sparkline is decoration for a value already on screen. It is hidden from assistive technology.
