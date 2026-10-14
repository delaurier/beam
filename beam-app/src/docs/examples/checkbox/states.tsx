import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxStates() {
  return (
    <div className="flex flex-col gap-m">
      <Checkbox>Frost alerts</Checkbox>
      <Checkbox defaultChecked>Daily summary</Checkbox>
      <Checkbox indeterminate>All blocks</Checkbox>
      <Checkbox disabled>Weather station</Checkbox>
    </div>
  );
}
