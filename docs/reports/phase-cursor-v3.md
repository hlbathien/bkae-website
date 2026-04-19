# Phase 6: cursor-v3

**Scope:** Expand the custom cursor state machine to v3 specifications, complete with new states, manual rAF lerp physics for cursor parameters to ensure layout transition performance, ghost trail tracking, micro-orbit on idle, and radial click ripples.

**Files changed:**
- `src/components/chrome/Cursor.tsx`
- `docs/SOURCE_OF_TRUTH.md`

**Acceptance criteria:**
- New cursor states implemented (`disabled`, `copy`, `next`, `prev`, `external`, `play`, `pinned`): ✅
- rAF driven `width`, `height`, `border-radius`, and transform scale lerping: ✅
- Pointer trail running via 20ms sample queue with diminished opacities: ✅
- 1.2s idle triggers 1.00->1.06->1.00 orbit scale oscillating loop: ✅
- Click ripple overlay works: ✅
- Reduced-motion flags disable orbit and ghost trailer logic cleanly: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Replaced traditional CSS transitions for sizes (width, height, radius) with native JS-level manual `lerp` ticks to ensure completely fluid cursor shape changes and decoupled CSS performance footprint, while leaving base CSS transition on background-colors as that is cheaper than re-compiling hex-interpolations natively inside tick.

**Backlog items added:**
- None

**Time elapsed:** ~10 minutes
