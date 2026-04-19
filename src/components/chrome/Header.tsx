"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoMark from "@/components/primitives/LogoMark";
import MagneticBtn from "@/components/motion/MagneticBtn";

const NAV = [
  { href: "/projects", label: "Projects" },
  { href: "/journal", label: "Journal" },
  { href: "/manifesto", label: "Manifesto" },
];

export default function Header() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "fixed left-0 right-0 top-9 z-40 transition-[height,background] duration-300",
          shrunk
            ? "h-14 bg-[rgba(12,12,9,0.7)] backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--color-ink3)]"
            : "h-20 bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-[var(--gutter)]">
          <Link
            href="/"
            className="font-display flex items-center gap-2 text-[18px] tracking-tight text-[var(--color-ivory)]"
          >
            <LogoMark size={14} className="text-[var(--color-amber)]" />
            <span>agentic engineering<span className="text-[var(--color-amber)]">.</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="draw-underline text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--color-ivory2)] hover:text-[var(--color-ivory)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/inference-club"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-2 text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--color-steel-light)] hover:text-[var(--color-amber)]"
            >
              <Github size={14} /> Github
            </a>
            <MagneticBtn
              href="/join"
              className="cta-fill border border-[var(--color-amber)] px-4 py-2 text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--color-amber)]"
            >
              Join
            </MagneticBtn>
            <button aria-label="Open menu" className="md:hidden" onClick={() => setOpen(true)}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-[var(--color-ink)] md:hidden">
          <div className="flex justify-end p-5">
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-[var(--gutter)] pt-10">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-display text-[44px] text-[var(--color-ivory)]"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="font-display text-[44px] text-[var(--color-amber)]"
            >
              Join →
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
