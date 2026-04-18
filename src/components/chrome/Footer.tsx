"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Clock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
    });
    const t = setInterval(() => setNow(fmt.format(new Date())), 1000);
    setNow(fmt.format(new Date()));
    return () => clearInterval(t);
  }, []);
  return <span suppressHydrationWarning>{now} ICT</span>;
}

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-[var(--color-ink3)] bg-[var(--color-ink)]">
      <div className="mx-auto max-w-[1600px] px-[var(--gutter)] pt-20 pb-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-3">Inference</p>
            <p className="text-[var(--color-steel-light)] max-w-xs">
              Agentic Engineering at HCMUT. Bounded LLMs. Contract-based pipelines. Shipped systems.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Sitemap</p>
            <ul className="space-y-2 text-[var(--color-ivory2)]">
              <li>
                <Link href="/projects" className="draw-underline">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/journal" className="draw-underline">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/manifesto" className="draw-underline">
                  Manifesto
                </Link>
              </li>
              <li>
                <Link href="/join" className="draw-underline">
                  Join
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Contact</p>
            <ul className="space-y-2 text-[var(--color-ivory2)]">
              <li>
                <a className="draw-underline" href="mailto:hello@inference.club">
                  hello@inference.club
                </a>
              </li>
              <li>
                <a className="draw-underline" href="https://github.com/inference-club">
                  github/inference-club
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">Colophon</p>
            <ul className="space-y-2 text-[var(--color-steel-light)]">
              <li>Type: Syne · Instrument Serif · DM Mono</li>
              <li>Stack: Next.js 15 · GSAP · Lenis · Payload</li>
              <li>Deploy: Vercel · Neon · R2</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
          <span>
            Crafted in{" "}
            <span className="font-serif-italic text-[var(--color-amber)] normal-case">
              Ho Chi Minh City
            </span>
          </span>
          <Clock />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none overflow-hidden"
        style={{ maxHeight: "20vw" }}
      >
        <h2
          className="font-display text-[var(--color-ink2)] leading-[0.85] text-center"
          style={{ fontSize: "clamp(80px, 22vw, 380px)", marginBottom: "-0.35em" }}
        >
          INFERENCE
        </h2>
      </div>
    </footer>
  );
}
