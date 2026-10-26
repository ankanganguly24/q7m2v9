# Feature Specification: Workspace Pages

## Purpose

Separate the main analyst jobs into focused routes under `/workspace` so the user can orient themselves, review forecast quality, and understand the data without one crowded dashboard.

## Routes and user stories

- `/workspace`: As an analyst, I can see a concise workspace summary and choose the next review task.
- `/workspace/forecast-review`: As an analyst, I can reconstruct what forecast was available at a selected time and compare it with actual generation. This route follows `docs/features/forecast-review.md`.
- `/workspace/performance`: As an analyst, I can compare the available sample days and see where forecast error or bias differs.
- `/workspace/data-sources`: As an analyst, I can inspect the field definitions, sample period, and limits of the local fixtures.

## Shared shell requirements

- One responsive shell with product header, active-route navigation, a clear link back to the public landing page, and a content area.
- Each navigation link must route to a real page; no dead menu items.
- On smaller screens, use a horizontally scrollable navigation strip and stack content.
- All labels, descriptions, navigation text, and data-source explanations come from `dummy/`.

## Component hierarchy

```text
WorkspaceShell
├── WorkspaceHeader
├── WorkspaceNavigation
└── WorkspaceContent
    ├── OverviewPage
    ├── ForecastReviewPage
    ├── PerformancePage
    └── DataSourcesPage
```

## Mock data schema

Performance metrics derive from the typed sample records in `dummy/fixtures.ts` using the same pure metric utilities as forecast review. Data source details and labels live in `dummy/workspace-content.ts`. No page may introduce a separate inline mock series.

## State boundaries

Forecast review keeps its selected operating day and knowledge time in its feature hook. Other workspace pages are read-only. Navigation state derives from the active route pathname.

## Data integrity

- Identify all figures as illustrative sample values.
- Accuracy values must be calculated from fixture records; do not hardcode dashboard KPIs.
- Keep forecast vintages restricted to those published by the selected knowledge time on the review page.
- Do not claim that the sample data is a verified Elexon download or that the interface recommends purchases.
