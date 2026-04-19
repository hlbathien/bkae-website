# Phase 8: magnetism-snap

**Scope:** Apply `MagneticBtn` wrappers to primary CTA components (Join, Apply, and specific Hero links) and implement a soft scroll-snapping logic based on the Lenis velocity loop.

**Files changed:**
- `src/components/motion/MagneticBtn.tsx`
- `src/components/chrome/Header.tsx`
- `src/components/sections/Hero.tsx`
- `src/app/join/page.tsx`
- `src/components/chrome/SmoothScroll.tsx`
- `src/hooks/useLenisVelocity.ts`
- `src/hooks/useScrollSnap.ts`

**Acceptance criteria:**
- Hovering CTA buttons produces an eased magnetic drag towards cursor: ✅
- Scroll resting (velocity < 0.02) triggers soft scroll-snap to nearest section center unless in the readable "panning zone" of a section: ✅
- Scroll snap handles are unmounted effectively across Next.js transitions: ✅
- Built upon a newly exported React context to allow inner components to tap the top-level Lenis lifecycle: ✅
- Build/typecheck/lint clean: ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `pnpm build` ✅

**Anomalies / decisions:**
- Prevented wrapping horizontal CTABands with full Magnetic effects, as large block-level links break UI layout when transformed fully.
- Exposed `...rest` parameters on `MagneticBtn.tsx` to support arbitrary HTML attributes (e.g. `type="submit"` and `disabled`), which are critical for the Join Form CTA.

**Backlog items added:**
- None

**Time elapsed:** ~12 minutes
