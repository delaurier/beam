import { ChevronDown, Filter, Plus } from "lucide-react";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

// The icon sits before the label, or after it when it signals a menu.
export default function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-s">
      <Button variant="primary">
        <Icon icon={Plus} />
        Add field
      </Button>
      <Button variant="ghost">
        <Icon icon={Filter} />
        Filter
      </Button>
      <Button variant="outline">
        All crops
        <Icon icon={ChevronDown} />
      </Button>
    </div>
  );
}
