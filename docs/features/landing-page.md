# Feature Specification: Public Landing Page

## Purpose

Explain the focused product in plain language and let a first-time visitor move from the problem to a working local demo. The page should be editorial, polished, and easy to scan, using high-contrast type, restrained color, and real product evidence.

## User stories and UI requirements

- As a first-time visitor, I understand what forecast review helps an energy analyst see.
- As a visitor unfamiliar with power markets, I can understand the simple problem: a forecast is available before delivery, actual generation arrives later, and comparing them helps teams learn.
- As a prospective user, I can understand the AI-assisted product direction and open the local workspace demo from a clear call to action.
- As a visitor, I can inspect a product preview before entering the workspace.
- The page must not imply customer adoption, validated savings, live data, deployed AI, or trade recommendations. AI examples are clearly presented as product previews, not connected model output.
- As a decision-maker, I can tell which energy teams the product is intended to serve and get answers to common questions.

## Page sections

1. Public header with product mark, short navigation anchors, and workspace CTA.
2. Hero with one plain-language proposition, supporting explanation, primary workspace CTA, and an original dashboard preview composed from the local fixture data.
3. “Why this matters” section that explains the forecast-versus-actual problem without unexplained market jargon.
4. Three-step product explanation: capture the forecast available then, compare with actual, review what changed.
5. AI section that shows an evidence-linked analyst copilot interaction, with a clearly labeled preview state.
6. Audience section for renewable asset operators, forecasting and analytics teams, and energy investors.
7. FAQ that explains the workflow, AI role, audience, and product boundary in plain language.
8. Sales-oriented closing section with a clear workspace walkthrough CTA, followed by a compact footer.

## Component hierarchy

```text
LandingPage
├── PublicHeader
├── HeroSection
│   └── ProductPreview
├── ProblemSection
├── WorkflowSection
├── CapabilitySection
├── AiSection
├── AudienceSection
├── FAQSection
├── ClosingCTA
└── PublicFooter
```

## Mock data schema

All public copy and navigation labels come from `dummy/landing-content.ts`. Product preview metrics and series derive from the existing typed `dummy/fixtures.ts`; do not create a second hardcoded mock dataset for the marketing page.

## State boundaries

The public page has no data entry or persisted state. Navigation uses local routes and section anchors only. The dashboard preview is a read-only rendering of the selected sample fixture.

## Design boundaries

Use an original editorial layout informed by energy analytics websites: a full-bleed charcoal hero, oversized heavy sans-serif headline with tight leading and tracking, crisp readable support text, restrained monochrome surfaces, precise dividers, and generous spacing. Match the reference's strong weight and hierarchy rather than using thin display type. Make product evidence visible in a dark, well-composed forecast preview. Keep lower sections calm and light, with strong headings and distinct sections. Include the AI workflow, capabilities, intended audiences, plain-language FAQs, and a sales-oriented CTA. Do not reuse Modo Energy or Molten Ventures copy, logos, screenshots, video, or distinctive branded artwork; do not invent customer logos, certifications, savings, or adoption claims. Do not use an independent-prototype or no-live-connection disclaimer as brand positioning; label sample data only where a specific preview needs that context.

## Search and social sharing

- Provide a Gridline browser-tab icon through the App Router icon convention.
- Set a descriptive page title, concise summary, relevant keywords, and index/follow directives in the root metadata.
- Provide a 1200 × 630 Open Graph image and a matching X large-image card. The image uses Gridline's own name, restrained palette, and forecast-visual motif; it contains no borrowed logos or unsupported product claims.
- Keep metadata copy and share-card text centralized in `dummy/landing-content.ts`.
