---
title: Project structure
description: Where tokens, components, documentation and theme guidance live in the repository.
---

## Folders

| Path | Holds |
| --- | --- |
| `src/styles/tokens.css` | Every token definition, for both modes. The only place literal values belong. |
| `src/app/globals.css` | Tailwind setup: maps utilities to the tokens and defines the edge and motion utilities. |
| `src/components/ui/` | Shared components built to the theme's assignments. |
| `src/components/docs/` | The pieces of this site: sidebar, Markdown renderer, live examples. |
| `src/content/docs/` | These pages, as Markdown. One file per page. |
| `src/lib/tokens.ts` | Token names and descriptions used by the documentation. |
| `src/lib/docs.ts` | Navigation and the page loader. |
| `GUI.md`, `gui/` | The theme export and its rules. The reference the tokens were taken from. |
| `.agents/skills/` | Three skills for building, converting and auditing UI against the theme. |

## How a page is made

A page is a Markdown file with a title and description at the top. A fenced block marked `demo` names a live example registered in `src/components/docs/demos.tsx`:

````md
```demo
colors/neutrals
```
````

In the browser that block renders the example. In the Markdown view it is replaced by the same data as a table, so the two never disagree about which tokens exist.

## Adding a page

1. Add the Markdown file under `src/content/docs/<group>/`.
2. Add its entry to `NAV` in `src/lib/docs.ts`.

The page, its Markdown view and its line in `llms.txt` follow from those two steps.
