// Sample farm data for the product screens. Values come from the five screenshots of the existing app
// where they were visible. Entries marked `placeholder` stand in for rows that were never visible:
// they keep the totals right and must be replaced with real data.

export type Sale = { id: string; date: string; variety: string; type: string; bushels: number; futures: number; basis: number; premium: number; status: "Filled" | "Open"; placeholder?: boolean };
export type Field = { id: string; name: string; acres: number; crop: string; landType: string; cost: number; placeholder?: boolean };
export type Unit = { id: string; group: string; name: string; year: string; ownership: string; value: number; life: number; pieces: number; placeholder?: boolean };
export type Expense = { id: string; category: string; name: string; perAcre: number; note: string; placeholder?: boolean };
export type Farm = { sales: Sale[]; fields: Field[]; units: Unit[]; expenses: Expense[]; categories: string[] };

export const CORN = { acres: 3580, yield: 223.3, breakEven: 4.43 };
export const CORN_BUDGET = { acres: 1200, yield: 220, price: 4.5 };
export const VARIETIES = ["Non-GMO Corn", "Corn"];
export const SALE_TYPES = ["Cash", "HTA", "Basis", "Hedge", "Other"];
export const CROPS = ["Non-GMO Corn", "Corn", "Soybeans"];
export const LAND_TYPES = ["Crop share", "Cash rent"];
export const UNIT_GROUPS = ["Power units", "Implements", "Other equipment"];
export const OWNERSHIP = ["Owned", "Leased"];
/** Palette colour for each crop, as a CSS variable. */
export const CROP_COLOR: Record<string, string> = { "Non-GMO Corn": "var(--color-4)", Corn: "var(--color-1)", Soybeans: "var(--color-2)" };
export const GROUP_COLOR = ["var(--color-1)", "var(--color-3)", "var(--color-4)", "var(--color-2)", "var(--border-strong)"];

const sale = (id: string, date: string, variety: string, type: string, bushels: number, futures: number, basis: number, premium: number, status: Sale["status"] = "Filled", placeholder = false): Sale => ({ id, date, variety, type, bushels, futures, basis, premium, status, placeholder });
const field = (id: string, name: string, acres: number, crop: string, landType: string, cost: number, placeholder = false): Field => ({ id, name, acres, crop, landType, cost, placeholder });
const unit = (id: string, name: string, value: number, year = "", group = "Power units", pieces = 1, placeholder = false): Unit => ({ id, group, name, year, ownership: "Owned", value, life: 10, pieces, placeholder });
const expense = (id: string, category: string, name: string, perAcre: number, note = "", placeholder = false): Expense => ({ id, category, name, perAcre, note, placeholder });

