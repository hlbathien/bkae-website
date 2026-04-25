# Codex Orchestration Prompt — Agentic Engineering Website Overhaul

You are upgrading `bkae-website`, a Next.js 16 + Payload CMS marketing site for Agentic Engineering, an HCMUT student club. The codebase is functional. Your job: apply copy updates, add animation to static pages, create new route pages, and polish details.

## Architecture you must not break

- `src/app/layout.tsx` — bare, returns children only. Do NOT touch.
- `src/app/(marketing)/layout.tsx` — owns `<html>`, fonts, Header, Footer, Cursor, SmoothScroll, PageTransition, MarqueeBar, ScrollRail, AudioToggle, GridOverlay. Do NOT restructure.
- `src/app/(payload)/layout.tsx` — Payload admin. Do NOT touch.
- `src/lib/cms.ts` — mock fixture data + type contracts (`Project`, `Post`, `Member`, `Stat`, `ProcessNode`, `HomePageContent`, `Announcement`).
- `src/lib/cms-server.ts` — server-only Payload facade, falls back to mocks when no `DATABASE_URI`. All `fetch*()` functions exist and are wired.
- `payload.config.ts` — CMS config. Do NOT modify.
- `src/payload-types.ts` — generated. Do NOT hand-edit.
- Design tokens live in `src/app/globals.css` via `@theme`. Use `var(--color-*)`, `var(--fs-*)`, `var(--ease-*)`. No raw hex in components.

## Available animation primitives (import and use, do NOT rewrite)

- `RevealText` — `src/components/motion/RevealText.tsx` — splits by `"word"` or `"char"`, GSAP yPercent+rotateX reveal, ScrollTrigger at `top 85%`
- `CountUp` — `src/components/motion/CountUp.tsx` — number tween, ScrollTrigger at `top 90%`
- `MagneticBtn` — `src/components/motion/MagneticBtn.tsx` — gsap.quickTo magnetic pull + click ripple
- `MarqueeRow` — `src/components/motion/MarqueeRow.tsx` — infinite horizontal scroll
- `HeroBlob` — `src/components/motion/HeroBlob.tsx` — WebGL fBm noise blob (hero only)
- `ensureGsap()` — `src/lib/gsap.ts` — registers ScrollTrigger once, returns `{ gsap, ScrollTrigger }`
- `useClickRipple` — `src/hooks/useClickRipple.ts`
- `Frame` — `src/components/primitives/Frame.tsx` — horizontal layout constraint (`max-w-[1600px] mx-auto px-[var(--gutter)]`)
- Existing CSS classes: `.eyebrow`, `.bracket-link`, `.draw-underline`, `.cta-fill`, `.cta-ripple`, `.tag-sweep`, `.stat-mask`, `.kinetic-title`, `.divider-shimmer`, `.cascade-char`, `.eyebrow-dot`, `.nav-underline`
- Cursor states via `data-cursor="view|read|drag|magnet|text|copy|next|prev|external|play|link|pinned|disabled|default"`
- `ToCRail` — `src/components/chrome/ToCRail.tsx` — article ToC sidebar
- `ReadingProgress` — `src/components/chrome/ReadingProgress.tsx`

## Existing hooks (use, don't recreate)

- `useScrollSnap` — snaps to nearest `[data-section]` on velocity drop
- `useLenisVelocity` — subscribes to Lenis scroll velocity
- `useClickRipple` — spawns ripple DOM element on click
- `useViewportProximity` — proximity detection

## Commands

```
pnpm install          # install deps
pnpm dev              # dev server (Turbopack)
pnpm build            # production build
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
```

## What exists and what doesn't

### Pages that EXIST and need copy + animation upgrades:

