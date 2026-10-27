import type { ForecastInterval, ForecastRevision, LiveReviewData, ReviewMetrics } from "@/features/forecast-review/types";
import { COPY } from "@/dummy/copy";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL
  ?? (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "")
).replace(/\/$/, "");

interface ApiReviewMetrics {
  mae_mw: number | null;
  bias_mw: number | null;
  complete_intervals: number;
  total_intervals: number;
}

interface ApiInterval {
  start_time: string;
  forecast_mw: number | null;
  actual_mw: number | null;
  signed_error_mw: number | null;
  absolute_error_mw: number | null;
  forecast_publish_time: string | null;
}

interface ApiRevision {
  start_time: string;
  previous_mw: number;
  current_mw: number;
  delta_mw: number;
  previous_publish_time: string;
  current_publish_time: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isDateTime(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isNullableNumber(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value));
}

function isReviewMetrics(value: unknown): value is ApiReviewMetrics {
  return isRecord(value)
    && isNullableNumber(value.mae_mw)
    && isNullableNumber(value.bias_mw)
    && typeof value.complete_intervals === "number"
    && typeof value.total_intervals === "number"
    && Number.isInteger(value.complete_intervals)
    && Number.isInteger(value.total_intervals);
}

function isInterval(value: unknown): value is ApiInterval {
  return isRecord(value)
    && isDateTime(value.start_time)
    && isNullableNumber(value.forecast_mw)
    && isNullableNumber(value.actual_mw)
    && isNullableNumber(value.signed_error_mw)
    && isNullableNumber(value.absolute_error_mw)
    && (value.forecast_publish_time === null || isDateTime(value.forecast_publish_time));
}

function isRevision(value: unknown): value is ApiRevision {
  return isRecord(value)
    && isDateTime(value.start_time)
    && typeof value.previous_mw === "number"
    && typeof value.current_mw === "number"
    && typeof value.delta_mw === "number"
    && isDateTime(value.previous_publish_time)
    && isDateTime(value.current_publish_time);
}

function isIntervalList(value: unknown): value is ApiInterval[] {
  return Array.isArray(value) && value.every(isInterval);
}

function isRevisionList(value: unknown): value is ApiRevision[] {
  return Array.isArray(value) && value.every(isRevision);
}

function isDateTimeList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isDateTime);
}

function parseReviewData(value: unknown): LiveReviewData {
  if (
    !isRecord(value)
    || typeof value.delivery_date !== "string"
    || !isDateTime(value.selected_cutoff)
    || !isDateTimeList(value.available_cutoffs)
    || !(value.selected_forecast_publish_time === null || isDateTime(value.selected_forecast_publish_time))
    || typeof value.forecast_source !== "string"
    || typeof value.actual_source !== "string"
    || !isDateTime(value.retrieved_at)
    || !isReviewMetrics(value.metrics)
    || !isIntervalList(value.intervals)
    || !isRevisionList(value.revisions)
  ) {
    throw new Error(COPY.responseFormatError);
  }

  const metrics: ReviewMetrics = {
    maeMw: value.metrics.mae_mw,
    biasMw: value.metrics.bias_mw,
    completeIntervals: value.metrics.complete_intervals,
    totalIntervals: value.metrics.total_intervals,
  };
  const intervals: ForecastInterval[] = value.intervals.map((row) => ({
    startTime: row.start_time,
    forecastMw: row.forecast_mw,
    actualMw: row.actual_mw,
    signedErrorMw: row.signed_error_mw,
    absoluteErrorMw: row.absolute_error_mw,
    forecastPublishTime: row.forecast_publish_time,
  }));
  const revisions: ForecastRevision[] = value.revisions.map((row) => ({
    startTime: row.start_time,
    previousMw: row.previous_mw,
    currentMw: row.current_mw,
    deltaMw: row.delta_mw,
    previousPublishTime: row.previous_publish_time,
    currentPublishTime: row.current_publish_time,
  }));

  return {
    deliveryDate: value.delivery_date,
    selectedCutoff: value.selected_cutoff,
    availableCutoffs: value.available_cutoffs,
    selectedForecastPublishTime: value.selected_forecast_publish_time,
    forecastSource: value.forecast_source,
    actualSource: value.actual_source,
    retrievedAt: value.retrieved_at,
    metrics,
    intervals,
    revisions,
  };
}

export async function fetchReviewData(
  deliveryDate: string,
  knownBy: string | null,
  signal: AbortSignal,
): Promise<LiveReviewData> {
  const url = new URL(`${API_BASE_URL}/api/review`, window.location.origin);
  url.searchParams.set("delivery_date", deliveryDate);
  if (knownBy) url.searchParams.set("known_by", knownBy);

  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const detail = isRecord(body) && typeof body.detail === "string" ? body.detail : COPY.reviewServiceError;
    throw new Error(detail);
  }
  const payload: unknown = await response.json();
  return parseReviewData(payload);
}

export async function fetchMonthPerformance(signal: AbortSignal): Promise<{
  days: Array<{ deliveryDate: string; selectedCutoff: string; metrics: ReviewMetrics }>;
  totalMetrics: ReviewMetrics;
}> {
  const url = new URL(`${API_BASE_URL}/api/performance`, window.location.origin);
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(COPY.performanceServiceError);
  const payload: unknown = await response.json();
  if (!isRecord(payload) || !isPerformanceDayList(payload.days) || !isReviewMetrics(payload.total_metrics)) {
    throw new Error(COPY.performanceFormatError);
  }
  const days = payload.days.map((row): { deliveryDate: string; selectedCutoff: string; metrics: ReviewMetrics } => {
    return {
      deliveryDate: row.delivery_date,
      selectedCutoff: row.selected_cutoff,
      metrics: {
        maeMw: row.metrics.mae_mw,
        biasMw: row.metrics.bias_mw,
        completeIntervals: row.metrics.complete_intervals,
        totalIntervals: row.metrics.total_intervals,
      },
    };
  });
  return {
    days,
    totalMetrics: {
      maeMw: payload.total_metrics.mae_mw,
      biasMw: payload.total_metrics.bias_mw,
      completeIntervals: payload.total_metrics.complete_intervals,
      totalIntervals: payload.total_metrics.total_intervals,
    },
  };
}

interface ApiPerformanceDay {
  delivery_date: string;
  selected_cutoff: string;
  metrics: ApiReviewMetrics;
}

function isPerformanceDay(value: unknown): value is ApiPerformanceDay {
  return isRecord(value)
    && typeof value.delivery_date === "string"
    && isDateTime(value.selected_cutoff)
    && isReviewMetrics(value.metrics);
}

function isPerformanceDayList(value: unknown): value is ApiPerformanceDay[] {
  return Array.isArray(value) && value.every(isPerformanceDay);
}
