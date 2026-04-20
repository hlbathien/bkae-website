# Phase 24: project-detail

**Scope:** Polish the project detail page with Table of Contents, staggered tech stack animations, and a "Next Project" footer link with interactive previews.

**Files changed:**
- `src/app/projects/[slug]/page.tsx`
- `src/app/globals.css`

**Acceptance criteria:**
- ToCRail: ✅ (Added to the project detail page)
- Staggered tech tags: ✅ (Fade-up animation with incremental delays)
- Stat reveal: ✅ (CountUp used for project stats)
- Next project footer: ✅ (Link to next project with title, eyebrow, and amber glow hover effect)
- Section IDs: ✅ (problem, constraint, outcome, stack, stats IDs added for ToC)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Added a circular "next project" logic to the footer so it always points to another work.
- Moved `fade-up` keyframes to `globals.css`.

**Backlog items added:**
- None

**Time elapsed:** ~10 minutes
