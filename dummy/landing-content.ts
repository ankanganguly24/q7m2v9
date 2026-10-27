export const LANDING_COPY = {
  productName: "Gridline",
  navWhy: "Why Gridline",
  navHow: "How it works",
  navWorkspace: "Platform",
  openWorkspace: "Open the workspace",
  eyebrow: "AI-ASSISTED RENEWABLE INTELLIGENCE",
  heroTitle: "Make every forecast decision explainable.",
  heroDescription: "Bring forecast history, asset performance and AI-assisted analysis into one clear view—so energy teams can understand what changed and act with context.",
  primaryCta: "Explore the platform",
  secondaryCta: "See how it works",
  previewEyebrow: "FORECAST REVIEW · SAMPLE VIEW",
  previewTitle: "Forecast performance",
  previewLabel: "SAMPLE ANALYSIS",
  previewForecast: "Forecast at selected time",
  previewActual: "Actual generation",
  previewMae: "Mean absolute error",
  previewBias: "Signed bias",
  previewDay: "19 January 2026 · GB wind",
  previewContext: "As known at 09:30 GMT",
  problemEyebrow: "THE CHALLENGE",
  problemTitle: "Energy decisions move fast. The evidence is scattered.",
  problemDescription: "Forecasts update. Assets perform differently than expected. Analysts then have to piece together what was known, what changed and what happened—often across disconnected files and dashboards.",
  problemCallout: "Gridline brings the decision timeline and its evidence into one place.",
  workflowEyebrow: "A CLEARER REVIEW",
  workflowTitle: "From changing forecasts to a decision you can explain.",
  workflowDescription: "Keep the chosen forecast, realized generation and analysis together, so every review starts from the same evidence.",
  stepOneTitle: "Set the decision context",
  stepOneBody: "Choose an asset, operating day and forecast publication time to see exactly what was available then.",
  stepTwoTitle: "Measure what happened",
  stepTwoBody: "Compare forecast and actual generation on one timeline, with transparent error and bias measures.",
  stepThreeTitle: "Review the drivers",
  stepThreeBody: "Trace revisions and use an AI-assisted briefing to surface the changes that deserve attention.",
  capabilityEyebrow: "THE PLATFORM",
  capabilityTitle: "The tools to move from data to a clearer view.",
  capabilityOneTitle: "Forecast vintages",
  capabilityOneBody: "Revisit earlier forecasts by publication time and keep each decision anchored to what was known.",
  capabilityTwoTitle: "Performance analytics",
  capabilityTwoBody: "Compare expected and actual generation with clear interval-level evidence and explainable metrics.",
  capabilityThreeTitle: "Asset and portfolio views",
  capabilityThreeBody: "Bring performance context together across assets to spot patterns, outliers and follow-up questions.",
  capabilityFourTitle: "Decision-ready briefs",
  capabilityFourBody: "Turn a review into a concise, shareable account of the data, drivers and next questions.",
  aiEyebrow: "AI WITH THE EVIDENCE IN VIEW",
  aiTitle: "An analyst copilot that shows its working.",
  aiDescription: "Ask what changed, where the forecast missed and which intervals matter. Gridline’s AI experience is designed to connect its explanation to the underlying time series and revision history.",
  aiPrompt: "Why did actual generation diverge from the 09:30 forecast?",
  aiAnswerTitle: "Review summary",
  aiAnswer: "The largest differences appear in the late afternoon. Compare the 09:30 forecast with the next published revision around those intervals before attributing the change to an operational issue.",
  aiEvidence: "Linked evidence · forecast revisions · 48 intervals",
  aiAction: "Open the supporting intervals",
  audienceEyebrow: "BUILT FOR ENERGY DECISION TEAMS",
  audienceTitle: "One evidence trail, useful across the team.",
  audienceOneTitle: "Renewable operators",
  audienceOneBody: "Understand asset performance, investigate forecast misses and carry operational context into reviews.",
  audienceTwoTitle: "Forecasting and analytics teams",
  audienceTwoBody: "Compare model vintages, monitor error patterns and explain performance with traceable evidence.",
  audienceThreeTitle: "Investors and asset managers",
  audienceThreeBody: "Review operating performance against expectations and focus diligence on the assumptions that matter.",
  faqEyebrow: "COMMON QUESTIONS",
  faqTitle: "A little more about Gridline.",
  faqOneQuestion: "What does Gridline help a team do?",
  faqOneAnswer: "Gridline organizes forecast versions, actual generation and review measures so a team can understand how an asset performed and what information was available when a decision was made.",
  faqTwoQuestion: "How does AI fit into the workflow?",
  faqTwoAnswer: "The AI experience is designed to summarize changes, answer questions about the selected review and point back to relevant intervals and forecast revisions. Analysts stay in control of interpretation and decisions.",
  faqThreeQuestion: "Who is Gridline for?",
  faqThreeAnswer: "It is designed for renewable operators, forecasting and analytics teams, and investors or asset managers who need a clearer view of renewable asset performance.",
  faqFourQuestion: "Does Gridline execute trades or operate assets?",
  faqFourAnswer: "No. Gridline is an analysis and review workspace. It helps teams understand evidence and performance; people remain responsible for operational and investment decisions.",
  faqFiveQuestion: "Can I explore the product?",
  faqFiveAnswer: "Yes. Open the workspace to explore a sample wind forecast review, performance measures and the supporting analysis flow.",
  closingEyebrow: "START A CONVERSATION",
  closingTitle: "Bring your hardest forecast review.",
  closingDescription: "Explore the workflow, see how the evidence connects and shape the next analysis around a real energy question.",
  footerWorkspace: "Open workspace",
  previewContextLine: "GB wind generation · 19 January 2026",
  unitMw: "MW",
} as const;

export const LANDING_SEO = {
  title: "AI-Assisted Renewable Energy Intelligence | Gridline",
  description: "Connect renewable forecasts, asset performance and evidence-led AI analysis to make energy decisions easier to understand.",
  keywords: ["renewable energy AI", "wind forecasting", "asset performance", "energy analytics", "forecast review"],
} as const;

export const LANDING_SOCIAL = {
  title: "Make every forecast decision explainable.",
  description: "Forecast history, asset performance and AI-assisted energy analysis.",
  eyebrow: "AI-ASSISTED RENEWABLE INTELLIGENCE",
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
