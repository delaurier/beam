---
title: Slider, progress, meter
description: Three bars: one you drag, one that reports a task, one that reports a reading.
---

## Import

```tsx
import { Meter, Progress, Slider } from "@/components/ui/measures";
```

## Examples

### All three

Drag the slider or use the arrow keys.

```demo
measures/all
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `label` | string | All three. |
| `defaultValue` | number | Slider. |
| `value` | number | Progress and Meter, 0 to 100. |
| `tone` | `default`, `low`, `high` | Meter. Low is warning, high is danger. |
| `note` | string | Meter. Says in words what the tone means. |

## Accessibility

- A meter's tone is always backed by a word, such as "low".
- The slider thumb is reachable and adjustable from the keyboard.

## Tokens used

`--bg-surface-muted`, `--accent`, `--warning`, `--danger`, `--bg-control`, `--border-default-color`, `--radius-full`, `--space-xs`, `--space-l`.

## Follows

The **Slider, Progress and Meter** assignment in `gui/themes/beam-components.md`.
