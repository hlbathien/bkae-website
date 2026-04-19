# SOURCE OF TRUTH — Inference (BKAE) Website

> Canonical spec. Any divergence between code and this file = bug. Update this file in same PR as the change.

---

## 1. Identity

| Field | Value |
|---|---|
| Org name | Agentic Engineering |
| Internal alias | `bkae-website` (do not rename) |
| Affiliation | HCMUT (Ho Chi Minh City University of Technology) |
| Discipline | Bounded LLMs · Contract-based pipelines · Shipped systems |
| Founders | 2 first-year HCMUT students |
| Proof | 2nd place — Best Use of Qwen, GenAI Hackathon Vietnam 2025 |
| Locale | Asia/Ho_Chi_Minh, English-only v1 |
| Wordmark lockup | `[logo-mark amber 14px] agentic engineering.` (lowercase, period in amber) |

## 2. Goals (in priority order)

1. Convert qualified students → application submission (`/join`)
2. Establish credibility (projects, hackathon proof, manifesto)
3. Recruit founding cohort
4. Publish field notes (journal)

## 3. Non-goals (v1)

- E-commerce, paid courses, member portal, auth, comments, i18n, blog comments, search, dark/light toggle (dark only).

## 4. Brand System

### 4.1 Palette (CSS vars; defined in `globals.css @theme`)

| Token                 | Hex       | Use                         |
| --------------------- | --------- | --------------------------- |
| `--color-ink`         | `#0C0C09` | Page bg                     |
| `--color-ink2`        | `#1A1A15` | Card bg                     |
| `--color-ink3`        | `#282820` | Borders, dividers           |
| `--color-amber`       | `#D4870A` | Primary accent, CTAs, links |
| `--color-amber-hot`   | `#F0A020` | Hover state, highlights     |
| `--color-amber-pale`  | `#FDE8B8` | Subtle washes               |
| `--color-ivory`       | `#F5F0E8` | Headlines                   |
| `--color-ivory2`      | `#EDE8DC` | Body                        |
| `--color-steel`       | `#7A8490` | Meta text                   |
| `--color-steel-light` | `#B2BBC4` | Secondary body              |

**Rule:** No raw hex in components. Use tokens.

### 4.2 Typography

| Role          | Family           | Weight     | Source       |
| ------------- | ---------------- | ---------- | ------------ |
| Display       | Syne             | 800        | Google Fonts |
| Accent italic | Instrument Serif | 400 italic | Google Fonts |
| Body / mono   | DM Mono          | 400 / 500  | Google Fonts |

Loaded via `@import` in `globals.css`. Helpers: `.font-display`, `.font-serif-italic`, default mono.

### 4.3 Motion principles

- Restraint over spectacle.
- All entrance/scrub motion guarded by `prefers-reduced-motion: reduce`.
- Default ease: `expo.out` for entrances, `power3.inOut` for scrubs.
- No motion on critical CTAs that delays interaction > 200ms.

## 5. Information Architecture

```
/                       Landing
/projects               Index
/projects/[slug]        Detail (lumen-journal, atlas-clinical)
/journal                Index
/journal/[slug]         Detail
/manifesto              Four pillars
/join                   Application form
```

No other routes in v1.

## 6. Tech Stack (locked)

- Next.js **16.2.4** App Router, React **19.2**
- TypeScript strict
- Tailwind **v4** beta + `@theme` tokens, PostCSS, autoprefixer
- GSAP 3 + ScrollTrigger
- Lenis 1.x smooth scroll, wired to GSAP ticker
- `lucide-react` icons
- `react-hook-form` + `zod` (form validation; `/join` only for v1)
- `clsx` for class composition
- Mock CMS in `src/lib/cms.ts`. Payload CMS = post-v1.
- Node 20+, pnpm

**Forbidden:** styled-components, emotion, framer-motion, locomotive-scroll, three.js, jQuery.

