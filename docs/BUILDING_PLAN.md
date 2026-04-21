# BUILDING PLAN — Inference Website

> Sequenced, testable phases. Agent works strictly top-down. Do not skip. Do not reorder. Each phase has acceptance criteria. Phase blocked until criteria pass.

Reference: `docs/SOURCE_OF_TRUTH.md` (SoT). Conflicts → SoT wins.

---

## Phase 0 — Baseline Verification (already scaffolded)

**Goal:** Confirm scaffold compiles + builds clean before any new work.

**Tasks:**

1. `pnpm install`
2. `pnpm exec tsc --noEmit`
3. `pnpm exec next build`
4. `pnpm dev` → load `/`, `/projects`, `/projects/lumen-journal`, `/projects/atlas-clinical`, `/journal`, `/manifesto`, `/join`. Capture console errors.

**Acceptance:**

- tsc: 0 errors
- next build: 0 errors
- All 7 routes return 200 in dev
- Console: 0 errors, ≤ 2 warnings (font preload allowed)

**Output:** `docs/reports/phase-0.md` w/ build summary + screenshots dir `docs/reports/phase-0/*.png` (one per route).

---

## Phase 1 — Lint + Format Hardening

**Goal:** Lock code style. Fail loudly.

**Tasks:**

1. Add `eslint.config.mjs` w/ `next/core-web-vitals` + `next/typescript`.
2. Add `.prettierrc` (printWidth 100, singleQuote false, semi true, trailingComma "all").
3. Add `pnpm` scripts: `lint`, `lint:fix`, `format`, `typecheck`.
4. Fix all violations.

**Acceptance:**

- `pnpm lint` → 0 errors, 0 warnings
- `pnpm typecheck` → 0 errors
- `pnpm format --check` → clean

**Forbidden:** disabling rules globally. If a rule must yield, disable inline w/ comment explaining why.

---

## Phase 2 — Form Wiring (`/join`)

**Goal:** Replace fake submit with validated form + stub API.

**Tasks:**

1. Refactor `src/app/join/page.tsx` to use `react-hook-form` + `zod` resolver.
2. Schema: `name` (min 2), `email` (must end `@hcmut.edu.vn`), `year` (non-empty), `shipped` (min 40 chars).
3. Show inline field errors + `aria-describedby` linkage.
4. Create `src/app/api/join/route.ts` POST handler. Validate w/ same zod schema. Return `{ ok: true }` 200 or `{ errors }` 400. No persistence v1; log to server console.
5. Client posts JSON; on 200 → success card; on 400 → set field errors.

**Acceptance:**

- Submit empty form → 4 inline errors, no network call
- Submit invalid email `foo@gmail.com` → email error
- Submit valid → success card shown, server log printed
- a11y: tabbing reaches every field, focus visible
- typecheck + lint clean

---

## Phase 3 — SEO + Metadata + Sitemap

**Tasks:**

1. Set `metadataBase`, default OG, Twitter card in `src/app/layout.tsx`.
2. Per-page `metadata` export w/ unique title + description (already present on most; verify).
3. Add `src/app/robots.ts` and `src/app/sitemap.ts` covering all static + dynamic routes (project + post slugs from `cms.ts`).
4. Add `public/og.png` placeholder (1200×630, amber wordmark on ink). Generate w/ a one-off script in `scripts/og.mjs` using `@vercel/og` style — but **without** new deps: ship a static PNG built externally and committed. If no PNG available, agent creates a flat SVG fallback at `public/og.svg` and references it.

**Acceptance:**

- `curl localhost:3000/sitemap.xml` lists all 7+ URLs
- `curl localhost:3000/robots.txt` returns valid
- View-source on `/` shows `og:image`, `og:title`, `twitter:card`
- Lighthouse SEO ≥ 95

---

## Phase 4 — Accessibility Pass

**Tasks:**

1. Audit every interactive element for visible focus ring (amber, 2px, 2px offset). Add a global `:focus-visible` style in `globals.css`.
2. Add `aria-label` to icon-only buttons (Header GitHub, mobile menu toggle).
3. Verify color contrast w/ axe DevTools — fix any < AA.
4. Add `<noscript>` fallback in layout explaining JS-required regions.
5. Verify `Cursor` hides on touch / reduced motion.

