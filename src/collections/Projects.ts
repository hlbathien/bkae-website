import type { CollectionConfig } from "payload";
import { editorOrAdmin, publishedOrAuthed } from "../access/roles";
import { revalidateProject } from "../hooks/revalidate";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "index", "_status", "publishedAt"],
  },
  access: {
    read: publishedOrAuthed,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  hooks: { afterChange: [revalidateProject] },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "index", type: "text", required: true, admin: { description: '"01", "02"' } },
    { name: "eyebrow", type: "text", localized: true },
    { name: "problem", type: "textarea", required: true, localized: true },
    { name: "constraint", type: "textarea", required: true, localized: true },
    { name: "outcome", type: "textarea", required: true, localized: true },
    { name: "body", type: "richText", localized: true },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "stack", type: "relationship", relationTo: "tags", hasMany: true },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "number", required: true },
        { name: "suffix", type: "text" },
      ],
    },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
        {
          name: "kind",
          type: "select",
          defaultValue: "github",
          options: ["github", "demo", "paper", "video", "site"],
        },
      ],
    },
    { name: "relatedPosts", type: "relationship", relationTo: "posts", hasMany: true },
    { name: "publishedAt", type: "date" },
  ],
};
