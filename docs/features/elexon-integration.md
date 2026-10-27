# Feature Specification: Elexon Data Integration

## Purpose

Provide reliable, testable access to the public Elexon Insights API for the assessment's January 2026 GB wind data.

## Sources

- Forecasts: `GET /datasets/WINDFOR/stream`, filtered by publication-time window; relevant fields are `publishTime`, `startTime`, and `generation`.
- Actuals: `GET /datasets/FUELHH/stream`, filtered by settlement date and `fuelType=WIND`; relevant fields are `startTime`, `generation`, `fuelType`, and `publishTime`.
- Base URL: `https://data.elexon.co.uk/bmrs/api/v1`.
- Production browser requests use same-origin `/api` routes when deployed as Vercel Services. Local development and Docker can override the API base with `NEXT_PUBLIC_API_BASE_URL`.

## Backend behavior

- Use a reusable async HTTP client with configurable base URL and timeout.
- Validate and normalize Elexon records into typed domain models.
- Query actuals by the requested settlement date.
- Query forecast vintages through the selected cutoff and retain only target intervals on the requested delivery date.
- Select the newest forecast per target interval with publication time at or before the cutoff.
- Match selected forecasts and actuals by normalized target interval.
- Return source names, retrieval timestamps, selected-vintage publish time, interval coverage, values, and metrics.
- Reject unsupported dates and invalid cutoff values with structured client errors.
- Return a structured upstream error when Elexon is unavailable or returns an invalid payload.

## Testing requirements

- Unit-test normalization and field validation with fixture payloads.
- Unit-test date/cutoff filtering, per-interval latest-vintage selection, duplicate handling, UTC matching, MAE, bias, and missing records.
- API tests mock the Elexon HTTP boundary and cover valid, empty, malformed, timeout, and non-2xx responses.
- No test depends on live Elexon network access.