**Acceptance:**

- axe DevTools: 0 violations on every route
- Keyboard-only walkthrough: can reach + activate every interactive element on `/`
- Lighthouse a11y ≥ 95 every route

---

## Phase 5 — Performance Pass

**Tasks:**

1. Inspect `next build` route output. Any JS chunk > 220 KB on landing → split.
2. Lazy-load below-fold sections via `next/dynamic` w/ `ssr: true, loading: () => null`. Candidates: `Process`, `Stats`, `JournalPreview`, `CTABands`.
3. Convert any `<img>` to `next/image`. Set explicit `sizes`.
4. Audit fonts — `display=swap`, preconnect `fonts.googleapis.com` + `fonts.gstatic.com` in layout `<head>`.
5. Add `Cache-Control` headers via `next.config.ts` for `/_next/static`.

**Acceptance:**

- Landing JS ≤ 220 KB gz (from build report)
- Lighthouse mobile perf ≥ 90 on `/`
- LCP ≤ 2.5s, CLS ≤ 0.05 from Lighthouse

---

## Phase 6 — Content Polish

**Tasks:**

1. Replace placeholder copy in `Hero`, `Manifesto`, `CTABands`, `Footer` colophon w/ final lines (provided in `docs/COPY.md` — agent creates this file w/ first-pass copy + flags `[NEEDS REVIEW]` on uncertain lines).
2. Replace dummy project cover gradients w/ structured CSS mockups already present (verify alignment, no overflow on 320px viewport).
3. Verify all dates / numbers in `cms.ts` are plausible.

**Acceptance:**

- 0 instances of "lorem", "TODO", "FIXME", "wireframe stub" in `src/`
- All `[NEEDS REVIEW]` markers tracked in `docs/COPY.md`
- Every page renders cleanly at 320 / 768 / 1280 / 1920 widths (screenshots in `docs/reports/phase-6/`)

---

## Phase 7 — Final Gate

**Tasks:**

1. Re-run Phases 0-6 acceptance checks end-to-end.
2. Produce `docs/reports/final.md`: build summary, route table w/ JS sizes, Lighthouse table (perf/a11y/SEO/best-practices for every route), open issues.

**Acceptance:**

- All prior acceptance criteria still pass
- `final.md` committed
- Zero uncommitted changes after report generation

---

## Phase 8 — Cursor System v2

Replace `chrome/Cursor.tsx`. Add `data-cursor` attribute API. States per SoT §15.1. Hidden on touch + reduced-motion. ScrollTrigger-free; `requestAnimationFrame` only.

**Acceptance:** all 6 states reachable from `/`; no jank under devtools 4× CPU throttle; tsc/lint/build clean.

## Phase 9 — Hero v2 (kinetic + WebGL)

`HeroBlob.tsx` (lazy, ssr:false) using `ogl`. Single scrubbed background marquee at 0.05 opacity. Primary CTA pair: "Apply →" magnetic, "View work" ghost. Live signal strip: ICT clock, lat/lon HCMUT, build-hash placeholder. Scrubbed kinetic title (letter-spacing widens on scroll until pin release).

**Acceptance:** LCP ≤ 2.6s mobile slow 4G; blob disabled under reduced-motion; works at 320px viewport.

## Phase 10 — Scroll Progress Rail

`chrome/ScrollRail.tsx` fixed in left gutter ≥ 1024px. Sections registered via `data-section`. Active dot scales + label fades in.

**Acceptance:** dot tracks scroll position w/in 1 frame; hidden on mobile; keyboard non-essential.

## Phase 11 — Project SVG Artifacts

Replace card-stack-of-dots in `Projects.tsx` w/ project-specific inline SVG (Lumen pipeline, Atlas trace graph). Animated edges via stroke-dashoffset on ScrollTrigger.

**Acceptance:** zero `<div data-layer>` placeholders remain; both diagrams legible at 768px.

## Phase 12 — Inverted Manifesto Amplifier

Convert Manifesto to ivory bg + ink fg. Oversized Instrument Serif italic. Single section only (SoT §16.3).

**Acceptance:** contrast AAA ink-on-ivory; eyebrow + amber accent retained; surrounding sections unchanged.

