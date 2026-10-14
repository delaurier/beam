import { Metric, MetricStrip, SplitBar } from "@/components/patterns/metric-strip";

export default function MetricStripBasic() {
  return (
    <MetricStrip>
      <Metric label="Total acres" value="4,725" />
      <Metric label="Average land cost" value="$298.38" unit="/ac" />
      <Metric label="Missing a land cost" value="1" unit="field" note="Alissa's North" tone="warning" />
      <Metric label="Acres by crop" wide>
        <SplitBar parts={[{ share: 2380, color: "var(--color-4)" }, { share: 1200, color: "var(--color-1)" }, { share: 1145, color: "var(--color-2)" }]} />
      </Metric>
    </MetricStrip>
  );
}
