import { fetchPosts } from "@/lib/cms-server";

export const revalidate = 3600;

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";
  const posts = await fetchPosts();
  const items = posts
    .map(
      (p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${SITE}/journal/${p.slug}</link>
  <guid>${SITE}/journal/${p.slug}</guid>
  <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
  <description>${esc(p.excerpt)}</description>
  <category>${esc(p.category)}</category>
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Agentic Engineering — Journal</title>
    <link>${SITE}/journal</link>
    <atom:link href="${SITE}/api/rss" rel="self" type="application/rss+xml"/>
    <description>Field notes from bounded LLM engineering at HCMUT.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
