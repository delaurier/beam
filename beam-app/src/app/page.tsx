import { ArrowRight, Blocks, Bot, Component, Palette, Rocket, Shapes } from "lucide-react";
import Link from "next/link";
import { BeamMark } from "@/components/beam-mark";
import { Icon } from "@/components/icon";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTIONS = [
  { href: "/docs/getting-started/introduction", icon: Rocket, title: "Getting started", body: "Install, project structure and the rules every screen follows." },
  { href: "/docs/foundations/overview", icon: Palette, title: "Foundations", body: "Colour, type, spacing, edges, theming, icons and motion." },
  { href: "/docs/components/overview", icon: Component, title: "Components", body: "Live examples, states, accessibility notes and the tokens each one uses." },
  { href: "/docs/patterns/overview", icon: Blocks, title: "Patterns", body: "Tables, metric strips and the page shell, as they are added." },
  { href: "/icons", icon: Shapes, title: "Icons", body: "Every Lucide icon at the theme's stroke. Search and copy the import." },
  { href: "/docs/getting-started/ai-and-llms", icon: Bot, title: "For AI and LLMs", body: "llms.txt, Markdown for every page and rules for coding agents." },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex justify-end p-m">
        <ThemeToggle />
      </div>
      <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col items-center justify-center gap-xl px-l pb-xxl">
        <div className="flex flex-col items-center gap-s text-center">
          <div className="flex items-center gap-s text-fg">
            <BeamMark size={24} />
            <span className="font-brand text-l font-brand-medium">Beam</span>
          </div>
          <h1 className="font-brand text-xl font-brand-medium text-fg">Design system</h1>
          <p className="max-w-[44ch] font-ui text-m font-ui-regular text-fg-muted">Tokens, components and patterns for building Beam, written for people and for coding agents.</p>
        </div>
        <div className="grid w-full gap-s sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link key={s.title} href={s.href} className="group flex gap-m rounded-m p-l transition-colors motion-small edge-solid hover:bg-hover">
              <span className="flex size-(--space-xxl) shrink-0 items-center justify-center rounded-s bg-accent-muted text-accent">
                <Icon icon={s.icon} />
              </span>
              <span className="flex min-w-0 flex-col gap-xxs">
                <span className="flex items-center gap-xs font-ui text-m font-ui-medium text-fg">
                  {s.title}
                  <Icon icon={ArrowRight} className="text-fg-subtle transition-transform motion-small group-hover:translate-x-(--space-xxs)" />
                </span>
                <span className="font-ui text-m font-ui-regular text-fg-muted">{s.body}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
