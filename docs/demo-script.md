# Assessment Demo Script

Target length: about 9 minutes, leaving a one-minute buffer under the 10-minute limit. Keep the client overview and technical walkthrough to about 4 minutes 30 seconds each.

## Client overview — 0:00 to 4:30

### 0:00–0:35 — The problem

“A utility buying power a day ahead needs to understand the wind forecast available when it made its decision, then compare that forecast with what the system later reported. Forecasts can be revised, so looking only at the latest forecast can give a misleading view of what the team knew at the time.”

### 0:35–1:10 — What the prototype does

“Gridline is a forecast-review workspace for that question. It takes the UK-wide wind forecast, lets us choose a delivery day and a decision cutoff, and compares the forecast available by that cutoff with later reported wind generation.”

### 1:10–2:00 — Workspace overview

Show `/workspace`.

“The overview brings the January 2026 review into one place. From here, a buyer or analyst can open the day-level forecast review, compare performance across the month, or inspect the underlying data sources.”

### 2:00–3:20 — Forecast review

Show `/workspace/forecast-review`. Select a delivery date and a cutoff from the previous day.

“This view reconstructs what was available at the selected cutoff. The chart compares the forecast with actual wind generation by target interval. The metrics show mean absolute error and signed bias. The revision history makes forecast changes visible instead of silently replacing earlier versions.”

“Coverage is shown beside the results. Only intervals with both a forecast and an actual are scored; missing periods stay visible rather than being filled in.”

### 3:20–4:00 — Monthly performance

Show `/workspace/performance`.

“The monthly view summarizes daily error and coverage across January. It helps a team identify days that need a closer review, while keeping the overall result tied to the intervals that actually match.”

### 4:00–4:30 — Boundary and next value

“This prototype evaluates the wind signal. It does not recommend a purchase quantity or estimate savings because it does not have demand, price, contract, or portfolio-position data. With those inputs and an agreed decision cutoff, the next product step could connect forecast accuracy to a buyer’s actual exposure.”

## Technical walkthrough — 4:30 to 9:00

### 4:30–5:10 — Architecture

“The frontend is Next.js, React, and TypeScript. A Python FastAPI service retrieves Elexon data, validates it, selects the forecast vintage, and calculates the review metrics. The browser receives typed API responses; the UI does not embed live calculations or pretend fixtures are live data.”

### 5:10–6:10 — Data and chronology

Show `/workspace/data-sources` and the selected cutoff on the review page.

“Forecast vintages come from Elexon `WINDFOR`. Actual generation comes from `FUELHH`, filtered to `fuelType=WIND`. For each delivery interval, the service chooses the newest publication at or before the selected cutoff. The cutoff is validated as the previous day and displayed with its timezone.”

### 6:10–7:10 — Matching and metrics

Point to the coverage count and chart.

“Forecast and actual timestamps are normalized to UTC and matched exactly. Elexon provides forecasts hourly and actuals half-hourly in this period, so only exact overlaps are scored; no interpolation is used. MAE is the average absolute forecast error, and bias is the signed average error, forecast minus actual. Missing pairs are excluded and counted.”

### 7:10–8:00 — Failure handling and traceability

“The API validates date and cutoff inputs, uses a request timeout, and returns an explicit upstream error for failed or malformed Elexon responses. The interface has loading, error, retry, and incomplete-coverage states. It also shows source names, publication times, retrieval time, and Elexon attribution.”

### 8:00–8:45 — Engineering checks

Show the public repository and Actions run.

“The repository includes the API and frontend, Dockerfiles and Compose setup, architecture and feature documentation, and automated tests. GitHub Actions runs backend tests, frontend type checks and production builds, Vercel config validation, and both container builds on pushes and pull requests.”

### 8:45–9:00 — Close

“The key engineering decision is preserving the information available at the decision time. The result is an auditable forecast review, with clear data coverage and explicit limits on what the evidence can support.”

## Recording checklist

- Keep the client overview and technical walkthrough within their five-minute limits and the full recording below ten minutes.
- Show the live review result only when Elexon responds; if unavailable, show the explicit service error instead of switching to illustrative data without labeling it.
- Avoid describing this as a trading system, procurement recommender, savings calculator, or AI forecast model.
- Make the YouTube video unlisted and check the final video and repository links in a private/incognito browser window before submitting.
