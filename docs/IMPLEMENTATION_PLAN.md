# IMPLEMENTATION PLAN — Agentic Engineering Site (v2 Award Push)

> Canonical phase-by-phase plan. Authority: tier 2 (above BUILDING_PLAN, below SoT). Agent must execute strictly top-down. One commit per phase. Each phase owns its acceptance gate. Cannot skip, cannot reorder.

---

## 0. Context

The site (`bkae-website`) currently brands as **"Inference"**. Real club name is **Agentic Engineering** (HCMUT). This plan rebrands the site, removes the Hero signal strip (Local / Coords / Status / Cohort) per founder request, and lifts every motion / interaction / micro-detail layer to award-submission grade (Awwwards / CSSDA / FWA tier).

**Stack stays locked.** Only new dep allowed across the entire plan: `potrace` as **devDependency** (one-shot logo trace, never shipped).

The placeholder URLs `inference.club`, `github.com/inference-club`, `hello@inference.club` are intentionally kept — they swap when the real domain is registered. Internal storage keys (`inference:intro-seen`, `__inferenceGreeted`) are kept to avoid invalidating returning sessions; user-visible label is rebranded but storage key stays.

---

## 1. Identity (canonical, supersedes all conflicting copy)

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

---

## 2. Authority Order

1. Explicit human prompt
2. `docs/SOURCE_OF_TRUTH.md` (SoT — must be updated in same commit as code that changes its contract)
3. **`docs/IMPLEMENTATION_PLAN.md`** (this file)
4. `docs/BUILDING_PLAN.md` (legacy phases 0–18; remain valid for build hygiene; this plan layers on top)
5. `docs/WORKFLOW_RULES.md`
6. Existing code

Conflict between human prompt and SoT → halt, ask human.

---

## 3. Hard Constraints (non-negotiable)

- **No new runtime dep.** `potrace` allowed as devDep only (Phase 2). Anything else → log to `docs/BLOCKED.md`, halt.
- Every animating `useEffect` opens with the reduced-motion guard:
  ```ts
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ```
- All colors via `@theme` tokens in `globals.css`. No raw hex in components.
- Spacing/type via existing tokens (`--gutter`, `--space-*`, `--fs-*`, `--lh-*`, `--tr-*`).
- Eases: `--ease-precise`, `--ease-out-expo` (or GSAP `expo.out` / `power3.inOut`).
- One commit per phase. Message: `phase(<slug>): <one-line summary>`.
- Co-author trailer per RTK CLAUDE.md.
- RTK prefix on every shell invocation (`rtk pnpm build`, `rtk git status`, etc.).
- Never `git push`, never amend, never `--no-verify`, never `git add .`/`git add -A`.
- Never touch `.env*` beyond `.env.example`.
- Never delete files outside `node_modules/`, `.next/`, `docs/reports/`.
- Cursor hidden on `(hover: none)` and `prefers-reduced-motion: reduce`.
- `cms.ts` types unchanged unless SoT §8 updated in same commit.

---

## 4. Phase Sequence (30 phases, one commit each)

Acceptance for **every** phase:
1. `rtk pnpm typecheck` → 0 errors
2. `rtk pnpm lint` → 0 errors, 0 new warnings
3. `rtk pnpm build` → 0 errors
4. Manual smoke of every changed route in `rtk pnpm dev`
5. Reduced-motion smoke (Chrome DevTools → Rendering → emulate `prefers-reduced-motion: reduce`)
6. Keyboard-only smoke for any new interactive element
7. SoT updated in same commit if contract changed
8. `docs/reports/phase-<slug>.md` written with file list + acceptance evidence
9. Commit per R5

### Phase 1 — `rebrand-copy`
**Goal:** Swap user-visible "Inference" → "Agentic Engineering". Internal storage keys + console global keep `inference` token.

