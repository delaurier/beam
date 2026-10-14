---
title: Installation
description: Run the app locally and find the scripts you will use.
---

The design system is not a published package. It is part of the Beam app, so installing it means running the app.

## Prerequisites

| Tool | Version | Why |
| --- | --- | --- |
| Node.js | 20.9 or later (built on 24) | Runs Next.js and the scripts |
| npm | 10 or later | Package manager; the lockfile is `package-lock.json` |
| Git | Any | Version history |

## Install and run

```bash
npm install
npm run dev
```

The site is served at `http://localhost:3000`. This page is `/docs/getting-started/installation`.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build; also type-checks |
| `npm run start` | Serves the production build |
| `npm run lint` | ESLint |

## What is wired up

- **Next.js 16** with the App Router and React 19.
- **Tailwind CSS 4**, restricted to Beam's tokens. The default palette, type scale, radii and shadows are removed.
- **Geist and Geist Mono**, loaded with `next/font` at weights 500, 600 and 800.
- **Lucide** icons through `lucide-react`.
- **Base UI** and **Motion** are installed for the component work and are not used yet.
