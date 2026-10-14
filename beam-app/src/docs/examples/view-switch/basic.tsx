import { ViewSwitch } from "@/components/ui/toggle-group";

// Switches between views of the same thing. Exactly one is always pressed.
export default function ViewSwitchBasic() {
  return <ViewSwitch aria-label="Corn views" options={["Budget", "Marketing", "Inputs"]} defaultValue="Marketing" />;
}
