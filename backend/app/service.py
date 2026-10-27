from datetime import date, datetime, time, timedelta, timezone
from typing import Dict, Iterable, List, Optional, Protocol, Tuple
from zoneinfo import ZoneInfo

from .elexon import ElexonRecord
from .models import (
    DailyPerformance,
    ForecastRevisionResult,
    ForecastReviewResponse,
    IntervalResult,
    PerformanceResponse,
    ReviewMetrics,
)

LONDON = ZoneInfo("Europe/London")
ASSESSMENT_START = date(2026, 1, 1)
ASSESSMENT_END = date(2026, 2, 1)


class InvalidReviewRequest(ValueError):
    """Raised when a requested delivery date or cutoff is outside the brief."""


class ElexonGateway(Protocol):
    async def get_forecast_publications(
        self, first_delivery_date: date, after_last_delivery_date: date
    ) -> List[ElexonRecord]: ...

    async def get_actuals(
        self, first_delivery_date: date, after_last_delivery_date: date
    ) -> List[ElexonRecord]: ...


class ForecastService:
    def __init__(self, elexon: ElexonGateway) -> None:
        self._elexon = elexon

    async def get_review(
        self, delivery_date: date, known_by: Optional[datetime]
    ) -> ForecastReviewResponse:
        self._validate_delivery_date(delivery_date)
        previous_day = delivery_date - timedelta(days=1)
        publications, actuals = await self._fetch_date(delivery_date)
        available_cutoffs = sorted(
            {
                record.publishTime.astimezone(LONDON)
                for record in publications
                if record.publishTime.astimezone(LONDON).date() == previous_day
            }
        )
        selected_cutoff = self._validate_cutoff(delivery_date, known_by)
        if known_by is None and available_cutoffs:
            selected_cutoff = max(available_cutoffs)
        selected_forecasts = self._select_forecasts(publications, delivery_date, selected_cutoff)
        intervals, metrics = self._build_intervals(selected_forecasts, actuals)
        revisions = self._build_revisions(publications, delivery_date, selected_cutoff)
        selected_publication = max(
            (record.publishTime for record in selected_forecasts.values()), default=None
        )
        return ForecastReviewResponse(
            delivery_date=delivery_date,
            selected_cutoff=selected_cutoff,
            available_cutoffs=available_cutoffs,
            selected_forecast_publish_time=selected_publication,
            retrieved_at=datetime.now(timezone.utc),
            metrics=metrics,
            intervals=intervals,
            revisions=revisions,
        )

    async def get_month_performance(self) -> PerformanceResponse:
        delivery_dates = [
            ASSESSMENT_START + timedelta(days=offset)
            for offset in range((ASSESSMENT_END - ASSESSMENT_START).days)
        ]
        publications, actuals = await self._elexon.get_forecast_publications(
            ASSESSMENT_START, ASSESSMENT_END
        ), await self._elexon.get_actuals(ASSESSMENT_START, ASSESSMENT_END)
        rows: List[DailyPerformance] = []
        all_complete: List[Tuple[float, float]] = []
        for delivery_date in delivery_dates:
            previous_day = delivery_date - timedelta(days=1)
            cutoff_candidates = [
                record.publishTime.astimezone(LONDON)
                for record in publications
                if self._record_delivery_date(record) == delivery_date
                and record.publishTime.astimezone(LONDON).date() == previous_day
            ]
            if not cutoff_candidates:
                rows.append(
                    DailyPerformance(
                        delivery_date=delivery_date,
                        selected_cutoff=datetime.combine(delivery_date, time.min, LONDON),
                        metrics=ReviewMetrics(),
                    )
                )
                continue
            cutoff = max(cutoff_candidates)
            forecasts = self._select_forecasts(publications, delivery_date, cutoff)
            daily_actuals = {
                self._interval_key(record.startTime): record
                for record in actuals
                if self._record_delivery_date(record) == delivery_date
            }
            daily_forecasts = {
                key: record
                for key, record in forecasts.items()
                if self._record_delivery_date(record) == delivery_date
            }
            _, metrics = self._build_intervals(daily_forecasts, daily_actuals.values())
            rows.append(
                DailyPerformance(
                    delivery_date=delivery_date,
                    selected_cutoff=cutoff,
                    metrics=metrics,
                )
            )
            pairs = self._complete_pairs(daily_forecasts, daily_actuals)
            all_complete.extend(pairs)
        return PerformanceResponse(
            retrieved_at=datetime.now(timezone.utc),
            days=rows,
            total_metrics=self._calculate_metrics(all_complete, sum(row.metrics.total_intervals for row in rows)),
        )

    async def _fetch_date(
        self, delivery_date: date
    ) -> Tuple[List[ElexonRecord], List[ElexonRecord]]:
        publications, actuals = await self._elexon.get_forecast_publications(
            delivery_date, delivery_date + timedelta(days=1)
        ), await self._elexon.get_actuals(delivery_date, delivery_date + timedelta(days=1))
        # The API is queried only for the previous and selected delivery dates; apply the
        # cutoff in-domain so the same filtering logic is used for every provider response.
        return publications, actuals

    @staticmethod
    def _validate_delivery_date(delivery_date: date) -> None:
        if not ASSESSMENT_START <= delivery_date < ASSESSMENT_END:
            raise InvalidReviewRequest("Delivery date must be in January 2026.")

    @staticmethod
    def _validate_cutoff(delivery_date: date, known_by: Optional[datetime]) -> datetime:
        previous_day = delivery_date - timedelta(days=1)
        if known_by is None:
            return datetime.combine(delivery_date, time.min, LONDON) - timedelta(microseconds=1)
        if known_by.tzinfo is None or known_by.utcoffset() is None:
            raise InvalidReviewRequest("known_by must include a timezone offset.")
        cutoff_local = known_by.astimezone(LONDON)
        if cutoff_local.date() != previous_day:
            raise InvalidReviewRequest("known_by must fall on the day before delivery.")
        return cutoff_local

    @classmethod
    def _select_forecasts(
        cls, records: Iterable[ElexonRecord], delivery_date: date, cutoff: datetime
    ) -> Dict[datetime, ElexonRecord]:
        selected: Dict[datetime, ElexonRecord] = {}
        cutoff_utc = cutoff.astimezone(timezone.utc)
        for record in records:
            if cls._record_delivery_date(record) != delivery_date:
                continue
            if record.publishTime.astimezone(timezone.utc) > cutoff_utc:
                continue
            key = cls._interval_key(record.startTime)
            current = selected.get(key)
            if current is None or record.publishTime > current.publishTime:
                selected[key] = record
        return selected

    @classmethod
    def _build_intervals(
        cls,
        forecasts: Dict[datetime, ElexonRecord],
        actuals: Iterable[ElexonRecord],
    ) -> Tuple[List[IntervalResult], ReviewMetrics]:
        actual_by_interval = {cls._interval_key(record.startTime): record for record in actuals}
        keys = sorted(set(forecasts) | set(actual_by_interval))
        intervals: List[IntervalResult] = []
        complete: List[Tuple[float, float]] = []
        for key in keys:
            forecast = forecasts.get(key)
            actual = actual_by_interval.get(key)
            forecast_mw = forecast.generation if forecast is not None else None
            actual_mw = actual.generation if actual is not None else None
            signed_error = forecast_mw - actual_mw if forecast_mw is not None and actual_mw is not None else None
            absolute_error = abs(signed_error) if signed_error is not None else None
            if signed_error is not None and absolute_error is not None:
                complete.append((signed_error, absolute_error))
            intervals.append(
                IntervalResult(
                    start_time=key,
                    forecast_mw=forecast_mw,
                    actual_mw=actual_mw,
                    signed_error_mw=signed_error,
                    absolute_error_mw=absolute_error,
                    forecast_publish_time=forecast.publishTime if forecast is not None else None,
                )
            )
        return intervals, cls._calculate_metrics(complete, len(keys))

    @classmethod
    def _build_revisions(
        cls, records: Iterable[ElexonRecord], delivery_date: date, cutoff: datetime
    ) -> List[ForecastRevisionResult]:
        by_interval: Dict[datetime, List[ElexonRecord]] = {}
        cutoff_utc = cutoff.astimezone(timezone.utc)
        for record in records:
            if cls._record_delivery_date(record) != delivery_date:
                continue
            if record.publishTime.astimezone(timezone.utc) > cutoff_utc:
                continue
            by_interval.setdefault(cls._interval_key(record.startTime), []).append(record)
        revisions: List[ForecastRevisionResult] = []
        for interval, vintages in by_interval.items():
            ordered = sorted(vintages, key=lambda record: record.publishTime)
            for previous, current in zip(ordered, ordered[1:]):
                revisions.append(
                    ForecastRevisionResult(
                        start_time=interval,
                        previous_mw=previous.generation,
                        current_mw=current.generation,
                        delta_mw=current.generation - previous.generation,
                        previous_publish_time=previous.publishTime,
                        current_publish_time=current.publishTime,
                    )
                )
        return sorted(revisions, key=lambda revision: abs(revision.delta_mw), reverse=True)

    @staticmethod
    def _complete_pairs(
        forecasts: Dict[datetime, ElexonRecord], actuals: Dict[datetime, ElexonRecord]
    ) -> List[Tuple[float, float]]:
        return [
            (forecast.generation - actuals[key].generation, abs(forecast.generation - actuals[key].generation))
            for key, forecast in forecasts.items()
            if key in actuals
        ]

    @staticmethod
    def _calculate_metrics(
        complete: List[Tuple[float, float]], total_intervals: int
    ) -> ReviewMetrics:
        if not complete:
            return ReviewMetrics(complete_intervals=0, total_intervals=total_intervals)
        return ReviewMetrics(
            mae_mw=sum(absolute for _, absolute in complete) / len(complete),
            bias_mw=sum(signed for signed, _ in complete) / len(complete),
            complete_intervals=len(complete),
            total_intervals=total_intervals,
        )

    @staticmethod
    def _interval_key(value: datetime) -> datetime:
        if value.tzinfo is None or value.utcoffset() is None:
            raise InvalidReviewRequest("Elexon returned a timestamp without a timezone.")
        return value.astimezone(timezone.utc)

    @classmethod
    def _record_delivery_date(cls, record: ElexonRecord) -> date:
        return cls._interval_key(record.startTime).astimezone(LONDON).date()
