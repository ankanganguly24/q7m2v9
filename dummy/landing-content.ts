export const LANDING_COPY = {
  productName: "Gridline",
  navWhy: "Why Gridline",
  navHow: "How it works",
  navWorkspace: "Platform",
  openWorkspace: "Open the workspace",
  eyebrow: "DAY-AHEAD WIND FORECAST REVIEW",
  heroTitle: "See the wind forecast before the buying decision.",
  heroDescription: "Review the national wind outlook available before delivery, then measure it against the generation that actually followed.",
  primaryCta: "Explore the platform",
  secondaryCta: "See how it works",
  previewEyebrow: "FORECAST REVIEW · ILLUSTRATIVE PREVIEW",
  previewTitle: "Forecast performance",
  previewLabel: "ILLUSTRATIVE DATA",
  previewForecast: "Forecast at selected time",
  previewActual: "Actual generation",
  previewMae: "Mean absolute error",
  previewBias: "Signed bias",
  previewDay: "19 January 2026 · GB wind",
  previewContext: "Open the workspace for live Elexon data",
  problemEyebrow: "THE CHALLENGE",
  problemTitle: "Buying power tomorrow depends on a forecast made today.",
  problemDescription: "Wind generation changes with the weather, and buyers must plan before delivery. They need to know which forecast was available for that decision and how much confidence past forecasts earned.",
  problemCallout: "Gridline puts the forecast vintage and its later accuracy on one timeline.",
  workflowEyebrow: "THE BUYER'S REVIEW",
  workflowTitle: "From day-ahead wind signal to measurable accuracy.",
  workflowDescription: "Choose the delivery date, inspect the forecast available the day before, and compare it with Elexon wind outturn.",
  stepOneTitle: "Choose the delivery day",
  stepOneBody: "Select a January 2026 day and the forecast publication cutoff to reconstruct the information available beforehand.",
  stepTwoTitle: "Compare forecast with outturn",
  stepTwoBody: "Review national wind generation by target interval, with exact timestamp matches and missing intervals kept visible.",
  stepThreeTitle: "Measure the forecast miss",
  stepThreeBody: "Use mean absolute error and signed bias to understand the size and direction of forecast error.",
  capabilityEyebrow: "THE PLATFORM",
  capabilityTitle: "The evidence a day-ahead buyer needs to review.",
  capabilityOneTitle: "Forecast vintages",
  capabilityOneBody: "Select the forecast published by your chosen cutoff on the day before delivery.",
  capabilityTwoTitle: "Performance analytics",
  capabilityTwoBody: "Compare forecast and actual national wind generation at matching timestamps.",
  capabilityThreeTitle: "Forecast revisions",
  capabilityThreeBody: "Inspect how the national wind forecast changed across publication rounds.",
  capabilityFourTitle: "Transparent metrics",
  capabilityFourBody: "See how MAE and signed bias are calculated and which intervals were matched.",
  evidenceEyebrow: "EVIDENCE YOU CAN CHECK",
  evidenceTitle: "Every score connects back to a published forecast and interval.",
  evidenceDescription: "Gridline shows the forecast publication time, target interval, actual outturn and coverage behind the reported accuracy. The assessment prototype does not make the procurement decision for the buyer.",
  evidenceQuestion: "What does this forecast score include?",
  evidenceAnswerTitle: "Evidence summary",
  evidenceAnswer: "Only intervals with both a selected WINDFOR value and a matching FUELHH wind outturn are scored. Missing values stay missing; they are never filled in or treated as a buying recommendation.",
  evidenceSources: "WINDFOR publication · FUELHH outturn · matched intervals",
  evidenceAction: "Inspect the forecast review",
  audienceEyebrow: "FOR THE DAY-AHEAD BUYING WORKFLOW",
  audienceTitle: "A shared forecast view for buyers and analysts.",
  audienceOneTitle: "Utility procurement buyers",
  audienceOneBody: "See the national wind forecast available before the delivery day and use its measured accuracy as decision context.",
  audienceTwoTitle: "Market analysts",
  audienceTwoBody: "Review publication vintages, interval-level errors, and forecast coverage with a clear data trail.",
  audienceThreeTitle: "Technical reviewers",
  audienceThreeBody: "Trace the reported metrics to Elexon source records and the code that selects the forecast vintage.",
  faqEyebrow: "COMMON QUESTIONS",
  faqTitle: "A little more about Gridline.",
  faqOneQuestion: "What does Gridline help a team do?",
  faqOneAnswer: "Gridline organizes forecast versions, actual generation and review measures so a team can understand how an asset performed and what information was available when a decision was made.",
  faqTwoQuestion: "Does Gridline tell the buyer how much power to buy?",
  faqTwoAnswer: "No. The assessment data includes wind forecasts and actual wind generation, but not consumer demand, prices, contracts, or the buyer’s market position.",
  faqThreeQuestion: "Who is Gridline for?",
  faqThreeAnswer: "The assessment workflow is designed for UK utility day-ahead procurement buyers and the analysts who support their buying decisions.",
  faqFourQuestion: "Which data does the review use?",
  faqFourAnswer: "The assessment uses Elexon WINDFOR wind forecasts and FUELHH actual generation filtered to WIND for January 2026.",
  faqFiveQuestion: "Can I explore the product?",
  faqFiveAnswer: "Yes. Open the workspace to explore live Elexon records, forecast cutoffs, accuracy measures and the supporting data definitions.",
  closingEyebrow: "START A CONVERSATION",
  closingTitle: "Review the wind forecast before the next buying decision.",
  closingDescription: "Open the January 2026 workspace to inspect Elexon forecasts, matching outturn and quantified forecast accuracy.",
  footerWorkspace: "Open workspace",
  previewContextLine: "Illustrative preview · GB national wind · January 2026",
  unitMw: "MW",
} as const;

