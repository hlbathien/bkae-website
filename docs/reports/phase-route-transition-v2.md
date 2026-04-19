# Phase 5: route-transition-v2

**Scope:** Polish Next.js route transitions by implementing a 3-band diagonal wipe overlay, adding scroll-to-top routing logic with Lenis support, and incorporating aggressive `requestIdleCallback` prefetching for Next.js links.

**Files changed:**
- `src/components/chrome/PageTransition.tsx`
- `src/lib/prefetch.ts`
- `docs/SOURCE_OF_TRUTH.md`

**Acceptance criteria:**
- 3-band diagonal wipe works: ✅
- Scroll jumps to top smoothly on routing: ✅
- `initIdlePrefetch` added and deployed: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Applied native CSS `@keyframes` with `clip-path` interpolation to perform the diagonal sweep efficiently on the compositor thread. Fixed the initial ESLint warnings about `const` versus `let` and suppressed intentional transient overlay lifecycle `setState`.

**Backlog items added:**
- None

**Time elapsed:** ~10 minutes
