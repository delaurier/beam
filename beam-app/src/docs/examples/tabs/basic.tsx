import { Tabs } from "@/components/ui/tabs";

export default function TabsBasic() {
  return (
    <div className="w-[480px] max-w-full">
      <Tabs
        tabs={[
          { value: "overview", label: "Overview", content: "14 sensors reporting across 42 hectares." },
          { value: "moisture", label: "Moisture", content: "Average 31.4% volumetric water content." },
          { value: "canopy", label: "Canopy", content: "Canopy cover reached 84% this week." },
          { value: "alerts", label: "Alerts", content: "", disabled: true },
        ]}
      />
    </div>
  );
}
