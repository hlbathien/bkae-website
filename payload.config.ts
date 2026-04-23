import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { searchPlugin } from "@payloadcms/plugin-search";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

import { Users } from "./src/collections/Users";
import { Media } from "./src/collections/Media";
import { Tags } from "./src/collections/Tags";
import { Members } from "./src/collections/Members";
import { Projects } from "./src/collections/Projects";
import { Posts } from "./src/collections/Posts";
import { Events } from "./src/collections/Events";
import { Announcements } from "./src/collections/Announcements";
import { Pages } from "./src/collections/Pages";

import { SiteSettings } from "./src/globals/SiteSettings";
import { ManifestoPillars } from "./src/globals/ManifestoPillars";
import { FooterGlobal } from "./src/globals/Footer";
import { Navigation } from "./src/globals/Navigation";
import { HomePage } from "./src/globals/HomePage";
import { StatsBoard } from "./src/globals/StatsBoard";
import { ProcessFlow } from "./src/globals/ProcessFlow";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: " — Inference Admin",
    },
    components: {
      graphics: {
        Logo: "@/admin/Logo",
        Icon: "@/admin/Icon",
      },
      beforeDashboard: ["@/admin/Dashboard"],
    },
    livePreview: {
      url: ({ data, collectionConfig }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
        const secret = process.env.PREVIEW_SECRET ?? "";
        const slug = (data as { slug?: string })?.slug ?? "";
        const cSlug = collectionConfig?.slug ?? "";
        return `${base}/api/preview?secret=${secret}&collection=${cSlug}&slug=${slug}`;
      },
      breakpoints: [
        { name: "mobile", label: "Mobile", width: 375, height: 667 },
        { name: "tablet", label: "Tablet", width: 768, height: 1024 },
        { name: "desktop", label: "Desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Tags,
    Members,
    Projects,
    Posts,
    Events,
    Announcements,
    Pages,
  ],
  globals: [SiteSettings, ManifestoPillars, FooterGlobal, Navigation, HomePage, StatsBoard, ProcessFlow],
  localization: {
    locales: ["en"],
    defaultLocale: "en",
    fallback: false,
  },
  editor: lexicalEditor(),
  plugins: [
    seoPlugin({
      collections: ["projects", "posts", "events", "pages", "members"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) =>
        `${(doc as { title?: string })?.title ?? "Untitled"} — Agentic Engineering`,
      generateURL: ({ doc, collectionSlug }) => {
        const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
        const slug = (doc as { slug?: string })?.slug ?? "";
        const map: Record<string, string> = {
          projects: "/projects",
          posts: "/journal",
          events: "/events",
          pages: "",
          members: "/about/members",
        };
        const key = collectionSlug ?? "";
        return `${base}${map[key] ?? ""}/${slug}`;
      },
    }),
    // NOTE: redirectsPlugin is intentionally NOT registered in v2 — its
    // middleware integration must be wired in src/middleware.ts before the
    // `redirects` collection will actually redirect. Re-enable only after
    // wiring the middleware (tracked in a future phase).
    formBuilderPlugin({
      fields: { text: true, textarea: true, select: true, email: true, checkbox: true, message: true },
      formOverrides: { slug: "forms" },
      formSubmissionOverrides: { slug: "form-submissions" },
    }),
    searchPlugin({
      collections: ["projects", "posts", "events", "members"],
      defaultPriorities: { projects: 30, posts: 20, events: 15, members: 10 },
    }),
    nestedDocsPlugin({
      collections: ["pages"],
      generateLabel: (_, doc) => (doc as { title?: string })?.title ?? "",
      generateURL: (docs) =>
        docs.reduce((url, d) => `${url}/${(d as { slug?: string }).slug ?? ""}`, ""),
    }),
  ],
  secret: (() => {
    const s = process.env.PAYLOAD_SECRET;
    if (s && s !== "__generate_with_openssl_rand_base64_32__") return s;
    // During `next build` Payload config is imported for route collection;
    // env may legitimately be absent in CI. Only hard-fail at actual runtime
    // (NEXT_PHASE not set, or phase != build).
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return "build-time-placeholder-no-runtime-use";
    }
    if (process.env.NODE_ENV === "production") {
      throw new Error("PAYLOAD_SECRET missing or placeholder in production");
    }
    return "dev-insecure-secret-do-not-use-in-prod";
  })(),
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI ||
        "postgres://payload:payload@localhost:5432/bkae",
    },
  }),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "src/payload-schema.graphql"),
  },
  upload: {
    limits: {
      fileSize: 25_000_000, // 25 MB
    },
  },
});
