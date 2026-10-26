export const LANDING_COPY = {
  productName: "Gridline",
  navWhy: "Why it matters",
  navHow: "How it works",
  navWorkspace: "Workspace preview",
  openWorkspace: "Open the workspace",
  eyebrow: "WIND FORECAST REVIEW FOR ENERGY TEAMS",
  heroTitle: "Know what the forecast said. See what actually happened.",
  heroDescription: "Gridline helps electricity teams review wind forecasts as they were published, compare them with actual generation, and learn where the signal changed.",
  primaryCta: "Explore the workspace",
  secondaryCta: "See how it works",
  previewEyebrow: "A CLEARER LOOK AT THE SIGNAL",
  previewTitle: "One operating day, one shared view",
  previewLabel: "ILLUSTRATIVE SAMPLE",
  previewForecast: "Forecast",
  previewActual: "Actual",
  previewMae: "Mean absolute error",
  previewBias: "Signed bias",
  previewDay: "19 Jan 2026 · Great Britain wind",
  problemEyebrow: "THE PROBLEM",
  problemTitle: "A forecast is a snapshot of what was expected then.",
  problemDescription: "Wind output changes with the weather. Teams plan ahead using forecasts, but the final generation figure only becomes clear later. If forecast updates overwrite one another, it is hard to reconstruct what the team saw when it made a decision.",
  problemCallout: "You shouldn’t need to guess what the forecast used to say.",
  workflowEyebrow: "A SIMPLE REVIEW LOOP",
  workflowTitle: "From published forecast to useful learning.",
  workflowDescription: "Keep the timeline visible, measure the miss, and carry the evidence into the next review.",
  stepOneTitle: "Choose what was known",
  stepOneBody: "Pick an operating day and a time. Gridline shows only forecasts published by then.",
  stepTwoTitle: "Compare with what happened",
  stepTwoBody: "See forecast and actual wind generation on the same half-hour timeline, with error measured in MW.",
  stepThreeTitle: "Understand what changed",
  stepThreeBody: "Review later forecast revisions and a concise, evidence-based summary of the selected view.",
  capabilityEyebrow: "BUILT FOR CLARITY",
  capabilityTitle: "The evidence stays close to the answer.",
  capabilityOneTitle: "Forecast history",
  capabilityOneBody: "Reconstruct earlier forecast vintages instead of looking only at the latest number.",
  capabilityTwoTitle: "Transparent measures",
  capabilityTwoBody: "See how forecast error, average miss, and bias are calculated from the displayed data.",
  capabilityThreeTitle: "Grounded explanations",
  capabilityThreeBody: "A local demo briefing summarizes the figures on screen. No live AI service or buying advice is implied.",
  closingEyebrow: "START WITH THE EVIDENCE",
  closingTitle: "Make the forecast easier to review.",
  closingDescription: "Explore a focused workspace built around one practical question: what did we know, and how did it turn out?",
  footerNote: "Independent prototype · illustrative data · no live market connection",
  footerWorkspace: "Open workspace",
  unitMw: "MW",
} as const;

export const LANDING_STEPS = [
  { number: "01", title: LANDING_COPY.stepOneTitle, description: LANDING_COPY.stepOneBody },
  { number: "02", title: LANDING_COPY.stepTwoTitle, description: LANDING_COPY.stepTwoBody },
  { number: "03", title: LANDING_COPY.stepThreeTitle, description: LANDING_COPY.stepThreeBody },
] as const;

export const LANDING_CAPABILITIES = [
  { id: "history", title: LANDING_COPY.capabilityOneTitle, description: LANDING_COPY.capabilityOneBody },
  { id: "measures", title: LANDING_COPY.capabilityTwoTitle, description: LANDING_COPY.capabilityTwoBody },
  { id: "briefing", title: LANDING_COPY.capabilityThreeTitle, description: LANDING_COPY.capabilityThreeBody },
] as const;

export const LANDING_PREVIEW = {
  dayId: "2026-01-19",
  knowledgeTime: "09:30",
} as const;

export const LANDING_PREVIEW_GRID_VALUES = [2500, 5000, 7500, 10000] as const;
