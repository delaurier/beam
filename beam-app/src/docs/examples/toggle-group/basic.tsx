import { ToggleGroup } from "@/components/ui/toggle-group";

export default function ToggleGroupBasic() {
  return <ToggleGroup aria-label="Range" options={["Day", "Week", "Season"]} defaultValue="Week" />;
}
