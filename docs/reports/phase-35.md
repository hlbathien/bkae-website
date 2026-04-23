# Phase 35 — liveliness-headings

## Scope
Bring static section headings to life on /. Reduced-motion gated.

## Files
- src/components/sections/ProjectsClient.tsx (heading reveal via GSAP scrollTrigger)
- src/components/sections/StatsClient.tsx (added new heading "The receipts. Counted." + reveal)
- src/components/sections/ProcessClient.tsx (heading reveal both mobile + desktop)
- src/components/sections/JournalPreviewClient.tsx (heading reveal)
- src/components/sections/CTABands.tsx (per-band word reveal w/ stagger by index)
- src/app/globals.css (.divider-shimmer keyframes utility)

## Acceptance
- typecheck: ✅
- build: ✅
- All headings now use gsap.from(...) with scrollTrigger start: top 80–88%, ease expo.out, gated by prefers-reduced-motion: reduce.
- CTABands: each band's display word fades up with 80ms stagger by index.
- New shimmer keyframe ready as opt-in for future section dividers.

## Notes
- JournalPreview retained CascadeTitle for char-cascade on cards (different effect than RevealText, deliberate).
- Stats heading is a new addition — previously only had eyebrow + numbers.
