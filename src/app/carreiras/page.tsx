import type { Metadata } from "next";
import { illustrations } from "@/content/visuals";
import { ApplicationForm } from "@/components/site/application-form";
import { PageBanner } from "@/components/site/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Carreiras",
  description:
    "Cadastro de advogados, estagiários e correspondentes da Ferreira França Advogados em Itajaí/SC.",
  path: "/carreiras",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Carreiras", path: "/carreiras" },
];

export default function CareersPage() {
  return (
    <>
    <PageBanner
      image={illustrations[2]}
      crumbs={crumbs}
      kicker="Seleção"
      title="Envie o currículo"
      line="Advogados, estagiários, correspondentes e apoio administrativo. Envie o currículo pelo formulário."
    />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <div className="max-w-[40rem]">
        <ApplicationForm />
      </div>
    </Container>
    </>
  );
}
