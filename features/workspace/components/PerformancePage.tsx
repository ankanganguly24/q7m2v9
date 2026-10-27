"use client";

import { useEffect, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, CalendarDays } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { WORKSPACE_COPY } from "@/dummy/workspace-content";
import { MetricCard } from "@/components/MetricCard";
import { fetchMonthPerformance, formatMw } from "@/features/forecast-review";
import type { ReviewMetrics } from "@/features/forecast-review";

interface PerformanceData {
  days: Array<{ deliveryDate: string; selectedCutoff: string; metrics: ReviewMetrics }>;
  totalMetrics: ReviewMetrics;
}

function formatDate(value: string): string {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PerformancePage() {
  const [data, setData] = useState<PerformanceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchMonthPerformance(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : WORKSPACE_COPY.unavailablePerformanceError);
      });
    return () => controller.abort();
  }, []);

  const metrics = data?.totalMetrics ?? { maeMw: null, biasMw: null, completeIntervals: 0, totalIntervals: 0 };

  return (
    <div className="grid gap-6">
      <header className="border-b border-border pb-6">
        <p className="text-xs font-bold tracking-widest text-accent">{WORKSPACE_COPY.performanceEyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{WORKSPACE_COPY.performanceTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{WORKSPACE_COPY.performanceDescription}</p>
      </header>

      {error && <Card className="border-warning/30 bg-warning/5 p-4 text-sm text-muted-foreground" role="alert">{error}</Card>}
      {!data && !error && <Card className="p-4 text-sm text-muted-foreground">{WORKSPACE_COPY.loadingPerformance}</Card>}

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Activity} label={WORKSPACE_COPY.performanceMetricMae} value={formatMw(metrics.maeMw)} description={WORKSPACE_COPY.definitionMae} />
        <MetricCard icon={metrics.biasMw !== null && metrics.biasMw >= 0 ? ArrowUpRight : ArrowDownRight} label={WORKSPACE_COPY.performanceMetricBias} value={formatMw(metrics.biasMw)} description={WORKSPACE_COPY.definitionBias} />
        <MetricCard icon={BarChart3} label={WORKSPACE_COPY.performanceMetricIntervals} value={String(metrics.completeIntervals)} description={WORKSPACE_COPY.definitionMissing} unit="" />
        <MetricCard icon={CalendarDays} label={WORKSPACE_COPY.performanceMetricDays} value={String(data?.days.length ?? 0)} description={WORKSPACE_COPY.overviewLatestDescription} unit="" />
      </section>

      {data && <Card className="overflow-hidden">
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
              {data.days.map((row) => (
                <tr className="border-t border-border tabular-nums" key={row.deliveryDate}>
                  <th className="px-5 py-4 font-medium text-foreground">{formatDate(row.deliveryDate)}</th>
                  <td className="px-4 py-4 text-right font-mono text-foreground">{formatMw(row.metrics.maeMw)} {WORKSPACE_COPY.unitMw}</td>
                  <td className="px-4 py-4 text-right font-mono text-muted-foreground">{formatMw(row.metrics.biasMw)} {WORKSPACE_COPY.unitMw}</td>
                  <td className="px-5 py-4 text-right font-mono text-muted-foreground">{row.metrics.completeIntervals}/{row.metrics.totalIntervals}</td>
                </tr>
              ))}
              <tr className="border-t border-border bg-muted/50 font-semibold tabular-nums">
                <th className="px-5 py-4 text-foreground">{WORKSPACE_COPY.performanceTitle}</th>
                <td className="px-4 py-4 text-right font-mono text-foreground">{formatMw(metrics.maeMw)} {WORKSPACE_COPY.unitMw}</td>
                <td className="px-4 py-4 text-right font-mono text-foreground">{formatMw(metrics.biasMw)} {WORKSPACE_COPY.unitMw}</td>
                <td className="px-5 py-4 text-right font-mono text-foreground">{metrics.completeIntervals}/{metrics.totalIntervals}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>}
    </div>
  );
}
