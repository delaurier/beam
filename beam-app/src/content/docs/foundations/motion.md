---
title: Motion
description: Two timing roles, when each applies, and the rules for adding motion at all.
---

## Roles

```demo
motion/curves
```

| Role | Utility | Applies to |
| --- | --- | --- |
| Small | `motion-small` | Buttons, menus, small popovers, hover and press feedback |
| Large | `motion-large` | Dialogs, drawers, toasts, navigation surfaces, disclosure panels |

```tsx
<button className="transition-colors motion-small hover:bg-hover">...</button>
```

Name the properties that change. `transition-colors` or `transition-transform`, never `transition-all`.

## Press and popups

- A pressed button moves down by `--motion-press-distance`, 1px.
- A popup scales from `--motion-popup-scale`, 0.96, and from the control that opened it. Nothing scales from zero.

## Before adding motion

1. **Should it move at all?** Something done hundreds of times a day, or driven from the keyboard, gets no animation.
2. **What is it for?** Showing where something came from, confirming an action, or keeping context through a change. If none apply, leave it still.
3. **Which role?** Small for controls, large for surfaces.

## Rules

- Animate `transform` and `opacity`. Animating size or position causes layout work on every frame.
- Use these tokens. Do not introduce another curve or duration.
- Reduced motion is honoured globally: transitions and animations are cut to zero when the system asks for it.
- A keyboard focus indicator appears immediately and is never animated in.
