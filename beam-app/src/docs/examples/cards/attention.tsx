import { AttentionRow, SummaryCard } from "@/components/patterns/cards";

export default function CardsAttention() {
  return (
    <SummaryCard title="Needs attention" count="2">
      <AttentionRow tone="danger" title="3 of 5 financial ratios are weak" detail="Debt-to-equity, debt-to-asset and equity-to-asset" where="Balance sheet" href="/app/finance/balance-sheet" />
      <AttentionRow tone="warning" title="Alissa's North has no land cost" detail="350 acres of soybeans, crop share" where="Fields" href="/app/land/fields" />
    </SummaryCard>
  );
}
