import type { ReviewOption } from "@/features/forecast-review/types";

export const OPERATING_DAY_OPTIONS: ReviewOption[] = [
  { value: "2026-01-19", label: "19 Jan 2026" },
  { value: "2026-01-20", label: "20 Jan 2026" },
];

export const KNOWLEDGE_TIME_OPTIONS: ReviewOption[] = [
  { value: "06:30", label: "06:30 GMT · first view" },
  { value: "09:30", label: "09:30 GMT · updated view" },
];

export const LATEST_KNOWLEDGE_TIME = KNOWLEDGE_TIME_OPTIONS[KNOWLEDGE_TIME_OPTIONS.length - 1].value;

export const CHART_GRID_VALUES = [0, 2500, 5000, 7500, 10000] as const;
export const REVISION_PREVIEW_LIMIT = 6;
