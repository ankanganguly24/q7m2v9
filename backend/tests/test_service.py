from datetime import date, datetime, timezone
from typing import List

import pytest

from app.elexon import ElexonRecord
from app.service import ForecastService, InvalidReviewRequest


def record(publish_time: str, start_time: str, generation: float) -> ElexonRecord:
    return ElexonRecord(
        publishTime=datetime.fromisoformat(publish_time.replace("Z", "+00:00")),
        startTime=datetime.fromisoformat(start_time.replace("Z", "+00:00")),
        generation=generation,
    )


class FakeElexonClient:
    def __init__(self, forecasts: List[ElexonRecord], actuals: List[ElexonRecord]) -> None:
        self.forecasts = forecasts
        self.actuals = actuals

    async def get_forecast_publications(self, start: date, end: date) -> List[ElexonRecord]:
        return self.forecasts

    async def get_actuals(self, start: date, end: date) -> List[ElexonRecord]:
        return self.actuals


@pytest.mark.asyncio
async def test_review_selects_latest_forecast_at_or_before_cutoff_and_calculates_metrics() -> None:
    client = FakeElexonClient(
        forecasts=[
            record("2026-01-18T08:00:00Z", "2026-01-19T00:00:00Z", 110.0),
            record("2026-01-18T09:00:00Z", "2026-01-19T00:00:00Z", 120.0),
            record("2026-01-18T09:00:00Z", "2026-01-19T00:30:00Z", 90.0),
            record("2026-01-18T11:00:00Z", "2026-01-19T00:00:00Z", 130.0),
        ],
        actuals=[
            record("2026-01-20T00:00:00Z", "2026-01-19T00:00:00Z", 100.0),
            record("2026-01-20T00:00:00Z", "2026-01-19T00:30:00Z", 80.0),
        ],
    )
    service = ForecastService(client)

    result = await service.get_review(
        date(2026, 1, 19), datetime(2026, 1, 18, 10, 0, tzinfo=timezone.utc)
    )

    assert result.intervals[0].forecast_mw == 120.0
    assert result.intervals[0].actual_mw == 100.0
    assert result.intervals[0].signed_error_mw == 20.0
    assert result.metrics.mae_mw == 15.0
    assert result.metrics.bias_mw == 15.0
    assert result.metrics.complete_intervals == 2
    assert result.selected_forecast_publish_time == datetime(
        2026, 1, 18, 9, 0, tzinfo=timezone.utc
    )


@pytest.mark.asyncio
async def test_missing_pairs_are_excluded_without_filling_values() -> None:
    client = FakeElexonClient(
        forecasts=[record("2026-01-18T09:00:00Z", "2026-01-19T00:00:00Z", 110.0)],
        actuals=[record("2026-01-20T00:00:00Z", "2026-01-19T00:30:00Z", 80.0)],
    )
    service = ForecastService(client)

    result = await service.get_review(
        date(2026, 1, 19), datetime(2026, 1, 18, 10, 0, tzinfo=timezone.utc)
    )

    assert result.metrics.complete_intervals == 0
    assert result.metrics.mae_mw is None
    assert result.intervals[0].actual_mw is None
    assert result.intervals[1].forecast_mw is None


@pytest.mark.asyncio
async def test_review_rejects_dates_outside_assessment_month() -> None:
    service = ForecastService(FakeElexonClient([], []))

    with pytest.raises(InvalidReviewRequest):
        await service.get_review(
            date(2026, 2, 1), datetime(2026, 1, 31, 10, 0, tzinfo=timezone.utc)
        )


@pytest.mark.asyncio
async def test_review_rejects_cutoff_outside_previous_day() -> None:
    service = ForecastService(FakeElexonClient([], []))

    with pytest.raises(InvalidReviewRequest):
        await service.get_review(
            date(2026, 1, 19), datetime(2026, 1, 19, 8, 0, tzinfo=timezone.utc)
        )


@pytest.mark.asyncio
async def test_review_rejects_cutoff_without_timezone() -> None:
    service = ForecastService(FakeElexonClient([], []))

    with pytest.raises(InvalidReviewRequest, match="timezone offset"):
        await service.get_review(date(2026, 1, 19), datetime(2026, 1, 18, 10, 0))


@pytest.mark.asyncio
async def test_default_cutoff_uses_latest_publication_on_previous_local_day() -> None:
    client = FakeElexonClient(
        forecasts=[
            record("2026-01-18T22:00:00Z", "2026-01-19T00:00:00Z", 90.0),
            record("2026-01-18T23:00:00Z", "2026-01-19T00:00:00Z", 110.0),
            # This publication is after midnight in London and must not count as day-ahead.
            record("2026-01-19T00:15:00Z", "2026-01-19T00:00:00Z", 150.0),
        ],
        actuals=[record("2026-01-20T00:00:00Z", "2026-01-19T00:00:00Z", 100.0)],
    )

    result = await ForecastService(client).get_review(date(2026, 1, 19), None)

    assert result.selected_cutoff == datetime(2026, 1, 18, 23, 0, tzinfo=timezone.utc)
    assert result.intervals[0].forecast_mw == 110.0


@pytest.mark.asyncio
async def test_review_reports_revision_changes_only_through_selected_cutoff() -> None:
    client = FakeElexonClient(
        forecasts=[
            record("2026-01-18T08:00:00Z", "2026-01-19T00:00:00Z", 90.0),
            record("2026-01-18T09:00:00Z", "2026-01-19T00:00:00Z", 110.0),
            record("2026-01-18T11:00:00Z", "2026-01-19T00:00:00Z", 160.0),
        ],
        actuals=[],
    )

    result = await ForecastService(client).get_review(
        date(2026, 1, 19), datetime(2026, 1, 18, 10, 0, tzinfo=timezone.utc)
    )

    assert len(result.revisions) == 1
    assert result.revisions[0].previous_mw == 90.0
    assert result.revisions[0].current_mw == 110.0
    assert result.revisions[0].delta_mw == 20.0


@pytest.mark.asyncio
async def test_default_review_uses_latest_publication_from_previous_day() -> None:
    client = FakeElexonClient(
        forecasts=[
            record("2026-01-18T08:00:00Z", "2026-01-19T00:00:00Z", 90.0),
            record("2026-01-18T09:00:00Z", "2026-01-19T00:00:00Z", 110.0),
        ],
        actuals=[record("2026-01-20T00:00:00Z", "2026-01-19T00:00:00Z", 100.0)],
    )
    result = await ForecastService(client).get_review(date(2026, 1, 19), None)

    assert result.selected_cutoff == datetime(2026, 1, 18, 9, 0, tzinfo=timezone.utc)
    assert result.intervals[0].forecast_mw == 110.0
