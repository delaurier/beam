// Token metadata for the documentation. Values shown in the docs are read live
// from the CSS variables; the hex values here are only used for the Markdown
// export, where there is no browser to resolve them.

export const NEUTRALS: { step: number; light: string; dark: string }[] = [
  { step: 1, light: "#ffffff", dark: "#0f0f0f" },
  { step: 2, light: "#fafaf9", dark: "#2e2d2a" },
  { step: 3, light: "#f2f0ec", dark: "#383735" },
  { step: 4, light: "#e1ddd5", dark: "#454441" },
  { step: 5, light: "#cbc5b9", dark: "#5c5a57" },
  { step: 6, light: "#9b968a", dark: "#817f7b" },
  { step: 7, light: "#716c61", dark: "#aaa8a5" },
  { step: 8, light: "#4a453b", dark: "#cbc9c6" },
  { step: 9, light: "#29241b", dark: "#e7e7e5" },
  { step: 10, light: "#000000", dark: "#ffffff" },
];

export const PALETTE: { name: string; value: string; use: string }[] = [
  { name: "color-1", value: "#ff6363", use: "Primary action, checked state, current page" },
  { name: "color-2", value: "#76ef6b", use: "Category colour" },
  { name: "color-3", value: "#009ff0", use: "Category colour" },
  { name: "color-4", value: "#e864ff", use: "Category colour" },
  { name: "success", value: "#76ef6b", use: "Valid, healthy, complete" },
  { name: "warning", value: "#ffa344", use: "Needs attention, low" },
  { name: "error", value: "#ff5263", use: "Invalid, destructive, high" },
];

export type Role = { name: string; utility: string; light: string; dark: string; use: string };

