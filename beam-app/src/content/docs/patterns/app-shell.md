---
title: App shell
description: The frame every Beam screen sits in: sidebar, top bar and page header.
---

## Import

```tsx
import { AppShell, PageHeader } from "@/components/patterns/app-shell";
```

## See it

The shell is a whole page, so it is shown on the real screens. Start at the [Overview](/app).

## Parts

| Part | What it holds |
| --- | --- |
| Sidebar | Farm name, quick search, six areas with one open, Settings and Collapse |
| Top bar | Season, the Add menu, the account |
| Page header | Title, an optional line of facts, the page's actions |

## Behaviour

- Quick search lists every page. Press ⌘K (Ctrl K on Windows) to reach it from anywhere.
- One group is open at a time: the current page's, until you open another.
- Collapse hides the sidebar. A button at the left of the top bar brings it back.
- Below the `lg` breakpoint the sidebar becomes a drawer, opened from the top bar.
- The Add menu goes to the page that owns the thing and opens its form.

## Rules

- Exactly one page is current, in the navigation-active pair.
- The page header has no label above the title. The sidebar already says where you are.
- Something that cannot be changed is text, not a control. The farm name and the season are text until there is more than one to choose from.
- `src/app/app/layout.tsx` wraps every product screen in `BeamScope`, so it uses Beam's tokens, not this guide's.
