---
title: Button
description: Starts an action. Five variants, one size, with optional icons before or after the label.
---

Use a button for an action: add, save, export, remove. For navigation, use `ButtonLink`, which is a real link with the same look.

## Import

```tsx
import { Button, ButtonLink, ButtonIcon } from "@/components/ui/button";
```

## Usage

```tsx
<Button variant="primary">Add sale</Button>
<Button variant="outline" disabled>Firm offers</Button>
```

`variant` defaults to `outline`.

## Examples

### Variants

```demo
button/variants
```

### With icons

```demo
button/with-icons
```

### States

Hover, keyboard focus and disabled. Pressing a button moves it down by 1px.

```demo
button/states
```

### Icon only

```demo
button/icon-only
```

### As a link

```demo
button/as-link
```

### In context

```demo
button/in-context
```

## API reference

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `primary`, `secondary`, `outline`, `ghost`, `danger` | `outline` | |
| `iconOnly` | boolean | `false` | Square padding. Wrap the icon in `ButtonIcon`. |
| `disabled` | boolean | `false` | Native attribute. Not available on `ButtonLink`. |
| `href` | string | | `ButtonLink` only. |

All other props pass through to the `button` element or to `next/link`.

## Specs

| Part | Value |
| --- | --- |
| Radius | `--radius-s` |
| Padding | `--space-xs` vertical, `--space-m` horizontal |
| Gap between icon and label | `--space-xs` |
| Text | `ui`, medium, size `m` |
| Icon | 16px |
| Height | 33px, from the text line and padding. It is not set directly. |

## Accessibility

- A button is a native `button`; a link is a native `a`. Never put a click handler on a `div`.
- An icon-only button needs `aria-label`.
- Focus shows a 2px outline and is never removed.
- A disabled button cannot be focused. If the reason matters, say it next to the button.

## Do and don't

- **Do** use one primary button per surface.
- **Do** write the label as a verb and its object: "Add sale", "Remove field".
- **Don't** use `danger` for Cancel. Danger means the action destroys something.
- **Don't** colour or size a button with one-off classes. Pick a variant.
- **Don't** use a button to navigate. Use `ButtonLink`.

## Tokens used

`--accent`, `--accent-muted`, `--danger`, `--text`, `--text-on-accent`, `--text-disabled`, `--bg-hover`, `--bg-hover-strong`, `--bg-disabled`, `--border`, `--border-default-color`, `--radius-s`, `--space-xs`, `--space-m`, `--motion-duration`, `--motion-easing`, `--motion-press-distance`.

## Known gap

White text on the coral fill in light mode is about 2.9:1, below the 4.5:1 that body text needs. It follows the exported theme. Dark mode uses near-black text and passes.