export const ROLES: { group: string; roles: Role[] }[] = [
  {
    group: "Background",
    roles: [
      { name: "bg-canvas", utility: "bg-canvas", light: "neutral-1", dark: "neutral-1", use: "Page background" },
      { name: "bg-surface", utility: "bg-surface", light: "neutral-2", dark: "neutral-2", use: "Panels that sit on the canvas" },
      { name: "bg-surface-muted", utility: "bg-surface-muted", light: "neutral-3", dark: "neutral-3", use: "Tracks, avatars, wells" },
      { name: "bg-control", utility: "bg-control", light: "neutral-1", dark: "neutral-2", use: "Inputs, selects, checkboxes, radios" },
      { name: "bg-popover", utility: "bg-popover", light: "neutral-1", dark: "neutral-2", use: "Menus, dialogs, toasts" },
      { name: "bg-hover", utility: "bg-hover", light: "neutral-3 at 20%", dark: "neutral-3 at 20%", use: "Hover wash on outline and ghost controls, table rows" },
      { name: "bg-hover-strong", utility: "bg-hover-strong", light: "neutral-4 at 20%", dark: "neutral-4 at 20%", use: "Hovered secondary button" },
      { name: "bg-highlight", utility: "bg-highlight", light: "neutral-3", dark: "neutral-3", use: "Pressed toggle, highlighted menu option" },
      { name: "bg-disabled", utility: "bg-disabled", light: "neutral-3", dark: "neutral-3", use: "Disabled control fill" },
      { name: "bg-track", utility: "bg-track", light: "neutral-4", dark: "neutral-4", use: "Switch track when off" },
      { name: "bg-thumb", utility: "bg-thumb", light: "neutral-1", dark: "neutral-1", use: "Switch thumb" },
      { name: "bg-inverse", utility: "bg-inverse", light: "neutral-10", dark: "neutral-10", use: "Tooltip" },
      { name: "bg-backdrop", utility: "bg-backdrop", light: "neutral-10 at 20%", dark: "neutral-1 at 20%", use: "Modal backdrop" },
    ],
  },
  {
    group: "Text",
    roles: [
      { name: "text", utility: "text-fg", light: "neutral-10", dark: "neutral-10", use: "Primary text" },
      { name: "text-secondary", utility: "text-fg-secondary", light: "neutral-8", dark: "neutral-8", use: "Body copy inside panels" },
      { name: "text-muted", utility: "text-fg-muted", light: "neutral-7", dark: "neutral-7", use: "Descriptions, values, metadata" },
      { name: "text-subtle", utility: "text-fg-subtle", light: "neutral-6", dark: "neutral-6", use: "Placeholders, group labels" },
      { name: "text-disabled", utility: "text-fg-disabled", light: "neutral-6", dark: "neutral-6", use: "Disabled labels" },
      { name: "text-on-accent", utility: "text-fg-on-accent", light: "neutral-1", dark: "neutral-1", use: "Text on accent and danger fills" },
      { name: "text-inverse", utility: "text-fg-inverse", light: "neutral-1", dark: "neutral-1", use: "Text on the inverse fill" },
      { name: "text-selected", utility: "text-fg-selected", light: "neutral-10", dark: "color-1", use: "Selected tab label" },
      { name: "text-success", utility: "text-fg-success", light: "success, darkened", dark: "success", use: "A positive figure, such as a margin above zero" },
      { name: "text-warning", utility: "text-fg-warning", light: "warning, darkened", dark: "warning", use: "A figure that needs attention" },
      { name: "text-danger", utility: "text-fg-danger", light: "error, darkened", dark: "error", use: "Error messages, a negative figure" },
    ],
  },
  {
    group: "Edge",
    roles: [
      { name: "border", utility: "edge-solid, divider-b", light: "neutral-4", dark: "neutral-4", use: "Outline buttons, separators, card and table rules" },
      { name: "border-strong", utility: "text-line-strong", light: "neutral-5", dark: "neutral-5", use: "Stronger rule where one is needed" },
      { name: "border-subtle", utility: "edge, edge-inset", light: "black at 10%", dark: "neutral-10 at 20%", use: "Inputs, checkboxes, filled buttons, popovers" },
      { name: "border-disabled", utility: "text-line-disabled", light: "neutral-4 at 20%", dark: "neutral-4 at 20%", use: "Disabled control edge" },
      { name: "focus-ring", utility: "focus-visible outline", light: "neutral-10 at 50%", dark: "neutral-10 at 50%", use: "2px keyboard focus outline" },
    ],
  },
  {
    group: "Accent and status",
    roles: [
      { name: "accent", utility: "bg-accent", light: "color-1", dark: "color-1", use: "Primary action, checked state, progress" },
      { name: "accent-muted", utility: "bg-accent-muted", light: "color-1 at 20%", dark: "color-1 at 20%", use: "Secondary button fill" },
      { name: "success", utility: "bg-success", light: "success", dark: "success", use: "Valid, healthy" },
      { name: "success-muted", utility: "bg-success-muted", light: "success at 20%", dark: "success at 20%", use: "Healthy range, success wash" },
      { name: "warning", utility: "bg-warning", light: "warning", dark: "warning", use: "Needs attention" },
      { name: "warning-muted", utility: "bg-warning-muted", light: "warning at 20%", dark: "warning at 20%", use: "Warning wash" },
      { name: "danger", utility: "bg-danger", light: "error", dark: "error", use: "Invalid, destructive" },
      { name: "danger-muted", utility: "bg-danger-muted", light: "error at 20%", dark: "error at 20%", use: "Danger wash" },
      { name: "navigation-active-background", utility: "bg-nav-active", light: "color-1", dark: "color-1", use: "Current page in navigation" },
      { name: "navigation-active-foreground", utility: "text-nav-active-fg", light: "#000000", dark: "#000000", use: "Text and icon on the current page" },
    ],
  },
];

export const TYPE_STEPS = [
  { step: "xxl", size: 43, line: 46, tracking: "-0.02em", use: "Rare display moments" },
  { step: "xl", size: 32, line: 35, tracking: "-0.01em", use: "Page title" },
  { step: "l", size: 21, line: 28, tracking: "-0.01em", use: "Section heading, metric value" },
  { step: "m", size: 14, line: 21, tracking: "0em", use: "Body, controls, table cells" },
  { step: "s", size: 12, line: 18, tracking: "+0.01em", use: "Column headers, supporting lines" },
  { step: "xs", size: 11, line: 14, tracking: "+0.01em", use: "Captions, keyboard hints" },
  { step: "xxs", size: 9, line: 12, tracking: "+0.02em", use: "Avoid for running text" },
] as const;

export const SPACING = [
  { step: "xxs", px: 3 },
  { step: "xs", px: 6 },
  { step: "s", px: 9 },
  { step: "m", px: 11 },
  { step: "l", px: 17 },
  { step: "xl", px: 23 },
  { step: "xxl", px: 34 },
] as const;

