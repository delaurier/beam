---
title: Icons
description: Lucide, outlined, drawn at a 2.5 stroke, in two sizes.
---

## The set

Icons come from Lucide through `lucide-react`. Always use the `Icon` wrapper: it applies the theme's stroke width and hides decorative icons from assistive technology.

```demo
icons/samples
```

## Usage

```tsx
import { Plus } from "lucide-react";
import { Icon } from "@/components/icon";

<Icon icon={Plus} />
<Icon icon={Plus} size={20} />
<Icon icon={Plus} label="Add field" />
```

## Rules

- **Sizes.** 16px next to text and inside controls. 20px standalone. The theme does not define icon sizes, so these two are the convention.
- **Colour.** An icon takes the colour of its text. Do not colour an icon separately from its label.
- **Stroke.** 2.5 everywhere. Lucide supplies outlines only, so there is no filled style.
- **Labels.** An icon-only button needs an accessible name. A decorative icon needs none.
- **Meaning.** Use an icon when it marks an action or a real category. Do not add one to decorate a heading.
