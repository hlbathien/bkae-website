# Agentic Engineering Identity

Agentic Engineering is an HCMUT student club for builders who treat AI-native software as an engineering discipline, not a prompt trick.

We are founded by two first-year students at Ho Chi Minh City University of Technology. Our proof point is shipped work: a multimodal journal-generation system that won 2nd place for Best Use of Qwen at GenAI Hackathon Vietnam 2025, and a patient-focused clinical handoff system built around deterministic extraction, traceable claims, bounded model use, and explicit refusal of unsupported conclusions.

## Thesis

AI systems become reliable when the model is bounded by contracts, deterministic pipelines, evaluation, traceability, and product judgment. We move fast, but the speed is in service of shipped systems that can be inspected, repeated, and trusted.

## Position

Agentic Engineering holds two ideas together:

- Vibe coding gives builders speed, taste, and iteration power.
- Engineering discipline turns that speed into systems that survive real use.

The club exists to make that synthesis normal at HCMUT: fast builders who can also reason about constraints, interfaces, data flow, safety boundaries, and deployment.

## Audience

- HCMUT students who want to ship useful AI-native products.
- Faculty and institutional partners who need the work to be serious and inspectable.
- External collaborators, sponsors, and frontier AI organizations looking for Vietnam's next generation of practical AI engineers.

## Near-Term Goals

- Recruit a founding cohort through the website.
- Publish open-source apps useful to HCMUT students.
- Document the engineering discipline through projects, essays, events, and public notes.
- Build credibility before workshops, sponsorship, and deeper external collaboration.

## Voice

- Institutional, not startup.
- Precise, not clever.
- Fast, but measured.
- Ambitious, without hype.
- Technical enough to earn trust.

Core line: `Bounded LLMs. Contract-based pipelines. Shipped systems.`

## Journie — Multimodal AI Journaling System

**Stack:** React 18, NestJS 10, Supabase, Qwen2.5-VL, Qwen-Plus, GPT-4o  
**Versions:** Vite 5, Zustand 4, Framer Motion 12.38, TypeScript 5, Vitest 3.2.4, Playwright 1.57  
**Award:** 2nd Place — Best Use of Qwen (LotusHacks 2026)  
**Deployment:** Vercel (serverless, maxDuration 60s), pnpm workspaces monorepo

### What It Does

Multimodal journaling platform: user captures images + voice + text daily → staged AI pipeline transforms inputs into personalized narrative journal entries with long-term memory.

### Pipeline Architecture (8 Stages)

Entry point: `POST /journal/generate` → `202 Accepted` immediately → async backend job

| Stage | What Happens |
|-------|-------------|
| 0 | Rate limit check: in-memory map, 3 attempts/user/date/day |
| 1 | Upsert `journal_entries` row with `status='generating'` |
| 2 | Parallel context fetch: `Promise.all([persona, moments, recentJournals, memories, editDiffs])` |
| 3 | Sign photo URLs (1-hour Supabase signed URLs, fallback to stored `photo_url`) |
| 4 | **TAGS** — Qwen2.5 Flash: ≤5 tags per moment `{tag, category, confidence: 0–1}`, 10 categories |
| 5 | **WRITER** — Qwen Plus: temp=0.8, max_tokens=2000, multimodal input (detail='low'), structured output |
| 6 | Persist draft: `content`, `daily_achievement`, `best_photo_url`, `status='draft'` |
| 7 | Insert `daily_insights` (JSONB) |
| 8 | **MEMORY** (non-blocking): gating prompt (Qwen Plus, temp=0.2) → dedup → evict if >200 cap |

### AI Model Routing (Dual-Client Architecture)

```
DashScope key present:
  tags task     → Qwen2.5-VL Flash (qwen2.5-vl-3b-instruct, configurable)
  writer task   → Qwen Plus (qwen-plus-latest, configurable)
  memory task   → Qwen Plus

No DashScope (or error-disabled):
  all tasks     → GPT-4o via OpenAI SDK 4

Both unavailable:
  deterministic fallback generation (no hard crash)
```

**Writer output format:**
- Markdown narrative (200–500 words)
- `<daily_achievement>` (≤10 words)
- `<best_photo>` (photo ID)
- `<Insights>` (CONFIRMED/UNCONFIRMED, hidden from user)

### Memory System

- Table: `user_memories` — `{category, fact (max 500 chars), confidence (0–1), source_date, expires_at}`
- Unique index on `(user_id, md5(fact))` — automatic deduplication
- Cap: 200 per user; eviction = lowest-confidence deleted first
- Categories: preference, relationship, routine, identity, voice
- Injected into Writer's system prompt on every generation
- Pipeline: Writer produces insights → memory gating filters `confirmed=true` → Qwen Plus evaluates → dedup insert → evict

### Backend Capabilities

- NestJS 10 REST API, all routes auth-guarded (Supabase JWT)
- 13 endpoints: persona (2), moments (5), transcribe (1), journal (4), health (1)
- File upload: 10 MB max, MIME: jpeg/png/webp/heic, cap 10 images/generation (free tier)
- API timeout: 30s (AbortController on client)
- Vercel API handler: `api/[[...route]].ts` (NestJS wrapped in Express)

