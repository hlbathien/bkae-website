# Phase 25 — SEO + dynamic OG

## Files changed
- payload.config.ts — `seoPlugin`, `redirectsPlugin`, `formBuilderPlugin`, `searchPlugin`, `nestedDocsPlugin` wired
- src/app/api/og/route.tsx (new) — edge runtime, 1200×630 ImageResponse w/ amber-on-ink template, `revalidate=3600`, accepts `?title=&kind=&eyebrow=`

## Acceptance
- tsc 0 ✅
- next build 0 ✅ — `/api/og` present
- `curl "localhost:3000/api/og?title=Test"` → 1200×630 PNG (verify runtime)

## Notes
`generateMetadata` hydration from Payload SEO fields deferred to phase 28 (new-routes) since dynamic public routes not yet importing `fetchX` server-side; existing routes use static mock data whose metadata blocks are already final.
