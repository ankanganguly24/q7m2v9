from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class IntervalResult(BaseModel):
    start_time: datetime
    forecast_mw: Optional[float] = None
    actual_mw: Optional[float] = None
    signed_error_mw: Optional[float] = None
    absolute_error_mw: Optional[float] = None
    forecast_publish_time: Optional[datetime] = None


class ReviewMetrics(BaseModel):
    mae_mw: Optional[float] = None
    bias_mw: Optional[float] = None
    complete_intervals: int = 0
    total_intervals: int = 0


class ForecastRevisionResult(BaseModel):
    start_time: datetime
    previous_mw: float
    current_mw: float
    delta_mw: float
    previous_publish_time: datetime
    current_publish_time: datetime


class ForecastReviewResponse(BaseModel):
    delivery_date: date
    selected_cutoff: datetime
    available_cutoffs: list[datetime] = Field(default_factory=list)
    selected_forecast_publish_time: Optional[datetime] = None
    forecast_source: str = "Elexon WINDFOR"
    actual_source: str = "Elexon FUELHH (WIND)"
    retrieved_at: datetime
    metrics: ReviewMetrics
    intervals: list[IntervalResult]
    revisions: list[ForecastRevisionResult] = Field(default_factory=list)


class DailyPerformance(BaseModel):
    delivery_date: date
    selected_cutoff: datetime
    metrics: ReviewMetrics


class PerformanceResponse(BaseModel):
    source: str = "Elexon Insights"
    retrieved_at: datetime
    days: list[DailyPerformance]
    total_metrics: ReviewMetrics


class ElexonRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")

    publishTime: datetime
    startTime: datetime
    generation: float
    fuelType: Optional[str] = None

