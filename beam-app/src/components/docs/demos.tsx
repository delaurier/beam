"use client";

import { Bell, Check, ChevronDown, ChevronRight, Droplet, MapPin, Plus, Search, Sprout, Thermometer, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MOTION, NEUTRALS, PALETTE, RADII, ROLES, SPACING, TYPE_STEPS } from "@/lib/tokens";
import { Icon } from "../icon";
import { useTheme } from "../theme-toggle";
import { Button } from "../ui/button";
import { EXAMPLES } from "@/docs/examples";
import { CodeBlock } from "./code-block";

/** Reads a CSS variable from the nearest scope and keeps it current across mode changes. */
function Value({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const theme = useTheme();
  const [value, setValue] = useState("");
  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(name).trim());
  }, [name, theme]);
  return (
    <span ref={ref} className="font-data text-xs font-data-regular text-fg-muted">
      {value || " "}
    </span>
  );
}

// Token examples already sit inside a stage, so the frame is only spacing.
const Frame = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`w-full ${className}`}>{children}</div>;
const Name = ({ children }: { children: ReactNode }) => <span className="font-data text-xs font-data-medium text-fg">{children}</span>;
const Note = ({ children }: { children: ReactNode }) => <span className="font-data text-xs font-data-regular whitespace-nowrap text-fg-muted">{children}</span>;

