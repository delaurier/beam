---
title: Radio group
description: Picks exactly one of a few options that are all visible.
---

## Import

```tsx
import { Radio, RadioGroup } from "@/components/ui/radio";
```

## Examples

### Group

```demo
radio/group
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `defaultValue / value` | string | On the group. |
| `value` | string | On each radio. |
| `disabled` | boolean |  |

## Accessibility

- Give the group an `aria-label` or a visible legend.
- Arrow keys move the selection within the group.

## Tokens used

`--bg-control`, `--accent`, `--border-default-color`, `--bg-disabled`, `--radius-full`, `--space-l`, `--space-s`.

## Follows

The **Radio and Radio group** assignment in `gui/themes/beam-components.md`.
