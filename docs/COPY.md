# Copy Inventory

This file tracks current user-facing copy surfaces that are intentionally authored in code or seed data. It is not a backlog or review queue.

## Brand

- Public name: `Agentic Engineering`
- Short discipline line: `Bounded LLMs. Contract-based pipelines. Shipped systems.`
- Former brand: `Inference` may remain only in placeholder URLs or preserved internal keys.

## Home Page

Home page fallback copy lives in `src/lib/cms.ts` as `homePageMock` and can be overridden through the Payload `home-page` global.

- Hero eyebrow: `Agentic Engineering · HCMUT · Founded 2026`
- Hero headline: `We don't teach AI. We institutionalize the engineering discipline AI-native software demands.`
- Hero keywords: `bounded`, `contract-based`, `shipped`, `traceable`
- Manifesto quote: `Bounded models. Contract-based pipelines. Shipped systems.`
- CTA bands:
  - `Apply to the founding cohort`
  - `Read the engineering journal`
  - `View open-source projects`

## Core Proof Points

These proof points appear in fallback project and stats data:

- `2nd place — Best Use of Qwen, GenAI Hackathon Vietnam 2025`
- `200+ teams beaten`
- `2 production systems shipped`
- Lumen: multimodal journal engine with an async tags -> writer -> memory pipeline
- Atlas: traceable clinical handoff with deterministic contracts and bounded LLM explanation

## Content Sources

- Navigation, footer, home page, process flow, stats board, and manifesto pillars: Payload globals with fallback fixtures.
- Projects, posts, events, members, announcements, and pages: Payload collections with fallback fixtures for core routes.
- Journal body rendering: Markdown through `src/lib/markdown.ts`.
- SEO titles/descriptions: route metadata and Payload SEO plugin fields.

## Placeholders That Are Intentional

The following placeholders remain until real external accounts or production services are assigned:

- `https://inference.club`
- `https://github.com/inference-club/*`
- `hello@inference.club`
- `GITHUB_ORG=inference-club`

Update this file, `.env.example`, seed data, and metadata together when those values are replaced.
