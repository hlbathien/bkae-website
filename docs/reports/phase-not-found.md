# Phase 21: not-found

**Scope:** Implement custom 404 (Not Found) and 500 (Error) pages with kinetic typography and site-consistent styling.

**Files changed:**
- `src/app/not-found.tsx`
- `src/app/error.tsx`

**Acceptance criteria:**
- Kinetic 404: ✅ (letter-spacing scrubs on mouse move)
- Quote included: ✅ ("Unsupported claims return uncertainty, not prose.")
- 500 Error boundary: ✅ (matching style with reset capability)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Used GSAP for the 404 letter-spacing scrub to ensure smooth interpolation.
- Error page includes a "Attempt reset" button using the Next.js `reset` prop.

**Backlog items added:**
- None

**Time elapsed:** ~8 minutes