**Tasks:**
- `src/components/chrome/Header.tsx`: replace `inference.` with new lockup `agentic engineering.` (lowercase, amber period). Logo mark slot prepared (LogoMark mounts in Phase 2).
- `src/components/chrome/Footer.tsx`: rewrite "Inference" eyebrow → "Agentic Engineering". Footer wordmark `INFERENCE` → `AGENTIC` on line 1, `ENGINEERING` on line 2 (two-line stack at large size; preserve scrub animation).
- `src/components/chrome/PageTransition.tsx`: intro screen text `INFERENCE.` → `AGENTIC ENGINEERING.`; eyebrow `[ inference · v1 · 2026 ]` → `[ agentic engineering · v1 · 2026 ]`. **Keep `sessionStorage.setItem("inference:intro-seen", "1")` as-is** (storage key only).
- `src/components/chrome/GridOverlay.tsx`: console banner text → `Agentic Engineering — Bounded LLMs. Contract-based pipelines.`. Window global `__inferenceGreeted` stays (internal-only).
- `src/components/sections/Hero.tsx`: eyebrow `Inference · HCMUT · Founded 2026` → `Agentic Engineering · HCMUT · Founded 2026`.
- `src/app/layout.tsx`: metadata title default → `Agentic Engineering — HCMUT`; template → `%s · Agentic Engineering`; description → `Agentic Engineering is the HCMUT student club institutionalizing bounded, contract-based AI engineering. Founded by two first-year students. Currently shipping.`. OG/Twitter same. `metadataBase` stays `https://inference.club` (placeholder).
- `docs/SOURCE_OF_TRUTH.md` §1 Identity: replace "Inference" with the table from §1 of this file.
- `docs/COPY.md`: update brand block.
- `docs/reports/phase-rebrand-copy.md`.

**Acceptance:** All visible occurrences of "Inference" / "INFERENCE" / "inference." in rendered DOM replaced. Storage key + `__inferenceGreeted` global preserved. Build/typecheck/lint clean.

---

### Phase 2 — `logo-svg`
**Goal:** Vectorize `logo.png` (1024×1024 RGB raster). Inline as React.

**Tasks:**
- `pnpm add -D potrace` (only allowed dep addition this entire plan).
- `scripts/trace-logo.mjs`: reads `logo.png`, outputs `public/logo.svg`. Use `potrace`'s `trace()` with `{ threshold: 180, color: "currentColor", background: "transparent", optTolerance: 0.4 }`. Strip width/height attrs, set `viewBox` only. Document command at top of script.
- Add npm script `"trace-logo": "node scripts/trace-logo.mjs"` to `package.json`.
- Run script. Commit generated `public/logo.svg`. Also copy `logo.png` → `public/logo.png` for OG fallback.
- `src/components/primitives/LogoMark.tsx`: client-safe React component. Inlines SVG paths from `logo.svg` (paste paths inline; do NOT fetch at runtime). Props: `className`, `size`. Default `size = 14`. Uses `currentColor` so consumer controls color via Tailwind.
- Mount LogoMark in: Header (left of wordmark), Footer (small, before "Agentic Engineering" eyebrow), PageTransition intro (large, stroke-draws in via `stroke-dasharray` over 480ms; reduced-motion → fade in 80ms).
- Favicon: replace `app/favicon.ico` if present, plus add `app/icon.svg` (Next 13+ App Router auto-detection) using same SVG.
- SoT §16 amended: add Logo Asset block.

**Acceptance:** `public/logo.svg` exists, < 8KB. LogoMark renders in Header / Footer / Loader. tsc / build clean. Visual: mark legible at 14px and at 200px.

---

### Phase 3 — `hero-clean`
**Goal:** Remove signal strip (Local/Coords/Status/Cohort). Hero re-balanced.

**Tasks:**
- `src/components/sections/Hero.tsx`: delete `SignalClock` component + the entire signal strip block (currently lines 145–171 — 4-column grid w/ Local/Coords/Status/Cohort).
- Replace with single subtle live build line below the CTA pair:
  ```
  ICT 23:45:12 · v1.0.0-<sha7> · online · HCMUT
  ```
  Mono, `var(--fs-eyebrow-sm)`, `var(--color-steel)`, no labels. SHA from `process.env.NEXT_PUBLIC_BUILD_SHA` with fallback `"dev"`. Time via existing clock pattern.
