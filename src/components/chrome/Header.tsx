"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const [overManifesto, setOverManifesto] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setShrunk(window.scrollY > 24);
      const m = document.getElementById("manifesto");
      if (m) {
        const r = m.getBoundingClientRect();
        setOverManifesto(r.top < 80 && r.bottom > 0);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "fixed left-0 right-0 z-40 transition-all duration-300",
          shrunk ? "top-0" : "top-[60px]",
          shrunk
            ? overManifesto
              ? "h-14 bg-[rgba(245,240,232,0.9)] backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--color-ink)]"
              : "h-14 bg-[rgba(12,12,9,0.7)] backdrop-blur-xl backdrop-saturate-150 border-b border-[var(--color-ink3)]"
            : "h-20 bg-transparent mix-blend-difference",
        )}
      >
        <div className={cn("mx-auto flex h-full max-w-[1600px] items-center justify-between px-[var(--gutter)] transition-colors duration-300", overManifesto ? "text-[var(--color-ink)]" : "text-[var(--color-ivory)]")}>
          <Link
            href="/"
            className="font-display flex items-center gap-2 text-[18px] tracking-tight"
          >
            <LogoMark size={14} className="text-[var(--color-amber)]" />
            <span>agentic engineering<span className="text-[var(--color-amber)]">.</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV.map((n) => {
              const active = pathname?.startsWith(n.href);
              return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "relative py-1 text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] transition-colors",
                  active 
                    ? "text-[var(--color-amber)]" 
                    : (overManifesto 
                      ? "text-[var(--color-ink)] hover:text-[var(--color-amber)]" 
                      : "text-[var(--color-ivory2)] hover:text-[var(--color-ivory)]")
                )}
              >
                {n.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-amber)]" />
                )}
              </Link>
            )})}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/inference-club"
              target="_blank"
              rel="noreferrer"
              className={cn(
                "hidden md:inline-flex items-center gap-2 text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] hover:text-[var(--color-amber)]",
                overManifesto ? "text-[var(--color-ink)]" : "text-[var(--color-steel-light)]"
              )}
            >
              <Github size={14} /> Github
            </a>
            <MagneticBtn
              href="/join"
              className="cta-fill border border-[var(--color-amber)] px-4 py-2 text-[var(--fs-eyebrow)] uppercase tracking-[var(--tr-eyebrow)] text-[var(--color-amber)]"
            >
              Join
            </MagneticBtn>
            <button 
              aria-label={open ? "Close menu" : "Open menu"} 
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden" 
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div 
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-[var(--color-ink)] md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex justify-end p-5">
            <button aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="px-[var(--gutter)] pt-10">
            <ul className="flex flex-col gap-6">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-[44px] text-[var(--color-ivory)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="font-display text-[44px] text-[var(--color-amber)]"
                >
                  Join →
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
