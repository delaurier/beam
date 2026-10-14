---
title: Navigation
description: The sidebar list: headings that open to show their pages, with the current page marked.
---

## Import

```tsx
import { NavGroup, NavLink, NavList } from "@/components/ui/navigation";
```

## Examples

### Sidebar

```demo
navigation/sidebar
```

## API reference

| Prop | Type | Notes |
| --- | --- | --- |
| `current` | boolean | On `NavLink`. Sets `aria-current` and the coral fill. |
| `nested` | boolean | Indents a link under its group. |
| `open` | boolean | On `NavGroup`. |

## Accessibility

- The current page is announced through `aria-current`, not only by colour.
- Group headings are buttons and report whether they are open.

## Tokens used

`--navigation-active-background`, `--navigation-active-foreground`, `--bg-highlight`, `--text`, `--text-muted`, `--radius-s`, `--space-xs`, `--space-s`, `--space-xxl`.

## Follows

The **Navigation menu, with the current-page change listed on Theming** assignment in `gui/themes/beam-components.md`.
