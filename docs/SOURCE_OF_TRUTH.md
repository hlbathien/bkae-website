# SOURCE OF TRUTH — Inference (BKAE) Website

> Canonical spec. Any divergence between code and this file = bug. Update this file in same PR as the change.

---

## 1. Identity

- **Org name:** Inference (project alias `bkae-website`)
- **Affiliation:** HCMUT (Ho Chi Minh City University of Technology)
- **Discipline:** Agentic Engineering — bounded LLMs, deterministic edges, surfaced uncertainty, ship-to-learn
- **Founders:** 2 first-year students
- **Proof:** 2nd place, Best Use of Qwen — Vietnam GenAI Hackathon (largest in VN)
- **Locale:** Vietnam, timezone `Asia/Ho_Chi_Minh`
- **Language:** English-only (v1)

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

- Next.js **15.0.3** App Router, React **19 RC**
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
  title: string;
  eyebrow: string;
  problem: string;
  constraint: string;
  outcome: string;
  stack: string[];
  stats: { label: string; value: number; suffix?: string }[];
  links: { github?: string; demo?: string; paper?: string };
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedAt: string;
};

type Member = { name: string; role: string; year?: string };
type Announcement = { id: string; text: string; href?: string };
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

## 14. Out-of-scope guardrail

Agent **must not**:

- Add new dependencies without explicit approval
- Change palette tokens
- Change route structure
- Add analytics, tracking, third-party scripts
- Replace mock CMS with live CMS
- Touch `.env*` beyond `.env.example`
- Run `git push`, open PRs, or merge anything
- Modify this file silently (must be in same change & flagged in summary)