export const SEED: Farm = {
  sales: [
    sale("s15", "2026-06-02", "Non-GMO Corn", "HTA", 1000, 5.5, 0.1, 0.1),
    sale("s14", "2026-05-29", "Non-GMO Corn", "Cash", 15000, 4.75, 0.1, 0.14),
    sale("s13", "2026-05-26", "Non-GMO Corn", "Cash", 7000, 5.45, 0, 0),
    sale("s12", "2026-05-23", "Non-GMO Corn", "HTA", 7000, 5.35, 0, 0),
    sale("s11", "2026-04-21", "Non-GMO Corn", "Cash", 23423, 4.75, 0.1, 0.01),
    sale("s10", "2026-03-28", "Corn", "Hedge", 10000, 4.6, -0.1, 0.05),
    sale("s09", "2026-03-24", "Non-GMO Corn", "Other", 70000, 4.97, -0.16, 0.02),
    sale("s08", "2026-03-18", "Corn", "Cash", 80000, 4.55, 0.15, 0.1, "Open"),
    sale("s07", "2026-03-10", "Non-GMO Corn", "Cash", 60000, 4.74, -0.06, 0.01),
    sale("s06", "2026-03-02", "Corn", "Other", 50000, 4.88, -0.12, 0.05),
    sale("s05", "2026-02-24", "Non-GMO Corn", "Basis", 90000, 5.03, -0.08, 0.15),
    sale("s04", "2026-02-11", "Corn", "Cash", 70000, 4.82, 0.06, 0.12),
    sale("s03", "2026-02-03", "Non-GMO Corn", "Other", 90000, 4.95, -0.11, 0.08),
    sale("s02", "2026-01-27", "Corn", "HTA", 79577, 4.71, 0, 0.05, "Filled", true),
    sale("s01", "2026-01-12", "Corn", "Cash", 60000, 4.52, 0.04, 0.02, "Filled", true),
  ],
  fields: [
    field("f01", "Sam's Dysart 160", 160, "Non-GMO Corn", "Crop share", 252.68),
    field("f02", "Mack's East 160", 160, "Soybeans", "Crop share", 307.75),
    field("f03", "North 80", 80, "Non-GMO Corn", "Crop share", 308.11),
    field("f04", "South 80", 80, "Soybeans", "Cash rent", 279),
    field("f05", "South 40", 40, "Non-GMO Corn", "Crop share", 415.28),
    field("f06", "Home South", 215, "Non-GMO Corn", "Cash rent", 282),
    field("f07", "Alissa's North", 350, "Soybeans", "Crop share", 0),
    field("f08", "Home West", 450, "Non-GMO Corn", "Cash rent", 279),
    field("f09", "Miller Quarter", 160, "Corn", "Cash rent", 295),
    field("f10", "River Bottom", 120, "Soybeans", "Crop share", 264.4),
    field("f11", "Dysart West", 240, "Corn", "Cash rent", 301),
    field("f12", "Field 12", 480, "Non-GMO Corn", "Cash rent", 298, true),
    field("f13", "Field 13", 400, "Non-GMO Corn", "Crop share", 298, true),
    field("f14", "Field 14", 355, "Non-GMO Corn", "Cash rent", 298, true),
    field("f15", "Field 15", 200, "Non-GMO Corn", "Crop share", 298, true),
    field("f16", "Field 16", 320, "Corn", "Cash rent", 298, true),
    field("f17", "Field 17", 280, "Corn", "Crop share", 298, true),
    field("f18", "Field 18", 200, "Corn", "Cash rent", 298, true),
    field("f19", "Field 19", 235, "Soybeans", "Cash rent", 298, true),
    field("f20", "Field 20", 200, "Soybeans", "Crop share", 298, true),
  ],
  units: [
    unit("u01", "Case IH 4450 Sprayer 1", 375000, "2025"),
    unit("u02", "Case IH 4450 Sprayer 2", 375000),
    unit("u03", "Freightliner Tender Truck", 55000),
    unit("u04", "John Deere 6R 250", 160000),
    unit("u05", "John Deere 8R 280", 190000),
    unit("u06", "John Deere 8R 340", 250000),
    unit("u07", "John Deere 8R 410", 330000),
    unit("u08", "John Deere 9R 540", 360000),
    unit("u09", "John Deere S780 Combine", 410000),
    unit("u10", "Kenworth T880", 185000),
    unit("u11", "Peterbilt 389", 179000),
    unit("u12", "Implements, not itemised", 1038000, "", "Implements", 14, true),
    unit("u13", "Other equipment, not itemised", 1485000, "", "Other equipment", 10, true),
  ],
  categories: ["General expenses", "Nutrients", "Field operations", "Chemicals", "Grain handling"],
  expenses: [
    expense("e01", "General expenses", "Land rent", 311.26, "Average from 11 fields"),
    expense("e02", "General expenses", "Seed", 120),
    expense("e03", "General expenses", "Crop insurance premium", 21),
    expense("e04", "General expenses", "Operating interest", 18),
    expense("e05", "General expenses", "Farm insurance allocation", 12),
    expense("e06", "General expenses", "Property tax", 6.5),
    expense("e07", "General expenses", "Return to management", 4.45, "Allocated"),
    expense("e08", "Nutrients", "Nutrients, not itemised", 185, "6 items in the original", true),
    expense("e09", "Field operations", "Field operations, not itemised", 163.79, "9 items in the original", true),
    expense("e10", "Chemicals", "Chemicals, not itemised", 99, "3 items in the original", true),
    expense("e11", "Grain handling", "Grain handling, not itemised", 55, "6 items in the original", true),
  ],
};

