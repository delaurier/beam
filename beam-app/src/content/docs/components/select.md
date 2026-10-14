---
title: Select
description: Picks one value from a short list.
---

## Import

```tsx
import { Select } from "@/components/ui/select";
```

## Examples

### Basic

Open it with the mouse or the keyboard. The selected option carries a check.

```demo
select/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `label` | string |  |
| `options` | { value, label, disabled? }[] |  |
| `defaultValue` | string |  |
| `disabled` | boolean |  |

## Accessibility

- Arrow keys move, Enter selects, Escape closes, typing jumps to a match.
- The popup opens from the control and scales from 0.96, never from zero.
- The popup carries the current mode itself, because it renders outside the page.

## Tokens used

`--bg-control`, `--bg-popover`, `--bg-highlight`, `--bg-surface`, `--border-default-color`, `--radius-s`, `--radius-xs`, `--space-xxs`, `--space-xs`, `--motion-popup-scale`.

## Follows

The **Select** assignment in `gui/themes/beam-components.md`.
