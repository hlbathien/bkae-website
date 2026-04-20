"use client";
import { useEffect, useRef, useState } from "react";

export type CursorState = 
  | "default" | "link" | "view" | "read" | "drag" | "magnet" | "text"
  | "disabled" | "copy" | "next" | "prev" | "external" | "play" | "pinned";

const LABELS: Partial<Record<CursorState, string>> = {
  view: "VIEW",
  read: "READ →",
  drag: "DRAG",
  copy: "COPY",
  disabled: "×",
  next: "→",
  prev: "←",
  external: "↗",
  play: "▶",
};

interface CursorMetrics {
  w: number;
  h: number;
  r: number;
  bgOpacity: number;
  borderClass: string;
  bgRGB: string;
}

const STATE_METRICS: Record<CursorState, CursorMetrics> = {
  default: { w: 32, h: 32, r: 16, bgOpacity: 0, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  link: { w: 44, h: 44, r: 22, bgOpacity: 0.12, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  view: { w: 80, h: 80, r: 40, bgOpacity: 0.55, bgRGB: "12,12,9", borderClass: "border-[var(--color-amber)]" },
  read: { w: 48, h: 64, r: 0, bgOpacity: 0, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  drag: { w: 64, h: 64, r: 32, bgOpacity: 0.08, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  magnet: { w: 56, h: 56, r: 28, bgOpacity: 0, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber-hot)]" },
  text: { w: 2, h: 24, r: 0, bgOpacity: 1, bgRGB: "212,135,10", borderClass: "border-transparent" },
  disabled: { w: 40, h: 40, r: 20, bgOpacity: 0.1, bgRGB: "212,135,10", borderClass: "border-[var(--color-steel)]" },
  copy: { w: 64, h: 64, r: 32, bgOpacity: 0.2, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  next: { w: 56, h: 56, r: 28, bgOpacity: 0.1, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  prev: { w: 56, h: 56, r: 28, bgOpacity: 0.1, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  external: { w: 56, h: 56, r: 28, bgOpacity: 0.1, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  play: { w: 64, h: 64, r: 32, bgOpacity: 0.15, bgRGB: "212,135,10", borderClass: "border-[var(--color-amber)]" },
  pinned: { w: 20, h: 20, r: 10, bgOpacity: 1, bgRGB: "212,135,10", borderClass: "border-transparent" },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const trailRef = useRef<(HTMLDivElement | null)[]>([]);
  const ripplesRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<CursorState>("default");
  const stateRef = useRef<CursorState>("default");
  const targetRef = useRef<HTMLElement | null>(null);

  const [active, setActive] = useState(false);
  const [overIvory, setOverIvory] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia("(hover: none)").matches) return;

    document.body.classList.add("no-cursor");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    
    // Physics targets for main ring
    let cw = 32, ch = 32, cr = 16, cBgAlpha = 0;
    
    // Trail state
    let lastSampleTime = performance.now();
    const trailData = [{x: mx, y: my}, {x: mx, y: my}, {x: mx, y: my}];
    
    // Orbit state
    let idleTime = 0;
    let lastMx = mx;
    let lastMy = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const spawnRipple = () => {
      if (!ripplesRef.current) return;
      const r = document.createElement("div");
      r.className = "absolute left-0 top-0 rounded-full pointer-events-none mix-blend-difference";
      r.style.width = "40px";
      r.style.height = "40px";
      r.style.background = "radial-gradient(circle, var(--color-amber) 0%, transparent 70%)";
      r.style.transform = `translate3d(${mx - 20}px, ${my - 20}px, 0) scale(0)`;
      r.style.opacity = "1";
      r.style.transition = "transform 450ms cubic-bezier(0.19, 1, 0.22, 1), opacity 450ms ease-out";
      
      ripplesRef.current.appendChild(r);
      
      requestAnimationFrame(() => {
        r.style.transform = `translate3d(${mx - 20}px, ${my - 20}px, 0) scale(1.4)`;
        r.style.opacity = "0";
        setTimeout(() => {
          if (r.parentNode) r.parentNode.removeChild(r);
        }, 450);
      });
    };

    const onClick = () => {
      spawnRipple();
    };
    window.addEventListener("mousedown", onClick);

    const findTarget = (el: EventTarget | null): { el: HTMLElement; state: CursorState } | null => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.cursor) {
          return { el: node, state: node.dataset.cursor as CursorState };
        }
        if (node.tagName === "A" || node.tagName === "BUTTON") {
          return { el: node, state: "link" };
        }
        node = node.parentElement;
      }
      return null;
    };

    const isOverIvory = (el: EventTarget | null): boolean => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        if (node.dataset && node.dataset.section === "manifesto") return true;
        node = node.parentElement;
      }
      return false;
    };

    const onOver = (e: MouseEvent) => {
      setOverIvory(isOverIvory(e.target));
      const hit = findTarget(e.target);
      if (hit) {
        targetRef.current = hit.el;
        stateRef.current = hit.state;
        setState(hit.state);
      } else {
        targetRef.current = null;
        stateRef.current = "default";
        setState("default");
      }
    };
    document.addEventListener("mouseover", onOver);

    let raf = 0;
    const tick = (time: DOMHighResTimeStamp) => {
      const st = stateRef.current;
      const targetMetrics = STATE_METRICS[st];
      
      // Update sizes
      cw = lerp(cw, targetMetrics.w, 0.18);
      ch = lerp(ch, targetMetrics.h, 0.18);
      cr = lerp(cr, targetMetrics.r, 0.18);
      cBgAlpha = lerp(cBgAlpha, targetMetrics.bgOpacity, 0.18);

      // Idle orbit calc
      const dx = mx - lastMx;
      const dy = my - lastMy;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        idleTime += 16; // approx ms per frame
      } else {
        idleTime = 0;
      }
      lastMx = mx;
      lastMy = my;

      let orbitScale = 1;
      if (!reducedMotion && idleTime >= 1200) {
        // lerp 1.0 -> 1.06 -> 1.0 over 2400ms
        const loopT = ((idleTime - 1200) % 2400) / 2400;
        orbitScale = 1 + Math.sin(loopT * Math.PI * 2) * 0.06;
      }

      // Magnet snap to target center
      if (st === "magnet" && targetRef.current) {
        const r = targetRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        rx += (cx - rx) * 0.22;
        ry += (cy - ry) * 0.22;
      } else {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
      }

      // Update trail positions
      if (!reducedMotion && time - lastSampleTime > 20) {
        trailData.unshift({x: rx, y: ry});
        trailData.pop();
        lastSampleTime = time;
      }

      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      }
      if (ring.current) {
        const bg = `rgba(${targetMetrics.bgRGB}, ${cBgAlpha})`;
        ring.current.style.width = `${cw}px`;
        ring.current.style.height = `${ch}px`;
        ring.current.style.borderRadius = `${cr}px`;
        ring.current.style.background = bg;
        ring.current.style.transform = `translate3d(${rx - cw/2}px, ${ry - ch/2}px, 0) scale(${orbitScale})`;
      }
      
      if (!reducedMotion) {
        trailRef.current.forEach((t, i) => {
          if (t) {
            const td = trailData[i];
            const size = cw * 0.8; 
            t.style.width = `${size}px`;
            t.style.height = `${size}px`;
            t.style.borderRadius = `${cr * 0.8}px`;
            t.style.transform = `translate3d(${td.x - size/2}px, ${td.y - size/2}px, 0)`;
          }
        });
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("no-cursor");
      setActive(false);
    };
  }, []);

  const dotHidden = ["link", "view", "read", "text", "pinned"].includes(state);
  const labelText = LABELS[state];
  const targetMetrics = STATE_METRICS[state];

  if (!active) return null;

  return (
    <>
      <div ref={ripplesRef} className="fixed inset-0 pointer-events-none z-[59]" />
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[60] border flex items-center justify-center transition-colors duration-200 ${targetMetrics.borderClass} ${overIvory ? "mix-blend-normal !border-[var(--color-ink)]" : "mix-blend-difference"}`}
        style={{ willChange: "transform, width, height" }}
      >
        {labelText && (
          <span
            className={`font-[var(--font-mono)] text-[9px] uppercase tracking-[0.18em] ${overIvory ? "text-[var(--color-ink)] mix-blend-normal" : "text-[var(--color-ivory)] mix-blend-difference"}`}
          >
            {labelText}
          </span>
        )}
      </div>
      
      {/* Trail */}
      <div ref={el => { trailRef.current[0] = el; }} aria-hidden className={`pointer-events-none fixed left-0 top-0 z-[58] border opacity-40 will-change-transform ${overIvory ? "border-[var(--color-ink)] mix-blend-normal" : "border-[var(--color-amber)] mix-blend-difference"}`} />
      <div ref={el => { trailRef.current[1] = el; }} aria-hidden className={`pointer-events-none fixed left-0 top-0 z-[58] border opacity-25 will-change-transform ${overIvory ? "border-[var(--color-ink)] mix-blend-normal" : "border-[var(--color-amber)] mix-blend-difference"}`} />
      <div ref={el => { trailRef.current[2] = el; }} aria-hidden className={`pointer-events-none fixed left-0 top-0 z-[58] border opacity-[0.12] will-change-transform ${overIvory ? "border-[var(--color-ink)] mix-blend-normal" : "border-[var(--color-amber)] mix-blend-difference"}`} />

      <div
        ref={dot}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[61] h-1.5 w-1.5 rounded-full transition-opacity duration-150 will-change-transform ${overIvory ? "bg-[var(--color-ink)]" : "bg-[var(--color-amber)]"} ${
          dotHidden ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
