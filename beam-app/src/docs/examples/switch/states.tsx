import { Switch } from "@/components/ui/switch";

export default function SwitchStates() {
  return (
    <div className="flex flex-col gap-m">
      <Switch defaultChecked>Auto-irrigate</Switch>
      <Switch>Night readings</Switch>
      <Switch disabled>Remote valve</Switch>
    </div>
  );
}
