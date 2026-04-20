# Phase 11: projects-immersion

**Scope**: Project section becomes the centerpiece with deep immersion.

**Files changed**:
- `src/components/sections/Projects.tsx`
- `src/components/sections/ProjectDiagrams.tsx`
- `src/app/globals.css`

**Acceptance criteria**:
- typecheck ✅
- lint ✅
- build ✅
- smoke ✅

**Anomalies / decisions**:
- Added `min-h-[100svh]` to project scenes and used `ScrollTrigger.create({ pin: true })`.
- Added parallax tilt on project hover.
- Stat masks added with `.stat-mask` using pseudo-elements with `mix-blend-mode: overlay`.
- Tag sweep effect refined with scale and colors.
- Added Lumen diagram lighting using `strokeDashoffset` and ScrollTrigger scrub.
- Atlas diagram refused claim single shake/pulse added via GSAP.
