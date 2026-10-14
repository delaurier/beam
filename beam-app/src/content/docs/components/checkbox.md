---
title: Checkbox
description: Turns one option on or off, or shows that a group is partly selected.
---

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox";
```

## Examples

### States

Off, on, indeterminate and disabled.

```demo
checkbox/states
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `defaultChecked / checked` | boolean |  |
| `indeterminate` | boolean | For a parent of a partly selected group. |
| `disabled` | boolean |  |

## Accessibility

- The whole label is the click target.
- Space toggles it.

## Tokens used

`--bg-control`, `--accent`, `--text-on-accent`, `--border-default-color`, `--bg-disabled`, `--radius-xs`, `--space-l`.

## Follows

The **Checkbox** assignment in `gui/themes/beam-components.md`.
