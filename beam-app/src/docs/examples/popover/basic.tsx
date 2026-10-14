import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

export default function PopoverBasic() {
  return (
    <Popover trigger={<Button variant="outline">Break-even basis</Button>} title="Expected yield" description="Break-even uses 223.3 bu/ac, the yield you expect this season." />
  );
}
