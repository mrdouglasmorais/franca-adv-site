import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/content/firm";

export default function robots(): MetadataRoute.Robots {
  const origin = resolveSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