- Keep eyebrow → headline → keyword chips → CTA pair → live band → scroll cue.
- Re-tighten spacing (signal strip used 96px+; new band uses `mt-10`).
- SoT §9 Hero contract amended (remove signal strip, add live band).

**Acceptance:** No "LOCAL" / "COORDS" / "STATUS" / "COHORT" labels in rendered DOM. New live band present. tsc / build clean.

---

### Phase 4 — `loader-v2`
**Goal:** First-visit loader (1.6s total, 4 stages). Visit 2+ → mini hairline only (320ms).

**Tasks:**
- `src/components/chrome/PageTransition.tsx`: new intro choreography.
  - Visit count from `sessionStorage.ae:visit-count` (separate from existing `inference:intro-seen` to allow grace migration).
  - Stage A (0–280ms): amber 1px hairline sweeps full viewport width, left → right.
  - Stage B (280–760ms): LogoMark appears center, paths stroke-draw via `stroke-dasharray`. Concurrently a mono eyebrow types `loading discipline...` char-by-char.
  - Stage C (760–1200ms): wordmark `AGENTIC ENGINEERING` rises char-by-char w/ 30ms stagger from below a clip mask.
  - Stage D (1200–1600ms): bottom-left counter 00 → 100 (real RAF, eased), then 4-panel curtain (4 vertical bars) wipes upward in stagger.
  - Reduced-motion → instant skip; set `ae:visit-count` to 1.
  - Returning visit (count > 0): only Stage A (320ms hairline) shown, no curtain.
- Verify route-overlay path remains intact (untouched this phase).
- SoT §15.3 amended.

**Acceptance:** First load ≤ 1.7s before content interactive. Returning load ≤ 360ms. Reduced-motion = no animation. tsc / build clean.

---

### Phase 5 — `route-transition-v2`
**Goal:** Route-change wipe + scroll restoration + idle prefetch.

**Tasks:**
- `src/components/chrome/PageTransition.tsx`: replace `routeFade` keyframe with diagonal 3-band wipe via `clip-path: polygon(...)`. Bands: amber → ink → amber. Enter 500ms, exit 400ms.
- Scroll-to-top on `pathname` change (window.scrollTo + `lenis.scrollTo(0, { immediate: true })` if Lenis exposed).
- New util `src/lib/prefetch.ts`: IntersectionObserver on visible `<Link>` elements; after 80ms idle on viewport entry, calls `router.prefetch(href)`.
- Reduced-motion fallback: 60ms opacity fade only.

**Acceptance:** Visible diagonal wipe on every nav. No FOUC. Back/forward works. tsc / build clean.

---

### Phase 6 — `cursor-v3`
**Goal:** Expand cursor state machine + trail + idle orbit + click ripple.

**Tasks:**
- `src/components/chrome/Cursor.tsx`:
  - Add states: `disabled` (×), `copy` ("COPY"), `next` (→), `prev` (←), `external` (↗), `play` (▶), `pinned` (filled).
  - Trail: store last 3 positions sampled at 20ms; render 3 ghost rings at 40/25/12% opacity.
  - Idle micro-orbit: if pointer stationary ≥ 1200ms, ring scale lerps 1.00 → 1.06 → 1.00 over 2.4s loop.
  - Replace CSS transitions on width/height/bg with rAF lerp (`size += (target - size) * 0.18`). Keep `mix-blend-difference`.
  - Click ripple: on `mousedown`, spawn amber radial gradient 0 → 1.4 scale, fade over 450ms.
- SoT §15.1 amended w/ new state table.

**Acceptance:** Every state reachable from `/`. Trail visible during fast moves. Idle orbit triggers. tsc / build clean. Reduced-motion → no orbit, no trail.

