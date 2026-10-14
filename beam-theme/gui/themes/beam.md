# Beam

Generated from the current project, including edits awaiting autosave. Return to the [theme index](../themes.md). Install the selected fonts and icons using the setup below; assets are acquired separately from their official sources.

## Font and icon setup

Follow [asset installation](../assets.md) when implementing this theme. Download and configure the selected free assets from their official sources; no font files or icon artwork are bundled. Weights below are the authored requests: load matching static faces or a variable range and report any unavailable weight. Register the exact family aliases below, or map the role tokens to the loader’s actual family.

| Selected font | Roles | Weights | Family stack | Setup |
| --- | --- | --- | --- | --- |
| <code>Geist</code> (free) | brand, ui, editorial | 500, 600, 800 | <code>"Sidebar Geist", sans-serif</code> | Download and load [Geist](https://vercel.com/font) in the app. |
| <code>Geist Mono</code> (free) | data | 500, 600, 800 | <code>"Sidebar Geist Mono", monospace</code> | Download and load [Geist Mono](https://vercel.com/font) in the app. |

### Icons

Selected: [Lucide](https://lucide.dev/guide/react/getting-started), outlined. Install and wire the selected free pack (React: <code>lucide-react</code>); reuse it if already installed. Use the official adapter for other frameworks.

Preserve icon size, color, weight, style, and accessible names. Match the selected style only where the pack supports it; Lucide’s official pack supplies outlines, so report a filled-style gap rather than claiming exact filled artwork. Keep existing package versions and add only missing packages using the receiving project’s package manager.

## Foundations

```json
{
  "name": "Beam",
  "text": {
    "l": {
      "size": 21,
      "lineHeight": 28
    },
    "m": {
      "size": 14,
      "lineHeight": 21
    },
    "s": {
      "size": 12,
      "lineHeight": 18
    },
    "xl": {
      "size": 32,
      "lineHeight": 35
    },
    "xs": {
      "size": 11,
      "lineHeight": 14
    },
    "xxl": {
      "size": 43,
      "lineHeight": 46
    },
    "xxs": {
      "size": 9,
      "lineHeight": 12
    }
  },
  "fonts": {
    "ui": {
      "family": "\"Sidebar Geist\", sans-serif",
      "weights": {
        "heavy": 800,
        "medium": 600,
        "regular": 500
      }
    },
    "brand": {
      "family": "\"Sidebar Geist\", sans-serif",
      "weights": {
        "heavy": 800,
        "medium": 600,
        "regular": 500
      }
    },
    "editorial": {
      "family": "\"Sidebar Geist\", sans-serif",
      "weights": {
        "heavy": 800,
        "medium": 600,
        "regular": 500
      }
    },
    "data": {
      "family": "\"Sidebar Geist Mono\", monospace",
      "weights": {
        "heavy": 800,
        "medium": 600,
        "regular": 500
      }
    }
  },
  "border": {
    "l": 2,
    "m": 1,
    "s": 1,
    "none": 0
  },
  "radius": {
    "l": 12,
    "m": 6,
    "s": 4,
    "xl": 18,
    "xs": 2,
    "full": 9999,
    "zero": 0
  },
  "shadows": {
    "l": {
      "x": 0,
      "y": 12,
      "blur": 30,
      "color": {
        "dark": "neutral-1",
        "light": "neutral-10"
      },
      "spread": 0,
      "opacity": 0
    },
    "m": {
      "x": 0,
      "y": 8,
      "blur": 24,
      "color": {
        "dark": "neutral-1",
        "light": "neutral-10"
      },
      "spread": 0,
      "opacity": 0
    },
    "s": {
      "x": 0,
      "y": 1,
      "blur": 2,
      "color": {
        "dark": "neutral-1",
        "light": "neutral-10"
      },
      "spread": 0,
      "opacity": 0
    }
  },
  "spacing": {
    "l": 17,
    "m": 11,
    "s": 9,
    "xl": 23,
    "xs": 6,
    "xxl": 34,
    "xxs": 3,
    "zero": 0
  },
  "animation": {
    "large": {
      "easing": [
        0.16,
        1,
        0.3,
        1
      ],
      "duration": 300
    },
    "easing": [
      0.2,
      0.8,
      0.2,
      1
    ],
    "duration": 150,
    "popupScale": 0.96,
    "pressDistance": 1
  },
  "iconStyle": "outlined",
  "iconFamily": "Lucide",
  "neutralTone": "warm",
  "colorEmphasis": 82,
  "letterSpacing": {
    "l": 0.01,
    "m": 0,
    "s": -0.01,
    "xl": 0.02,
    "xs": -0.02
  },
  "primaryForeground": {},
  "primaryActionColor": "color-1"
}
```

## light CSS variables

Define these in the app’s existing theme scope for this mode. Keep component styles linked to the variables.

| Variable | Value |
| --- | --- |
| `--theme-name` | Beam |
| `--theme-icon-family` | Lucide |
| `--theme-icon-style` | outlined |
| `--toolbar-divider-bleed` | 1 |
| `--focus-ring-outline` | 2px solid color-mix(in srgb, #000000 50%, transparent) |
| `--icon-stroke-width` | 2.5 |
| `--icon-light-display` | none |
| `--icon-regular-display` | none |
| `--icon-bold-display` | inline |
| `--motion-duration` | 150ms |
| `--motion-easing` | cubic-bezier(0.2, 0.8, 0.2, 1) |
| `--motion-type` | easing |
| `--motion-visual-duration` | 0.15 |
| `--motion-bounce` | 0.2 |
| `--motion-enabled` | 1 |
| `--motion-small-iterations` | infinite |
| `--motion-large-duration` | 300ms |
| `--motion-large-easing` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--motion-large-type` | easing |
| `--motion-large-visual-duration` | 0.3 |
| `--motion-large-bounce` | 0.2 |
| `--motion-large-iterations` | infinite |
| `--motion-popup-scale` | 0.96 |
| `--motion-press-distance` | 1px |
| `--option-badge-background` | #ff6363 |
| `--option-badge-foreground` | #000000 |
| `--navigation-active-foreground` | #000000 |
| `--emphasis-chart-fill` | #ff6363 |
| `--emphasis-balance-background` | #e864ff |
| `--emphasis-rewards-background` | #76ef6b |
| `--emphasis-icon-background` | #009ff0 |
| `--emphasis-icon-foreground` | #000000 |
| `--emphasis-type-background` | #ff6363 |
| `--emphasis-type-foreground` | #000000 |
| `--navigation-active-background` | #ff6363 |
| `--surface-raised-image` | none |
| `--surface-raised-shadow` | 0 0 0 0 transparent |
| `--surface-recessed-image` | none |
| `--surface-recessed-shadow` | 0 0 0 0 transparent |
| `--space-zero` | 0px |
| `--space-xxs` | 3px |
| `--space-xs` | 6px |
| `--space-s` | 9px |
| `--space-m` | 11px |
| `--space-l` | 17px |
| `--space-xl` | 23px |
| `--space-xxl` | 34px |
| `--tracking-xs` | -0.02em |
| `--tracking-s` | -0.01em |
| `--tracking-m` | 0em |
| `--tracking-l` | 0.01em |
| `--tracking-xl` | 0.02em |
| `--size-xxs` | 9px |
| `--line-xxs` | 12px |
| `--letter-spacing-xxs` | 0.02em |
| `--size-xs` | 11px |
| `--line-xs` | 14px |
| `--letter-spacing-xs` | 0.01em |
| `--size-s` | 12px |
| `--line-s` | 18px |
| `--letter-spacing-s` | 0.01em |
| `--size-m` | 14px |
| `--line-m` | 21px |
| `--letter-spacing-m` | 0em |
| `--size-l` | 21px |
| `--line-l` | 28px |
| `--letter-spacing-l` | -0.01em |
| `--size-xl` | 32px |
| `--line-xl` | 35px |
| `--letter-spacing-xl` | -0.01em |
| `--size-xxl` | 43px |
| `--line-xxl` | 46px |
| `--letter-spacing-xxl` | -0.02em |
| `--radius-zero` | 0px |
| `--radius-xs` | 2px |
| `--radius-s` | 4px |
| `--radius-m` | 6px |
| `--radius-l` | 12px |
| `--radius-xl` | 18px |
| `--radius-full` | 9999px |
| `--border-none` | 0px |
| `--border-s` | 1px |
| `--border-m` | 1px |
| `--border-l` | 2px |
| `--border-default-color` | rgb(0 0 0 / 0.1) |
| `--border-shadow-none` | 0 0 0 0 transparent |
| `--border-shadow-s` | 0 0 0 1px rgb(0 0 0 / 0.1) |
| `--border-shadow-m` | 0 0 0 1px rgb(0 0 0 / 0.1) |
| `--border-shadow-l` | 0 0 0 2px rgb(0 0 0 / 0.1) |
| `--font-ui` | "Sidebar Geist", sans-serif |
| `--weight-ui-regular` | 500 |
| `--weight-ui-medium` | 600 |
| `--weight-ui-heavy` | 800 |
| `--font-brand` | "Sidebar Geist", sans-serif |
| `--weight-brand-regular` | 500 |
| `--weight-brand-medium` | 600 |
| `--weight-brand-heavy` | 800 |
| `--font-editorial` | "Sidebar Geist", sans-serif |
| `--weight-editorial-regular` | 500 |
| `--weight-editorial-medium` | 600 |
| `--weight-editorial-heavy` | 800 |
| `--font-data` | "Sidebar Geist Mono", monospace |
| `--weight-data-regular` | 500 |
| `--weight-data-medium` | 600 |
| `--weight-data-heavy` | 800 |
| `--color-none` | transparent |
| `--color-1` | #ff6363 |
| `--color-1-transparent` | #ff636333 |
| `--color-2` | #76ef6b |
| `--color-2-transparent` | #76ef6b33 |
| `--color-3` | #009ff0 |
| `--color-3-transparent` | #009ff033 |
| `--color-4` | #e864ff |
| `--color-4-transparent` | #e864ff33 |
| `--neutral-1` | #ffffff |
| `--neutral-1-transparent` | #ffffff33 |
| `--neutral-2` | #fafaf9 |
| `--neutral-2-transparent` | #fafaf933 |
| `--neutral-3` | #f2f0ec |
| `--neutral-3-transparent` | #f2f0ec33 |
| `--neutral-4` | #e1ddd5 |
| `--neutral-4-transparent` | #e1ddd533 |
| `--neutral-5` | #cbc5b9 |
| `--neutral-5-transparent` | #cbc5b933 |
| `--neutral-6` | #9b968a |
| `--neutral-6-transparent` | #9b968a33 |
| `--neutral-7` | #716c61 |
| `--neutral-7-transparent` | #716c6133 |
| `--neutral-8` | #4a453b |
| `--neutral-8-transparent` | #4a453b33 |
| `--neutral-9` | #29241b |
| `--neutral-9-transparent` | #29241b33 |
| `--neutral-10` | #000000 |
| `--neutral-10-transparent` | #00000033 |
| `--success` | #76ef6b |
| `--success-transparent` | #76ef6b33 |
| `--warning` | #ffa344 |
| `--warning-transparent` | #ffa34433 |
| `--error` | #ff5263 |
| `--error-transparent` | #ff526333 |
| `--shadow-none` | none |
| `--shadow-s` | 0px 1px 2px 0px #00000000 |
| `--shadow-m` | 0px 8px 24px 0px #00000000 |
| `--shadow-l` | 0px 12px 30px 0px #00000000 |
| `--cte-canvas` | #ffffff |
| `--cte-surface` | #fafaf9 |
| `--cte-surface-muted` | #f2f0ec |
| `--cte-text` | #000000 |
| `--cte-text-muted` | #716c61 |
| `--cte-border` | rgb(0 0 0 / 0.1) |
| `--cte-accent` | #ff6363 |
| `--cte-accent-text` | #000000 |
| `--cte-danger` | #ff5263 |
| `--cte-focus` | #ff6363 |
| `--cte-font` | "Sidebar Geist", sans-serif |
| `--cte-font-size` | 14px |
| `--cte-font-weight` | 500 |
| `--cte-line-height` | 21px |
| `--cte-letter-spacing` | 0em |
| `--cte-detail-font-size` | 14px |
| `--cte-detail-line-height` | 21px |
| `--cte-detail-letter-spacing` | 0em |

## dark CSS variables

Define these in the app’s existing theme scope for this mode. Keep component styles linked to the variables.

| Variable | Value |
| --- | --- |
| `--theme-name` | Beam |
| `--theme-icon-family` | Lucide |
| `--theme-icon-style` | outlined |
| `--toolbar-divider-bleed` | 1 |
| `--focus-ring-outline` | 2px solid color-mix(in srgb, #ffffff 50%, transparent) |
| `--icon-stroke-width` | 2.5 |
| `--icon-light-display` | none |
| `--icon-regular-display` | none |
| `--icon-bold-display` | inline |
| `--motion-duration` | 150ms |
| `--motion-easing` | cubic-bezier(0.2, 0.8, 0.2, 1) |
| `--motion-type` | easing |
| `--motion-visual-duration` | 0.15 |
| `--motion-bounce` | 0.2 |
| `--motion-enabled` | 1 |
| `--motion-small-iterations` | infinite |
| `--motion-large-duration` | 300ms |
| `--motion-large-easing` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--motion-large-type` | easing |
| `--motion-large-visual-duration` | 0.3 |
| `--motion-large-bounce` | 0.2 |
| `--motion-large-iterations` | infinite |
| `--motion-popup-scale` | 0.96 |
| `--motion-press-distance` | 1px |
| `--option-badge-background` | #ff6363 |
| `--option-badge-foreground` | #000000 |
| `--navigation-active-foreground` | #000000 |
| `--emphasis-chart-fill` | #ff6363 |
| `--emphasis-balance-background` | #e864ff |
| `--emphasis-rewards-background` | #76ef6b |
| `--emphasis-icon-background` | #009ff0 |
| `--emphasis-icon-foreground` | #000000 |
| `--emphasis-type-background` | #ff6363 |
| `--emphasis-type-foreground` | #000000 |
| `--navigation-active-background` | #ff6363 |
| `--surface-raised-image` | none |
| `--surface-raised-shadow` | 0 0 0 0 transparent |
| `--surface-recessed-image` | none |
| `--surface-recessed-shadow` | 0 0 0 0 transparent |
| `--space-zero` | 0px |
| `--space-xxs` | 3px |
| `--space-xs` | 6px |
| `--space-s` | 9px |
| `--space-m` | 11px |
| `--space-l` | 17px |
| `--space-xl` | 23px |
| `--space-xxl` | 34px |
| `--tracking-xs` | -0.02em |
| `--tracking-s` | -0.01em |
| `--tracking-m` | 0em |
| `--tracking-l` | 0.01em |
| `--tracking-xl` | 0.02em |
| `--size-xxs` | 9px |
| `--line-xxs` | 12px |
| `--letter-spacing-xxs` | 0.02em |
| `--size-xs` | 11px |
| `--line-xs` | 14px |
| `--letter-spacing-xs` | 0.01em |
| `--size-s` | 12px |
| `--line-s` | 18px |
| `--letter-spacing-s` | 0.01em |
| `--size-m` | 14px |
| `--line-m` | 21px |
| `--letter-spacing-m` | 0em |
| `--size-l` | 21px |
| `--line-l` | 28px |
| `--letter-spacing-l` | -0.01em |
| `--size-xl` | 32px |
| `--line-xl` | 35px |
| `--letter-spacing-xl` | -0.01em |
| `--size-xxl` | 43px |
| `--line-xxl` | 46px |
| `--letter-spacing-xxl` | -0.02em |
| `--radius-zero` | 0px |
| `--radius-xs` | 2px |
| `--radius-s` | 4px |
| `--radius-m` | 6px |
| `--radius-l` | 12px |
| `--radius-xl` | 18px |
| `--radius-full` | 9999px |
| `--border-none` | 0px |
| `--border-s` | 1px |
| `--border-m` | 1px |
| `--border-l` | 2px |
| `--border-default-color` | rgb(0 0 0 / 0.1) |
| `--border-shadow-none` | 0 0 0 0 transparent |
| `--border-shadow-s` | 0 0 0 1px rgb(0 0 0 / 0.1) |
| `--border-shadow-m` | 0 0 0 1px rgb(0 0 0 / 0.1) |
| `--border-shadow-l` | 0 0 0 2px rgb(0 0 0 / 0.1) |
| `--font-ui` | "Sidebar Geist", sans-serif |
| `--weight-ui-regular` | 500 |
| `--weight-ui-medium` | 600 |
| `--weight-ui-heavy` | 800 |
| `--font-brand` | "Sidebar Geist", sans-serif |
| `--weight-brand-regular` | 500 |
| `--weight-brand-medium` | 600 |
| `--weight-brand-heavy` | 800 |
| `--font-editorial` | "Sidebar Geist", sans-serif |
| `--weight-editorial-regular` | 500 |
| `--weight-editorial-medium` | 600 |
| `--weight-editorial-heavy` | 800 |
| `--font-data` | "Sidebar Geist Mono", monospace |
| `--weight-data-regular` | 500 |
| `--weight-data-medium` | 600 |
| `--weight-data-heavy` | 800 |
| `--color-none` | transparent |
| `--color-1` | #ff6363 |
| `--color-1-transparent` | #ff636333 |
| `--color-2` | #76ef6b |
| `--color-2-transparent` | #76ef6b33 |
| `--color-3` | #009ff0 |
| `--color-3-transparent` | #009ff033 |
| `--color-4` | #e864ff |
| `--color-4-transparent` | #e864ff33 |
| `--neutral-1` | #000000 |
| `--neutral-1-transparent` | #00000033 |
| `--neutral-2` | #21201d |
| `--neutral-2-transparent` | #21201d33 |
| `--neutral-3` | #2c2b28 |
| `--neutral-3-transparent` | #2c2b2833 |
| `--neutral-4` | #393835 |
| `--neutral-4-transparent` | #39383533 |
| `--neutral-5` | #52504c |
| `--neutral-5-transparent` | #52504c33 |
| `--neutral-6` | #797773 |
| `--neutral-6-transparent` | #79777333 |
| `--neutral-7` | #a5a39f |
| `--neutral-7-transparent` | #a5a39f33 |
| `--neutral-8` | #c8c6c2 |
| `--neutral-8-transparent` | #c8c6c233 |
| `--neutral-9` | #e6e5e3 |
| `--neutral-9-transparent` | #e6e5e333 |
| `--neutral-10` | #ffffff |
| `--neutral-10-transparent` | #ffffff33 |
| `--success` | #76ef6b |
| `--success-transparent` | #76ef6b33 |
| `--warning` | #ffa344 |
| `--warning-transparent` | #ffa34433 |
| `--error` | #ff5263 |
| `--error-transparent` | #ff526333 |
| `--shadow-none` | none |
| `--shadow-s` | 0px 1px 2px 0px #00000000 |
| `--shadow-m` | 0px 8px 24px 0px #00000000 |
| `--shadow-l` | 0px 12px 30px 0px #00000000 |
| `--cte-canvas` | #000000 |
| `--cte-surface` | #21201d |
| `--cte-surface-muted` | #2c2b28 |
| `--cte-text` | #ffffff |
| `--cte-text-muted` | #a5a39f |
| `--cte-border` | rgb(0 0 0 / 0.1) |
| `--cte-accent` | #ff6363 |
| `--cte-accent-text` | #000000 |
| `--cte-danger` | #ff5263 |
| `--cte-focus` | #ff6363 |
| `--cte-font` | "Sidebar Geist", sans-serif |
| `--cte-font-size` | 14px |
| `--cte-font-weight` | 500 |
| `--cte-line-height` | 21px |
| `--cte-letter-spacing` | 0em |
| `--cte-detail-font-size` | 14px |
| `--cte-detail-line-height` | 21px |
| `--cte-detail-letter-spacing` | 0em |

## Authored component assignments

These are project edits. The [component reference](beam-components.md) includes the effective assignments with defaults and shared parts resolved.

```json
{
  "componentTokens": {
    "switch:default:part:row:rest": {
      "gap": "s"
    },
    "switch:default:part:label:rest": {
      "textSize": "m"
    },
    "checkbox:default:part:label:rest": {
      "textSize": "m"
    },
    "switch:default:part:control:rest": {
      "controlSize": "xl"
    }
  },
  "componentVariants": {}
}
```
