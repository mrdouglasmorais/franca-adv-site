import type { Metadata } from "next";
import { firm } from "@/content/firm";
import { illustrations } from "@/content/visuals";
import { PageBanner } from "@/components/site/page-banner";
import { TeamGrid } from "@/components/site/team-grid";
import { TeamStage } from "@/components/site/team-stage";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
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
    <>
      <PageBanner
        image={illustrations[2]}
        crumbs={crumbs}
        kicker={`${firm.address.city} / ${firm.address.region}`}
        title="Quem atende você"
        line="Advogados da OAB/SC e a equipe do escritório em Itajaí."
      />
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <TeamStage />
      <section className="border-b border-line" aria-labelledby="equipe-lista-titulo">
        <Container className="py-16 md:py-24">
          <h2 id="equipe-lista-titulo" className="sr-only">
            Integrantes da equipe
          </h2>
          <TeamGrid />
        </Container>
      </section>
    </>
  );
}
