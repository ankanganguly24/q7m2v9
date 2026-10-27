export interface ForecastVintage {
  startTime: string;
  publishTime: string;
  generationMw: number;
  source: string;
}

export interface ActualGeneration {
  startTime: string;
  generationMw: number | null;
  source: string;
}

export interface ReviewDay {
  id: string;
  label: string;
  forecastVintages: ForecastVintage[];
  actuals: ActualGeneration[];
}

export interface ReviewOption {
  value: string;
  label: string;
}

export interface ForecastInterval {
  startTime: string;
  forecastMw: number | null;
  actualMw: number | null;
  signedErrorMw: number | null;
  absoluteErrorMw: number | null;
  forecastPublishTime: string | null;
}

export interface ForecastRevision {
  startTime: string;
  previousMw: number;
  currentMw: number;
  deltaMw: number;
  previousPublishTime: string;
  currentPublishTime: string;
}

export interface ReviewMetrics {
  maeMw: number | null;
  biasMw: number | null;
  completeIntervals: number;
  totalIntervals: number;
}

export interface LiveReviewData {
  deliveryDate: string;
  selectedCutoff: string;
  availableCutoffs: string[];
  selectedForecastPublishTime: string | null;
  forecastSource: string;
  actualSource: string;
  retrievedAt: string;
  metrics: ReviewMetrics;
  intervals: ForecastInterval[];
  revisions: ForecastRevision[];
}
