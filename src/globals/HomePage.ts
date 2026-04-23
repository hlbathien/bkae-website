import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

// Landing-page editable content. Read publicly; edited by editor/admin.
// Consumed by `fetchHomePage()` in src/lib/cms-server.ts.
export const HomePage: GlobalConfig = {
  slug: "home-page",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    {
      name: "heroEyebrow",
      type: "text",
      localized: true,
      defaultValue: "Agentic Engineering · HCMUT · Founded 2026",
    },
    {
      name: "heroHeadline",
      type: "textarea",
      required: true,
      localized: true,
      defaultValue:
        "We don't teach AI. We institutionalize the engineering discipline AI-native software demands.",
    },
    {
      name: "heroSubheadline",
      type: "textarea",
      localized: true,
      admin: { description: "Optional line beneath the display headline." },
    },
    {
      name: "heroKeywords",
      type: "array",
      maxRows: 8,
      fields: [{ name: "word", type: "text", required: true, localized: true }],
    },
    {
      name: "heroLiveBandSuffix",
      type: "text",
      localized: true,
      defaultValue: "HCMUT",
      admin: { description: "Right-most token in the live band (e.g. `HCMUT`)." },
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
