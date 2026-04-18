# Inference — Brand + Palette

## Context (from info.md)

2 first-year students, extreme vibe coding ability, AI-built apps. Built multimodal journal-generation system (photos + voice/text + persona + recent journals + long-term memory) → async tags → writer → memory pipeline. Won 2nd place best use of Qwen, Vietnam's largest Hackathon. Built patient-focused system: lab report PDFs → traceable clinical summaries + clinician handoffs. Deterministic contract-based pipeline; Qwen confined to bounded explanation + follow-up chat. Surfaces uncertainty, refuses unsupported conclusions, resilient.

Goal: start club at HCMUT (Ho Chi Minh City's largest Engineering School). Spread Vibe Coding under pro name **Agentic Engineering**. Future: collab with OpenAI. Near term: ship impactful open-source apps for HCMUT students, gain credibility, then workshops + recruit + propagate. Need CMS website with artistic, award-winning landing page. Post projects, advertise, convert, CTA.

---

## Strategic Position

### Core Tension

Two things at once. Design must hold both:

| Vibe Coding | Agentic Engineering |
|---|---|
| Fast, intuitive, creative | Rigorous, contract-based, reliable |
| Hackathon energy | Clinical-grade pipeline thinking |
| First-year audacity | Production standards |
| Irreverent | Institutional |

Most clubs pick one lane. Edge: already proven both. Hackathon win on deterministic pipeline w/ bounded LLM = thesis, not contradiction. **Design embody synthesis.**

### Three Audiences

1. **HCMUT students** — near-term conversion. Feel: *"ahead of me, want in that room."* Magnetic, not intimidating.
2. **Faculty / institutional** — credibility. Feel: *"serious. not meme club."*
3. **External pros / OpenAI / sponsors** — long game. Feel: *"institution producing Vietnam's frontier engineers."*

One system, all three, no pandering.

### Emotion to Invoke

Not excitement about AI (everyone does that). Invoke:

- **Inevitability** — where engineering is going. Already there.
- **Precision** — not clever, not flashy. Correct. Reliable. Measurable.
- **Controlled velocity** — fast w/ judgment.
- **Quiet authority** — confidence of people who shipped real things.

Closer to **technical journal from future** than startup landing page.

---

## Color Palette Direction

### Wrong Directions

- **Purple-on-white AI gradients** → "we read Medium post about AI design"
- **Neon green hacker** → "CTF club, not engineering institution"
- **Corporate navy** → "consulting firm"
- **Pastel/approachable** → weakness for institution claiming rigor

### Right Direction: **Obsidian + Signal**

Dark, near-black foundation + single high-luminance accent, surgical restraint.

**Why amber, not other accent:**
Amber = color of judgment — warning lights, editor highlights, terminal cursor. Between cold blue tech + red danger. Warm enough = *human intelligence in loop*. Precise = *serious craft*. For Vietnamese engineering institution, cultural resonance (gold, craft, earned status), not literal. Cyan/neon/electric blue burned through. Amber owns lane.

**Why obsidian, not white:**
White = "startup landing page." Positioning *institutional* — MIT architecture lab, not YC demo day. Dark grounds authority. Amber hits like single lamp in dark room — undeniable, focal, precise.

---

## Typography

Three-font hierarchy, distinct work:

- **Syne 800** — display/headlines. Ultrawide, architectural. Designed for institutions that build things. Nothing fragile.
- **Instrument Serif italic** — accent voice. Pull quotes, taglines, moments needing *feeling* not info. Serif/italic vs grotesque display = editorial tension.
- **DM Mono** — body. Not because "code" club (avoid cliché) but monospace reads as *precision, not decoration*. Says: we measure things. Every char earns space.

---

## Key Design Aspects

**1. Landing Page = Argument, not Brochure**
Not selling features. Making claim: *workflow changed, institution exists because of that.* Hero = thesis as single typographically overwhelming statement → prove w/ projects below.

**2. Project Cards = Primary Credibility**
Hackathon win + clinical pipeline = *evidence*, not portfolio items. Each card: hard engineering decision, constraint, outcome. Not screenshots + tags.

**3. Motion = Precision, not Spectacle**
No particle effects, floating gradients, mouse-trail glows ("we watched WebGL tutorial"). Use: staggered text reveals on scroll, amber cursor accents, numbers counting up on stats enter view. Feel like process running, not show playing.

**4. Negative Space = Conviction**
Overcrowded = insecurity. Have two real projects. Give room. Dark space on obsidian reads as *confidence in what's there*.

**5. CTA Hierarchy**
Three paths in priority: (1) **View open-source projects** → near-term credibility through shipped work, (2) **Read engineering blog** → discipline-definers, (3) **Join waitlist** → recruit later. Don't mix visually. Hierarchy everything.

**6. Responsive No Compromise**
HCMUT students mostly mobile. Syne 800 + DM Mono body — test at 375px. Syne condenses well at small widths.

---

## Palette Tokens (from palette_analysis.html)

```css
:root{
  --ink:#0C0C09;
  --ink2:#1A1A15;
  --ink3:#282820;
  --amber:#D4870A;
  --amber-hot:#F0A020;
  --amber-pale:#FDE8B8;
  --ivory:#F5F0E8;
  --ivory2:#EDE8DC;
  --steel:#7A8490;
  --steel-light:#B2BBC4;
}
```

### Swatches

| Name | Hex | Role |
|---|---|---|
| Obsidian | `#0C0C09` | Primary background |
| Deep Ink | `#1A1A15` | Surface 1 |
| Surface | `#282820` | Surface 2 / borders |
| Signal Amber | `#D4870A` | Accent base |
| Hot Amber | `#F0A020` | Accent hot / hover |
| Amber Pale | `#FDE8B8` | Amber text on amber |
| Ivory | `#F5F0E8` | Primary text |
| Ivory2 | `#EDE8DC` | Secondary text |
| Steel | `#7A8490` | Metadata |
| Steel Light | `#B2BBC4` | Muted text |

### Emotional Signal Per Role

- **Obsidian field** — serious institution, not student club. Depth without heaviness.
- **Signal amber** — precision. Single point of light in dark space. Judgment.
- **Ivory text** — warm intelligence. Not cold tech, not clinical white.
- **Steel secondary** — reliability. Metadata. Scaffolding behind signal.

### Personality Spectrum (Inference position)

| Axis | Position |
|---|---|
| Hype → Rigorous | 85% Rigorous |
| Cold → Warm | 55% Warm |
| Minimal → Rich | 65% Rich |
| Playful → Authoritative | 75% Authoritative |
| Generic → Distinctive | 90% Distinctive |

### Type Samples

- **Display — Syne 800**: "Agentic Engineering" @ 26px, ivory, line-height 1
- **Accent serif — Instrument Serif italic**: "for the reliable builder" @ 22px, hot amber
- **Body — DM Mono 400**: "We don't teach AI. We institutionalize the engineering discipline that AI-native software demands." @ 13px, steel-light, line-height 1.6

### Fonts Import

```
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap');
```

### Vs Competitors

| Style | Signal |
|---|---|
| Purple gradient club | AI hype, generic, forgettable |
| Corporate navy club | Stiff, consulting-firm energy |
| Neon green hacker | CTF club, not institution |
| **Inference (you)** | **Precise, serious, alive** |
