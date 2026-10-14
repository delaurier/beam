import { Button } from "@/components/ui/button";

// Five variants. One primary per surface; danger only when the action destroys something.
export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-s">
      <Button variant="primary">Add sale</Button>
      <Button variant="secondary">Export</Button>
      <Button variant="outline">Firm offers</Button>
      <Button variant="ghost">Filter</Button>
      <Button variant="danger">Remove</Button>
    </div>
  );
}
