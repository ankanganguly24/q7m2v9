# Feature Specification: Forecast Review

## Purpose

Give a procurement analyst a trustworthy retrospective of Great Britain wind forecasts: what was published by a chosen decision time, how the forecast evolved, and how it compared with actual generation.

## User stories and UI requirements

- As an analyst, I can select an operating date and a “known by” time so I can reconstruct the information available at a past decision point.
- As an analyst, I can compare the selected forecast with actual generation across half-hour periods.
- As an analyst, I can see forecast error, mean absolute error (MAE), and signed bias, with units and a clear definition.
- As an analyst, I can inspect forecast publication revisions so I can spot when and where the outlook changed.
- As an analyst, I can read a concise generated-style briefing that summarizes the computed evidence without claiming a purchasing recommendation.
- As an analyst, I can see data provenance and incomplete-data states.

## In scope

- Single-page desktop-first analytics workspace with responsive stacking on small screens.
- Operating-date selector and “known by” selector, both populated from fixture options.
- KPI cards for MAE, signed bias, selected interval, and number of forecast updates.
- Time-series visualization of actual and selected forecast, with accessible legend and tabular values.
- Revision history list/table for the selected operating date.
- Deterministic local “AI briefing” simulation grounded only in the selected date’s derived metrics and available fixtures.
- Clear indication that no live AI, API, trading, or procurement execution is connected.

## Out of scope

- Forecast generation or machine learning.
- Live Elexon API access, persistence, authentication, or backend services.
- Demand, wholesale prices, portfolio positions, costs, or recommended purchase volumes.
- Unsupported probabilistic confidence intervals.

## Component hierarchy

```text
AppShell
└── ForecastReviewPage
    ├── PageHeading
    ├── ReviewControls
    ├── MetricCardGrid
    ├── ForecastChartPanel
    │   ├── ChartLegend
    │   └── AccessibleIntervalTable
    ├── EvidenceBriefPanel
    └── RevisionHistoryPanel
```

Shared buttons, cards, badges, select controls, and separators live in `components/ui/`. The shell owns navigation and global frame; domain display components remain in this feature.

## Mock-data schema

`features/forecast-review/types/` defines:

- `ForecastVintage`: `startTime: string`, `publishTime: string`, `generationMw: number`, `source: string`.
- `ActualGeneration`: `startTime: string`, `generationMw: number | null`, `source: string`.
- `ReviewDay`: `id: string`, `label: string`, `forecastVintages: ForecastVintage[]`, `actuals: ActualGeneration[]`.
- `ReviewOption`: `value: string`, `label: string`.

All fixture records and all user-visible labels/options live in `dummy/`. Dates are in ISO-8601 with explicit UTC offsets. Data must be marked as illustrative/demo data in the interface and not presented as verified historical records.

## State boundaries

`use-forecast-review.ts` owns selected day and selected knowledge-time state. It derives the selected vintage for each target interval, the error series, aggregate metrics, revision rows, and briefing inputs via pure utilities. Components receive typed props and do not recalculate metrics or invent data.

## Metric definitions

- Signed error: selected forecast MW minus actual MW.
- Absolute error: absolute value of signed error.
- MAE: arithmetic mean of absolute error over intervals where both forecast and actual exist.
- Signed bias: arithmetic mean of signed error over intervals where both forecast and actual exist; positive means the forecast was higher than actual.
- Revision delta: current publication’s generation estimate minus the preceding publication’s estimate for the same target interval.

If there are no complete forecast/actual pairs, metrics render as unavailable. Units are MW. No hidden extrapolation or imputation is allowed.

## Interaction and copy requirements

- Changing the date or knowledge time recomputes all displayed data from the fixture.
- If no forecast existed by the selected knowledge time, show the explicit empty state.
- The simulated briefing names the selected date/time and quotes only derived metric values, counts, or observed largest revisions.
- AI-style briefing must be labelled as a local demo simulation, not a connected AI service.
- All UI text comes from centralized copy definitions under `dummy/`.
