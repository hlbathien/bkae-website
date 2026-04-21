# Phase 31 — Adversarial review remediation

## P0 blockers (fixed)

1. **PAYLOAD_SECRET fallback** (payload.config.ts) — now throws in `NODE_ENV=production` unless env is set; soft during `NEXT_PHASE=phase-production-build` to permit CI builds without secrets.
2. **Preview auth** (src/app/api/preview/route.ts) — timing-safe compare via `safeEqual` from `@/lib/crypto`; slug/collection validation (`isSafeSlug`, allowlist); supports header `x-preview-secret` in addition to query param; accepts POST.
3. **Revalidate endpoint** (src/app/api/revalidate/route.ts) — secret moved to `x-revalidate-secret` header; timing-safe compare; no querystring secret.
4. **Exit preview** (src/app/api/preview/exit/route.ts) — POST supported; Link uses `prefetch={false}`.
5. **cms-server silent fallback** — errors logged with `[cms-server]` prefix so ops see fallback.
6. **Media read-access** — gated by `public:true` field; internal PDFs no longer leak.

## P1 (fixed)

7. **Revalidation correctness** — empty basePath (Pages) handled with `revalidatePath("/", "layout")`. `revalidateTag("tag", "max")` retained (Next 16 requires 2 args).
8. **robots.ts** — `/api/og`, `/api/rss` whitelisted for all crawlers (social unfurl works); each AI UA explicitly repeats the `PRIVATE` disallow list (most-specific-UA rule no longer leaves `/admin` open).
9. **Redirects plugin** — disabled in `payload.config.ts` until middleware is wired; comment documents re-enablement path.
10. **Images allowlist** — `next.config.ts` `remotePatterns` reduced from `**` open proxy to Supabase/R2/CloudFront/GitHub avatars.
11. **Docker bind** — `127.0.0.1:5432` and `127.0.0.1:8080` (no 0.0.0.0 exposure).
12. **Sitemap** — now async, driven by `cms-server.ts`; slugs `encodeURIComponent`-encoded.
13. **JSON-LD XSS guard** — `safeJson()` escapes `<`, `>`, `&`, U+2028, U+2029.
14. **Join PII** — logs per-applicant SHA-256 fingerprint only; in-memory per-IP rate limit (5/min); 429 on overflow.
15. **DraftBanner layout** — added 32px top spacer so header isn't pushed under the banner.
16. **Print CSS** — selectors now target `header`/`nav`/`footer`/`role=banner`/`role=contentinfo` instead of the missing `[data-chrome]`.
17. **OG response** — proper cache headers (`s-maxage=86400, swr=604800`).

## Acceptance

- `pnpm typecheck` → 0 ✅
- `pnpm exec next build` → 0 ✅
- Build warnings remaining:
  - "Custom Cache-Control headers detected for /_next/static" — existing warning, pre-existing config.
  - `⨯ turbopackServerFastRefresh` — pre-existing experimental flag.

## Left as P2 (documented, not blocking)

- OG font swap to Instrument Serif — requires woff subset asset, ship-follow.
- Search page catalog drift vs Payload — acceptable v2, move to server render post-launch.
- Redirects plugin wire-up — requires `src/middleware.ts`, defer until editor needs it.
- Form builder email adapter — disable-or-configure before form submissions go live.
- ai.txt spec status — docs updated (Phase 29 report already calls out nascent status).
- Seed type strictness — switch `as never` to generated `payload-types.ts` after first `pnpm generate:types` against live DB.
