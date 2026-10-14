import { TextField } from "@/components/ui/text-field";

// Rest, invalid and disabled. Focus shows the 2px outline; try it with the keyboard.
export default function TextFieldStates() {
  return (
    <div className="grid w-[560px] max-w-full gap-l sm:grid-cols-2">
      <TextField label="Field name" defaultValue="North block" description="Shown on the map and in alerts." />
      <TextField label="Irrigation threshold" placeholder="28%" description="Alert when moisture drops below this." />
      <TextField label="Sensor ID" defaultValue="BM-20" error="Enter a 7-character sensor ID." />
      <TextField label="Region" defaultValue="Waikato" description="Set by your organisation." disabled />
    </div>
  );
}
