"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";

export type Hit = { title: string; href: string; kind: string };

export default function SearchClient({ catalog }: { catalog: Hit[] }) {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    if (!q.trim()) return catalog;
    const needle = q.toLowerCase();
    return catalog.filter(
      (h) => h.title.toLowerCase().includes(needle) || h.kind.toLowerCase().includes(needle),
    );
  }, [q, catalog]);

  return (
    <Frame className="pt-40 pb-24">
      <p className="eyebrow mb-4">[ Search ]</p>
      <label className="block">
        <span className="sr-only">Search</span>
        <input
          autoFocus
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="search projects, journal, pages…"
          className="w-full border-b border-[var(--color-ink3)] bg-transparent py-3 font-display text-[var(--color-ivory)] text-3xl md:text-5xl outline-none focus:border-[var(--color-amber)]"
          data-cursor="text"
        />
      </label>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[var(--color-steel)]">
        {hits.length} result{hits.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-8 divide-y divide-[var(--color-ink3)]">
        {hits.map((h) => (
          <li key={h.href}>
            <Link
              href={h.href}
              className="grid grid-cols-[120px_1fr] gap-6 py-5 text-[var(--color-ivory)] hover:text-[var(--color-amber)]"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-amber)]">
                {h.kind}
              </span>
              <span>{h.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
