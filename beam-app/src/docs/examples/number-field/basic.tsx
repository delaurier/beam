import { NumberField } from "@/components/ui/number-field";

export default function NumberFieldBasic() {
  return (
    <div className="grid w-[420px] max-w-full gap-l sm:grid-cols-2">
      <NumberField label="Acres" defaultValue={160} min={0} stepBy={10} />
      <NumberField label="Useful life, years" defaultValue={10} min={1} max={40} disabled />
    </div>
  );
}
