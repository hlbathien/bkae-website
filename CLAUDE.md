# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing + CMS site for **Inference** (alias `bkae-website`), an Agentic Engineering student club at HCMUT. Dark, editorial landing page + mock-CMS-driven project/journal/manifesto/join routes. English-only, dark-only, v1.

## Commands

Package manager: **pnpm**. Node 20+.

```bash
pnpm install
pnpm dev                  # next dev (turbopack)
pnpm build                # next build
pnpm start                # next start
pnpm lint                 # eslint src
pnpm lint:fix             # eslint src --fix
pnpm format               # prettier --write .
pnpm typecheck            # tsc --noEmit
```

No test runner configured. Acceptance gates are `pnpm typecheck` + `pnpm build` + `pnpm lint` clean (see `docs/WORKFLOW_RULES.md` R8).

## Authority Order

Agent must obey, highest → lowest:

1. Explicit human prompt
2. `docs/SOURCE_OF_TRUTH.md` (canonical spec; diverging code = bug)
3. `docs/BUILDING_PLAN.md` (phase sequence 0–7; do not skip/reorder)
4. `docs/WORKFLOW_RULES.md` (R1–R14 guardrails)
5. Existing code

Conflict between human prompt and SoT → ask, do not proceed.

## Architecture

**Stack (locked — no swaps without approval):** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 beta via `@tailwindcss/postcss` + `@theme` tokens, GSAP 3 + ScrollTrigger, Lenis smooth scroll wired to GSAP ticker, `react-hook-form` + `zod` (join form only), `lucide-react`, `clsx`. Path alias `@/*` → `src/*`.

**Forbidden libs:** styled-components, emotion, framer-motion, locomotive-scroll, three.js, jQuery.

**Routes (v1 complete set):** `/`, `/projects`, `/projects/[slug]`, `/journal`, `/journal/[slug]`, `/manifesto`, `/join`, plus `POST /api/join` (stub). `robots.ts` + `sitemap.ts` at app root.

**Directory contract** (update SoT §7 before adding top-level dirs):

```
src/
  app/            routes + layout.tsx + globals.css + robots.ts + sitemap.ts + api/join/
  components/
    chrome/       SmoothScroll, Header, MarqueeBar, GridOverlay, Cursor, Footer
    motion/       RevealText, CountUp, MagneticBtn, MarqueeRow  (GSAP effects)
    primitives/   Frame, Tag, Button
    sections/     Hero, Manifesto, Projects, Process, Stats, JournalPreview, CTABands
  lib/            cms.ts, gsap.ts, fonts.ts, utils.ts
docs/             SOURCE_OF_TRUTH.md, BUILDING_PLAN.md, WORKFLOW_RULES.md, COPY.md, reports/
```

**Landing order (`/`):** Hero → Manifesto pull-quote → Projects (ScrollTrigger-pinned) → Process (horizontal scroll-jack; vertical on mobile) → Stats → JournalPreview → CTABands. Don't reorder without SoT update.

**CMS:** `src/lib/cms.ts` is mock data source. Types (`Project`, `Post`, `Member`, `Announcement`) are contract — match exactly. Required project slugs v1: `lumen-journal`, `atlas-clinical`. Payload CMS integration is post-v1.

**Dynamic routes** use async `params` (Next 15+ pattern) and export `generateStaticParams` + `generateMetadata`.

## Design Tokens (enforced)

Colors only via CSS vars in `src/app/globals.css @theme` — no raw hex in components. Palette: `--color-ink`, `--color-ink2`, `--color-ink3`, `--color-amber` (#D4870A primary), `--color-amber-hot`, `--color-amber-pale`, `--color-ivory`, `--color-ivory2`, `--color-steel`, `--color-steel-light`.

Fonts: only `.font-display` (Syne 800), `.font-serif-italic` (Instrument Serif italic), default DM Mono body. No new families. Loaded via `src/lib/fonts.ts` + Google Fonts `@import`.

Spacing: Tailwind scale only. No magic px except established typographic `clamp()` ranges.

## Motion Contract

- GSAP + Lenis only. No CSS transitions > 300ms on layout props.
- Every animating `useEffect` MUST start with:
  ```ts
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ```
- Default ease: `expo.out` entrances, `power3.inOut` scrubs.
- No motion may delay critical CTA interaction > 200ms.
- `Cursor` hidden on `(hover: none)`.

## Performance Budgets

LCP ≤ 2.5s (mobile slow 4G), CLS ≤ 0.05, INP ≤ 200ms, landing JS ≤ 220 KB gz, total landing transfer ≤ 900 KB. Verify via `next build` route summary + Lighthouse mobile.

## Guardrails (R3, R4, R8, R14 — excerpt)

- **No new runtime deps** without explicit approval. If blocked, log to `docs/BLOCKED.md` and halt. Devtime tooling only if a BUILDING_PLAN phase requires it.
- Never `git push`, `git reset --hard`, `git rebase`, `git checkout -- .`, `git clean`, amend, or `--no-verify`.
- Never `git add .` / `-A` — stage explicit paths.
- One commit per completed phase. Message: `phase(N): <slug> — <one-line>`.
- Never touch `.env*` beyond `.env.example`.
- Never delete files outside `node_modules/`, `.next/`, `docs/reports/`.
- Phase N+1 blocked until `docs/reports/phase-N.md` records passing acceptance.
- State invariants (must hold start + end of task): tsc 0, next build 0, no stray untracked files, no `lorem`/`TODO!!`/`FIXME!!`/`XXX`/`HACK` in `src/`, `cms.ts` types unchanged unless SoT updated.
- Resume after restart by reading `docs/reports/` to find current phase.

## RTK (user's global preference)

Prefix shell invocations with `rtk` when available (e.g. `rtk pnpm build`, `rtk git status`, `rtk next build`) for token-compressed output. Passthrough-safe on unknown commands.
