import type { MetadataRoute } from "next";
import { practiceAreas } from "@/content/areas";
import { resolveSiteUrl } from "@/content/firm";
import { team } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = resolveSiteUrl();
  const now = new Date();
  const staticPaths = ["", "/areas", "/equipe", "/contato", "/carreiras", "/publicacoes", "/privacidade", "/llms.txt"];

  return [
    ...staticPaths.map((path) => ({
      url: `${origin}${path || "/"}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...practiceAreas.map((area) => ({
      url: `${origin}/areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...team.map((member) => ({
      url: `${origin}/equipe/${member.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
