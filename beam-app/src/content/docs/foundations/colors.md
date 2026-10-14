---
title: Colors
description: The neutral ramp, the palette and status colours, and the roles components use to refer to them.
---

Colour has two layers. Primitives are the raw ramp and palette. Roles are names for a job, such as "the fill of an input", and each one points at a primitive. Components use roles.

## Neutrals

Ten steps, defined once per mode. Step 1 is the page and step 10 is the strongest text, in both modes, so a role such as `--text: var(--neutral-10)` is correct without knowing which mode is active.

```demo
colors/neutrals
```

The dark ramp starts at `#0f0f0f`, not pure black, and the other steps are rebased on it. See [Theming](/docs/foundations/theming).

## Palette and status

The palette and status colours are the same in both modes. Each has a 20% counterpart, named with a `-transparent` suffix and derived live from the solid colour.

```demo
colors/palette
```

- `color-1` is the accent: the primary action, checked states and the current page.
- `color-2` to `color-4` are for categories in charts and lists. They carry no meaning on their own.
- `color-2` and `success` are the same green, and `color-1` is close to `error`. Do not rely on colour alone to tell a category from a status.

## Roles

The Maps to column shows the current mode. Switch modes with the toggle in the top bar.

```demo
colors/roles
```

## Using colour

```tsx
<div className="bg-canvas text-fg">
  <p className="text-fg-muted">14 sensors reporting.</p>
  <button className="bg-accent text-fg-on-accent">Add sensor</button>
</div>
```

- Text on `bg-accent` and `bg-danger` uses `text-fg-on-accent`.
- The current page in navigation uses `bg-nav-active` with `text-nav-active-fg`.
- A transparent token is a colour at 20%, not a muted tint. Do not fade a whole component to get one.
