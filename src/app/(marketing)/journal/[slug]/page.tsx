import { notFound } from "next/navigation";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import { fetchPost, fetchPosts } from "@/lib/cms-server";
import ReadingProgress from "@/components/chrome/ReadingProgress";
import ToCRail from "@/components/chrome/ToCRail";
import QwenPulse from "@/components/motion/QwenPulse";
import { LD, articleLD, breadcrumbLD } from "@/lib/jsonld";
import { renderMd } from "@/lib/markdown";

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts
    .map((p) => ({ slug: typeof p.slug === "string" ? p.slug : "" }))
    .filter((x) => x.slug.length > 0);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await fetchPost(slug);
  return { title: p?.title ?? "Post" };
}

/**
 * Lexical → Markdown fallback. Produces *acceptable* markdown for the
 * subset of nodes Payload's default rich-text editor emits. Used only when
 * `bodyMarkdown` is empty and a legacy `body` lexical document is set.
 */
function lexicalToMarkdown(node: unknown, depth = 0): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  const type = n.type as string | undefined;
  const tag = n.tag as string | undefined;
  const text = n.text as string | undefined;
  const format = n.format as number | string | undefined;
  const children = (n.children as unknown[]) ?? [];

  // Leaf text
  if (type === "text" && typeof text === "string") {
    let t = text;
    if (typeof format === "number") {
      // Lexical bitmask: 1=bold,2=italic,4=strike,8=underline,16=code
      if (format & 16) t = "`" + t + "`";
      if (format & 4) t = "~~" + t + "~~";
      if (format & 2) t = "_" + t + "_";
      if (format & 1) t = "**" + t + "**";
    }
    return t;
  }

  const inner = children.map((c) => lexicalToMarkdown(c, depth + 1)).join("");

  switch (type) {
    case "root":
      return children.map((c) => lexicalToMarkdown(c, depth)).join("\n\n");
    case "heading": {
      const lv = parseInt((tag ?? "h2").replace("h", ""), 10) || 2;
      return "#".repeat(Math.min(6, Math.max(1, lv))) + " " + inner;
    }
    case "paragraph":
      return inner;
    case "quote":
      return inner
        .split("\n")
        .map((l) => "> " + l)
        .join("\n");
    case "list": {
      const ordered = (n.listType as string) === "number" || (n.tag as string) === "ol";
      return children
        .map((c, i) => {
          const childInner = lexicalToMarkdown(c, depth + 1);
          return ordered ? `${i + 1}. ${childInner}` : `- ${childInner}`;
        })
        .join("\n");
    }
    case "listitem":
      return inner;
    case "linebreak":
      return "  \n";
    case "link": {
      const fields = (n.fields as Record<string, unknown> | undefined) ?? {};
      const url = (fields.url as string) ?? (n.url as string) ?? "#";
      return `[${inner}](${url})`;
    }
    case "code":
      return "```\n" + inner + "\n```";
    default:
      return inner;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await fetchPost(slug);
  if (!p) notFound();

  const md = (p.bodyMarkdown ?? "").trim();
  const fallback = !md && p.body ? lexicalToMarkdown((p.body as { root?: unknown }).root) : "";
  const source = md || fallback;
  const html = renderMd(source);
  const hasContent = html.length > 0;

  return (
    <>
      <LD
        data={articleLD({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          publishedAt: p.publishedAt,
          category: p.category,
        })}
      />
      <LD
        data={breadcrumbLD([
          { name: "Home", url: "/" },
          { name: "Journal", url: "/journal" },
          { name: p.title, url: `/journal/${p.slug}` },
        ])}
      />
      <ReadingProgress />
      <ToCRail />

      {/* Easter egg: Qwen pulse */}
      {slug === "qwen-hackathon" && <QwenPulse />}

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

          <p
            className="font-serif-italic mt-8 text-[var(--color-amber)]"
            style={{ fontSize: "24px" }}
          >
            {p.excerpt}
          </p>

          {hasContent ? (
            <div
              className="post-content mt-12 text-[var(--color-ivory2)] text-[18px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <p className="mt-12 text-[var(--color-steel)] italic">No body content yet.</p>
          )}
        </article>
      </Frame>
    </>
  );
}
