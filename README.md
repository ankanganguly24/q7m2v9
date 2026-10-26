# Gridline

Gridline is an independent, frontend-only prototype for reviewing wind generation forecasts. It helps an energy analyst see which forecast was available at a chosen time, compare it with later actual generation, and inspect forecast accuracy and revisions.

The sample is illustrative. It does not connect to live market data, recommend trades or procurement quantities, or estimate financial savings. No AI service or backend is connected.

## What is included

- A public landing page explaining the review workflow.
- A workspace overview with separate forecast review, performance, and data source routes.
- Local forecast-vintage fixtures and typed metric calculations.
- A deterministic evidence summary based on the displayed sample data.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

- `app/` — route shells and global layout.
- `components/` — shared UI primitives and components.
- `features/` — feature modules with public `index.ts` entry points.
- `dummy/` — centralized mock data, labels, and copy.
- `docs/` — architecture and feature specifications.