| Route | File | Has animation? | CMS-wired? |
|-------|------|---------------|------------|
| `/` | `(marketing)/page.tsx` | YES (full) | YES |
| `/about` | `about/page.tsx` | NO | YES (fetchMembers) |
| `/about/members/[slug]` | `about/members/[slug]/page.tsx` | NO | YES |
| `/manifesto` | `manifesto/page.tsx` | NO | NO (static PILLARS[]) |
| `/join` | `join/page.tsx` | YES (GSAP shake, progressive reveal) | N/A |
| `/projects` | `projects/page.tsx` | NO | YES |
| `/projects/[slug]` | `projects/[slug]/page.tsx` | PARTIAL (CountUp, RevealText) | YES |
| `/journal` | `journal/page.tsx` | NO | YES |
| `/journal/[slug]` | `journal/[slug]/page.tsx` | PARTIAL (QwenPulse easter egg) | YES |
| `/events` | `events/page.tsx` | NO | YES (fetchEvents, typed as unknown[]) |
| `/press` | `press/page.tsx` | NO | NO (static) |
| `/uses` | `uses/page.tsx` | NO | NO (static) |
| `/changelog` | `changelog/page.tsx` | NO | NO (static) |
| `/sponsor` | `sponsor/page.tsx` | NO | NO (static) |
| `/search` | `search/page.tsx` | Delegated to SearchClient | YES |
| `not-found.tsx` | `not-found.tsx` | YES (GSAP mousemove) | N/A |
| `error.tsx` | `error.tsx` | NO | N/A |

### Pages that DO NOT EXIST (must create):

| Route | Directory to create |
|-------|-------------------|
| `/colophon` | `src/app/(marketing)/colophon/page.tsx` |
| `/principles` | `src/app/(marketing)/principles/page.tsx` |
| `/recognition` | `src/app/(marketing)/recognition/page.tsx` |

### Pages to SKIP (not available yet):

- `/lab` — coming soon, do not create
- `/sponsor` — no sponsors yet, leave as-is but do not link in nav/footer

## Current CMS mock data that needs updating (`src/lib/cms.ts`)

### Members array — update to real founders:

```typescript
export const members: Member[] = [
  {
    slug: "thien-hoang",
    name: "Hoang Le Ba Thien",
    role: "Co-founder · Systems & Infrastructure",
    bio: "Pipelines, quantitative systems, and the boring parts that make the magic reproducible. Built production ML at scale before most people finish their first semester.",
    links: { github: "https://github.com/" },
  },
  {
    slug: "tan-le",
    name: "Le Thanh Tan",
    role: "Co-founder · AI Systems & Product",
    bio: "Multimodal AI products, LLM orchestration, and the conviction that if something exists as a SaaS, you can build it yourself — better.",
    links: { github: "https://github.com/" },
  },
];
```

### Announcements — update:

```typescript
export const announcements: Announcement[] = [
  { text: "2nd place — Best Use of Qwen, LotusHacks 2026 (1,500+ participants)", href: "/journal/qwen-hackathon" },
  { text: "Founding cohort applications now open", href: "/join" },
  { text: "New essay — Bounded LLMs, Unbounded Systems", href: "/journal/bounded-llms" },
  { text: "Finalist — Qwen AI Build Day Healthcare Track", href: "/projects/atlas-clinical" },
];
```

### Stats — update:

```typescript
export const stats: Stat[] = [
  { value: 2, suffix: "", label: "Hackathon placings", sparkline: [10, 28, 22, 40, 36, 60, 52, 78] },
  { value: 1500, suffix: "+", label: "Competitors faced", sparkline: [8, 18, 30, 28, 44, 52, 70, 88] },
  { value: 2, suffix: "", label: "Production systems shipped", sparkline: [4, 8, 12, 18, 26, 36, 50, 70] },
  { value: 1, suffix: "", label: "Discipline being defined", sparkline: [60, 64, 70, 72, 78, 80, 84, 90] },
];
```

### Changelog entries — update in `changelog/page.tsx`:

```typescript
const ENTRIES = [
  { v: "v1.3.0", when: "2026-04-25", what: "Full copy rewrite. New pages: Colophon, Principles, Recognition. Founder profiles live." },
  { v: "v1.2.0", when: "2026-04-22", what: "Payload CMS v3 online. Admin at /admin. llms.txt, /api/og, draft preview." },
  { v: "v1.1.0", when: "2026-04-12", what: "Journal published: Bounded LLMs, Unbounded Systems. Stats + manifesto polish." },
  { v: "v1.0.0", when: "2026-03-20", what: "Site v1 — Hero, Manifesto, Projects, Process, Stats, Journal, CTA bands." },
  { v: "v0.2.0", when: "2026-03-15", what: "Lumen ships at LotusHacks 2026. 2nd place, Best Use of Qwen." },
  { v: "v0.1.0", when: "2025-12-01", what: "Repository initialized. Design tokens. Dark editorial system." },
];
```

