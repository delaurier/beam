---
title: Edges and elevation
description: Edges are drawn with box-shadows, not borders, and surfaces carry no drop shadow.
---

## Edges

Every visible edge is a box-shadow. Native border width is zero everywhere. An edge drawn this way does not change the size of the element, so adding or removing one never shifts layout.

```demo
edges/samples
```

| Utility | Use |
| --- | --- |
| `edge` | Inputs, selects, popovers, secondary buttons. Outside, in the default edge colour. |
| `edge-inset` | Filled buttons and checkboxes. Inside, in the default edge colour. |
| `edge-solid` | Outline buttons and cards. Inside, in `--border`. |
| `divider-b`, `divider-t`, `divider-r`, `divider-l` | A rule on one side: table rows, bars, the sidebar. |

The default edge colour is black at 10% in light and white at 20% in dark. It is translucent so it reads on any fill.

## Focus

Keyboard focus is a 2px outline in `--focus-ring`, set once for `:focus-visible`. It is separate from the edge and is never replaced by a hover or selected style.

## Elevation

The theme's three shadows are authored at zero opacity. Popovers, dialogs and toasts are flat and are separated from the page by their fill and edge. The tokens `--shadow-s`, `--shadow-m` and `--shadow-l` exist so elevation can be turned on in one place later.
