import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 92],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    proxyClientMaxBodySize: "12mb",
    serverActions: { bodySizeLimit: "12mb" },
  },
  async headers() {
    const cache = [
      {
        key: "Cache-Control",
        value: "public, max-age=604800, stale-while-revalidate=2592000",
      },
    ];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      { source: "/brand/:path*", headers: cache },
      { source: "/image/:path*", headers: cache },
      { source: "/team/:path*", headers: cache },
      { source: "/clients/:path*", headers: cache },
      { source: "/fav.png", headers: cache },
      { source: "/opengraph-image", headers: cache },
    ];
  },
};

export default nextConfig;
