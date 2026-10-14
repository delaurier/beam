import { Menu } from "@/components/ui/menu";

export default function MenuBasic() {
  return <Menu trigger="Field actions" heading="North block" items={[{ label: "Rename" }, { label: "Duplicate" }, { label: "Move to another farm", disabled: true }, "separator", { label: "Archive" }]} />;
}
