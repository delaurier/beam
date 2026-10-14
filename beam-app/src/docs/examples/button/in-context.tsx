import { Filter, Plus, SlidersHorizontal } from "lucide-react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

// A table card header: quiet tools on the left of the one primary action.
export default function ButtonInContext() {
  return (
    <div className="flex w-full max-w-[560px] items-center justify-between rounded-m py-xs pr-xs pl-l edge-solid">
      <div className="flex items-baseline gap-xs">
        <span className="font-ui text-m font-ui-medium text-fg">Sales</span>
        <span className="font-ui text-m font-ui-regular text-fg-subtle">15</span>
      </div>
      <div className="flex items-center gap-xxs">
        <Button variant="ghost">
          <Icon icon={Filter} />
          Filter
        </Button>
        <Button variant="ghost">
          <Icon icon={SlidersHorizontal} />
          Columns
        </Button>
        <Button variant="primary">
          <Icon icon={Plus} />
          Add sale
        </Button>
      </div>
    </div>
  );
}
