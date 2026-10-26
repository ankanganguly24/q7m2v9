import type { ForecastInterval, ForecastRevision, ForecastVintage, ReviewDay } from "@/features/forecast-review/types";
import { COPY } from "@/dummy/copy";

export function selectIntervals(day: ReviewDay, knowledgeTime: string): ForecastInterval[] {
  const knowledgeTimestamp = Date.parse(`${day.id}T${knowledgeTime}:00Z`);
  const actualByTime = new Map(day.actuals.map((actual) => [actual.startTime, actual.generationMw]));
  const targetTimes = Array.from(new Set(day.forecastVintages.map((forecast) => forecast.startTime))).sort();

  return targetTimes.map((startTime) => {
    const forecast = day.forecastVintages
      .filter((vintage) => vintage.startTime === startTime && Date.parse(vintage.publishTime) <= knowledgeTimestamp)
      .sort((left, right) => Date.parse(right.publishTime) - Date.parse(left.publishTime))[0];
    const actualMw = actualByTime.get(startTime) ?? null;
    const forecastMw = forecast?.generationMw ?? null;
    const signedErrorMw = forecastMw !== null && actualMw !== null ? forecastMw - actualMw : null;

    return {
      startTime,
      forecastMw,
      actualMw,
      signedErrorMw,
      absoluteErrorMw: signedErrorMw === null ? null : Math.abs(signedErrorMw),
      forecastPublishTime: forecast?.publishTime ?? null,
    };
  });
}

export function calculateMetrics(intervals: ForecastInterval[]) {
  const complete = intervals.filter((interval) => interval.signedErrorMw !== null);
  if (complete.length === 0) {
    return { maeMw: null, biasMw: null, completeIntervals: 0 };
  }

  const signedTotal = complete.reduce((sum, interval) => sum + (interval.signedErrorMw ?? 0), 0);
  const absoluteTotal = complete.reduce((sum, interval) => sum + (interval.absoluteErrorMw ?? 0), 0);

  return {
    maeMw: absoluteTotal / complete.length,
    biasMw: signedTotal / complete.length,
    completeIntervals: complete.length,
  };
}

export function calculateRevisions(vintages: ForecastVintage[]): ForecastRevision[] {
  const byInterval = vintages.reduce<Record<string, ForecastVintage[]>>((grouped, vintage) => ({
    ...grouped,
    [vintage.startTime]: [...(grouped[vintage.startTime] ?? []), vintage],
  }), {});

  const revisions = Object.entries(byInterval).flatMap(([startTime, rows]) => {
    const ordered = [...rows].sort((left, right) => Date.parse(left.publishTime) - Date.parse(right.publishTime));
    return ordered.slice(1).map((current, index) => {
      const previous = ordered[index];
      return {
        startTime,
        previousMw: previous.generationMw,
        currentMw: current.generationMw,
        deltaMw: current.generationMw - previous.generationMw,
        previousPublishTime: previous.publishTime,
        currentPublishTime: current.publishTime,
      };
    });
  });

  return revisions.sort((left, right) => Math.abs(right.deltaMw) - Math.abs(left.deltaMw));
}

export function formatMw(value: number | null, decimals = 0): string {
  if (value === null || !Number.isFinite(value)) return COPY.unavailable;
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: decimals, minimumFractionDigits: decimals }).format(value);
}

export function formatClock(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(isoDate));
}
