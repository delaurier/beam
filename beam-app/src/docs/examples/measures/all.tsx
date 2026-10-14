import { Meter, Progress, Slider } from "@/components/ui/measures";

export default function Measures() {
  return (
    <div className="flex w-[420px] max-w-full flex-col gap-xl">
      <Slider label="Irrigation threshold" defaultValue={28} />
      <Progress label="Syncing 14 sensors" value={62} />
      <Meter label="Soil moisture" value={31} />
      <Meter label="Battery" value={18} tone="low" note="low" />
      <Meter label="Salinity" value={92} tone="high" note="high" />
    </div>
  );
}