function Neutrals() {
  return (
    <Frame>
      <div className="grid grid-cols-5 gap-s lg:grid-cols-10">
        {NEUTRALS.map((n) => (
          <div key={n.step} className="flex min-w-0 flex-col gap-xs">
            <div className="h-16 rounded-s edge-solid" style={{ background: `var(--neutral-${n.step})` }} />
            <div className="flex flex-col">
              <Name>neutral-{n.step}</Name>
              <Value name={`--neutral-${n.step}`} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Palette() {
  return (
    <Frame>
      <div className="grid grid-cols-4 gap-s lg:grid-cols-7">
        {PALETTE.map((p) => (
          <div key={p.name} className="flex min-w-0 flex-col gap-xs">
            <div className="flex h-16 overflow-hidden rounded-s">
              <div className="flex-2" style={{ background: `var(--${p.name})` }} />
              <div className="flex-1" style={{ background: `var(--${p.name}-transparent)` }} />
            </div>
            <div className="flex flex-col">
              <Name>{p.name}</Name>
              <Value name={`--${p.name}`} />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Roles() {
  const theme = useTheme();
  return (
    <div className="flex flex-col gap-l">
      {ROLES.map((group) => (
        <div key={group.group} className="overflow-hidden rounded-m edge-solid-over">
          <div className="px-l py-s font-ui text-m font-ui-medium text-fg divider-b">{group.group}</div>
          {group.roles.map((r) => (
            <div key={r.name} className="flex items-center gap-l px-l py-s divider-b last:shadow-none">
              <div className="size-(--space-xl) shrink-0 rounded-s edge-solid" style={{ background: `var(--${r.name})` }} />
              <div className="w-60 shrink-0">
                <Name>--{r.name}</Name>
              </div>
              <div className="w-44 shrink-0">
                <Note>{theme === "dark" ? r.dark : r.light}</Note>
              </div>
              <div className="min-w-0 flex-1 font-ui text-m font-ui-regular text-fg-secondary">{r.use}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const WEIGHT: Record<string, string> = { xxl: "font-brand-medium", xl: "font-brand-medium", l: "font-brand-medium" };
const SIZE: Record<string, string> = { xxl: "text-xxl", xl: "text-xl", l: "text-l", m: "text-m", s: "text-s", xs: "text-xs", xxs: "text-xxs" };

function TypeScale() {
  return (
    <div className="overflow-hidden rounded-m edge-solid-over">
      {TYPE_STEPS.map((t) => (
        <div key={t.step} className="flex items-baseline gap-l px-l py-m divider-b last:shadow-none">
          <div className="w-10 shrink-0">
            <Name>{t.step}</Name>
          </div>
          <div className={`min-w-0 flex-1 truncate font-brand text-fg ${SIZE[t.step]} ${WEIGHT[t.step] ?? "font-brand-regular"}`}>Canopy cover at 84%</div>
          <div className="shrink-0 text-right">
            <Note>
              {t.size} / {t.line} · {t.tracking}
            </Note>
          </div>
        </div>
      ))}
    </div>
  );
}

function Fonts() {
  const rows = [
    { family: "Geist", roles: "ui · brand · editorial", cls: ["font-ui font-ui-regular", "font-ui font-ui-medium", "font-ui font-ui-heavy"], sample: "North block, row 14" },
    { family: "Geist Mono", roles: "data", cls: ["font-data font-data-regular", "font-data font-data-medium", "font-data font-data-heavy"], sample: "31.4% VWC  18.2°C" },
  ];
  const names = ["regular · 500", "medium · 600", "heavy · 800"];
  return (
    <div className="grid gap-l xl:grid-cols-2">
      {rows.map((r) => (
        <div key={r.family} className="overflow-hidden rounded-m edge-solid-over">
          <div className="flex items-baseline justify-between px-l py-s divider-b">
            <span className="font-ui text-m font-ui-medium text-fg">{r.family}</span>
            <Note>{r.roles}</Note>
          </div>
          {r.cls.map((c, i) => (
            <div key={c} className="flex items-baseline justify-between gap-l px-l py-s divider-b last:shadow-none">
              <span className={`text-l whitespace-nowrap text-fg ${c}`}>{r.sample}</span>
              <Note>{names[i]}</Note>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Spacing() {
  return (
    <Frame>
      <div className="flex flex-wrap items-end gap-xl">
        {SPACING.map((s) => (
          <div key={s.step} className="flex w-20 flex-col gap-xs">
            <div className="flex h-9 items-end">
              <div className="bg-accent" style={{ width: `var(--space-${s.step})`, height: `var(--space-${s.step})` }} />
            </div>
            <div className="flex flex-col">
              <Name>space-{s.step}</Name>
              <Note>{s.px}px</Note>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Radius() {
  return (
    <Frame>
      <div className="flex flex-wrap gap-xl">
        {RADII.map((r) => (
          <div key={r.step} className="flex w-20 flex-col gap-xs">
            <div className="size-16 bg-surface-muted edge-solid" style={{ borderRadius: `var(--radius-${r.step})` }} />
            <div className="flex flex-col">
              <Name>radius-{r.step}</Name>
              <Note>{r.px}</Note>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Edges() {
  const items = [
    { name: "edge", note: "outside · default colour", cls: "edge bg-control" },
    { name: "edge-inset", note: "inside · default colour", cls: "edge-inset bg-accent" },
    { name: "edge-solid", note: "inside · border", cls: "edge-solid" },
    { name: "divider-b", note: "one side · border", cls: "divider-b" },
    { name: "focus", note: "2px outline", cls: "edge-solid outline-2 outline-(--focus-ring)" },
  ];
  return (
    <Frame>
      <div className="flex flex-wrap gap-xl">
        {items.map((e) => (
          <div key={e.name} className="flex w-36 flex-col gap-s">
            <div className={`h-16 rounded-s ${e.cls}`} />
            <div className="flex flex-col">
              <Name>{e.name}</Name>
              <Note>{e.note}</Note>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Icons() {
  const set = [
    ["sprout", Sprout], ["droplet", Droplet], ["thermometer", Thermometer], ["map-pin", MapPin], ["bell", Bell], ["search", Search],
    ["plus", Plus], ["check", Check], ["chevron-down", ChevronDown], ["chevron-right", ChevronRight], ["x", X],
  ] as const;
  return (
    <Frame>
      <div className="grid grid-cols-4 gap-l sm:grid-cols-6">
        {set.map(([name, glyph]) => (
          <div key={name} className="flex flex-col gap-s text-fg">
            <div className="flex items-center gap-m">
              <Icon icon={glyph} size={16} />
              <Icon icon={glyph} size={20} />
            </div>
            <Note>{name}</Note>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Motion() {
  const [on, setOn] = useState(false);
  return (
    <Frame>
      <div className="flex flex-col gap-l">
        <div>
          <Button variant="outline" onClick={() => setOn((v) => !v)}>
            Play
          </Button>
        </div>
        {MOTION.map((m) => (
          <div key={m.role} className="flex flex-col gap-xs">
            <div className="flex items-baseline justify-between">
              <span className="font-ui text-m font-ui-medium text-fg">{m.role}</span>
              <Note>
                {m.duration} · {m.easing}
              </Note>
            </div>
            <div className="h-(--space-l) overflow-hidden rounded-full bg-surface-muted">
              {/* Only translate moves: the rail slides by its own width minus the dot. */}
              <div
                className={`h-full w-full transition-transform ${m.role === "Small" ? "motion-small" : "motion-large"}`}
                style={{ translate: on ? "calc(100% - var(--space-l)) 0" : "0 0" }}
              >
                <div className="size-(--space-l) rounded-full bg-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Modes() {
  return (
    <div className="grid gap-l md:grid-cols-2">
      {(["light", "dark"] as const).map((mode) => (
        <div key={mode} data-theme={mode} className="flex flex-col gap-m rounded-m bg-canvas p-l edge-solid">
          <div className="flex items-center justify-between">
            <span className="font-ui text-m font-ui-medium text-fg">{mode === "light" ? "Light" : "Dark"}</span>
            <span className="font-data text-xs font-data-regular text-fg-muted">data-theme=&quot;{mode}&quot;</span>
          </div>
          <div className="rounded-s bg-control px-s py-xs font-ui text-m font-ui-regular text-fg edge">North block</div>
          <div className="rounded-s bg-nav-active px-s py-xs font-ui text-m font-ui-regular text-nav-active-fg">Current page</div>
          <p className="font-ui text-m font-ui-regular text-fg-muted">14 sensors reporting across 42 hectares.</p>
          <div className="flex gap-xs">
            <Button variant="primary">Add sensor</Button>
            <Button variant="outline">View map</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The stage restores Beam's real tokens (the guide around it uses its own
 * charcoal ramp), so what is drawn here is exactly what the product draws.
 */
function Stage({ children, center, file, code }: { children: ReactNode; center: boolean; file?: string; code?: string }) {
  return (
    <div className="overflow-hidden rounded-m edge-solid-over">
      <div data-beam="" className={`isolate flex bg-canvas stage-dots ${center ? "min-h-40 items-center justify-center p-xxl" : "p-l"}`}>
        {/* No panel behind the example: each control is backed by the canvas in its own shape (see stage-content in guide.css). */}
        <div data-stage-content="" className={`min-w-0 ${center ? "flex w-full justify-center" : "w-full"}`}>
          {children}
        </div>
      </div>
      {code ? (
        <div className="divider-t">
          <CodeBlock code={code} lang="tsx" file={file} attached />
        </div>
      ) : null}
    </div>
  );
}

const REGISTRY: Record<string, () => ReactNode> = {
  "colors/neutrals": Neutrals,
  "colors/palette": Palette,
  "colors/roles": Roles,
  "type/scale": TypeScale,
  "type/fonts": Fonts,
  "spacing/scale": Spacing,
  "radius/scale": Radius,
  "edges/samples": Edges,
  "icons/samples": Icons,
  "motion/curves": Motion,
  "theming/modes": Modes,
};

export function Demo({ name, code, file }: { name: string; code?: string; file?: string }) {
  const Example = EXAMPLES[name];
  const Token = REGISTRY[name];
  if (Example)
    return (
      <Stage center code={code} file={file}>
        <Example />
      </Stage>
    );
  if (Token)
    return (
      <Stage center={false}>
        <Token />
      </Stage>
    );
  return <div className="rounded-m p-l font-data text-s font-data-regular text-fg-danger edge-solid">Unknown example: {name}</div>;
}
