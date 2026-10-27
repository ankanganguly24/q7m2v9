from datetime import date, datetime
from typing import Any, Optional

import httpx

from .models import ElexonRecord


class ElexonClientError(Exception):
    """Raised when Elexon is unavailable or returns an unusable response."""


class ElexonClient:
    def __init__(
        self,
        base_url: str,
        timeout_seconds: float = 15.0,
        transport: Optional[httpx.AsyncBaseTransport] = None,
    ) -> None:
        self._base_url = base_url.rstrip("/")
        self._timeout_seconds = timeout_seconds
        self._transport = transport

    async def get_forecast_publications(
        self, first_delivery_date: date, after_last_delivery_date: date
    ) -> list[ElexonRecord]:
        first_publish_date = date.fromordinal(first_delivery_date.toordinal() - 1)
        params = {
            "publishDateTimeFrom": f"{first_publish_date.isoformat()}T00:00:00Z",
            "publishDateTimeTo": f"{after_last_delivery_date.isoformat()}T00:00:00Z",
        }
        rows = await self._get_rows("WINDFOR/stream", params)
        return [
            self._parse_record(row, include_fuel_type=False)
            for row in rows
            if self._target_date(row) is not None
            and first_delivery_date <= self._target_date(row) < after_last_delivery_date
        ]

    async def get_actuals(
        self, first_delivery_date: date, after_last_delivery_date: date
    ) -> list[ElexonRecord]:
        params = {
            "settlementDateFrom": first_delivery_date.isoformat(),
            "settlementDateTo": date.fromordinal(after_last_delivery_date.toordinal() - 1).isoformat(),
            "fuelType": "WIND",
        }
        rows = await self._get_rows("FUELHH/stream", params)
        return [
            self._parse_record(row, include_fuel_type=True)
            for row in rows
            if str(row.get("fuelType", "")).upper() == "WIND"
        ]

    async def _get_rows(self, path: str, params: dict[str, str]) -> list[dict[str, Any]]:
        url = f"{self._base_url}/datasets/{path}"
        try:
            async with httpx.AsyncClient(
                timeout=self._timeout_seconds, transport=self._transport
            ) as client:
                response = await client.get(url, params=params)
                response.raise_for_status()
                payload = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            raise ElexonClientError("Elexon data could not be retrieved.") from exc

        if not isinstance(payload, list) or any(not isinstance(row, dict) for row in payload):
            raise ElexonClientError("Elexon returned an unexpected data format.")
        return payload

    @staticmethod
    def _target_date(row: dict[str, Any]) -> Optional[date]:
        value = row.get("startTime")
        if not isinstance(value, str):
            return None
        try:
            return datetime.fromisoformat(value.replace("Z", "+00:00")).date()
        except ValueError:
            return None

    @staticmethod
    def _parse_record(row: dict[str, Any], include_fuel_type: bool) -> ElexonRecord:
        selected = {
            "publishTime": row.get("publishTime"),
            "startTime": row.get("startTime"),
            "generation": row.get("generation"),
        }
        if include_fuel_type:
            selected["fuelType"] = row.get("fuelType")
        try:
            return ElexonRecord.model_validate(selected)
        except Exception as exc:
            raise ElexonClientError("Elexon returned a record with invalid fields.") from exc
