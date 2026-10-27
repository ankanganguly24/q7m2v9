import type { ReviewOption } from "@/features/forecast-review/types";

export const DEFAULT_DELIVERY_DATE = "2026-01-19";
export const OPERATING_DAY_OPTIONS: ReviewOption[] = Array.from({ length: 31 }, (_, index) => {
  const day = String(index + 1).padStart(2, "0");
  const value = `2026-01-${day}`;
  const label = new Date(`${value}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return { value, label };
});

export const CHART_GRID_STEPS = [0, 0.25, 0.5, 0.75, 1] as const;
export const REVISION_PREVIEW_LIMIT = 6;