---

### Phase 7 — `kinetic-type`
**Goal:** Headline cursor-warp + manifesto sweep + footer parallax.

**Tasks:**
- `src/components/sections/Hero.tsx`: extend headline scrub to add cumulative `text-shadow` blur stack (faux-variable-weight) on scroll. Add cursor-warp: when pointer within 240px of headline, individual letters within proximity gain 4px `translateY` displacement (eased; uses `letter-by-letter` split via existing RevealText pattern).
- `src/components/sections/Manifesto.tsx`: line-by-line clip-mask reveal (already partial). Add amber 1px underline sweep left→right beneath each line as it reveals.
- `src/components/chrome/Footer.tsx`: per-letter parallax hover on `AGENTIC ENGINEERING` wordmark — each char follows cursor by 2–8px (depth based on horizontal distance).
- `src/hooks/useViewportProximity.ts`: returns `{ x, y, near }` for arbitrary element bbox.

**Acceptance:** Visible on all four. Reduced-motion → static. tsc / build clean.

---

### Phase 8 — `magnetism-snap`
**Goal:** Magnetism on every primary CTA + soft scroll-snap on quiet stretches.

**Tasks:**
- Wrap primary CTAs across `/projects`, `/journal`, `/join`, `/manifesto` in MagneticBtn.
- `src/hooks/useScrollSnap.ts`: GSAP-driven soft snap to nearest section when Lenis velocity < 0.02 for ≥ 200ms. Disabled for first 300px after a section top.
- `src/components/chrome/SmoothScroll.tsx`: expose Lenis velocity via context; consumer hook subscribes.
- `src/hooks/useLenisVelocity.ts`: tap into Lenis instance.
- Sections opt in via `data-snap` attribute.

**Acceptance:** Smooth, never abrupt. Mobile no-op. Reduced-motion no-op. tsc / build clean.

---

### Phase 9 — `micro-interactions`
**Goal:** Global polish layer.

**Tasks (all in `src/app/globals.css` plus targeted component edits):**
- Eyebrow dot: `@keyframes pulse` 2.4s loop, amber.
- `.draw-underline`: add `box-shadow: 0 0 6px var(--color-amber-pale)` glow that fades in 400ms after underline draws (post-hover).
- `.cta-ripple`: utility class + JS hook `useClickRipple(ref)` that spawns radial amber gradient on click.
- `Tag` primitive: hover → linear-gradient amber sweep 600ms.
- `.bracket-link`: hover → brackets translate 4px outward each.
- Anchor target `:target`: 600ms amber outline pulse.
- Form fields: focus → amber border + 1px outer glow.
- Selection color = amber (already in globals).

**Acceptance:** Visible on `/`, `/join`, `/projects`. tsc / build clean.

---

### Phase 10 — `manifesto-inversion`
**Goal:** Background lerps ink↔ivory via Lenis progress; cursor flips inside.

**Tasks:**
- `src/components/sections/Manifesto.tsx`: drive bg via `gsap.to` scrubbed against ScrollTrigger `start: top bottom, end: top center`. Progress 0→1 lerps `var(--color-ink)` → `var(--color-ivory)`.
- Giant `01` numeral parallaxes 30% slower than scroll (negative `yPercent`).
- `src/components/chrome/Cursor.tsx`: detect when over Manifesto via element under pointer; swap from amber-on-ink default to ink-on-ivory class (or rely on `mix-blend-difference` already present — verify).
- Header backdrop adapts when scrolled past Manifesto top (`shrunk` already does this; ensure amber accent stays visible on ivory).

**Acceptance:** No jump, smooth lerp. Cursor visible against both. tsc / build clean.

---

### Phase 11 — `projects-immersion`
**Goal:** Project section becomes the centerpiece.

