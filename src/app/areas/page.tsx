import type { Metadata } from "next";
import { practiceAreas } from "@/content/areas";
import { AreaCard } from "@/components/site/area-card";
import { illustrations } from "@/content/visuals";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { PageBanner } from "@/components/site/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Áreas de atuação",
  description:
    "Áreas de atuação da Ferreira França Advogados em Itajaí/SC: civil, família, trabalho, empresarial, franquias, contratos e criminal.",
  path: "/areas",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Áreas de atuação", path: "/areas" },
];

export default function AreasPage() {
  return (
    <>
    <PageBanner image={illustrations[1]} />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumb items={crumbs} />
      <Eyebrow>Itajaí / SC</Eyebrow>
      <Heading level={1} className="mt-3">
        Áreas de atuação
      </Heading>
      <p className="mt-4 max-w-[62ch] text-ink-soft">
        Escolha a área. A página diz que tipo de demanda chega ao escritório.
      </p>
      <ul className="area-grid mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {practiceAreas.map((area, index) => (
          <AreaCard key={area.slug} area={area} index={index} level={2} />
        ))}
      </ul>
    </Container>
    </>
  );
}
