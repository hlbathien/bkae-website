"use client";
import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

/**
 * Lumen pipeline diagram: Input → Tags → Writer → Memory → Output
 * Animated edges via stroke-dashoffset; pulse dot travels path on view.
 */
export function LumenDiagram() {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const svg = root.current;
    const ctx = gsap.context(() => {
      const edges = svg.querySelectorAll<SVGPathElement>("[data-edge]");
      edges.forEach((e) => {
        const len = e.getTotalLength();
        e.style.strokeDasharray = String(len);
        e.style.strokeDashoffset = String(len);
      });
      const nodes = svg.querySelectorAll<SVGGElement>("[data-node]");
      const chips = svg.querySelectorAll<SVGTextElement>("[data-chip]");

      gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 75%" },
        defaults: { ease: "expo.out" },
      })
        .from(nodes, { opacity: 0, y: 14, stagger: 0.08, duration: 0.6 })
        .to(edges, { strokeDashoffset: 0, duration: 0.9, stagger: 0.1 }, "-=0.4")
        .from(chips, { opacity: 0, duration: 0.4, stagger: 0.05 }, "-=0.6");

      const highlights = svg.querySelectorAll<SVGRectElement>("[data-node-highlight]");
      gsap.to(highlights, {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.2, // sequential
        scrollTrigger: {
          trigger: svg,
          start: "center 80%",
          end: "bottom 30%",
          scrub: 1,
        }
      });

      // Pulse travels horizontally across the pipeline (x: 90 → 710, y: 300)
      const pulse = svg.querySelector<SVGCircleElement>("#lumen-pulse");
      if (pulse) {
        gsap.fromTo(
          pulse,
          { attr: { cx: 90, cy: 300 } },
          {
            attr: { cx: 710, cy: 300 },
            duration: 5,
            repeat: -1,
            ease: "none",
          },
        );
      }
    }, svg);
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === svg) t.kill();
      });
      ctx.revert();
    };
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 800 600"
      className="h-auto w-full"
      role="img"
      aria-label="Lumen pipeline: Input to Tags to Writer to Memory to Output"
    >
      <defs>
        <marker id="lumen-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--color-amber)" />
        </marker>
        <linearGradient id="lumen-node" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-ink2)" />
          <stop offset="1" stopColor="var(--color-ink)" />
        </linearGradient>
      </defs>

      {/* Grid backdrop */}
      <g opacity="0.08">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 67} y1="0" x2={i * 67} y2="600" stroke="var(--color-steel)" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 67} x2="800" y2={i * 67} stroke="var(--color-steel)" strokeWidth="0.5" />
        ))}
      </g>

      {/* Flow path for pulse */}
      <path
        id="lumen-flow"
        d="M 90 300 C 180 300, 200 300, 250 300 S 350 300, 400 300 S 550 300, 600 300 S 700 300, 720 300"
        fill="none"
        stroke="transparent"
      />

      {/* Edges */}
      {[
        { from: 90, to: 250, y: 300 },
        { from: 250, to: 400, y: 300 },
        { from: 400, to: 550, y: 300 },
        { from: 550, to: 710, y: 300 },
      ].map((e, i) => (
        <path
          key={i}
          data-edge
          d={`M ${e.from + 50} ${e.y} L ${e.to - 50} ${e.y}`}
          stroke="var(--color-amber)"
          strokeWidth="1.25"
          fill="none"
          markerEnd="url(#lumen-arrow)"
        />
      ))}

      {/* Nodes */}
      {[
        { x: 90, label: "INPUT", sub: "photo · voice · text" },
        { x: 250, label: "TAGS", sub: "pure fn · classifier" },
        { x: 400, label: "WRITER", sub: "bounded LLM" },
        { x: 550, label: "MEMORY", sub: "pgvector · episodic" },
        { x: 710, label: "OUTPUT", sub: "traceable · refusable" },
      ].map((n) => (
        <g key={n.label} data-node transform={`translate(${n.x}, 300)`}>
          <rect
            x="-50"
            y="-34"
            width="100"
            height="68"
            fill="url(#lumen-node)"
            stroke="var(--color-ink3)"
            strokeWidth="1"
          />
          <rect
            data-node-highlight
            x="-50"
            y="-34"
            width="100"
            height="68"
            fill="none"
            stroke="var(--color-amber)"
            strokeWidth="1"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
          <text
            textAnchor="middle"
            y="-4"
            fontFamily="var(--font-display)"
            fontWeight="800"
            fontSize="14"
            fill="var(--color-ivory)"
            letterSpacing="0.04em"
          >
            {n.label}
          </text>
          <text
            textAnchor="middle"
            y="18"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="var(--color-steel)"
            letterSpacing="0.08em"
          >
            {n.sub}
          </text>
        </g>
      ))}

      {/* Contract chips */}
      {[
        { x: 170, label: "schema://tags.v1" },
        { x: 325, label: "contract://writer.in" },
        { x: 475, label: "contract://writer.out" },
        { x: 630, label: "schema://memory.v1" },
      ].map((c) => (
        <g key={c.label} data-chip transform={`translate(${c.x}, 260)`}>
          <rect x="-55" y="-10" width="110" height="20" fill="var(--color-ink)" stroke="var(--color-amber)" strokeOpacity="0.35" />
          <text
            textAnchor="middle"
            y="4"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill="var(--color-amber)"
            letterSpacing="0.06em"
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* Pulse */}
      <circle id="lumen-pulse" r="4" fill="var(--color-amber-hot)">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="1.4s" repeatCount="indefinite" />
      </circle>

      {/* Proof ribbon */}
      <g transform="translate(400, 480)">
        <text
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="10"
          fill="var(--color-steel-light)"
          letterSpacing="0.18em"
        >
          2nd PLACE · BEST USE OF QWEN · GENAI HACKATHON VIETNAM 2025
        </text>
        <text
          textAnchor="middle"
          y="22"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="var(--color-amber)"
          letterSpacing="0.18em"
        >
          200+ TEAMS · 5 STAGES · ASYNC
        </text>
      </g>
    </svg>
  );
}

