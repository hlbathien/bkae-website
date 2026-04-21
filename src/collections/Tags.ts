import type { CollectionConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: { useAsTitle: "name", group: "Taxonomy" },
  access: {
    read: anyone,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "topic",
      options: [
        { label: "Stack", value: "stack" },
        { label: "Topic", value: "topic" },
        { label: "Category", value: "category" },
      ],
    },
  ],
};
