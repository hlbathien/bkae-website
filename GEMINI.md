# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Project

Marketing + CMS site for **Agentic Engineering** (alias `bkae-website`), a student club at **HCMUT** (Ho Chi Minh City University of Technology). Founded by 2 first-year students. Discipline: bounded LLMs, contract-based pipelines, shipped systems. Proof: 2nd place — Best Use of Qwen, GenAI Hackathon Vietnam 2025.

> **Rebrand note (2026-04):** site previously branded "Inference". User-visible brand is now **Agentic Engineering**. Internal artefacts kept as-is to preserve cache continuity: storage keys (`inference:intro-seen`), window globals (`__inferenceGreeted`), placeholder URLs (`inference.club`, `github.com/inference-club`, `hello@inference.club`). Swap URLs only when real domain is registered.

Dark, editorial landing page + mock-CMS-driven project / journal / manifesto / join routes. English-only, dark-only, v1.

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
pnpm trace-logo           # one-shot: potrace logo.png → public/logo.svg (dev only)
```

No test runner configured. Acceptance gates are `pnpm typecheck` + `pnpm build` + `pnpm lint` clean (see `docs/WORKFLOW_RULES.md` R8).

## Authority Order

Agent must obey, highest → lowest:

1. Explicit human prompt
2. `docs/SOURCE_OF_TRUTH.md` (canonical spec; diverging code = bug)
3. `docs/IMPLEMENTATION_PLAN.md` (current 30-phase plan; supersedes legacy BUILDING_PLAN for active work)
4. `docs/BUILDING_PLAN.md` (legacy 0–18 phases; remain valid for build hygiene baseline)
5. `docs/WORKFLOW_RULES.md` (R1–R14 guardrails)
6. Existing code

Conflict between human prompt and SoT → ask, do not proceed.

For agent handoff (e.g. Antigravity Gemini 3.1 Pro), see `docs/AGENT_PROMPT.md`.

## Architecture

**Stack (locked — no swaps without approval):** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 beta via `@tailwindcss/postcss` + `@theme` tokens, GSAP 3 + ScrollTrigger, Lenis smooth scroll wired to GSAP ticker, `react-hook-form` + `zod` (join form only), `lucide-react`, `clsx`, `ogl` (WebGL micro for hero blob). Path alias `@/*` → `src/*`.

**Forbidden libs:** styled-components, emotion, framer-motion, locomotive-scroll, three.js, jQuery.

**No new runtime deps** across the entire IMPLEMENTATION_PLAN. Only addition allowed: `potrace` as **devDependency** (Phase 2: one-shot logo trace, never shipped).

**Routes (v1 complete set):** `/`, `/projects`, `/projects/[slug]`, `/journal`, `/journal/[slug]`, `/manifesto`, `/join`, plus `POST /api/join` (stub). `robots.ts` + `sitemap.ts` at app root. Plus `/not-found.tsx` + `/error.tsx` (Phase 21).

**Directory contract** (update SoT §7 before adding top-level dirs):

```
scripts/          trace-logo.mjs (dev-only, one-shot)
src/
  app/            routes + layout.tsx + globals.css + robots.ts + sitemap.ts + api/join/ + not-found.tsx + error.tsx + icon.svg
  components/
    chrome/       SmoothScroll, Header, MarqueeBar, GridOverlay, Cursor, Footer, PageTransition, ScrollRail, LiveBand, LiveFavicon, AudioToggle, ReadingProgress, ToCRail
    motion/       RevealText, CountUp, MagneticBtn, MarqueeRow, HeroBlob, Dust, StrokeDrawSVG
    primitives/   Frame, Tag, Button, LogoMark, Sparkline
    sections/     Hero, Manifesto, Projects, Process, Stats, JournalPreview, CTABands, ProjectDiagrams
  hooks/          useScrollSnap, useLenisVelocity, useViewportProximity, useClickRipple
  lib/            cms.ts, gsap.ts, fonts.ts, utils.ts, prefetch.ts
docs/             SOURCE_OF_TRUTH.md, IMPLEMENTATION_PLAN.md, AGENT_PROMPT.md, BUILDING_PLAN.md, WORKFLOW_RULES.md, COPY.md, reports/
```

**Landing order (`/`):** Hero → Manifesto pull-quote → Projects (ScrollTrigger-pinned) → Process (horizontal scroll-jack; vertical on mobile) → Stats → JournalPreview → CTABands. Don't reorder without SoT update.

**CMS:** `src/lib/cms.ts` is mock data source. Types (`Project`, `Post`, `Member`, `Announcement`) are **contract** — match exactly, never mutate without SoT §8 update in same commit. Required project slugs v1: `lumen-journal`, `atlas-clinical`. Payload CMS integration is post-v1.

**Dynamic routes** use async `params` (Next 15+ pattern) and export `generateStaticParams` + `generateMetadata`.

## Identity

| Field | Value |
|---|---|
| Club name | Agentic Engineering |
| Internal alias | `bkae-website` |
| Affiliation | HCMUT |
| Discipline | Bounded LLMs · Contract-based pipelines · Shipped systems |
| Founders | 2 first-year students |
| Proof | 2nd place, Best Use of Qwen — GenAI Hackathon Vietnam 2025 |
| Locale | Asia/Ho_Chi_Minh, English-only v1 |

## Wordmark Lockup

```
[logo-mark 14px amber]  agentic engineering.
                                          ^ amber period
```

- Mark: `LogoMark` component, `h-[14px] w-[14px]`, `text-[var(--color-amber)]`, `currentColor` fill
- Wordmark: `font-display font-[800] text-[18px] tracking-[-0.015em] lowercase text-[var(--color-ivory)]`
- Period: amber accent (preserves visual signature)
- Mobile (< 380px): mark only

## Design Tokens (enforced)

Colors only via CSS vars in `src/app/globals.css @theme` — no raw hex in components. Palette: `--color-ink`, `--color-ink2`, `--color-ink3`, `--color-amber` (#D4870A primary), `--color-amber-hot`, `--color-amber-pale`, `--color-ivory`, `--color-ivory2`, `--color-steel`, `--color-steel-light`.

Fonts: only `.font-display` (Syne 800), `.font-serif-italic` (Instrument Serif italic), default DM Mono body. No new families. Loaded via `src/lib/fonts.ts` + Google Fonts.

Spacing: Tailwind scale only. No magic px except established typographic `clamp()` ranges.

Eases: `--ease-precise`, `--ease-out-expo`. GSAP: `expo.out` entrances, `power3.inOut` scrubs.

## Motion Contract

- GSAP + Lenis only. No CSS transitions > 300ms on layout props.
- Every animating `useEffect` MUST start with:
  ```ts
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ```
- No motion may delay critical CTA interaction > 200ms.
- `Cursor` hidden on `(hover: none)` and `prefers-reduced-motion: reduce`.
- Audio (Phase 26) is opt-in only, gated by `localStorage.ae:audio`, also disabled by reduced-motion.

## Performance Budgets

LCP ≤ 2.6s (mobile slow 4G; relaxed from 2.5s for ogl), CLS ≤ 0.05, INP ≤ 200ms, landing JS ≤ 240 KB gz (relaxed from 220 for ogl), total landing transfer ≤ 900 KB. Verify via `next build` route summary + Lighthouse mobile.

## Guardrails (R3, R4, R8, R14 — excerpt)

- **No new runtime deps.** Only addition allowed: `potrace` devDep (Phase 2). Anything else → `docs/BLOCKED.md`, halt.
- Never `git push`, `git reset --hard`, `git rebase`, `git checkout -- .`, `git clean`, amend, or `--no-verify`.
- Never `git add .` / `-A` — stage explicit paths.
- One commit per completed phase. Message: `phase(<slug>): <one-line>` with file bullet body + acceptance evidence + Co-Author trailer.
- Never touch `.env*` beyond `.env.example`.
- Never delete files outside `node_modules/`, `.next/`, `docs/reports/`.
- Phase N+1 blocked until `docs/reports/phase-<slug>.md` records passing acceptance.
- State invariants (must hold start + end of task): tsc 0, next build 0, no stray untracked files, no `lorem`/`TODO!!`/`FIXME!!`/`XXX`/`HACK` in `src/`, `cms.ts` types unchanged unless SoT updated.
- Resume after restart by reading `docs/reports/` to find current phase.
- Keep `inference.club` / `github.com/inference-club` / `hello@inference.club` placeholders + `inference:intro-seen` storage key + `__inferenceGreeted` window global.

## Phase Index (active — IMPLEMENTATION_PLAN.md)

| # | Slug | Summary |
|---|---|---|
| 1 | `rebrand-copy` | Visible brand swap |
| 2 | `logo-svg` | Trace + inline LogoMark |
| 3 | `hero-clean` | Remove signal strip; live build band |
| 4 | `loader-v2` | 4-stage first-visit loader |
| 5 | `route-transition-v2` | Diagonal wipe + scroll restore + idle prefetch |
| 6 | `cursor-v3` | New states + trail + idle orbit + click ripple |
| 7 | `kinetic-type` | Hero warp + manifesto sweep + footer parallax |
| 8 | `magnetism-snap` | Magnetic CTAs + Lenis-velocity snap |
| 9 | `micro-interactions` | Global polish layer |
| 10 | `manifesto-inversion` | Bg lerp + cursor flip |
| 11 | `projects-immersion` | Diagram tilt + node light + tag fill |
| 12 | `process-drag` | Drag-pan + edge draw |
| 13 | `stats-spark` | Sparklines + label sweep |
| 14 | `journal-cover-mask` | Scale + scan-line wipe |
| 15 | `cta-bands-pop` | Cursor-tracked cover popover |
| 16 | `footer-kinetic-v2` | Build SHA row + ASCII comment |
| 17 | `header-active` | Active-route bar + scroll expand |
| 18 | `live-band` | Slim chrome row |
| 19 | `scroll-rail-v2` | Trail + tooltip + clickable |
| 20 | `marquee-dismiss` | Hover pause + dismiss |
| 21 | `not-found` | 404 + error boundary |
| 22 | `join-form-polish` | Focus chain + receipt success |
| 23 | `journal-detail` | Reading bar + ToC + dropcap |
| 24 | `project-detail` | Stat reveal + ToC + next-project |
| 25 | `easter-eggs` | Matrix mode + console API |
| 26 | `audio-opt-in` | WebAudio synth, opt-in only |
| 27 | `a11y-audit` | axe = 0 every route |
| 28 | `perf-reconcile` | Lazy-load + Lighthouse ≥ 88 |
| 29 | `award-package` | 5 PNG + 1 webm + 4 md |
| 30 | `favicon-live` | Canvas favicon w/ scroll arc |

Full task + acceptance detail: `docs/IMPLEMENTATION_PLAN.md`. Self-contained agent prompt: `docs/AGENT_PROMPT.md`.

## RTK (user's global preference)

Prefix shell invocations with `rtk` when available (e.g. `rtk pnpm build`, `rtk git status`, `rtk next build`) for token-compressed output. Passthrough-safe on unknown commands.