---

## Copy source

All copy is in `docs/WEBSITE_COPY.md`. It contains ready-to-paste text for every page, section, founder bio, journal article body, metadata, etc. Read it and use it as the single source of truth for all text content. Do not invent copy.

---

## TASKS

Execute in this order. Delegate non-trivial tasks to subagents. Do trivial edits (data swaps, copy paste) yourself.

### Phase 1 — Data & Copy Updates (do yourself, trivial edits)

1. **Update `src/lib/cms.ts`**: Replace members array, announcements array, stats array with the values above. Update project descriptions from `docs/WEBSITE_COPY.md` (Lumen problem/constraint/outcome, Atlas problem/constraint/outcome, stats arrays). Update Lumen stack to `["Qwen-VL", "NestJS", "Supabase", "React 18", "Framer Motion"]` and Atlas stack to `["Qwen", "FastAPI", "Pydantic", "PostgreSQL", "PyMuPDF"]`.
2. **Update `changelog/page.tsx`**: Replace ENTRIES with the 6 entries above.
3. **Update `uses/page.tsx`**: Replace GROUPS content with copy from WEBSITE_COPY.md `/uses` section. Update editor names (Neovim · Thien, Cursor · Tan).
4. **Update `press/page.tsx`**: Replace BOILERPLATE with press kit copy from WEBSITE_COPY.md.
5. **Update `about/page.tsx`**: Replace TIMELINE with 4 entries from WEBSITE_COPY.md. Update metadata description. Add intro paragraph below the headline.
6. **Update `manifesto/page.tsx`**: Replace PILLARS with 4 pillars from WEBSITE_COPY.md (Bounded LLMs, Deterministic edges, Surface uncertainty, Ship to learn). Add intro paragraph section. Update metadata.
7. **Update `events/page.tsx`**: Update intro paragraph text from WEBSITE_COPY.md.
8. **Update `error.tsx`**: Add body text "Something broke. Not the thesis, just the server."
9. **Update journal post data in `cms.ts`**: Update the 3 post excerpts from WEBSITE_COPY.md. Add `bodyMarkdown` field to each post with the full article bodies from WEBSITE_COPY.md.

### Phase 2 — New Pages (delegate to subagent)

Create these 3 new route pages. Each is a server component (no `"use client"` unless animation requires it). Follow the exact pattern of existing pages: import `Frame`, use `.eyebrow`, `.font-display`, `.font-serif-italic`, design tokens. All copy from `docs/WEBSITE_COPY.md`.

10. **Create `src/app/(marketing)/colophon/page.tsx`** — Colophon page. Static content. Sections: Stack, Typography, Color, Motion, Performance targets, Accessibility, Easter eggs, Tools. Export metadata.
11. **Create `src/app/(marketing)/principles/page.tsx`** — Principles page. 6 principles in a grid. Static content. Export metadata.
12. **Create `src/app/(marketing)/recognition/page.tsx`** — Recognition page. Timeline of achievements: LotusHacks, Qwen AI Build Day, Kaggle. Reference `/media/` images. Export metadata.

### Phase 3 — Animation Upgrades (delegate to subagent — this is the big one)

Add scroll-triggered animations to all static secondary pages. The goal: every page should feel choreographed like the landing page. Use existing primitives.

**Pattern to apply to every secondary page:**