## 7. Directory Layout (canonical)

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    projects/page.tsx
    projects/[slug]/page.tsx
    journal/page.tsx
    journal/[slug]/page.tsx
    manifesto/page.tsx
    join/page.tsx
  components/
    chrome/    SmoothScroll, Header, MarqueeBar, GridOverlay, Cursor, Footer
    motion/    RevealText, CountUp, MagneticBtn, MarqueeRow
    primitives/ Frame, Tag, Button
    sections/  Hero, Manifesto, Projects, Process, Stats, JournalPreview, CTABands
  lib/        cms.ts, gsap.ts, fonts.ts, utils.ts
docs/         this file + others
```

New top-level dirs require update to this file.

## 8. CMS Data Contract (`src/lib/cms.ts`)

Types are source of truth. Match exactly.

```ts
type Project = {
  slug: string;
  index: string;          // "01", "02" — display ordinal
  title: string;
  eyebrow: string;
  problem: string;
  constraint: string;
  outcome: string;
  stack: string[];
  stats: { label: string; value: number; suffix?: string }[];
  cover: string;          // public path to cover image
  links: { github?: string; demo?: string };
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  readingTime: string;
  publishedAt: string;
};

type Member = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  links: { github?: string; x?: string };
};

type Announcement = { text: string; href: string };
```

Required projects in v1: `lumen-journal`, `atlas-clinical`.

## 9. Page Contracts

### `/` Landing — section order, top→bottom

1. Hero (RevealText headline, keyword chips, scroll cue)
2. Manifesto pull-quote
3. Projects (one ScrollTrigger-pinned scene per project)
4. Process (5-stage horizontal scroll-jack; vertical on mobile)
5. Stats (4-col CountUp)
6. JournalPreview (1 hero + 2 small)
7. CTABands (3 bands: Apply / Read manifesto / Browse work)

### `/projects` Index

Cards w/ hover → border amber.

### `/projects/[slug]`

Async `params` (Next 15). `generateStaticParams` + `generateMetadata`. Layout: title block + 8/4 grid (problem/constraint/outcome | stack/stats/links).

### `/journal` Index, `/journal/[slug]` Detail

Same async params pattern. Stub long-form body.

### `/manifesto`

Four pillars from `PILLARS` const.

### `/join`

Client form: full name, HCMUT email, year/major, what shipped (textarea). Validated via `react-hook-form + zod`. Submission: POST to `/api/join` (v1 = stub returning 200).

## 10. Accessibility

- Skip link to `#main` in layout (already present)
- All interactive elements: visible focus ring (amber, 2px outline-offset)
- Form labels `for=`, error messages `aria-describedby`
- Color contrast: ivory-on-ink ≥ 7:1; amber-on-ink ≥ 4.5:1 — verify, don't assume
- All motion respects `prefers-reduced-motion`
- `Cursor` hidden on `(hover: none)` pointers

## 11. Performance Budgets

| Metric                 | Budget      |
| ---------------------- | ----------- |
| LCP (mobile, slow 4G)  | ≤ 2.5s      |
| CLS                    | ≤ 0.05      |
| INP                    | ≤ 200ms     |
| JS shipped to landing  | ≤ 220 KB gz |
| Total transfer landing | ≤ 900 KB    |

Verify with `next build` route summary + Lighthouse mobile.

## 12. SEO

- Per-route `metadata` export (title, description)
- `metadataBase` set in root layout
- OG image: 1200×630, amber-on-ink wordmark (`/og.png`)
- `robots.txt` allows all; `sitemap.ts` lists static + dynamic routes

## 13. Definition of Done (per task)

A change is **DONE** only if all true:

- [ ] Code matches Source of Truth section it touches
- [ ] `pnpm tsc --noEmit` → 0 errors
- [ ] `pnpm next build` → 0 errors, ≤ existing warnings
- [ ] No new ESLint errors
- [ ] Visual smoke: page renders, no console errors in `pnpm dev`
- [ ] Reduced-motion path tested (Chrome DevTools → Rendering → emulate)
- [ ] If CMS data added: types unchanged or this doc updated
- [ ] If new dir/dep added: this doc updated

## 15. Interaction System

### 15.1 Cursor state machine

Custom cursor is a single-author component. Every interactive element declares intent via `data-cursor`:

| Value         | Visual                                                    | Use                               |
| ------------- | --------------------------------------------------------- | --------------------------------- |
| _(none)_      | 6px amber dot + 32px ivory ring (default)                 | Idle                              |
| `link`        | Ring scales ×1.4, amber fill 18%, dot hides               | Nav, inline links                 |
| `view`        | Ring scales ×2.4 w/ label "VIEW" in mono 10px             | Project covers, dataviz           |
| `read`        | Ring morphs to vertical bar, label "READ →"               | Journal cards                     |
| `drag`        | Ring scales ×1.8, label "DRAG"                            | Horizontal scroll regions         |
| `magnet`      | Ring attracted to element center (quickTo)                | Primary CTAs                      |
| `text`        | Ring collapses to 1px vertical caret                      | Hero headline hover               |

Rules:
- Cursor hidden on `(hover: none)` and `prefers-reduced-motion: reduce`.
- No state may change cursor color away from amber (signal lane).
- Label text: `font-mono 10px`, uppercase, letter-spacing `0.18em`.

### 15.2 Scroll system

- Lenis smooth scroll wired to GSAP ticker (existing).
- Left-gutter vertical progress rail (desktop ≥ 1024px): 1px ivory line, amber dot marking current section, mono section label.
- No CSS scroll-snap. Snap only via GSAP ScrollToPlugin-equivalent behavior (manual). Keep scroll linear; rail is indicator only.

### 15.3 Page transitions

- First visit: 900ms curtain intro — black panel wipes upward, reveals hero. Stored in `sessionStorage` so subsequent navigations skip.
- Route change: 400ms curtain-fade overlay (amber 4% → ink), then new page RevealText.
- Shared element morph is out-of-scope v1.

### 15.4 Micro-interactions contract

- Every `<Link>` outside nav: must declare `data-cursor` or use `draw-underline` / `bracket-link` / `cta-fill`.
- Every primary CTA: `MagneticBtn` wrap + `data-cursor="magnet"`.
- Every image/cover: `data-cursor="view"`.
- Every horizontally-scrolling track: `data-cursor="drag"`.
- Hover timings: 200–320ms, ease `--ease-out-expo`. Never longer on layout properties.

### 15.5 Easter eggs

- `g` toggles GridOverlay (exists).
- Console greeting on load: `%cInference — Bounded LLMs. Contract-based pipelines.` (amber, mono, one call in layout).
- `↑↑↓↓←→←→BA` enables amber-trace mode (persistent grid + HUD). Session-scoped.

## 16. Visual Asset Contract

### 16.1 Project artifacts (required for each v1 project)

Each Project MUST ship one of: `/cover-<slug>.jpg` (≥1600×1200, amber-on-ink authored), **or** a first-class SVG schematic rendered inline. Dot-grid placeholder = banned in shipped pages.

| Project         | Artifact                                                     |
| --------------- | ------------------------------------------------------------ |
| `lumen-journal` | Inline SVG: 5-node pipeline (Input→Tags→Writer→Memory→Output), animated edges, contract chips |
| `atlas-clinical`| Inline SVG: PDF source → extraction contract → traceable claim graph, citation arcs |

Animations: entrance on `ScrollTrigger start: top 75%`; guard w/ reduced-motion.

### 16.2 Hero visual

Hero carries: a cursor-tracked WebGL blob (amber radial, low-freq noise displacement), and one slow scrubbed marquee of KEYWORDS at 0.05 opacity. No stacked marquees. No static radial duplicate.

### 16.3 Inversion moment

Exactly one section on `/` inverts to `--color-ivory` bg + `--color-ink` fg (currently: Manifesto amplifier). This is the **only** light panel on the site. Do not replicate.

## 17. Dependency delta

Added to locked stack:

- `ogl` (~6 KB gz) — WebGL micro-lib for hero distortion field. Lazy-loaded via `next/dynamic`, SSR off.

Previously forbidden `three.js` remains forbidden. `ogl` is explicitly carved out.

## 18. Out-of-scope guardrail

Agent **must not**:

- Add new dependencies without explicit approval
- Change palette tokens
- Change route structure
- Add analytics, tracking, third-party scripts
- Replace mock CMS with live CMS
- Touch `.env*` beyond `.env.example`
- Run `git push`, open PRs, or merge anything
- Modify this file silently (must be in same change & flagged in summary)
