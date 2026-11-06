import type { Metadata } from "next";
import { firm, resolveSiteUrl } from "@/content/firm";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  absoluteTitle?: boolean;
};

function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, `${resolveSiteUrl()}/`).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = absoluteTitle ? title : `${title} | ${firm.shortName}`;

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : title,
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": url },
      types: { "text/markdown": url },
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: firm.name,
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: firm.seo.ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: firm.seo.ogImageAlt,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
