import { ArrowUpRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { COPY } from "@/dummy/copy";
import { REVIEW_DAYS } from "@/dummy/fixtures";
import { LANDING_COPY, LANDING_PREVIEW, LANDING_PREVIEW_GRID_VALUES } from "@/dummy/landing-content";
import { calculateMetrics, selectIntervals, formatMw } from "@/features/forecast-review";

const PREVIEW_CHART = {
  width: 600,
  height: 190,
  left: 26,
  right: 580,
  top: 14,
  bottom: 152,
  maximumMw: 10000,
} as const;

function makePath(values: Array<number | null>) {
  return values.map((value, index) => {
    if (value === null) return "";
    const x = PREVIEW_CHART.left + (index * (PREVIEW_CHART.right - PREVIEW_CHART.left)) / Math.max(values.length - 1, 1);
    const y = PREVIEW_CHART.bottom - (value * (PREVIEW_CHART.bottom - PREVIEW_CHART.top)) / PREVIEW_CHART.maximumMw;
    const previousMissing = index === 0 || values[index - 1] === null;
    return `${previousMissing ? "M" : "L"}${x} ${y}`;
  }).filter(Boolean).join(" ");
}

export function ProductPreview() {
  const day = REVIEW_DAYS.find((item) => item.id === LANDING_PREVIEW.dayId) ?? REVIEW_DAYS[0];
  const intervals = selectIntervals(day, LANDING_PREVIEW.knowledgeTime);
  const metrics = calculateMetrics(intervals);
  const forecastPath = makePath(intervals.map((interval) => interval.forecastMw));
  const actualPath = makePath(intervals.map((interval) => interval.actualMw));

  return (
    <Card className="relative border-foreground/10 bg-surface p-4 shadow-xl shadow-foreground/5 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent">{LANDING_COPY.previewEyebrow}</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">{LANDING_COPY.previewTitle}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{day.label} · {COPY.marketLabel}</p>
        </div>
        <span className="rounded-sm border border-warning/30 bg-warning/5 px-2 py-1 text-xs font-semibold tracking-wide text-warning">{LANDING_COPY.previewLabel}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 py-4">
        <div className="rounded-sm bg-background p-3">
          <p className="text-xs text-muted-foreground">{LANDING_COPY.previewMae}</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">{formatMw(metrics.maeMw)} <span className="text-xs font-sans font-normal text-muted-foreground">{LANDING_COPY.unitMw}</span></p>
        </div>
        <div className="rounded-sm bg-background p-3">
          <p className="text-xs text-muted-foreground">{LANDING_COPY.previewBias}</p>
          <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-foreground">{formatMw(metrics.biasMw)} <span className="text-xs font-sans font-normal text-muted-foreground">{LANDING_COPY.unitMw}</span></p>
        </div>
      </div>

      <div className="rounded-sm border border-border p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-foreground">{LANDING_COPY.previewDay}</p>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-accent" />{LANDING_COPY.previewForecast}</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-positive" />{LANDING_COPY.previewActual}</span>
          </div>
        </div>
        <svg aria-label={LANDING_COPY.previewTitle} className="h-36 w-full" role="img" viewBox={`0 0 ${PREVIEW_CHART.width} ${PREVIEW_CHART.height}`}>
          {LANDING_PREVIEW_GRID_VALUES.map((value) => {
            const y = PREVIEW_CHART.bottom - (value * (PREVIEW_CHART.bottom - PREVIEW_CHART.top)) / PREVIEW_CHART.maximumMw;
            return <line className="stroke-border" key={value} x1={PREVIEW_CHART.left} x2={PREVIEW_CHART.right} y1={y} y2={y} />;
          })}
          <path className="fill-none stroke-accent" d={forecastPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path className="fill-none stroke-positive" d={actualPath} strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          {intervals.map((interval, index) => {
            const x = PREVIEW_CHART.left + (index * (PREVIEW_CHART.right - PREVIEW_CHART.left)) / Math.max(intervals.length - 1, 1);
            const value = interval.actualMw;
            const y = value === null ? null : PREVIEW_CHART.bottom - (value * (PREVIEW_CHART.bottom - PREVIEW_CHART.top)) / PREVIEW_CHART.maximumMw;
            return y === null ? null : <circle className="fill-surface stroke-positive" cx={x} cy={y} key={interval.startTime} r="4" strokeWidth="2" />;
          })}
        </svg>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2"><Sparkles aria-hidden="true" className="size-3.5 text-accent" />{COPY.briefSimulationLabel}</span>
        <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
      </div>
    </Card>
  );
}
