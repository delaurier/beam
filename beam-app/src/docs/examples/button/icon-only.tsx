import { Check, Printer, X } from "lucide-react";
import { Icon } from "@/components/icon";
import { Button, ButtonIcon } from "@/components/ui/button";

// An icon-only button needs an accessible name. ButtonIcon keeps it the height of a text button.
export default function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center gap-xs">
      <Button variant="primary" iconOnly aria-label="Save row">
        <ButtonIcon>
          <Icon icon={Check} />
        </ButtonIcon>
      </Button>
      <Button variant="ghost" iconOnly aria-label="Cancel edit">
        <ButtonIcon>
          <Icon icon={X} />
        </ButtonIcon>
      </Button>
      <Button variant="ghost" iconOnly aria-label="Print report">
        <ButtonIcon>
          <Icon icon={Printer} />
        </ButtonIcon>
      </Button>
    </div>
  );
}
