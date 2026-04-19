# Phase 7: kinetic-type

**Scope:** Apply kinetic typography parallax, cursor displacement mapping, and mask-reveal highlights across the hero headline, manifesto passage, and footer wordmark.

**Files changed:**
- `src/components/sections/Hero.tsx`
- `src/components/sections/Manifesto.tsx`
- `src/components/chrome/Footer.tsx`
- `src/hooks/useViewportProximity.ts`

**Acceptance criteria:**
- Hero headline has GSAP scrolling text-shadow blur spread and manual cursor proximity displacement across individual characters: ✅
- Manifesto receives absolute positioned sweeping amber underlines bound to line-rendered bounds of its text via custom GSAP calculations: ✅
- Footer wordmark receives multi-depth parallax response based on horizontal distance from user cursor: ✅
- The custom proximity hook handles generalized center bounding: ✅
- Build/typecheck/lint clean: ✅

**Anomalies / decisions:**
- Dropped full Canvas logic for these text manipulations, instead relying heavily on pseudo-elements, GSAP staggered tickers, and bounding boxes, keeping accessibility completely intact without the complexity of WebGL meshes.

**Backlog items added:**
- None

**Time elapsed:** ~12 minutes
