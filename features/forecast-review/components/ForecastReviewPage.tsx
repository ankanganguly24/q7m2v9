"use client";

import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, Gauge, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPY } from "@/dummy/copy";
import { MetricCard } from "@/components/MetricCard";
import { EvidenceBrief } from "@/features/forecast-review/components/EvidenceBrief";
import { ForecastChart } from "@/features/forecast-review/components/ForecastChart";
import { RevisionHistory } from "@/features/forecast-review/components/RevisionHistory";
import { ReviewControls } from "@/features/forecast-review/components/ReviewControls";
import { useForecastReview } from "@/features/forecast-review/hooks/useForecastReview";
import { formatMw } from "@/features/forecast-review/utils/metrics";

export function ForecastReviewPage() {
  const review = useForecastReview();

  return (
    <div className="grid gap-5">
      <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-accent">{COPY.pageEyebrow}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{COPY.pageTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{COPY.pageDescription}</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <Badge className="border-positive/30 text-positive">{COPY.demoDataLabel}</Badge>
          <span className="text-xs text-muted-foreground">{COPY.demoDataDescription}</span>
        </div>
      </header>

      <ReviewControls
        selectedDayId={review.selectedDayId}
        selectedCutoff={review.selectedCutoff}
        cutoffOptions={review.cutoffOptions}
        onDayChange={review.setSelectedDayId}
        onCutoffChange={review.setSelectedCutoff}
      />

      {review.loading && <Card className="p-5 text-sm text-muted-foreground">{COPY.loading}</Card>}
      {review.error && (
        <Card className="border-warning/30 bg-warning/5 p-5" role="alert">
          <h2 className="text-sm font-semibold text-foreground">{COPY.errorTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{review.error}</p>
          <button className="mt-3 text-sm font-semibold text-accent underline" onClick={review.reload} type="button">{COPY.retryLabel}</button>
        </Card>
      )}

      {review.data && !review.loading && (
        <>
      <section aria-labelledby="performance-heading">
        <div className="mb-3 flex items-center gap-2">
          <Gauge aria-hidden="true" className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground" id="performance-heading">{COPY.metricsTitle}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={Activity} label={COPY.metricMae} value={formatMw(review.metrics.maeMw)} description={COPY.metricMaeDefinition} />
          <MetricCard
            icon={review.metrics.biasMw !== null && review.metrics.biasMw >= 0 ? ArrowUpRight : ArrowDownRight}
            label={COPY.metricBias}
            value={formatMw(review.metrics.biasMw)}
            description={COPY.metricBiasDefinition}
          />
          <MetricCard icon={BarChart3} label={COPY.metricIntervalCount} value={String(review.metrics.completeIntervals)} description={COPY.metricIntervalDefinition} unit="" />
          <MetricCard icon={Activity} label={COPY.metricRevisionCount} value={String(review.publicationCount)} description={COPY.metricRevisionDefinition} unit="" />
        </div>
      </section>

      <ForecastChart intervals={review.intervals} />

      <div className="grid gap-5 xl:grid-cols-[1.05fr_1.3fr]">
        <EvidenceBrief
          dayLabel={review.day.label}
          knowledgeTimeLabel={review.selectedCutoffLabel}
          maeMw={review.metrics.maeMw}
          biasMw={review.metrics.biasMw}
          revisions={review.revisions}
        />
        <RevisionHistory revisions={review.revisions} />
      </div>

      <Card className="flex items-start gap-3 p-4">
        <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div className="text-xs leading-relaxed text-muted-foreground">
          <p>{COPY.availabilityNote}</p>
          <p className="mt-1">{COPY.selectedPublicationLabel}: {review.data.selectedForecastPublishTime ?? COPY.unavailable} · {COPY.retrievedAtLabel}: {new Date(review.data.retrievedAt).toLocaleString("en-GB", { timeZone: "Europe/London", timeZoneName: "short" })}</p>
          <p className="mt-1">{COPY.intervalCoverageLabel}: {review.metrics.completeIntervals}/{review.metrics.totalIntervals} · {review.data.forecastSource} · {review.data.actualSource}</p>
        </div>
      </Card>
        </>
      )}
    </div>
  );
}
