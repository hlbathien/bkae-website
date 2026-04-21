import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    {
      name: "heroHeadline",
      type: "textarea",
      required: true,
      localized: true,
      defaultValue:
        "We don't teach AI. We institutionalize the engineering discipline AI-native software demands.",
    },
    {
      name: "heroKeywords",
      type: "array",
      fields: [{ name: "word", type: "text", required: true, localized: true }],
    },
    {
      name: "manifestoQuote",
      type: "textarea",
      localized: true,
      defaultValue: "Bounded models. Contract-based pipelines. Shipped systems.",
    },
    {
      name: "ctaBands",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};
