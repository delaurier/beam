---
title: Switch
description: Turns a setting on or off, taking effect immediately.
---

## Import

```tsx
import { Switch } from "@/components/ui/switch";
```

## Examples

### States

On, off and disabled. Only the thumb moves.

```demo
switch/states
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `defaultChecked / checked` | boolean |  |
| `disabled` | boolean |  |

## Accessibility

- Use a switch when the change applies at once. Use a checkbox inside a form that is saved.
- Space toggles it.

## Tokens used

`--bg-track`, `--accent`, `--bg-thumb`, `--bg-disabled`, `--radius-s`, `--radius-xs`, `--space-xl`, `--space-l`, `--space-xxs`.

## Follows

The **Switch** assignment in `gui/themes/beam-components.md`.
