# Phase 20 — Docker Postgres

## Files changed
- docker-compose.yml (new) — postgres:16-alpine + adminer
- .env.example (rewrite) — DATABASE_URI, PAYLOAD_SECRET, PREVIEW_SECRET, S3_* keys, Supabase swap comment

## Acceptance
- docker-compose.yml present ✅
- .env.example has DATABASE_URI, PAYLOAD_SECRET, PREVIEW_SECRET, NEXT_PUBLIC_SITE_URL, S3_* ✅
- `docker compose up -d` — ⚠ Docker Desktop engine was not running at time of verification. Compose file is syntactically valid (`services.db.healthcheck` uses `pg_isready`). Re-run after Docker Desktop start:
  ```
  docker compose up -d
  docker compose ps  # db should be "healthy"
  ```
- Adminer UI: http://localhost:8080 (system=PostgreSQL, server=db, user=payload, password=payload, db=bkae).

## Supabase swap path
Replace `DATABASE_URI` with pooler string (pgbouncer=true, port 6543). `pnpm migrate` on first deploy. Storage creds map to Supabase S3-compat endpoint.
