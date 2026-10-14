"use client";
import { Meter as BaseMeter } from "@base-ui/react/meter";
import { Progress as BaseProgress } from "@base-ui/react/progress";
import { Slider as BaseSlider } from "@base-ui/react/slider";

const head = "flex items-baseline justify-between gap-s";
const labelClass = "font-ui text-m font-ui-medium text-fg";
const valueClass = "font-ui text-m font-ui-regular text-fg-muted";
const track = "h-(--space-xs) w-full overflow-hidden rounded-full bg-surface-muted";

// Beam "Slider": muted track, accent fill, round thumb with the default edge.
export function Slider({ label, defaultValue, format = (v: number) => `${v}%` }: { label: string; defaultValue: number; format?: (v: number) => string }) {
  return (
    <BaseSlider.Root defaultValue={defaultValue} className="flex w-full flex-col gap-s">
      <div className={head}>
        <BaseSlider.Label className={labelClass}>{label}</BaseSlider.Label>
        <BaseSlider.Value className={valueClass}>{(_, values) => format(values[0])}</BaseSlider.Value>
      </div>
      <BaseSlider.Control className="flex h-(--space-l) items-center">
        <BaseSlider.Track className="h-(--space-xs) w-full rounded-full bg-surface-muted">
          <BaseSlider.Indicator className="rounded-full bg-accent" />
          <BaseSlider.Thumb aria-label={label} className="size-(--space-l) rounded-full bg-control edge" />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}

// Beam "Progress": how far a task has got.
export function Progress({ label, value }: { label: string; value: number }) {
  return (
    <BaseProgress.Root value={value} className="flex w-full flex-col gap-s">
      <div className={head}>
        <BaseProgress.Label className={labelClass}>{label}</BaseProgress.Label>
        <BaseProgress.Value className={valueClass} />
      </div>
      <BaseProgress.Track className={track}>
        <BaseProgress.Indicator className="rounded-full bg-accent" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}

const TONE = { default: "bg-accent", low: "bg-warning", high: "bg-danger" } as const;

// Beam "Meter": a reading within a known range. Low is warning, high is danger.
export function Meter({ label, value, tone = "default", note }: { label: string; value: number; tone?: keyof typeof TONE; note?: string }) {
  return (
    <BaseMeter.Root value={value} className="flex w-full flex-col gap-s">
      <div className={head}>
        <BaseMeter.Label className={labelClass}>{label}</BaseMeter.Label>
        <span className={valueClass}>
          {value}%{note ? ` · ${note}` : ""}
        </span>
      </div>
      <BaseMeter.Track className={track}>
        <BaseMeter.Indicator className={`rounded-full ${TONE[tone]}`} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
