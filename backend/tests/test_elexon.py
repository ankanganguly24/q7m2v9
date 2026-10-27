import json
from datetime import date
from urllib.parse import parse_qs, urlparse

import httpx
import pytest

from app.elexon import ElexonClient, ElexonClientError


@pytest.mark.asyncio
async def test_actuals_request_filters_wind_and_normalizes_provider_rows() -> None:
    request_urls = []

    async def handler(request: httpx.Request) -> httpx.Response:
        request_urls.append(str(request.url))
        return httpx.Response(
            200,
            json=[
                {
                    "dataset": "FUELHH",
                    "publishTime": "2026-01-20T00:00:00Z",
                    "startTime": "2026-01-19T00:00:00Z",
                    "settlementDate": "2026-01-19",
                    "settlementPeriod": 1,
                    "fuelType": "WIND",
                    "generation": 100,
                },
                {
                    "dataset": "FUELHH",
                    "publishTime": "2026-01-20T00:00:00Z",
                    "startTime": "2026-01-19T00:00:00Z",
                    "settlementDate": "2026-01-19",
                    "settlementPeriod": 1,
                    "fuelType": "GAS",
                    "generation": 50,
                },
            ],
        )

    client = ElexonClient(
        "https://example.test/bmrs/api/v1", transport=httpx.MockTransport(handler)
    )
    records = await client.get_actuals(
        date(2026, 1, 19), date(2026, 1, 20)
    )

    assert len(records) == 1
    assert records[0].generation == 100
    query = parse_qs(urlparse(request_urls[0]).query)
    assert query["fuelType"] == ["WIND"]
    assert query["settlementDateFrom"] == ["2026-01-19"]
    assert query["settlementDateTo"] == ["2026-01-19"]


@pytest.mark.asyncio
async def test_invalid_provider_shape_raises_a_safe_domain_error() -> None:
    async def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(200, content=json.dumps({"data": []}).encode())

    client = ElexonClient(
        "https://example.test/bmrs/api/v1", transport=httpx.MockTransport(handler)
    )

    with pytest.raises(ElexonClientError):
        await client.get_actuals(
            date(2026, 1, 19), date(2026, 1, 20)
        )


@pytest.mark.asyncio
async def test_forecast_request_keeps_only_target_delivery_day_rows() -> None:
    request_urls = []

    async def handler(request: httpx.Request) -> httpx.Response:
        request_urls.append(str(request.url))
        return httpx.Response(
            200,
            json=[
                {"publishTime": "2026-01-18T09:00:00Z", "startTime": "2026-01-19T00:00:00Z", "generation": 100},
                {"publishTime": "2026-01-18T09:00:00Z", "startTime": "2026-01-20T00:00:00Z", "generation": 200},
            ],
        )

    client = ElexonClient(
        "https://example.test/bmrs/api/v1", transport=httpx.MockTransport(handler)
    )
    records = await client.get_forecast_publications(date(2026, 1, 19), date(2026, 1, 20))

    assert len(records) == 1
    assert records[0].generation == 100
    query = parse_qs(urlparse(request_urls[0]).query)
    assert query["publishDateTimeFrom"] == ["2026-01-18T00:00:00Z"]
    assert query["publishDateTimeTo"] == ["2026-01-20T00:00:00Z"]
