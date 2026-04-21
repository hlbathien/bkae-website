const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://inference.club";

export const organizationLD = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agentic Engineering",
  alternateName: "Inference",
  url: SITE,
  logo: `${SITE}/logo.svg`,
  sameAs: ["https://github.com/inference-club"],
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "Ho Chi Minh City University of Technology",
    alternateName: "HCMUT",
  },
});

export const websiteLD = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE,
  name: "Agentic Engineering",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE}/search?q={query}`,
    "query-input": "required name=query",
  },
});

export const breadcrumbLD = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((i, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: i.name,
    item: i.url,
  })),
});

export const articleLD = (p: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  modifiedAt?: string;
  category: string;
  author?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: p.title,
  description: p.excerpt,
  articleSection: p.category,
  url: `${SITE}/journal/${p.slug}`,
  datePublished: p.publishedAt,
  dateModified: p.modifiedAt ?? p.publishedAt,
  image: p.image ?? `${SITE}/api/og?title=${encodeURIComponent(p.title)}&kind=journal`,
  author: { "@type": "Person", name: p.author ?? "Agentic Engineering" },
  publisher: organizationLD(),
});

export const creativeWorkLD = (p: {
  title: string;
  slug: string;
  problem: string;
  stack: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: p.title,
  description: p.problem,
  url: `${SITE}/projects/${p.slug}`,
  programmingLanguage: p.stack.join(", "),
  creator: organizationLD(),
});

export const personLD = (m: { name: string; slug: string; role: string; bio: string }) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: m.name,
  jobTitle: m.role,
  description: m.bio,
  url: `${SITE}/about/members/${m.slug}`,
  affiliation: organizationLD(),
});

// Escape characters that would break out of a <script> tag or JS string.
// U+2028/U+2029 are invisible line terminators valid in JSON but illegal
// as raw JS source, so we escape via their hex code points.
const LS = " ";
const PS = " ";

function safeJson(data: unknown): string {
  return JSON.stringify(data)
    .split("<").join("\\u003c")
    .split(">").join("\\u003e")
    .split("&").join("\\u0026")
    .split(LS).join("\\u2028")
    .split(PS).join("\\u2029");
}

export function LD({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}
