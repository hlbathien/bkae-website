"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ToCItem {
  id: string;
  text: string;
}

export default function ToCRail() {
  const [items, setItems] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 and h3 inside article
    const headings = Array.from(document.querySelectorAll("article h2, article h3"));
    const tocItems = headings.map((h) => {
      if (!h.id) {
        h.id = h.textContent?.toLowerCase().replace(/\s+/g, "-") || Math.random().toString(36).substr(2, 9);
      }
      return { id: h.id, text: h.textContent || "" };
    });
    
    // Defer to avoid cascading renders warning
    const t = setTimeout(() => {
      setItems(tocItems);
    }, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach((h) => observer.observe(h));

    return () => {
      clearTimeout(t);
      headings.forEach((h) => observer.unobserve(h));
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <nav className="fixed right-[var(--gutter)] top-1/2 -translate-y-1/2 z-40 hidden xl:block w-48">
      <p className="eyebrow mb-6 text-[10px] opacity-40">Contents</p>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "group flex items-center gap-3 text-[10px] uppercase tracking-widest transition-colors",
                activeId === item.id ? "text-[var(--color-amber)]" : "text-[var(--color-steel)] hover:text-[var(--color-ivory)]"
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className={cn(
                "h-[1px] bg-current transition-all duration-300",
                activeId === item.id ? "w-6" : "w-2 group-hover:w-4"
              )} />
              <span className="truncate">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
