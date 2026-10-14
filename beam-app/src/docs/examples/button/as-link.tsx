import { ButtonLink } from "@/components/ui/button";

// Navigation is a real link. ButtonLink renders next/link with the button's look.
export default function ButtonAsLink() {
  return (
    <div className="flex flex-wrap items-center gap-s">
      <ButtonLink variant="outline" href="/docs/foundations/colors">
        Colors
      </ButtonLink>
      <ButtonLink variant="ghost" href="/icons">
        Icon catalogue
      </ButtonLink>
    </div>
  );
}
