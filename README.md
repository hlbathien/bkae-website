# Agentic Engineering Website

Marketing, CMS, and admin site for **Agentic Engineering**, an HCMUT student club focused on bounded LLMs, contract-based pipelines, and shipped systems.

The site is a Next.js 16 App Router application with a dark editorial marketing shell, Payload CMS admin, AI-native text endpoints, dynamic SEO, and branded motion/interaction layers.

## Stack

- Next.js 16, React 19, TypeScript strict
- Tailwind CSS v4 beta with design tokens in `src/app/globals.css`
- GSAP + Lenis for motion and smooth scroll
- Payload CMS 3 with Postgres, Lexical, SEO, forms, search, and nested docs plugins
- `react-hook-form` + `zod` for `/join`
- `ogl` for the hero WebGL visual
- Playwright and Node's built-in test runner for focused checks

## Local Setup

```bash
pnpm install
docker compose up -d
cp .env.example .env.local
pnpm migrate
pnpm seed
pnpm dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for Payload.

`PAYLOAD_SECRET` and `PREVIEW_SECRET` in `.env.local` must be replaced with real random values before using the CMS outside throwaway local development.

## Commands

```bash
pnpm dev                  # Next dev with Turbopack
pnpm dev:admin            # Next dev fallback without Turbopack
pnpm build                # Production build
pnpm start                # Production server
pnpm lint                 # ESLint over src
pnpm lint:fix             # ESLint autofix over src
pnpm format               # Prettier write
pnpm typecheck            # TypeScript no-emit check
pnpm payload              # Payload CLI
pnpm generate:types       # Regenerate src/payload-types.ts
pnpm generate:importmap   # Regenerate Payload admin import map
pnpm migrate              # Run Payload migrations
pnpm migrate:create       # Create a Payload migration
pnpm seed                 # Seed local CMS content and globals
pnpm exec playwright test # Browser tests in tests/*.spec.ts
pnpm exec tsx --test tests/*.test.ts # Node unit tests for TypeScript files
```

## Architecture

`src/app/layout.tsx` is intentionally bare. The public website and Payload admin each own their own route-group layout:

- `src/app/(marketing)/layout.tsx` renders the public `<html>`, fonts, JSON-LD, draft banner, smooth scrolling, page transitions, marquee, header, grid overlay, scroll rail, audio toggle, cursor, and footer.
- `src/app/(payload)/layout.tsx` renders the Payload admin shell.

The CMS data path is split by runtime:

- `src/lib/cms.ts` contains the synchronous fallback fixtures and TypeScript contracts used by the public UI.
- `src/lib/cms-server.ts` imports Payload only on the server, maps Payload documents back into the fixture contracts, and falls back to mock data when `DATABASE_URI` is missing or the client cannot initialize.

Current public route families are `/`, `/about`, `/events`, `/projects`, `/journal`, `/manifesto`, `/join`, `/press`, `/sponsor`, `/uses`, `/changelog`, and `/search`. Current machine-readable surfaces are `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/humans.txt`, `/.well-known/security.txt`, `/.well-known/ai.txt`, `/api/rss`, `/api/og`, preview/revalidation APIs, and Payload REST/GraphQL APIs.

## Living Docs

- `docs/SOURCE_OF_TRUTH.md` is the canonical current-state architecture and feature contract.
- `docs/COPY.md` tracks current user-facing copy surfaces.
- `docs/WORKFLOW_RULES.md` keeps repo workflow rules that are still active.
- `CLAUDE.md` and `GEMINI.md` are compact agent handoff files.

Historical phase plans and reports were removed so docs describe the product as it exists now, not previous implementation phases.
