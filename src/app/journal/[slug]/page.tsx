import { notFound } from "next/navigation";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import { posts } from "@/lib/cms";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return { title: p?.title ?? "Post" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();

  return (
    <Frame className="pt-40 pb-32">
      <Link
        href="/journal"
        className="bracket-link text-[11px] uppercase tracking-[0.22em] text-[var(--color-steel-light)] hover:text-[var(--color-amber)]"
      >
        ← All posts
      </Link>

      <article className="mx-auto mt-12 max-w-3xl">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[var(--color-steel)]">
          <span className="text-[var(--color-amber)]">{p.category}</span>
          <span>·</span>
          <span>{p.readingTime}</span>
          <span>·</span>
          <span>{p.publishedAt}</span>
        </div>
        <h1
          className="font-display mt-6 text-[var(--color-ivory)]"
          style={{ fontSize: "clamp(36px, 6vw, 88px)" }}
        >
          {p.title}
        </h1>

        <p className="font-serif-italic mt-8 text-[var(--color-amber)]" style={{ fontSize: "24px" }}>
          {p.excerpt}
        </p>

        <div className="mt-12 space-y-6 text-[var(--color-ivory2)] text-[16px] leading-relaxed">
          <p>
            (Long-form body rendered from CMS rich-text. This wireframe stub demonstrates the
            typographic rhythm: monospace body, serif italic pull-quote, ample negative space.)
          </p>
          <p>
            Future Payload integration will hydrate this region with structured content blocks:
            paragraphs, code, callouts, image grids.
          </p>
        </div>
      </article>
    </Frame>
  );
}
