import type { Metadata } from "next";
import { firm } from "@/content/firm";
import { illustrations } from "@/content/visuals";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { PageBanner } from "@/components/site/page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata({
  title: "Publicações",
  description:
    "Artigos da Ferreira França Advogados. A lista fica vazia até o escritório publicar um texto.",
  path: "/publicacoes",
});

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Publicações", path: "/publicacoes" },
];

export default function PostsPage() {
  return (
    <>
    <PageBanner image={illustrations[1]} />
    <Container className="py-16 md:py-24">
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <Breadcrumb items={crumbs} />
      <Eyebrow>Editorial</Eyebrow>
      <Heading level={1} className="mt-3">
        Publicações
      </Heading>
      <p className="mt-4 max-w-[62ch] text-ink-soft">
        Os artigos do escritório entram aqui quando forem publicados. Não há textos provisórios.
      </p>
      <div className="mt-8">
        <Button href={firm.contact.whatsappUrl} pill>
          Falar com o escritório
        </Button>
      </div>
    </Container>
    </>
  );
}