### Frontend System Design

- Route tree: `/auth` → `/auth/resolver` → `/onboarding` (5-step) → `/home` → `/timeline` → `/journal/:date` → `/journals`
- Zustand global state: `userId, displayName, isOnline, todayMomentsDate, todayMoments` (date-validated cache), `currentAura` (hex from last mood)
- Polling: 2s interval, 90s timeout, max 3 consecutive errors → stable fallback content
- Session retry: 20 attempts, 150ms delay
- Vite code splitting: framework / motion / supabase / markdown / ui-vendor chunks
- Animations: Framer Motion 12 LazyMotion, respects `prefers-reduced-motion`
- Offline-aware: checks `isOnline` before destructive actions
- Camera-first UX: `getUserMedia` hero, square JPEG capture

### Testing Infrastructure

- Unit/component: Vitest 3.2.4 + React Testing Library (jsdom)
- E2E: Playwright 1.57 — 4 projects: mock-mobile, mock-desktop-chromium, mock-desktop-firefox, integration-chromium

### Key Engineering Decisions

- Async pipeline + optimistic nav → no blocking on generation (can take 10–30s)
- Multi-model routing → no single LLM dependency; graceful degradation to deterministic
- Separation: Supabase handles auth only; all app data through NestJS API layer
- Non-blocking memory stage → generation never fails due to memory processing
- Rate limiting in-memory (per process) — acknowledged tradeoff: resets on restart

### Impact Signals

- Award-winning (hackathon top placement, competitive Qwen use case)
- Full production-grade system: auth, file storage, async jobs, polling recovery, fallback states
- Demonstrates multimodal context fusion + long-term personalization in single product
- Clean separation of concerns across 5 layers: auth / storage / API / AI / client

---
## Elfie Lab Analyzer — Clinical Lab Report Processing System

**Stack:** Python 3.11, FastAPI 0.115+, React 19 (Vite), PostgreSQL 15  
**Versions:** SQLAlchemy 2.0+, asyncpg, Pydantic 2.7+, pdfplumber, PyMuPDF, magic-pdf (Mineru OCR)
**Achievements:** Finalist (Top 7) at Firstever Qwen AI Build Day's Healthcare Track

### What It Does

Automated clinical laboratory report processing: PDF ingestion → standardized analyte extraction → LOINC mapping → unit normalization → clinical rule evaluation → severity classification → actionable outputs with full lineage tracking.

### 11-Stage Deterministic Pipeline

| Stage | Name | What Happens |
|-------|------|-------------|
| 1 | Extract | PDF → raw analytes via Mineru OCR / pdfplumber / PyMuPDF |
| 2 | Observe | Raw text → structured observations |
| 3 | Map | Deterministic LOINC alias matching (LRU cache: 4096) |
| 4 | Convert | UCUM unit canonicalization + mass↔molar conversion |
| 5 | Panel Group | Analytes grouped into clinical panels |
| 6 | Fire Rules | JSON-configured threshold evaluation |
| 7 | Severity | Severity gradient assignment |
| 8 | NextStep | Clinical action recommendation |
| 9–10 | Render | Report artifact generation |
| 11 | Persist Lineage | Full reproducibility record |

### Core Services

**AnalyteResolver:** Deterministic LOINC alias matching, LRU cache (4096 entries), no fuzzy matching — correctness over recall

**UcumEngine:** Unit canonicalization + mass↔molar conversion (e.g. glucose MW: 180.156 g/mol)

**RuleEngine:** Threshold evaluation with severity gradients:
- 1.0–1.2× ref → Severity 1 (mild)
- 2.0×+ ref → Severity 4 (critical)
- JSON-configured — all clinical logic is externalized, not hardcoded

**SeverityPolicyEngine:**
- Age < 18 → SX severity override
- Critical value gating: requires explicit sign-off before proceeding

**LineageLogger:** Records source checksum, all service versions, build commit — full reproducibility per report

### AI Usage (Deliberate Constraint)

Qwen API (DashScope) used **post-pipeline only**, for narrative generation. All clinical decisions (LOINC mapping, unit conversion, rule firing, severity classification) are deterministic and configuration-driven. No ML in the decision path — correctness and auditability over flexibility.

### Performance

| Stage | Latency |
|-------|---------|
| Extract (OCR) | 200–500ms/page |
| Normalize | 50–150ms |
| Rules | 20–80ms |

### Database (12 ORM Tables)

Full lineage tracking: source documents, extracted analytes, LOINC mappings, conversions, rule evaluations, severity assignments, rendered artifacts, audit log

### Impact Signals

- Production-appropriate safety design: deterministic clinical logic, no model in decision path
- Full lineage/reproducibility tracking — auditable for regulated environments
- Demonstrates systems thinking: separation of extraction (uncertain) from reasoning (deterministic)
- LRU caching, async FastAPI, streaming PDF processing — performance-conscious implementation
