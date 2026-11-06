import Image from "next/image";
import type { Illustration } from "@/content/visuals";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";

export function PageBanner({
  image,
  kicker,
  title,
  line,
  crumbs,
}: {
  image: Illustration;
  kicker: string;
  title: string;
  line: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <section className="relative isolate flex min-h-[26rem] items-end overflow-hidden bg-ink text-paper md:min-h-[30rem]">
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover image-drift"
        draggable={false}
      />
      <div className="page-banner-shade" aria-hidden="true" />
      <Container className="relative py-12 md:py-16">
        <Breadcrumb items={crumbs} tone="dark" />
        <Eyebrow tone="gold" className="mt-8">
          {kicker}
        </Eyebrow>
        <Heading level={1} className="mt-3 max-w-[16ch] text-paper">
          {title}
        </Heading>
        <p className="mt-4 max-w-[46ch] text-lg text-gold-soft">{line}</p>
      </Container>
    </section>
  );
}
