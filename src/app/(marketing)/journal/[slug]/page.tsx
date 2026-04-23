import { notFound } from "next/navigation";
import Link from "next/link";
import Frame from "@/components/primitives/Frame";
import { fetchPost, fetchPosts } from "@/lib/cms-server";
import ReadingProgress from "@/components/chrome/ReadingProgress";
import ToCRail from "@/components/chrome/ToCRail";
import QwenPulse from "@/components/motion/QwenPulse";
import { LD, articleLD, breadcrumbLD } from "@/lib/jsonld";

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await fetchPost(slug);
  return { title: p?.title ?? "Post" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await fetchPost(slug);
  if (!p) notFound();

  // Demonstration content to showcase pull-quotes and dropcap
  const content = [
    "Software engineering is entering a phase of radical containment. The era of the open-ended prompt is closing, replaced by the necessity of the bounded pipeline. We no longer ask what a model can do; we define what it must not do. This is the essence of Agentic Engineering.",
    "## The Contractual Layer",
    "Every LLM invocation must be wrapped in a contract. If the input does not match the schema, the process refuses to initiate. If the output diverges from the expected JSON structure, it is rejected and re-routed. Uncertainty is handled as a first-class citizen, not a fallback.",
    "> \"Unsupported claims return uncertainty, not prose. Silence is a feature of a robust system.\"",
    "## Deterministic Edges",
    "While the core of our systems may be probabilistic, the edges must remain deterministic. Classifiers, extractors, and validators are pure functions that constrain the stochastic nature of the underlying models. This is how we build software that ships with confidence.",
  ];

  const firstParagraph = content[0];
  const dropcapChar = firstParagraph.charAt(0);
  const remainingText = firstParagraph.slice(1);

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

          <div className="mt-12 space-y-8 text-[var(--color-ivory2)] text-[18px] leading-relaxed">
            {/* First paragraph with dropcap */}
            <p className="relative">
              <span className="font-serif-italic float-left mr-4 mt-2 text-[6em] leading-[0.8] text-[var(--color-amber)] select-none">
                {dropcapChar}
              </span>
              {remainingText}
            </p>

            {/* Rest of content */}
            {content.slice(1).map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} id={block.slice(3).toLowerCase().replace(/\s+/g, "-")} className="font-display text-[var(--fs-display-s)] pt-4 text-[var(--color-ivory)]">
                    {block.slice(3)}
                  </h2>
                );
              }
              if (block.startsWith("> ")) {
                return (
                  <blockquote key={i} className="border-l-2 border-[var(--color-amber)] pl-8 py-4 my-12">
                    <p className="font-serif-italic text-[28px] leading-tight text-[var(--color-amber-pale)]">
                      {block.slice(2).replace(/"/g, "")}
                    </p>
                  </blockquote>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </div>
        </article>
      </Frame>
    </>
  );
}
