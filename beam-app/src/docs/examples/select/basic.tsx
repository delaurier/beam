import { Select } from "@/components/ui/select";

const CROPS = [
  { value: "wheat", label: "Winter wheat" },
  { value: "barley", label: "Barley" },
  { value: "canola", label: "Canola" },
  { value: "lucerne", label: "Lucerne", disabled: true },
];

export default function SelectBasic() {
  return (
    <div className="grid w-[560px] max-w-full gap-l sm:grid-cols-2">
      <Select label="Crop" options={CROPS} defaultValue="wheat" />
      <Select label="Rotation crop" options={CROPS} defaultValue="barley" disabled />
    </div>
  );
}