a. Wrap the hero `<h1>` in `<RevealText splitBy="char">` (or `"word"` for longer headings).
b. Add GSAP `ScrollTrigger` stagger reveals on grid children: `y: 30, opacity: 0 → y: 0, opacity: 1`, stagger `0.08`, trigger `top 88%`.
c. Add `data-cursor` attributes on interactive elements (cards → `"view"`, links → `"link"`, downloads → `"copy"`, external → `"external"`).
d. Add `.divider-shimmer` class to section `border-t` dividers.
e. Add `MagneticBtn` wrapping on prominent CTAs.
f. All animation must check `prefers-reduced-motion` — skip GSAP if `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.

**Pages to animate:**

13. `/about` — RevealText headline, stagger timeline items, stagger founder cards, divider shimmer.
14. `/about/members/[slug]` — RevealText name, fade-in bio paragraphs.
15. `/manifesto` — RevealText headline, stagger pillar cards with y+opacity, add intro paragraph with word reveal.
16. `/projects` (index) — RevealText headline, stagger project rows.
17. `/journal` (index) — RevealText headline, stagger post cards.
18. `/events` — RevealText headline, stagger event items.
19. `/press` — RevealText headline, stagger asset download links.
20. `/uses` — RevealText headline, stagger group sections, stagger list items within each group.
21. `/changelog` — RevealText headline, stagger changelog rows.
22. `/colophon` — RevealText headline, stagger content sections.
23. `/principles` — RevealText headline, stagger principle cards.
24. `/recognition` — RevealText headline, stagger achievement entries.
25. `/join` — already animated, add RevealText to the headline.

**Implementation note:** For pages that are currently server components (no `"use client"`), you have two options:
- Split into `page.tsx` (server, data fetching) + `PageClient.tsx` (client, animation). This is the existing pattern used by `Projects.tsx`/`ProjectsClient.tsx`.
- Or wrap only the animated parts in small client islands.

Use whichever is simpler per page. Follow existing split patterns.

### Phase 4 — Global Polish (delegate to subagent)

26. **Ambient noise texture** — Add a global noise overlay div in `(marketing)/layout.tsx`, positioned `fixed inset-0 z-[9999] pointer-events-none`, with `bg-[url('/noise.png')] bg-repeat opacity-[0.025]`. File `/public/noise.png` already exists (used in not-found.tsx).
27. **Film vignette** — Add a CSS `radial-gradient` vignette overlay alongside the noise. `background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.15) 100%)`. Same div or sibling div, same z-index and pointer-events-none.
28. **Image clip-path reveal** — Add a CSS utility class `.img-reveal` in `globals.css` with `clip-path: inset(0 100% 0 0)` default and a `.revealed` state with `clip-path: inset(0 0% 0 0)` + `transition: clip-path 0.8s var(--ease-out-expo)`. Use IntersectionObserver to toggle `.revealed` when images enter viewport.
29. **Typewriter eyebrow** — Create a small client component `TypewriterEyebrow.tsx` in `src/components/motion/` that types out text character by character (30ms per char, amber cursor blink). Use on `/uses`, `/changelog`, `/principles`. Falls back to static text on `prefers-reduced-motion`.
30. **Footer link to new pages** — Add Colophon, Principles, Recognition to the footer sitemap links in `Footer.tsx`. Do NOT add Lab or Sponsor.
31. **Header nav** — no changes needed. Leave as-is.

### Phase 5 — Verification (do yourself)

32. Run `pnpm typecheck` — fix any type errors.
33. Run `pnpm lint` — fix any lint errors.
34. Run `pnpm build` — must succeed.
35. Verify each new/updated page renders by checking the build output for all routes.

---

## Guardrails

- **No new runtime dependencies.** Use GSAP, Lenis, OGL, lucide-react, clsx — already installed. If you think you need something else, you don't.
- **No Payload config changes.** CMS schema stays as-is.
- **No changes to `layout.tsx` root** or `(payload)/layout.tsx`.
- **No `any` types.** TypeScript strict mode.
- **All motion must respect `prefers-reduced-motion`.** Check before running GSAP. CSS animations already have the global media query override in globals.css.
- **Use design tokens.** `var(--color-amber)` not `#d4870a`. `var(--fs-display-l)` not `96px`.
- **Keep bundle lean.** No heavy new client components. Prefer server components + small client islands.
- **Do not create /lab, /sponsor updates, or any page not listed above.**
- **Copy must come from `docs/WEBSITE_COPY.md` only.** Do not invent text.
- **Preserve all existing functionality.** Don't break landing page animations, CMS wiring, search, join form, page transitions, cursor, scroll rail.
- **Commit messages:** conventional commits, subject ≤50 chars, body only when why isn't obvious.
