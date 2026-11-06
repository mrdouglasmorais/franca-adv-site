import type { Metadata } from "next";
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
      <div className="mt-12">
        <TeamGrid />
      </div>
    </Container>
  );
}
