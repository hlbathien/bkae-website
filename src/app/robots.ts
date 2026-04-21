import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";

const PRIVATE = ["/admin", "/api/preview", "/api/revalidate", "/api/join"];

const ALLOW_AI = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
];

const DISALLOW_AI = ["CCBot", "Bytespider", "ImagesiftBot", "Amazonbot", "Diffbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default crawlers (Googlebot, Bingbot, Twitterbot, LinkedInBot, etc.):
      // allow everything except admin/state-changing endpoints. /api/og and
      // /api/rss must remain reachable for social unfurl.
      {
        userAgent: "*",
        allow: ["/", "/api/og", "/api/rss"],
        disallow: PRIVATE,
      },
      // Each AI UA must repeat the private disallow — most-specific UA match
      // wins, so the * rule won't apply to them otherwise.
      ...ALLOW_AI.map((userAgent) => ({
        userAgent,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: PRIVATE,
      })),
      ...DISALLOW_AI.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: [`${SITE}/sitemap.xml`],
  };
}
