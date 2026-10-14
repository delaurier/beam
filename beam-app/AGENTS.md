<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Beam design system

For UI work, follow `GUI.md` and use `graphical-ui`, `graphical-convert`, or `graphical-audit` (in `.agents/skills/`) as appropriate.

- Tokens are defined once in `src/styles/tokens.css`. Literal values belong only there.
- Tailwind is restricted to Beam's tokens (`src/app/globals.css`). Default utilities such as `text-sm`, `rounded-md` or `bg-gray-100` do not exist.
- Edges are box-shadows (`edge`, `edge-inset`, `edge-solid`, `divider-*`). No CSS borders.
- Deliberate differences from the exported theme are listed in `src/content/docs/foundations/theming.md` and take precedence over `gui/themes/`.
- The documentation site is in `src/app/docs` with pages in `src/content/docs`; run it with `npm run dev`.
