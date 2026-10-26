import type { ReviewDay } from "@/features/forecast-review/types";
import { COPY } from "@/dummy/copy";

const forecastSource = COPY.sourceForecast;
const actualSource = COPY.sourceActual;

export const REVIEW_DAYS: ReviewDay[] = [
  {
    id: "2026-01-19",
    label: "19 Jan 2026",
    forecastVintages: [
      { startTime: "2026-01-19T10:00:00Z", publishTime: "2026-01-19T06:00:00Z", generationMw: 7420, source: forecastSource },
      { startTime: "2026-01-19T10:30:00Z", publishTime: "2026-01-19T06:00:00Z", generationMw: 7560, source: forecastSource },
      { startTime: "2026-01-19T11:00:00Z", publishTime: "2026-01-19T06:00:00Z", generationMw: 7710, source: forecastSource },
      { startTime: "2026-01-19T11:30:00Z", publishTime: "2026-01-19T06:00:00Z", generationMw: 7890, source: forecastSource },
      { startTime: "2026-01-19T12:00:00Z", publishTime: "2026-01-19T06:00:00Z", generationMw: 8040, source: forecastSource },
      { startTime: "2026-01-19T12:30:00Z", publishTime: "2026-01-19T06:00:00Z", generationMw: 8160, source: forecastSource },
      { startTime: "2026-01-19T10:00:00Z", publishTime: "2026-01-19T09:00:00Z", generationMw: 7680, source: forecastSource },
      { startTime: "2026-01-19T10:30:00Z", publishTime: "2026-01-19T09:00:00Z", generationMw: 7790, source: forecastSource },
      { startTime: "2026-01-19T11:00:00Z", publishTime: "2026-01-19T09:00:00Z", generationMw: 7830, source: forecastSource },
      { startTime: "2026-01-19T11:30:00Z", publishTime: "2026-01-19T09:00:00Z", generationMw: 7810, source: forecastSource },
      { startTime: "2026-01-19T12:00:00Z", publishTime: "2026-01-19T09:00:00Z", generationMw: 7940, source: forecastSource },
      { startTime: "2026-01-19T12:30:00Z", publishTime: "2026-01-19T09:00:00Z", generationMw: 8010, source: forecastSource },
    ],
    actuals: [
      { startTime: "2026-01-19T10:00:00Z", generationMw: 7510, source: actualSource },
      { startTime: "2026-01-19T10:30:00Z", generationMw: 7620, source: actualSource },
      { startTime: "2026-01-19T11:00:00Z", generationMw: 7750, source: actualSource },
      { startTime: "2026-01-19T11:30:00Z", generationMw: 8030, source: actualSource },
      { startTime: "2026-01-19T12:00:00Z", generationMw: 8110, source: actualSource },
      { startTime: "2026-01-19T12:30:00Z", generationMw: 8090, source: actualSource },
    ],
  },
  {
    id: "2026-01-20",
    label: "20 Jan 2026",
    forecastVintages: [
      { startTime: "2026-01-20T10:00:00Z", publishTime: "2026-01-20T06:00:00Z", generationMw: 6380, source: forecastSource },
      { startTime: "2026-01-20T10:30:00Z", publishTime: "2026-01-20T06:00:00Z", generationMw: 6550, source: forecastSource },
      { startTime: "2026-01-20T11:00:00Z", publishTime: "2026-01-20T06:00:00Z", generationMw: 6820, source: forecastSource },
      { startTime: "2026-01-20T11:30:00Z", publishTime: "2026-01-20T06:00:00Z", generationMw: 7100, source: forecastSource },
      { startTime: "2026-01-20T12:00:00Z", publishTime: "2026-01-20T06:00:00Z", generationMw: 7360, source: forecastSource },
      { startTime: "2026-01-20T12:30:00Z", publishTime: "2026-01-20T06:00:00Z", generationMw: 7590, source: forecastSource },
      { startTime: "2026-01-20T10:00:00Z", publishTime: "2026-01-20T09:00:00Z", generationMw: 6170, source: forecastSource },
      { startTime: "2026-01-20T10:30:00Z", publishTime: "2026-01-20T09:00:00Z", generationMw: 6450, source: forecastSource },
      { startTime: "2026-01-20T11:00:00Z", publishTime: "2026-01-20T09:00:00Z", generationMw: 6980, source: forecastSource },
      { startTime: "2026-01-20T11:30:00Z", publishTime: "2026-01-20T09:00:00Z", generationMw: 7240, source: forecastSource },
      { startTime: "2026-01-20T12:00:00Z", publishTime: "2026-01-20T09:00:00Z", generationMw: 7430, source: forecastSource },
      { startTime: "2026-01-20T12:30:00Z", publishTime: "2026-01-20T09:00:00Z", generationMw: 7480, source: forecastSource },
    ],
    actuals: [
      { startTime: "2026-01-20T10:00:00Z", generationMw: 6250, source: actualSource },
      { startTime: "2026-01-20T10:30:00Z", generationMw: 6390, source: actualSource },
      { startTime: "2026-01-20T11:00:00Z", generationMw: 6900, source: actualSource },
      { startTime: "2026-01-20T11:30:00Z", generationMw: 7350, source: actualSource },
      { startTime: "2026-01-20T12:00:00Z", generationMw: 7520, source: actualSource },
      { startTime: "2026-01-20T12:30:00Z", generationMw: 7630, source: actualSource },
    ],
  },
];
