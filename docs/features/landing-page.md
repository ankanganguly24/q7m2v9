# Feature Specification: Public Landing Page

## Purpose

Explain the focused product in plain language and let a first-time visitor move from the problem to a working local demo. The page should be editorial, polished, and easy to scan, using high-contrast type, restrained color, and real product evidence.

## User stories and UI requirements

- As a first-time visitor, I understand what forecast review helps an energy analyst see.
- As a visitor unfamiliar with power markets, I can understand the simple problem: a forecast is available before delivery, actual generation arrives later, and comparing them helps teams learn.
- As a prospective user, I can open the local workspace demo from a clear call to action.
- As a visitor, I can inspect a product preview before entering the workspace.
- The page must not imply customer adoption, validated savings, live data, deployed AI, or trade recommendations.

## Page sections

1. Public header with product mark, short navigation anchors, and workspace CTA.
2. Hero with one plain-language proposition, supporting explanation, primary workspace CTA, and an original dashboard preview composed from the local fixture data.
3. “Why this matters” section that explains the forecast-versus-actual problem without unexplained market jargon.
4. Three-step product explanation: capture the forecast available then, compare with actual, review what changed.
5. Capabilities strip describing accuracy, forecast vintages, and evidence-based briefing.
6. Closing call to action and compact footer.

## Component hierarchy

```text
LandingPage
├── PublicHeader
├── HeroSection
│   └── ProductPreview
├── ProblemSection
├── WorkflowSection
├── CapabilitySection
├── ClosingCTA
└── PublicFooter
```

## Mock data schema

All public copy and navigation labels come from `dummy/landing-content.ts`. Product preview metrics and series derive from the existing typed `dummy/fixtures.ts`; do not create a second hardcoded mock dataset for the marketing page.

## State boundaries

The public page has no data entry or persisted state. Navigation uses local routes and section anchors only. The dashboard preview is a read-only rendering of the selected sample fixture.

## Design boundaries

Use an original editorial layout informed by energy analytics websites: clear type hierarchy, generous negative space in the hero, precise dividers, and a believable product preview. Do not reuse Modo Energy or Molten Ventures copy, logos, screenshots, or distinctive branded artwork.