## Phase 13 — CTA Bands Reordered + Hover Covers

Order: Apply (01) / Projects (02) / Journal (03). Each band: cover image preview slides in from cursor on hover (CSS clip-path mask). Magnetic on apply.

**Acceptance:** Apply is first; cover mask never blocks text; reduced-motion fallback.

## Phase 14 — Footer Kinetic Wordmark

`INFERENCE` wordmark scrub: opacity, letter-spacing, scale on enter. Live build SHA placeholder mono.

**Acceptance:** no CLS; perf budget intact.

## Phase 15 — Page Transition + Intro

`chrome/PageTransition.tsx`. First-load curtain (sessionStorage gate). Route-change overlay 400ms. Listen to `next/navigation` router events.

**Acceptance:** no FOUC; back/forward works; reduced-motion = instant.

## Phase 16 — Micro-interactions Audit

Sweep every interactive: cursor data-attr, hover spec compliant, focus-visible amber. MagneticBtn on every primary CTA across `/projects`, `/journal`, `/join`.

**Acceptance:** zero interactive el missing data-cursor or focus-visible.

## Phase 17 — Motion QA + Perf Reconcile

Re-run Lighthouse all routes. Re-validate Phase 5 budgets w/ ogl included. Trim if breach. Capture before/after JS gz delta in report.

**Acceptance:** landing ≤ 220 KB gz (relax to 240 if WebGL net-positive on visual review); perf ≥ 88 mobile.

## Phase 18 — Award Submission Package

Capture 5 screenshots, 1 ≤ 60s screen-record (Playwright video), accessibility statement, color-contrast report. Output `docs/reports/award-package/`.

**Acceptance:** package complete; URLs ready for Awwwards/CSSDA submit.

---

## Phase index

| #   | Name                  | Blocks |
| --- | --------------------- | ------ |
| 0   | Baseline              | 1      |
| 1   | Lint                  | 2      |
| 2   | Form                  | 3      |
| 3   | SEO                   | 4      |
| 4   | a11y                  | 5      |
| 5   | Perf                  | 6      |
| 6   | Content               | 7      |
| 7   | Final (build quality) | 8      |
| 8   | Cursor v2             | 9      |
| 9   | Hero v2 + WebGL       | 10     |
| 10  | Scroll rail           | 11     |
| 11  | Project SVGs          | 12     |
| 12  | Inversion             | 13     |
| 13  | CTA bands             | 14     |
| 14  | Footer kinetic        | 15     |
| 15  | Page transition       | 16     |
| 16  | Micro-int audit       | 17     |
| 17  | Motion QA + perf      | 18     |
| 18  | Award package         | 19     |

---

## v2 — Payload CMS + AI-native + SOTA upgrade

Human-approved deps + scope (see SoT §17, §7). One commit per phase.

## Phase 19 — Deps + SoT update

Install Payload v3 runtime deps (see SoT §17 v2 list). Update SoT §5, §7, §17. Verify `pnpm tsc --noEmit` and `pnpm next build` still pass with deps installed but unused.

**Acceptance:** tsc 0, build 0, deps in `package.json`, SoT updated.

## Phase 20 — Docker Postgres

Add `docker-compose.yml` (postgres:16-alpine + adminer). Add DATABASE_URI/PAYLOAD_SECRET/PREVIEW_SECRET/NEXT_PUBLIC_SITE_URL/S3_* placeholders to `.env.example`. Healthcheck passes.

**Acceptance:** `docker compose up -d` → `pg_isready` ok; `.env.example` has all keys.

## Phase 21 — Payload bootstrap

`payload.config.ts` at root. `src/app/(payload)/admin/[[...segments]]/page.tsx` + `(payload)/api/[...slug]/route.ts` + graphql routes. `withPayload` wrap in `next.config.ts`. Empty `users` collection. `/admin` returns 200 and serves first-boot flow.

**Acceptance:** `/admin` 200, first admin user creatable, tsc 0, build 0.

## Phase 22 — Collections + globals

`src/collections/*` (projects, posts, events, members, announcements, pages, media, tags, redirects, users) + `src/globals/*` (site-settings, manifesto-pillars, footer, navigation, home-page). Versions+drafts+autosave on content collections. `pnpm payload generate:types` → `src/payload-types.ts`.

