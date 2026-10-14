---
title: Overview
description: The eight foundations every Beam screen is built from, and the rules that apply to all of them.
---

## The foundations

| Foundation | What it defines |
| --- | --- |
| [Colors](/docs/foundations/colors) | A ten-step neutral ramp per mode, four palette colours, three status colours, and the roles that use them |
| [Typography](/docs/foundations/typography) | Four font roles, three weights, seven text steps |
| [Spacing and radius](/docs/foundations/spacing-and-radius) | Seven spacing steps and seven radii |
| [Edges and elevation](/docs/foundations/edges-and-elevation) | How edges are drawn, and why surfaces are flat |
| [Theming](/docs/foundations/theming) | Light and dark, how they switch, and local changes to the exported theme |
| [Icons](/docs/foundations/icons) | Lucide, outlined, 2.5 stroke |
| [Motion](/docs/foundations/motion) | Two timing roles and when each applies |

## Rules that apply to all of them

- **One definition.** Each value is defined once in `src/styles/tokens.css` and referenced by name everywhere else.
- **Names at use sites.** A component says `p-m`, never `11px`. A value copied from this site into a component stops following the theme.
- **Roles before raw steps.** Reach for `bg-control` or `text-fg-muted` first. Use a raw `--neutral-4` only when no role describes what you are drawing.
- **Gaps are reported.** If nothing fits, say so. Do not add a token to get past a single screen.

## What the theme does not define

Three things are missing from the exported theme and are filled with spacing tokens until real values exist:

- **Control sizes.** Checkboxes and radios are `--space-l` square. Tracks are `--space-xs` tall.
- **Icon sizes.** 16px inline with text, 20px standalone.
- **Placeholder text colour.** `--text-subtle`.
