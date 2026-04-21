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
  category: string;
  author?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: p.title,
  description: p.excerpt,
  articleSection: p.category,
  url: `${SITE}/journal/${p.slug}`,
  datePublished: p.publishedAt,
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
  programmingLanguage: p.stack,
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

export function LD({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
