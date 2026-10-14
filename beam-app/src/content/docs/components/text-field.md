---
title: Text field
description: A single line of text with a label, and either a description or an error.
---

## Import

```tsx
import { TextField } from "@/components/ui/text-field";
```

## Examples

### States

Rest, placeholder, invalid and disabled.

```demo
text-field/states
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `label` | string | Always visible. Never use a placeholder as the label. |
| `description` | string | Help text under the control. |
| `error` | string | Replaces the description and marks the field invalid. |
| `disabled` | boolean |  |

## Accessibility

- The label is tied to the input, so clicking it focuses the field.
- An error is text, not only a red edge.
- Focus shows the 2px outline.

## Tokens used

`--bg-control`, `--border-default-color`, `--danger`, `--text`, `--text-muted`, `--text-subtle`, `--bg-disabled`, `--text-disabled`, `--radius-s`, `--space-xs`, `--space-s`.

## Follows

The **Text field and Field** assignment in `gui/themes/beam-components.md`.
