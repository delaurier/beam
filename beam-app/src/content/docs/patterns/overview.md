---
title: Overview
description: The larger pieces Beam screens are assembled from, and the screens built with them.
---

| Pattern | What it is |
| --- | --- |
| [App shell](/docs/patterns/app-shell) | Sidebar, top bar and page header |
| [Metric strip](/docs/patterns/metric-strip) | A bordered panel of labelled values |
| [Table in a card](/docs/patterns/table) | Read first, edit on demand, with optional groups |
| [Bars and gauges](/docs/patterns/figures) | Share bar, range gauge, split bar, sparkline |
| [Summary cards](/docs/patterns/cards) | Short fact cards and the Needs attention list |
| [Flows](/docs/patterns/flows) | The paths that work end to end |

## Screens

| Screen | Built from |
| --- | --- |
| [Overview](/app) | Metric strip, summary cards |
| [Corn marketing](/app/crops/corn/marketing) | Metric strip, table |
| [Corn budget](/app/crops/corn/budget) | Metric strip, table with groups |
| [Fields](/app/land/fields) | Metric strip, table |
| [Fleet](/app/machinery/fleet) | Metric strip, table with groups |
| [Balance sheet](/app/finance/balance-sheet) | Metric strip, table, range gauge |
| [Reports](/app/reports) | Table |

## Sample data

The screens run on a sample farm in `src/lib/farm.ts`. Rows marked `placeholder` there stand in for rows that were never visible in the source screenshots: two January corn sales, nine fields, and one line each for categories and equipment groups whose items were not shown. They keep the totals right and should be replaced with real data.
