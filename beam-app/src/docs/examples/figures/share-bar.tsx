import { ShareBar } from "@/components/patterns/figures";

// Each bar is scaled to the largest share in the column, so the longest bar fills its lane.
export default function FiguresShareBar() {
  return (
    <div className="flex w-56 max-w-full flex-col gap-s">
      <ShareBar share={49.5} max={49.5} color="var(--color-1)" />
      <ShareBar share={18.6} max={49.5} color="var(--color-3)" />
      <ShareBar share={5.5} max={49.5} />
    </div>
  );
}
