import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

// Hover or focus the button.
export default function TooltipBasic() {
  return (
    <Tooltip label="Last reading 4 min ago">
      <Button variant="outline">BM-2041</Button>
    </Tooltip>
  );
}
