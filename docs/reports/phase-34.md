# Phase 34 — cms-wire-client-sections

## Scope
Server fetch wrapper + client interactive island for sections that previously imported mock cms inside "use client".

## Files
- src/components/sections/Projects.tsx (server, async)
- src/components/sections/ProjectsClient.tsx (new — client)
- src/components/sections/Stats.tsx (server, async)
- src/components/sections/StatsClient.tsx (new — client)
- src/components/sections/Process.tsx (server, async)
- src/components/sections/ProcessClient.tsx (new — client)
- src/components/sections/JournalPreview.tsx (server, async)
- src/components/sections/JournalPreviewClient.tsx (new — client)
- src/components/chrome/MarqueeBar.tsx (server, async)
- src/components/chrome/MarqueeBarClient.tsx (new — client)
- src/app/(marketing)/search/page.tsx (server, async)
- src/app/(marketing)/search/SearchClient.tsx (new — client)

## Acceptance
- typecheck: ✅
- build: ✅ (39 routes; landing remains async via wrappers)
- import boundary: no client component imports `@/lib/cms-server`
- existing GSAP / cursor / interactivity preserved verbatim in *Client.tsx

## Notes
- `(marketing)/page.tsx` already a server component; consumer API unchanged.
- `(marketing)/layout.tsx` mounts MarqueeBar; React Server Components rule allows server inside server, so no change.
- CTABands has no cms import — left alone (per audit). Hover-cover uses placeholder svgs for now.
