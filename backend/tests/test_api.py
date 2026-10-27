from datetime import date, datetime, timezone
from typing import Optional

from fastapi.testclient import TestClient

from app.main import create_app
from app.service import ForecastService, InvalidReviewRequest


class StubService:
    async def get_review(self, delivery_date: date, known_by: Optional[datetime]):
        raise InvalidReviewRequest("Delivery date must be in January 2026.")

    async def get_month_performance(self):
        raise RuntimeError("not used")


def test_health_endpoint_is_available() -> None:
    client = TestClient(create_app(StubService()))

    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_invalid_review_request_returns_validation_response() -> None:
    client = TestClient(create_app(StubService()))

    response = client.get(
        "/api/review", params={"delivery_date": "2026-02-01", "known_by": "2026-01-31T10:00:00Z"}
    )

    assert response.status_code == 422
    assert "January 2026" in response.json()["detail"]
