import { Button } from "@/components/ui/button";

// Hover and focus are forced here so they can be seen side by side.
// Do not use data-force in product code.
export default function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-s">
      <Button variant="outline">Rest</Button>
      <Button variant="outline" data-force="hover">
        Hover
      </Button>
      <Button variant="outline" data-force="focus">
        Focus
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </div>
  );
}
