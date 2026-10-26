import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { WORKSPACE_COPY } from "@/dummy/workspace-content";
import { REVIEW_DAYS } from "@/dummy/fixtures";
import { LATEST_KNOWLEDGE_TIME } from "@/dummy/options";
import { MetricCard } from "@/components/MetricCard";
import { calculateMetrics, selectIntervals, formatMw } from "@/features/forecast-review";

const DAILY_METRICS = REVIEW_DAYS.map((day) => {
  const intervals = selectIntervals(day, LATEST_KNOWLEDGE_TIME);
  return { day, intervals, metrics: calculateMetrics(intervals) };
});

const ALL_INTERVALS = DAILY_METRICS.flatMap((row) => row.intervals);
const TOTAL_METRICS = calculateMetrics(ALL_INTERVALS);

export function PerformancePage() {
  return (
    <div className="grid gap-6">
      <header className="border-b border-border pb-6">
        <p className="text-xs font-bold tracking-widest text-accent">{WORKSPACE_COPY.performanceEyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{WORKSPACE_COPY.performanceTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{WORKSPACE_COPY.performanceDescription}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Activity} label={WORKSPACE_COPY.performanceMetricMae} value={formatMw(TOTAL_METRICS.maeMw)} description={WORKSPACE_COPY.definitionMae} />
        <MetricCard icon={TOTAL_METRICS.biasMw !== null && TOTAL_METRICS.biasMw >= 0 ? ArrowUpRight : ArrowDownRight} label={WORKSPACE_COPY.performanceMetricBias} value={formatMw(TOTAL_METRICS.biasMw)} description={WORKSPACE_COPY.definitionBias} />
        <MetricCard icon={BarChart3} label={WORKSPACE_COPY.performanceMetricIntervals} value={String(TOTAL_METRICS.completeIntervals)} description={WORKSPACE_COPY.definitionMissing} unit="" />
        <MetricCard icon={CalendarDays} label={WORKSPACE_COPY.performanceMetricDays} value={String(DAILY_METRICS.length)} description={WORKSPACE_COPY.overviewLatestDescription} unit="" />
      </section>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">{WORKSPACE_COPY.performanceTableTitle}</h2>
          <p className="text-xs text-muted-foreground">{WORKSPACE_COPY.definitionMissing}</p>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">{WORKSPACE_COPY.performanceDate}</th>
                <th className="px-4 py-3 text-right font-semibold">{WORKSPACE_COPY.performanceMae}</th>
                <th className="px-4 py-3 text-right font-semibold">{WORKSPACE_COPY.performanceBias}</th>
                <th className="px-5 py-3 text-right font-semibold">{WORKSPACE_COPY.performanceIntervals}</th>
              </tr>
            </thead>
            <tbody>
              {DAILY_METRICS.map((row) => (
                <tr className="border-t border-border tabular-nums" key={row.day.id}>
                  <th className="px-5 py-4 font-medium text-foreground">{row.day.label}</th>
                  <td className="px-4 py-4 text-right font-mono text-foreground">{formatMw(row.metrics.maeMw)} {WORKSPACE_COPY.unitMw}</td>
                  <td className="px-4 py-4 text-right font-mono text-muted-foreground">{formatMw(row.metrics.biasMw)} {WORKSPACE_COPY.unitMw}</td>
                  <td className="px-5 py-4 text-right font-mono text-muted-foreground">{row.metrics.completeIntervals}</td>
                </tr>
              ))}
              <tr className="border-t border-border bg-muted/50 font-semibold tabular-nums">
                <th className="px-5 py-4 text-foreground">{WORKSPACE_COPY.performanceTitle}</th>
                <td className="px-4 py-4 text-right font-mono text-foreground">{formatMw(TOTAL_METRICS.maeMw)} {WORKSPACE_COPY.unitMw}</td>
                <td className="px-4 py-4 text-right font-mono text-foreground">{formatMw(TOTAL_METRICS.biasMw)} {WORKSPACE_COPY.unitMw}</td>
                <td className="px-5 py-4 text-right font-mono text-foreground">{TOTAL_METRICS.completeIntervals}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
