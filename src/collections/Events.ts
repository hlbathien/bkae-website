import type { CollectionConfig } from "payload";
import { editorOrAdmin, publishedOrAuthed } from "../access/roles";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "startsAt", "_status"],
  },
  access: {
    read: publishedOrAuthed,
    create: editorOrAdmin,
    update: editorOrAdmin,
    delete: editorOrAdmin,
  },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    { name: "title", type: "text", required: true, localized: true },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "startsAt", type: "date", required: true },
    { name: "endsAt", type: "date" },
    {
      name: "location",
      type: "group",
      fields: [
        { name: "name", type: "text" },
        { name: "url", type: "text" },
        { name: "lat", type: "number" },
        { name: "lng", type: "number" },
      ],
    },
    { name: "capacity", type: "number" },
    { name: "rsvpUrl", type: "text" },
    { name: "speakers", type: "relationship", relationTo: "members", hasMany: true },
    { name: "summary", type: "textarea", localized: true },
    { name: "recapBody", type: "richText", localized: true },
    { name: "recapMedia", type: "upload", relationTo: "media", hasMany: true },
  ],
};
