---
title: Overview
description: Every component that exists, where it lives, and the theme assignment it follows.
---

Each component is built to its assignment in `gui/themes/beam-components.md`, on Base UI where a primitive exists, using existing tokens only. Every page shows the component live, with its states.

| Component | File | Follows |
| --- | --- | --- |
| [Button](/docs/components/button) | `ui/button.tsx` | Button |
| [Text field](/docs/components/text-field) | `ui/` | Text field |
| [Select](/docs/components/select) | `ui/` | Select |
| [Menu](/docs/components/menu) | `ui/` | Menu |
| [Checkbox](/docs/components/checkbox) | `ui/` | Checkbox |
| [Radio group](/docs/components/radio-group) | `ui/` | Radio group |
| [Switch](/docs/components/switch) | `ui/` | Switch |
| [Navigation](/docs/components/navigation) | `ui/` | Navigation |
| [View switch](/docs/components/view-switch) | `ui/` | View switch |
| [Tabs](/docs/components/tabs) | `ui/` | Tabs |
| [Toggle group](/docs/components/toggle-group) | `ui/` | Toggle group |
| [Avatar](/docs/components/avatar) | `ui/` | Avatar |
| [Slider, progress, meter](/docs/components/slider-progress-meter) | `ui/` | Slider, progress, meter |
| [Tooltip](/docs/components/tooltip) | `ui/` | Tooltip |
| [Dialog](/docs/components/dialog) | `ui/` | Dialog |
| [Toast](/docs/components/toast) | `ui/` | Toast |
| [Accordion](/docs/components/accordion) | `ui/` | Accordion |
| [Popover](/docs/components/popover) | `ui/` | Popover |
| [Number field](/docs/components/number-field) | `ui/` | Number field |
| [Combobox](/docs/components/combobox) | `ui/` | Combobox |
| [Scroll area](/docs/components/scroll-area) | `ui/` | Scroll area |

## How a component is built

1. Read its assignment, for both modes and every state.
2. Build it with existing tokens only.
3. Draw every state on its page.
4. Audit it before it is used on a screen.
