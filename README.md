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

Open `http://localhost:3000`. Set `NEXT_PUBLIC_API_BASE_URL` if the backend is hosted elsewhere. Set `FRONTEND_ORIGINS` on the backend to the exact frontend origins allowed to call it.

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

## Deployment and assessment submission

- Deployed application: add the public Vercel or Heroku URL after deployment.
- API base URL: configure `NEXT_PUBLIC_API_BASE_URL` in the frontend deployment and `FRONTEND_ORIGINS` in the backend deployment.
- AI tools: AI tools were used to assist with research, implementation, and test authoring.
- Submission repository: the assessment asks for a public repository with an anonymous random name. The current repository name is descriptive, so use an anonymous-named public repository for the final submission.
- Demo video: submit one unlisted video of no more than 10 minutes, with up to 5 minutes for the client walkthrough and up to 5 minutes for the technical review.
