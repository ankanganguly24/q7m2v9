import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { COPY } from "@/dummy/copy";
import { CHART_GRID_STEPS } from "@/dummy/options";
import type { ForecastInterval } from "@/features/forecast-review/types";
import { formatClock, formatMw } from "@/features/forecast-review/utils/metrics";

interface ForecastChartProps {
  intervals: ForecastInterval[];
}

const chartWidth = 1000;
const chartHeight = 330;
const plotLeft = 72;
const plotRight = 972;
const plotTop = 22;
const plotBottom = 278;
function pointPaths(values: Array<number | null>, maximumMw: number): string[] {
  const segments: string[][] = [];
  let currentSegment: string[] = [];
  values.forEach((value, index) => {
    if (value === null) {
      if (currentSegment.length > 0) segments.push(currentSegment);
      currentSegment = [];
      return;
    }
    const x = plotLeft + (index * (plotRight - plotLeft)) / Math.max(values.length - 1, 1);
    const y = plotBottom - (value * (plotBottom - plotTop)) / maximumMw;
    currentSegment.push(`${currentSegment.length === 0 ? "M" : "L"}${x} ${y}`);
  });
  if (currentSegment.length > 0) segments.push(currentSegment);
  return segments.map((segment) => segment.join(" "));
}

export function ForecastChart({ intervals }: ForecastChartProps) {
  const forecastValues = intervals.map((interval) => interval.forecastMw);
  const actualValues = intervals.map((interval) => interval.actualMw);
  const values = [...forecastValues, ...actualValues].filter((value): value is number => value !== null);
  const maximumMw = Math.max(1000, Math.ceil(Math.max(...values, 0) / 1000) * 1000);
  const forecastPaths = pointPaths(forecastValues, maximumMw);
  const actualPaths = pointPaths(actualValues, maximumMw);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gap-4 border-b border-border sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{COPY.chartTitle}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{COPY.chartSubtitle}</p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground" aria-label={COPY.chartTitle}>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-accent" />{COPY.selectedForecast}</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-positive" />{COPY.actualGeneration}</span>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4 pt-4 sm:px-5">
        <div className="overflow-x-auto">
          <svg aria-label={COPY.chartTitle} className="h-[270px] min-w-[660px] w-full overflow-visible" role="img" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
            {CHART_GRID_STEPS.map((step) => {
              const value = maximumMw * step;
              const y = plotBottom - (value * (plotBottom - plotTop)) / maximumMw;
              return (
                <g key={step}>
                  <line className="stroke-border" x1={plotLeft} x2={plotRight} y1={y} y2={y} />
                  <text className="fill-muted-foreground font-sans text-xs" textAnchor="end" x={plotLeft - 12} y={y + 4}>{formatMw(value)}</text>
                </g>
              );
            })}
            {intervals.map((interval, index) => {
              if (index % 6 !== 0 && index !== intervals.length - 1) return null;
              const x = plotLeft + (index * (plotRight - plotLeft)) / Math.max(intervals.length - 1, 1);
              return <text className="fill-muted-foreground font-sans text-xs" key={interval.startTime} textAnchor="middle" x={x} y={plotBottom + 25}>{formatClock(interval.startTime)}</text>;
            })}
            {forecastPaths.map((path, index) => <path className="fill-none stroke-accent" d={path} key={`forecast-${index}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />)}
            {actualPaths.map((path, index) => <path className="fill-none stroke-positive" d={path} key={`actual-${index}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />)}
            {intervals.map((interval, index) => {
              const x = plotLeft + (index * (plotRight - plotLeft)) / Math.max(intervals.length - 1, 1);
              const forecastY = interval.forecastMw === null ? null : plotBottom - (interval.forecastMw * (plotBottom - plotTop)) / maximumMw;
              const actualY = interval.actualMw === null ? null : plotBottom - (interval.actualMw * (plotBottom - plotTop)) / maximumMw;
              return (
                <g key={`${interval.startTime}-points`}>
                  {forecastY !== null && <circle className="fill-surface stroke-accent" cx={x} cy={forecastY} r="4" strokeWidth="2" />}
                  {actualY !== null && <circle className="fill-surface stroke-positive" cx={x} cy={actualY} r="4" strokeWidth="2" />}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-3 overflow-x-auto rounded-sm border border-border">
          <table className="w-full min-w-[760px] border-collapse text-left text-xs">
            <caption className="sr-only">{COPY.chartTableLabel}</caption>
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-semibold">{COPY.chartTableTime}</th>
                <th className="px-3 py-2 font-semibold">{COPY.chartTablePublication}</th>
                <th className="px-3 py-2 text-right font-semibold">{COPY.chartTableForecast}</th>
                <th className="px-3 py-2 text-right font-semibold">{COPY.chartTableActual}</th>
                <th className="px-3 py-2 text-right font-semibold">{COPY.chartTableError}</th>
              </tr>
            </thead>
            <tbody>
              {intervals.map((interval) => (
                <tr className="border-t border-border tabular-nums" key={interval.startTime}>
                  <th className="px-3 py-2 font-medium text-foreground">{formatClock(interval.startTime)}</th>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{interval.forecastPublishTime ? formatClock(interval.forecastPublishTime) : COPY.unavailable}</td>
                  <td className="px-3 py-2 text-right font-mono text-foreground">{formatMw(interval.forecastMw)}</td>
                  <td className="px-3 py-2 text-right font-mono text-foreground">{formatMw(interval.actualMw)}</td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">{formatMw(interval.signedErrorMw)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
