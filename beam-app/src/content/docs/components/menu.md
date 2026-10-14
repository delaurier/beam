---
title: Menu
description: A list of actions that opens from a button.
---

## Import

```tsx
import { Menu } from "@/components/ui/menu";
```

## Examples

### Basic

A heading, actions, a disabled action and a separator.

```demo
menu/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `trigger` | node | The button label. |
| `heading` | string | Optional group label. |
| `items` | ({ label, disabled?, onSelect? } \| "separator")[] |  |

## Accessibility

- Arrow keys move between actions; disabled actions are skipped.
- Use a menu for actions. Use Select to choose a value.

## Tokens used

`--bg-popover`, `--bg-highlight`, `--border`, `--border-default-color`, `--text-subtle`, `--radius-m`, `--radius-xs`.

## Follows

The **Menu** assignment in `gui/themes/beam-components.md`.
