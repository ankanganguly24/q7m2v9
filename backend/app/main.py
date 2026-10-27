from datetime import date, datetime, timedelta
from typing import Optional

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .elexon import ElexonClient, ElexonClientError
from .models import ForecastReviewResponse, PerformanceResponse
from .service import (
    ASSESSMENT_END,
    ASSESSMENT_START,
    ForecastService,
    InvalidReviewRequest,
)


def create_app(service: Optional[ForecastService] = None) -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title="Gridline API",
        version="1.0.0",
        description="Assessment API for Elexon national wind forecasts and outturn.",
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=list(settings.frontend_origins),
        allow_methods=["GET"],
        allow_headers=["Accept", "Content-Type"],
    )
    app.state.forecast_service = service or ForecastService(
        ElexonClient(settings.elexon_base_url, settings.elexon_timeout_seconds)
    )

    @app.get("/api/health")
    async def health() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/api/dates")
    async def dates() -> list[str]:
        total_days = (ASSESSMENT_END - ASSESSMENT_START).days
        return [
            (ASSESSMENT_START + timedelta(days=offset)).isoformat()
            for offset in range(total_days)
        ]

    @app.get("/api/review", response_model=ForecastReviewResponse)
    async def review(
        request: Request,
        delivery_date: date = Query(...),
        known_by: Optional[datetime] = Query(None),
    ) -> ForecastReviewResponse:
        try:
            return await request.app.state.forecast_service.get_review(
                delivery_date, known_by
            )
        except InvalidReviewRequest as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc
        except ElexonClientError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc

    @app.get("/api/performance", response_model=PerformanceResponse)
    async def performance(request: Request) -> PerformanceResponse:
        try:
            return await request.app.state.forecast_service.get_month_performance()
        except ElexonClientError as exc:
            raise HTTPException(status_code=502, detail=str(exc)) from exc

    return app


app = create_app()
