import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const config: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "*.cloudfront.net" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  turbopack: {},
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];

    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withPayload(config, { devBundleServerPackages: false });
