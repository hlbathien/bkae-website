import type { CollectionConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const Announcements: CollectionConfig = {
  slug: "announcements",
  admin: { useAsTitle: "text", group: "Content" },
  access: {
    read: anyone,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  fields: [
    { name: "text", type: "text", required: true, localized: true },
    { name: "href", type: "text", required: true },
    { name: "pinned", type: "checkbox", defaultValue: false },
    { name: "expiresAt", type: "date" },
  ],
};
