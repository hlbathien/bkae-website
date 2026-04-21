import type { CollectionConfig } from "payload";
import { editorOrAdmin, publishedOrAuthed } from "../access/roles";
import { computeReadingTime } from "../hooks/readingTime";
import { revalidatePost } from "../hooks/revalidate";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "_status", "publishedAt"],
  },
  access: {
    read: publishedOrAuthed,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  hooks: {
    beforeChange: [computeReadingTime],
    afterChange: [revalidatePost],
  },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "excerpt", type: "textarea", required: true, localized: true },
    { name: "cover", type: "upload", relationTo: "media" },
    { name: "category", type: "relationship", relationTo: "tags" },
    { name: "tags", type: "relationship", relationTo: "tags", hasMany: true },
    { name: "author", type: "relationship", relationTo: "members" },
    { name: "body", type: "richText", localized: true },
    { name: "readingTime", type: "text", admin: { readOnly: true } },
    { name: "publishedAt", type: "date" },
  ],
};
