---
title: AI and LLMs
description: How to give these docs to a coding agent, and the rules an agent should follow in this repository.
---

These pages are written to be read by models as well as people. Each one exists as clean Markdown, there is an index, and the whole set is available as one file.

## Ways to give the docs to a model

| Source | URL | Use it when |
| --- | --- | --- |
| Index | `/llms.txt` | The agent can browse. It gets one line per page and fetches what it needs. |
| Everything | `/llms-full.txt` | You want the model to know the whole system up front. |
| One page | `/md/<group>/<page>` | You are working on one thing. |
| Copy page | Button in every page header | You want the Markdown on your clipboard. |

## In the repository

- `AGENTS.md` is read by coding agents at the start of a session. It points to `GUI.md`.
- `GUI.md` and `gui/` hold the theme reference and its rules.
- `.agents/skills/` holds `graphical-ui`, `graphical-convert` and `graphical-audit`.

## Rules block for coding agents

Paste this into an agent's instructions if it cannot read `AGENTS.md`.

```md
You are working in the Beam app (Next.js 16, React 19, Tailwind CSS 4).

- Read GUI.md before any UI work. Use the graphical-ui skill for building,
  graphical-convert for applying the theme, graphical-audit for finding drift.
- Tokens are defined once, in src/styles/tokens.css. Never write a literal
  colour, font size, weight, radius or internal spacing value at a use site.
- Use the mapped utilities: bg-canvas, text-fg-muted, p-m, gap-s, rounded-s,
  text-m, font-ui, font-ui-medium. Numeric spacing is for structural layout only.
- Edges are box-shadows: edge, edge-inset, edge-solid, divider-b. No CSS borders.
- A text style is complete: font role, weight, size (which carries line height
  and tracking).
- Motion uses --motion-duration and --motion-easing for small controls and the
  --motion-large pair for dialogs, drawers and panels. Honour reduced motion.
- Icons come from lucide-react at stroke width 2.5, through the Icon component.
- Prefer an existing component in src/components/ui. A missing token or
  component is a gap to report, not something to approximate.
- This Next.js version differs from older ones. Read
  node_modules/next/dist/docs before writing framework code.
```

## Reviewing what an agent produced

- No literal colours, sizes or weights outside `tokens.css`.
- No Tailwind default utilities such as `text-sm`, `rounded-md` or `bg-gray-100`; they do not exist here and will silently do nothing.
- Every state that exists is drawn: hover, focus, disabled, selected.
- Nothing on the screen repeats a fact that is already shown somewhere else on it.