**Tasks:**
- `src/components/sections/Projects.tsx`: each project pinned 100vh.
- ScrollTrigger progress drives node lighting on Lumen pipeline (Input → Tags → Writer → Memory → Output sequentially, amber stroke fills 0→1).
- Hover diagram: 2deg `rotateX/rotateY` perspective tilt toward cursor.
- Atlas: "refused" row pulses amber once per pin-in (single shake).
- Stats: existing CountUp; on hover, number gets amber sweep mask 600ms.
- Tag chips fill amber on hover (label → ink), scale 1.04.
- "Read the build →" gets bracket-draw outward.
- `src/components/sections/ProjectDiagrams.tsx` extended.

**Acceptance:** Visible at 1280 + 768. tsc / build clean.

---

### Phase 12 — `process-drag`
**Goal:** Horizontal scroll-jack gains drag-pan + edge draw.

**Tasks:**
- `src/components/sections/Process.tsx`: add cursor `drag` on the pinned track.
- Mouse drag on desktop scrubs the pin progress (independent of vertical scroll, additive).
- Amber 1px line draws between adjacent stages as scroll progresses.
- Mobile: vertical stack with stagger reveal.

**Acceptance:** Drag feels right; no jitter. Mobile fallback works. tsc / build clean.

---

### Phase 13 — `stats-spark`
**Goal:** Sparklines + label sweeps + weight scrub.

**Tasks:**
- `src/components/primitives/Sparkline.tsx`: 24×8 SVG, polyline, amber, animates dash on enter.
- `src/components/sections/Stats.tsx`: add sparkline below each number.
- Hover label → amber underline sweep.
- Numerals get faux-variable-weight on viewport enter (text-shadow stack scrubbed by ScrollTrigger).

**Acceptance:** All four stats render sparkline. tsc / build clean.

---

### Phase 14 — `journal-cover-mask`
**Goal:** Hero card scale + scan-line wipe.

**Tasks:**
- `src/components/sections/JournalPreview.tsx`: hero card scrubbed scale 1.00 → 1.04 over 60vh.
- Cover hover: cursor `read`; image gets amber CSS-gradient scan-line traveling top → bottom 600ms loop while hovered.
- "All posts →" link: arrow translates 8px on hover.

**Acceptance:** Visible on `/`. tsc / build clean.

---

### Phase 15 — `cta-bands-pop`
**Goal:** Cursor-tracked cover popover inside bands.

**Tasks:**
- `src/components/sections/CTABands.tsx`: each band on hover spawns a 200×120 cover image preview that follows cursor (fixed positioning relative to band, clipped by band bounds).
- Pulled from `cms.ts` matching slug (`/join` band uses generic teaser; `/projects` shows latest project cover; `/journal` shows latest post cover).
- Mobile (`hover: none`) → no popover, retain existing wipe.

**Acceptance:** Visible on `/`. tsc / build clean.

---

### Phase 16 — `footer-kinetic-v2`
**Goal:** Build SHA row + ASCII view-source comment.

**Tasks:**
- `src/components/chrome/Footer.tsx`: add row above colophon: `BUILD <sha7> · COMMIT <Nh ago> · DEPLOY <env>`. Env-injected; fallback strings.
- HTML comment in layout `<head>` containing ASCII art logo (small, < 30 lines).

**Acceptance:** Visible in footer + view-source. tsc / build clean.

---

### Phase 17 — `header-active`
**Goal:** Active-route bar + scroll-direction expand.

**Tasks:**
- `src/components/chrome/Header.tsx`: amber 1px underline on active nav link based on `usePathname`.
- Scroll-up direction → header expands; scroll-down → header contracts (in addition to existing shrink-on-scroll).
- JOIN button → MagneticBtn wrap.
- Mobile menu: stagger reveal already present; add amber sweep bar per item on open.

**Acceptance:** Visible on every route. tsc / build clean.

---

### Phase 18 — `live-band`
**Goal:** Slim chrome row above MarqueeBar.

**Tasks:**
- `src/components/chrome/LiveBand.tsx`: 24px tall, mono, content `ICT hh:mm:ss · BUILD <sha7> · COMMIT <Nh ago> · STATUS online`.
- Pause on `document.hidden`.
- `src/app/layout.tsx`: mount LiveBand before MarqueeBar.
- Reduced-motion: static text.

