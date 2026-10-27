# Feature Specification: Day-Ahead Wind Forecast Review

## Purpose

Help a UK utility buyer answer two questions for one delivery date: what national wind generation forecast was available by the selected day-ahead decision cutoff, and how did that forecast compare with later actual generation?

## User stories

- As a buyer, I can select a delivery date in January 2026 and see the forecast values published by a clearly displayed `known by` time.
- As a buyer, I can see the selected forecast publication time and the source dataset.
- As an analyst, I can compare forecast and actual wind generation at 30-minute intervals.
- As an analyst, I can inspect signed error and quantitative accuracy metrics with definitions and coverage counts.
- As a reviewer, I can distinguish real Elexon data from any explicitly selected offline demo fixture.
- As a user, I see an honest error or incomplete-data state when the upstream API or a series is unavailable.

## Requirements

- The assessment restricts data to January 2026 delivery decisions and the national `WINDFOR` and `FUELHH` datasets.
- The UI must not imply that the app computes required purchase volume, financial impact, or trade recommendations; those require inputs outside the assessment data.
- The decision cutoff is user-visible. Since the brief gives no exact hour, the interface must not claim an assumed time is an official gate closure.
- A target interval uses the newest wind forecast with `publishTime <= known_by`.
- Actual generation rows are filtered to `fuelType == WIND` and matched to forecasts by target interval, not by publish time.
- Timestamps retain explicit timezone information. The UI may present UK local time but the API contract uses ISO 8601 timestamps.
- Metrics use complete forecast/actual pairs only; missing values are not imputed.

## Interaction and display

- Delivery date selection is constrained to January 2026.
- The cutoff control lists available forecast publication times before delivery, or accepts a supported explicit timestamp; it shows the selected cutoff in UK local time and UTC.
- Forecast chart and interval table show target time, forecast MW, actual MW, signed error MW, and missing-data state.
- Summary shows MAE, signed bias, complete interval count, coverage, and selected forecast publication time.
- Empty, loading, input-validation, and upstream-error states are explicit.
- On refresh, all values come from one backend response; do not combine live values with fixture values.

## Component hierarchy

```text
ForecastReviewPage
├── PageHeading
├── ReviewControls
├── MetricCardGrid
├── ForecastChart
├── AccessibleIntervalTable
└── DataStatus
```

## Data and state boundaries

The frontend feature owns date/cutoff selection and rendering state. The Python backend owns Elexon access, parsing, vintage selection, interval alignment, and metric calculation. Frontend types mirror the public API response; they do not duplicate business rules.

## Acceptance criteria

- A selected date and cutoff only use forecasts published at or before the cutoff.
- Each actual is joined to the target interval, with no fabricated values for gaps.
- MAE and bias match the complete pairs shown in the table.
- `fuelType` filtering is verified against the provider payload.
- The interface identifies Elexon as source and discloses coverage and the assessment's data limitations.
- A backend error does not render stale fixture data as if it were live.
