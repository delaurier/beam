import { PageHeader } from "@/components/patterns/app-shell";
import { ButtonLink } from "@/components/ui/button";

/** Stands in for a screen that has no design yet, so its navigation entry still leads somewhere honest. */
export function NotDesigned({ title, embedded = false }: { title: string; embedded?: boolean }) {
  return (
    <>
      {embedded ? null : <PageHeader title={title} />}
      <div className="flex flex-col items-start gap-m rounded-m p-l edge-solid">
        <p className="max-w-prose font-ui text-m font-ui-regular text-fg-secondary">{title} has not been designed yet. It needs a screenshot of the existing screen before it can be built.</p>
        <ButtonLink href="/app" variant="outline">
          Back to Overview
        </ButtonLink>
      </div>
    </>
  );
}
