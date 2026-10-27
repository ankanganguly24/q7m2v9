"use client";

import { useEffect, useMemo, useState } from "react";
import { OPERATING_DAY_OPTIONS, DEFAULT_DELIVERY_DATE } from "@/dummy/options";
import { COPY } from "@/dummy/copy";
import { fetchReviewData } from "@/features/forecast-review/api";
import type { LiveReviewData } from "@/features/forecast-review/types";

function formatCutoff(value: string): string {
  const date = new Date(value);
  const local = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(date);
  return local;
}

export function useForecastReview() {
  const [selectedDayId, setSelectedDayId] = useState(DEFAULT_DELIVERY_DATE);
  const [requestedCutoff, setRequestedCutoff] = useState<string | null>(null);
  const [data, setData] = useState<LiveReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setData(null);
    setError(null);
    fetchReviewData(selectedDayId, requestedCutoff, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch((reason: unknown) => {
        if (!controller.signal.aborted) {
          setData(null);
          setError(reason instanceof Error ? reason.message : COPY.unavailableReviewError);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [selectedDayId, requestedCutoff, reloadToken]);

  const dayLabel = useMemo(
    () => OPERATING_DAY_OPTIONS.find((option) => option.value === selectedDayId)?.label ?? selectedDayId,
    [selectedDayId],
  );
  const cutoffOptions = useMemo(
    () => (data?.availableCutoffs ?? []).map((value) => ({ value, label: formatCutoff(value) })),
    [data?.availableCutoffs],
  );
  const selectedCutoff = data?.selectedCutoff ?? requestedCutoff ?? "";
  const publicationCount = cutoffOptions.filter((option) => Date.parse(option.value) <= Date.parse(selectedCutoff)).length;

  return {
    data,
    day: { id: selectedDayId, label: dayLabel },
    intervals: data?.intervals ?? [],
    metrics: data?.metrics ?? { maeMw: null, biasMw: null, completeIntervals: 0, totalIntervals: 0 },
    revisions: data?.revisions ?? [],
    publicationCount,
    selectedDayId,
    selectedCutoff,
    cutoffOptions,
    selectedCutoffLabel: selectedCutoff ? formatCutoff(selectedCutoff) : "",
    loading,
    error,
    reload: () => setReloadToken((current) => current + 1),
    setSelectedDayId: (value: string) => {
      setSelectedDayId(value);
      setRequestedCutoff(null);
    },
    setSelectedCutoff: (value: string) => setRequestedCutoff(value || null),
  };
}
