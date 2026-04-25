# Website Copy — Agentic Engineering

Complete copy inventory for every page and section. Ready for code paste.
Voice: impactful, assertive, friendly, relatable. Technical authority without pretension.
Mentality: "You can just build things" and "Clone any SaaS."
Inspirations: Andrej Karpathy, Boris Cherny, Alexander Wang, OpenAI Codex, Anthropic.

---

## Media Reference

Images in `/media/` and their intended use:

| File | Description | Suggested Use |
|------|-------------|---------------|
| `SON03343.JPG` | Qwen AI Build Day — full venue group photo, hundreds of participants | Events hero, About page, proof of scale |
| `SON03571.JPG` | Founders + teammate at hackathon table, laptops open, mid-discussion | About page, team section, "in the field" shot |
| `SON05955.JPG` | Both founders side by side on bleachers with laptops, hacking | Founder profiles, hero secondary, journal covers |
| `SON06417.JPG` | Founders presenting/discussing with a group at hackathon venue, standing | About page, events, "builders in motion" |
| `SON07399.JPG` | Award ceremony stage — "Best Use of Qwen: 2nd Journie" on screen, winners posing | Proof point hero, press kit, recognition page |
| `29548a3b-...jpg` | Both founders with Qwen mascot at AI Build Day backdrop | Fun/personality shot, about page, social |
| `652749208-...jpg` | Three people at LotusHacks 2026 backdrop, thumbs up | Hackathon proof, events, journal |
| `92e5dcae-...jpg` | Founder (Tan) speaking into microphone, dramatic low-angle | Founder profile, press kit, manifesto page |

---

## Table of Contents