// The five ratios are fixed sample values: the balance sheet behind them has not been designed.
export type Ratio = { name: string; formula: string; value: string; min: number; max: number; at: number; healthyFrom: number; healthyTo: number; healthy: string; gap: string; status: "Weak" | "Fair" | "Strong"; minLabel: string; maxLabel: string };
export const RATIOS: Ratio[] = [
  { name: "Debt-to-equity", formula: "Total liabilities ÷ net worth", value: "2.22", min: 0, max: 3, at: 2.22, healthyFrom: 0, healthyTo: 0.43, healthy: "0.43 or below", gap: "1.79 over", status: "Weak", minLabel: "0", maxLabel: "3.0" },
  { name: "Debt-to-asset", formula: "Total liabilities ÷ total assets", value: "0.69", min: 0, max: 1, at: 0.69, healthyFrom: 0, healthyTo: 0.3, healthy: "0.30 or below", gap: "0.39 over", status: "Weak", minLabel: "0", maxLabel: "1.0" },
  { name: "Equity-to-asset", formula: "Net worth ÷ total assets", value: "0.31", min: 0, max: 1, at: 0.31, healthyFrom: 0.7, healthyTo: 1, healthy: "0.70 or above", gap: "0.39 under", status: "Weak", minLabel: "0", maxLabel: "1.0" },
  { name: "Current ratio", formula: "Current assets ÷ current liabilities", value: "1.04", min: 0, max: 3, at: 1.04, healthyFrom: 2, healthyTo: 3, healthy: "2.0 or above", gap: "0.96 under", status: "Fair", minLabel: "0", maxLabel: "3.0" },
  { name: "Working capital", formula: "Current assets − current liabilities", value: "$388,446", min: -500000, max: 1000000, at: 388446, healthyFrom: 0, healthyTo: 1000000, healthy: "Above zero", gap: "Met", status: "Strong", minLabel: "−$500k", maxLabel: "$1M" },
];
export const STATUS_TONE = { Weak: "danger", Fair: "warning", Strong: "success" } as const;

