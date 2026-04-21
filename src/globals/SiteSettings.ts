import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  fields: [
    { name: "siteName", type: "text", defaultValue: "Agentic Engineering", required: true },
    { name: "tagline", type: "text", localized: true },
    { name: "defaultOG", type: "upload", relationTo: "media" },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "url", type: "text", required: true },
        { name: "kind", type: "select", options: ["github", "x", "youtube", "linkedin", "email"] },
      ],
    },
    {
      name: "sponsorCTA",
      type: "group",
      fields: [
        { name: "headline", type: "text", localized: true },
        { name: "href", type: "text" },
      ],
    },
  ],
};
