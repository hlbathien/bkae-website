# Phase 25: easter-eggs

**Scope:** Implement hidden interactive layers, console APIs, and visual easter eggs throughout the site.

**Files changed:**
- `src/components/chrome/GridOverlay.tsx`
- `src/app/layout.tsx`
- `src/components/chrome/Footer.tsx`
- `src/app/journal/[slug]/page.tsx`
- `src/components/motion/QwenPulse.tsx`
- `src/app/globals.css`

**Acceptance criteria:**
- Matrix mode: ✅ (Konami extension ↑↑↓↓←→←→ba triggers amber rain canvas)
- Console API: ✅ (window.__ae exposed with grid, trail, matrix, about, invert)
- ASCII view-source: ✅ (Small ASCII logo in layout <head> and Footer HTML comments)
- Qwen pulse: ✅ (One-shot amber pulse on /journal/qwen-hackathon)
- Triple-click footer: ✅ (Vertical scroll mode for footer wordmark triggered by 3 clicks on copyright)
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Created a separate `QwenPulse` client component to handle the animation end event, avoiding passing handlers to Server Components.
- "Invert mode" added as a utility class toggled via the console API.
- Esc key resets all easter egg visual modes.

**Backlog items added:**
- None

**Time elapsed:** ~15 minutes