**Acceptance:** types compile; all collections visible in admin nav.

## Phase 23 — Migrations + seed

`pnpm payload migrate`. Seed script (`scripts/seed.mjs`) ports `src/lib/cms.ts` fixtures into DB.

**Acceptance:** counts match fixtures; admin shows seeded docs.

## Phase 24 — cms.ts facade swap

Rewrite `src/lib/cms.ts` as Payload-backed facade; keep exported signatures byte-compatible. Public routes unchanged visually.

**Acceptance:** tsc 0, build 0, route screenshots identical.

## Phase 25 — SEO + dynamic OG

`plugin-seo` per collection. `src/app/api/og/route.ts` (edge) using `next/og` with amber-on-ink template. `generateMetadata` in dynamic routes hydrated from Payload SEO fields + default OG.

**Acceptance:** Lighthouse SEO ≥ 98 per route; `/api/og?title=X` returns 1200×630 PNG.

## Phase 26 — Revalidation + draft preview

`afterChange` hook per collection → `revalidateTag` + `revalidatePath`. `/api/preview` toggles draftMode. Admin `livePreview.url` wired. Draft banner component + `Esc` exit.

**Acceptance:** edit → published in ≤ 1s on public route; preview banner renders only in draftMode.

## Phase 27 — Admin UI re-skin

`src/admin/{Logo,Icon,Dashboard}.tsx` + `custom.scss`. Dark amber theme. Dashboard widgets: drafts, scheduled, recent submissions, broken-links, sparkline published/week, quick-action row.

**Acceptance:** `/admin` visually matches brand tokens; widgets render live data.

## Phase 28 — New public routes

`/about`, `/about/members/[slug]`, `/events`, `/events/[slug]`, `/workshops`, `/press`, `/sponsor`, `/uses`, `/changelog`, `/search`, `/journal/tag/[slug]`. Each fetches Payload data; `generateStaticParams` + `generateMetadata` where dynamic.

**Acceptance:** tsc 0, build 0, every route 200 in dev; mobile layout clean at 320/768/1280.

## Phase 29 — AI-native surfaces

Rewrite `src/app/robots.ts` (allow GPTBot/ClaudeBot/ChatGPT-User/PerplexityBot/Google-Extended/Applebot-Extended; disallow CCBot/Bytespider/ImagesiftBot/Amazonbot/anthropic-ai). Add `/llms.txt`, `/llms-full.txt`, `/humans.txt`, `/.well-known/security.txt`, `/.well-known/ai.txt`, `/api/rss`. Emit JSON-LD (`Organization`, `WebSite`, `BreadcrumbList`, `Article`, `CreativeWork`, `Person`, `Event`) per route.

**Acceptance:** all endpoints 200; JSON-LD validates via `schema.org` linter; RSS parses.

## Phase 30 — Motion + UX upgrades + final perf

Loader v3, `view-transition-api` route transitions, cursor v3 states (`audio, search, download, submit, pin, timeline, expand`), kinetic type scrubs tightened, magnetic snap on project covers, print stylesheet for `/projects/[slug]`. Re-run Lighthouse all routes.

**Acceptance:** landing JS ≤ 220 KB gz; mobile perf ≥ 90, a11y ≥ 95, SEO ≥ 98 all routes.

---

## v2 phase index

| #   | Name                          | Blocks |
| --- | ----------------------------- | ------ |
| 19  | Deps + SoT                    | 20     |
| 20  | Docker Postgres               | 21     |
| 21  | Payload bootstrap             | 22     |
| 22  | Collections + globals         | 23     |
| 23  | Migrations + seed             | 24     |
| 24  | cms.ts facade swap            | 25     |
| 25  | SEO + dynamic OG              | 26     |
| 26  | Revalidation + draft preview  | 27     |
| 27  | Admin UI re-skin              | 28     |
| 28  | New public routes             | 29     |
| 29  | AI-native surfaces            | 30     |
| 30  | Motion + UX + final perf      | —      |

Agent must commit at end of each phase. One commit per phase. Message: `phase(N): <slug> — <one-line summary>`.
