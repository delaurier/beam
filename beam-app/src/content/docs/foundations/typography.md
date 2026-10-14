---
title: Typography
description: Font roles, weights and the seven text steps, and how to apply a complete text style.
---

## Font roles and weights

Geist carries the interface. Geist Mono carries data: numbers in tables, dates, token names.

```demo
type/fonts
```

Each role has its own three weight tokens, such as `--weight-ui-medium` and `--weight-data-medium`. They share values today. They are separate so one role can change without moving the others.

The 800 weight is defined but not used in the product. Titles and values are 600.

## Scale

Each step sets size, line height and tracking together. Large steps tighten; small steps open slightly.

```demo
type/scale
```

## Applying a text style

A text style has three parts: font role, weight and size. The size utility brings its line height and tracking with it.

```tsx
<h1 className="font-brand text-xl font-brand-medium">Fields</h1>
<p className="font-ui text-m font-ui-regular text-fg-muted">20 fields, 4,725 acres</p>
<td className="font-data text-m font-data-regular">$298.38</td>
```

## Rules

- Do not set a size without its role and weight.
- Use `font-data` for anything a reader compares down a column.
- Body text wraps with `text-wrap: pretty`, set once on `body`. Do not add manual line breaks.
- Avoid `xxs` for running text.
