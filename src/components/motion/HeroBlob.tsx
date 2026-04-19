"use client";
import { useEffect, useRef } from "react";

/**
 * HeroBlob — WebGL amber field w/ fbm noise.
 * Tracks cursor w/ lag. Renders continuously. Full-bleed inside hero.
 * Gracefully degrades under reduced-motion / no-WebGL.
 */
export default function HeroBlob() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = holder.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      try {
        const { Renderer, Program, Mesh, Triangle } = await import("ogl");
        if (cancelled) return;

        const renderer = new Renderer({
          alpha: true,
          antialias: false,
          premultipliedAlpha: false,
          dpr: Math.min(window.devicePixelRatio || 1, 1.5),
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.style.position = "absolute";
        canvas.style.inset = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        canvas.style.pointerEvents = "none";
        el.appendChild(canvas);

        const vertex = /* glsl */ `
          attribute vec2 position;
          varying vec2 vUv;
          void main() {
            vUv = position * 0.5 + 0.5;
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `;
        const fragment = /* glsl */ `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uRes;
          uniform vec2 uMouse;

          float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
          float noise(vec2 p) {
            vec2 i = floor(p); vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }
          float fbm(vec2 p) {
            float v = 0.0; float a = 0.5;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p *= 2.02;
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv;
            float ar = uRes.x / max(uRes.y, 1.0);
            vec2 aspect = vec2(ar, 1.0);
            vec2 p = (uv - 0.5) * aspect;
            vec2 m = (uMouse - 0.5) * aspect;

            float d = distance(p, m);
            float n = fbm(p * 1.4 + uTime * 0.05);

            // Main blob — larger, warmer
            float radius = 0.55 + n * 0.22;
            float blob = smoothstep(radius, 0.0, d);

            // Halo falloff — reaches across the hero
            float halo = smoothstep(1.3, 0.0, d) * 0.55;

            // Secondary amber hot-spot offset, drifts w/ time
            vec2 m2 = m + vec2(cos(uTime * 0.15) * 0.12, sin(uTime * 0.18) * 0.08);
            float d2 = distance(p, m2);
            float hot = smoothstep(0.18, 0.0, d2);

            vec3 amber    = vec3(0.835, 0.529, 0.039);
            vec3 amberHot = vec3(0.941, 0.627, 0.125);
            vec3 color = mix(amber, amberHot, clamp(blob + hot * 0.6, 0.0, 1.0));

            // Alpha composition — strong enough to read on ink bg,
            // subtle enough to stay "breathing lamp in dark room".
            float alpha = blob * 0.55 + halo * 0.22 + hot * 0.25;

            // Vignette edges to protect layout
            float edge = smoothstep(1.2, 0.6, length((uv - 0.5) * aspect));
            alpha *= edge;

            // Film grain (very subtle, breaks banding on dark gradient)
            float grain = (hash(gl_FragCoord.xy + uTime * 60.0) - 0.5) * 0.03;
            alpha = clamp(alpha + grain, 0.0, 1.0);

            gl_FragColor = vec4(color, alpha);
          }
        `;

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            uTime: { value: 0 },
            uRes: { value: [1, 1] },
            uMouse: { value: [0.22, 0.55] },
          },
          transparent: true,
        });
        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
          const r = el.getBoundingClientRect();
          const w = Math.max(1, r.width);
          const h = Math.max(1, r.height);
          renderer.setSize(w, h);
          // ogl's setSize writes CSS width/height to px — re-assert fluid 100%
          canvas.style.width = "100%";
          canvas.style.height = "100%";
          program.uniforms.uRes.value = [w, h];
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(el);
        window.addEventListener("resize", resize);

        // Default position — off-center, behind hero left negative space, not the title.
        let tx = 0.22;
        let ty = 0.55;
        let cx = tx;
        let cy = ty;
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          tx = (e.clientX - r.left) / r.width;
          ty = 1 - (e.clientY - r.top) / r.height;
        };
        window.addEventListener("mousemove", onMove, { passive: true });

        // Pause render loop when hero scrolled out of view to save GPU
        let inView = true;
        const io = new IntersectionObserver(
          (entries) => {
            inView = entries[0]?.isIntersecting ?? true;
          },
          { threshold: 0.01 },
        );
        io.observe(el);

        let raf = 0;
        const start = performance.now();
        const loop = () => {
          raf = requestAnimationFrame(loop);
          if (!inView) return;
          const t = (performance.now() - start) / 1000;
          cx += (tx - cx) * 0.06;
          cy += (ty - cy) * 0.06;
          program.uniforms.uTime.value = t;
          program.uniforms.uMouse.value = [cx, cy];
          renderer.render({ scene: mesh });
        };
        raf = requestAnimationFrame(loop);

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          io.disconnect();
          window.removeEventListener("resize", resize);
          window.removeEventListener("mousemove", onMove);
          if (canvas.parentElement === el) el.removeChild(canvas);
          const loseCtx = gl.getExtension("WEBGL_lose_context");
          loseCtx?.loseContext();
        };
      } catch {
        // WebGL unavailable → silent fallback; CSS radial provides base ambience
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={holder}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{
        // CSS fallback — always visible even if WebGL fails
        background:
          "radial-gradient(55% 45% at 22% 55%, rgba(212,135,10,0.22) 0%, rgba(212,135,10,0.08) 35%, transparent 70%)",
      }}
    />
  );
}