/**
 * Atlas diagram: source PDF → extraction contract → claim graph
 * Each claim cites a bounding-box region; unsupported claims refused.
 */
export function AtlasDiagram() {
  const root = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!root.current) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const svg = root.current;
    const ctx = gsap.context(() => {
      const arcs = svg.querySelectorAll<SVGPathElement>("[data-arc]");
      arcs.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
      });
      gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 75%" } })
        .from("[data-src]", { opacity: 0, x: -20, duration: 0.6, ease: "expo.out" })
        .from("[data-claim]", { opacity: 0, y: 10, stagger: 0.07, duration: 0.5, ease: "expo.out" }, "-=0.3")
        .to(arcs, { strokeDashoffset: 0, duration: 1.0, stagger: 0.08, ease: "expo.out" }, "-=0.4")
        .from("[data-refused]", { opacity: 0, scale: 0.9, duration: 0.4, ease: "back.out(1.6)" });

      const refusedClaim = svg.querySelector<SVGGElement>("[data-claim]:last-child");
      if (refusedClaim) {
        gsap.to(refusedClaim, {
          x: 6,
          duration: 0.06,
          yoyo: true,
          repeat: 5,
          ease: "none",
          scrollTrigger: {
            trigger: svg,
            start: "top 55%", // when diagram enters focus
          }
        });
      }
    }, svg);
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === svg) t.kill();
      });
      ctx.revert();
    };
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 800 600"
      className="h-auto w-full"
      role="img"
      aria-label="Atlas traceable citation graph: PDF regions to claims"
    >
      {/* Source PDF panel */}
      <g data-src>
        <rect x="40" y="60" width="240" height="480" fill="var(--color-ink2)" stroke="var(--color-ink3)" />
        <text x="50" y="85" fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-steel)" letterSpacing="0.18em">
          LAB-REPORT.PDF
        </text>
        {/* Mock text lines */}
        {Array.from({ length: 22 }).map((_, i) => (
          <rect
            key={i}
            x="52"
            y={110 + i * 17}
            width={180 - (i % 4) * 22}
            height="3"
            fill="var(--color-steel)"
            opacity="0.25"
          />
        ))}
        {/* Bounding box citations */}
        {[
          { y: 135, label: "HB" },
          { y: 220, label: "WBC" },
          { y: 340, label: "ALT" },
        ].map((b) => (
          <g key={b.label}>
            <rect
              x="48"
              y={b.y}
              width="200"
              height="24"
              fill="none"
              stroke="var(--color-amber)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="54"
              y={b.y - 4}
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--color-amber)"
              letterSpacing="0.1em"
            >
              [{b.label}]
            </text>
          </g>
        ))}
      </g>

      {/* Contract band */}
      <g transform="translate(320, 280)">
        <rect x="-10" y="-12" width="100" height="24" fill="var(--color-ink)" stroke="var(--color-amber)" />
        <text
          x="40"
          y="4"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--color-amber)"
          letterSpacing="0.1em"
        >
          contract.v1
        </text>
      </g>

      {/* Claim graph */}
      {[
        { y: 140, name: "Hemoglobin low", cite: "HB", ok: true },
        { y: 215, name: "Immune response", cite: "WBC", ok: true },
        { y: 335, name: "Liver enzymes elevated", cite: "ALT", ok: true },
        { y: 430, name: "Cancer risk", cite: null, ok: false },
      ].map((c, i) => (
        <g key={i} data-claim transform={`translate(460, ${c.y})`}>
          <rect
            x="0"
            y="-18"
            width="280"
            height="44"
            fill="var(--color-ink2)"
            stroke={c.ok ? "var(--color-ink3)" : "var(--color-amber-hot)"}
            strokeWidth={c.ok ? "1" : "1.5"}
            strokeDasharray={c.ok ? "" : "4 3"}
          />
          <text x="12" y="0" fontFamily="var(--font-display)" fontSize="14" fontWeight="800" fill="var(--color-ivory)">
            {c.name}
          </text>
          <text
            x="12"
            y="16"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fill={c.ok ? "var(--color-amber)" : "var(--color-amber-hot)"}
            letterSpacing="0.1em"
          >
            {c.ok ? `cites → [${c.cite}]` : "REFUSED · no traceable source"}
          </text>
          {!c.ok && (
            <g data-refused>
              <circle cx="260" cy="0" r="10" fill="none" stroke="var(--color-amber-hot)" />
              <text
                x="260"
                y="4"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                fill="var(--color-amber-hot)"
              >
                ✕
              </text>
            </g>
          )}
        </g>
      ))}

      {/* Arcs from bounding box → claim */}
      {[
        { from: [250, 147], to: [460, 140] },
        { from: [250, 232], to: [460, 215] },
        { from: [250, 352], to: [460, 335] },
      ].map((a, i) => (
        <path
          key={i}
          data-arc
          d={`M ${a.from[0]} ${a.from[1]} C ${a.from[0] + 80} ${a.from[1]}, ${a.to[0] - 80} ${a.to[1]}, ${a.to[0]} ${a.to[1]}`}
          fill="none"
          stroke="var(--color-amber)"
          strokeWidth="1"
          strokeOpacity="0.7"
        />
      ))}

      {/* Legend */}
      <g transform="translate(40, 560)">
        <text fontFamily="var(--font-mono)" fontSize="9" fill="var(--color-steel-light)" letterSpacing="0.18em">
          EVERY CLAIM CITES A REGION · UNSOURCED CLAIMS REFUSED · 100% TRACEABLE
        </text>
      </g>
    </svg>
  );
}

export function ProjectArtifact({ slug }: { slug: string }) {
  if (slug === "lumen-journal") return <LumenDiagram />;
  if (slug === "atlas-clinical") return <AtlasDiagram />;
  return null;
}