1. [Home — Hero](#home--hero)
2. [Home — Manifesto Section](#home--manifesto-section)
3. [Home — Projects Section](#home--projects-section)
4. [Home — Process Section](#home--process-section)
5. [Home — Stats Section](#home--stats-section)
6. [Home — Journal Preview](#home--journal-preview)
7. [Home — CTA Bands](#home--cta-bands)
8. [Marquee Announcements](#marquee-announcements)
9. [About Page](#about-page)
10. [Founder: Hoang Le Ba Thien](#founder-hoang-le-ba-thien)
11. [Founder: Le Thanh Tan](#founder-le-thanh-tan)
12. [Manifesto Page (Standalone)](#manifesto-page-standalone)
13. [Join Page](#join-page)
14. [Projects Page (Index)](#projects-page-index)
15. [Project: Lumen Journal](#project-lumen-journal)
16. [Project: Atlas Clinical](#project-atlas-clinical)
17. [Journal Page (Index)](#journal-page-index)
18. [Journal: Bounded LLMs, Unbounded Systems](#journal-bounded-llms-unbounded-systems)
19. [Journal: Vibe Coding Is Not the Opposite of Discipline](#journal-vibe-coding-is-not-the-opposite-of-discipline)
20. [Journal: How a Pipeline Won a Hackathon](#journal-how-a-pipeline-won-a-hackathon)
21. [Events Page](#events-page)
22. [Press Kit](#press-kit)
23. [Uses Page](#uses-page)
24. [Changelog](#changelog)
25. [Lab Page (Coming Soon)](#lab-page-coming-soon)
26. [Colophon Page (New)](#colophon-page-new)
27. [Principles Page (New)](#principles-page-new)
28. [Recognition Page (New)](#recognition-page-new)
29. [404 Page](#404-page)
30. [Error Page](#error-page)
31. [Footer](#footer)
32. [SEO Metadata](#seo-metadata)

---

## Home — Hero

**Eyebrow:** `Agentic Engineering · HCMUT · Founded 2026`

**Headline:**
```
AGENTIC engineering FOR THE INEVITABLE.
```

**Keyword bar:**
```
Data first · Bounded LLMs · Shipped systems
```

**CTA Primary:** `Apply — founding cohort →`
**CTA Secondary:** `View shipped work →`
**Anchor link:** `The thesis ↓`

**Ghost marquee keywords:**
```
VIBE CODING · DETERMINISTIC · BOUNDED · SHIP · MEASURE · TRACEABLE · REFUSABLE ·
```

> **Notes:** Headline unchanged — already strong. "FOR THE INEVITABLE" carries Karpathy-level confidence. The keyword bar below the headline acts as a trust strip. No subheadline needed — let the WebGL blob and RevealText do the emotional work.

---

## Home — Manifesto Section

**Section eyebrow:** `01 · Thesis`

**Pull quote:**
```
Bounded models. Contract-based pipelines. Shipped systems.
```

**Intro paragraph (above pillars):**
```
We are not here to demo. We are here to define the engineering practice
that AI-native software demands — and ship it before the textbooks catch up.
```

**Pillar 01 — Bounded**
```
Title: Bounded
Body: Every model has a contract. Inputs have shape. Outputs have schema.
Nothing leaks past the boundary. If we can't define what goes in and what
comes out, we don't ship it.
```

**Pillar 02 — Deterministic edges**
```
Title: Deterministic edges
Body: Classifiers, extractors, validators — these are pure functions.
The LLM lives inside. The pipeline around it is reproducible or it is
theater. We don't tolerate flaky systems dressed up as intelligence.
```

**Pillar 03 — Refusable**
```
Title: Refusable
Body: Unsupported claims return uncertainty, not prose. Silence is a
feature. A system that says "I don't know" is the only one worth trusting
with decisions that matter.
```

---

## Home — Projects Section

**Section eyebrow:** `02 · Evidence`

### Project 01 — Lumen

**Eyebrow:** `01 / Project`
**Title:** `Lumen — Multimodal Journal Engine`
**Problem:**
```
Personal journals lose context across modalities — photos, voice, and text
live in silos. Nobody builds the pipeline that fuses them into one coherent
narrative with long-term memory.
```
**Constraint:**
```
Async pipeline only. Bounded LLM scope. Pure functions for tags and memory
I/O. No blocking on generation — the user never waits.
```
**Outcome:**
```
2nd place — Best Use of Qwen at LotusHacks 2026. Vietnam's largest GenAI
hackathon. 1,500+ participants. Built in 36 hours.
```
**Stack:** `Qwen-VL · NestJS · Supabase · React 18 · Framer Motion`
**Stats:**
- `2` — Hackathon placing
- `1,500+` — Participants
- `8` — Pipeline stages
- `36` — Hours to ship

### Project 02 — Atlas

**Eyebrow:** `02 / Project`
**Title:** `Atlas — Traceable Clinical Handoff`
**Problem:**
```
Patients get lab PDFs. Doctors get noise. Nobody gets traceable, cited
summaries they can actually trust for clinical decisions.
```
**Constraint:**
```
Deterministic contract pipeline. LLM confined to bounded explanation only.
Refuses unsupported claims. Every output traces back to a source document
or it doesn't ship.
```
**Outcome:**
```
Finalist (Top 7) at Qwen AI Build Day Healthcare Track.
11-stage deterministic pipeline. Zero hallucinated metrics shipped.
```
**Stack:** `Qwen · FastAPI · Pydantic · PostgreSQL · PyMuPDF`
**Stats:**
- `11` — Pipeline stages
- `100%` — Citations traceable
- `0` — Hallucinated metrics shipped
- `7` — Top finalist

---

## Home — Process Section

**Section eyebrow:** `03 · The pipeline`

**Process nodes (horizontal carousel):**

| Stage | Label | Description |
|-------|-------|-------------|
| 01 | Input | Photos, voice, text, clinical PDFs — raw signal enters the system |
| 02 | Tags | Pure-function classifier. No LLM. Deterministic extraction |
| 03 | Writer | Bounded LLM with contract I/O. Defined inputs, defined outputs |
| 04 | Memory | Long-term store. Episodic, categorized, capped, deduplicated |
| 05 | Output | Traceable, cited, refusable. Every claim links to a source or stays silent |

---

## Home — Stats Section

**Section heading:** `The receipts.` *Counted.*

| Value | Suffix | Label |
|-------|--------|-------|
| 2 | | Hackathon placings |
| 1,500 | + | Competitors faced |
| 2 | | Production systems shipped |
| 1 | | Discipline being defined |

---

## Home — Journal Preview

**Section eyebrow:** `05 · Journal`
**Section heading:** `Field notes from` *shipped work.*

*(Uses existing post data — see Journal section below for updated post copy)*

---

## Home — CTA Bands

**Band 1:** `Apply to the founding cohort` → `/join`
**Band 2:** `Read the engineering journal` → `/journal`
**Band 3:** `View shipped work` → `/projects`

---

## Marquee Announcements

```
1. "2nd place — Best Use of Qwen, LotusHacks 2026" → /journal/qwen-hackathon
2. "Founding cohort applications now open" → /join
3. "New essay — Bounded LLMs, Unbounded Systems" → /journal/bounded-llms
4. "Finalist — Qwen AI Build Day Healthcare Track" → /journal
```

---

## About Page

**Metadata:**
- Title: `About`
- Description: `Two first-year HCMUT students building the engineering discipline AI-native software demands. Shipped systems, not slides.`

**Eyebrow:** `[ About · Who ]`

**Headline:**
```
Two students.
One discipline.
```
("One" in amber serif italic)

**Intro paragraph:**
```
We started Agentic Engineering at HCMUT because we got tired of waiting
for someone to build what we wanted to use. The AI-native era doesn't need
more tutorials or Twitter threads. It needs people who ship real systems
and refuse to fake what they can't prove.

We're first-year Computer Science students. We won a national hackathon
before finishing our first semester. We built a clinical data pipeline
that actual doctors tested. We are nowhere close to done.

We grew up watching Andrej Karpathy teach himself everything on YouTube and
then teach the rest of us. We watched Alexander Wang build Scale AI at 19.
We read Boris Cherny's Programming TypeScript and realized that type
systems aren't boring — they're how you build things that don't break.
We use Claude Code and Cursor the way the Codex team intended: not to
replace engineering, but to move faster within contracts.

The question we kept coming back to: what would it look like if AI
engineering had the same rigor as mechanical engineering? Not the hype.
Not the conference demos. The actual discipline.

That's what we're building. Come help.
```

### Timeline

| When | What |
|------|------|
| `2025 · Q4` | Founded at HCMUT. Two students, one thesis: shipped systems over slides |
| `2026 · Q1` | Lumen Journal — 2nd place, Best Use of Qwen at LotusHacks 2026 (1,500+ participants) |
| `2026 · Q1` | Atlas Clinical — Finalist at Qwen AI Build Day Healthcare Track. 3 clinicians piloted |
| `2026 · Q2` | Founding cohort applications open. This website ships |

### Founders Section

**Eyebrow:** `[ Founders ]`

*(Each founder links to `/about/members/[slug]` — see individual bios below)*

---

## Founder: Hoang Le Ba Thien

**Slug:** `thien-hoang`
**Role:** `Co-founder · Systems & Infrastructure`

**Bio (short, for card):**
```
Pipelines, quantitative systems, and the boring parts that make the magic
reproducible. Built production ML at scale before most people finish their
first semester.
```

**Bio (full, for member detail page):**
```
Thien builds the systems that other people's models run on.

He wrote a quantitative ML trading pipeline that processes 500K ticks in
under 4 seconds. Numba JIT, Polars streaming, fractional differentiation.
The kind of code that makes Pandas OOM on 16 GB RAM. Then he brought
that same performance mindset to clinical data and co-built Atlas: 11
deterministic pipeline stages for lab report processing. Every clinical
decision runs through pure functions. No model in the decision path.
Full lineage tracking. A severity engine that won't proceed without
explicit sign-off on critical values.

On Kaggle (Jigsaw competition), he placed Top 15% out of 2,445 teams
with a 5-branch ensemble: DeBERTa, DistilRoBERTa, Qwen embeddings, and
a 14B Qwen LLM running 4-bit GPTQ with vLLM tensor parallelism. He
also built security into the ML pipeline: path traversal guards, prompt
injection mitigation, probability validation. Because production ML
that isn't secure isn't production ML.

His take: if your pipeline isn't deterministic at the edges, it's not a
pipeline. It's a prayer. He handles contracts, schemas, Numba kernels,
and the infrastructure that keeps things running at 2 AM with nobody
watching.

CS at HCMUT. Neovim.
```

**Links:** `{ github: "https://github.com/" }`

**Suggested image:** `SON05955.JPG` (hacking on laptop at hackathon)

---

## Founder: Le Thanh Tan

**Slug:** `tan-le`
**Role:** `Co-founder · AI Systems & Product`

**Bio (short, for card):**
```
Multimodal AI products, LLM orchestration, and the conviction that if
something exists as a SaaS, you can build it yourself — better.
```

**Bio (full, for member detail page):**
```
Tan builds AI products that people use. Not demos. Products.

Journie is his: a multimodal AI journaling system that chains Qwen Flash,
Qwen Plus, and GPT-4o through 8 async pipeline stages. Long-term memory.
Optimistic polling. Graceful degradation across three model providers. It
took 2nd place for Best Use of Qwen at LotusHacks 2026 — Vietnam's
largest GenAI hackathon, 1,500+ participants, 36 hours start to finish.

Before that he led CivicTech, a full-stack urban reporting platform
(React 19, Node.js, MongoDB, Leaflet) that collected 120+ community
reports in three months. He does research at HCMUT's EE Machine Learning
& IoT Lab, building production MCP servers with TypeScript SDK and
OAuth 2.0. He also fine-tuned T5 for summarization and QA over 100+
Vietnamese legal documents. He just builds things.

His philosophy is simple: if it exists as a SaaS product, you can clone
it. If it exists as a paper, you can implement it. If nobody's solving
the problem, ship the solution before the semester ends. He doesn't wait
for permission or a bigger team. He opens his laptop.

First-year CS at HCMUT, 3.9 GPA, IELTS 8.0. Graduated from VNU-HCM
High School for the Gifted with a 9.4. Cursor and Claude Code.

Outside of building: HR manager at K.C Education, volunteer tutor at a
local orphanage, and always figuring out what to ship next.
```

**Links:** `{ github: "https://github.com/" }`

**Suggested images:**
- `92e5dcae-...jpg` (speaking with microphone — dramatic, confident)
- `29548a3b-...jpg` (with Qwen mascot — personality)

---

## Manifesto Page (Standalone)

**Metadata:**
- Title: `Manifesto`
- Description: `The engineering principles behind Agentic Engineering. Bounded LLMs. Deterministic edges. Surface uncertainty. Ship to learn.`

**Eyebrow:** `[ Manifesto · Full ]`

**Headline:**
```
The
discipline
we owe.
```
("discipline" in amber serif italic)

**Intro paragraph (NEW — add above pillars):**
```
Everyone talks about AI. We're writing the engineering manual.

These four principles aren't aspirational. They're the constraints we
ship under. We think AI-native software deserves the same rigor that
built compilers and operating systems. Not because rigor is fashionable,
but because people's data and health depend on systems that work exactly
as documented.

We don't have decades of experience. We have shipped systems that prove
these ideas work. That's the only authority we need.
```

### Pillar 01 — Bounded LLMs

```
Confine the model to the smallest surface that still produces value. Define
the contract: what goes in, what comes out, what gets refused. If you can't
draw the boundary, you can't ship the system.

Andrej Karpathy talks about LLMs as a "new kind of computer." We agree.
And like every computer before it, the useful ones have well-defined I/O.
Unbounded AI is a research demo. Bounded AI is a product.
```

### Pillar 02 — Deterministic edges

```
The LLM is probabilistic. Everything around it must not be. Classifiers,
extractors, validators, routers — pure functions with predictable outputs.
Test them. Cache them. Trust them.

Pipelines are reproducible or they are theater. We don't tolerate flaky
systems dressed up as intelligence. If your tags stage produces different
results on the same input, that's not a feature — it's a bug.
```

### Pillar 03 — Surface uncertainty

```
Calibration over confidence. When the system doesn't know, it says so.
Unsupported claims return uncertainty, not prose. Silence is a feature.

In Atlas, our clinical pipeline, a refused output is the correct output.
We built a system that doctors can trust because it refuses to guess.
A confident wrong answer is worse than silence. We'd rather ship silence.
```

### Pillar 04 — Ship to learn

```
Deploy small. Instrument everything. Iterate against real usage. Velocity
with judgment.

We don't wait for permission or perfect conditions. Journie was built in
36 hours. Atlas was tested by real clinicians in its first week. This
website was built by two first-year students using Claude Code, GSAP, and
a refusal to accept "student project" as a ceiling.

You can just build things. And you learn more from shipping one real system
than from reading a hundred tutorials.
```

---

## Join Page

**Eyebrow:** `[ Founding cohort ]`

**Headline:**
```
Apply.
Or build alone.
```
("Or build alone." in amber serif italic)

**Intro paragraph:**
```
We're assembling the founding cohort of Agentic Engineering at HCMUT.
This isn't a course, a study group, or a club that meets once a month to
watch YouTube videos. This is a team that ships.

You should apply if you've built something — anything — that works. A bot,
a pipeline, a scraper, a full-stack app, a Kaggle submission, a CLI tool
you wrote because the existing one annoyed you. We don't care about your
GPA. We care about your git log.

Tell us what you shipped, what you want to ship next, and why you want to
build it here instead of alone.
```

**Form labels (unchanged):**
- Full name
- HCMUT email
- Year / Major
- What have you shipped?

**Submit button:** `Submit application →`
**Loading state:** `Processing discipline...`

**Success state:**
- Eyebrow: `Application Received`
- Message: `We'll be in touch within 7 days.`
- Receipt ID: `AE-2026-XXXX`
- Return link: `Back to terminal`

---

## Projects Page (Index)

**Metadata:**
- Title: `Projects`
- Description: `Shipped systems with bounded LLMs, deterministic pipelines, and traceable outputs. Not demos — deployed.`

**Eyebrow:** `[ Projects · Shipped ]`

**Headline:**
```
What we
shipped.
```
("shipped" in amber serif italic)

**Intro paragraph (NEW — add above project list):**
```
Every project here runs. Not "almost works." Not "demo-ready." These
are systems with contracts, tests, and people using them. We open-source
them so you can read the code, not just the marketing.
```

---

## Project: Lumen Journal

**Metadata:**
- Title: `Lumen — Multimodal Journal Engine`
- Description: `Award-winning multimodal AI journaling system. 8-stage async pipeline. 2nd place, Best Use of Qwen at LotusHacks 2026.`

**Hero eyebrow:** `01 / Lumen Journal`

**Problem section:**
```
Personal journals are broken. Photos live in your camera roll. Voice notes
live in a recording app. Text lives in Notes. Nobody builds the system
that fuses them into one coherent, personalized narrative — with long-term
memory that actually learns who you are.

We built that system in 36 hours.
```

**Constraint section:**
```
The pipeline is async from the first request. When you hit "generate,"
the server returns 202 Accepted immediately — you never wait. Tags
are extracted by a pure-function classifier (Qwen Flash). The writer
(Qwen Plus) operates under a strict contract: markdown narrative, daily
achievement, best photo selection, and hidden insights. Memory is
non-blocking — generation never fails because the memory stage is slow.

Three model providers. Graceful degradation. If DashScope goes down,
GPT-4o takes over. If that fails, deterministic fallback content. No
hard crashes. The user always gets their journal.
```

**Outcome section:**
```
2nd place — Best Use of Qwen at LotusHacks 2026. Vietnam's largest GenAI
hackathon, co-hosted by HackHarvard and GenAI Fund. 1,500+ participants.
Built from zero to deployed in 36 hours.

Full production-grade system: Supabase auth, file storage with signed URLs,
async job pipeline, polling recovery, optimistic UI, and a memory system
that caps at 200 memories per user with confidence-based eviction.
```

**Stack:** `Qwen-VL · Qwen Plus · GPT-4o · NestJS 10 · React 18 · Supabase · Framer Motion 12`

**Stats:**
- `2nd` — Hackathon place
- `1,500+` — Participants beaten
- `8` — Pipeline stages
- `36h` — Time to ship

---

## Project: Atlas Clinical

**Metadata:**
- Title: `Atlas — Traceable Clinical Handoff`
- Description: `Deterministic clinical lab report processing. 11-stage pipeline. Zero hallucinated metrics. Finalist at Qwen AI Build Day.`

**Hero eyebrow:** `02 / Atlas Clinical`

**Problem section:**
```
A patient gets a PDF with 47 analyte values, cryptic reference ranges, and
no explanation. A doctor gets the same PDF and has to manually cross-reference
every value against clinical thresholds, unit conversions, and panel groupings.
Nobody gets a traceable, cited summary they can trust.

Medical AI usually means "throw an LLM at the report and hope it doesn't
hallucinate." We built the opposite.
```

**Constraint section:**
```
Every clinical decision in Atlas is deterministic. LOINC mapping uses exact
alias matching — no fuzzy matching, because correctness beats recall when
lives are involved. Unit conversion follows UCUM canonicalization with
mass-to-molar conversion factors. Rule firing uses JSON-configured
thresholds with severity gradients. Age-based override policies. Critical
value gating that requires explicit sign-off.

The LLM (Qwen) enters the pipeline at exactly one point: post-pipeline
narrative generation. It explains results. It does not make decisions.
Every decision traces back to a deterministic function with a logged
lineage record.
```

**Outcome section:**
```
Finalist (Top 7) at the first-ever Qwen AI Build Day Healthcare Track.
11-stage pipeline from PDF ingestion to actionable clinical report.
Full lineage tracking — source checksum, service versions, build commit.
Auditable enough for regulated environments.

Tested by 3 clinicians in pilot. Zero hallucinated metrics shipped. The
system that says "I don't know" earned more trust than the one that
guesses.
```

**Stack:** `Qwen API · FastAPI 0.115 · Pydantic 2.7 · PostgreSQL 15 · PyMuPDF · pdfplumber · Mineru OCR`

**Stats:**
- `11` — Pipeline stages
- `100%` — Citations traceable
- `0` — Hallucinated outputs
- `Top 7` — AI Build Day finalist

---

## Journal Page (Index)

**Metadata:**
- Title: `Journal`
- Description: `Essays, postmortems, and field notes from shipped AI systems. Written by builders, not commentators.`

**Eyebrow:** `[ Journal · Field notes ]`

**Headline:**
```
Written from
the build.
```
("the build" in amber serif italic)

**Intro paragraph (NEW):**
```
These aren't opinion pieces. They're field notes from things we shipped,
broke, and fixed. If we haven't built it, we don't write about it.
```

---

## Journal: Bounded LLMs, Unbounded Systems

**Slug:** `bounded-llms`
**Category:** `Essay`
**Reading time:** `8 min`
**Published:** `2026-04-12`

**Title:** `Bounded LLMs, Unbounded Systems`

**Excerpt:**
```
The most reliable AI products in 2026 confine the model to the smallest
possible surface. Here's why the constraint is the product.
```

**Body:**
```markdown
The hype cycle wants you to believe that bigger models, longer contexts,
and more autonomous agents are the path forward. That more capability
means more value. That the goal is to remove constraints.

We think the opposite.

## The constraint is the feature

Every system we've shipped — Lumen, Atlas, and everything in between —
starts with the same question: what is the smallest surface we can give
the LLM while still producing value?

In Lumen, the writer stage gets a contract: here are the tagged moments,
here is the user's memory profile, here is the persona. Produce a markdown
narrative between 200 and 500 words, a daily achievement in 10 words or
fewer, and select the best photo. That's it. The model doesn't decide what
to tag. It doesn't manage memory. It doesn't choose the pipeline stages.
It writes prose inside a box.

In Atlas, the LLM's surface is even smaller. It generates explanatory
narrative after all clinical decisions have been made by deterministic
functions. It never sees the rules engine. It never maps a LOINC code.
It explains results — it does not produce them.

## Why this matters

Unbounded LLMs are research artifacts. They're fascinating, but you can't
ship them to clinicians, journalists, or anyone who needs to trust the output.

A bounded LLM is a product. It has:
- A defined input contract (schema, types, max tokens)
- A defined output contract (format, constraints, validation)
- A failure mode that is safe (refusal, fallback, silence)
- An audit trail that traces every output to its inputs

Andrej Karpathy calls LLMs "a new kind of computer." We agree. And like
every useful computer before it, the useful LLM has well-defined I/O
and runs inside a system that handles the edges deterministically.

## The economics of bounded models

Smaller surface means:
- Fewer tokens per call (lower cost)
- Faster inference (lower latency)
- Simpler evaluation (you know what "correct" looks like)
- Easier fallback (smaller contract = easier to replicate deterministically)

Unbounded surface means:
- Unpredictable token usage
- Unpredictable latency
- Evaluation requires human judgment at every step
- No fallback — when the model fails, the whole system fails

We're not anti-LLM. We're pro-contract. The model is powerful. The
contract makes it useful.

## What we've learned

After shipping two production systems with bounded LLMs:

1. **Define the contract first.** Before you write a single prompt, write
   the Zod schema (or Pydantic model) that validates the output. If you
   can't define the schema, you don't understand the task well enough to
   ship it.

2. **Separate the stages.** Tags, classification, and extraction should
   be pure functions or small specialized models. The "big" LLM should
   only handle the task that actually requires language generation.

3. **Build the fallback before you build the feature.** Lumen has a
   deterministic fallback that produces a journal entry without any LLM.
   It's worse, but it works. Users never see a blank screen.

4. **Refuse by default.** Atlas returns uncertainty instead of guessing.
   That's not a bug. That's the product.

## Build it yourself

You don't need to work at a big lab to ship bounded AI. You need a schema
library, a queue, and the conviction that constraints make better products
than capabilities.

Clone any SaaS. Replace the AI layer with a bounded pipeline. Ship it.
You'll learn more in a weekend than in a semester of reading papers.

That's the thesis. We're still proving it.
```

---

## Journal: Vibe Coding Is Not the Opposite of Discipline

**Slug:** `vibe-discipline`
**Category:** `Manifesto`
**Reading time:** `6 min`
**Published:** `2026-04-02`

**Title:** `Vibe Coding Is Not the Opposite of Discipline`

**Excerpt:**
```
Speed and rigor are orthogonal. Here's how we hold both in production and
why the industry's framing of "vibe coding vs. real engineering" is wrong.
```

**Body:**
```markdown
There's a narrative forming that splits builders into two camps: the "vibe
coders" who ship fast with AI tools, and the "real engineers" who write
tests, review PRs, and move slowly. The implication is that you have to
pick one.

That framing is wrong. Speed and rigor are orthogonal axes. You can be
fast and sloppy. You can be slow and sloppy. You can be slow and rigorous.
Or you can be fast and rigorous — and that's where the actual edge is.

## What vibe coding actually means

Andrej Karpathy coined "vibe coding" to describe the flow state of working
with AI assistants — prompting, accepting, iterating, barely reading the
code line-by-line because the feedback loop is so tight. He wasn't
advocating for carelessness. He was describing a new mode of interaction
with code.

The people who dismiss vibe coding have never shipped a production system
in 36 hours using Claude Code and GSAP. We have.

The people who worship vibe coding without adding contracts have never
debugged a hallucinated clinical recommendation at 3 AM. We have that
covered too.

## How we hold both

At Agentic Engineering, here's what "vibe coding with discipline" looks
like in practice:

**Speed layer:**
- Claude Code for scaffolding, iteration, and exploration
- Cursor for rapid frontend work
- Accept first, refine second — the initial pass doesn't need to be perfect
- Ship weekly, no exceptions

**Rigor layer:**
- Zod schemas on every contract boundary
- Pydantic models on every Python service
- TypeScript strict mode, zero `any`
- `prefers-reduced-motion` respected in every animation
- Performance budgets enforced at build time
- Deterministic pipelines tested end-to-end

The speed layer is how we move. The rigor layer is what we don't skip.
They don't conflict. The Zod schema takes 2 minutes to write and saves
2 hours of debugging. The animation accessibility check is one line of
code. The performance budget is a CI step that runs automatically.

## The "clone any SaaS" test

Here's our favorite exercise: pick a SaaS product. Any SaaS product.
Clone it in a weekend.

Not the business model. Not the growth strategy. The product. The UI. The
API. The data model. Ship a working version by Sunday night.

This teaches you more about software engineering than any course because
it forces you to make real decisions under real constraints. What do you
cut? What do you keep? Where do you add contracts? Where do you accept
technical debt?

The people who can do this — ship fast with discipline — are the ones
building the next generation of products. Not the "move fast and break
things" crowd (that era is over). Not the "write perfect code and ship
never" crowd (that era never started). The builders who move fast and
build things that work.

## The boring parts matter

Here's what nobody talks about on Twitter:

- Writing the Zod schema is the actual engineering work
- Setting up the async job queue is harder than writing the prompt
- Handling the fallback case (model fails, API times out, user is offline)
  is where production systems are born
- Testing the pipeline end-to-end with real data is what separates a demo
  from a product

These are the boring parts. They're also the parts that determine whether
your system works at 2 AM without you watching it.

We vibe code the fun parts. We engineer the boring parts. Both happen
every day.

## Ship to learn

Every engineer we respect has the same origin story: strong opinions about
how systems should work, formed entirely by shipping systems that didn't.

You don't get discipline from reading about discipline. You get it from
the 3 AM debugging session where you realize your pipeline isn't
deterministic and the tags stage is returning different results on the
same input. That's when you write the contract.

Ship first. Add the contract after you feel the pain. Then ship again,
faster, with the contract baked in from the start.

That's not anti-discipline. That's how discipline actually forms.
```

---

## Journal: How a Pipeline Won a Hackathon

**Slug:** `qwen-hackathon`
**Category:** `Postmortem`
**Reading time:** `12 min`
**Published:** `2026-03-20`

**Title:** `How a Pipeline Won a Hackathon`

**Excerpt:**
```
Postmortem from the Lumen build at LotusHacks 2026. What we cut, what we
kept, what broke at 4 AM, and why a structured pipeline beat the teams
running raw GPT-4.
```

**Body:**
```markdown
On March 15, 2026, we walked into LotusHacks — Vietnam's largest GenAI
hackathon, co-hosted by HackHarvard and the GenAI Fund. 1,500+
participants. 36 hours. We walked out with 2nd place for Best Use of
Qwen and a system that actually works.

This is the postmortem. Not the press release. The real story.

## The idea (hour 0–2)

We wanted to build something that used multimodal AI in a way that wasn't
just "upload an image and get a description." The thesis: what if your
journal could fuse photos, voice notes, and text into a single coherent
narrative — and remember your life across entries?

Two decisions we made immediately:
1. **Async pipeline.** The user should never wait for generation. Hit
   "generate," navigate away, come back when it's done.
2. **Multi-model routing.** Don't depend on one API. If Qwen goes down,
   fall back to GPT-4o. If that goes down, generate deterministic content.

These two decisions won us the hackathon.

## The architecture (hour 2–8)

We split the work. Thien handled the backend infrastructure — NestJS
server, Supabase integration, the async job pipeline, and the API
contracts. Tan handled the AI pipeline — model routing, prompt engineering,
the memory system, and the frontend.

The 8-stage pipeline took shape:

1. Rate limit check (in-memory, 3 attempts/user/day)
2. Upsert journal entry with `status='generating'`
3. Parallel context fetch: persona, moments, recent journals, memories
4. Sign photo URLs (1-hour Supabase signed URLs with fallback)
5. **Tags** — Qwen Flash: ≤5 tags per moment with confidence scores
6. **Writer** — Qwen Plus: structured output with strict formatting contract
7. Persist draft with achievement and best photo
8. **Memory** — non-blocking: gating → dedup → evict if over 200 cap

The key insight: stages 5, 6, and 8 are the only ones that touch an LLM.
Everything else is deterministic. The pipeline is 62.5% pure functions.

## What broke (hour 14–22)

**The DashScope rate limit.** At 3 AM, we hit the Qwen API rate limit
for the first time. The Tags stage started failing silently. Because
we'd built the dual-client fallback from the start, we flipped to GPT-4o
for 45 minutes while the rate limit cooled down. No user-facing downtime.

**The memory dedup collision.** The memory gating stage uses `md5(fact)`
as a unique constraint. Two different facts about "likes coffee" and
"drinks coffee in the morning" both passed dedup because their MD5
hashes differed. We added a semantic similarity pre-check using embedding
distance, but it was too slow for the hackathon. Documented as a known
gap.

**The frontend polling timeout.** We set a 90-second timeout on the
client-side polling loop. One edge case: if the user has 8+ moments
with photos, the Tags stage alone takes 40 seconds (multimodal inference
per image). We bumped the timeout to 120 seconds and added a progress
indicator that shows which stage the pipeline is currently running.

## What won (hour 30–36)

The demo was clean because the system was real. We didn't show a mockup.
We opened the app, captured a photo, dictated a voice note, and hit
generate. The audience watched the polling dots. Then the journal
appeared — personalized, coherent, with photo context woven in.

The judges asked: "What happens if the API goes down?"

We said: "It falls back to GPT-4o. If that's down too, it generates a
deterministic entry from the raw inputs. The user always gets something."

Nobody else in the hackathon had an answer to that question.

## Why the pipeline approach won

Most hackathon teams threw their entire problem at a single LLM call.
Upload everything, write one giant prompt, hope for the best. That works
in a demo. It fails in production for three reasons:

1. **No observability.** When the output is bad, you can't tell which
   part of the reasoning failed.
2. **No fallback.** When the model fails, the whole system fails.
3. **No cost control.** One giant prompt with 8 images means one giant
   token bill.

Our pipeline splits the problem into stages. Each stage has its own
model, its own contract, its own failure mode, and its own cost profile.
Tags is cheap (Flash model, text output). Writer is moderate (Plus model,
structured output). Memory is optional (non-blocking, can fail silently).

The judges saw a system. Everyone else showed a prompt.

## Lessons

1. **Build the fallback on day one.** Not "nice to have." First thing.
2. **Async everything.** Users will wait 2 seconds but not 30.
3. **Split the models.** Don't use GPT-4 for classification. Use the
   smallest model that works for each stage.
4. **Test with real data at hour 10, not hour 30.** We caught the rate
   limit issue because we were doing real multi-image generations early.
5. **Ship the boring infrastructure first.** The async queue, the polling
   loop, the error recovery — that's what won. Not the prompt.

## What's next

Lumen is being rebuilt as an open-source reference implementation for
bounded multimodal AI pipelines. Atlas is being hardened for broader
clinical testing. And we're opening founding cohort applications at HCMUT
for students who want to build systems like this — not study them.

The hackathon proved the thesis. Now we're scaling the institution.
```

---

## Events Page

**Metadata:**
- Title: `Events`
- Description: `Workshops, build sessions, and talks at HCMUT. Small groups, real projects, shipped code.`

**Eyebrow:** `[ Events ]`

**Headline:**
```
Field sessions.
```
("sessions" in amber serif italic)

**Intro paragraph:**
```
Workshops, build sessions, and small talks. We keep them tight — 15 people
max, laptops required, shipping expected. HCMUT campus first, open seats
announced in the marquee bar.
```

**Empty state:**
```
No events scheduled yet. First build session drops soon. Follow the marquee.
```

---

## Press Kit

**Metadata:**
- Title: `Press Kit`
- Description: `Logos, boilerplate, assets, and hi-res photos. Copy anything you need.`

**Eyebrow:** `[ Press kit ]`

**Headline:**
```
Credentials,
packaged.
```
("packaged" in amber serif italic)

**Boilerplate:**
```
Agentic Engineering is a student-led engineering group at Ho Chi Minh
City University of Technology (HCMUT), founded in 2025 by Hoang Le Ba
Thien and Le Thanh Tan. Both are first-year Computer Science students.

The team placed 2nd for Best Use of Qwen at LotusHacks 2026 (1,500+
participants) and reached Top 7 at Qwen AI Build Day's Healthcare Track.
They maintain two open-source systems: Lumen (multimodal AI journaling)
and Atlas (traceable clinical lab report processing).

Bounded LLMs. Contract-based pipelines. Shipped systems.
```

**Assets (updated):**
- Logo — SVG → `/logo.svg`
- Logo — PNG → `/logo.png`
- OG Cover — SVG → `/og.svg`
- Founder photos — `/media/` (see media reference table)
- Award ceremony — `SON07399.JPG`
- Team working — `SON03571.JPG`

**Contact:** `press@inference.club`

---

## Uses Page

**Metadata:**
- Title: `/uses`
- Description: `What we build with. Models, stack, pipeline tools, editors, and engineering principles.`

**Eyebrow:** `[ /uses ]`

**Headline:**
```
What we
build with.
```
("build with" in amber serif italic)

### Models

```
Qwen-VL · multimodal default — images + text in, structured tags out
Qwen Plus · text generation — journal writing, narrative, explanation
GPT-4o · fallback — graceful degradation when DashScope is unavailable
Whisper · audio — voice note transcription
Claude · code assistance — Claude Code for agentic scaffolding
```

### Stack

```
Next.js 16 · App Router, RSC, Turbopack
React 19 · server components by default
Tailwind v4 · design tokens via @theme
GSAP 3 + Lenis · scroll-driven motion, smooth scroll sync
Payload CMS v3 · headless, Lexical rich text, PostgreSQL
NestJS 10 · backend API for Lumen
FastAPI · deterministic Python services for Atlas
Supabase · auth + storage for Lumen
PostgreSQL · primary datastore, everywhere
```

### Pipeline

```
Zod · contract types (TypeScript) — every boundary validated
Pydantic · contract types (Python) — every boundary validated
Inngest · async job orchestration
DashScope · Qwen model API
OpenAI SDK · fallback model API
vLLM · local inference with tensor parallelism
Numba · JIT-compiled numerical kernels
Polars · streaming dataframe processing
```

### Editors

```
Cursor · Tan — AI-first editor for rapid product work
Neovim · Thien — systems work, infrastructure, scripts
Claude Code · agentic engineering, scaffolding, iteration
GitHub · version control, CI, collaboration
```

### Discipline

```
Contract-first — write the schema before the prompt
Bounded LLM surfaces — smallest model for each stage
Deterministic edges — pure functions around every model
Cite or refuse — no output without traceable source
Fallback by default — every model call has a degradation path
Ship weekly — velocity with judgment, not velocity alone
```

---

## Changelog

**Metadata:**
- Title: `Changelog`
- Description: `What shipped, when, and why. Version history for Agentic Engineering.`

**Eyebrow:** `[ Changelog ]`

**Headline:**
```
What
shipped.
```
("shipped" in amber serif italic)

| Version | Date | Description |
|---------|------|-------------|
| `v1.3.0` | 2026-04-25 | Full copy rewrite. New pages: Colophon, Principles, Recognition. Media library. Founder profiles live |
| `v1.2.0` | 2026-04-22 | Payload CMS v3 online. Admin at /admin. llms.txt, /api/og, draft preview |
| `v1.1.0` | 2026-04-12 | Journal published: "Bounded LLMs, Unbounded Systems." Stats + manifesto section polish |
| `v1.0.0` | 2026-03-20 | Site v1 ships — Hero, Manifesto, Projects, Process, Stats, Journal, CTA bands. 7-section landing with WebGL, GSAP, Lenis |
| `v0.2.0` | 2026-03-15 | Lumen ships at LotusHacks 2026. 2nd place, Best Use of Qwen. 1,500+ participants |
| `v0.1.0` | 2025-12-01 | Repository initialized. First design tokens. Dark editorial system defined |

---

## Lab Page (Coming Soon)

**Metadata:**
- Title: `Lab`
- Description: `Interactive experiments in bounded AI engineering. Live demos, pipeline visualizers, and things we built just to see if we could.`

**Eyebrow:** `[ Lab · Experiments ]`

**Headline:**
```
Break things
here.
```
("here" in amber serif italic)

**Intro paragraph:**
```
Where we test ideas that don't have a project yet. Interactive demos,
pipeline visualizers, small tools we built because we wanted to see how
they work. Some of these will turn into projects. Most won't. All of
them run.
```

**Coming soon state:**
```
The lab is under construction. First experiment drops soon.

While you wait — here's what we're building:

→ Bounded LLM Playground
  Give a prompt, set the contract, watch the model work inside the
  boundary. See what happens when you tighten the constraints vs.
  loosen them. Interactive proof that smaller surfaces produce more
  reliable outputs.

→ Pipeline Visualizer
  Trace a single input through Lumen's 8-stage pipeline in real time.
  Watch the tags stage classify, the writer stage generate, and the
  memory stage evaluate. See every contract boundary.

→ Refusal Demo
  Feed Atlas a lab report with ambiguous values. Watch it refuse to
  classify uncertain results. Interactive proof that silence is a
  feature.
```

**CTA:** `Get notified when the lab opens →` (links to /join)

---

## Colophon Page (New)

**Metadata:**
- Title: `Colophon`
- Description: `How this website was built. Stack, design decisions, performance targets, and the tools behind the interface.`

**Eyebrow:** `[ Colophon · How it's made ]`

**Headline:**
```
Built by
two students.
```
("two students" in amber serif italic)

**Body:**
```
This website is the product. Not a marketing page for a product. The
product itself. Two first-year CS students, no design agency, no budget.
Claude Code, GSAP, and not enough sleep.

### Stack

Next.js 16 with App Router. React 19 with server components by default.
TypeScript strict mode. Tailwind v4 with design tokens via @theme. GSAP 3
for scroll-driven animation. Lenis for smooth scroll, wired to GSAP's
ticker for frame-perfect sync. OGL for the WebGL hero blob. Payload CMS
v3 with PostgreSQL for content management. Deployed on Vercel.

### Typography

Three typefaces. No more.

- **Syne 800** — Display headings. Tight letter-spacing, geometric
  personality. The voice of authority.
- **Instrument Serif italic** — Accent statements only. The voice of
  nuance. Never bold (font-synthesis blocked).
- **DM Mono** — Body text, labels, metadata, code. The workhorse. The
  voice of the engineer.

### Color

Dark editorial palette. Amber signal on ink background. Ten tokens, no
raw hex values in components.

`--color-ink` (#0c0c09) is the floor. `--color-amber` (#d4870a) is the
signal. `--color-ivory` (#f5f0e8) is the text. Everything else is a
shade between them.

### Motion

Every animation respects `prefers-reduced-motion`. Every scroll-driven
interaction uses GSAP ScrollTrigger with scrub for frame accuracy.
Lenis handles smooth scrolling at 0.09 lerp.

The hero blob is a full-screen OGL quad running custom GLSL with 5-octave
fBm noise, cursor-tracked amber hotspot, and IntersectionObserver to
pause when off-screen. It falls back to a CSS radial gradient if WebGL
isn't available.

Magnetic buttons use `gsap.quickTo` for spring physics. The custom cursor
has 14 states, a 3-element trail, idle orbit animation, and manifesto-
section inversion. Click ripples use mix-blend-mode for transparency.

### Performance targets

- LCP ≤ 2.5s
- CLS ≤ 0.05
- INP ≤ 200ms
- Landing JS (gzip) ≤ 220 KB
- Total transfer ≤ 900 KB

### Accessibility

Skip link. Focus rings. Semantic HTML. ARIA labels. Keyboard navigation.
No motion without consent. `color-scheme: dark` is intentional and
permanent — not a theme toggle, a design decision.

### Easter eggs

There are at least four. We'll confirm three:

- Konami code in the console
- A console API: `window.__ae.grid()`, `window.__ae.trail()`,
  `window.__ae.matrix()`, `window.__ae.about()`
- Triple-click the copyright in the footer

The fourth is a secret.

### Tools

This site was built with Claude Code (agentic scaffolding and iteration),
Cursor (rapid frontend), Neovim (systems work), and a conviction that
student projects don't have ceilings — only deadlines.

Built by Hoang Le Ba Thien and Le Thanh Tan. HCMUT, 2026.
```

---

## Principles Page (New)

**Metadata:**
- Title: `Principles`
- Description: `Engineering principles for bounded AI systems. How we structure contracts, handle refusal, test pipelines, and ship.`

**Eyebrow:** `[ Principles · Engineering ]`

**Headline:**
```
How we
build.
```
("build" in amber serif italic)

**Intro:**
```
The manifesto is the philosophy. This page is the practice. These are the
engineering principles we apply to every project, every pipeline, every
line of code.
```

### Principle 01 — Contract first, prompt second

```
Before you write a prompt, write the output schema. In TypeScript, that's
Zod. In Python, that's Pydantic. The schema defines what "correct" looks
like — without it, you can't test, validate, or fall back.

If you can't describe the output in a type system, you don't understand
the task well enough to automate it.
```

### Principle 02 — Smallest model per stage

```
Don't use GPT-4 for classification. Don't use a 70B model for tagging.
Every pipeline stage gets the smallest model that meets the contract.

In Lumen: Tags use Qwen Flash (3B). Writer uses Qwen Plus. Memory gating
uses Qwen Plus. Three different models for three different jobs — because
cost, latency, and reliability all improve when you right-size.
```

### Principle 03 — Fallback before feature

```
Every model call has a degradation path. Build the fallback before you
build the feature.

Lumen falls back from DashScope to GPT-4o to deterministic generation.
Atlas refuses uncertain classifications instead of guessing. The user
always gets something — even if the "something" is an honest "I don't
know."
```

### Principle 04 — Deterministic at the edges

```
The LLM is probabilistic. Everything around it is not. Classifiers,
validators, routers, and data transformations are pure functions with
predictable outputs. Test them. Cache them. Trust them.

If your pipeline produces different results on the same input, that's
not AI — that's a bug.
```

### Principle 05 — Observe everything, log nothing sensitive

```
Every pipeline stage emits structured logs: input hash, output hash,
model version, latency, token count. Never log PII. The /api/join
endpoint logs a SHA-256 fingerprint, not the raw email.

You can't debug a system you can't observe. You can't ship a system
that leaks user data.
```

### Principle 06 — Ship weekly

```
No feature branches that live longer than a week. No "almost done" that
stretches into next month. Ship something — anything — every week.

The feedback from one deployed feature teaches you more than the plan
for ten unbuilt features.
```

---

## Recognition Page (New)

**Metadata:**
- Title: `Recognition`
- Description: `Awards, placements, and proof points. What happens when bounded AI engineering meets competition.`

**Eyebrow:** `[ Recognition · Proof ]`

**Headline:**
```
Receipts.
```
(Single word. Let it breathe.)

**Intro:**
```
We don't list credentials to impress. We list them because the thesis
needs evidence, and we'd rather show receipts than argue philosophy.
```

### LotusHacks 2026

```
Event: LotusHacks 2026 — Vietnam's largest GenAI hackathon
Co-hosted by: HackHarvard × GenAI Fund
Participants: 1,500+
Result: 2nd place — Best Use of Qwen
Project: Journie (Lumen) — multimodal AI journaling with 8-stage pipeline
Date: March 2026
```

**Suggested image:** `SON07399.JPG` (award ceremony, "2nd Journie" on screen)

### Qwen AI Build Day — Healthcare Track

```
Event: First-ever Qwen AI Build Day
Track: Healthcare
Result: Finalist — Top 7
Project: Atlas (Elfie Lab Analyzer) — deterministic clinical lab processing
Date: 2026
```

**Suggested image:** `SON03343.JPG` (full venue, group photo)

### Kaggle — Jigsaw Community Rules

```
Platform: Kaggle
Competition: Jigsaw Agile Community Rules Classification
Teams: 2,445
Result: 370th — Top 15%
Score: 0.944 MAP@3
Approach: 5-branch ensemble (DeBERTa, DistilRoBERTa, Qwen embeddings, Qwen 14B)
```

### Other

```
Google Developer Group on Campus HCMUT — developer team member
HCMUT EE Machine Learning & IoT Lab — research assistant
CivicTech Platform — 120+ community reports in 3 months
```

---

## 404 Page

**Headline:** `404`

**Quote:**
```
"Unsupported claims return uncertainty, not prose."
```

**Return link:** `Return to systems`

> Already strong. No changes needed.

---

## Error Page

**Headline:** `500`

**Body:**
```
Something broke. Not the thesis, just the server.
```

**Actions:**
- `Attempt reset` (calls reset())
- `Return to systems` → `/`

---

## Footer

**About blurb:**
```
Agentic Engineering is a student-led group at HCMUT building bounded,
contract-based AI systems. We ship code, not slides.
```

**Sitemap links:** Projects / Journal / Manifesto / Join / About / Lab
**Contact:** `hello@inference.club` · GitHub
**Colophon:** `Syne · Instrument Serif · DM Mono`
**Live clock:** `ICT · Asia/Ho_Chi_Minh`
**Bottom bar:** `© 2026 Agentic Engineering · HCMUT` + git SHA

**Giant wordmark:** `AGENTIC ENGINEERING`

---

## SEO Metadata

| Route | Title | Description |
|-------|-------|-------------|
| `/` | `Agentic Engineering — Bounded LLMs. Contract-based pipelines. Shipped systems.` | `The HCMUT student institution defining AI-native engineering discipline. 2nd place Best Use of Qwen, LotusHacks 2026.` |
| `/about` | `About — Agentic Engineering` | `Two first-year HCMUT students building the engineering discipline AI-native software demands. Shipped systems, not slides.` |
| `/about/members/thien-hoang` | `Hoang Le Ba Thien — Agentic Engineering` | `Co-founder. Systems, infrastructure, quantitative ML. Builds the deterministic edges.` |
| `/about/members/tan-le` | `Le Thanh Tan — Agentic Engineering` | `Co-founder. AI systems, product, multimodal pipelines. Ships the product layer.` |
| `/manifesto` | `Manifesto — Agentic Engineering` | `Bounded LLMs. Deterministic edges. Surface uncertainty. Ship to learn. The four principles.` |
| `/join` | `Join — Founding Cohort` | `Apply to the founding cohort of Agentic Engineering at HCMUT. Show us what you shipped.` |
| `/projects` | `Projects — Shipped Systems` | `Bounded AI systems with contracts, tests, and users. Lumen and Atlas — deployed, not demoed.` |
| `/projects/lumen-journal` | `Lumen — Multimodal Journal Engine` | `Award-winning 8-stage async AI pipeline. 2nd place, Best Use of Qwen, LotusHacks 2026.` |
| `/projects/atlas-clinical` | `Atlas — Traceable Clinical Handoff` | `11-stage deterministic clinical pipeline. Zero hallucinated outputs. Finalist at Qwen AI Build Day.` |
| `/journal` | `Journal — Field Notes` | `Essays, postmortems, and field notes from shipped AI systems. Written by builders.` |
| `/events` | `Events — Field Sessions` | `Workshops, build sessions, and talks at HCMUT. Small groups, real shipping.` |
| `/press` | `Press Kit — Agentic Engineering` | `Logos, boilerplate, photos, and downloadable assets.` |
| `/uses` | `/uses — What We Build With` | `Models, stack, pipeline tools, editors, and engineering principles.` |
| `/changelog` | `Changelog — What Shipped` | `Version history. What shipped, when, and why.` |
| `/lab` | `Lab — Experiments` | `Interactive experiments in bounded AI engineering. Coming soon.` |
| `/colophon` | `Colophon — How It's Made` | `The stack, typography, color system, motion design, and performance targets behind this site.` |
| `/principles` | `Principles — How We Build` | `Engineering principles for bounded AI: contract-first, smallest model, deterministic edges.` |
| `/recognition` | `Recognition — Proof Points` | `Awards, hackathon placements, and competition results. The evidence behind the thesis.` |

---

## CMS Member Data (updated)

```typescript
export const members: Member[] = [
  {
    slug: "thien-hoang",
    name: "Hoang Le Ba Thien",
    role: "Co-founder · Systems & Infrastructure",
    bio: "Pipelines, quantitative systems, and the boring parts that make the magic reproducible. Built production ML at scale before most people finish their first semester.",
    links: { github: "https://github.com/" },
  },
  {
    slug: "tan-le",
    name: "Le Thanh Tan",
    role: "Co-founder · AI Systems & Product",
    bio: "Multimodal AI products, LLM orchestration, and the conviction that if something exists as a SaaS, you can build it yourself — better.",
    links: { github: "https://github.com/" },
  },
];
```

---

## Updated Announcements

```typescript
export const announcements: Announcement[] = [
  {
    text: "2nd place — Best Use of Qwen, LotusHacks 2026 (1,500+ participants)",
    href: "/journal/qwen-hackathon",
  },
  { text: "Founding cohort applications now open", href: "/join" },
  { text: "New essay — Bounded LLMs, Unbounded Systems", href: "/journal/bounded-llms" },
  { text: "Finalist — Qwen AI Build Day Healthcare Track", href: "/projects/atlas-clinical" },
];
```

---

## Updated Stats

```typescript
export const stats: Stat[] = [
  { value: 2, suffix: "", label: "Hackathon placings", sparkline: [10, 28, 22, 40, 36, 60, 52, 78] },
  { value: 1500, suffix: "+", label: "Competitors faced", sparkline: [8, 18, 30, 28, 44, 52, 70, 88] },
  { value: 2, suffix: "", label: "Production systems shipped", sparkline: [4, 8, 12, 18, 26, 36, 50, 70] },
  { value: 1, suffix: "", label: "Discipline being defined", sparkline: [60, 64, 70, 72, 78, 80, 84, 90] },
];
```

---

*End of copy inventory. All text is ready for code integration.*