**Acceptance:** Visible top of every page. Hidden tab → no tick. tsc / build clean.

---

### Phase 19 — `scroll-rail-v2`
**Goal:** Trail + tooltip + clickable rail.

**Tasks:**
- `src/components/chrome/ScrollRail.tsx`: add 3-dot lag trail behind active dot (fades 800ms).
- Hover dot: section name tooltip slides in from right.
- Click dot: smooth scroll via Lenis `scrollTo(target)`.

**Acceptance:** All three behaviors. tsc / build clean.

---

### Phase 20 — `marquee-dismiss`
**Goal:** Hover pause + dismissible.

**Tasks:**
- `src/components/chrome/MarqueeBar.tsx`: hover → pause cycle, reveal "Learn more →".
- Right-side X button → set `sessionStorage.ae:marquee-dismissed = "1"`, hide for session.

**Acceptance:** Hover pauses; X dismisses. tsc / build clean.

---

### Phase 21 — `not-found`
**Goal:** Custom 404 + error boundary.

**Tasks:**
- `src/app/not-found.tsx`: kinetic `404` (Syne 800, mouse-position scrub on letter-spacing). Quote: `"Unsupported claims return uncertainty, not prose."`. Home link.
- `src/app/error.tsx`: matching style for 500.

**Acceptance:** Visit `/does-not-exist` → custom page. tsc / build clean.

---

### Phase 22 — `join-form-polish`
**Goal:** Multi-stage feel + receipt success.

**Tasks:**
- `src/app/join/page.tsx`: each field group fades in as previous is touched (focus chain).
- Real-time validation chips (amber check / steel idle / red error) beside fields.
- Char counter on `shipped` textarea (40 min).
- Submit button: 1px hairline progresses inside border during loading.
- Success: amber check stroke-draws; mono receipt: `Application #AE-2026-<random4> received`.
- Failure: shake 4px once, inline errors.
- Live region for screen-readers on result.

**Acceptance:** Full happy + sad paths visible. a11y pass. tsc / build clean.

---

### Phase 23 — `journal-detail`
**Goal:** Reading-progress + ToC + dropcap.

**Tasks:**
- `src/components/chrome/ReadingProgress.tsx`: top 2px amber bar tracks scroll.
- `src/components/chrome/ToCRail.tsx`: right-rail desktop only, highlights active heading via IntersectionObserver.
- `src/app/journal/[slug]/page.tsx`: kinetic dropcap (Instrument Serif, 6em, amber). Auto-detect blockquote → pull-quote treatment. Reading time from `posts[slug].readingTime`.

**Acceptance:** Visible on `/journal/bounded-llms`. tsc / build clean.

---

### Phase 24 — `project-detail`
**Goal:** Stat reveal + ToC + next-project footer.

**Tasks:**
- `src/app/projects/[slug]/page.tsx`: hero stat block reveals on enter (CountUp).
- ToCRail right-rail.
- Tech stack chips animate in stagger (existing Tag primitive).
- "Next project →" footer link with cover preview that fades in on hover.

**Acceptance:** Visible on both project slugs. tsc / build clean.

---

### Phase 25 — `easter-eggs`
**Goal:** Konami extension + console API + view-source ASCII.

**Tasks:**
- `src/components/chrome/GridOverlay.tsx`: extend Konami to enable "matrix mode" — amber rain canvas overlay (8KB code, 2D canvas, kill switch via Esc).
- Expose `window.__ae = { invert, grid, trail, about }` (functions toggle modes; `about()` returns club description object).
- ASCII logo HTML comment in layout `<head>`.
- `/journal/qwen-hackathon` slug: one-shot amber pulse on first paint (sessionStorage gate).
- Triple-click footer copyright: footer wordmark vertical scroll mode for 4s.