export const RADII = [
  { step: "zero", px: "0", use: "Flush edges" },
  { step: "xs", px: "2px", use: "Checkbox, menu option" },
  { step: "s", px: "4px", use: "Buttons, inputs, navigation links" },
  { step: "m", px: "6px", use: "Cards, popovers, dialogs" },
  { step: "l", px: "12px", use: "Large surfaces" },
  { step: "xl", px: "18px", use: "Largest surfaces" },
  { step: "full", px: "9999px", use: "Pills, avatars, tracks" },
] as const;

export const MOTION = [
  { role: "Small", duration: "150ms", easing: "cubic-bezier(0.2, 0.8, 0.2, 1)", vars: "--motion-duration, --motion-easing", use: "Buttons, menus, small popovers, hover and press feedback" },
  { role: "Large", duration: "300ms", easing: "cubic-bezier(0.16, 1, 0.3, 1)", vars: "--motion-large-duration, --motion-large-easing", use: "Dialogs, drawers, toasts, navigation surfaces, disclosure panels" },
] as const;

function table(head: string[], rows: string[][]): string {
  return [`| ${head.join(" | ")} |`, `| ${head.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
}

/** Text stand-in for a live demo, used in the Markdown export. */
export function demoMarkdown(name: string): string {
  switch (name) {
    case "colors/neutrals":
      return table(["Token", "Light", "Dark"], NEUTRALS.map((n) => [`\`--neutral-${n.step}\``, n.light, n.dark]));
    case "colors/palette":
      return table(["Token", "Value", "20% counterpart", "Use"], PALETTE.map((p) => [`\`--${p.name}\``, p.value, `\`--${p.name}-transparent\``, p.use]));
    case "colors/roles":
      return ROLES.map((g) => `**${g.group}**\n\n` + table(["Variable", "Utility", "Light", "Dark", "Use"], g.roles.map((r) => [`\`--${r.name}\``, `\`${r.utility}\``, r.light, r.dark, r.use]))).join("\n\n");
    case "type/scale":
      return table(["Step", "Utility", "Size / line", "Tracking", "Use"], TYPE_STEPS.map((t) => [t.step, `\`text-${t.step}\``, `${t.size} / ${t.line}`, t.tracking, t.use]));
    case "type/fonts":
      return table(["Role", "Family", "Utility", "Weights"], [
        ["ui", "Geist", "`font-ui`", "500 regular, 600 medium, 800 heavy"],
        ["brand", "Geist", "`font-brand`", "500 regular, 600 medium, 800 heavy"],
        ["editorial", "Geist", "`font-editorial`", "500 regular, 600 medium, 800 heavy"],
        ["data", "Geist Mono", "`font-data`", "500 regular, 600 medium, 800 heavy"],
      ]);
    case "spacing/scale":
      return table(["Token", "Utility", "Value"], SPACING.map((s) => [`\`--space-${s.step}\``, `\`p-${s.step}\`, \`gap-${s.step}\``, `${s.px}px`]));
    case "radius/scale":
      return table(["Token", "Utility", "Value", "Use"], RADII.map((r) => [`\`--radius-${r.step}\``, `\`rounded-${r.step}\``, r.px, r.use]));
    case "edges/samples":
      return table(["Utility", "Draws", "Use"], [
        ["`edge`", "1px outside, default edge colour", "Inputs, popovers, secondary buttons"],
        ["`edge-inset`", "1px inside, default edge colour", "Filled buttons, checkboxes"],
        ["`edge-solid`", "1px inside, `--border`", "Outline buttons, cards"],
        ["`divider-b`, `divider-t`, `divider-r`, `divider-l`", "One-sided 1px rule, `--border`", "Table rows, bars, sidebars"],
      ]);
    case "motion/curves":
      return table(["Role", "Duration", "Easing", "Variables", "Use"], MOTION.map((m) => [m.role, m.duration, `\`${m.easing}\``, `\`${m.vars}\``, m.use]));
    case "icons/samples":
      return "Lucide, outlined, 2.5 stroke. Sizes in use: 16px inline with text, 20px standalone.";
    case "theming/modes":
      return "The same panel rendered inside `data-theme=\"light\"` and `data-theme=\"dark\"` scopes.";
    default:
      return `_Live example: ${name}_`;
  }
}
