# Gridline

Gridline is a full-stack assessment prototype for a UK utility's day-ahead procurement team. It shows the national wind forecast available by a selected cutoff on the day before delivery, then compares it with later Elexon wind generation outturn for January 2026.

The app evaluates the wind signal only. It does not calculate consumer demand, additional procurement volume, prices, savings, or trade recommendations because those inputs are outside the assessment scope.

## Data

- `WINDFOR` provides published national wind forecasts.
- `FUELHH`, filtered to `fuelType=WIND`, provides half-hourly generation outturn.
- The browser/API compare exact matching target timestamps. Unmatched periods stay visible as missing and are not interpolated.
- The public Elexon API is used without credentials. Source attribution: Contains BMRS data © Elexon Limited copyright and database right.

## Run with Docker Compose

```bash
docker compose up --build
```

Open the frontend at `http://localhost:3000` and the backend health endpoint at `http://localhost:8000/api/health`.

## Run locally without Docker

Start the backend:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt
python -m uvicorn app.main:app --reload --port 8000
```

In another terminal, start the frontend:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. For local development, copy `.env.example` to `.env.local`; the frontend then calls the backend on `http://localhost:8000`. If the backend runs elsewhere, set `NEXT_PUBLIC_API_BASE_URL` to its base URL and set `FRONTEND_ORIGINS` on the backend to the exact frontend origins allowed to call it.

## Tests and checks

From the repository root:

```bash
cd backend && .venv/bin/python -m pytest -q
cd ..
npm run typecheck
npm run build
```

Backend tests use mocked Elexon responses and do not require live API access. GitHub Actions runs the backend tests, frontend typecheck/build, and both container builds on pushes and pull requests.

## Repository structure

- `app/` — Next.js route shells, global layout, and social metadata.
- `components/` — shared UI primitives.
- `features/` — isolated frontend feature modules.
- `dummy/` — centralized copy, options, and marketing-preview fixtures.
- `backend/app/` — FastAPI routes, Elexon API client, response models, and review calculations.
- `backend/tests/` — offline unit and API tests.
- `docs/` — assessment-aligned architecture and feature specifications.
- `.github/workflows/ci.yml` — continuous integration workflow.
- `compose.yaml` and Dockerfiles — local container setup.
- `vercel.json` — Vercel Services routing for the frontend and FastAPI backend.
- `docs/demo-script.md` — timed assessment walkthrough for the client and technical sections.

## Deployment and assessment submission

- Anonymous-named public repository: [q7m2v9](https://github.com/ankanganguly24/q7m2v9). The repository name is random; the GitHub account remains visible.
- Vercel deployment: import this repository, set the framework to **Services**, and deploy using the routing in `vercel.json`. The app sends production API requests to the same-origin `/api` paths. Do not set `NEXT_PUBLIC_API_BASE_URL` in Vercel unless the API is hosted separately.
- Deployed application: pending Vercel account access, Services availability, and deployment approval.
- For Vercel Services, verify plan access and usage pricing in the account before deployment. The feature is currently beta and usage-based.
- AI tools: AI tools were used to assist with research, implementation, and test authoring.
- Demo video: submit one unlisted video of no more than 10 minutes, with up to 5 minutes for the client walkthrough and up to 5 minutes for the technical review.