// ---------- formatting ----------
export const signed = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(2);
export const money = (v: number, digits = 0) => (v < 0 ? "−" : "") + "$" + Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
export const whole = (v: number) => Math.round(v).toLocaleString("en-US");
/** 713000 → "713k", 3410000 → "3.41M". */
export const short = (v: number) => (Math.abs(v) >= 1e6 ? (v / 1e6).toFixed(2) + "M" : Math.abs(v) >= 1e4 ? (v / 1e3).toFixed(v % 1000 === 0 || Math.abs(v) >= 1e5 ? 0 : 1) + "k" : whole(v));
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-06-02" → "Jun 02". */
export const day = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1] ?? "?"} ${iso.slice(8, 10)}`;
/** Reads a typed number. Accepts a typographic minus, a leading plus, "$" and thousands commas. */
export function parseNumber(text: string): number | null {
  const t = text.trim().replace(/[−–]/g, "-").replace(/[$,\s]/g, "").replace(/^\+/, "");
  if (t === "" || !/^-?\d*\.?\d+$/.test(t)) return null;
  return Number(t);
}

// ---------- derived figures ----------
export const finalPrice = (s: Sale) => s.futures + s.basis + s.premium;

export function marketing(sales: Sale[], acres = CORN.acres) {
  const production = acres * CORN.yield;
  const sold = sales.reduce((t, s) => t + s.bushels, 0);
  const open = sales.filter((s) => s.status === "Open").reduce((t, s) => t + s.bushels, 0);
  const revenue = sales.reduce((t, s) => t + s.bushels * finalPrice(s), 0);
  const average = sold ? revenue / sold : 0;
  return { production, sold, open, filled: sold - open, unsold: Math.max(production - sold, 0), percent: production ? (sold / production) * 100 : 0, revenue, average, margin: average - CORN.breakEven };
}

export function budget(farm: Farm) {
  const perAcre = farm.expenses.reduce((t, e) => t + e.perAcre, 0);
  const byCategory = farm.categories.map((name, i) => {
    const items = farm.expenses.filter((e) => e.category === name);
    return { name, items, perAcre: items.reduce((t, e) => t + e.perAcre, 0), color: GROUP_COLOR[i % GROUP_COLOR.length] };
  });
  return { perAcre, perBushel: perAcre / CORN_BUDGET.yield, toCover: perAcre / CORN_BUDGET.price, total: perAcre * CORN_BUDGET.acres, byCategory };
}

export function land(fields: Field[]) {
  const acres = fields.reduce((t, f) => t + f.acres, 0);
  const costed = fields.filter((f) => f.cost > 0);
  const costedAcres = costed.reduce((t, f) => t + f.acres, 0);
  return {
    acres,
    averageCost: costedAcres ? costed.reduce((t, f) => t + f.cost * f.acres, 0) / costedAcres : 0,
    missing: fields.filter((f) => f.cost === 0),
    byCrop: CROPS.map((crop) => ({ crop, acres: fields.filter((f) => f.crop === crop).reduce((t, f) => t + f.acres, 0), color: CROP_COLOR[crop] })).filter((c) => c.acres > 0),
  };
}

export function fleet(units: Unit[]) {
  const value = units.reduce((t, u) => t + u.value, 0);
  const groups = UNIT_GROUPS.map((name, i) => {
    const rows = units.filter((u) => u.group === name);
    return { name, rows, pieces: rows.reduce((t, u) => t + u.pieces, 0), value: rows.reduce((t, u) => t + u.value, 0), annual: rows.reduce((t, u) => t + u.value / u.life, 0), color: GROUP_COLOR[[0, 2, 4][i]] };
  });
  return { value, annual: units.reduce((t, u) => t + u.value / u.life, 0), pieces: units.reduce((t, u) => t + u.pieces, 0), groups };
}

// ---------- reports ----------
export type Report = { id: string; name: string; about: string; area: "Crops" | "Land" | "Machinery" | "Finance"; covers: (farm: Farm) => string; rows?: (farm: Farm) => (string | number)[][] };
const plural = (n: number, one: string, many = one + "s") => `${whole(n)} ${n === 1 ? one : many}`;
export const REPORTS: Report[] = [
  {
    id: "crop-budget", name: "Crop budget", about: "Cost per acre and per bushel, by category", area: "Crops", covers: () => "Corn",
    rows: (f) => [["Category", "Expense", "Per acre", "Per bushel", "Total", "Note"], ...f.expenses.map((e) => [e.category, e.name, e.perAcre.toFixed(2), (e.perAcre / CORN_BUDGET.yield).toFixed(2), Math.round(e.perAcre * CORN_BUDGET.acres), e.note])],
  },
  {
    id: "marketing-position", name: "Marketing position", about: "Sold, unsold and average price against break-even", area: "Crops", covers: () => "Corn",
    rows: (f) => {
      const m = marketing(f.sales);
      return [["Measure", "Value"], ["Expected production, bu", Math.round(m.production)], ["Sold, bu", m.sold], ["Of which open, bu", m.open], ["Unsold, bu", Math.round(m.unsold)], ["Sold, %", m.percent.toFixed(1)], ["Average price, $/bu", m.average.toFixed(2)], ["Break-even, $/bu", CORN.breakEven.toFixed(2)], ["Margin, $/bu", m.margin.toFixed(2)], ["Revenue, $", Math.round(m.revenue)]];
    },
  },
  {
    id: "sales-ledger", name: "Sales ledger", about: "Every sale with futures, basis, premium and final price", area: "Crops", covers: (f) => plural(f.sales.length, "corn sale"),
    rows: (f) => [["Date", "Variety", "Type", "Bushels", "Futures", "Basis", "Premium", "Final", "Status"], ...f.sales.map((s) => [s.date, s.variety, s.type, s.bushels, s.futures.toFixed(2), s.basis.toFixed(2), s.premium.toFixed(2), finalPrice(s).toFixed(2), s.status])],
  },
  {
    id: "field-list", name: "Field list", about: "Acres, crop, land type and land cost for each field", area: "Land", covers: (f) => plural(f.fields.length, "field"),
    rows: (f) => [["Field", "Acres", "Crop", "Land type", "Land cost per acre"], ...f.fields.map((x) => [x.name, x.acres, x.crop, x.landType, x.cost.toFixed(2)])],
  },
  { id: "field-profitability", name: "Field profitability", about: "Revenue and cost for each field", area: "Land", covers: (f) => plural(f.fields.length, "field") },
  {
    id: "equipment-list", name: "Equipment list", about: "Value, useful life and annual cost for each piece", area: "Machinery", covers: (f) => plural(fleet(f.units).pieces, "piece"),
    rows: (f) => [["Group", "Equipment", "Pieces", "Year", "Ownership", "Value", "Useful life, years", "Annual cost"], ...f.units.map((u) => [u.group, u.name, u.pieces, u.year, u.ownership, u.value, u.life, Math.round(u.value / u.life)])],
  },
  {
    id: "depreciation-schedule", name: "Depreciation schedule", about: "Annual depreciation by equipment group", area: "Machinery", covers: (f) => plural(fleet(f.units).groups.filter((g) => g.rows.length).length, "group"),
    rows: (f) => [["Group", "Pieces", "Value", "Annual depreciation"], ...fleet(f.units).groups.map((g) => [g.name, g.pieces, g.value, Math.round(g.annual)])],
  },
  { id: "balance-sheet", name: "Balance sheet", about: "Assets, liabilities and net worth", area: "Finance", covers: () => "2026 season" },
  {
    id: "financial-health", name: "Financial health", about: "Five ratios against their healthy range", area: "Finance", covers: () => "2026 season",
    rows: () => [["Ratio", "Formula", "Now", "Healthy", "Gap", "Status"], ...RATIOS.map((r) => [r.name, r.formula, r.value, r.healthy, r.gap, r.status])],
  },
];
export function toCsv(rows: (string | number)[][]) {
  return rows.map((r) => r.map((c) => (/[",\n]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : String(c))).join(",")).join("\n");
}

// ---------- navigation ----------
export type Page = { label: string; href: string; group?: string; designed: boolean };
export const PAGES: Page[] = [
  { label: "Overview", href: "/app", designed: true },
  { label: "Corn", href: "/app/crops/corn/marketing", group: "Crops", designed: true },
  { label: "Soybeans", href: "/app/crops/soybeans", group: "Crops", designed: false },
  { label: "Fields", href: "/app/land/fields", group: "Land", designed: true },
  { label: "Map", href: "/app/land/map", group: "Land", designed: false },
  { label: "Profitability", href: "/app/land/profitability", group: "Land", designed: false },
  { label: "Fleet", href: "/app/machinery/fleet", group: "Machinery", designed: true },
  { label: "Operations", href: "/app/machinery/operations", group: "Machinery", designed: false },
  { label: "Loans", href: "/app/machinery/loans", group: "Machinery", designed: false },
  { label: "Capex planning", href: "/app/machinery/capex-planning", group: "Machinery", designed: false },
  { label: "Balance sheet", href: "/app/finance/balance-sheet", group: "Finance", designed: true },
  { label: "Banking and LOC", href: "/app/finance/banking-and-loc", group: "Finance", designed: false },
  { label: "Planning", href: "/app/finance/planning", group: "Finance", designed: false },
  { label: "Reports", href: "/app/reports", designed: true },
  { label: "Settings", href: "/app/settings", designed: false },
];
