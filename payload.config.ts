import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

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
  globals: [SiteSettings, ManifestoPillars, FooterGlobal, Navigation, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-insecure-secret",
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
