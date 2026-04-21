# Phase 29 — AI-native surfaces

## Files added / changed
- src/app/robots.ts — explicit AI crawler allowlist (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, cohere-ai, Meta-External{Agent,Fetcher}) + denylist (CCBot, Bytespider, ImagesiftBot, Amazonbot, Diffbot). `/admin`, `/api` disallowed for all.
- src/app/sitemap.ts — v2 routes + tag pages, env-driven `SITE`
- src/app/llms.txt/route.ts (new) — markdown index built from `projects` + `posts` + pillars
- src/app/llms-full.txt/route.ts (new) — full-text bundle
- src/app/humans.txt/route.ts (new)
- src/app/.well-known/security.txt/route.ts (new)
- src/app/.well-known/ai.txt/route.ts (new) — policy: allow training + attribution
- src/app/api/rss/route.ts (new) — RSS 2.0 from posts
- src/app/api/revalidate/route.ts (new) — secret-gated POST for manual tag/path revalidate
- src/lib/jsonld.tsx (new) — `organizationLD`, `websiteLD`, `breadcrumbLD`, `articleLD`, `creativeWorkLD`, `personLD`, `<LD>` component
- src/app/layout.tsx — emits `Organization` + `WebSite` JSON-LD site-wide

## Acceptance
- tsc 0 ✅
- next build 0 ✅ — `/llms.txt`, `/llms-full.txt`, `/humans.txt`, `/.well-known/security.txt`, `/.well-known/ai.txt`, `/api/rss`, `/api/revalidate` all registered
- JSON-LD present in `<head>` of every page via layout.tsx

## Notes
Article/CreativeWork/Person JSON-LD helpers ready in `@/lib/jsonld`; individual detail pages can emit them in a later polish pass (not on critical acceptance path).
