# Feature Specification: Assessment Introduction Page

## Purpose

Introduce the assessment app to a UK utility's day-ahead procurement team and guide the reviewer into the live forecast workspace. Keep the existing polished editorial layout, but align all claims and examples with the assessed national wind forecast workflow.

## User stories

- As a utility buyer, I understand that Gridline shows the wind forecast available before delivery and compares it with actual generation afterward.
- As a client reviewer, I can open the January 2026 workspace and inspect the source, selected cutoff, matching intervals, and accuracy metrics.
- As an internal reviewer, I can tell what is live API data, what is a static visual sample, and what the app does not calculate.

## Page requirements

- Keep the current editorial header, hero, problem, workflow, capability, evidence, audience, FAQ, CTA, and footer sections.
- Focus the audience on day-ahead procurement buyers and the analysts who support their decisions.
- Remove claims that deployed AI, portfolio analytics, asset management, or investor valuation are part of this assessment app.
- Explain that wind forecast accuracy informs a buying decision but does not calculate the amount to buy because demand and price inputs are outside scope.
- Keep the marketing dashboard visual explicitly labelled as an illustrative preview; it must not be presented as live values.
- Include source attribution and a link to the BMRS data licence where data is shown.
- Provide a clear CTA into the live workspace.

## Architecture

The public route remains `features/landing-page/`. Copy and metadata are centralized in `dummy/landing-content.ts`. The landing-page preview can use the existing illustrative fixture, while the live workspace must fetch all current analysis from the Python API. App route files remain thin composition shells.

## Component hierarchy

```text
LandingPage
├── PublicHeader
├── HeroSection
│   └── ProductPreview
├── ProblemSection
├── WorkflowSection
├── CapabilitySection
├── EvidenceSection
├── AudienceSection
├── FAQSection
├── ClosingCTA
└── PublicFooter
```

## Search and social sharing

- Keep the Gridline favicon, SEO metadata, Open Graph image, and X large-image card.
- Use titles and descriptions that accurately describe the national day-ahead wind forecast review.
- Keep social-card content centralized and avoid unsupported customer, savings, AI, or market-recommendation claims.
