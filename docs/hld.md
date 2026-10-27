# High-Level Design

## Product and assessment objective

Gridline is an assessment prototype for a UK utility's day-ahead procurement team. It shows national wind generation forecasts available by an explicitly selected decision cutoff and compares those forecasts with subsequent national wind generation outturn. The app supports review of the wind signal; the supplied data does not include demand, prices, contracts, or a buyer's position, so it must not calculate procurement volume, cost, or savings.

The assessment scope is limited to Elexon BMRS `WINDFOR` and `FUELHH` data relevant to delivery dates in January 2026. This is not the investor workflow or a general renewable-asset SaaS product.

## Stack and deployment

- Frontend: existing Next.js App Router, React, TypeScript, and Tailwind application.
- Backend: Python 3 and FastAPI. It owns Elexon requests, response validation/normalization, date and cutoff selection, and derived metrics.
- Data source: public Elexon Insights REST API. No API key is required. Requests use the dataset stream endpoints documented by Elexon.
- Local orchestration: Docker Compose starts the frontend and backend. The frontend reads the backend URL from configuration.
- CI: GitHub Actions installs both stacks, runs Python tests, checks frontend types/build, and validates the Docker configuration where feasible.
- Deployment: frontend on Vercel and backend on a compatible public service. The exact hosting arrangement and public URL must be recorded in README.

## Data contract and flow

1. The browser requests a delivery date and explicit `known_by` timestamp from the FastAPI backend.
2. The backend validates that the delivery date is in January 2026 and that `known_by` precedes delivery. It requests `WINDFOR` forecast vintages published by the cutoff and `FUELHH` wind outturn for the delivery date.
3. The backend validates provider payloads, normalizes timestamps to UTC instants while retaining the settlement date/period, filters `fuelType == WIND`, and selects the latest forecast vintage available by `known_by` for each target interval.
4. The backend aligns records on target interval, leaves unmatched intervals explicitly unavailable, and calculates forecast-minus-actual error, absolute error, MAE, and signed bias over complete pairs only.
5. The frontend renders the selected forecast, actual outturn, accuracy measures, source and publication timestamps, and coverage/missing-data information.

The API adapter is isolated from metric calculation. Tests use saved, small response fixtures; runtime data comes from the live Elexon API. Provider failures return a typed error and are never silently replaced by invented values.

## API surface

- `GET /api/health`: service health.
- `GET /api/review?delivery_date=YYYY-MM-DD&known_by=<ISO-8601>`: selected forecast series, actual series, coverage, provenance, and calculated metrics.
- `GET /api/dates`: January 2026 delivery dates supported by the application.

The frontend may show a clearly labelled demo fixture only if the assessment demo needs an offline mode. Live data and fixture data must never be mixed in a single result.

## Frontend routing and state

- `/` remains the product introduction.
- `/workspace` is the day-ahead wind forecast decision overview.
- `/workspace/forecast-review` shows the selected delivery date, selected decision cutoff, wind forecast available by then, actual outturn, and interval errors.
- `/workspace/performance` compares January 2026 forecast accuracy by delivery date using backend-derived results.
- `/workspace/data-sources` explains the Elexon datasets, fields, publication timing, units, coverage, and limitations.

Date and cutoff state live in the forecast-review feature. Copy, labels, navigation, and user-facing constants remain centralized under `dummy/`. App route files remain thin composition shells. Cross-feature imports use public feature entry points.

## Decision cutoff

The assessment says decisions are made one day ahead but does not specify a clock time. The interface therefore makes `known_by` explicit and displays it in the user's local market time plus UTC. The default must be documented and must not be described as an official market deadline unless separately verified. Forecast availability is determined by `publishTime <= known_by`.

## Accuracy definitions

- Interval signed error = forecast MW minus actual MW.
- Absolute error = absolute value of signed error.
- MAE = mean absolute error over target intervals with both selected forecast and actual values.
- Signed bias = mean signed error over those complete intervals; positive means forecast generation exceeded actual generation.
- Missing values remain missing and are excluded from these metrics; coverage counts are visible.

All values are in MW. Do not add unsupported confidence ranges or procurement advice.

## Reliability and security

- Set timeouts for external HTTP calls and handle upstream errors, invalid payloads, and empty responses explicitly.
- Validate dates, cutoff timestamps, and upstream data before calculation.
- Keep provider URLs and timeouts configurable; no secrets are expected for the public Elexon endpoint.
- Configure CORS narrowly for the deployed frontend origin.
- Add request-level tests for invalid input, upstream failures, and incomplete data.
- Avoid logging sensitive or unnecessary data; current input contains no customer-specific data.

## Out of scope

Authentication, persistence, customer uploads, live trading, procurement recommendations, prices, demand, savings estimates, investors' asset valuation, forecast model training, and a production 24/7 market-critical service.

## Required delivery items

The assessment also requires an anonymous-named public GitHub repository, a README with repository structure/run/deployed URL/AI-tool disclosure, Docker, deployment on Vercel or Heroku, and one unlisted YouTube video of at most 10 minutes: a client overview (up to 5 minutes) plus technical walkthrough (up to 5 minutes). All submitted URLs must be checked in an incognito window. Keep total assignment effort within the stated 16-hour limit.
