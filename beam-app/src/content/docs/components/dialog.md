---
title: Dialog
description: Interrupts to confirm something that matters.
---

## Import

```tsx
import { Dialog } from "@/components/ui/dialog";
```

## Examples

### Confirm

Opens centred over a backdrop. Escape or Cancel closes it.

```demo
dialog/confirm
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `trigger` | element | The button that opens it. |
| `title` | string | A question naming the thing affected. |
| `description` | string | What will happen. |
| `confirmLabel` | string | A verb, matching the title. |
| `confirmVariant` | `primary`, `danger` |  |

## Accessibility

- Focus moves into the dialog and returns to the trigger when it closes.
- Escape closes it.
- A dialog stays centred and does not scale from its trigger.

## Tokens used

`--bg-popover`, `--bg-backdrop`, `--border-default-color`, `--text`, `--text-muted`, `--radius-m`, `--space-l`, `--space-s`, `--motion-large-duration`, `--motion-large-easing`.

## Follows

The **Dialog** assignment in `gui/themes/beam-components.md`.
