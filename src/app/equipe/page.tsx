import type { Metadata } from "next";
import Image from "next/image";
import { firm } from "@/content/firm";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { TeamGrid } from "@/components/site/team-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Escritório",
  description:
    "Equipe da Ferreira França Advogados em Itajaí/SC. Advogados, equipe jurídica e financeiro do escritório.",
  path: "/equipe",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Escritório", path: "/equipe" },
];

export default function TeamPage() {
  return (
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] lg:gap-16">
        <div>
          <Breadcrumb items={crumbs} />
          <Eyebrow tone="seal">
            {firm.address.city} / {firm.address.region}
          </Eyebrow>
          <Heading level={1} className="mt-3 max-w-[16ch]">
            Quem atende você
          </Heading>
          <p className="mt-4 max-w-[42ch] text-ink-soft">
            Advogados da OAB/SC e a equipe do escritório em Itajaí.
          </p>
        </div>
        <figure className="team-stage">
          <div className="image-frame relative aspect-[9/16] bg-ink">
            <div className="team-photo">
              <Image
                src="/team/time.jpeg"
                alt="Equipe do escritório em Itajaí"
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-top"
                priority
                draggable={false}
              />
            </div>
          </div>
        </figure>
      </div>
      <div className="mt-16 md:mt-24">
        <TeamGrid />
      </div>
    </Container>
  );
}
