# Phase 26: audio-opt-in

**Scope:** Implement an opt-in audio layer with WebAudio synthesized sounds for UI feedback (ticks and swooshes).

**Files changed:**
- `src/components/chrome/AudioToggle.tsx`
- `src/app/layout.tsx`

**Acceptance criteria:**
- Audio toggle: ✅ (Bottom-right button, persistent state in localStorage)
- Hover ticks: ✅ (Synthesized sine sweep on link/button hover)
- Swoosh sound: ✅ (Event-driven triangle sweep for transitions)
- Reduced-motion: ✅ (Audio disabled if reduced-motion is preferred)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Sounds are purely synthesized via WebAudio API to avoid asset loading overhead and potential licensing issues.
- Global event listeners `ae:audio-tick` and `ae:audio-swoosh` allow any component to trigger sounds.
- Auto-attach to standard interactive elements (a, button) via a global mouseover listener.

**Backlog items added:**
- None

**Time elapsed:** ~12 minutes
