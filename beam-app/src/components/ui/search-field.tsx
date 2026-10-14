import { Search } from "lucide-react";
import { Icon } from "../icon";

/** A compact search input for a table's title bar. */
export function SearchField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex w-56 max-w-full items-center gap-xs rounded-s bg-control px-s py-xs text-fg-muted edge focus-within:outline-2 focus-within:outline-(--focus-ring)">
      <Icon icon={Search} />
      <input type="search" aria-label={label} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className="min-w-0 flex-1 bg-transparent font-ui text-m font-ui-regular text-fg outline-none placeholder:text-fg-subtle" />
    </label>
  );
}
