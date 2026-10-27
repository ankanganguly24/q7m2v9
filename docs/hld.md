# High-Level Design

## Product

Forecast Review is a frontend-only prototype for an electricity procurement analyst reviewing Great Britain wind forecasts. It helps answer: “What forecast was available at the time, how did it change, and what actually happened?” This is a focused forecast-evaluation workflow, not a trading or procurement recommendation system.

## Scope and constraints

- Next.js App Router, TypeScript, and Tailwind CSS.
- All values are local fixtures in `dummy/`; no backend, database, or live API.
- All visible copy, labels, navigation items, and display constants are centralized in `dummy/`.
- Forecast metrics are calculated from the typed fixture data by feature utilities. AI-style copy is a deterministic local simulation and must not imply that an LLM or live service is connected.
- The interface must not recommend a purchase quantity: demand, prices, and the buyer’s contracted position are not in scope.
- Use design tokens through CSS variables and Tailwind semantic colors. Avoid inline styles and arbitrary colors.

## Data flow

`dummy/fixtures.ts` exports typed forecast-vintage and actual-generation records using schemas in `features/forecast-review/types/`. `features/forecast-review/utils/metrics.ts` derives interval error, absolute error, signed bias, aggregate accuracy metrics, and revision amounts. Feature hooks select a date and an “as known at” time, then derive the visible series and summary. Components render only derived values and centralized copy. No feature component owns hardcoded fixture arrays or calculation rules.

Each forecast record has a target interval (`startTime`), publication timestamp (`publishTime`), generation estimate in MW, and source identifier. Actual records have target interval, actual generation in MW, and source identifier. The selected forecast vintage for an interval is the newest publication at or before the selected knowledge time. If none is available, the UI shows that the forecast was unavailable rather than substituting a later forecast.

## Routing and layout

- `/` is the public landing page, implemented by `features/landing-page/`.
- `/workspace` is the product overview.
- `/workspace/forecast-review` is the forecast-vintage and error review workflow.
- `/workspace/performance` compares forecast accuracy across the illustrative review days.
- `/workspace/data-sources` explains the fixture fields, coverage, and provenance limits.
- `app/layout.tsx` owns document metadata, font setup, and global styles. Route files under `app/` only compose the corresponding feature and shared shell.
- Public site and workspace are separate layout experiences. The public page uses a spacious editorial marketing shell. Workspace routes share a compact product header, responsive left navigation rail, and main analytics area.
- At narrow widths, workspace navigation becomes a horizontal scrollable strip and data tables remain horizontally scrollable.

## Feature boundaries

`features/landing-page/` owns public-page sections and presentation. `features/workspace/` owns the shared workspace shell, overview, performance, and data-source pages. `features/forecast-review/` owns forecast selection state, calculations, charts, scorecards, revision history, and the simulated evidence-based briefing. Each feature exposes supported imports from its `index.ts`; other features and route files do not reach into its internals. Shared UI such as metric cards lives under global `components/`. The chart and table share the same derived series so values cannot drift between views. Global `components/` contains reusable UI primitives and shared presentation components.

## State management

Use local React state in feature hooks. Initial selection and option labels come from `dummy/`. Forecast review state is limited to selected operating date and selected knowledge time. Workspace navigation uses the active pathname. No global store or persistence is required for this prototype.

## UI system

Use Tailwind semantic tokens backed by CSS variables. The workspace uses a restrained slate-and-ink palette; the public landing page uses a charcoal editorial hero, bold sans-serif display typography, neutral body surfaces, crisp dividers, and a restrained green signal accent. Use shadcn-style primitives for workspace buttons, badges, cards, selects, and tabs. Charts must use SVG or a chart library with accessible labels and a textual/table equivalent. Avoid arbitrary inline styling.

## Search and social metadata

`app/layout.tsx` defines the product metadata and indexability. `app/icon.svg` provides the Gridline browser icon. `app/opengraph-image.tsx` and `app/twitter-image.tsx` are thin metadata-route wrappers around the landing feature's shared, data-driven 1200 × 630 share-card image. Copy and image palette values are centralized in `dummy/landing-content.ts`. Set `NEXT_PUBLIC_SITE_URL` to the stable public deployment URL; `VERCEL_URL` is a deployment-preview fallback. Search engines and social crawlers need a stable canonical domain before the page is publicly launch-ready.

## Error and empty states

Represent missing actuals, no forecast available as of the selected time, and incomplete periods explicitly. Never fill gaps with invented values. Fixture provenance is visible in the interface. Simulated AI briefing text must be assembled only from the derived metrics and fixture records.

## Initial implementation sequence

1. Add typed fixture schemas and centralized copy/options in `dummy/`.
2. Define each route feature in `docs/features/` before implementing its components.
3. Implement feature utilities and state hooks.
4. Build the public page and shared workspace shell using design tokens.
5. Review routes and interactions against feature specs and scope boundaries.
