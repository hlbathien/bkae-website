import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";

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
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
      ...ALLOW_AI.map((userAgent) => ({ userAgent, allow: "/" })),
      ...DISALLOW_AI.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    host: SITE,
    sitemap: [`${SITE}/sitemap.xml`],
  };
}
