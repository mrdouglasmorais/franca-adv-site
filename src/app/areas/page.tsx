import type { Metadata } from "next";
import { practiceAreas } from "@/content/areas";
import { AreaCard } from "@/components/site/area-card";
import { illustrations } from "@/content/visuals";
import { PageBanner } from "@/components/site/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Áreas de atuação",
  description:
    "Áreas de atuação da Ferreira França Advogados em Itajaí/SC: civil, imobiliário, família, trabalho, empresarial, contratos e criminal.",
  path: "/areas",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Áreas de atuação", path: "/areas" },
];

export default function AreasPage() {
  return (
    <>
    <PageBanner
      image={illustrations[1]}
      crumbs={crumbs}
      kicker="Itajaí / SC"
      title="Áreas de atuação"
      line="Escolha a área e veja o tipo de demanda que chega ao escritório."
    />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <ul className="area-grid grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {practiceAreas.map((area, index) => (
          <AreaCard key={area.slug} area={area} index={index} level={2} />
        ))}
      </ul>
    </Container>
    </>
  );
}
