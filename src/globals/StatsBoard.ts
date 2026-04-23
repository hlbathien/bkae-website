import type { GlobalConfig } from "payload";
import { anyone, editorOrAdmin } from "../access/roles";

// Stats displayed on landing (Stats section). Editable from /admin.
// Public shape surfaced by `fetchStats()` in src/lib/cms-server.ts.
export const StatsBoard: GlobalConfig = {
  slug: "stats-board",
  admin: { group: "Globals" },
  access: { read: anyone, update: editorOrAdmin },
  versions: { drafts: { autosave: { interval: 800 } } },
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: "label", type: "text", required: true, localized: true },
        { name: "value", type: "number", required: true },
        { name: "suffix", type: "text" },
        {
          name: "sparkline",
          type: "array",
          admin: { description: "Optional trend points 0–100; 6–12 entries." },
          fields: [{ name: "n", type: "number", required: true }],
        },
      ],
    },
  ],
};
