---
title: Theming
description: How light and dark work, how to scope a mode to part of a page, and where Beam differs from the exported theme.
---

## Modes

The mode is the `data-theme` attribute on `<html>`: `light` or `dark`. Dark is the default. The toggle in the top bar switches it and remembers the choice.

Token names do not change between modes. `--neutral-1` is the page in both. That is why a component never needs a dark variant: it refers to roles, and the roles resolve differently.

```demo
theming/modes
```

## Scoping a mode

Any element can carry `data-theme`. Everything inside it resolves against that mode, as the two panels above do.

```tsx
<aside data-theme="dark">...</aside>
```

A portal renders outside the element that opened it, so it does not inherit a scoped mode. Give the portal container the same attribute.

## What differs between modes

| Token | Light | Dark |
| --- | --- | --- |
| `--neutral-1` to `--neutral-10` | White to black | `#0f0f0f` to white |
| `--bg-control`, `--bg-popover` | `neutral-1` | `neutral-2` |
| `--bg-backdrop` | `neutral-10` at 20% | `neutral-1` at 20% |
| `--text-selected` | `neutral-10` | `color-1` |
| `--border-default-color` | Black at 10% | `neutral-10` at 20% |

Everything else is identical.

## Local changes to the exported theme

The exported theme is the reference in `gui/themes/beam.md`. These are deliberate differences. They take precedence over the export.

| Change | Exported | Beam | Why |
| --- | --- | --- | --- |
| Dark neutral ramp | Starts at `#000000` | Starts at `#0f0f0f`, other steps rebased proportionally | Pure black read as too harsh |
| Default edge colour in dark | Black at 10% | `neutral-10` at 20% | The exported value is invisible on a dark page |
| Current page in navigation | Selected link on `neutral-3` | `--navigation-active-background` with black text | The theme defines the coral pair; it is used |
| View switch | Toolbar group with a fill | No group fill, solid edge, unpressed labels muted | The authored pressed state was hard to tell from its neighbours |
| Status colours as text, light mode | The status colour itself | `--text-success`, `--text-warning`, `--text-danger`: the status colour mixed toward the text colour | Green and amber text could not be read on white. Fills and dots still use the pure colour, and dark mode is unchanged |

## This site's own background

The documentation sits on a neutral charcoal, defined in `src/styles/guide.css`. Those values are not Beam tokens and must not be used in the product. Every live example is drawn inside a stage that restores Beam's real colours, so what you see in a stage is what the product draws. A stage, a product screen and every popup carry the `data-beam` attribute, which restores Beam's values in the page's current mode.

## Not yet reviewed

Light mode is defined and switches correctly, but only dark has been designed against real screens.
