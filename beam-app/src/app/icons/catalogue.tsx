"use client";

import { icons, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Icon } from "@/components/icon";
import { Toast, type ToastMessage } from "@/components/docs/toast";

const ALL = Object.entries(icons).map(([name, glyph]) => ({ name, glyph, key: name.toLowerCase() }));
const LIMIT = 360;

export function Catalogue() {
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const q = query.trim().toLowerCase().replace(/[\s-]/g, "");
  const matches = useMemo(() => (q ? ALL.filter((i) => i.key.includes(q)) : ALL), [q]);
  const shown = matches.slice(0, LIMIT);

  async function copy(name: string) {
    const line = `import { ${name} } from "lucide-react";`;
    try {
      await navigator.clipboard.writeText(line);
      setToast((t) => ({ id: (t?.id ?? 0) + 1, title: "Import copied", description: line }));
    } catch {
      setToast((t) => ({ id: (t?.id ?? 0) + 1, title: "Copy failed", description: line }));
    }
  }

  return (
    <div className="flex flex-col gap-l">
      <div className="flex flex-wrap items-center justify-between gap-m">
        <label data-beam="" className="flex w-80 items-center gap-xs rounded-s bg-control px-s py-xs text-fg-muted edge focus-within:outline-2 focus-within:outline-(--focus-ring)">
          <Icon icon={Search} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons"
            aria-label="Search icons"
            className="min-w-0 flex-1 bg-transparent font-ui text-m font-ui-regular text-fg outline-none placeholder:text-fg-subtle"
          />
        </label>
        <span className="font-ui text-m font-ui-regular text-fg-muted">
          {matches.length > LIMIT ? `Showing ${LIMIT} of ${matches.length.toLocaleString()}. Search to narrow.` : `${matches.length.toLocaleString()} icons`}
        </span>
      </div>
      {shown.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-xs">
          {shown.map(({ name, glyph }) => (
            <button
              key={name}
              type="button"
              onClick={() => copy(name)}
              title={`Copy import for ${name}`}
              className="flex flex-col items-center gap-s rounded-m px-xs py-l text-fg transition-colors motion-small edge-solid hover:bg-hover"
            >
              <Icon icon={glyph} size={20} />
              <span className="w-full truncate text-center font-data text-xs font-data-regular text-fg-muted">{name}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="font-ui text-m font-ui-regular text-fg-muted">No icon matches “{query}”.</p>
      )}
      <Toast message={toast} />
    </div>
  );
}
