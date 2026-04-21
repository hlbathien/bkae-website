import type { CollectionConfig } from "payload";
import { editorOrAdmin, publishedOrAuthed } from "../access/roles";

export const Members: CollectionConfig = {
  slug: "members",
  admin: { useAsTitle: "name", group: "Content", defaultColumns: ["name", "role", "active"] },
  access: {
    read: publishedOrAuthed,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "role", type: "text", required: true },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "joinedAt", type: "date" },
    { name: "active", type: "checkbox", defaultValue: true },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
        {
          name: "kind",
          type: "select",
          options: ["github", "x", "linkedin", "site", "email"],
          defaultValue: "site",
        },
      ],
    },
  ],
};
