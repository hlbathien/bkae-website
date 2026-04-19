# Phase 4: loader-v2

**Scope:** Replace the 1-stage intro with a 4-stage intro loader (hairline -> LogoMark -> Agentic Engineering wordmark -> counter & 4-panel curtain). Handle `ae:visit-count` state to shorten intro on returning visits. 

**Files changed:**
- `src/components/chrome/PageTransition.tsx`
- `docs/SOURCE_OF_TRUTH.md`

**Acceptance criteria:**
- Loading routine implemented (full load vs quick hairline load depending on visit-count): ✅
- Route-overlay intact: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Rewrote `PageTransition.tsx` using GSAP timeline hooked to `useLayoutEffect` to smoothly choreograph the 4 stages. 
- Integrated `ae:visit-count` tracking inline with reduced-motion defaults.
- Used ESLint fixes where `setState` occurs intentionally inside lifecycle triggers.

**Backlog items added:**
- None

**Time elapsed:** ~15 minutes
