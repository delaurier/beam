---
title: Introduction
description: What the Beam design system is, where it lives, and the order it is being built in.
---

Beam is farm management software: crops, land, machinery and finance for one farm and one season at a time. This site is its design system, and it lives inside the same Next.js app that will hold the product. The tokens on these pages are the ones the product uses.

## What is here today

- **Foundations.** Colour, typography, spacing, radius, edges, theming, icons and motion are defined in code, in light and dark.
- **This documentation.** Every page is also plain Markdown, so a coding agent can read exactly what you read.

Components, patterns and the product screens are not built yet. [Components](/docs/components/overview) and [Patterns](/docs/patterns/overview) list what is planned.

## The order of work

1. Foundations, locked before anything is built on them.
2. Components, each built to the theme's assignment for it.
3. One screen, iterated until the direction is right.
4. One full flow, end to end.
5. The rest of the app.

## Where the design came from

The visual language was worked out as static screens first: seven dark screens and a component sheet. The values on this site match those screens. Three decisions from that work differ from the exported theme and are recorded on [Theming](/docs/foundations/theming).

## Rules every screen follows

- Use only the tokens documented here. If no token fits, that is a gap to report, not a value to invent.
- Draw edges with box-shadows. Native border width stays at zero.
- Keep text roles complete: font, weight, size, line height and tracking together.
- Build the smallest complete interface. A title needs no subtitle; a number needs no decoration.
- Tables read as data first and become editable on demand.