export const LANDING_SEO = {
  title: "Day-Ahead Wind Forecast Review | Gridline",
  description: "Review UK national wind forecasts available before delivery and measure them against Elexon generation outturn.",
  keywords: ["UK wind forecast", "day-ahead procurement", "Elexon", "forecast accuracy", "energy analytics"],
} as const;

export const LANDING_SOCIAL = {
  title: "Make every forecast decision explainable.",
  description: "Review national wind forecast vintages and measured accuracy against Elexon outturn.",
  eyebrow: "DAY-AHEAD WIND FORECAST REVIEW",
  background: "#111412",
  panel: "#1c211e",
  paper: "#f4f5ef",
  muted: "#adb4ac",
  line: "#333b35",
  signal: "#c6df82",
  chartBackground: "#141815",
} as const;

export const LANDING_SOCIAL_CHART = {
  width: 496,
  height: 272,
  viewBox: "0 0 496 272",
  gridY: [36, 88, 140, 192, 244],
  plotLeft: 22,
  plotRight: 474,
  plotTop: 18,
  plotBottom: 254,
  maxMw: 10000,
} as const;

export const LANDING_STEPS = [
  { number: "01", title: LANDING_COPY.stepOneTitle, description: LANDING_COPY.stepOneBody },
  { number: "02", title: LANDING_COPY.stepTwoTitle, description: LANDING_COPY.stepTwoBody },
  { number: "03", title: LANDING_COPY.stepThreeTitle, description: LANDING_COPY.stepThreeBody },
] as const;

export const LANDING_CAPABILITIES = [
  { id: "history", title: LANDING_COPY.capabilityOneTitle, description: LANDING_COPY.capabilityOneBody },
  { id: "measures", title: LANDING_COPY.capabilityTwoTitle, description: LANDING_COPY.capabilityTwoBody },
  { id: "portfolio", title: LANDING_COPY.capabilityThreeTitle, description: LANDING_COPY.capabilityThreeBody },
  { id: "briefing", title: LANDING_COPY.capabilityFourTitle, description: LANDING_COPY.capabilityFourBody },
] as const;

export const LANDING_AUDIENCES = [
  { title: LANDING_COPY.audienceOneTitle, description: LANDING_COPY.audienceOneBody },
  { title: LANDING_COPY.audienceTwoTitle, description: LANDING_COPY.audienceTwoBody },
  { title: LANDING_COPY.audienceThreeTitle, description: LANDING_COPY.audienceThreeBody },
] as const;

export const LANDING_FAQS = [
  { question: LANDING_COPY.faqOneQuestion, answer: LANDING_COPY.faqOneAnswer },
  { question: LANDING_COPY.faqTwoQuestion, answer: LANDING_COPY.faqTwoAnswer },
  { question: LANDING_COPY.faqThreeQuestion, answer: LANDING_COPY.faqThreeAnswer },
  { question: LANDING_COPY.faqFourQuestion, answer: LANDING_COPY.faqFourAnswer },
  { question: LANDING_COPY.faqFiveQuestion, answer: LANDING_COPY.faqFiveAnswer },
] as const;

export const LANDING_PREVIEW = {
  dayId: "2026-01-19",
  knowledgeTime: "09:30",
} as const;

export const LANDING_PREVIEW_GRID_VALUES = [2500, 5000, 7500, 10000] as const;
