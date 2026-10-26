"use client";

import { useMemo, useState } from "react";
import { KNOWLEDGE_TIME_OPTIONS, OPERATING_DAY_OPTIONS } from "@/dummy/options";
import { REVIEW_DAYS } from "@/dummy/fixtures";
import { calculateMetrics, calculateRevisions, selectIntervals } from "@/features/forecast-review/utils/metrics";

export function useForecastReview() {
  const [selectedDayId, setSelectedDayId] = useState(OPERATING_DAY_OPTIONS[0].value);
  const [knowledgeTime, setKnowledgeTime] = useState(KNOWLEDGE_TIME_OPTIONS[0].value);

  const day = REVIEW_DAYS.find((item) => item.id === selectedDayId) ?? REVIEW_DAYS[0];
  const intervals = useMemo(() => selectIntervals(day, knowledgeTime), [day, knowledgeTime]);
  const metrics = useMemo(() => calculateMetrics(intervals), [intervals]);
  const knowledgeTimestamp = Date.parse(`${day.id}T${knowledgeTime}:00Z`);
  const availableVintages = useMemo(() => day.forecastVintages.filter((item) => Date.parse(item.publishTime) <= knowledgeTimestamp), [day, knowledgeTimestamp]);
  const revisions = useMemo(() => calculateRevisions(availableVintages), [availableVintages]);
  const publicationCount = new Set(availableVintages.map((item) => item.publishTime)).size;

  return {
    day,
    intervals,
    metrics,
    revisions,
    publicationCount,
    selectedDayId,
    knowledgeTime,
    setSelectedDayId,
    setKnowledgeTime,
  };
}