**Acceptance:** All five eggs reachable. tsc / build clean.

---

### Phase 26 — `audio-opt-in`
**Goal:** Opt-in audio layer.

**Tasks:**
- `src/components/chrome/AudioToggle.tsx`: small `♪` button bottom-right. State in `localStorage.ae:audio`.
- Off by default. When on:
  - Hover ticks on links (WebAudio synth, no asset).
  - Page-transition swoosh.
- Reduced-motion **also** disables audio.

**Acceptance:** Off by default; toggling produces sound; reduced-motion respects. tsc / build clean.

---

### Phase 27 — `a11y-audit`
**Goal:** axe DevTools 0 violations.

**Tasks:**
- Run axe on `/`, `/projects`, `/projects/lumen-journal`, `/journal`, `/journal/bounded-llms`, `/manifesto`, `/join`, `/not-found`.
- Fix every violation.
- Keyboard-only walkthrough every route.
- Document in `docs/reports/phase-a11y-audit.md`.
- Verify color contrast ivory-on-ink ≥ 7:1, amber-on-ink ≥ 4.5:1.

**Acceptance:** axe = 0 violations every route. Keyboard reachable. tsc / build clean.

---

### Phase 28 — `perf-reconcile`
**Goal:** Land budgets.

**Tasks:**
- Re-measure landing JS gz from `next build`.
- Lazy-load below-fold via `next/dynamic`: Process, Stats, JournalPreview, CTABands, Dust, LiveBand.
- Trim `ogl` if Hero blob renders before paint.
- Add `Cache-Control` headers on `/_next/static` via `next.config.ts`.
- Run Lighthouse mobile 4× (warm) on `/`. Average perf ≥ 88.
- Document in `docs/reports/phase-perf-reconcile.md`.

**Acceptance:** Landing JS ≤ 240 KB gz. LCP ≤ 2.6s. CLS ≤ 0.05. INP ≤ 200ms. tsc / build clean.

---

### Phase 29 — `award-package`
**Goal:** Submission deliverables.

**Tasks:**
- `docs/reports/award-package/`:
  - 5 PNG stills (1440×900), one per landing scene + manifesto.
  - 1 webm screen-record ≤ 60s captured via Playwright (already devDep).
  - `accessibility-statement.md`.
  - `color-contrast-report.md`.
  - `motion-statement.md` (reduced-motion behavior).
  - `lighthouse-summary.md` (table, all routes).
- README updated with award-submission URLs.

**Acceptance:** Folder complete; URLs ready. tsc / build clean.

---

### Phase 30 — `favicon-live`
**Goal:** Canvas-rendered favicon w/ scroll arc.

**Tasks:**
- `src/components/chrome/LiveFavicon.tsx`: client-only. Renders LogoMark + thin amber arc (radial progress) into an offscreen canvas; updates favicon on scroll throttled to 200ms.
- Register in layout.

**Acceptance:** Tab favicon updates as you scroll `/`. tsc / build clean.

---

## 5. File Map

### New
```
scripts/trace-logo.mjs                  # potrace runner (dev only)
public/logo.svg                         # generated
public/logo.png                         # OG fallback (copy of root logo.png)
src/app/icon.svg                        # auto-detected favicon
src/app/not-found.tsx
src/app/error.tsx
src/components/primitives/LogoMark.tsx
src/components/primitives/Sparkline.tsx
src/components/chrome/LiveBand.tsx
src/components/chrome/LiveFavicon.tsx
src/components/chrome/AudioToggle.tsx
src/components/chrome/ReadingProgress.tsx
src/components/chrome/ToCRail.tsx
src/components/motion/Dust.tsx
src/components/motion/StrokeDrawSVG.tsx
src/hooks/useScrollSnap.ts
src/hooks/useLenisVelocity.ts
src/hooks/useViewportProximity.ts
src/hooks/useClickRipple.ts
src/lib/prefetch.ts
docs/IMPLEMENTATION_PLAN.md             # this file
docs/AGENT_PROMPT.md                    # handoff for Antigravity Gemini 3.1 Pro
docs/reports/phase-<slug>.md            # one per phase (30 files)
docs/reports/award-package/             # 5 PNG + 1 webm + 4 md
```

