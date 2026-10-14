import { Combobox } from "@/components/ui/combobox";

// Type to filter. Try "south".
export default function ComboboxBasic() {
  return (
    <div className="w-72 max-w-full">
      <Combobox label="Field" placeholder="Search fields" options={["Sam's Dysart 160", "Mack's East 160", "North 80", "South 80", "South 40", "Home South", "Alissa's North", "Home West"]} />
    </div>
  );
}
