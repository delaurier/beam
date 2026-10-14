---
title: Tabs
description: Splits one panel of content into named sections.
---

## Import

```tsx
import { Tabs } from "@/components/ui/tabs";
```

## Examples

### Basic

The selected tab is coral in dark and black in light, as the theme defines.

```demo
tabs/basic
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `tabs` | { value, label, content, disabled? }[] |  |
| `defaultValue` | string | Defaults to the first tab. |

## Accessibility

- Arrow keys move between tabs.
- For switching views of a whole page, use the View switch.

## Tokens used

`--border`, `--text-subtle`, `--text-selected`, `--text-secondary`, `--space-l`, `--space-xs`.

## Follows

The **Tabs** assignment in `gui/themes/beam-components.md`.
