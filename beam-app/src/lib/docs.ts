import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { demoMarkdown } from "./tokens";

export type NavPage = { slug: string; title: string };
export type NavGroup = { slug: string; title: string; pages: NavPage[] };

export const NAV: NavGroup[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    pages: [
      { slug: "introduction", title: "Introduction" },
      { slug: "installation", title: "Installation" },
      { slug: "project-structure", title: "Project structure" },
      { slug: "ai-and-llms", title: "AI and LLMs" },
    ],
  },
  {
    slug: "foundations",
    title: "Foundations",
    pages: [
      { slug: "overview", title: "Overview" },
      { slug: "colors", title: "Colors" },
      { slug: "typography", title: "Typography" },
      { slug: "spacing-and-radius", title: "Spacing and radius" },
      { slug: "edges-and-elevation", title: "Edges and elevation" },
      { slug: "theming", title: "Theming" },
      { slug: "icons", title: "Icons" },
      { slug: "motion", title: "Motion" },
    ],
  },
  { slug: "components", title: "Components", pages: [{ slug: "overview", title: "Overview" }, { slug: "button", title: "Button" }, { slug: "text-field", title: "Text field" }, { slug: "select", title: "Select" }, { slug: "menu", title: "Menu" }, { slug: "checkbox", title: "Checkbox" }, { slug: "radio-group", title: "Radio group" }, { slug: "switch", title: "Switch" }, { slug: "navigation", title: "Navigation" }, { slug: "view-switch", title: "View switch" }, { slug: "tabs", title: "Tabs" }, { slug: "toggle-group", title: "Toggle group" }, { slug: "avatar", title: "Avatar" }, { slug: "slider-progress-meter", title: "Slider, progress, meter" }, { slug: "tooltip", title: "Tooltip" }, { slug: "dialog", title: "Dialog" }, { slug: "toast", title: "Toast" }, { slug: "accordion", title: "Accordion" }, { slug: "popover", title: "Popover" }, { slug: "number-field", title: "Number field" }, { slug: "combobox", title: "Combobox" }, { slug: "scroll-area", title: "Scroll area" }] },
  { slug: "patterns", title: "Patterns", pages: [{ slug: "overview", title: "Overview" }, { slug: "app-shell", title: "App shell" }, { slug: "metric-strip", title: "Metric strip" }, { slug: "table", title: "Table in a card" }, { slug: "figures", title: "Bars and gauges" }, { slug: "cards", title: "Summary cards" }, { slug: "flows", title: "Flows" }] },
];

export type Heading = { depth: 2 | 3; text: string; id: string };
export type Doc = { group: string; slug: string; title: string; description: string; body: string; headings: Heading[] };

const ROOT = path.join(process.cwd(), "src", "content", "docs");
const EXAMPLES = path.join(process.cwd(), "src", "docs", "examples");

/** Source of a live example, if it is a real file under src/docs/examples. */
export function exampleSource(name: string): { file: string; code: string } | null {
  if (!/^[a-z0-9-]+\/[a-z0-9-]+$/.test(name)) return null;
  const file = path.join(EXAMPLES, `${name}.tsx`);
  if (!fs.existsSync(file)) return null;
  return { file: `src/docs/examples/${name}.tsx`, code: fs.readFileSync(file, "utf8").trim() };
}

function parse(group: string, slug: string, raw: string): Doc {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  const meta: Record<string, string> = {};
  if (m) for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = m ? raw.slice(m[0].length) : raw;
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let fenced = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    if (fenced) continue;
    const h = line.match(/^(##|###) (.+)$/);
    if (h) headings.push({ depth: h[1].length as 2 | 3, text: h[2].trim(), id: slugger.slug(h[2].trim()) });
  }
  return { group, slug, title: meta.title ?? slug, description: meta.description ?? "", body, headings };
}

export function getDoc(group: string, slug: string): Doc | null {
  if (!NAV.some((g) => g.slug === group && g.pages.some((p) => p.slug === slug))) return null;
  const file = path.join(ROOT, group, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return parse(group, slug, fs.readFileSync(file, "utf8"));
}

export function allDocs(): Doc[] {
  return NAV.flatMap((g) => g.pages.map((p) => getDoc(g.slug, p.slug))).filter((d): d is Doc => d !== null);
}

/** The page as plain Markdown, with live examples replaced by their data. */
export function toMarkdown(doc: Doc): string {
  const body = doc.body.replace(/```demo\n([\s\S]*?)\n```/g, (_, raw: string) => {
    const src = exampleSource(raw.trim());
    return src ? "**Example** (`" + src.file + "`)\n\n```tsx\n" + src.code + "\n```" : demoMarkdown(raw.trim());
  });
  return `# ${doc.title}\n\n> ${doc.description}\n\n${body.trim()}\n`;
}

export function neighbours(group: string, slug: string): { prev?: NavPage & { group: string }; next?: NavPage & { group: string } } {
  const flat = NAV.flatMap((g) => g.pages.map((p) => ({ ...p, group: g.slug })));
  const i = flat.findIndex((p) => p.group === group && p.slug === slug);
  return { prev: i > 0 ? flat[i - 1] : undefined, next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined };
}
