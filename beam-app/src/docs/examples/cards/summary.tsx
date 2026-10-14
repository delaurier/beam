import { FactRow, SummaryCard } from "@/components/patterns/cards";

export default function CardsSummary() {
  return (
    <div className="w-80 max-w-full">
      <SummaryCard title="Machinery" href="/app/machinery/fleet">
        <FactRow label="Pieces">35</FactRow>
        <FactRow label="Power units">$2,869,000</FactRow>
        <FactRow label="Annual depreciation">$539,200</FactRow>
      </SummaryCard>
    </div>
  );
}
