"use client";
import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "view" | "read" | "drag" | "magnet" | "text";

const LABELS: Partial<Record<CursorState, string>> = {
  view: "VIEW",
  read: "READ →",
  drag: "DRAG",
};

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const stateRef = useRef<CursorState>("default");
  const targetRef = useRef<HTMLElement | null>(null);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    // Only hide OS cursor once custom cursor is live. Touch devices stay on
    // the native pointer path, but reduced-motion should not disable the
    // cursor entirely.
    document.body.classList.add("no-cursor");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: gate cursor render on feature-detected capability
    setActive(true);

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

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

    const onOver = (e: MouseEvent) => {
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
    const tick = () => {
      // Magnet snap to target center
      if (stateRef.current === "magnet" && targetRef.current) {
        const r = targetRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        rx += (cx - rx) * 0.22;
        ry += (cy - ry) * 0.22;
      } else {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("no-cursor");
      setActive(false);
    };
  }, []);

  const ringClass: Record<CursorState, string> = {
    default: "h-8 w-8 border-[var(--color-amber)]",
    link: "h-11 w-11 border-[var(--color-amber)] bg-[rgba(212,135,10,0.12)]",
    view: "h-20 w-20 border-[var(--color-amber)] bg-[rgba(12,12,9,0.55)] backdrop-blur-sm",
    read: "h-16 w-12 border-[var(--color-amber)] rounded-none",
    drag: "h-16 w-16 border-[var(--color-amber)] bg-[rgba(212,135,10,0.08)]",
    magnet: "h-14 w-14 border-[var(--color-amber-hot)]",
    text: "h-6 w-[2px] border-0 bg-[var(--color-amber)] rounded-none",
  };

  const dotHidden = state === "link" || state === "view" || state === "read" || state === "text";
  const labelText = LABELS[state];

  if (!active) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[60] rounded-full border mix-blend-difference transition-[width,height,background,border-color,border-radius] duration-200 ease-out flex items-center justify-center ${ringClass[state]}`}
      >
        {labelText && (
          <span
            ref={label}
            className="font-[var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-[var(--color-ivory)] mix-blend-difference"
          >
            {labelText}
          </span>
        )}
      </div>
      <div
        ref={dot}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[60] h-1.5 w-1.5 rounded-full bg-[var(--color-amber)] transition-opacity duration-150 ${
          dotHidden ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  );
}
