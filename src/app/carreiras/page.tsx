import type { Metadata } from "next";
import { illustrations } from "@/content/visuals";
import { ApplicationForm } from "@/components/site/application-form";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { PageBanner } from "@/components/site/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
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
    <PageBanner image={illustrations[2]} />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumb items={crumbs} />
      <Eyebrow tone="seal">Seleção</Eyebrow>
      <Heading level={1} className="mt-3 max-w-[16ch]">
        Envie o currículo
      </Heading>
      <p className="mt-4 max-w-[62ch] text-ink-soft">
        Advogados, estagiários, correspondentes e apoio administrativo. O cadastro chega à equipe com o arquivo.
      </p>
      <div className="mt-10 max-w-[40rem] border-t border-line pt-10">
        <ApplicationForm />
      </div>
    </Container>
    </>
  );
}
