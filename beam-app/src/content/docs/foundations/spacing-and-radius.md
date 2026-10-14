---
title: Spacing and radius
description: Seven spacing steps for padding and gaps, and seven radii for corners.
---

## Spacing

The steps are not a multiple of anything: 3, 6, 9, 11, 17, 23, 34. Use them by name.

```demo
spacing/scale
```

```tsx
<div className="flex flex-col gap-m p-l">...</div>
```

### What takes a spacing token

Padding, gaps and margins inside and between components. Also the fixed sizes the theme does not define: a checkbox is `size-(--space-l)`.

### What does not

Structural layout: a sidebar width, a column track, a maximum line length. Those are decisions about the page and use ordinary numeric utilities such as `w-62` or `max-w-[68ch]`.

## Radius

```demo
radius/scale
```

Controls use `rounded-s`. Cards, popovers and dialogs use `rounded-m`. Tracks, dots and avatars use `rounded-full`.
