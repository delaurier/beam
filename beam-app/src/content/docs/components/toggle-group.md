---
title: Toggle group
description: A small set of options where one is pressed, such as a time range.
---

## Import

```tsx
import { ToggleGroup } from "@/components/ui/toggle-group";
```

## Examples

### Basic

```demo
toggle-group/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `options` | string[] |  |
| `defaultValue` | string |  |
| `aria-label` | string | Required. |

## Accessibility

- Each option reports whether it is pressed.

## Tokens used

`--bg-highlight`, `--text`, `--radius-s`, `--space-xxs`, `--space-xs`, `--space-s`.

## Follows

The **Toggle group** assignment in `gui/themes/beam-components.md`.
