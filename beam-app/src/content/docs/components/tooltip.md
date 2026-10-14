---
title: Tooltip
description: A short label that appears when a control is hovered or focused.
---

## Import

```tsx
import { Tooltip } from "@/components/ui/tooltip";
```

## Examples

### Basic

```demo
tooltip/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `label` | string | Keep it to a few words. |
| `children` | element | The control it describes. |

## Accessibility

- It appears on keyboard focus as well as hover.
- Never put something a person needs in a tooltip alone.

## Tokens used

`--bg-inverse`, `--text-inverse`, `--radius-s`, `--space-xxs`, `--space-xs`, `--motion-popup-scale`.

## Follows

The **Tooltip** assignment in `gui/themes/beam-components.md`.