### Modified
```
docs/SOURCE_OF_TRUTH.md                 # §1, §9, §15.1, §15.3, §16
docs/COPY.md
CLAUDE.md
package.json                            # +potrace devDep ONLY; +trace-logo script
next.config.ts                          # env injection (BUILD_SHA, BUILD_TIME), Cache-Control
src/app/globals.css                     # micro-interactions, focus, eases
src/app/layout.tsx
src/components/chrome/Header.tsx
src/components/chrome/Footer.tsx
src/components/chrome/PageTransition.tsx
src/components/chrome/Cursor.tsx
src/components/chrome/GridOverlay.tsx
src/components/chrome/SmoothScroll.tsx
src/components/chrome/MarqueeBar.tsx
src/components/chrome/ScrollRail.tsx
src/components/sections/Hero.tsx
src/components/sections/Manifesto.tsx
src/components/sections/Projects.tsx
src/components/sections/Process.tsx
src/components/sections/Stats.tsx
src/components/sections/JournalPreview.tsx
src/components/sections/CTABands.tsx
src/components/sections/ProjectDiagrams.tsx
src/components/motion/RevealText.tsx
src/components/motion/HeroBlob.tsx
src/components/primitives/Tag.tsx
src/components/primitives/Button.tsx
src/app/join/page.tsx
src/app/journal/[slug]/page.tsx
src/app/projects/[slug]/page.tsx
```

### Untouched (do not refactor while passing through)
```
src/lib/cms.ts                          # types frozen; data only if metadata strings; do not change types unless SoT §8 updated
src/app/robots.ts
src/app/sitemap.ts
src/app/api/join/route.ts               # stub only; T-phase tasks live in /join/page.tsx
```

---

## 6. Reuse Inventory

| Need | Reuse |
|---|---|
| GSAP init | `src/lib/gsap.ts` `ensureGsap()` |
| Class merge | `src/lib/utils.ts` `cn()` |
| Number format | `src/lib/utils.ts` `fmt()` |
| Text reveal | `src/components/motion/RevealText.tsx` (extend) |
| Magnetism | `src/components/motion/MagneticBtn.tsx` |
| Marquee | `src/components/motion/MarqueeRow.tsx` |
| Counter | `src/components/motion/CountUp.tsx` |
| WebGL hero | `src/components/motion/HeroBlob.tsx` |
| Cursor SM | `src/components/chrome/Cursor.tsx` |
| Lenis | exposed via `SmoothScroll` |
| Helpers | `.cta-fill`, `.draw-underline`, `.bracket-link`, `.eyebrow*`, `.font-display`, `.font-serif-italic`, `.section-pad*`, `.h-display-*` |
| Tokens | `--color-*`, `--gutter`, `--space-*`, `--fs-*`, `--lh-*`, `--tr-*`, `--ease-*` |

---

## 7. Verification — End-to-End

After phase 28:

```bash
rtk pnpm typecheck
rtk pnpm lint
rtk pnpm build
rtk pnpm dev
# axe-cli or Chrome devtools axe on every route
# Lighthouse mobile (4x throttle) on /
```

Targets:
- Lighthouse mobile perf ≥ 88, a11y ≥ 95, SEO ≥ 95
- Landing JS ≤ 240 KB gz
- LCP ≤ 2.6s, CLS ≤ 0.05, INP ≤ 200ms
- axe = 0 violations every route
- Reduced-motion path: instant loader, no warp/dust/snap/audio
- Keyboard-only: every CTA reachable + amber focus

---

## 8. Out of Scope

- `inference.club` / `github.com/inference-club` URL swap
- Payload CMS integration
- Light mode / theme toggle
- i18n
- Analytics / third-party scripts
- New routes
- Palette token changes
