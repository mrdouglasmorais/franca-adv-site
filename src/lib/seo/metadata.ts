import type { Metadata } from "next";
import { firm, resolveSiteUrl } from "@/content/firm";

type BuildMetadataInput = {
  title: string;
  description: string;
  path?: string;
  absoluteTitle?: boolean;
  /** Caminho público da imagem OG (ex.: foto do integrante). */
  image?: string;
  imageAlt?: string;
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
  image,
  imageAlt,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = absoluteTitle ? title : `${title} | ${firm.shortName}`;
  const ogImage = {
    url: absoluteUrl(image ?? "/opengraph-image"),
    width: 1200,
    height: 630,
    alt: imageAlt ?? firm.seo.ogImageAlt,
    ...(image ? {} : { type: "image/png" as const }),
  };

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
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
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
