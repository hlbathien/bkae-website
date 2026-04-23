import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import Tag from "@/components/primitives/Tag";
import { fetchProjects } from "@/lib/cms-server";

export const metadata = { title: "Projects" };

export default async function ProjectsIndex() {
  const projects = await fetchProjects();
  return (
    <Frame className="pt-40 pb-32">
      <p className="eyebrow mb-4">[ Index · Projects ]</p>
      <h1
        className="font-display text-[var(--color-ivory)]"
        style={{ fontSize: "clamp(48px, 8vw, 140px)" }}
      >
        Evidence,
        <br />
        <span className="font-serif-italic text-[var(--color-amber)]">not portfolio.</span>
      </h1>

      <ul className="mt-20 divide-y divide-[var(--color-ink3)] border-y border-[var(--color-ink3)]">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group grid grid-cols-12 items-center gap-4 py-10 transition-colors hover:bg-[var(--color-ink2)]"
            >
              <span className="col-span-1 text-[var(--color-amber)]">{p.index}</span>
              <span
                className="font-display col-span-7 text-[var(--color-ivory)] group-hover:text-[var(--color-amber)]"
                style={{ fontSize: "clamp(24px, 3vw, 44px)" }}
              >
                {p.title}
              </span>
              <span className="col-span-3 hidden gap-2 md:flex">
                {p.stack.slice(0, 2).map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </span>
              <span className="col-span-1 text-right text-[var(--color-amber)]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
