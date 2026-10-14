---
title: View switch
description: Switches between views of the same thing, such as a crop's budget, marketing and inputs.
---

## Import

```tsx
import { ViewSwitch } from "@/components/ui/toggle-group";
```

## Examples

### Basic

```demo
view-switch/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `options` | string[] |  |
| `defaultValue` | string |  |
| `aria-label` | string | Required. |

## Accessibility

- Each option is a toggle button and reports whether it is pressed.
- The pressed option differs by fill and by text colour, not by colour alone.

## Tokens used

`--border`, `--bg-highlight`, `--bg-hover`, `--text`, `--text-muted`, `--radius-s`, `--space-xxs`, `--space-xs`, `--space-s`.

## Follows

The **Toolbar, with the local change listed on Theming** assignment in `gui/themes/beam-components.md`.
