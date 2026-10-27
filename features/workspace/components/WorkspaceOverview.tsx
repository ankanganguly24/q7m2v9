"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Database, Wind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WORKSPACE_COPY, WORKSPACE_TASKS } from "@/dummy/workspace-content";
import { DEFAULT_DELIVERY_DATE } from "@/dummy/options";
import { fetchReviewData, formatMw } from "@/features/forecast-review";
import type { LiveReviewData } from "@/features/forecast-review";

const TASK_ICONS = { wind: Wind, chart: BarChart3, database: Database } as const;

export function WorkspaceOverview() {
  const [data, setData] = useState<LiveReviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchReviewData(DEFAULT_DELIVERY_DATE, null, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : WORKSPACE_COPY.unavailableReviewError);
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="grid gap-7">
      <header className="border-b border-border pb-6">
        <p className="text-xs font-bold tracking-widest text-accent">{WORKSPACE_COPY.overviewEyebrow}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{WORKSPACE_COPY.overviewTitle}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{WORKSPACE_COPY.overviewDescription}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-3">
        <SummaryCard label={WORKSPACE_COPY.overviewDaysLabel} value={DEFAULT_DELIVERY_DATE} detail={WORKSPACE_COPY.overviewLatestDescription} />
        <SummaryCard label={WORKSPACE_COPY.overviewForecastRowsLabel} value={String(data?.metrics.totalIntervals ?? "—")} detail={data?.selectedForecastPublishTime ?? WORKSPACE_COPY.waitingForElexon} />
        <SummaryCard label={WORKSPACE_COPY.performanceMetricMae} value={formatMw(data?.metrics.maeMw ?? null)} detail={`${data?.metrics.completeIntervals ?? 0} ${WORKSPACE_COPY.performanceMetricIntervals.toLowerCase()}`} />
      </section>

      {error && <Card className="border-warning/30 bg-warning/5 p-4 text-sm text-muted-foreground" role="status">{error}</Card>}

      <section aria-label={WORKSPACE_COPY.overviewTitle} className="grid gap-4 lg:grid-cols-3">
        {WORKSPACE_TASKS.map((task) => {
          const Icon = TASK_ICONS[task.icon];
          return (
            <Card className="flex flex-col p-5" key={task.id}>
              <span className="grid size-9 place-items-center rounded-sm bg-accent/5 text-accent"><Icon aria-hidden="true" className="size-4" /></span>
              <h2 className="mt-5 text-base font-semibold tracking-tight text-foreground">{task.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{task.description}</p>
              <Button asChild className="mt-5 w-fit" size="sm" variant="outline"><Link href={task.href}>{task.action}<ArrowRight aria-hidden="true" className="size-3.5" /></Link></Button>
            </Card>
          );
        })}
      </section>

      {data && <Card className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
        <div>
          <p className="text-xs font-bold tracking-widest text-muted-foreground">{WORKSPACE_COPY.overviewLatestTitle}</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{data.deliveryDate}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{WORKSPACE_COPY.forecastCutoffLabel}: <span className="font-mono font-semibold tabular-nums text-foreground">{data.selectedCutoff}</span></p>
        </div>
        <Link className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline" href="/workspace/forecast-review">{WORKSPACE_COPY.overviewReviewCta}<ArrowRight aria-hidden="true" className="size-4" /></Link>
      </Card>}
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  detail: string;
}

function SummaryCard({ label, value, detail }: SummaryCardProps) {
  return (
    <Card className="p-4">
      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
      <p className="mt-3 font-mono text-lg font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{detail}</p>
    </Card>
  );
}
