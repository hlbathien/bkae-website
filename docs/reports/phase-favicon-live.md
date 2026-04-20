# Phase 30: favicon-live

**Scope:** Implement a dynamic browser tab favicon that reflects the user's scroll progress and provides subtle idle feedback.

**Files changed:**
- `src/components/chrome/LiveFavicon.tsx`
- `src/app/layout.tsx`

**Acceptance criteria:**
- Canvas rendering: ✅ (32x32 canvas renders dynamic icon)
- Scroll arc: ✅ (Amber arc completes as user scrolls)
- Idle pulse: ✅ (Subtle amber dot pulse after 5s of inactivity)
- Tab integration: ✅ (Favicon link dynamically updated via data URL)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Used a 100ms interval for updates to balance responsiveness with performance.
- Favicon updates are throttled if progress hasn't changed significantly and not in idle pulse state.

**Backlog items added:**
- None

**Time elapsed:** ~8 minutes
