import { RangeGauge } from "@/components/patterns/figures";

// The tinted band is the healthy range; the mark is where the farm is now.
export default function FiguresRangeGauge() {
  return (
    <div className="flex w-72 max-w-full flex-col gap-l">
      <RangeGauge min={0} max={3} at={2.22} healthyFrom={0} healthyTo={0.43} tone="danger" minLabel="0" maxLabel="3.0" label="Debt-to-equity is 2.22; healthy is 0.43 or below" />
      <RangeGauge min={0} max={3} at={1.04} healthyFrom={2} healthyTo={3} tone="warning" minLabel="0" maxLabel="3.0" label="Current ratio is 1.04; healthy is 2.0 or above" />
      <RangeGauge min={-500000} max={1000000} at={388446} healthyFrom={0} healthyTo={1000000} tone="success" minLabel="−$500k" maxLabel="$1M" label="Working capital is $388,446; healthy is above zero" />
    </div>
  );
}
