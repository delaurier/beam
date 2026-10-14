---
title: Toast
description: A brief message that confirms something happened, then goes away.
---

## Import

```tsx
import { Toast, type ToastMessage } from "@/components/docs/toast";
```

## Examples

### Basic

Appears bottom right and leaves after about two seconds.

```demo
toast/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `message` | { id, title, description? } \| null | Change the `id` to show it again. |

## Accessibility

- It is announced politely and never takes focus.
- Do not put an action someone must take in a toast.

## Tokens used

`--bg-popover`, `--border-default-color`, `--text`, `--text-muted`, `--radius-m`, `--space-m`, `--motion-large-duration`, `--motion-large-easing`.

## Follows

The **Toast** assignment in `gui/themes/beam-components.md`.
